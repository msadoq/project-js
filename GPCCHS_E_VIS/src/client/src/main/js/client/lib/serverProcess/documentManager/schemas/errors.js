export default [
  {
    keyword: 'required',
    dataPath: '.windows[0].pages[1]',
    schemaPath: '#/properties/pages/items/allOf/1/required',
    params: {
      missingProperty: 'timebarId'
    },
    message: 'should have required property \'timebarId\''
  },
  {
    keyword: 'additionalProperties',
    dataPath: '.windows[0]',
    schemaPath: '#/additionalProperties',
    params: {
      additionalProperty: 'title'
    },
    message: 'should NOT have additional properties'
  },
  {
    keyword: 'additionalProperties',
    dataPath: '.windows[0]',
    schemaPath: '#/additionalProperties',
    params: {
      additionalProperty: 'pages'
    },
    message: 'should NOT have additional properties'
  },
  {
    keyword: 'const',
    dataPath: '.windows[0].type',
    schemaPath: '#/properties/type/const',
    params: {},
    message: 'should be equal to constant'
  },
  {
    keyword: 'required',
    dataPath: '.windows[0]',
    schemaPath: '#/required',
    params: {
      missingProperty: 'kind'
    },
    message: 'should have required property \'kind\''
  },
  {
    keyword: 'required',
    dataPath: '.windows[0]',
    schemaPath: '#/required',
    params: {
      missingProperty: 'timebarId'
    },
    message: 'should have required property \'timebarId\''
  },
  {
    keyword: 'additionalProperties',
    dataPath: '.windows[0]',
    schemaPath: '#/additionalProperties',
    params: {
      additionalProperty: 'title'
    },
    message: 'should NOT have additional properties'
  },
  {
    keyword: 'additionalProperties',
    dataPath: '.windows[0]',
    schemaPath: '#/additionalProperties',
    params: {
      additionalProperty: 'pages'
    },
    message: 'should NOT have additional properties'
  },
  {
    keyword: 'const',
    dataPath: '.windows[0].type',
    schemaPath: '#/properties/type/const',
    params: {},
    message: 'should be equal to constant'
  },
  {
    keyword: 'required',
    dataPath: '.windows[0]',
    schemaPath: '#/required',
    params: {
      missingProperty: 'kind'
    },
    message: 'should have required property \'kind\''
  },
  {
    keyword: 'oneOf',
    dataPath: '.windows[0]',
    schemaPath: '#/properties/windows/items/oneOf',
    params: {},
    message: 'should match exactly one schema in oneOf'
  }
];
