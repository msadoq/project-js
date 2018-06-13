import { connect } from 'react-redux';
import _chunk from 'lodash/chunk';
import PUS11Modal from './PUS11Modal';

// eslint-disable-next-line no-unused-vars
const getCommandParameters = command => ([
  { name: 'APID_GENE_PARAM', value: 'xxx', description: 'xxx' },
  { name: 'APID_GENE_PARAM', value: 'xxx', description: 'xxx' },
  { name: 'APID_GENE_PARAM', value: 'xxx', description: 'xxx' },
  { name: 'APID_GENE_PARAM', value: 'xxx', description: 'xxx' },
  { name: 'APID_GENE_PARAM', value: 'xxx', description: 'xxx' },
  { name: 'APID_GENE_PARAM', value: 'xxx', description: 'xxx' },
  { name: 'APID_GENE_PARAM', value: 'xxx', description: 'xxx' },
  { name: 'APID_GENE_PARAM', value: 'xxx', description: 'xxx' },
]);

// eslint-disable-next-line no-unused-vars
const getTimeShifts = command => ([
  { appTime: 1527779682256, shift: 1310 },
  { appTime: 1527779682256, shift: 1310 },
  { appTime: 1527779682256, shift: 1310 },
  { appTime: 1527779682256, shift: 1310 },
  { appTime: 1527779682256, shift: 1310 },
  { appTime: 1527779682256, shift: 1310 },
  { appTime: 1527779682256, shift: 1310 },
  { appTime: 1527779682256, shift: 1310 },
]);

// eslint-disable-next-line no-unused-vars
const getBinaryProfile = command =>
_chunk(
  Buffer.from([
    0xAA, 0x75, 0x66, 0x66, 0x65, 0x72, 0x65, 0x72,
    0xAA, 0x75, 0x66, 0x66, 0x65, 0x72, 0x65, 0x72,
    0xAA, 0x75, 0x66, 0x66, 0x65, 0x72, 0x65, 0x72,
    0xAA, 0x75, 0x66, 0x66, 0x65, 0x72, 0x65, 0x72,
    0xAA, 0x75, 0x66, 0x66, 0x65, 0x72, 0x65, 0x72,
    0xAA, 0x75, 0x66, 0x66, 0x65, 0x72, 0x65, 0x72,
    0xAA, 0x75, 0x66, 0x66, 0x65, 0x72, 0x65, 0x72,
    0xAA, 0x75, 0x66, 0x66, 0x65, 0x72, 0x65, 0x72,
  ],
  'hex')
, 8);

const mapStateToProps = (state, { command }) => ({
  commandsParameters: getCommandParameters(command),
  timeShifts: getTimeShifts(command),
  binaryProfile: getBinaryProfile(command),
});

const PUS11ModalContainer = connect(mapStateToProps, {})(PUS11Modal);

export default PUS11ModalContainer;
