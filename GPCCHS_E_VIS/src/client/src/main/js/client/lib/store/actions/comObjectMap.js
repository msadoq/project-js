import simple from 'store/helpers/simpleActionCreator';
import {
  SET_COM_OBJECT_MAP,
} from '../types';

const setComObjectMap = simple(
  SET_COM_OBJECT_MAP,
  'newComObjectMap'
);

export default setComObjectMap;
