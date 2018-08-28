/* eslint-disable no-unused-vars */
import _ from 'lodash/fp';
import { connect } from 'react-redux';

import PUS13Modal from './PUS13Modal';

const PUS13ModalContainer = connect()(PUS13Modal);

export default PUS13ModalContainer;
