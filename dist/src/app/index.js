"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
// import serverless from 'serverless-http';
var renderer_1 = require("./routes/renderer");
var express = require('express');
var port = 3000;
var app = express();
// root (/) should always serve our server rendered page
app.use('^/$', renderer_1.default);
// serve static assets
app.use(express.static(path.join(__dirname, 'client', './build')));
// handler
// export const handler = serverless(app);
app.listen(port, function () { return console.log("Example app listening on port " + port + "!"); });
//# sourceMappingURL=index.js.map