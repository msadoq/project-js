// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 25/04/2017 : Cleanup windows HTML and loading scripts
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// END-HISTORY
// ====================================================================

import { get, getAll } from '../../common/configurationManager';

module.exports = (id) => {
  // HTML path
  const path = `file://${get('path')}/index.html`;

  // React profiling
  // @source: https://facebook.github.io/react/blog/2016/11/16/react-v15.4.0.html#profiling-components-with-chrome-timeline
  const reactPerf = get('DEBUG') === 'on' ? 'react_perf&' : '';

  const params = encodeURIComponent(
    JSON.stringify(
      Object.assign(
        getAll(),
        { IS_BUNDLED: process.env.IS_BUNDLED } // IS_BUNDLED is set in env during webpack build
      )
    )
  );

  return `${path}?${reactPerf}windowId=${id}&params=${params}`;
};
