import asyncRoute from './asyncRoute';

export const Home = asyncRoute(() => import(/* webpackChunkName: 'home' */ '../components/Home').then(mod => mod.default));
export const About = asyncRoute(() => import(/* webpackChunkName: 'about' */ '../components/About').then(mod => mod.default));
