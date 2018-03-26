import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getSearchComponent } from 'viewManager/components';
import styles from './Search.css';

const InvalidConfiguration = () => (
  <div>
    <h4
      className="text-center mb10"
    >
      Search in Text View
    </h4>
    <div>
      No Text View Selected
    </div>
  </div>
);

export default class Search extends PureComponent {
  static propTypes = {
    pageId: PropTypes.string.isRequired,
    viewId: PropTypes.string,
    type: PropTypes.string,
  };

  static defaultProps = {
    viewId: null,
  };

  render() {
    const {
      pageId,
      viewId,
      type,
    } = this.props;

    let SearchComponent;
    if (!viewId) {
      SearchComponent = InvalidConfiguration;
    } else {
      SearchComponent = getSearchComponent(type);
    }

    return (
      <div className={classnames('Search', 'subdiv', 'h100', styles.search)}>
        <SearchComponent
          viewId={viewId}
          pageId={pageId}
        />
      </div>
    );
  }
}
