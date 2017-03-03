import validator from './schema';
import * as baseSql from './sql';
import debug from 'debug';
import db from '../services/db';
import { error, success } from './handler';
import { PAGINATION_PER_PAGE } from '../../config';
import { stringify } from 'querystring';

const debugValidations = debug('schemaValidations');
const debugResponses = debug('apiErrors');

export function apiDatabaseError (e, req, res) {
  db.apiError(e);
  const statusCode = e.statusCode || 500;
  const err = {};
  if (statusCode !== '500') {
    err.message = e.message;
  }
  debugResponses(`API database error: ${e}`);
  return res.status(statusCode).send(error(statusCode, err));
}

export function notImplemented (req, res) {
  return res.status(501).send(error(501));
}

export function makeReadOne (model) {
  return function readOne (req, res) {
    const params = req && req.params || {};
    const queryFn = model.readOne ||
      db.one.bind(null, model.queries.read_one);
    return queryFn(params).then(resource => {
      return res.status(200).send(success(resource));
    }).catch(e => apiDatabaseError(e, req, res));
  };
}

const formatLink = function (urlPath, query, params) {
  const linkQuery = Object.assign({}, query, params);
  return `${urlPath}?${stringify(linkQuery)}`;
};

export const makeLinks = function (metadata, req) {
  const links = {};
  const { page, per_page, count, total_count, page_count } = metadata;
  const formatter = formatLink.bind(null, req.path, req.query);
  // Self is always set
  links.self = formatter({ page, per_page });
  if (count > 0 && total_count > (per_page * page)) {
    links.next = formatter({ page: page + 1, per_page });
  }
  if (total_count > 0) {
    links.first = formatter({ page: 1, per_page });
    if (page > 1 && count) {
      links.prev = formatter({ page: page - 1, per_page });
    }
    if (page_count > 1) {
      links.last = formatter({ page: page_count, per_page });
    }
  }
  return links;
};

export const setLinkHeader = function (links, req, res) {
  const linkChunks = Object.keys(links).map(link => {
    return `<${links[link]}>; rel="${link}"`;
  });
  res.set('Link', linkChunks.join(','));
};

export const paginate = function (resources, req, res, next) {
  const params  = req && req.query || {};
  const page    = +params.page || 1;
  const perPage = +params.per_page || PAGINATION_PER_PAGE;
  const offset  = (page - 1) * perPage;
  const totalCount = resources.length || 0;
  resources = (Array.isArray(resources) &&
    resources.slice(offset, offset + perPage)) || [];
  const metadata = {
    page: page,
    per_page: perPage,
    total_count: totalCount,
    page_count: (totalCount > 0 && Math.ceil(totalCount / perPage)) || 0,
    count: resources.length
  };
  metadata.links = makeLinks(metadata, req, res);
  setLinkHeader(metadata.links, req, res);
  return res.status(200).send(success(
    resources,
    metadata
  ));
};

export function makeReadMany (model, options) {
  options = options || {};
  return function readMany (req, res) {
    const params = req && req.params || {};
    const queryFn = model.readMany ||
      db.any.bind(null, model.queries.read_many);
    return queryFn(params).then(resources => {
      if (options.paginate && !!options.paginate) {
        return paginate(resources, req, res);
      } else {
        return res.status(200).send(success(resources));
      }
    }).catch(e => apiDatabaseError(e, req, res));
  };
}

// TODO This should be refactored to allow the use of model.create
//      similar to makeUpdater
export function makeCreator (model) {
  return function create (req, res) {
    const single = !Array.isArray(req.body.data);
    const data = (single) ? [req.body.data] : req.body.data;
    if (typeof model.beforeCreate === 'function') {
      data.map(resource => model.beforeCreate(resource, req));
    }
    return db.many(baseSql.create(model.table, data)).then(result => {
      res.status(201);
      if (single) {
        result = result[0];
        res.location(`${model.location}/${result.id}`);
      }
      res.send(success(result));
    }).catch(e => apiDatabaseError(e, req, res));
  };
}

export function makeUpdater (model) {
  return function update (req, res) {
    const updateFn = model.update  ||
      db.one.bind(null, baseSql.update(
        model.table, Object.keys(req.body.data)));
    const data = Object.assign({
      id: req.params.id
    }, req.body.data);
    updateFn(data).then(resource => {
      if (typeof model.parseOne === 'function') {
        resource = model.parseOne(resource);
      }
      res.status(200).send(success(resource));
    }).catch(e => apiDatabaseError(e, req, res));
  };
}

export function makeDestroyer (model) {
  return function destroy (req, res) {
    const queryFn = model.destroy ||
      db.one.bind(null, baseSql.destroy(model.table));
    return queryFn(req.params).then(result => {
      res.status(204).end();
    }).catch(e =>  apiDatabaseError(e, req, res));
  };
}

/**
 * Create/return a function that takes properties in req.params
 * indicated in `paramMap` and puts them into req.body.data.
 * If req.body.data is an Array, each
 * element will get a copy of each mapped param.
 */
export function injectParams (paramMap) {
  return function (req, res, next) {
    const data = (req.body && req.body.data) || {};
    Object.keys(paramMap).map(paramKey => {
      const paramValue = req.params[paramKey];
      const bodyKey = paramMap[paramKey];
      if (Array.isArray(data)) {
        data.map(resource => resource[bodyKey] = paramValue);
      } else {
        data[bodyKey] = paramValue;
      }
      next();
    });
  };
}

export function removeNullDataParams (req) {
  req.body = req.body || {};
  req.body.data = req.body.data || {};
  Object.keys(req.body.data).map(key => {
    if (req.body.data[key] == null) {
      delete req.body.data[key];
    }
  });
}

export function makeValidator (validations, prefix, options) {
  const opts = Object.assign({}, {
    removeNull: false
  }, options);
  Object.keys(validations).forEach(schemaKey => {
    validator.addSchema(
      validations[schemaKey], `${prefix}_${schemaKey}`);
  });

  return function (schemaKey) {
    return function (req, res, next) {
      try {
        if (opts.removeNull) {
          removeNullDataParams(req);
        }
        if (!validator.validate(`${prefix}_${schemaKey}`, req)) {
          return res.status(400).send(error(400, validator.errors));
        }
        next();
      } catch (e) {
        debugValidations(`schema validation for ${schemaKey} threw ${e}`);
        return res.status(500).send(error(500));
      }
    };
  };
}
