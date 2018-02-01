import React from 'react';
import renderer from 'react-test-renderer';
import SelectTimebar, { TimebarSelection, TimebarCreation } from './SelectTimebar';

const _each = require('lodash/each');

describe('SelectTimebar :: render', () => {
  const propsStub = {
    mountPageTimebar: () => null,
    createNewTimebar: () => null,
    timebars: {
      '1ad5eeb6-ce8f-4a86-a020-22eaa77ec126': {
        id: 'foo',
        uuid: '1ad5eeb6-ce8f-4a86-a020-22eaa77ec126',
      },
      '4b5b4107-4393-4655-80ef-7fc82d1cb24a': {
        id: 'bar',
        uuid: '4b5b4107-4393-4655-80ef-7fc82d1cb24a',
      },
    },
    pageId: '7cca0550-e773-4329-ae9c-939367c7b05a',
  };
  test('SelectTimebar :: render :: nominal case', () => {
    const tree = renderer.create(
      <SelectTimebar
        mountPageTimebar={propsStub.mountPageTimebar}
        createNewTimebar={propsStub.createNewTimebar}
        timebars={propsStub.timebars}
        pageId={propsStub.pageId}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  _each(['select', 'hidden'], (form) => {
    _each(['This timebar name is already taken', null], (error) => {
      test(`TimebarSelection :: ${form}-${error}`, () => {
        const tree = renderer.create(
          <TimebarSelection
            form={form}
            error={error}
            onCreate={() => null}
            onChange={() => null}
            switchForm={() => null}
            assignTimebarId={() => null}
          />
        ).toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
  _each(['select', 'hidden'], (form) => {
    test(`TimebarCreation :: ${form}`, () => {
      const tree = renderer.create(
        <TimebarCreation
          form={form}
          timebars={propsStub.timebars}
          onSelect={() => null}
          switchForm={() => null}
          assignTimebarSelect={() => null}
        />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
