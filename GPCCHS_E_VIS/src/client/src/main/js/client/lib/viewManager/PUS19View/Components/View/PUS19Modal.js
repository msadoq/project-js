/* eslint-disable react/no-array-index-key,react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Glyphicon,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import { createTableData } from '../../../common/pus/tooltip';

import styles from './PUS19Modal.css';
import './PUS19Modal.scss';

const popoverTrigger = ['hover', 'focus'];
const popoverStyle = {
  height: 50,
};

const _createInfoPopover = obj => (
  <Popover
    id={'commands-timeshifts-info'}
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

const _createInfoOverlay = (obj, children = InfoIcon) =>
  (
    <OverlayTrigger
      trigger={popoverTrigger}
      placement="right"
      overlay={_createInfoPopover({
        'Last update time': obj.lastUpdateTime,
        'Last update mode': obj.lastUpdateMode,
      })}
    >
      {children}
    </OverlayTrigger>
  );


const renderBinaryProfile = binaryProfile => (
  <div>
    <h4>
      Binary profile
      {_createInfoOverlay(binaryProfile)}
    </h4>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th />
          <th>01</th>
          <th>02</th>
          <th>03</th>
          <th>04</th>
          <th>05</th>
          <th>06</th>
          <th>07</th>
          <th>08</th>
        </tr>
      </thead>
      <tbody>
        {
        binaryProfile.commandBinaryProfile.map((row, i) => (
          <tr key={`pus11modal-binary-profile-table-tr${i}`}>
            <th>{i}</th>
            {
              row.map((cell, k) => (
                <td key={`pus11modal-binary-profile-table-tr${i}-td${k}`}>
                  {cell.toUpperCase() /* .toString(16) */ }
                </td>
              ))
            }
          </tr>
        ))
      }
      </tbody>
    </table>
  </div>
);


export default class PUS11Modal extends PureComponent {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    binaryProfile: PropTypes.shape({
      commandBinaryProfile: PropTypes.arrayOf(PropTypes.any),
      lastUpdateModeBinProf: PropTypes.string,
      lastUpdateTimeBinProf: PropTypes.number,
    }),
  };

  render() {
    const { closeModal, binaryProfile } = this.props;
    return (
      <ErrorBoundary>
        <div className="row pus19Modal">
          {renderBinaryProfile(binaryProfile)}
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
