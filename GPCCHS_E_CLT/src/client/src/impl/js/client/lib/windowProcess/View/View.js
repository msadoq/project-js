import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import SizeMe from 'react-sizeme'; // TODO : make sizeme optionnal by view type

import external from '../../../external.window';

import UnknownView from './UnknownView';
import ViewHeader from './Header';
import Data from './Data';
import styles from './View.css';

class View extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    size: PropTypes.object,
  };
  render() {
    const { type } = this.props;
    const ViewTypeComponent = _.has(external, type) ? external[type].component : UnknownView;

    return (
      <div style={{ height: '100%' }}>
        <ViewHeader {...this.props} />
        <div className={styles.container}>
          <Data {...this.props} component={ViewTypeComponent} />
        </div>
      </div>
    );
  }
}

export default SizeMe({ monitorHeight: true })(View);
