import React from 'react';
import PropTypes from 'prop-types';

import generateColor from 'string-to-color';

const GroupHeaders = ({ groups }) => (
  <tr className={'GroupHeaders'}>
    {
      Object.keys(groups)
        .map(groupKey =>
          <th
            key={groupKey}
            colSpan={groups[groupKey]}
            style={{
              backgroundColor: generateColor(groupKey),
            }}
          >
            {groupKey}
          </th>)
    }
  </tr>
);

GroupHeaders.propTypes = {
  groups: PropTypes.shape().isRequired,
};

export default GroupHeaders;
