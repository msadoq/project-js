import { get, add, getFilters } from './tbdIdDataIdMap';

describe('models/tbdIdDataIdMap', () => {
  test('Add dataId', () => {
    add('myTbdId', 'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:field1.operator1.operand1:field2.operator2.operand2');
    expect(get('myTbdId')).toEqual('Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:field1.operator1.operand1:field2.operator2.operand2');
  });

  test('Get filters : no filter', () => {
    add('myTbdId2', 'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:');
    expect(getFilters('myTbdId2')).toEqual([]);
  });

  test('Get filters : 2 filters', () => {
    add('myTbdId3', 'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:field1.operator1.operand1:field2.operator2.operand2');
    expect(getFilters('myTbdId3')).toEqual([{
      field: 'field1',
      operator: 'operator1',
      operand: 'operand1',
    }, {
      field: 'field2',
      operator: 'operator2',
      operand: 'operand2',
    }]);
  });
});
