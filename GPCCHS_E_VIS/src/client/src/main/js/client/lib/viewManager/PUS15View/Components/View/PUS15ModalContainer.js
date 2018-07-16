/* eslint-disable no-unused-vars */
import _ from 'lodash/fp';
import { connect } from 'react-redux';

import PUS15Modal from './PUS15Modal';

import { getData } from '../../store/dataReducer';

// {
//   label: 'Popin ==> PUS15Modal',
//     onDbleClick: () => console.log('open popin with content depending on each line...
// use commandBinaryProfile, lastUpdateModeBinProf,lastUpdateTimeBinProf,
// pus015CommandParameters & pus015TimeShift'),
// },

const PUS15ModalContainer = connect()(PUS15Modal);

export default PUS15ModalContainer;
