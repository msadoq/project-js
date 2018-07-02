/* eslint-disable import/prefer-default-export */
import simple from '../helpers/simpleActionCreator';
import { WS_VIEW_UPDATE_ENTRYPOINT_NAME } from '../types';


export const updateEntryPointName =
  simple(WS_VIEW_UPDATE_ENTRYPOINT_NAME, 'viewId', 'epId', 'epName');
