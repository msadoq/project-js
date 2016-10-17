import React, { Component, PropTypes } from 'react';
import SizeMe from 'react-sizeme'; // TODO : make sizeme optionnal by view type

import ViewHeader from './Header';
import UnknownView from './UnknownView';

import styles from './View.css';

class View extends Component {
  static propTypes = {
    component: PropTypes.func,
    size: PropTypes.shape({
      width: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
      height: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
    }),
  };
  render() {
    const ContentComponent = this.props.component || UnknownView;
    return (
      <div className={styles.container}>
        <ViewHeader {...this.props} />
        <div className={styles.content}>
          <ContentComponent {...this.props} />
        </div>
      </div>
    );
  }
}

export default SizeMe({ monitorHeight: true })(View); // eslint-disable-line new-cap
