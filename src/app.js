const http = require('http');
const fs = require("fs").promises;
const path = require("path");

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    let filename = req.url || "index.html";
    let ext = path.extname(filename);
    let localPath = __dirname;
    let validExtensions = {
        ".html": "text/html",
        ".dmn": "text/xml"
    };
    let mimeType = validExtensions[ext];
    localPath += filename;

    getFile(localPath, res, mimeType);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/index.html`);
});

function getFile(localPath, res, mimeType) {
    fs.readFile(localPath)
        .then(contents => {
            res.setHeader("Content-Length", contents.length);
            if (mimeType != undefined) {
                res.setHeader("Content-Type", mimeType);
            }
            res.statusCode = 200;
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        });
}