// index.js
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const path = require('path');
import renderer from './middleware/renderer';

// root (/) should always serve our server rendered page
app.use('^/$', renderer);
// serve static assets
app.use(express.static(path.join(__dirname, 'client', './build')));
// handler
export const handler = serverless(app);
