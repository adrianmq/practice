import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./store/";
import App from './app/App';

import ServerRenderingApp from './app/ServerRenderingApp';

import { createServer } from 'http';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';

import * as serviceWorker from './worker/serviceWorker';
import './index.css';

// createServer((req, res) => {
//   const context = {};

//   const html = ReactDOMServer.renderToString(
//     <StaticRouter location={req.url} context={context}>
//       {/* <App /> */}
//       <ServerRenderingApp />
//     </StaticRouter>
//   );

//   if (context.url) {
//     res.writeHead(301, {
//       Location: context.url
//     });
//     res.end();
//   } else {
//     res.write(`
//       <!doctype html>
//       <div id="app">${html}</div>
//     `);
//     res.end();
//   }
// }).listen(3000);


// ReactDOM.render(<ServerRenderingApp />, document.getElementById('root'));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
