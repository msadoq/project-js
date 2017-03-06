import simple from '../store/simpleActionCreator';
import * as types from '../store/types';

const loadDocuments = simple(types.WS_LOAD_DOCUMENTS, 'documents');

export default loadDocuments;
