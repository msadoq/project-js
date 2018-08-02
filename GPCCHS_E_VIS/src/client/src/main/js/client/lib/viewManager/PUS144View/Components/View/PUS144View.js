import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import parameters from 'common/configurationManager';
import _ from 'lodash/fp';

import './PUS144View.scss';
import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';
import { addTooltipWithContent } from '../../../common/pus/tooltip';


const checksumColor = parameters.get('PUS_CONSTANTS').CHECKSUM_COLOR;

/**
 * @param date
 * @returns {string}
 */
const formatDate = date => (
  (new Date(date)) > 0
    ? (new Date(date)).toISOString()
    : date
);

// ON BOARD PARTITIONS
const onBoardPartitionsTooltips = {
  fileId: { mode: 'lastUpdateModeOnBoardFileId', time: 'lastUpdateTimeOnBoardFileId' },
  fileType: { mode: 'lastUpdateModeFileType', time: 'lastUpdateTimeFileSize' },
  fileSize: { mode: 'lastUpdateModeFileSize', time: 'lastUpdateTimeFileType' },
  fileCreationTime: { mode: 'lastUpdateModeFileCreationTime', time: 'lastUpdateTimeFileCreationTime' },
  fileProtectionStatus: { mode: 'lastUpdateModeFileProtectionStatus', time: 'lastUpdateTimeFileProtectionStatus' },
  fileMode: { mode: 'lastUpdateModeFileMode', time: 'lastUpdateTimeFileMode' },
  fileAddress: { mode: 'lastUpdateModeFileAddress', time: 'lastUpdateTimeFileAddress' },
  uploadedFileChecksum: { mode: 'lastUpdateModeUploadedChecksum', time: 'lastUpdateTimeUploadedChecksum' },
  computedFileChecksum: { mode: 'lastUpdateModeComputedChecksum', time: 'lastUpdateTimeComputedChecksum' },
};

const tableModifier = tooltips =>
  (cellContent = {}, content = {}) => {
    const { colKey, value } = cellContent;
    // empty cell should not received tooltip
    if (typeof value === 'string' && value.length === 0) {
      return cellContent;
    }
    const toolT = tooltips[colKey];
    // no tooltip when undefined
    if (toolT === undefined) {
      return cellContent;
    }
    let modifiedCell = cellContent;
    if (colKey === 'computedFileChecksum') {
      const { isChecksumOk, uploadedFileChecksum } = content;
      // cell shoul be colored
      if (uploadedFileChecksum.length > 0 && value.length > 0) {
        modifiedCell = _.set(
          'checksum',
          isChecksumOk ? 'CHECKSUM_OK' : 'CHECKSUM_KO',
          modifiedCell
        );
      }
    }

    return addTooltipWithContent(
      modifiedCell,
      content,
      {
        lastUpdateMode: {
          key: toolT.mode,
        },
        lastUpdateTime: {
          key: toolT.time,
          format: formatDate,
        },
      }
    );
  };

const _onBoardPartitionsModifier = tableModifier(onBoardPartitionsTooltips);


const tableOverrideStyle = ({ content }) => {
  const { colKey, checksum } = content;
  if (checksum && colKey === 'computedFileChecksum') {
    return { backgroundColor: checksumColor[checksum] };
  }
  return {};
};


export default class PUS144View extends React.Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    // From PUS144ViewContainer mapStateToProps
    serviceApid: PropTypes.number,
    apids: PropTypes.arrayOf(PropTypes.shape({
      apidName: PropTypes.string,
      apidRawValue: PropTypes.string,
    })),
  };

  static defaultProps = {
    serviceApid: null,
    apids: [],
  };

  static contextTypes = {
    windowId: PropTypes.string,
  };

  render() {
    const {
      serviceApid,
      apids,
      viewId,
    } = this.props;

    if (!isValid(apids, serviceApid)) {
      return renderInvald('Please fill-in configuration');
    }

    return (
      <ErrorBoundary>
        <div className="pus144">
          <div className="col-sm-12">
            <div style={{ height: 400 }}>
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'onBoardPartitions'}
                contentModifier={_onBoardPartitionsModifier}
                overrideStyle={tableOverrideStyle}
              />
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export const isValid = (apids, applicationProcessId) =>
  Array.isArray(apids) && apids.length > 0 && typeof applicationProcessId === 'number'
;

export const renderInvald = error => (
  <div className="pus144 h100 posRelative">
    <div className="flex h100">
      <div className="renderErrorText">
        Unable to render view <br />
        {error}
      </div>
    </div>
  </div>
);
