import _get from 'lodash/get';
import { connect } from 'react-redux';
import { remove } from '../../store/actions/messages';
import { getComponent } from '../../../VIVL/window';
import { getView } from '../../store/selectors/views';

import View from './View';

const mapStateToProps = (state, { viewId, timebarId }) => {
  const { type, configuration } = getView(state, viewId);
  const ViewTypeComponent = getComponent(type);

  const data = _get(state, ['viewData', viewId], {});
  const visuWindow = _get(state, ['timebars', timebarId, 'visuWindow']);

  const messages = _get(state, ['messages', 'views', viewId]);

  return {
    type,
    configuration,
    component: ViewTypeComponent,
    data,
    visuWindow,
    messages
  };
};

// return function to avoid page grid layout and React DOM re-conciliation issue
export default () => connect(
  mapStateToProps,
  {
    removeMessage: remove,
  }
)(View);
