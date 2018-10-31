import * as path from 'path';
// import serverless from 'serverless-http';
import renderer from './routes/renderer';
const express = require('express');
const port = 3000;

const app = express();

// root (/) should always serve our server rendered page
app.use('^/$', renderer);
// serve static assets
app.use(express.static(path.join(__dirname, 'client', './build')));
// handler
// export const handler = serverless(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
