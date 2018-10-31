import * as fs from 'fs';
import * as path from 'path';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../components/App';

export default (req, res, next) => {
  // point build index.html
  const filePath = path.resolve('dist', './src', 'app', 'static', 'index.html');
  // read in html file
  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      return res.send(err).end();
    }
    // render the app as a string
    const html = renderToString(<App />);
    // inject the rendered app into our html and send it
    return res.send(
      // replace default html with rendered html
      htmlData.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    );
  });
};
