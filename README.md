# React Server Side Rendering Boilerplate

Starting point for server-rendered React applications.

Features:

* Server side rendering (via the excellent [React Loadable](https://github.com/thejameskyle/react-loadable) package)
* Redux (with server side data fetching)
* React Router v4
* Async code splitting on routes (opt-in)
* `React Helmet` for dynamic manipulation of the document `<head />`
* Dev server with basic hot-reloading
* `Jest` and `Enzyme` config ready to test the crap out of some stuff
* Sass styles and autoprefixer
* Node.js clusters for improved performance under load (production only)
* Eslint and prettier both run on commit

## Do it!

* `cp .env_SAMPLE .env`
* `npm install`
* Development: `npm start`
* Test: `npm test`
* Production: `npm run build && npm run start-prod`

## Current Quirks

* Environment variables should be added to both `.env` and `config/env.js` (in the `APP_ENV_VARS` array). This is a byproduct of my need for dynamic runtime environment variables.
* Routing configuration is _slightly_ duplicated -- all routes should be defined in their normal React Router v4 fashion. However, any routes that need to have data fetched before rendering (on the server) need some extra configuration inside `sever/fetchDataForRender` (in the `ROUTES_THAT_FETCH_DATA` array).
* In development mode (`npm start`) server side rendering doesn't always work as expected -- the initial load of code split bundles will log some errors in the console about a markup mismatch between the server and client, but reloading seems to send the correct markup from the server. My best guess is that there's something wonky about using `react-loadable`'s webpack plugin with `webpack-dev-server` -- like maybe the plugin doesn't generate the necessary file in time? Production mode seems to work great, so -- YOLO.
