import React, { PureComponent, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';
import getLogger from 'common/log';
import {
  NODE_TYPE_LINK as LINK,
  NODE_TYPE_RESOLVED_LINK as RESOLVED_LINK,
} from 'common/constants';
import styles from './Inspector.css';
import Tree from './Tree';
import { main } from '../../ipc';
import handleContextMenu from '../../common/handleContextMenu';

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
    dataId: PropTypes.shape({
      catalog: PropTypes.string.isRequired,
      comObject: PropTypes.string.isRequired,
      parameterName: PropTypes.string.isRequired,
      sessionId: PropTypes.number.isRequired,
      domainId: PropTypes.number.isRequired,
    }),
    isDisplayingTM: PropTypes.bool,
    staticData: PropTypes.arrayOf(PropTypes.object),
    staticDataLoading: PropTypes.bool,
    toggleNode: PropTypes.func.isRequired,
  };

  static defaultProps = {
    dataId: null,
    isDisplayingTM: false,
    staticData: null,
    staticDataLoading: false,
  };

  onMouseDown = (event, node) => {
    const { dataId } = this.props;
    const { sessionId, domainId } = dataId;
    if (event.buttons === 1) {
      this.props.toggleNode(node.path, !node.toggled);
      if (node.type === LINK) {
        logger.info('Linking to', node.value);
        main.resolveLink({
          link: node.value,
          path: node.path,
          sessionId,
          domainId,
        });
      }
      return;
    }
    if (event.buttons === 2) {
      if (node.type === LINK || node.type === RESOLVED_LINK) {
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

  render() {
    logger.debug('render');
    const { dataId, isDisplayingTM, staticData, staticDataLoading } = this.props;

    if (!dataId) {
      return this.renderInvalidData();
    }

    const { catalog, comObject, parameterName, sessionId, domainId } = dataId;

    const hasData = !staticDataLoading && staticData;
    const hasNoData = !staticDataLoading && !staticData;

    return (
      <div>
        <Panel
          header={generalHeader}
        >
          <ul className={styles.general}>
            <li><span className={styles.title}>ParameterName: </span>{parameterName}</li>
            <li><span className={styles.title}>Catalog: </span>{catalog}</li>
            <li><span className={styles.title}>COMObject: </span>{comObject}</li>
            <li><span className={styles.title}>SessionId: </span>{sessionId}</li>
            <li><span className={styles.title}>DomainId: </span>{domainId}</li>
          </ul>
        </Panel>
        {
          isDisplayingTM && [
            <Panel
              key="staticData"
              header={staticHeader}
            >
              { staticDataLoading && this.renderLoading() }
              { hasNoData && this.renderNoData() }
              { hasData &&
                <Tree
                  data={staticData}
                  onMouseDown={this.onMouseDown}
                />
              }
            </Panel>,
            <Panel
              key="dynamicData"
              header={dynamicHeader}
            />,
          ]
        }
      </div>
    );
  }
}
