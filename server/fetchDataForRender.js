import url from 'url';
import { matchPath } from 'react-router-dom';

import routeConfig from '../src/routes/routeConfig';

const fetchDataForRender = (req, store) => {
  const promises = [];

  // use `Array.some` to imitate `<Switch>` behavior of selecting only the first to match
  routeConfig.some(route => {
    const match = matchPath(url.parse(req.url).pathname, route);
    if (match) {
      const promise = (route.component &&
        route.component.fetchData &&
        route.component.fetchData(store, match));
      promises.push(promise);
    }
    return match;
  });

  return Promise.all(promises);
}

export default fetchDataForRender;
