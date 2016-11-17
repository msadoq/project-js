import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './Timesetter.css';
import TimesetterFields from './TimesetterFields';

export default class Timesetter extends Component {

  static propTypes = {
    visuWindow: React.PropTypes.object.isRequired,
    extUpperBound: React.PropTypes.number.isRequired,
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

  onChangeAction = (lower, upper, current, extUpperBound, cursor) => {
    const { timebarId, onChange } = this.props;
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
      default:
        break;
    }

    this.setState({ errorMessages });
    if (!errorMessages.length) {
      onChange(
        timebarId,
        { lower, upper, current, extUpperBound }
      );
    }
  }

  render() {
    const { visuWindow, cursor, onClose, extUpperBound } = this.props;
    const { errorMessages } = this.state;

    return (
      <div className={styles.TimesetterContainer}>
        <h3 className="text-center">Manual setter</h3>
        {errorMessages.map(x => <p className={classnames('text-danger', styles.errorMessage)}>{x}</p>)}
        <button className={classnames('btn-sm', 'btn', 'btn-danger', styles.buttonClose)} onClick={onClose}>x</button>
        {
          ['lower', 'current', 'upper', 'extUpperBound'].map((x, i) =>
            <TimesetterFields
              key={i}
              value={x}
              disabled={cursor !== 'all' && cursor !== x}
              ms={visuWindow[x] || this.props[x]}
              visuWindow={visuWindow}
              extUpperBound={extUpperBound}
              onChange={this.onChangeAction}
            />
          )
        }
      </div>
    );
  }
}
