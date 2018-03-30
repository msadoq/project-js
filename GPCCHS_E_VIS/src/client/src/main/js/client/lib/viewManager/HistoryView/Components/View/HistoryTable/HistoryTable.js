
import React from 'react';
import PropTypes from 'prop-types';

import './HistoryTable.scss';

import GroupTable from '../GroupTable/GroupTable';

const metaDataType =
  PropTypes.shape({
    currentIndex: PropTypes.number,
  });

const dataType = PropTypes.arrayOf(GroupTable.propTypes);

const HistoryTable = ({ meta, data }) => (
  <div className={'HistoryTable'}>
    {
      data.map(
        group =>
          <GroupTable
            title={group.title}
            cols={group.cols}
            data={group.data}
            outlinedIndex={meta.currentIndex}
          />
      )
    }
  </div>
);

HistoryTable.propTypes = {
  meta: metaDataType.isRequired,
  data: dataType.isRequired,
};

export default HistoryTable;
