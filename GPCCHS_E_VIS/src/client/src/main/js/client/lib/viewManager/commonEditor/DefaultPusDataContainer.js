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

const { string } = PropTypes;

DefaultPusDataContainer.PropTypes = {
  viewId: string.isRequired,
  pageId: string.isRequired,
};

export default DefaultPusDataContainer;
