import React, { PropTypes } from 'react';
import _ from 'lodash/fp';
import { Col } from 'react-bootstrap';
import Select from 'react-select';

import { when } from '../../../../common/fp';
import { get } from '../../../../common/configurationManager';
import * as constants from '../../../../constants';

const MODES = [
  { value: constants.ALARM_MODE_ALL, label: 'All' },
  { value: constants.ALARM_MODE_NONNOMINAL, label: 'Non nominal' },
  { value: constants.ALARM_MODE_TOACKNOWLEDGE, label: 'To Acknowledge' },
];

const isFalsy = x => !x;
const wildcard = get('WILDCARD_CHARACTER');

class DomainFilter extends React.Component {
  handleOnChange = change => _.compose(
    this.props.updateDomain,
    when(isFalsy, _.always(wildcard)),
    _.get('value')
  )(change)

  render() {
    const { domain, availableDomains } = this.props;
    const options = _.uniqBy('value', [
      { value: wildcard, label: wildcard },
      ...availableDomains.map(({ name }) => ({ value: name, label: name })),
      { value: domain, label: domain },
    ]);
    return (
      <span>
        Domain
        <Select.Creatable
          clearable={domain !== wildcard}
          options={options}
          value={domain}
          promptTextCreator={x => `Filter by domain: '${x}'`}
          onChange={this.handleOnChange}
        />
      </span>
    );
  }
}
DomainFilter.propTypes = {
  domain: PropTypes.string.isRequired,
  availableDomains: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
  updateDomain: PropTypes.func.isRequired,
};

const GroundAlarmFilters = props => (
  <div>
    <Col xs={4}>Timeline <Select /></Col>
    <Col xs={4}>
      <DomainFilter
        domain={props.domain}
        availableDomains={props.availableDomains}
        updateDomain={props.updateDomain}
      />
    </Col>
    <Col xs={4}>
      Mode
      <Select
        clearable={false}
        options={MODES}
        value={props.mode}
        onChange={({ value }) => props.updateMode(value)}
      />
    </Col>
  </div>
);
GroundAlarmFilters.propTypes = {
  mode: PropTypes.string.isRequired,
  updateMode: PropTypes.func.isRequired,
  domain: PropTypes.string.isRequired,
  availableDomains: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
  updateDomain: PropTypes.func.isRequired,
  // timeline: PropTypes.string.isRequired,
  // updateTimeline: PropTypes.func.isRequired,
};

export default GroundAlarmFilters;
