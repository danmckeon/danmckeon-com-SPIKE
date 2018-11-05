const bluebird = require('bluebird');
global.Promise = bluebird;

const gulp = require('gulp');
const fs = require('fs-extra');
const spawn = require('child_process').spawn;
const browserify = require('browserify');

const tsFiles = ['src/**/*.ts', 'src/**/*.tsx'];
const staticFiles = [
  'package.json',
  'src/**/*.html',
  'src/**/*.css',
  'src/**/*.json',
  'src/**/*.svg',
  'src/**/*.png',
  'src/**/*.jpg'
];

class Fail extends Error {
  constructor(msg) {
    super(msg);

    this.showStack = false;
  }
}

const assert = (cond, msg = 'Assert failed!') => {
  if (!cond) throw new Fail(msg);
};

const exec = (cmd, args = []) => {
  const p = spawn('npx', [cmd, ...args], {
    shell: true,
    stdio: 'inherit'
  });

  return new Promise((resolve, reject) => {
    p.on('close', function(code) {
      code !== 0 ? reject(new Fail(`${cmd} exited with code ` + code)) : resolve();
    });

    process.on('exit', () => {
      // p.stdin.pause();
      p.kill();
    });
  });
};

// workaround for https://github.com/ivogabe/gulp-typescript/issues/549
const tsc = () => exec('tsc');

const tscWatch = () =>
  new Promise((resolve, reject) => {
    const cmd = 'npx';
    const args = ['tsc', '-w', '--preserveWatchOutput'];

    const tsc = spawn(cmd, args);
    const sanitizeTSCOutput = data => data.toString().trim();

    tsc.stdout.on('data', data => {
      const message = sanitizeTSCOutput(data);
      console.log(message);

      // Hack to let gulp know we have the watcher online
      if (message.includes('Watching for file changes')) {
        resolve();
      }
    });

    tsc.stderr.on('data', data => {
      console.log(sanitizeTSCOutput(data));
    });

    tsc.on('error', console.log);
  });

const clean = () => fs.remove('dist');

gulp.task('clean', () => fs.remove('dist'));

const test = async () => {
  if (process.env.SKIP_TESTS) {
    console.warn('SKIP TEST FLAG SET, NOT TESTING!!  BOO');
    return;
  }

  await exec('npm', ['run', 'test-single']);
};
exports.test = test;

const copy = () => gulp.src(staticFiles, { base: '.' }).pipe(gulp.dest('dist'));
exports.copy = copy;

//TODO: potentially use for watcher: https://tylermcginnis.com/react-js-tutorial-pt-2-building-react-applications-with-gulp-and-browserify/
const bundle = () =>
  browserify({
    entries: ['dist/src/app/components/index.js'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  }).bundle((err, buf) => fs.writeFile('dist/src/app/static/bundle.js', buf));

exports.bundle = bundle;

const build = gulp.series(tsc, copy, bundle);
exports.build = build;

const watch = async () => {
  // wait for the initial build
  await tscWatch();

  // watch for everything else
  gulp.watch(staticFiles, copy);
};
exports.watch = watch;

const start = () => {
  process.env.NODE_ENV = 'development';
  return exec('node', ['dist/src/app/index.js']);
};
exports.start = start;

// TODO: build out serverless publishing logic
const publish = gulp.series(clean, build, test);
exports.publish = publish;

gulp.task('default', start);
