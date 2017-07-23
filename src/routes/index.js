import asyncRoute from './asyncRoute';

export const Home = asyncRoute(() => import(/* webpackChunkName: 'Home' */ '../components/Home').then(mod => mod.default));
export const About = asyncRoute(() => import(/* webpackChunkName: 'About' */ '../components/About').then(mod => mod.default));
