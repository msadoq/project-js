// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5822 : 20/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5822 : 21/03/2017 : change context menu of inspector and dynamic view
//  from Buttons to MenuItems
// VERSION : 1.1.2 : DM : #5822 : 21/03/2017 : add context menu on links in inspector
// VERSION : 1.1.2 : DM : #5822 : 22/03/2017 : change context menus with native electron context
//  menu
// VERSION : 1.1.2 : DM : #5822 : 24/03/2017 : inspector view: separate general data from specific
//  TM data
// VERSION : 1.1.2 : DM : #5822 : 28/03/2017 : update inspector in case of no data
// VERSION : 1.1.2 : DM : #5822 : 18/04/2017 : Inspector general data : add session and domain name
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : add buttons to collapse and expand inspector static
//  data
// VERSION : 1.1.2 : DM : #5822 : 03/05/2017 : Inspector : display dynamic data
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import getLogger from 'common/logManager';
import { NODE_TYPE_LINK as LINK, NODE_TYPE_RESOLVED_LINK as RESOLVED_LINK } from 'constants';
import { main } from 'windowProcess/ipc';
import handleContextMenu from 'windowProcess/common/handleContextMenu';
import styles from './Inspector.css';
import Tree from './Tree';

const logger = getLogger('Inspector');

const generalHeader = (
  <h2>General</h2>
);
const staticHeader = (
  <h2>Static Data</h2>
);
const dynamicHeader = (
  <h2>Dynamic Data</h2>
);

export default class Inspector extends PureComponent {
  static propTypes = {
    // DATA
    epName: PropTypes.string,
    dataId: PropTypes.shape({
      catalog: PropTypes.string.isRequired,
      comObject: PropTypes.string.isRequired,
      parameterName: PropTypes.string.isRequired,
      sessionId: PropTypes.number.isRequired,
      domainId: PropTypes.number.isRequired,
    }),
    field: PropTypes.string,
    isDisplayingTM: PropTypes.bool,
    staticData: PropTypes.arrayOf(PropTypes.object),
    staticDataLoading: PropTypes.bool,
    dynamicData: PropTypes.shape({
      timestamp: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    }),
    // ACTIONS
    toggleNode: PropTypes.func.isRequired,
    loadingNode: PropTypes.func.isRequired,
  };

  static defaultProps = {
    epName: null,
    field: null,
    dataId: null,
    isDisplayingTM: false,
    staticData: null,
    staticDataLoading: false,
    dynamicData: null,
  };

  onMouseDown = (event, node) => {
    const { dataId } = this.props;
    const { sessionId, domainId } = dataId;
    if (event.buttons === 1) {
      if (node.type !== LINK) {
        this.props.toggleNode(node.path, !node.toggled);
        return;
      }
      logger.info('Linking to', node.value);
      this.props.loadingNode(node.path, true);
      main.resolveLink({
        link: node.value,
        path: node.path,
        sessionId,
        domainId,
      });
      return;
    }
    if (event.buttons === 2) {
      if (node.type === LINK || node.type === RESOLVED_LINK) {
        this.props.loadingNode(node.path, true);
        const workspace = {
          label: 'Resolve link through RTD',
          click: () => main.resolveLink({
            link: node.value,
            path: node.path,
            sessionId,
            domainId,
          }),
        };
        handleContextMenu(workspace);
      }
    }
  }

  renderInvalidData = () => (
    <div className={styles.general}>
      <span className={styles.title}>INVALID DATA</span>
    </div>
  );

  renderLoading = () => (
    <div className={styles.general}>
      <span className={styles.loading}>LOADING...</span>
    </div>
  );


  renderNoData = () => (
    <div className={styles.general}>
      <span className={styles.title}>No data</span>
    </div>
  );

  renderNoField = () => (
    <div className={styles.general}>
      <span className={styles.title}>No field selected</span>
    </div>
  );

  render() {
    logger.debug('render');
    const {
      dataId,
      field,
      epName,
      isDisplayingTM,
      staticData,
      staticDataLoading,
      dynamicData,
    } = this.props;

    if (!dataId) {
      return this.renderNoData();
    }

    const {
      catalog,
      comObject,
      parameterName,
      sessionName,
      sessionId,
      domain,
      domainId,
    } = dataId;

    const hasStaticData = !staticDataLoading && staticData;
    const hasNoStaticData = !staticDataLoading && !staticData;
    const hasNoField = !field;
    const hasNoDynamicData = field && !dynamicData;
    const hasDynamicData = dynamicData && field;

    return (
      <div>
        <Panel
          header={generalHeader}
        >
          <ul className={styles.general}>
            {epName &&
            <li>
              <span className={styles.title}>Label: </span>{epName}
            </li>
            }
            <li><span className={styles.title}>ParameterName: </span>{parameterName}</li>
            <li><span className={styles.title}>Catalog: </span>{catalog}</li>
            <li><span className={styles.title}>ObjectType: </span>{comObject}</li>
            <li>
              <span className={styles.title}>Session: </span>{sessionName}
              {' '}
              <span className={styles.title}>Id: </span>{sessionId}
            </li>
            <li>
              <span className={styles.title}>Domain: </span>{domain}
              {' '}
              <span className={styles.title}>Id: </span>{domainId}
            </li>
            {field &&
            <li>
              <span className={styles.title}>Field: </span>{field}
            </li>
            }
          </ul>
        </Panel>
        {
          isDisplayingTM && [
            <Panel
              key="staticData"
              header={staticHeader}
            >
              {staticDataLoading && this.renderLoading()}
              {hasNoStaticData && this.renderNoData()}
              {hasStaticData &&
              <div>
                <Tree
                  data={staticData}
                  onMouseDown={this.onMouseDown}
                />
              </div>
              }
            </Panel>,
            <Panel
              key="dynamicData"
              header={dynamicHeader}
            >
              {hasNoField && this.renderNoField()}
              {hasNoDynamicData && this.renderNoData()}
              {hasDynamicData &&
              <ul className={styles.general}>
                <li>
                  <span className={styles.title}>Last timestamp: </span>
                  {dynamicData.timestamp}
                </li>
                <li><span className={styles.title}>Last value: </span>{dynamicData.value}</li>
              </ul>
              }
            </Panel>,
          ]
        }
      </div>
    );
  }
}
