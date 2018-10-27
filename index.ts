import * as path from 'path';
import serverless from 'serverless-http';
import renderer from './middleware/renderer';
const express = require('express');

const app = express();

// root (/) should always serve our server rendered page
app.use('^/$', renderer);
// serve static assets
app.use(express.static(path.join(__dirname, 'client', './build')));
// handler
export const handler = serverless(app);
