import * as fs from 'fs';
import * as path from 'path';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { JssProvider, SheetsRegistry } from 'react-jss';
import App from '../components/App';

export default (req, res, next) => {
  // point build index.html
  const filePath = path.resolve('dist', './src', 'app', 'static', 'index.html');
  // read in html file
  fs.readFile(filePath, 'utf8', (err, htmlData) => {
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

    const styleInsertIndex = htmlData.indexOf('</head>');

    const htmlWithStyle = [
      htmlData.slice(0, styleInsertIndex),
      style,
      htmlData.slice(styleInsertIndex)
    ].join('');

    return res.send(htmlWithStyle.replace('<div id="root"></div>', `<div id="root">${root}</div>`));
  });
};
