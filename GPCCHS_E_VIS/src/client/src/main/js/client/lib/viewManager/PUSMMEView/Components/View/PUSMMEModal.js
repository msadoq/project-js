/* eslint-disable react/no-array-index-key,react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import {
  Button,
  Glyphicon,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import { createTableData } from '../../../common/pus/tooltip';

import styles from './PUSMMEModal.css';
import './PUSMMEModal.scss';


const popoverTrigger = ['hover', 'focus'];
const popoverStyle = {
  height: 50,
};

const _createInfoPopover = obj => (
  <Popover
    id={'packets-info'}
    placement="bottom"
    style={popoverStyle}
  >
    {createTableData(obj)}
  </Popover>
);

const InfoIcon = (<Glyphicon
  className={styles.InfoIcon}
  glyph="info-sign"
/>);

const _createTooltip = (obj, keyMap, children = InfoIcon) =>
  (
    <OverlayTrigger
      trigger={popoverTrigger}
      placement="bottom"
      overlay={_createInfoPopover({
        'Last update time': obj[keyMap.lastUpdateTime],
        'Last update mode': obj[keyMap.lastUpdateMode],
      })}
    >
      {children}
    </OverlayTrigger>
  );

const renderPacketStore = (packetStore) => {
  const storeIdKeyMap = {
    lastUpdateTime: 'lastUpdateTimeStoreId',
    lastUpdateMode: 'lastUpdateModeStoreId',
  };

  const storeStatusKeyMap = {
    lastUpdateTime: 'lastUpdateTimeStoreStatus',
    lastUpdateMode: 'lastUpdateModeStoreStatus',
  };

  const subSamplingRatioKeyMap = {
    lastUpdateTime: 'lastUpdateTimeSubSamplingRatio',
    lastUpdateMode: 'lastUpdateModeSubSamplingRatio',
  };

  return (
    <div className={styles.container}>
      <h4>
        Packet Store
      </h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>storeId</th>
            <th>storeName</th>
            <th>storeStatus</th>
            <th>subSamplingRatio</th>
          </tr>
        </thead>
        <tbody>
          {
          packetStore.map(row => (
            <tr key={`${shortid.generate()}`}>
              {
                  _createTooltip(
                    row,
                    storeIdKeyMap,
                    <td><span>{row.storeId}</span></td>
                  )
                }
              <td>
                <span>{row.storeName}</span>
              </td>
              {
                  _createTooltip(
                    row,
                    storeStatusKeyMap,
                    <td><span>{row.storeStatus}</span></td>
                  )
                }
              {
                  _createTooltip(
                    row,
                    subSamplingRatioKeyMap,
                    <td><span>{row.subSamplingRatio}</span></td>
                  )
                }
            </tr>
            )
          )
        }
        </tbody>
      </table>
    </div>
  );
};

const renderPacketParameter = (packetParameter) => {
  const parameterFilteredStatusKeyMap = {
    lastUpdateTime: 'lastUpdateTimeStoreId',
    lastUpdateMode: 'lastUpdateModeFilteredStatus',
  };

  return (
    <div className={styles.container}>
      <h4>
        Packet Parameter
      </h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>parameterId</th>
            <th>parameterName</th>
            <th>parameterOrder</th>
            <th>parameterFilteredStatus</th>
          </tr>
        </thead>
        <tbody>
          {
          packetParameter.map(row => (
            <tr key={`${shortid.generate()}`}>
              <td>{row.parameterId}</td>
              <td>{row.parameterName}</td>
              <td>{row.parameterOrder}</td>
              {
                  _createTooltip(
                    row,
                    parameterFilteredStatusKeyMap,
                    <td><span>{row.parameterFilteredStatus}</span></td>
                  )
                }
            </tr>
            )
          )
        }
        </tbody>
      </table>
    </div>
  );
};

export default class PUSMMEModal extends PureComponent {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    packetStore: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    packetParameter: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  render() {
    const {
      closeModal,
      packetStore,
      packetParameter,
    } = this.props;
    return (
      <ErrorBoundary>
        <div className="row pusmmeModal">
          {renderPacketStore(packetStore)}
          {renderPacketParameter(packetParameter)}
        </div>
        <div className="text-right">
          <Button
            className="btn btn-default"
            onClick={() => closeModal()}
          >
            Close
          </Button>
        </div>
      </ErrorBoundary>
    );
  }
}
