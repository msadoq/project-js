import { getStore } from '../../../store/mainStore';
import { addOnce } from '../../../store/actions/messages';

export default function onError({ err }) {
  const { dispatch } = getStore();
  dispatch(addOnce('global', 'danger', `Error from Data Consumer: ${err}`));
}
