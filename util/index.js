const { parseHeaders, composeHeaders } = require("./headers");

// https://bobbyhadz.com/blog/javascript-lowercase-object-keys
const toLowerKeys = (obj) =>
  Object.keys(obj).reduce((accumulator, key) => {
    accumulator[key.toLowerCase()] = obj[key];
    return accumulator;
  }, {});

// Parse string to its type
const composeQuery = (originalQuery) => {
  let query = originalQuery;

  if (originalQuery?.decompress) {
    query.ignoreReqHeaders = originalQuery?.decompress === "true";
  }

  if (originalQuery?.ignoreReqHeaders) {
    query.ignoreReqHeaders = originalQuery?.ignoreReqHeaders === "true";
  }

  if (originalQuery?.redirectWithProxy) {
    query.ignoreReqHeaders = originalQuery?.redirectWithProxy === "true";
  }

  if (originalQuery?.followRedirect) {
    query.followRedirect = originalQuery?.followRedirect === "true";
  }

  if (originalQuery?.appendReqHeaders) {
    const headers = parseHeaders(originalQuery.appendReqHeaders);

    query.appendReqHeaders = composeHeaders(headers);
  }

  if (originalQuery?.appendResHeaders) {
    const headers = parseHeaders(originalQuery.appendResHeaders);

    query.appendResHeaders = composeHeaders(headers);
  }

  if (originalQuery?.deleteReqHeaders) {
    const headers = parseHeaders(originalQuery.deleteReqHeaders);

    query.deleteReqHeaders = headers;
  }

  if (originalQuery?.deleteResHeaders) {
    const headers = parseHeaders(originalQuery.deleteResHeaders);

    query.deleteResHeaders = headers;
  }

  return query;
};


module.exports = {
    toLowerKeys,
    composeQuery
}