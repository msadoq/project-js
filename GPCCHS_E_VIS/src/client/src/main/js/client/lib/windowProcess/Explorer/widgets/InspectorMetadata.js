import _ from 'lodash/fp';
import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import Tree from './Tree';


class InspectorMetadata extends React.Component {
  static propTypes = {
    staticDataLoading: PropTypes.bool.isRequired,
    hasStaticDataLoaded: PropTypes.bool.isRequired,
    hasNoStaticData: PropTypes.bool.isRequired,
    staticData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    renderNoData: PropTypes.func.isRequired,
    renderLoading: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    const { staticData: prevStaticData } = this.props;
    const { staticData: nextStaticData } = nextProps;

    return !_.isEqual(prevStaticData, nextStaticData);
  }

  render() {
    const {
      staticDataLoading,
      hasStaticDataLoaded,
      hasNoStaticData,
      staticData,
      renderNoData,
      renderLoading,
      onMouseDown,
    } = this.props;

    return (
      <Panel
        key="staticData"
        header={<h2>Static data</h2>}
      >
        {
          staticDataLoading && renderLoading()
        }
        {
          hasNoStaticData && renderNoData()
        }
        {
          hasStaticDataLoaded &&
          <div>
            <Tree
              data={staticData}
              onMouseDown={onMouseDown}
            />
          </div>
        }
      </Panel>
    );
  }
}

export default InspectorMetadata;
