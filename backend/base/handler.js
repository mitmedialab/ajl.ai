import Kapow from 'kapow';

export function error(statusCode, err, message) {
  const kerror = Kapow(statusCode, message);
  let work = err;
  if (err) {
    if (! Array.isArray(err)) {
      work = [err];
    }
    kerror.errors = work;
  }
  if (Object.prototype.hasOwnProperty.call(kerror, 'data') && kerror.data == null) {
    delete kerror.data;
  }
  return {
    error: kerror,
  };
}

export function success(input, metadata) {
  const response = {
    data: input,
  };
  if (metadata) {
    response.metadata = metadata;
  }
  return response;
}
