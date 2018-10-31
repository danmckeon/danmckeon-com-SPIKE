"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_jss_1 = require("react-jss");
// .App-logo {
//   animation: App-logo-spin infinite 20s linear;
//   height: 40vmin;
// }
// .App-header {
//   background-color: #282c34;
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   font-size: calc(10px + 2vmin);
//   color: white;
// }
// .App-link {
//   color: #61dafb;
// }
var styles = {
    app: {
        textAlign: 'center'
    },
    appIntro: {
        color: 'red'
    },
    appTitle: {
        color: 'yellow'
    }
};
var App = /** @class */ (function (_super) {
    tslib_1.__extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        // const { classes } = this.props;
        return (React.createElement("div", { className: "app" },
            React.createElement("header", { className: "appHeader" },
                React.createElement("img", { className: "App-logo", alt: "logo" }),
                React.createElement("h1", null, "Hello React World4")),
            React.createElement("p", null, "Here's some content")));
    };
    App = tslib_1.__decorate([
        react_jss_1.default(styles)
    ], App);
    return App;
}(React.Component));
exports.default = App;
//# sourceMappingURL=App.js.map