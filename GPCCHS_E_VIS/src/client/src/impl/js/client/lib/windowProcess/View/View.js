import React, { Component, PropTypes } from 'react';
import SizeMe from 'react-sizeme'; // TODO : make sizeme optionnal by view type

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

    // TODO react-addons-shallow-compare
    // TODO https://github.com/omnidan/redux-ignore

    const propsKeys = Object.keys(this.props.data);
    const nextKeys = Object.keys(nextProps.data);

    // at least one or more added or removed keys
    if (propsKeys.length !== nextKeys.length) {
      console.log('re-render number');
      return true;
    }

    // compare each data exact reference with previous props
    let i = 0;
    for (let name in nextProps.data) {
      i ++;
      if (nextProps.data[name] !== this.props.data[name]) {
        console.log('re-render value', i);
        return true;
      }
    }

    console.log('no re-render please');
    return false;
  }
  render() {
    console.log('re-render me harder');
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
