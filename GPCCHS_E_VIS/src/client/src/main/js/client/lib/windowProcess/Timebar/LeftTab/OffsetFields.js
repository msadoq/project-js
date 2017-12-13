// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Reorganized files and folders in windowProcess/Timebar
// VERSION : 1.1.2 : FA : #6670 : 13/06/2017 : Fix last two tests AddTimeline EditTimeline.
// VERSION : 1.1.2 : FA : #6670 : 13/06/2017 : Remove console warn in LeftTab/OffsetFields
// VERSION : 1.1.2 : FA : #6670 : 13/06/2017 : Restore some snapshots in viewManager and windowProcess
// END-HISTORY
// ====================================================================

import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import _debounce from 'lodash/debounce';
import moment from 'moment';
import styles from './LeftTab.css';

export default class OffsetFields extends PureComponent {
  static propTypes = {
    disableSubmit: PropTypes.func.isRequired,
    input: PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired,
      ]).isRequired,
      name: PropTypes.string.isRequired,
      onBlur: PropTypes.func.isRequired,
      onChange: PropTypes.func.isRequired,
      onDragStart: PropTypes.func.isRequired,
      onFocus: PropTypes.func.isRequired,
      onDrop: PropTypes.func.isRequired,
    }).isRequired,
  }

  componentDidMount = () => {
    this.fillFields();
  }

  componentDidUpdate = () => {
    this.fillFields();
  }

  onChange = () => {
    if (!this.debounced) {
      this.debounced = _debounce(this.sendChange, 1200);
    }
    this.props.disableSubmit(true);
    this.debounced();
  }

  onBlur = () => {
    if (this.props.input.onBlur) {
      this.props.input.onBlur(this.props.input.value);
    }
  }

  sendChange = () => {
    const { input } = this.props;
    const duration = moment.duration();
    ['days', 'hours', 'minutes', 'seconds', 'milliseconds'].forEach((x) => {
      const val = parseInt(this[`${x}El`].value, 10) || 0;
      duration.add(val, x);
    });
    input.onChange(duration.asMilliseconds());
    this.props.disableSubmit(false);
  }

  fillFields = () => {
    // Refs not handled in jest tests
    if (process.env.NODE_ENV === 'test') {
      return;
    }
    const { input } = this.props;
    const duration = moment.duration(input.value);
    ['days', 'hours', 'minutes', 'seconds', 'milliseconds'].forEach((x) => {
      this[`${x}El`].value = duration.get(x);
    });
  }

  render() {
    return (
      <div>
        {
          ['days', 'hours', 'minutes', 'seconds', 'milliseconds'].map(x =>
            <input
              key={x}
              type="number"
              ref={(el) => { this[`${x}El`] = el; }}
              placeholder={x}
              onChange={this.onChange}
              defaultValue="0"
              className={classnames(styles.input, styles[`input_${x}`], 'form-control')}
            />
          )
        }
      </div>
    );
  }
}
