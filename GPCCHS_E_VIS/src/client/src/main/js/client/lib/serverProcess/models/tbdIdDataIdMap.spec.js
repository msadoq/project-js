import { get, add, getFilters } from './tbdIdDataIdMap';

describe('models/tbdIdDataIdMap', () => {
  test('Add dataId', () => {
    add('Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:field1.operator1.operand1:field2.operator2.operand2', { myDataId: 'mydataid' });
    expect(get('Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:field1.operator1.operand1:field2.operator2.operand2')).toMatchObject({ myDataId: 'mydataid' });
  });

  test('Get filters : no filter', () => {
    expect(getFilters('Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:')).toEqual([]);
  });

  test('Get filters : 2 filters', () => {
    expect(getFilters('Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:field1.operator1.operand1:field2.operator2.operand2')).toEqual([{
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
