import React from 'react';

const asAsyncComponent = getComponent => {
  return class AsyncComponent extends React.Component {
    static Component = null;

    state = {
      Component: AsyncComponent.Component,
      isClient: false
    };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent()
          .then(mod => mod.default)
          .then(Component => {
            AsyncComponent.Component = Component;
            if (this.mounted) {
              this.setState({ Component });
            }
          });
      }
    }

    componentDidMount() {
      this.mounted = true;
      this.setState({
        isClient: true
      });
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    mounted = false;

    render() {
      const { Component, isClient } = this.state;
      if (Component && isClient) {
        return <Component {...this.props} />;
      }
      return null;
    }
  };
};

export default asAsyncComponent;
