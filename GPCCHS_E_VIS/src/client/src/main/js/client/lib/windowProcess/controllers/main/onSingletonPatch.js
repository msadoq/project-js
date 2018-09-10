import { set } from '../../common/stringToIntegerMapSingleton';

export default function onSingletonPatch(singleton) {
  set(singleton);
}
