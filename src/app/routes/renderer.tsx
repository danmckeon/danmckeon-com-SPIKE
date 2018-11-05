import * as fs from 'fs';
import * as path from 'path';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { JssProvider, SheetsRegistry } from 'react-jss';
import App from '../components/App';

function insertString(inputStr: string, insertAt: string, insertStr: string): string {
  const insertIdx = inputStr.indexOf(insertAt);
  return [inputStr.slice(0, insertIdx), insertStr, inputStr.slice(insertIdx)].join('');
}

export default (req, res, next) => {
  const staticPath = path.resolve('dist', './src', 'app', 'static');

  const filePath = path.join(staticPath, 'index.html');

  fs.readFile(filePath, 'utf8', (err, html) => {
    if (err) {
      return res.send(err).end();
    }

    const sheets = new SheetsRegistry();

    const root = renderToString(
      <JssProvider registry={sheets}>
        <App />
      </JssProvider>
    );

    const style = renderToString(<style type="text/css">{sheets.toString()}</style>);

    html = insertString(html, '</head>', style);

    const script = '<script src="/bundle.js"></script>';

    html = insertString(html, '</body>', script);

    return res.send(html.replace('<div id="root"></div>', `<div id="root">${root}</div>`));
  });
};
