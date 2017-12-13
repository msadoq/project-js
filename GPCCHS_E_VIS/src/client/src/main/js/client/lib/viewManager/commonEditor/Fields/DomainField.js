import React, { PropTypes, PureComponent } from 'react';
import { Field } from 'redux-form';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import { domainsType } from './types';

const { string } = PropTypes;

export default class DomainField extends PureComponent {
  static propTypes = {
    domains: domainsType.isRequired,
    domainName: string,
    name: string,
  };

  static defaultProps = {
    domainName: null,
    name: 'domain',
  };

  state = {
    domain: null,
  };

  newDomain = (domain) => {
    this.setState({ domain });
  };

  render() {
    const { domains, domainName, name } = this.props;
    const { domain } = this.state;

    return (
      <Field
        name={name}
        component={ReactSelectField}
        onInputChange={this.newDomain}
        clearable
        options={computeDomainFieldOptions(domains, domain, domainName)}
      />
    );
  }
}

/**
 * @param domains
 * @param domain
 * @param domainName
 */
export const computeDomainFieldOptions = (domains, domain, domainName) => {
  let options =
  domains.map(d =>
    ({
      label: d.name,
      value: d.name,
    })
  );
  options = options.concat(
    domain && !options.find(s => s.value === domain)
      ? { label: domain, value: domain }
      : []
  );
  options = options.concat(
    domainName && !options.find(s => s.value === domainName)
      ? { label: domainName, value: domainName }
      : []
  );
  options = options.concat({
    label: '*',
    value: '*',
  });

  return options;
};
