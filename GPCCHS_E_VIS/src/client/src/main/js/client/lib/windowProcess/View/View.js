import React, { PureComponent, PropTypes } from 'react';
import _get from 'lodash/get';
import _memoize from 'lodash/memoize';
import classnames from 'classnames';
import getLogger from 'common/log';
import HeaderContainer from './HeaderContainer';
import MessagesContainer from './MessagesContainer';
import { getViewComponent } from '../../viewManager';
import { main } from '../ipc';

import styles from './View.css';

const logger = getLogger('View');

export default class View extends PureComponent {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    viewId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    titleStyle: PropTypes.shape({
      bgColor: PropTypes.string,
    }).isRequired,
    backgroundColor: PropTypes.string,
    maximized: PropTypes.bool,
  };

  static defaultProps = {
    backgroundColor: '#FFFFFF',
    titleStyle: {
      bgColor: '#FEFEFE',
    },
    absolutePath: '',
    visuWindow: null,
    maximized: false,
  };

  static contextTypes = {
    focusedPageId: PropTypes.string,
  };

  borderColorStyle = _memoize(c => ({ borderColor: c }));
  backgroundColorStyle = _memoize(c => ({ backgroundColor: c }));

  render() {
    logger.debug('render');
    const {
      windowId,
      pageId,
      viewId,
      type,
      titleStyle,
      backgroundColor,
      maximized,
    } = this.props;
    const ContentComponent = getViewComponent(type);
    // console.warn(ContentComponent);
    const borderColor = _get(titleStyle, 'bgColor');
    // !! gives visuWindow only for views which uses it to avoid useless rendering
    return (
      <div
        className={classnames('subdiv', styles.container, 'w100', !maximized && 'h100')}
        style={this.borderColorStyle(borderColor)}
      >
        <HeaderContainer
          windowId={windowId}
          pageId={pageId}
          viewId={viewId}
          maximized={!!maximized}
        />
        <div
          className={styles.content}
          style={this.backgroundColorStyle(backgroundColor)}
        >
          <MessagesContainer containerId={viewId} />
          <ContentComponent
            viewId={viewId}
            pageId={pageId}
            openInspector={main.openInspector}
          />
        </div>
      </div>
    );
  }
}
