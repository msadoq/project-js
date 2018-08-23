/* eslint-disable no-unused-vars */
import _ from 'lodash/fp';
import { connect } from 'react-redux';
import PUS19Modal from './PUS19Modal';

// {
//   label: 'Popin ==> PUS19Modal',
//     onDbleClick: () => console.log('open popin with content depending on each line...
// use actionTcPacket
// )},

const PUS19ModalContainer = connect()(PUS19Modal);

export default PUS19ModalContainer;
