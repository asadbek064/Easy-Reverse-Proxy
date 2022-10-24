const express = require("express");
const axios = require("axios");
const path = require("path");
const { composeQuery } = require ("./util/index.js");
const { concatHeaders, serialize } = require("./util/headers.js");

const app = express();

const PORT = process.env.PORT || 3002;

app.get("/", async (req, res) => {
    
    res.sendFile(path.join(__dirname + `/public/index.html`));
})
app.get("/proxy", async (req, res) => {
	const query = composeQuery(req.query);

	const {
		url,
		ignoreReqHeaders = false,
		followRedirect = false,
		redirectWithProxy = false,
		decompress = false,
		appendReqHeaders = {},
		appendResHeaders = {},
		deleteReqHeaders = [],
		deleteResHeaders = [],
	} = query;

	// req checks
	if (!url) {
		res.status(404).send("missing url");
		return;
	}

	// extract & filter header
	const decodedUrl = decodeURIComponent(url);

	const host = new URL(decodedUrl).host;

	let headers = concatHeaders({ host, ...appendReqHeaders });

	if (!ignoreReqHeaders) {
		headers = concatHeaders(req.headers, headers);
	}

	const filteredHeaders = Object.keys(headers).reduce((acc, key) => {
		if (!deleteReqHeaders.includes(key)) {
			acc[key] = headers[key];
		}
		return acc;
	}, {});

    // @ts-ignore
    const response = await axios.get(decodedUrl, {
        responseType: "stream",
        headers: filteredHeaders,
        validateStatus:() => true ,
        maxRedirects: !followRedirect ? 0 : 5,
        decompress,
    });

    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
    };

    const resHeaders = concatHeaders(
        response.headers,
        corsHeaders,
        appendReqHeaders
    );

    for (let header in resHeaders) {
        if (deleteReqHeaders.includes(header.toLocaleLowerCase())){
            continue;
        }

        if (header.toLocaleLowerCase() === "location") {
            const orgUrl = resHeaders[header];
            const encodedUrl = encodeURIComponent(orgUrl);
            const redirectUrl = redirectWithProxy
                ? `/proxy?url=${encodedUrl}&${serialize(query)}`
                : orgUrl;
            
            res.redirect(response.status, redirectUrl);

            return;
        }

        res.setHeader(header, resHeaders[header]);

    }

    res.status(response.status);

    response.data.pipe(res);
});

app.listen(PORT, () => {
	console.log(`easy-reverse-proxy is listening on port ${PORT}`);
});
