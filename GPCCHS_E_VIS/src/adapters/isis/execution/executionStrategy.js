// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const ByteBuffer = require('bytebuffer');



module.exports = {
  encode: (data) => {
    const executionStrategy = new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    
    return { value: executionStrategy.buffer };
  },
  decode: data => ({
    type: 'raw',
    value: data.value,
    fields: [
      
    ],
  }),
};
