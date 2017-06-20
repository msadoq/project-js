import { getStore } from '../../store';
import { add as addMessage } from '../../../store/actions/messages';

export default function onError({ err }) {
  const { dispatch } = getStore();
  dispatch(addMessage('global', 'danger', `Error from Data Consumer: ${err}`));
}
