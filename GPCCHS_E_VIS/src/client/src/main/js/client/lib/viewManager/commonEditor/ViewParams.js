// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting
//  between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Move general variables at top level of a view
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add possibility to modify domainName and sessionName
//  from GUI for view, page, window and workspace
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add possibility to modify domainName and sessionName
//  from GUI for view, page, window and workspace
// VERSION : 2.0.0.1 : FA : #11627 : 13/04/2018 : deal with multidomain sat colors
// END-HISTORY
// ====================================================================

import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import ViewParamsForm from './ViewParamsForm';

export default class ViewParams extends React.Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    updateTitle: PropTypes.func.isRequired,
    updateTitleStyle: PropTypes.func.isRequired,
    updateDomainName: PropTypes.func.isRequired,
    updateSessionName: PropTypes.func.isRequired,
    backgroundColor: PropTypes.string,
    title: PropTypes.string,
    titleStyle: PropTypes.shape({
      font: PropTypes.string,
      size: PropTypes.number,
      bold: PropTypes.bool,
      italic: PropTypes.bool,
      underline: PropTypes.bool,
      strikeOut: PropTypes.bool,
      align: PropTypes.string,
      color: PropTypes.string,
    }),
    links: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })).isRequired,
    defaultRatio: PropTypes.shape({
      length: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }).isRequired,
    domains: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    sessions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    domainName: PropTypes.string,
    sessionName: PropTypes.string,
  };

  static defaultProps = {
    title: '',
    titleStyle: {
      font: 'Arial',
      size: 12,
      bold: false,
      italic: false,
      underline: false,
      strikeOut: false,
      align: 'left',
      color: '#000000',
    },
    backgroundColor: '#000000',
    domainName: '*',
    sessionName: '*',
<<<<<<< HEAD
=======
  };

  static getNewForm() {
    return reduxForm({
      validate,
    })(ViewParamsForm);
  }

  /**
   * empty form in the state
   * this form will be fill in componentWillReceiveProps with initial values
   * TODO jmira check with Yann and Jean (redundance)
   * common code here, less severe
   */
  state = {
    FormForView: ViewParams.getNewForm(),
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.viewId !== this.props.viewId) {
      this.setState({ FormForView: ViewParams.getNewForm() });
    }
>>>>>>> R12-dev
  }

  handleSubmit = (values) => {
    const {
      updateTitle, updateTitleStyle, viewId,
      updateDomainName, updateSessionName,
    } = this.props;

    if (this.props.title !== values.title) {
      updateTitle(viewId, values.title);
    }
    if (this.props.titleStyle !== values.titleStyle) {
      updateTitleStyle(viewId, values.titleStyle);
    }
    if (this.props.domainName !== values.domainName) {
      updateDomainName(viewId, values.domainName);
    }
    if (this.props.sessionName !== values.sessionName) {
      updateSessionName(viewId, values.sessionName);
    }
  };

  render() {
    const {
      backgroundColor,
      title,
      titleStyle,
      links,
      defaultRatio,
      viewId,
      domains,
      sessions,
      domainName,
      sessionName,
    } = this.props;
    const initVals = {
      backgroundColor,
      title,
      titleStyle,
      links,
      defaultRatio,
      domainName,
      sessionName,
    };

    /**
     * get form from the state
     */
    const { FormForView } = this.state;
    return (
      <FormForView
        initialValues={initVals}
        onSubmit={this.handleSubmit}
        form={`view-title-form-${viewId}`}
        domains={domains}
        sessions={sessions}
      />
    );
  }
}

const requiredFields = ['title'];
const validate = (values = {}) => {
  const errors = {};

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};
