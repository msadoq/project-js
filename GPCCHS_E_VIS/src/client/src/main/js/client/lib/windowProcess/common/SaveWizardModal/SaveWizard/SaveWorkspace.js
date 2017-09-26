// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Fix SaveWizard save workspace .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Refacto SaveWizardModal component . .
// END-HISTORY
// ====================================================================

import React, { PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';

import SaveButton from './SaveButton';
import styles from '../styles.css';

const SaveWorkspace = (props) => {
  const {
    askSaveWorkspace,
    disableSaveButton,
    isWorkspace,
    workspaceFile,
    workspaceIsModified,
    workspaceIsNew,
  } = props;
  if (!isWorkspace) {
    return null;
  }
  return (
    <Row className="mb5">
      <Col xs={2} />
      <Col xs={7}>
        <ul><li className={styles.bullet}><strong>{workspaceFile || 'Workspace'}</strong></li></ul>
      </Col>
      <Col className="" xs={3}>
        <SaveButton
          saved={!workspaceIsModified}
          onClick={() => askSaveWorkspace()}
          disabled={disableSaveButton}
        >
          {workspaceIsNew ? 'Save as...' : 'Save'}
        </SaveButton>
      </Col>
    </Row>
  );
};
SaveWorkspace.propTypes = {
  disableSaveButton: PropTypes.bool.isRequired,
  askSaveWorkspace: PropTypes.func.isRequired,
  isWorkspace: PropTypes.bool.isRequired,
  workspaceFile: PropTypes.string.isRequired,
  workspaceIsModified: PropTypes.bool.isRequired,
  workspaceIsNew: PropTypes.bool.isRequired,
};

export default SaveWorkspace;
