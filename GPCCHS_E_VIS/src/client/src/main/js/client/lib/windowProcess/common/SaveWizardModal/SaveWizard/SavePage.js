// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Refacto SaveWizardModal component . .
// END-HISTORY
// ====================================================================

import React, { PropTypes } from 'react';
import _ from 'lodash/fp';
import { Row, Col } from 'react-bootstrap';

import { pagePropTypes } from '../propTypes';

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

const SavePage = ({ page, askSavePage, children, boldTitle }) => {
  const title = boldTitle ? <strong>{page.title}</strong> : page.title;
  return (
    <span>
      <Row className="mb5">
        <Col xs={2} />
        <Col xs={7} className="pl20"><ul><li className={styles.bullet}>{title}</li></ul></Col>
        <Col xs={3}>
          <SaveButton
            saved={!page.isModified}
            onClick={() => askSavePage(page.uuid)}
            disabled={_.some(v => !v.absolutePath && !v.oId, page.views)}
          >
            {page.oId || page.absolutePath ? 'Save' : 'Save as...'}
          </SaveButton>
        </Col>
      </Row>
      { children }
    </span>
  );
};
SavePage.propTypes = {
  page: pagePropTypes.isRequired,
  askSavePage: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  boldTitle: PropTypes.bool.isRequired,
};

export default SavePage;
