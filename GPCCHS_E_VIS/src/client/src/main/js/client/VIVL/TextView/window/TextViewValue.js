import React, { PropTypes } from 'react';
import _ from 'lodash/fp';
import {
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';

import { stateColors } from '../../../lib/windowProcess/common/colors';

const getTextStyle = color => ({
  textShadow: `
    0 0 5px rgba(255, 255, 255, 0.1),
    0 0 10px rgba(255, 255, 255, 0.1),
    0 0 20px ${color},
    0 0 30px ${color},
    0 0 40px ${color},
    0 0 55px ${color},
    0 0 75px ${color}
  `,
  color,
});

const TextViewValue = ({ getEntryPoint, getValue }) => {
  const ep = getEntryPoint();
  const valueObj = getValue();

  if (ep) {
    const s = ep.error ?
    {
      style: getTextStyle('#FF0000'),
    }
    :
    {
      style: getTextStyle(
        _.cond([
          [
            _.pipe(_.get('monit'), _.negate(_.eq('info'))),
            _.pipe(_.prop('monit'), _.prop(_, stateColors), _.defaultTo('#00FF00')),
          ],
          [_.pipe(_.get('color'), _.isString), _.prop('color')],
          [_.stubTrue, _.constant('#00FF00')],
        ])(valueObj)
      ),
    };
    const value = _.propOr(
      _.prop('value', valueObj),
      'error', ep);

    if (ep.error) {
      return (
        <OverlayTrigger
          overlay={<Tooltip id="tooltip">{value}</Tooltip>}
        >
          <span
            style={s.style}
          >
            Invalid entry point
          </span>
        </OverlayTrigger>
      );
    }
    return (
      <span
        style={s.style}
      >
        {value}
      </span>
    );
  }
  return null;
};

TextViewValue.propTypes = {
  getEntryPoint: PropTypes.func.isRequired,
  getValue: PropTypes.func.isRequired,
};

export default TextViewValue;
