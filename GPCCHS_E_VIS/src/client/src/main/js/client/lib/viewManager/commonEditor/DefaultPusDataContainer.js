import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getSelectedDomainInForm,
  getSelectedTimelineId,
} from 'viewManager/commonEditor/Fields/selectors';
import DefaultPusData from './DefaultPusData';

const mapStateToProps = (state, { form }) => ({
  selectedDomainName: getSelectedDomainInForm(form, state),
  selectedTimelineId: getSelectedTimelineId(form, state),
});

const DefaultPusDataContainer = connect(
  mapStateToProps, {}
)(DefaultPusData);

DefaultPusDataContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
};

export default DefaultPusDataContainer;
