import { get } from 'common/configurationManager';

/**
 * @param list
 * @param addWildcard
 */
// eslint-disable-next-line import/prefer-default-export
export const computeOptions = (list, addWildcard = false) => {
  let options =
    list && Array.isArray(list)
      ? list.map(d =>
        ({
          label: d.name,
          value: d.name,
        })
      )
      : []
  ;
  if (addWildcard) {
    const wildcardCharacter = get('WILDCARD_CHARACTER');
    if (!options.find(s => s.value === wildcardCharacter)) {
      options = options.concat({
        label: wildcardCharacter,
        value: wildcardCharacter,
      });
    }
  }

  return options;
};
