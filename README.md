# Easy-Reverse-Proxy
NodeJS proxy server that adds request/response headers to the proxied request. Forward client requests to your pool of different servers. 

It allows you to add or remove headers to requests and responses.


## Rotating proxy
It can also work as a rotating proxy that assigns a new IP address from the proxy pool for every connection. **(By default its OFF)**

## How to use?

Just send a request to `http://localhost:3002/proxy` + add following as need.

- `url` (_Required_) - Proxy target.\
  _Note_: URLs must be encoded

- `ignoreReqHeaders` - Ignore request headers sent from browser.\
  Example: `ignoreReqHeaders=true`

- `followRedirect` - Follow redirect if true, otherwise send raw redirect response.\
  Example: `followRedirect=true`

- `redirectWithProxy` - Server will add proxy to the redirect location.\
  Example: `redirectWithProxy=true`

- `decompress` - No decompress would be done.\
  Example: `decompress=true`

- `appendReqHeaders` - These headers will be appended to the request headers.\
  _Note_: It will override the header if it exists.\
  Example: `appendReqHeaders=[["referer": "https://google.com"], ["origin": "https://google.com"]]`

- `appendResHeaders` - These headers will be appended to the response headers.\
  Example: `appendResHeaders=[["content-type": "text/plain"]]`
  
- `deleteReqHeaders` - These headers will be removed from the request headers.\
  Example: `deleteReqHeaders=["origin"]`

- `deleteResHeaders` - These headers will be removed from the response headers.\
  Example: `deleteResHeaders=["set-cookie"]`

_CORS applied to `*` by default, you can override it with `appendReqHeaders`_

## Install

```sh
git clone https://github.com/asadbek064/Easy-Reverse-Proxy
cd easy-proxy
npm install
npm start
```

## Example

- `http://localhost:3002/proxy?url=http%3A%2F%2Fgoogle.com` - Google.com with CORS headers
- `http://localhost:3002/proxy?url=http%3A%2F%2Fgoogle.com&appendResHeaders=[["content-type": "text/plain"]]` - Request Google.com as text

- `http://localhost:3002/proxy?url=http%3A%2F%2Fgoogle.com&deleteResHeaders=["set-cookie"]` - Remove Google.com cookies

## Similiars

- [CORS bridged](https://cors.bridged.cc)
- [cors-anywhere](https://github.com/Rob--W/cors-anywhere)
- [Go Between](https://github.com/okfn/gobetween)
- [Cloudflare Cors Anywhere](https://github.com/Zibri/cloudflare-cors-anywhere)