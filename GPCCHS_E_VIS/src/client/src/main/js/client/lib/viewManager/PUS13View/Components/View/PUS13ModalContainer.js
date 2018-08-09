/* eslint-disable no-unused-vars */
import _ from 'lodash/fp';
import { connect } from 'react-redux';

import PUS13Modal from './PUS13Modal';

import { getData } from '../../store/dataReducer';

// {
//   label: 'Popin ==> PUS13Modal',
//     onDbleClick: () => console.log('open popin with content depending on each line...
// use pus013ltdPart, && pending Rest Completed LTDs
// )},

const PUS13ModalContainer = connect()(PUS13Modal);

export default PUS13ModalContainer;
