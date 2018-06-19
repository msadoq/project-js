// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Move documentManager in serverProcess .
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import schema from 'common/viewConfigurationFiles/schemas/page.schema.json';
import validate, { formatError, verboseFormatError } from './validation';

const page = { type: 'Page', hideBorders: false, title: 'Page example', views: [] };
const pageInvalid = { type: 'View', foo: 'bar' };
const pageSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  definitions: {},
  properties: {
    type: {
      type: 'string',
      enum: ['Page'],
    },
    title: {
      type: 'string',
    },
  },
  required: ['type', 'title'],
};

describe('documents/validation', () => {
  test('is function', () => {
    expect(typeof validate).toBe('function');
  });
  test('accepts 2 or 3 params', () => {
    expect(validate('page')).toBeInstanceOf(Error);
    expect(validate('page', page, pageSchema, 'foo')).toBeInstanceOf(Error);
  });
  test('pre-existing schema', () => {
    expect(validate('page', page)).toBeFalsy();
  });
  test('runtime imported schema', () => {
    expect(validate('simplePage', page, schema)).toBeFalsy();
  });
  test('errors', () => {
    expect(validate('unknown', page)).toBeInstanceOf(Error);
    expect(validate('unknown', pageInvalid)).toBeInstanceOf(Error);
    expect(validate('page', pageInvalid)).toBeInstanceOf(Error);
    expect(validate('page', {})).toBeInstanceOf(Error);
  });

  const workspaceToValidate = {
    type: 'WorkSpace',
    windows: [
      {
        type: 'documentWindow',
        title: 'Development workspace',
        geometry: {
          w: 1536,
          h: 851,
          x: 1612,
          y: 45,
          kind: 'Absolute',
        },
        pages: [
          {
            path: '/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/client/src/main/js/client/data/pages/dev.page1.vipg',
            timebarId: 'TB1',
          },
          {
            path: '/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/client/src/main/js/client/data/pages/dev.page1.vipg',
          },
        ],
      },
    ],
    timebars: [
      {
        id: 'TB1',
        type: 'timeBarConfiguration',
        rulerResolution: 1776.6027759418373,
        speed: 0.15,
        masterId: 'Session 1',
        mode: 'Normal',
        visuWindow: {
          defaultWidth: 60000,
        },
        timelines: [
          {
            id: 'Session 1',
            offset: 0,
            kind: 'Session',
            sessionName: 'Master',
            color: null,
          },
        ],
      },
    ],
  };

  test('errors format', () => {
    const validationErrors = validate('workspace', workspaceToValidate);
    expect(validationErrors.message).toEqual(
      'Local page should have required property \'timebarId\'\n' +
      'Development workspace should NOT have additional properties\n' +
      'documentWindow should be equal to constant\n' +
      'Development workspace should have required property \'kind\'\n' +
      'Development workspace should have required property \'timebarId\'\n' +
      'Development workspace should match exactly one schema in oneOf');
  });
  describe('formatError', () => {
// eslint-disable-next-line array-callback-return
    [{}, undefined, '', null, { params: [] }].map((props) => {
      it(`should not prompt an error with invalid prop (${JSON.stringify(props)}) in error`, () => {
        expect(formatError(props)).toEqual(' ');
      });
    });
    it(`should not prompt an error with invalid prop (${JSON.stringify({ dataName: 'dataName' })}) in error`, () => {
      expect(formatError({ dataName: 'dataName' })).toEqual('dataName ');
    });
    it(`should not prompt an error with invalid prop (${JSON.stringify({ message: 'message' })}) in error`, () => {
      expect(formatError({ dataName: 'message' })).toEqual('message ');
    });
    it('should work in nominal case', () => {
      expect(formatError({ dataName: 'dataName', message: 'message' })).toEqual('dataName message');
    });
  });
  describe.only('verboseFormatError', () => {
// eslint-disable-next-line array-callback-return
    [{}, undefined, '', null, { params: [] }].map((props) => {
      it(`should not prompt an error with invalid prop (${JSON.stringify(props)}) in error`, () => {
        expect(verboseFormatError(props)).toEqual('' +
          '\nValidation error:  ' +
          '\ndata: undefined'
        );
      });
    });
    it(`should not prompt an error with invalid prop (${JSON.stringify({ dataName: 'dataName' })}) in error`, () => {
      expect(verboseFormatError({ dataName: 'dataName' })).toEqual(
        '\nValidation error: dataName ' +
        '\ndata: undefined'
      );
    });
    it(`should not prompt an error with invalid prop (${JSON.stringify({ message: 'message' })}) in error`, () => {
      expect(verboseFormatError({ dataName: 'message' })).toEqual(
        '\nValidation error: message ' +
        '\ndata: undefined'
      );
    });
    it('should work in nominal case', () => {
      expect(verboseFormatError({ dataName: 'dataName', message: 'message' })).toEqual(
        '\nValidation error: dataName message' +
        '\ndata: undefined'
      );
    });
  });
});
