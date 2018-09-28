import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import { computeOptions } from 'viewManager/commonEditor/Fields/common';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

export default class ComObject extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    // from container mapStateToProps
    allowedComObjects: PropTypes.arrayOf(PropTypes.shape()),
    // from container mapDispatchToProps
    askCatalogItemComObjects: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    name: 'connectedData.comObject',
    allowedComObjects: null,
  };

  componentWillReceiveProps(nextProps) {
    nextProps.askCatalogItemComObjects();
  }

  _getPlaceholder = () => {
    const { loading, loaded } = this.props;

    if (loading) {
      return 'Loading catalog items...';
    }

    if (loaded) {
      return 'Select a catalog item...';
    }

    return '';
  };

  render() {
    const {
      name,
      allowedComObjects,
      loaded,
    } = this.props;

    return (
      <ErrorBoundary>
        <Field
          format={null}
          name={name}
          component={ReactSelectField}
          clearable
          disabled={!loaded}
          options={computeOptions(allowedComObjects)}
          placehoder={this._getPlaceholder()}
        />
      </ErrorBoundary>
    );
  }
}
