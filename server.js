import * as sapper from './@sapper/server.mjs';

import 'babel-polyfill'
import express from 'express'
import react from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom';
import App from './src/App'
import bodyParser from 'body-parser'

const app = express();
const PORT = 6060

app.use(bodyParser.json());
app.use(express.static('build/public'));

app.get('/*', (req, res, data) => {
    const context = {};
    const app = ReactDOMServer.renderToString(
        <Provider store={createStoreWithMiddleware(reducers)}>
        <StaticRouter location={req.url} context={context}>
            <App />
        </StaticRouter>
        </Provider>
    );

    
    const html = `<div id="root">${app}</div>`
    return res.send(
        `<div id="root">${app} <script src="client_bundle.js"></script> </div>`
    );
   
});


let renderReact = require('./renderReact.js');
renderReact(app);

app.listen(PORT, () => {
    console.log(`SSR running on port ${PORT}`)
}) 