import _map from 'lodash/fp/map';
import _update from 'lodash/fp/update';

export default function (configuration) {
  return Object.assign({}, configuration, {
    entryPoints: _map(
      configuration.entryPoints || [],
      ep => _update(ep, ['connectedData', 'formula'], '')
    ),
  });
}
