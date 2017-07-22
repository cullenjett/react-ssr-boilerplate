import React from 'react';

const AsyncComponent = (getComponent) => {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component
          this.setState({ Component })
        })
      }
    }
    
    render() {
      const { Component } = this.state
      if (Component) {
        return <Component {...this.props} />
      }
      return null
    }
  }
};

export const Home = AsyncComponent(() => import('./components/Home').then(mod => mod.default));
export const About = AsyncComponent(() => import('./components/About').then(mod => mod.default));
