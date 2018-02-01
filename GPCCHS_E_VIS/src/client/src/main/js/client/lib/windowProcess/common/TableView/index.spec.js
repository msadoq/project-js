import _ from 'lodash/fp';
import React from 'react';
import renderer from 'react-test-renderer';
import { Table } from '.';

const row1 = {
  type: 'row',
  data: { a: 'aaa', b: 'bbb', c: 'ccc' },
};

const row2 = {
  type: 'row',
  data: { a: 'AAA', b: 'BBB', c: 'CCC' },
};

const rows = [
  { ...row1, mainRow: row1 },
  { type: 'subrow_header_title', data: 'TRANSITIONS', mainRow: row1 },
  { type: 'subrow_header', mainRow: row1 },
  { type: 'subrow', mainRow: row1, data: { d: 'ddd', e: 'eee', f: 'fff' } },
  { type: 'subrow', mainRow: row1, data: { d: 'DDD', e: 'EEE', f: 'FFF' } },
  { ...row2, mainRow: row2 },
  { type: 'subrow_header_title', data: 'TRANSITIONS', mainRow: row2 },
  { type: 'subrow_header', mainRow: row2 },
  { type: 'subrow', mainRow: row2, data: { d: 'dddd', e: 'eeee', f: 'ffff' } },
  { type: 'subrow', mainRow: row2, data: { d: 'DDDD', e: 'EEEE', f: 'FFFF' } },
];

const propsStub = {
  search: {},
  onSearch: _.noop,
  enableSearch: true,
  onClickSearchIcon: _.noop,
  cols: ['a', 'b', 'c'],
  subCols: ['d', 'e', 'f'],
  sort: {
    column: 'a',
    mode: 'ASC',
  },
  toggleSort: _.noop,
  disableSelection: false,
  onMouseEnter: _.noop,
  onMouseLeave: _.noop,
  onCollapse: _.noop,
  onUncollapse: _.noop,
  onClickRow: _.noop,
  onScrollUp: _.noop,
  onScrollDown: _.noop,
  containerHeight: 450,
  rowHeight: 22,
  nbDisplayedRows: 10,
  rows,
};

test('TableView renders correctly', () => {
  const tree = renderer.create(
    <Table {...propsStub} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
