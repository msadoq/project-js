import moment from 'moment';
import classnames from 'classnames';
import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import styles from './Timesetter.css';

export default class TimesetterFields extends Component {

  static propTypes = {
    ms: React.PropTypes.number.isRequired,
    value: React.PropTypes.string.isRequired,
    disabled: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired,
    visuWindow: React.PropTypes.object.isRequired,
    slideWindow: React.PropTypes.object.isRequired,
  }

  state = {
    date: null
  }

  onChangeAction = () => {
    const { value, onChange, visuWindow, slideWindow } = this.props;
    const { date } = this.state;
    if (visuWindow[value]) {
      visuWindow[value] = date.toDate().getTime();
    } else if (value === 'slideLower') {
      slideWindow.lower = date.toDate().getTime();
    } else if (value === 'slideUpper') {
      slideWindow.upper = date.toDate().getTime();
    }
    onChange(
      visuWindow.lower,
      visuWindow.upper,
      visuWindow.current,
      slideWindow.lower,
      slideWindow.upper,
      value
    );
    this.setState({ date: null });
  }

  changeAttr = (a, e) => {
    const el = e.currentTarget;
    const { ms } = this.props;
    let { date } = this.state;
    let attrVal = parseInt(el.value, 10);

    if (!date) {
      date = moment(ms);
      this.setState({ date });
    }

    // UI month 1 equals moment month 0
    if (a === 'months') attrVal -= 1;

    date.set(a, attrVal);

    /*
      Replacing values of the inputs for each date proprety with their moment formatted equivalents.
      Very important because increases can fire other increases values on upper scopes
      ex: + 1 hour can sometimes switch to the next day / month / year
    */
    Object.keys(formats).forEach((key) => {
      this[`${key}El`].value = date.format(formats[key].format);
    });

    this.setState({ date });
  }

  render() {
    const { ms, value, disabled } = this.props;
    const { date } = this.state;
    const arr = date ? dateToArray(date) : dateToArray(moment(ms));

    let submitButton;
    if (!disabled) {
      submitButton = (<input
        className={classnames(styles.submitButton, 'btn', 'btn-sm', 'btn-primary')}
        type="submit"
        disabled={!date}
        onClick={this.onChangeAction}
      />);
    }
    let valueText;
    if (value === 'slideLower') {
      valueText = 'Ext lower cursor';
    } else if (value === 'slideUpper') {
      valueText = 'Ext upper cursor';
    } else {
      valueText = `${value} cursor`;
    }

    return (
      <Col xs={12} className={styles.fieldsContainer}>
        <div className={classnames('text-capitalize', styles.formLabel, { [styles[`formLabel${value}`]]: !disabled })} style={{ width: '100%' }}>
          <b>{valueText}</b>
        </div>
        {
          arr.map((x, i) =>
            <div key={i} className={styles.inputDiv}>
              <input
                type="number"
                ref={(el) => { this[`${x[0]}El`] = el; }}
                key={i}
                className={classnames('form-control', styles.input, styles[`input_${x[0]}`])}
                defaultValue={x[1]}
                disabled={disabled}
                onClick={this.changeAttr.bind(null, x[0])}
                onBlur={this.changeAttr.bind(null, x[0])}
              />
              {['year', 'months'].find(a => a === x[0]) ? <span>-</span> : ''}
              {['hours', 'minutes'].find(a => a === x[0]) ? <span>:</span> : ''}
              {x[0] === 'seconds' ? <span>.</span> : ''}
            </div>
          )
        }
        {submitButton}
      </Col>
    );
  }
}

const formats = {
  year: { format: 'YYYY', parent: null },
  months: { format: 'MM', parent: 'year' },
  date: { format: 'DD', parent: 'months' },
  hours: { format: 'HH', parent: 'date' },
  minutes: { format: 'mm', parent: 'hours' },
  seconds: { format: 'ss', parent: 'minutes' },
  milliseconds: { format: 'SSS', parent: 'seconds' },
};

function dateToArray(m) {
  return [
    ['year', m.format(formats.year.format)],
    ['months', m.format(formats.months.format)],
    ['date', m.format(formats.date.format)],
    ['hours', m.format(formats.hours.format)],
    ['minutes', m.format(formats.minutes.format)],
    ['seconds', m.format(formats.seconds.format)],
    ['milliseconds', m.format(formats.milliseconds.format)]
  ];
}
