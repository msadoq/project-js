import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './Timesetter.css';
import TimesetterFields from './TimesetterFields';

export default class Timesetter extends Component {

  static propTypes = {
    visuWindow: React.PropTypes.object.isRequired,
    slideWindow: React.PropTypes.object.isRequired,
    timebarMode: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func.isRequired,
    cursor: React.PropTypes.string.isRequired,
    timebarId: React.PropTypes.string.isRequired,
  }

  state = {
    errorMessages: []
  }

  componentDidMount() {
    document.addEventListener('keyup', this.onKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onKeyUp);
  }

  onKeyUp = (e) => {
    const { onClose } = this.props;
    if (e.keyCode === 27) onClose();
  }

  onChangeAction = (lower, upper, current, slideLower, slideUpper, cursor) => {
    const { timebarId, onChange, timebarMode } = this.props;
    const errorMessages = [];
    switch (cursor) {
      case 'lower':
        if (lower > current) {
          errorMessages.push('Lower cursor must be before current cursor');
        }
        break;
      case 'upper':
        if (upper < current) {
          errorMessages.push('Upper cursor must be after current cursor');
        }
        break;
      case 'current':
        if (current < lower) {
          errorMessages.push('Current cursor must be after lower cursor');
        } else if (current > upper) {
          errorMessages.push('Current cursor must be before upper cursor');
        }
        break;
      case 'slideLower':
        if (timebarMode === 'Fixed') {
          if (slideUpper < lower || slideUpper > current) {
            errorMessages.push('Ext left cursor must be between current cursor and upper cursor in Fixed mode');
          }
        }
        break;
      case 'slideUpper':
        if (timebarMode === 'Extensible') {
          if (slideUpper < upper) {
            errorMessages.push('Ext right cursor must be after upper cursor in Extensible mode');
          }
        } else if (timebarMode === 'Fixed') {
          if (slideUpper < current || slideUpper > upper) {
            errorMessages.push('Ext right cursor must be between current cursor and upper cursor in Fixed mode');
          }
        }
        break;
      default:
        break;
    }

    this.setState({ errorMessages });
    if (!errorMessages.length) {
      onChange(
        timebarId,
        {
          lower,
          upper,
          current,
          slideWindow: {
            lower: slideLower,
            upper: slideUpper
          }
        }
      );
    }
  }

  render() {
    const { visuWindow, cursor, onClose, slideWindow } = this.props;
    const { errorMessages } = this.state;

    return (
      <div className={styles.TimesetterContainer}>
        <h3 className="text-center">Manual setter</h3>
        {errorMessages.map(x => <p className={classnames('text-danger', styles.errorMessage)}>{x}</p>)}
        <button className={classnames('btn-sm', 'btn', 'btn-danger', styles.buttonClose)} onClick={onClose}>x</button>
        {
          ['lower', 'current', 'upper', 'slideLower', 'slideUpper'].map((x, i) => {
            let ms;
            if (visuWindow[x]) {
              ms = visuWindow[x];
            } else if (x === 'slideLower') {
              ms = slideWindow.lower;
            } else if (x === 'slideUpper') {
              ms = slideWindow.upper;
            }

            let disabled = cursor !== 'all';
            if (x === cursor) disabled = false;

            return (<TimesetterFields
              key={i}
              value={x}
              disabled={disabled}
              ms={ms}
              visuWindow={visuWindow}
              slideWindow={slideWindow}
              onChange={this.onChangeAction}
            />);
          })
        }
      </div>
    );
  }
}
