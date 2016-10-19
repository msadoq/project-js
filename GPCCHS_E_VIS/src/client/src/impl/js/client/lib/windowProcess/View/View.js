import React, { Component, PropTypes } from 'react';
import throttle from 'react-throttle-render';
import SizeMe from 'react-sizeme'; // TODO : make sizeme optionnal by view type
import shallowEqual from 'fbjs/lib/shallowEqual';

import ViewHeader from './Header';
import UnknownView from './UnknownView';

import styles from './View.css';

class View extends Component {
  static propTypes = {
    component: PropTypes.func,
    data: PropTypes.object,
    size: PropTypes.shape({
      width: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
      height: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
    }),
  };
  shouldComponentUpdate(nextProps) {
    // size modification
    if (this.props.size.width !== nextProps.size.width
      || this.props.size.height !== nextProps.size.height) {
      return true;
    }

    // data modification
    return !shallowEqual(this.props.data, nextProps.data);
  }
  render() {
    console.log('re-render me harder', Date.now() - this.lastRender || Date.now());
    this.lastRender = Date.now();
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

export default SizeMe({ monitorHeight: true })(throttle(View, 100)); // eslint-disable-line new-cap
