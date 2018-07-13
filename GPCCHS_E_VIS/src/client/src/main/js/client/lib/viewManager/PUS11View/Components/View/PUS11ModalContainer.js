/* eslint-disable no-unused-vars */
import _ from 'lodash/fp';
import { connect } from 'react-redux';

import PUS11Modal from './PUS11Modal';

import { getData } from '../../store/dataReducer';

// {
//   label: 'Popin ==> PUS11Modal',
//     onDbleClick: () => console.log('open popin with content depending on each line...
// use commandBinaryProfile, lastUpdateModeBinProf,lastUpdateTimeBinProf,
// pus011CommandParameters & pus011TimeShift'),
// },

const PUS11ModalContainer = connect()(PUS11Modal);

export default PUS11ModalContainer;
