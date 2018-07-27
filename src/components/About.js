import React, { Component } from 'react';

import styles from './about.scss';

class About extends Component {
  render() {
    return (
      <div>
        <h1 className={styles.title}>About page</h1>
        <img className={styles.reactLogo} src="/images/react.svg" alt="" />
      </div>
    );
  }
}

export default About;
