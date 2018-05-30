import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getSelectedDomainInForm,
  getSelectedSessionName,
} from 'viewManager/commonEditor/Fields/selectors';
import DefaultPusData from './DefaultPusData';

const mapStateToProps = (state, { form }) => ({
  selectedDomainName: getSelectedDomainInForm(form, state),
  selectedSessionName: getSelectedSessionName(form, state),
});

const DefaultPusDataContainer = connect(
  mapStateToProps, {}
)(DefaultPusData);

const { string } = PropTypes;

DefaultPusDataContainer.propTypes = {
  viewId: string.isRequired,
  pageId: string.isRequired,
};

export default DefaultPusDataContainer;
