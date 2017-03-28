import React, { PropTypes } from 'react';
import Inspector from 'react-json-inspector';

const DataMap = ({ map }) => <Inspector data={map} />;

DataMap.propTypes = {
  map: PropTypes.shape({
    perView: PropTypes.object,
    perRemoteId: PropTypes.object,
    expectedIntervals: PropTypes.object,
  }).isRequired,
};

export default DataMap;
