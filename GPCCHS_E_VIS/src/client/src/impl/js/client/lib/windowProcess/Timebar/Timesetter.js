import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Timesetter.css';
import TimesetterFields from './TimesetterFields';

export default class Timesetter extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    visuWindow: PropTypes.object.isRequired,
    slideWindow: PropTypes.object.isRequired,
    timebarMode: PropTypes.string.isRequired,
    cursor: PropTypes.string.isRequired,
    timebarId: PropTypes.string.isRequired,
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
    if (e.keyCode === 27) this.props.onClose();
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
          if (slideLower < lower || slideLower > current) {
            errorMessages.push('Ext lower cursor must be between lower cursor and current cursor in Fixed mode');
          }
        }
        break;
      case 'slideUpper':
        if (timebarMode === 'Extensible') {
          if (slideUpper < upper) {
            errorMessages.push('Ext upper cursor must be after upper cursor in Extensible mode');
          }
        } else if (timebarMode === 'Fixed') {
          if (slideUpper < current || slideUpper > upper) {
            errorMessages.push('Ext upper cursor must be between current cursor and upper cursor in Fixed mode');
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
        <h3 className="text-center">
          Manual setter
        </h3>

        {errorMessages.map(x => <p className={classnames('text-danger', styles.errorMessage)}>{x}</p>)}

        <button
          className={classnames(
            'btn-sm',
            'btn',
            'btn-danger',
            styles.buttonClose
          )}
          onClick={onClose}
        >
          x
        </button>

        {
          ['slideLower', 'lower', 'current', 'upper', 'slideUpper'].map((x, i) => {
            let ms;
            if (visuWindow[x]) {
              ms = visuWindow[x];
            } else if (x === 'slideLower') {
              ms = slideWindow.lower;
            } else if (x === 'slideUpper') {
              ms = slideWindow.upper;
            }

            let disabled = cursor !== 'all';
            if (x === cursor) {
              disabled = false;
            }

            return (
              <TimesetterFields
                key={i}
                value={x}
                disabled={disabled}
                ms={ms}
                visuWindow={visuWindow}
                slideWindow={slideWindow}
                onChange={this.onChangeAction}
              />
            );
          })
        }
      </div>
    );
  }
}
