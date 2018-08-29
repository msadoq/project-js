/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Field } from 'redux-form';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';

import styles from './PUSSaveInFileModal.css';


class PUSSaveInFileModal extends React.Component {

  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    sendPUSSaveInFileRequest: PropTypes.func.isRequired,
    apids: PropTypes.arrayOf(PropTypes.shape()),
    name: PropTypes.string,
  };

  static defaultProps = {
    apids: [],
    name: 'serviceType',
  }
  constructor(props) {
    super(props);
    this.state = {
      apids: null,
    };
  }

  _updateAPID = (ev) => {
    this.setState({
      ...this.state,
      apid: ev.target.value,
    });
  };

  _onSubmit = () => {
    const { apid } = this.state;
    this.props.sendPUSSaveInFileRequest(apid);

    this.props.closeModal();
  };

  _onCancel = () => {
    this.props.closeModal();
  };

  render() {
    const { apids, name } = this.props;

    return (
      <div className={styles.modalContainer}>

        <div className={styles.inputContainer}>
          <label htmlFor="serviceType">Service type :
            <input
              name="serviceType"
              onChange={this._updateServiceType}
              disabled
              value={name.slice(0, name.length - 2)}
            />
          </label>
        </div>
        <div className={styles.selectInput}>
          <label htmlFor="connectedData.apidName">Apid Selection :
          <Field
            format={null}
            name="connectedData.apidName"
            component={ReactSelectField}
            options={apids}
            className="col-xs-12 pr0"
            onChange={this.handleChange}
            multi
            closeOnSelect={false}
            simpleValue
          />
          </label>
        </div>
      </div>
    );
  }
}

export default PUSSaveInFileModal;
