var _this = this;
var tslib_1 = require("tslib");
var bluebird = require('bluebird');
global.Promise = bluebird;
var gulp = require('gulp');
var fs = require('fs-extra');
var spawn = require('child_process').spawn;
var tsFiles = ['src/**/*.ts', 'src/**/*.tsx'];
var staticFiles = [
    'package.json',
    'src/**/*.html',
    'src/**/*.css',
    'src/**/*.json',
    'src/**/*.svg',
    'src/**/*.png',
    'src/**/*.jpg'
];
var Fail = /** @class */ (function (_super) {
    tslib_1.__extends(Fail, _super);
    function Fail(msg) {
        var _this = _super.call(this, msg) || this;
        _this.showStack = false;
        return _this;
    }
    return Fail;
}(Error));
var assert = function (cond, msg) {
    if (msg === void 0) { msg = 'Assert failed!'; }
    if (!cond)
        throw new Fail(msg);
};
var exec = function (cmd, args) {
    if (args === void 0) { args = []; }
    var p = spawn('npx', [cmd].concat(args), {
        shell: true,
        stdio: 'inherit'
    });
    return new Promise(function (resolve, reject) {
        p.on('close', function (code) {
            code !== 0 ? reject(new Fail(cmd + " exited with code " + code)) : resolve();
        });
        process.on('exit', function () {
            // p.stdin.pause();
            p.kill();
        });
    });
};
// workaround for https://github.com/ivogabe/gulp-typescript/issues/549
var tsc = function () { return exec('tsc'); };
var tscWatch = function () {
    return new Promise(function (resolve, reject) {
        var cmd = 'npx';
        var args = ['tsc', '-w', '--preserveWatchOutput'];
        var tsc = spawn(cmd, args);
        var sanitizeTSCOutput = function (data) { return data.toString().trim(); };
        tsc.stdout.on('data', function (data) {
            var message = sanitizeTSCOutput(data);
            console.log(message);
            // Hack to let gulp know we have the watcher online
            if (message.includes('Watching for file changes')) {
                resolve();
            }
        });
        tsc.stderr.on('data', function (data) {
            console.log(sanitizeTSCOutput(data));
        });
        tsc.on('error', console.log);
    });
};
var clean = function () { return fs.remove('dist'); };
gulp.task('clean', function () { return fs.remove('dist'); });
// const test = async () => {
//   if (process.env.SKIP_TESTS) {
//     console.warn('SKIP TEST FLAG SET, NOT TESTING!!  BOO');
//     return;
//   }
//   await exec('npm', ['run', 'test-single']);
// };
// exports.test = test;
var copy = function () { return gulp.src(staticFiles, { base: '.' }).pipe(gulp.dest('dist')); };
exports.copy = copy;
var build = gulp.parallel(tsc, copy);
exports.build = build;
var watch = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // wait for the initial build
            return [4 /*yield*/, tscWatch()];
            case 1:
                // wait for the initial build
                _a.sent();
                // watch for everything else
                gulp.watch(staticFiles, copy);
                return [2 /*return*/];
        }
    });
}); };
exports.watch = watch;
var start = function () {
    process.env.NODE_ENV = 'development';
    return exec('electron', ['dist/src']);
};
exports.start = start;
// this should be my push to serverless script
// const publish = gulp.series(dieIfUncommitted, clean, build, test, bumpVersion, openWhatsNew);
// exports.publish = publish;
gulp.task('default', start);
//# sourceMappingURL=gulpfile.js.map