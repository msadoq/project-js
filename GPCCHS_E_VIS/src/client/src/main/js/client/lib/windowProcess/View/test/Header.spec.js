import React from 'react';
import { shallow } from 'enzyme';
import { get } from 'common/configurationManager';
import Header from '../Header';

const multiDomainColor = get('DOMAINS_COLORS').find(c => c.multi).multi;

describe('Header', () => {
  it('.getBackgroundColorByViewDomains returns a color when only one defined domain', () => {
    const domains = ['fr.cnes.isis'];
    const header = shallow(
      <Header domains={domains} />
    );
    expect(header.instance().getBackgroundColorByViewDomains()).not.toEqual(multiDomainColor);
  });

  it('.getBackgroundColorByViewDomains returns null when several distinct domains', () => {
    const domains = ['fr.cnes.isis', 'fr.cnes.isis.simupus'];
    const header = shallow(
      <Header domains={domains} />
    );
    expect(header.instance().getBackgroundColorByViewDomains()).toEqual(multiDomainColor);
  });

  it('.getBackgroundColorByViewDomains takes page domain, if exists, in place of *', () => {
    const domains = ['fr.cnes.isis', '*'];
    const header = shallow(
      <Header domains={domains} pageDomain="fr.cnes.isis" />
    );
    expect(header.instance().getBackgroundColorByViewDomains()).not.toEqual(multiDomainColor);
  });

  it('.getBackgroundColorByViewDomains takes workspace domain, if no place domain, in place of *', () => {
    const domains = ['fr.cnes.isis', '*'];
    const header = shallow(
      <Header domains={domains} workspaceDomain="fr.cnes.isis" />
    );
    expect(header.instance().getBackgroundColorByViewDomains()).not.toEqual(multiDomainColor);
  });

  it('.getBackgroundColorByViewDomains prefers place domain over workspace domain if both are defined', () => {
    const domains = ['fr.cnes.isis', '*'];
    const header = shallow(
      <Header
        domains={domains}
        pageDomain="fr.cnes.isis.simupus"
        workspaceDomain="fr.cnes.isis"
      />
    );
    expect(header.instance().getBackgroundColorByViewDomains()).toEqual(multiDomainColor);
  });
});
