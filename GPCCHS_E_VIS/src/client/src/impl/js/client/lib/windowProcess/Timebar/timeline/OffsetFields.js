import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { debounce } from 'lodash';
import moment from 'moment';
import styles from '../Lefttab.css';

export default class OffsetFields extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
  }

  componentDidMount = () => {
    this.fillFields();
  }

  componentDidUpdate = () => {
    this.fillFields();
  }

  onChange = () => {
    if (!this.debounced) {
      this.debounced = debounce(this.sendChange, 1200);
    }
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
    ['hours', 'minutes', 'seconds', 'milliseconds'].forEach((x) => {
      const val = parseInt(this[`${x}El`].value, 10) || 0;
      duration.add(val, x);
    });
    input.onChange(duration.asMilliseconds());
  }

  fillFields = () => {
    // Refs not handled in jest tests
    if (process.env.NODE_ENV === 'snapshot') {
      return;
    }
    const { input } = this.props;
    const duration = moment.duration(input.value);
    ['hours', 'minutes', 'seconds', 'milliseconds'].forEach((x) => {
      this[`${x}El`].value = duration.get(x);
    });
  }

  render() {
    return (
      <div>
        {
          ['hours', 'minutes', 'seconds', 'milliseconds'].map((x, i) =>
            <input
              key={i}
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
