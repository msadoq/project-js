import React, { PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';

import styles from '../styles.css';
import SaveButton from './SaveButton';

const SaveView = ({ view, askSaveView }) => (
  <Row className="mb5">
    <Col xs={2} />
    <Col className="pl40" xs={7}><ul><li className={styles.bullet}>{view.title}</li></ul></Col>
    <Col xs={3}>
      <SaveButton
        onClick={() => askSaveView(view.uuid)}
        saved={!view.isModified}
      >
        {view.absolutePath || view.oId ? 'Save' : 'Save as...'}
      </SaveButton>
    </Col>
  </Row>
);
SaveView.propTypes = {
  askSaveView: PropTypes.func.isRequired,
  view: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isModified: PropTypes.bool.isRequired,
    absolutePath: PropTypes.string,
    oId: PropTypes.string,
  }).isRequired,
};

export default SaveView;
