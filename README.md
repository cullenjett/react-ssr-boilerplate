# React Server Side Rendering Boilerplate ⚛️🎨

Tools like [create-react-app](https://github.com/facebook/create-react-app) have made setting up client-side React apps trivial, but transitioning to SSR is still kind of a pain in the ass. [Next.js](https://nextjs.org) is a powerhouse, and the [Razzle](https://github.com/jaredpalmer/razzle) tool looks like an absolute beast, but sometimes you just want to see the whole picture. This is a sample setup for full-featured, server-rendered React applications.

**What's included:**

- Server-side rendering with code splitting (via the excellent [React Loadable](https://github.com/thejameskyle/react-loadable) package)
- Redux (with server-side data fetching/store population)
- React Router
- Conditionally load pollyfills -- only ship bloat to outdated browsers
- React Helmet for dynamic manipulation of the document `<head />`
- Dev server with hot-reloading
- Jest and Enzyme config ready to test the crap out of some stuff
- CSS Modules, Sass, and autoprefixer
- Run-time environment variables
- Node.js clusters for improved performance under load (in production)
- Prettier and ESLint run on commit
- Docker-ized for production like a bawsss

## Initial setup

- `npm install`

## Development

- `npm start`
  - Start the dev server at [http://localhost:3000](http://localhost:3000)
- `npm test`
  - Start `jest` in watch mode

## Production

- `npm run build && npm run start-prod`
  - Bundle the JS and fire up the Express server for production
- `npm run docker`
  - Build and start a local Docker image in production mode (mostly useful for debugging)

## General architecture

This app has two main pieces: the server and the client code.

#### Server (`server/`)

A fairly simple Express application in `server/app.js` handles serving static assets (the generated CSS and JS code in `build/` and anything in `public/` like images and fonts), and sends any unrecognized GET requests to the React application via `server/renderServerSideApp.js`. That function is responsible for fetching server-side data before rendering (if applicable) via `server/fetchDataForRender.js` and then sending the rendered React application as a string injected inside the HTML-ish code in `server/indexHtml.js`.

Middleware is added to the Express app during development (when `process.env.NODE_ENV !== 'production'`), and in production the `server/index.js` file is used to run the server with Node's `cluster` module to take advantage of multiple CPU cores.

#### Client (`src/`)

The entrypoint for the client-side code (`src/index.js`) first checks if the current browser needs to be polyfilled and then defers to `src/main.js` to hydrate the React application. These two files are only ever called on the client, so you can safely reference any browser APIs here without anything fancy. The rest of the client code is a React application -- in this case a super basic UI w/2 routes and a skeleton Redux setup, but you can safely modify/delete nearly everything inside `src/` and make it your own. Note that if you do remove/replace `react-router` and `redux` you'll probably want to clean up `server/renderServerSideApp.js` as well.

As with all server-rendered React apps you'll want to be cautious of using browser APIs in your components -- they don't exist when rendering on the server and will throw errors unless you handle them gracefully (I've found some success with using `if (typeof myBrowserAPI !== 'undefined') { ... }` checks when necessary, but it feels dirty so I try to avoid when possible). The one exception to this is the `componentDidMount()` method for class components, this is only ever run on the client.

## "How do I ...?"

#### Fetch data on the server and inject into the Redux store before rendering?

Sometimes you'll want to make API calls on the server to fetch data **before** rendering the page. In those cases you can add a `static fetchDataForRender()` method to the highest-level class component rendered for a route. That method will be called with the Redux store and the `match` object returned from `react-router` and **has to return a Promise**. Check out `src/components/Home.js` for an example. Eventually I'll add the ability to call `fetchDataForRender()` from any component being rendered on the server rather than only the top-level route component.

## Current Quirks

- This app does **not** create a server bundle via webpack, only client-side bundles. That means some of the crazy things you can do with webpack (`import`ing images, for example) are not possible here without getting dirty.
- CSS modules are disabled for any files inside `src/styles` -- use this directory for global styles instead. This is configured in the webpack config files, so start there if you'd like to change anything.
- Routing configuration can potentially be _slightly_ duplicated. All routes should be defined in their normal React Router v4 fashion. However, any routes that need to have data fetched before rendering (on the server) need some extra configuration inside `sever/fetchDataForRender` (in the `ROUTES_THAT_FETCH_DATA` array).

## `cj-scripts`

If you're interested in creating your own [react-scripts](https://github.com/facebook/create-react-app/tree/next/packages/react-scripts)-eque CLI that wraps up some of the concepts in this project take a look at my [cj-scripts](https://github.com/cullenjett/cj-scripts) repo.
