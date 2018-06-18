import { connect } from 'react-redux';
import PUS05Modal from './PUS05Modal';

// eslint-disable-next-line no-unused-vars
const getParameters = command => ([
  { label: 'APID_GENE_PARAM', value: 'xxx' },
  { label: 'APID_GENE_PARAM', value: 'xxx' },
  { label: 'APID_GENE_PARAM', value: 'xxx' },
  { label: 'APID_GENE_PARAM', value: 'xxx' },
  { label: 'APID_GENE_PARAM', value: 'xxx' },
  { label: 'APID_GENE_PARAM', value: 'xxx' },
  { label: 'APID_GENE_PARAM', value: 'xxx' },
  { label: 'APID_GENE_PARAM', value: 'xxx' },
  { label: 'APID_GENE_PARAM', value: 'xxx' },
  { label: 'APID_GENE_PARAM', value: 'xxx' },
]);

const mapStateToProps = (state, { command }) => ({
  parameters: getParameters(command),
});

const PUS05ModalContainer = connect(mapStateToProps, {})(PUS05Modal);

export default PUS05ModalContainer;
