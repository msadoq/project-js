/* eslint-disable no-unused-vars */
// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : prepare packet and history files
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Optimize HistoryView render . .
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Use withBatchedSetState hoc in HistoryView
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Remove labels from props.data in HistoryView
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Create first basic table for HistoryView
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Move common/Dimensions.js in
//  common/hoc/withDimensions .
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Add read only scrollbar in HistoryView
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Add onScrollUp and onScrollDown event to HistoryView
//  component
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : HistoryView work with real data .
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Improve HistoryView React key .
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Add withMouseWheelEvents hoc in windowProcess
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Refacto onWheel method in HistoryView
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Add rowHeight prop to HistoryView component
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Add selected current to HistoryView
// VERSION : 2.0.0 : DM : #6127 : 26/09/2017 : Use light theme on HistoryView
// VERSION : 2.0.0 : DM : #6127 : 26/09/2017 : Fix scrolling bug in HistoryView when resize the
//  view or visuWindow
// VERSION : 2.0.0 : DM : #5806 : 03/10/2017 : Remove useless ref in HistoryView component
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash/fp';

import handleContextMenu from 'windowProcess/common/handleContextMenu';
import DroppableContainer from 'windowProcess/common/DroppableContainer';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import { updateSearchCountArray } from 'store/reducers/pages';
import styles from './HistoryView.css';
import { buildFormulaForAutocomplete } from '../../../common';
import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';
import LinksContainer from '../../../../windowProcess/View/LinksContainer';

const getComObject = _.propOr('UNKNOWN_COM_OBJECT', 0);

// parse clipboard data to create partial entry point
function parseDragData(data) {
  const formula =
    buildFormulaForAutocomplete(
      data.catalogName,
      data.item,
      getComObject(data.comObjects),
      data.comObjectFields
    );

  return {
    name: 'HistoryViewEP',
    connectedData: {
      formula,
      domain: '*',
      timeline: '*',
    },
  };
}

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
    last: PropTypes.shape(),
    scrollPosition: PropTypes.shape().isRequired,
    config: PropTypes.shape().isRequired,
    entryPoints: PropTypes.objectOf(PropTypes.object).isRequired,
    isTimelineSelected: PropTypes.bool.isRequired,
    searchForThisView: PropTypes.bool.isRequired,
    searching: PropTypes.string,
    countBySearching: PropTypes.number.isRequired,
    searchCount: PropTypes.objectOf(PropTypes.shape),
    updateSearchCount: PropTypes.func.isRequired,
  };

  static defaultProps = {
    currentRowIndexes: [],
    last: {},
    inspectorEpId: null,
    isInspectorOpened: false,
    searching: '',
    searchCount: 0,
    links: [],
    showLinks: false,
  };

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
                  const rowIndexToScrollTo = _.get([epName, 'index'], last);

                  if (rowIndexToScrollTo) {
                    table.scrollToRow(Number.MAX_SAFE_INTEGER);
                    table.scrollToRow(rowIndexToScrollTo);
                  }
                }
              },
              checked: opened,
            },
          ];
        }, []),
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

  onDrop = (ev) => {
    const {
      addEntryPoint,
      openEditor,
    } = this.props;

    const data = ev.dataTransfer.getData('text/plain');
    const content = JSON.parse(data);

    if (!_.get('catalogName', content)) {
      return;
    }

    const parsedData = parseDragData(content);
    addEntryPoint(parsedData);
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

  _outlineStyle = style => ({
    ...style,
    borderTop: '2px solid green',
    borderBottom: '2px solid green',
    backgroundColor: 'rgba(0, 100, 0, 0.1)',
  });

  _overrideStyle = ({ style, content }) =>
    ({ ...(content.isCurrent ? this._outlineStyle(style) : {}) });

  render() {
    const {
      viewId,
      pageId,
      last,
      scrollPosition,
      config,
      isTimelineSelected,
      searching,
      searchForThisView,
      showLinks,
      updateShowLinks,
      links,
    } = this.props;

    const _setCurrent = (cellContent = {}, content = {}) => {
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

    const _setConvertedValueUnit = (cellContent = {}, content = {}) => {
      let updatedCellContent = cellContent;

      const { entryPoints } = config;
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

    const _contentModifier = (cellContent, content) => {
      let updatedCellContent = _setCurrent(cellContent, content);
      updatedCellContent = _setConvertedValueUnit(updatedCellContent, content);

      return updatedCellContent;
    };

    if (!isTimelineSelected) {
      return (
        <div className="flex">
          <div className={styles.renderErrorText}>
            Unable to render view. Please select a timeline.
          </div>
        </div>
      );
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
              gridRef={(table) => {
                this.table = table;
              }}
              viewId={viewId}
              tableId={'history'}
              contentModifier={_contentModifier}
              overrideStyle={this._overrideStyle}
              withGroups
              scrollPosition={scrollPosition}
              searching={searching}
              searchForThisView={searchForThisView}
            />
          </div>
          <div className={styles.HistoryViewLinksContainer}>
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
