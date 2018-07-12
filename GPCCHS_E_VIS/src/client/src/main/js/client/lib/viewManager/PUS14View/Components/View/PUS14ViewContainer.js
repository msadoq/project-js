import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { connect } from 'react-redux';
import { getData } from 'viewManager/PUS14View/store/dataReducer';
import parameters from 'common/configurationManager';
import PUS14View from './PUS14View';

const mapStateToProps = (state, { viewId }) => {
  const data = getData(state, { viewId });
  const statuses = parameters.get('PUS_CONSTANTS').STATUS;

  return {
    groundDate: _.getOr(null, 'groundDate', data),
    serviceApid: _.getOr(null, 'serviceApid', data),
    status: statuses[_.getOr(200, 'status', data)],
    serviceApidName: _.getOr(null, 'serviceApidName', data),
    uniqueId: _.getOr(null, 'uniqueId', data),
  };
};

const PUS14ViewContainer = connect(mapStateToProps, null)(PUS14View);

PUS14ViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default PUS14ViewContainer;
