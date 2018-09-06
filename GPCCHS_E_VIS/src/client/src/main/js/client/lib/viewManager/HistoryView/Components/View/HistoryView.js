import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import _find from 'lodash/find';
import _ from 'lodash/fp';
import _has from 'lodash/has';

import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import DroppableContainer from 'windowProcess/common/DroppableContainer';
import handleContextMenu from 'windowProcess/common/handleContextMenu';
import { updateSearchCountArray } from 'store/reducers/pages';
import VirtualizedTableViewContainer
  from 'viewManager/common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';
import LinksContainer from 'windowProcess/View/LinksContainer';
import { parseDragData } from '../../../common/utils';

import styles from './HistoryView.css';

/**
 * @param id
 * @param entryPoints
 * @returns {*}
 * @pure
 */
export const getUniqueEpId = (id, entryPoints) => {
  let i = 2;
  let newId = id;

  // eslint-disable-next-line no-loop-func, "DV6 TBC_CNES Check if name is taken"
  while (Object.keys(entryPoints).find(k => entryPoints[k].name === newId)) {
    newId = `${id}_${i}`;
    i += 1;
  }
  return newId;
};

class HistoryView extends React.Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })),
    removeLink: PropTypes.func.isRequired,
    showLinks: PropTypes.bool,
    updateShowLinks: PropTypes.func.isRequired,
    mainMenu: PropTypes.arrayOf(PropTypes.object).isRequired,
    openInspector: PropTypes.func.isRequired,
    isInspectorOpened: PropTypes.bool,
    inspectorEpId: PropTypes.string,
    openEditor: PropTypes.func.isRequired,
    addEntryPoint: PropTypes.func.isRequired,
    configuration: PropTypes.shape({
      procedures: PropTypes.array,
      entryPoints: PropTypes.array,
      legend: PropTypes.object,
    }).isRequired,
    last: PropTypes.shape(),
    entryPoints: PropTypes.shape().isRequired,
    entryPointsWithMetadata: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    isTimelineSelected: PropTypes.bool.isRequired,
    searchForThisView: PropTypes.bool.isRequired,
    searching: PropTypes.string,
    countBySearching: PropTypes.number.isRequired,
    searchCount: PropTypes.objectOf(PropTypes.shape),
    updateSearchCount: PropTypes.func.isRequired,
    addMessage: PropTypes.func.isRequired,
    sessions: PropTypes.array,
    timelines: PropTypes.shape(),
    defaultTimelineId: PropTypes.string.isRequired,
    sortState: PropTypes.shape().isRequired,
  };

  static defaultProps = {
    currentRowIndexes: [],
    entryPoints: [],
    last: {},
    inspectorEpId: null,
    isInspectorOpened: false,
    searching: '',
    searchCount: {},
    links: [],
    showLinks: false,
  };

  /**
   * Returns the React element that should displayed if no timeline is selected
   *
   * @returns {*}
   */
  static renderInvalid() {
    return (
      <div className="flex">
        <div className={styles.renderErrorText}>
          Unable to render view. Please select a timeline.
        </div>
      </div>
    );
  }

  componentDidUpdate() {
    const {
      updateSearchCount,
      searchForThisView,
      countBySearching,
      searchCount,
      viewId,
    } = this.props;
    if (searchForThisView) {
      const searchCountArray = updateSearchCountArray(searchCount, viewId, countBySearching);
      updateSearchCount(searchCountArray);
    }
  }

  onContextMenu = (ev) => {
    ev.stopPropagation();

    const {
      openInspector,
      mainMenu,
      isInspectorOpened,
      inspectorEpId,
      entryPoints,
      last,
      sortState,
    } = this.props;

    const separator = { type: 'separator' };

    const inspectorMenu = {
      label: 'Open in Inspector',
      submenu: Object.keys(entryPoints)
        .reduce((acc, epName) => {
          const ep = entryPoints[epName];
          const label = `${epName}`;
          if (ep.error) {
            return [
              ...acc,
              {
                label,
                enabled: false,
              },
            ];
          }
          const { id, dataId } = ep;

          let { field } = ep;

          if (!field) {
            field = 'convertedValue';
          }

          const opened = isInspectorOpened && (inspectorEpId === id);

          if (!dataId) {
            return acc;
          }

          return [
            ...acc,
            {
              label,
              type: 'checkbox',
              click: () => openInspector({
                epId: id,
                dataId,
                epName,
                field,
              }),
              checked: opened,
            },
          ];
        }, []),
    };

    const scrollToCurrentMenu = {
      label: 'Scroll to current',
      submenu: Object.keys(entryPoints)
        .reduce((acc, epName) => {
          const ep = entryPoints[epName];
          const label = `${epName}`;
          if (ep.error) {
            return [
              ...acc,
              {
                label,
                enabled: false,
              },
            ];
          }
          const { id, dataId } = ep;
          const opened = isInspectorOpened && (inspectorEpId === id);

          if (!dataId) {
            return acc;
          }

          return [
            ...acc,
            {
              label,
              click: () => {
                const { table } = this;

                if (table) {
                  const absoluteRowIndexToScrollTo = _.get([epName, 'index'], last);

                  if (absoluteRowIndexToScrollTo) {
                    table.scrollToRow(Number.MAX_SAFE_INTEGER);
                    table.scrollToRow(absoluteRowIndexToScrollTo);
                  }
                }
              },
              checked: opened,
            },
          ];
        }, []),
      enabled: sortState && sortState.colName === 'referenceTimestamp',
    };

    handleContextMenu(
      [
        inspectorMenu,
        separator,
        scrollToCurrentMenu,
        separator,
        ...mainMenu,
      ]
    );
  };

  /**
   * TODO: Method onDrop: ready to be moved to directory viewManager/common and
   * TODO: factorized together with the drop method of PlotView
   * @param ev
   */
  onDrop = (ev) => {
    const {
      addEntryPoint,
      openEditor,
      configuration,
      sessions,
      timelines,
      viewId,
      defaultTimelineId,
      addMessage,
    } = this.props;
    const data = ev.dataTransfer.getData('text/plain');
    const content = JSON.parse(data);
    const required = ['catalogName', 'comObjects', 'item', 'nameSpace', 'sessionName', 'domain'];
    const missing = required.filter(
      key => !_has(content, key)
    );
    if (!(missing.length === 0)) {
      const messageToDisplay = `Missing properties in dropped data: ${missing.join(', ')}.`;
      addMessage('danger', messageToDisplay);
    }
    const session = _find(
      sessions,
      item => item.id.toString() === content.sessionName.toString()
    );
    if (session === undefined) {
      const messageToDisplay = `No session is found with sessionName '${content.sessionName.toString()}'.`;
      addMessage('danger', messageToDisplay);
      return;
    }
    const timeline = _find(
      timelines,
      item => item.sessionName === session.name
    );
    if (timeline === undefined) {
      const messageToDisplay = `No timeline associated with sessionName '${content.sessionName.toString()} is found'.`;
      addMessage('danger', messageToDisplay);
    }
    const epId = getUniqueEpId(data.item || 'entryPoint', configuration.entryPoints);
    const timelineId = timeline === undefined ? defaultTimelineId : timeline.id;
    addEntryPoint(
      viewId,
      parseDragData(content, epId, timelineId)
    );
    openEditor();
    ev.stopPropagation();
  };

  removeLink = (e, index) => {
    e.preventDefault();
    const { removeLink, viewId } = this.props;
    removeLink(viewId, index);
  };

  toggleShowLinks = (e) => {
    e.preventDefault();
    const { showLinks, updateShowLinks, viewId } = this.props;
    updateShowLinks(viewId, !showLinks);
  };

  /**
   * Adds custom outline style to the specified `style` object
   *
   * @param style
   * @param content
   * @returns {{}}
   */
  overrideStyle = ({ style, content }) =>
    ({ ...(content.isCurrent ? this._outlineStyle(style) : {}) });

  /**
   * Returns a function that updates cell content such that:
   *
   *   - it appends the unit to the content existing `convertedValue` field
   *   - it specifies if the cell should be outlined in green (latest value brefore current)
   *     with a new custom field `isCurrent`
   *
   * @param entryPoints
   * @param last
   * @returns {function(*=, *=): (*|{isCurrent})}
   */
  contentModifier = (entryPoints, last) => (cellContent, content) => {
    let updatedCellContent = this._setCurrent(cellContent, content, last);
    updatedCellContent = this._setConvertedValueUnit(updatedCellContent, content, entryPoints);

    return updatedCellContent;
  };

  _outlineStyle = style => ({
    ...style,
    borderTop: '2px solid green',
    borderBottom: '2px solid green',
    backgroundColor: 'rgba(0, 100, 0, 0.1)',
  });

  _setCurrent = (cellContent = {}, content = {}, last = {}) => {
    const { epName, referenceTimestamp } = content;
    const lastForEp = _.get([epName, 'referenceTimestamp'], last);
    const timestamp = new Date(referenceTimestamp).getTime();

    if (lastForEp && (lastForEp === timestamp)) {
      return {
        ...cellContent,
        isCurrent: true,
      };
    }

    return cellContent;
  };

  _setConvertedValueUnit = (cellContent = {}, content = {}, entryPoints = []) => {
    let updatedCellContent = cellContent;

    const { id: epId } = content;

    const epConf = entryPoints.find(ep => ep.id === epId) || {};

    const metadata = _.getOr({}, 'metadata', epConf);

    // adds info with entry point short description
    updatedCellContent = _.set(
      'info',
      metadata.shortDescription,
      updatedCellContent
    );

    if (cellContent.colKey !== 'convertedValue') {
      return updatedCellContent;
    }

    // adds unit to convertedValue cell
    const convertedValue = cellContent.value || '';
    const convertedValueWithUnit =
      `${convertedValue} ${(metadata.unit && `(${metadata.unit})`) || ''}`;

    return _.set(
      'value',
      convertedValueWithUnit,
      updatedCellContent
    );
  };

  render() {
    const {
      viewId,
      pageId,
      entryPointsWithMetadata: entryPoints,
      last,
      isTimelineSelected,
      searching,
      searchForThisView,
      showLinks,
      links,
    } = this.props;

    if (!isTimelineSelected) {
      return HistoryView.renderInvalid();
    }

    return (
      <ErrorBoundary>
        <DroppableContainer
          className={styles.HistoryView}
          onDrop={this.onDrop}
          onContextMenu={this.onContextMenu}
        >
          <div className={styles.HistoryViewTableContainer}>
            <VirtualizedTableViewContainer
              tableRef={(table) => {
                this.table = table;
              }}
              viewId={viewId}
              tableId={'history'}
              contentModifier={this.contentModifier(entryPoints, last)}
              overrideStyle={this.overrideStyle}
              withGroups
              selectableRows
              searching={searching}
              searchForThisView={searchForThisView}
            />
          </div>
          <div
            className={cn(styles.HistoryViewLinksContainer, {
              [styles.remove]: links.length === 0,
            })}
          >
            <LinksContainer
              show={showLinks}
              toggleShowLinks={this.toggleShowLinks}
              links={links}
              removeLink={this.removeLink}
              viewId={viewId}
              pageId={pageId}
            />
          </div>
        </DroppableContainer>
      </ErrorBoundary>
    );
  }
}

export default HistoryView;
