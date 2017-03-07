import debug from 'debug';
import { stringify } from 'querystring';

import { error, success } from './handler';
// import validator from './schema';
import * as baseSql from './sql';
import db from '../services/db';
import { PAGINATION_PER_PAGE } from '../../config';

// const debugValidations = debug('schemaValidations');
const debugResponses = debug('apiErrors');

export function apiDatabaseError(e, req, res) {
  db.apiError(e);
  const statusCode = e.statusCode || 500;
  const err = {};
  if (statusCode !== '500') {
    err.message = e.message;
  }
  debugResponses(`API database error: ${e}`);
  return res.status(statusCode).send(error(statusCode, err));
}

export function notImplemented(req, res) {
  return res.status(501).send(error(501));
}

export function makeReadOne(model) {
  return function readOne(req = {}, res) {
    const { params = {} } = req;
    const queryFn = model.readOne ||
      db.one.bind(null, model.queries.read_one);
    return queryFn(params).then((resource) => {
      return res.status(200).send(success(resource));
    }).catch(e => apiDatabaseError(e, req, res));
  };
}

function formatLink(urlPath, query, params) {
  const linkQuery = Object.assign({}, query, params);
  return `${urlPath}?${stringify(linkQuery)}`;
}

export const makeLinks = function(metadata, req) {
  const links = {};
  const {
    page,
    per_page: perPage,
    count,
    total_count: totalCount,
    page_count: pageCount,
  } = metadata;
  const formatter = formatLink.bind(null, req.path, req.query);
  // Self is always set
  links.self = formatter({ page, perPage });
  if (count > 0 && totalCount > (perPage * page)) {
    links.next = formatter({ page: page + 1, perPage });
  }
  if (totalCount > 0) {
    links.first = formatter({ page: 1, perPage });
    if (page > 1 && count) {
      links.prev = formatter({ page: page - 1, perPage });
    }
    if (pageCount > 1) {
      links.last = formatter({ page: pageCount, perPage });
    }
  }
  return links;
};

export function setLinkHeader(links, req, res) {
  const linkChunks = Object.keys(links).map((link) => {
    return `<${links[link]}>; rel="${link}"`;
  });
  res.set('Link', linkChunks.join(','));
}

export function paginate(resources, req = {}, res) {
  const { query: params = {} } = req;
  const page = +params.page || 1;
  const perPage = +params.per_page || PAGINATION_PER_PAGE;
  const offset = (page - 1) * perPage;
  const totalCount = resources.length || 0;
  const slicedResources = (Array.isArray(resources) &&
    resources.slice(offset, offset + perPage)) || [];
  const metadata = {
    page,
    per_page: perPage,
    total_count: totalCount,
    page_count: (totalCount > 0 && Math.ceil(totalCount / perPage)) || 0,
    count: resources.length,
  };
  metadata.links = makeLinks(metadata, req, res);
  setLinkHeader(metadata.links, req, res);
  return res.status(200).send(success(
    slicedResources,
    metadata
  ));
}

export function makeReadMany(model, options = {}) {
  return function readMany(req, res) {
    const { params = {} } = req || {};
    const queryFn = model.readMany ||
      db.any.bind(null, model.queries.read_many);
    return queryFn(params).then((resources) => {
      if (options.paginate && !! options.paginate) {
        return paginate(resources, req, res);
      }
      return res.status(200).send(success(resources));

    }).catch(e => apiDatabaseError(e, req, res));
  };
}

// TODO This should be refactored to allow the use of model.create
//      similar to makeUpdater
export function makeCreator(model) {
  return function create(req, res) {
    const single = ! Array.isArray(req.body.data);
    const data = (single) ? [req.body.data] : req.body.data;
    if (typeof model.beforeCreate === 'function') {
      data.map(resource => model.beforeCreate(resource, req));
    }
    return db.many(baseSql.create(model.table, data)).then((result) => {
      res.status(201);
      const [first] = result;
      if (single) {
        res.location(`${model.location}/${first.id}`);
      }
      res.send(success(single ? first : result));
    }).catch(e => apiDatabaseError(e, req, res));
  };
}

export function makeUpdater(model) {
  return function update(req, res) {
    const updateFn = model.update ||
      db.one.bind(null, baseSql.update(
        model.table, Object.keys(req.body.data)));
    const data = Object.assign({
      id: req.params.id,
    }, req.body.data);
    updateFn(data).then((resource) => {
      let parsed = resource;
      if (typeof model.parseOne === 'function') {
        parsed = model.parseOne(resource);
      }
      res.status(200).send(success(parsed));
    }).catch(e => apiDatabaseError(e, req, res));
  };
}

export function makeDestroyer(model) {
  return function destroy(req, res) {
    const queryFn = model.destroy ||
      db.one.bind(null, baseSql.destroy(model.table));
    return queryFn(req.params).then(() => {
      res.status(204).end();
    }).catch(e => apiDatabaseError(e, req, res));
  };
}

/**
 * Create/return a function that takes properties in req.params
 * indicated in `paramMap` and puts them into req.body.data.
 * If req.body.data is an Array, each
 * element will get a copy of each mapped param.
 */
export function injectParams(paramMap) {
  return function(req, res, next) {
    const data = (req.body && req.body.data) || {};
    Object.keys(paramMap).forEach((paramKey) => {
      const paramValue = req.params[paramKey];
      const bodyKey = paramMap[paramKey];
      if (Array.isArray(data)) {
        data.forEach((resource) => {
          // eslint-disable-next-line no-param-reassign
          resource[bodyKey] = paramValue;
        });
      } else {
        data[bodyKey] = paramValue;
      }
    });
    next();
  };
}

export function removeNullDataParams(req) {
  // eslint-disable-next-line no-param-reassign
  req.body = req.body || {};
  // eslint-disable-next-line no-param-reassign
  req.body.data = req.body.data || {};
  Object.keys(req.body.data).forEach((key) => {
    if (req.body.data[key] == null) {
      // eslint-disable-next-line no-param-reassign
      delete req.body.data[key];
    }
  });
}

// export function makeValidator(validations, prefix, options) {
//   const opts = Object.assign({}, {
//     removeNull: false,
//   }, options);
//   Object.keys(validations).forEach((schemaKey) => {
//     validator.addSchema(
//       validations[schemaKey], `${prefix}_${schemaKey}`);
//   });

//   return function(schemaKey) {
//     return function(req, res, next) {
//       try {
//         if (opts.removeNull) {
//           removeNullDataParams(req);
//         }
//         if (! validator.validate(`${prefix}_${schemaKey}`, req)) {
//           return res.status(400).send(error(400, validator.errors));
//         }
//         next();
//       } catch (e) {
//         debugValidations(`schema validation for ${schemaKey} threw ${e}`);
//         return res.status(500).send(error(500));
//       }
//     };
//   };
// }
