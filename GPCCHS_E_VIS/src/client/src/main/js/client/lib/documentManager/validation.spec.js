import validate from './validation';
import schema from './schemas/page.schema.json';

const page = { type: 'Page', hideBorders: false, title: 'Page example', views: [] };
const pageInvalid = { type: 'View', foo: 'bar' };
const pageSchema = {
  $schema: 'http://json-schema.org/draft-06/schema#',
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
  it('is function', () => {
    expect(typeof validate).toBe('function');
  });
  it('accepts 2 or 3 params', () => {
    expect(validate('page')).toBeInstanceOf(Error);
    expect(validate('page', page, pageSchema, 'foo')).toBeInstanceOf(Error);
  });
  it('pre-existing schema', () => {
    expect(validate('page', page)).toBeFalsy();
  });
  it('runtime imported schema', () => {
    expect(validate('simplePage', page, schema)).toBeFalsy();
  });
  it('errors', () => {
    expect(validate('unknown', page)).toBeInstanceOf(Error);
    expect(validate('unknown', pageInvalid)).toBeInstanceOf(Error);
    expect(validate('page', pageInvalid)).toBeInstanceOf(Error);
    expect(validate('page', {})).toBeInstanceOf(Error);
  });
});
