import React from 'react';
import PropTypes from 'prop-types';

import Color from 'color';
import generateColor from 'string-to-color';

import './GroupHeaders.scss';

const GroupHeaders = ({ groups }) => (
  <tr className={'GroupHeaders'}>
    {
      Object.keys(groups)
        .map((groupKey) => {
          const groupColor = new Color(generateColor(groupKey));
          const borderColor = groupColor.darken(0.5);

          return (
            <th
              key={groupKey}
              colSpan={groups[groupKey]}
              style={{
                backgroundColor: groupColor.hsl().string(),
                borderBottom: `1px solid ${borderColor.hsl().string()}`,
              }}
            >
              {groupKey}
            </th>
          );
        })
    }
  </tr>
);

GroupHeaders.propTypes = {
  groups: PropTypes.shape().isRequired,
};

export default GroupHeaders;
