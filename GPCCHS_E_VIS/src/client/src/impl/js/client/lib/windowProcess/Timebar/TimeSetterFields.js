import moment from 'moment';
import classnames from 'classnames';
import React, { PureComponent } from 'react';
import styles from './TimeSetter.css';

export default class TimeSetterFields extends PureComponent {

  static propTypes = {
    ms: React.PropTypes.number.isRequired,
    cursor: React.PropTypes.string.isRequired,
    disabled: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired,
  }

  changeAttr = (a, e) => {
    const el = e.currentTarget;
    const { ms } = this.props;
    let attrVal = parseInt(el.value, 10);

    const date = moment(ms);

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

    this.props.onChange(date.toDate().getTime(), this.props.cursor);
  }

  render() {
    const { ms, cursor, disabled } = this.props;
    const arr = dateToArray(moment(ms));
    let valueText;
    if (cursor === 'slideLower') {
      valueText = 'Ext lower cursor';
    } else if (cursor === 'slideUpper') {
      valueText = 'Ext upper cursor';
    } else {
      valueText = `${cursor} cursor`;
    }

    return (
      <div className={styles.fieldsContainer}>
        <div
          className={classnames(
            'text-capitalize',
            styles.formLabel,
            { [styles[`formLabel${cursor}`]]: !disabled }
          )}
          style={{ width: '100%' }}
        >
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
                value={x[1]}
                disabled={disabled}
                onClick={this.changeAttr.bind(null, x[0])}
                onBlur={this.changeAttr.bind(null, x[0])}
                onChange={this.changeAttr.bind(null, x[0])}
              />
              {['year', 'months'].find(a => a === x[0]) && <span>-</span>}
              {['hours', 'minutes'].find(a => a === x[0]) && <span>:</span>}
              {x[0] === 'seconds' && <span>.</span>}
            </div>
          )
        }
      </div>
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
