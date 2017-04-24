import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { FormGroup, Form } from 'react-bootstrap';
import styles from './choosePage.css';

export default class ChoosePage extends Component {

  static propTypes = {
    pageTitles: PropTypes.arrayOf(PropTypes.object).isRequired,
    closeModal: PropTypes.func.isRequired,
    isViewsEditorOpen: PropTypes.bool.isRequired,
    closeEditor: PropTypes.func.isRequired,
    moveViewToPage: PropTypes.func.isRequired,
  }

  state = {
    errorMessage: null,
    toPage: '',
  }

  toPageChosen = (e) => {
    e.preventDefault();
    const {
      isViewsEditorOpen,
      closeEditor,
      moveViewToPage,
      closeModal,
    } = this.props;
    if (isViewsEditorOpen) {
      closeEditor();
    }
    moveViewToPage(this.toPage.value);
    closeModal();
  }

  render() {
    const { pageTitles } = this.props;
    const { errorMessage } = this.state;
    return (
      <Form
        horizontal
        onSubmit={this.toPageChosen}
      >
        {
          errorMessage ?
            <p className="text-danger" style={{ fontSize: '1em' }}>{errorMessage}</p>
            : null
        }
        <FormGroup className={styles.formGroup}>
          <b className={styles.labelFormControl}>Page</b>
          <select
            ref={(el) => { this.toPage = el; }}
            className={classnames('form-control', styles.formControl)}
          >
            { pageTitles.map(v => <option key={v.id} value={v.id}>{v.title}</option>) }
          </select>
        </FormGroup>
        <FormGroup className={styles.formGroup}>
          <b className={styles.labelFormControl}>&nbsp;</b>
          <input
            type="submit"
            autoFocus
            value="Choose"
            className={classnames(styles.addTrackButton, 'btn-md', 'btn-primary')}
          />
        </FormGroup>
      </Form>
    );
  }
}
