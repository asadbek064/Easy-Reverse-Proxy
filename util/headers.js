const { toLowerKeys } = require("./index.js");
const serialize = (obj) => {
    const str = [];
    for (const p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
};


// [['cookie', 'x-foo']] -> ["cookie", "x-foo"]]
const parseHeaders = (stringHeaders) => {
  try {
    return JSON.parse(stringHeaders);
  } catch {
    try {
      return JSON.parse(stringHeaders.replace(/'/g, '"'));
    } catch {
      return {};
    }
  }
};

// [["cookie", "x-foo"]] -> { cookie: "x-foo" }
const composeHeaders = (arrayOfHeaders) => {
  const headers = {};

  arrayOfHeaders.forEach((header) => {
    headers[header[0]] = header[1];
  });

  return headers;
};

const concatHeaders = (...args) => {
  const totalHeaders = {};

  for (const headers of args) {
    Object.assign(totalHeaders, toLowerKeys(headers));
  }

  return totalHeaders;
};

module.export = {
    serialize,
    parseHeaders,
    composeHeaders,
    concatHeaders
}