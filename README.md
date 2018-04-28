# React Server Side Rendering Boilerplate

Starting point for server-rendered React applications.

Features:

* Server side rendering (via the excellent [React Loadable](https://github.com/thejameskyle/react-loadable) package)
* Webpack 4
* Redux (with server side data fetching/store population)
* React Router v4
* Code splitting (opt-in)
* React Helmet for dynamic manipulation of the document `<head />`
* Dev server with basic hot-reloading
* Jest and Enzyme config ready to test the crap out of some stuff
* Sass styles and autoprefixer
* Node.js clusters for improved performance under load (in production)
* Eslint and prettier both run on commit
* Dockerized for production like a bawsss

## Do it!

* `cp .env_SAMPLE .env`
* `npm install`
* Development: `npm start`
* Test: `npm test`
* Production: `npm run build && npm run start-prod`
* Start Docker (production mode): `npm run docker`

## Current Quirks

⚠️ This is a pretty complicated (read "over-engineered") setup, and while a variation of this architecture is being used in production, I'd recommend you use it for inspiration rather than cloning it unless you feel really comfortable in the weeds. ️

* CSS modules are not supported. See [this closed issue](https://github.com/cullenjett/react-ssr-boilerplate/issues/3) for more details on why, but the TLDR is you can't import CSS files anywhere other than `src/index.js`.
* Routing configuration can potentially be _slightly_ duplicated. All routes should be defined in their normal React Router v4 fashion. However, any routes that need to have data fetched before rendering (on the server) need some extra configuration inside `sever/fetchDataForRender` (in the `ROUTES_THAT_FETCH_DATA` array).
* Environment variables should be added to both `.env` and `config/env.js` (in the `APP_ENV_VARS` array). This is a byproduct of my need for dynamic runtime environment variables. If you want to bake your environment variables into your bundle like a normal person you could modify the `forWebpackDefinePlugin` function inside `env.js` by removing the conditional and just returning line 27.
