import { Home } from '../components/Home';
import About from '../components/About';

const routeConfig = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/about',
    component: About
  }
];

export default routeConfig;
