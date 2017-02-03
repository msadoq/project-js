/* eslint-disable no-unused-expressions */
import { should } from '../common/test';
import validate from './validation';
import schema from './schemas/page.schema.json';

const page = { type: 'Page', hideBorders: false, title: 'Page example', views: [] };
const pageInvalid = { type: 'View', foo: 'bar' };
const pageSchema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
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
    validate.should.be.a('function');
  });
  it('accepts 2 or 3 params', () => {
    validate('page').should.be.an('error');
    validate('page', page, pageSchema, 'foo').should.be.an('error');
  });
  it('pre-existing schema', () => {
    should.not.exist(validate('page', page));
  });
  it('runtime imported schema', () => {
    should.not.exist(validate('simplePage', page, schema));
  });
  it('errors', () => {
    validate('unknown', page).should.be.an('error');
    validate('unknown', pageInvalid).should.be.an('error');
    validate('page', pageInvalid).should.be.an('error');
  });
});
