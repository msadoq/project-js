import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import { PlotEditorContainer } from './Components/Plot';
import { TextEditorContainer } from './Components/Text';
import styles from './Editor.css';
import debug from '../../../lib/common/debug/windowDebug';

const logger = debug('Editor');

const InvalidConfiguration = () => <div> unknown view type or invalid configuration: </div>;
// TODO dedicated component

export default class Editor extends Component {
  static propTypes = {
    timebarHeight: PropTypes.number,
    editorCols: PropTypes.number,
    viewId: PropTypes.string.isRequired,
    viewType: PropTypes.string.isRequired,
    configuration: PropTypes.object,
    closeEditor: PropTypes.func
  };

  static childContextTypes = {
    viewId: React.PropTypes.string
  }

  getChildContext() {
    return {
      viewId: this.props.viewId
    };
  }

  render() {
    logger.debug('render');
    const {
      configuration,
      configuration: { type },
      viewType,
      viewId,
      closeEditor,
      editorCols,
      timebarHeight
    } = this.props;

    if (!configuration || !configuration.type) {
      return <InvalidConfiguration />;
    }

    return (
      <Row>
        <Col
          xs={editorCols}
          className={styles.root}
          style={{
            bottom: timebarHeight
          }}
        >
          <div className={styles.editor}>
            {type === 'PlotView' && <PlotEditorContainer
              key={viewId}
              viewId={viewId}
              viewType={viewType}
              timebarHeight={timebarHeight}
              configuration={configuration}
              closeEditor={closeEditor}
            />}
            {type === 'TextView' && <TextEditorContainer
              key={viewId}
              viewId={viewId}
              viewType={viewType}
              timebarHeight={timebarHeight}
              configuration={configuration}
              closeEditor={closeEditor}
            />}
          </div>
        </Col>
      </Row>
    );
  }
}
