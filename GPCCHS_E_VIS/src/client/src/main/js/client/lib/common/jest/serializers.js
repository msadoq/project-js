// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Write onSavePage tests + refacto jest serializers
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Add 2 jest serializers (redux action)
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import 'babel-polyfill';
import _ from 'lodash/fp';

import * as types from '../../store/types';

const typeIs = _.propEq('type');

const createActionSerializer = serializer => ({
  print: (action, serialize) => {
    const serializeAction = _.pipe(
      serializer.print,
      _.set('meta.jestSerialized', true),
      serialize
    );
    return serializeAction(action);
  },
  test: _.allPass([
    serializer.test,
    _.negate(_.has('meta.jestSerialized')),
  ]),
});

export const messageActionSerializer = createActionSerializer({
  print: _.update('payload.messages', _.map(_.unset('uuid'))),
  test: typeIs(types.WS_MESSAGE_ADD),
});

export const dialogActionSerializer = createActionSerializer({
  print: _.update('payload', _.unset('dialogId')),
  test: _.anyPass([
    typeIs(types.HSC_OPEN_DIALOG),
    typeIs(types.HSC_DIALOG_CLOSED),
  ]),
});

export const pageAddBlankActionSerializer = createActionSerializer({
  print: _.update('payload.page', _.unset('uuid')),
  test: typeIs(types.WS_PAGE_ADD_BLANK),
});

export const openViewActionSerializer = createActionSerializer({
  print: _.update('payload', _.unset('pageId')),
  test: typeIs('OPEN_VIEW'),
});

export const modalActionSerializer = createActionSerializer({
  print: _.update('payload.props', _.unset('modalId')),
  test: _.anyPass([
    typeIs(types.WS_MODAL_OPEN),
    typeIs(types.WS_MODAL_CLOSE),
  ]),
});
