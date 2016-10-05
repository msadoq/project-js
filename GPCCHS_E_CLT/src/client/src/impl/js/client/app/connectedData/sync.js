const _ = require('lodash');
import { getPages } from '../store/mutations/windowReducer';
import { getViews } from '../store/mutations/pageReducer';
import { getConnectedData } from '../store/mutations/viewReducer';

let remoteIds = {};
let subscriptions = {};
let queries = {};

const getAllPages = state => state.pages;
const getPageViews = (state, props) => {
  const views = _.get(state, ['pages', props.pageId, 'views'], []);
  return _.reduce(views, (list, viewId) => {
    const view = _.get(state, ['views', viewId]);
    if (!view) {
      return list;
    }

    return list.concat(view);
  }, []);
};

const getTodos = (state, props) =>
  state.todoLists[props.listId].todos


function discover(connectedData, remoteIds) {
  // loop over connectedData
}

/**
 * A pure function that establish subscriptions to open or close, missing interval to retrieve [and
 * redux data to remove]
 *
 * @param state
 */
module.exports = function syncData(previousState, state) {
  // return console.log(state.windows, windowId);
  // const newState = {};
  // _.each(getPages(state, windowId), ({ pageId, timebarId }) => {
  //   if (pageId) {
  //     _.each(getViews(state, pageId), ({ viewId }) => {
  //       if (viewId) {
  //         _.each(getConnectedData(state, viewId), connectedData => {
  //           cds.push(Object.assign({}, connectedData, { timebarId }));
  //         });
  //       }
  //     });
  //   }
  // });
  //
  //
  // // loop on views directly (or on connectedData, but need workspace cd de-duplication)
  // _.each(getAllPages(state), ({ timebarId }, pageId) => {
  //   const view = getPageViews(state, { pageId });
  //   console.log(pageId, 'x', timebarId)
  // });
  //
  // // sync with remoteIds
  //
  // // then get subs by diff
  // // then compute requests

  // return newState;
};
