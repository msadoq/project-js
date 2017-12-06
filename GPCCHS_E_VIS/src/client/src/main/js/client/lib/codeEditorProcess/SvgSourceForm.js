import React, { PureComponent, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { ButtonGroup, Button } from 'react-bootstrap';
import _map from 'lodash/map';
import { lint } from '../common/htmllint';
import knobe from '../viewManager/MimicView/Components/Collection/knobe';
import styles from './Source.css';
import hGauge from '../viewManager/MimicView/Components/Collection/hGauge';
import vGauge from '../viewManager/MimicView/Components/Collection/vGauge';
import hSlider from '../viewManager/MimicView/Components/Collection/hSlider';
import vSlider from '../viewManager/MimicView/Components/Collection/vSlider';
import circuitBreaker from '../viewManager/MimicView/Components/Collection/circuitBreaker';
import diode from '../viewManager/MimicView/Components/Collection/diode';
import ep from '../viewManager/MimicView/Components/Collection/ep';
import multiState from '../viewManager/MimicView/Components/Collection/multiState';
import CodeMirrorField from '../windowProcess/commonReduxForm/CodeMirrorField';
import colour from '../viewManager/MimicView/Components/Animation/colour';
import digital from '../viewManager/MimicView/Components/Animation/digital';
import rotate from '../viewManager/MimicView/Components/Animation/rotate';
import scaleX from '../viewManager/MimicView/Components/Animation/scaleX';
import scaleY from '../viewManager/MimicView/Components/Animation/scaleY';
import show from '../viewManager/MimicView/Components/Animation/show';
import textBox from '../viewManager/MimicView/Components/Animation/textBox';
import translateX from '../viewManager/MimicView/Components/Animation/translateX';
import translateY from '../viewManager/MimicView/Components/Animation/translateY';
import transistor from '../viewManager/MimicView/Components/Collection/transistor';

const { string, func, arrayOf, bool } = PropTypes;

class SvgSourceForm extends PureComponent {
  static propTypes = {
    handleSubmit: func.isRequired,
    pristine: bool.isRequired,
    reset: func.isRequired,
    submitting: bool.isRequired,
    valid: bool.isRequired,
    closeCodeEditor: func.isRequired,
    entryPoints: arrayOf(string),
    viewType: string.isRequired,
  };
  static defaultProps = {
    entryPoints: [],
  };
  onChange = editorState => this.setState({ editorState });
  resetAndClose = () => {
    this.props.reset();
    this.props.closeCodeEditor();
  };
  saveAndClose = () => {
    this.props.handleSubmit();
    this.props.closeCodeEditor();
  };
  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      valid,
      entryPoints,
      viewType,
    } = this.props;

    const options = [{ name: 'contextmenu', func: (a, b) => this.onContextMenu(a, b) }];
    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <div
          className={styles.hintDiv}
        >
          { viewType === 'TextView' && <h3>TextView HTML Editor</h3> }
          { viewType === 'MimicView' && <h3>MimicView SVG Editor</h3> }
          {
            viewType === 'TextView' &&
            <p>
              Hint :
              template litterals to be replaced by values must be nested in
              <code>{'<span>'}</code> any side text will be removed.s
              ex: <code>{'<span>{{EP_PARAM_105}}</span>'}</code>
            </p>
          }
        </div>
        <Field
          name="html"
          className={styles.CodeMirrorField}
          component={CodeMirrorField}
          autocompleteList={entryPoints}
          collection={getMainContextMenu(entryPoints)}
          cmOptions={options}
        />
        <div className={styles.footer}>
          <ButtonGroup>
            <Button
              type="button"
              disabled={pristine || submitting}
              onClick={this.resetAndClose}
              className={styles.footerButton}
            >
              Cancel
            </Button>
            <Button
              bsStyle="warning"
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
              className={styles.footerButton}
            >
              Reset
            </Button>
            <Button
              bsStyle="success"
              type="submit"
              disabled={pristine || submitting || !valid}
              className={styles.footerButton}
            >
              Save
            </Button>
            <Button
              bsStyle="success"
              type="button"
              disabled={pristine || submitting || !valid}
              className={styles.footerButton}
              onClick={this.saveAndClose}
            >
              Save & Close
            </Button>
          </ButtonGroup>
        </div>
      </form>
    );
  }
}

const requiredFields = ['html'];
const validate = (values = {}, props) => {
  const errors = {};
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  const htmlErrors = props.viewType === 'MimicView' ?
    lint(values.html, { 'spec-char-escape': false }) :
    lint(values.html);

  if (htmlErrors.length) {
    errors.html = `You have ${htmlErrors.length} errors`;
  }
  return errors;
};

/**
 * @param entryPoints
 * @returns {*[]}
 * @pure
 */
export const getMainContextMenu = (entryPoints) => {
  const menu = [
    {
      label: 'Add component',
      submenu: [
        {
          label: 'Verical gauge',
          code: vGauge,
        },
        {
          label: 'Horizontal gauge',
          code: hGauge,
        },
        { type: 'separator' },
        {
          label: 'Vertical slider',
          code: vSlider,
        },
        {
          label: 'Horizontal slider',
          code: hSlider,
        },
        { type: 'separator' },
        {
          label: 'Knobe',
          code: knobe,
        },
        { type: 'separator' },
        {
          label: 'Circuit breaker',
          code: circuitBreaker,
        },
        {
          label: 'Diode',
          code: diode,
        },
        {
          label: 'Transistor',
          code: transistor,
        },
        { type: 'separator' },
        {
          label: 'Multistate switch',
          code: multiState,
        },
      ],
    },
    {
      label: 'Add animation',
      submenu: [
        {
          label: 'Scale X',
          code: scaleX,
        },
        {
          label: 'Scale Y',
          code: scaleY,
        },
        { type: 'separator' },
        {
          label: 'Translate X',
          code: translateX,
        },
        {
          label: 'Translate Y',
          code: translateY,
        },
        { type: 'separator' },
        {
          label: 'Text box',
          code: textBox,
        },
        {
          label: 'Digital display',
          code: digital,
        },
        { type: 'separator' },
        {
          label: 'Rotation',
          code: rotate,
        },
        { type: 'separator' },
        {
          label: 'Show / hide',
          code: show,
        },
        { type: 'separator' },
        {
          label: 'Colour',
          code: colour,
        },
      ],
    },
  ];

  if (entryPoints.length > 0) {
    menu.push({
      label: 'Add Entry point',
      submenu: _map(entryPoints, entryPoint => (
        {
          label: entryPoint.name,
          code: ep.replace('__ENTRY_POINT__', entryPoint.name),
        }
      )),
    });
  }

  return menu;
};

export default reduxForm({
  validate,
  enableReinitialize: false,
})(SvgSourceForm);
