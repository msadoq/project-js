import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Search.css';
import SearchComponentContainer from './Component/SearchComponentContainer';

const InvalidConfiguration = () => (
  <div>
    <h4
      className="text-center mb10"
    >
      An error occured, no view selected
    </h4>
  </div>
);

export default class Search extends PureComponent {
  static propTypes = {
    pageId: PropTypes.string.isRequired,
    searchViewsIds: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    searchViewsIds: [],
  };

  render() {
    const {
      pageId,
      searchViewsIds,
    } = this.props;

    let SearchComponent;
    if (searchViewsIds.length === 0) {
      SearchComponent = InvalidConfiguration;
    } else {
      SearchComponent = SearchComponentContainer;
    }

    return (
      <div className={classnames('Search', 'subdiv', 'h100', styles.search)}>
        <SearchComponent
          viewsIds={searchViewsIds}
          pageId={pageId}
        />
      </div>
    );
  }
}
