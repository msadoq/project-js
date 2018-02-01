import { computeDomainFieldOptions } from './DomainField';

const propsStub = {
  domains: [
    {
      domainId: 1,
      itemNamespace: 'Domains',
      name: 'fr.cnes.isis',
      oid: '0051525005151000565215465660515',
      parentDomainId: 0,
    },
    {
      domainId: 2,
      itemNamespace: 'Domains',
      name: 'fr.cnes.isis.simupus',
      oid: '0051525005151000565215465660515',
      parentDomainId: 1,
    },
  ],
  domainName: 'fr.cnes.test',
};
describe('DomainField :: render', () => {
  test('DomainField :: computeDomainFieldOptions :: empty domain', () => {
    const options = computeDomainFieldOptions(
      propsStub.domains,
      propsStub.domain,
      propsStub.domainName
    );
    expect(options).toEqual([
      { label: 'fr.cnes.isis', value: 'fr.cnes.isis' },
      { label: 'fr.cnes.isis.simupus', value: 'fr.cnes.isis.simupus' },
      { label: 'fr.cnes.test', value: 'fr.cnes.test' },
      { label: '*', value: '*' },
    ]);
  });
  test('DomainField :: computeDomainFieldOptions :: non empty domain', () => {
    const options = computeDomainFieldOptions(
      propsStub.domains,
      'domain',
      propsStub.domainName
    );
    expect(options).toEqual([
      { label: 'fr.cnes.isis', value: 'fr.cnes.isis' },
      { label: 'fr.cnes.isis.simupus', value: 'fr.cnes.isis.simupus' },
      { label: 'domain', value: 'domain' },
      { label: 'fr.cnes.test', value: 'fr.cnes.test' },
      { label: '*', value: '*' },
    ]);
  });
  test('DomainField :: computeDomainFieldOptions :: same domain', () => {
    const options = computeDomainFieldOptions(
      propsStub.domains,
      propsStub.domainName,
      propsStub.domainName
    );
    expect(options).toEqual([
      { label: 'fr.cnes.isis', value: 'fr.cnes.isis' },
      { label: 'fr.cnes.isis.simupus', value: 'fr.cnes.isis.simupus' },
      { label: 'fr.cnes.test', value: 'fr.cnes.test' },
      { label: '*', value: '*' },
    ]);
  });
  test('DomainField :: computeDomainFieldOptions :: same domain & domainName as defined domains', () => {
    const options = computeDomainFieldOptions(
      propsStub.domains,
      propsStub.domains[0].name,
      propsStub.domains[0].name
    );
    expect(options).toEqual([
      { label: 'fr.cnes.isis', value: 'fr.cnes.isis' },
      { label: 'fr.cnes.isis.simupus', value: 'fr.cnes.isis.simupus' },
      { label: '*', value: '*' },
    ]);
  });
});
