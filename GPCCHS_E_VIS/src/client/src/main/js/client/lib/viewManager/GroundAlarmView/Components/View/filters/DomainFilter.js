import React, { PropTypes } from 'react';
import _ from 'lodash/fp';
import Select from 'react-select';

import { when } from '../../../../../common/fp';
import { get } from '../../../../../common/configurationManager';

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
      { value: domain, label: domain },
      ...availableDomains.map(({ name }) => ({ value: name, label: name })),
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

export default DomainFilter;
