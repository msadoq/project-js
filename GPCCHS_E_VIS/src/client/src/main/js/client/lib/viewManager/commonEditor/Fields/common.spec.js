import { computeOptions } from 'viewManager/commonEditor/Fields/common';

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
describe('common :: render', () => {
  test('full with wildcards', () => {
    const options = computeOptions(
      propsStub.domains,
      true
    );
    expect(options).toEqual([
      { label: 'fr.cnes.isis', value: 'fr.cnes.isis' },
      { label: 'fr.cnes.isis.simupus', value: 'fr.cnes.isis.simupus' },
      { label: '*', value: '*' },
    ]);
  });
  test('empty with wildcards', () => {
    const options = computeOptions(
      [],
      true
    );
    expect(options).toEqual([
      { label: '*', value: '*' },
    ]);
  });
  test('no wildcards', () => {
    const options = computeOptions(
      propsStub.domains,
      false
    );
    expect(options).toEqual([
      { label: 'fr.cnes.isis', value: 'fr.cnes.isis' },
      { label: 'fr.cnes.isis.simupus', value: 'fr.cnes.isis.simupus' },
    ]);
  });
  test('empty no wildcards', () => {
    const options = computeOptions(
      [],
      false
    );
    expect(options).toEqual([]);
  });
});
