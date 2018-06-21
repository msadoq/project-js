// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving DynamicView PlotView and TextView in
//  dataManager.
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Fix viewData update by removing updeep
// VERSION : 1.1.2 : DM : #5822 : 20/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5822 : 21/03/2017 : change context menu of inspector and dynamic view
//  from Buttons to MenuItems
// VERSION : 1.1.2 : DM : #5822 : 22/03/2017 : change context menus with native electron context
//  menu
// VERSION : 1.1.2 : DM : #3622 : 22/03/2017 : Update viewData organization for last structure +
//  cleaning
// VERSION : 1.1.2 : DM : #5822 : 23/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Add number of points per view in explorer panel
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : converts long to string to ensure precision
// VERSION : 1.1.2 : DM : #5822 : 24/03/2017 : inspector view: separate general data from specific
//  TM data
// VERSION : 1.1.2 : DM : #5822 : 27/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5822 : 03/04/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #6302 : 03/04/2017 : Add comment and fix coding convetions warning and
//  un-needed relaxations
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Add blob data type treatment for display
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : Fix runtime error in DynamicView
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : mark parameter as checked in context menu when
//  opened in inspector
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : add context menu on views
// VERSION : 1.1.2 : DM : #5822 : 03/05/2017 : Inspector : display dynamic data
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add possibility to show links in views
// VERSION : 1.1.2 : DM : #6785 : 12/06/2017 : activate links in views .
// VERSION : 1.1.2 : DM : #7111 : 03/07/2017 : Add config parameter VISU_WINDOW_MAX_DURATION to
//  limit visuWindow per view
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 20/07/2017 : Reimplement openLink middleware . .
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : DM : #6127 : 04/09/2017 : View component now do not automatically set overflow
//  to auto
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-2238 : 20/12/2017 : Implement dragNdrop entryPoint DynamicView .
// VERSION : 2.0.0 : FA : ISIS-FT-2237 : 20/03/2018 : Update how an entry point formula is built
// VERSION : 2.0.0 : FA : #11616 : 06/04/2018 : Fix drag and drop .
// VERSION : 2.0.0 : FA : #11616 : 06/04/2018 : Fix drag and drop feature in DynamicView
// END-HISTORY
// ====================================================================

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import _lowerCase from 'lodash/lowerCase';
import {
  Row,
  ButtonGroup,
  Button,
} from 'react-bootstrap';
import Select from 'react-select';
import classnames from 'classnames';
import _get from 'lodash/get';
import _set from 'lodash/fp/set';
import _has from 'lodash/has';
import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';
import ToggleButton, { ON } from 'windowProcess/common/ToggleButton';
import handleContextMenu from 'windowProcess/common/handleContextMenu';
import DroppableContainer from 'windowProcess/common/DroppableContainer';
import Tree from 'windowProcess/Explorer/widgets/Tree';
import ModalComponent from 'windowProcess/common/ModalComponent';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import styles from './DecommutedPacketView.css';
import { buildFormulaForAutocomplete } from '../../../common';
import { get } from '../../../../common/configurationManager';
import { getStructuredData } from './selectors';

const WILDCARD = get('WILDCARD_CHARACTER');

/**
 * @param catalogName
 * @param item
 * @param comObject
 * @param comObjectField
 * @param addEntryPoint
 * @param openEditor
 */
export const populateFormulaField = ({
                                       catalogName,
                                       item,
                                       comObject,
                                       comObjectField,
                                       addEntryPoint,
                                       openEditor,
                                     }) => {
  const formula = buildFormulaForAutocomplete(
    catalogName,
    item,
    comObject,
    comObjectField
  );
  addEntryPoint({
    name: 'decommutedPacketEP',
    connectedData: {
      formula,
      domain: WILDCARD,
      timeline: WILDCARD,
    },
  });
  openEditor();
};

const headerFieldsToDisplay = ['onboardDate', 'groundDate'];

const PacketHeader = ({ headerData }) => {
  const fieldsToDisplay = Object.entries(headerData)
    .filter(([name]) => headerFieldsToDisplay.indexOf(name) !== -1);

  return (
    <div className={styles.headerContainer}>
      {fieldsToDisplay.map(([key, value]) =>
        <span key={key} className={styles.headerElement}>
          <strong className={styles.noWrap}>{_lowerCase(key)}: </strong>
          <span>{value.value}</span>
        </span>
      )}
    </div>
  );
};
PacketHeader.propTypes = {
  headerData: PropTypes.shape({}).isRequired,
};


export default class DecommutedPacketView extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      value: PropTypes.object,
      index: PropTypes.number,
    }),
    structure: PropTypes.shape({}),
    entryPoints: PropTypes.objectOf(PropTypes.object),
    addEntryPoint: PropTypes.func.isRequired,
    openInspector: PropTypes.func.isRequired,
    openEditor: PropTypes.func.isRequired,
    closeEditor: PropTypes.func.isRequired,
    isViewsEditorOpen: PropTypes.bool.isRequired,
    mainMenu: PropTypes.arrayOf(PropTypes.object).isRequired,
    isInspectorOpened: PropTypes.bool.isRequired,
    inspectorEpId: PropTypes.string,
    // links: PropTypes.arrayOf(PropTypes.shape({
    //   name: PropTypes.string.isRequired,
    //   path: PropTypes.string.isRequired,
    // })),
    removeLink: PropTypes.func.isRequired,
    // pageId: PropTypes.string.isRequired,
    viewId: PropTypes.string.isRequired,
    // showLinks: PropTypes.bool,
    // updateShowLinks: PropTypes.func.isRequired,
    isMaxVisuDurationExceeded: PropTypes.bool.isRequired,
    askItemStructure: PropTypes.func.isRequired,
  };

  static defaultProps = {
    formula: 0,
    entryPoints: {},
    inspectorEpId: null,
    links: [],
    // showLinks: false,
    data: [],
    structure: {},
  };

  state = {
    isOpened: false,
    comObjects: null,
    selectedComObject: null,
    draggedData: {},
    structuredData: _set('type', undefined, getStructuredData(
      this.props.structure,
      _get(this.props.data, ['value', 'decommutedValues'])
    )),
    globalExpand: true,
  };

  componentWillMount() {
    this.props.askItemStructure();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.structure !== nextProps.structure
      || this.props.data !== nextProps.data) {
      this.setState({
        structuredData: getStructuredData(
          nextProps.structure,
          _get(nextProps.data, ['value', 'decommutedValues'])
        ),
      });
    }
    if (_isEmpty(nextProps.structure)) {
      this.props.askItemStructure();
    }
  }


  // eslint-disable-next-line consistent-return
  onContextMenu = (event) => {
    event.stopPropagation();
    const {
      entryPoints,
      openInspector,
      closeEditor,
      openEditor,
      isViewsEditorOpen,
      mainMenu,
      isInspectorOpened,
      inspectorEpId,
    } = this.props;
    if (!entryPoints.decommutedPacketEP) {
      return <div />;
    }
    const { id, dataId } = entryPoints.decommutedPacketEP;
    const opened = isInspectorOpened && (inspectorEpId === id);
    const inspectorMenu = {
      label: `Open ${dataId.parameterName} in Inspector`,
      type: 'checkbox',
      click: () => openInspector({
        epId: id,
        dataId,
      }),
      checked: opened,
    };
    const editorMenu = (isViewsEditorOpen)
      ? {
        label: 'Close Editor',
        click: () => closeEditor(),
      }
      : {
        label: `Open ${dataId.parameterName} in Editor`,
        click: () => openEditor(),
      };
    const separator = { type: 'separator' };
    handleContextMenu([inspectorMenu, editorMenu, separator, ...mainMenu]);
  };
  /**
   * Called on any drop in the DroppableContainer
   * @param e
   */
  onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = e.dataTransfer.getData('text/plain');
    const content = JSON.parse(data);

    // reset previously populated comObjects
    this.reset();

    // check if EP dropped is valid
    if (!isDroppedDataValid(content)) {
      return;
    }

    // only one comObject in the dropped EP
    if (_get(content, 'comObjects').length === 1) {
      populateFormulaField({
        catalogName: content.catalogName,
        item: content.item,
        comObject: _.head(content.comObjects),
        comObjectField: content.comObjectFields,
        addEntryPoint: this.props.addEntryPoint,
        openEditor: this.props.openEditor,
      });
      // more than one comObject dropped, we need to choose one through popup
    } else {
      this.setState({ draggedData: content });
      this.populateModalComObjects(_get(content, 'comObjects'));
      this.showModal();
    }
  };

  reset = () => this.setState({
    isOpened: false,
    comObjects: null,
    selectedComObject: null,
    draggedData: {},
  });

  handleSelectedComObjectChange = selectedComObject =>
    this.setState({ selectedComObject: selectedComObject.value });
  showModal = () => this.setState({ isOpened: true });
  hideModal = () => this.setState({ isOpened: false });
  populateModalComObjects = comObjects => this.setState({ comObjects });
  selectComObject = () => {
    this.hideModal();
    populateFormulaField({
      catalogName: this.state.draggedData.catalogName,
      item: this.state.draggedData.item,
      comObject: this.state.selectedComObject,
      comObjectField: this.state.draggedData.comObjectFields,
      addEntryPoint: this.props.addEntryPoint,
      openEditor: this.props.openEditor,
    });
  };

  removeLink = (e, index) => {
    e.preventDefault();
    const { removeLink, viewId } = this.props;
    removeLink(viewId, index);
  };

  innerExpandAll = (node) => {
    // eslint-disable-next-line no-param-reassign
    node.toggled = !this.state.globalExpand;
    if (node.children) {
      node.children.forEach(this.innerExpandAll);
    }
  };

  toggleExpandAll = () => {
    const { structuredData, globalExpand } = this.state;
    this.innerExpandAll(structuredData);
    // keep root node open
    structuredData.toggled = true;
    this.setState({
      globalExpand: !globalExpand,
      structuredData: { ...structuredData },
    });
  };

  /**
   * @param onDrop
   * @param onContextMenu
   * @param error
   * @returns {*}
   */
  renderInvalid = (onDrop, onContextMenu, error) => (
    <div>
      <DroppableContainer
        onDrop={onDrop}
        onContextMenu={onContextMenu}
        className={classnames('h100', 'posRelative', styles.container)}
      >
        <div className={`flex ${styles.container}`}>
          <div className={styles.renderErrorText}>
            Unable to render view <br />
            {error}
          </div>
        </div>
      </DroppableContainer>
      {this.renderModal()}
    </div>
  );
  renderModal = () => (
    <ModalComponent isOpened={this.state.isOpened} title="please select a comObject" onClose={this.hideModal}>
      <Select
        name="selectComObject"
        onChange={this.handleSelectedComObjectChange}
        value={this.state.selectedComObject}
        options={_map(this.state.comObjects, comObject => ({
          value: comObject,
          label: comObject,
        }))}
      />
      <Row>
        <ButtonGroup className={classnames('pull-right', 'mt10')}>
          <Button
            bsStyle="success"
            type="button"
            className="mr10"
            onClick={this.selectComObject}
          >
            Submit
          </Button>
          <Button
            type="button"
            onClick={this.hideModal}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Row>
    </ModalComponent>
  );

  render() {
    const {
      data, entryPoints, isMaxVisuDurationExceeded,
    } = this.props;
    const { structuredData } = this.state;
    const ep = data.value;
    const { decommutedPacketEP } = entryPoints;
    const error = _get(entryPoints, 'decommutedPacketEP.error');

    if (!ep || !decommutedPacketEP || error) {
      return this.renderInvalid(this.onDrop, this.onContextMenu, error);
    } else if (isMaxVisuDurationExceeded) {
      return this.renderInvalid(this.onDrop, this.onContextMenu, 'Visu Window is too long for this type of view');
    }

    const { parameterName } = entryPoints.decommutedPacketEP.dataId;
    return (
      <ErrorBoundary>
        <DroppableContainer
          onDrop={this.onDrop}
          onContextMenu={this.onContextMenu}
          className={classnames('h100', 'posRelative', styles.container)}
        >
          <header className={styles.header}>
            <h1 className={styles.title}>{parameterName}</h1>
          </header>
          <PacketHeader headerData={data.value} />
          {structuredData &&
            <React.Fragment>
              <ToggleButton
                on="close all"
                off="expand all"
                className="btn btn-primary"
                default={ON}
                onChange={this.toggleExpandAll}
              />
              <Tree
                data={structuredData}
              />
            </React.Fragment>
          }
        </DroppableContainer>
        {this.renderModal()}
      </ErrorBoundary>
    );
  }
}


/**
 * @param content
 * @returns {*}
 */
export const isDroppedDataValid = content =>
  !!content &&
  _has(content, 'catalogName') &&
  _has(content, 'comObjects');
