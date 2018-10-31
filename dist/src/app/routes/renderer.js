"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var React = require("react");
var server_1 = require("react-dom/server");
var App_1 = require("../components/App");
exports.default = (function (req, res, next) {
    // point build index.html
    var filePath = path.resolve('dist', './src', 'app', 'static', 'index.html');
    // read in html file
    fs.readFile(filePath, 'utf8', function (err, htmlData) {
        if (err) {
            return res.send(err).end();
        }
        // render the app as a string
        var html = server_1.renderToString(React.createElement(App_1.default, null));
        // inject the rendered app into our html and send it
        return res.send(
        // replace default html with rendered html
        htmlData.replace('<div id="root"></div>', "<div id=\"root\">" + html + "</div>"));
    });
});
//# sourceMappingURL=renderer.js.map