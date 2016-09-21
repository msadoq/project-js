/* eslint-disable no-unused-expressions */
const { should } = require('../utils/test');

const validate = require('./validation');

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
    }
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
    should.not.exist(validate('page', page))
  });
  it('runtime imported schema', () => {
    should.not.exist(validate('simplePage', page, require('./schemas/page.schema.json')))
  });
  it('errors', () => {
    validate('page', pageInvalid).should.be.an('array').with.lengthOf(3);
    validate('unknown', pageInvalid).should.be.an('error');
  });
});
