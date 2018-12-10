import url from 'url';
import { matchPath } from 'react-router-dom';

import { Home } from '../src/components/Home';

const ROUTES_THAT_FETCH_DATA = [
  {
    path: '/',
    component: Home,
    exact: true
  }
];

export const fetchDataForRender = (req, store) => {
  const promises = [];

  ROUTES_THAT_FETCH_DATA.some(route => {
    const match = matchPath(url.parse(req.url).pathname, route);
    if (match) {
      const promise =
        route.component &&
        route.component.fetchData &&
        route.component.fetchData(store, match);
      promises.push(promise);
    }
    return match;
  });

  return Promise.all(promises);
};
