// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Reorganized files and folders in
//  windowProcess/Timebar
// VERSION : 1.1.2 : DM : #6302 : 06/04/2017 : Fix some lint errors, added justification and DV6
//  TBC_CNES prefix on others.
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : Timesetter is displayed with GenericModal component.
// VERSION : 1.1.2 : FA : #6670 : 13/06/2017 : Fix Timebar jest snapshots .
// VERSION : 1.1.2 : FA : ISIS-FT-2135 : 16/06/2017 : Automatically remove messages after a while
// VERSION : 1.1.2 : FA : ISIS-FT-2135 : 16/06/2017 : Add animation to messages removing
// VERSION : 1.1.2 : FA : ISIS-FT-2135 : 16/06/2017 : Message removing can be cancel by passing the
//  mouse over the message
// VERSION : 1.1.2 : FA : ISIS-FT-1998 : 28/06/2017 : Add units in timesetter window
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-2823 : 22/03/2018 : Revert modification du temps max pour les
//  jumps
// VERSION : 2.0.0 : FA : ISIS-FT-2823 : 22/03/2018 : modification du temps max pour les jumps
// VERSION : 2.0.0 : FA : #11617 : 06/04/2018 : Time setter ergonomy . .
// VERSION : 2.0.0 : FA : ISIS-FT-2823 : 06/04/2018 : revert du revert -_- .
// END-HISTORY
// ====================================================================

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import Flatpickr from 'react-flatpickr';
import classnames from 'classnames';
import Message from 'windowProcess/common/Message';
import TimeSetterFields from './TimeSetterFields';
import styles from './TimeSetter.css';

export default class TimeSetter extends PureComponent {

  static propTypes = {
    updateDefaultWidth: PropTypes.func.isRequired,
    updateCursors: PropTypes.func.isRequired,
    jump: PropTypes.func.isRequired,
    updateViewport: PropTypes.func.isRequired,
    removeMessage: PropTypes.func.isRequired,
    cancelRemoveMessage: PropTypes.func.isRequired,
    visuWindow: PropTypes.shape({
      lower: PropTypes.number,
      upper: PropTypes.number,
      current: PropTypes.number,
      defaultWidth: PropTypes.number })
    .isRequired,
    slideWindow: PropTypes.shape({
      lower: PropTypes.number,
      upper: PropTypes.number })
    .isRequired,
    messages: PropTypes.arrayOf(PropTypes.object),
    cursor: PropTypes.string.isRequired,
    timebarUuid: PropTypes.string.isRequired,
    timebarMode: PropTypes.string.isRequired,
    timebarRulerResolution: PropTypes.number.isRequired,
  }

  static defaultProps = {
    messages: null,
  }

  state = {
    messages: null,
    errorMessages: [],
    defaultWidth: null,
    changed: false,
    defaultWidthChanged: false,
    dayToJump: null,
  }

  componentWillReceiveProps(nextProps) {
    // If no error message, clean states
    if (!nextProps.messages || !nextProps.messages.length) {
      this.cancel();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    let shouldRender = false;
    Object.keys(nextProps).forEach((key) => {
      if (this.props[key] !== nextProps[key]) {
        shouldRender = true;
      }
    });
    Object.keys(nextState).forEach((key) => {
      if (this.state[key] !== nextState[key]) {
        shouldRender = true;
      }
    });
    return shouldRender;
  }

  onChangeAction = (value, cursor) => {
    this.setState({
      [cursor]: value,
      changed: true,
    });
  }

  onDefaultWidthChange = () => {
    const defaultWidth = moment.duration(0);
    ['hours', 'minutes', 'seconds', 'milliseconds'].forEach((v) => {
      defaultWidth.add(parseInt(this[`defaultWidth${v}El`].value, 10), v);
    });
    this.setState({
      defaultWidth: defaultWidth.asMilliseconds(),
      defaultWidthChanged: true,
    });
  }


  setDayToJump = (arr, date) => {
    this.setState({
      dayToJump: date,
    });
  }

  jumpToDay = (e) => {
    e.preventDefault();
    const {
      timebarUuid,
      visuWindow,
      jump,
      updateViewport,
      timebarRulerResolution,
    } = this.props;
    const {
      dayToJump,
    } = this.state;
    const midDayMs = moment(dayToJump)
      .hours(12)
      .minutes(0)
      .seconds(0)
      .milliseconds(0)
      .toDate()
      .getTime();
    const diffMs = midDayMs - visuWindow.current;
    jump(
      timebarUuid,
      diffMs
    );
    updateViewport(
      timebarUuid,
      midDayMs - (visuWindow.upper - visuWindow.lower),
      timebarRulerResolution
    );
    this.setState({ dayToJump: null });
  }

  cancel = (e) => {
    if (e) e.preventDefault();
    this.setState({
      lower: null,
      upper: null,
      current: null,
      slideLower: null,
      slideUpper: null,
      changed: false,
      defaultWidthChanged: false,
    });
  }

  willSetDefaultWidth = (e) => {
    e.preventDefault();
    const {
      timebarUuid,
      updateDefaultWidth,
      visuWindow,
    } = this.props;

    const defaultWidth = this.state.defaultWidth === null ?
    visuWindow.defaultWidth : this.state.defaultWidth;

    if (defaultWidth !== parseInt(visuWindow.defaultWidth, 10)) {
      updateDefaultWidth(timebarUuid, defaultWidth);
    }
  }

  willUpdateCursors = (e) => {
    e.preventDefault();
    const {
      visuWindow,
      slideWindow,
      timebarUuid,
      updateCursors,
    } = this.props;

    const newVisuWindow = {
      lower: this.state.lower || visuWindow.lower,
      upper: this.state.upper || visuWindow.upper,
      current: this.state.current || visuWindow.current,
    };
    const newSlideWindow = {
      lower: this.state.slideLower || slideWindow.lower,
      upper: this.state.slideUpper || slideWindow.upper,
    };
    updateCursors(
      timebarUuid,
      newVisuWindow,
      newSlideWindow
    );
  }

  render() {
    const {
      timebarMode,
      visuWindow,
      slideWindow,
      cursor,
    } = this.props;

    const {
      defaultWidthChanged,
      changed,
      dayToJump,
    } = this.state;

    let orderedCursors = ['lower', 'slideLower', 'current'];
    if (timebarMode === 'Extensible') {
      orderedCursors = orderedCursors.concat('upper', 'slideUpper');
    } else {
      orderedCursors = orderedCursors.concat('slideUpper', 'upper');
    }

    return (
      <div>
        <div>
          <h4>Jump to specific day</h4>
          <div className={styles.fieldsContainer}>
            {
              /* flatpickr fails on jest test */
              process.env.NODE_ENV !== 'test' &&
              <Flatpickr
          // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop, "DV6 TBC_CNES Flatpickr"
                options={{
                  minDate: '1990-01-01',
                  maxDate: moment().add(100, 'year').format('YYYY-MM-DD'),
                  value: moment(visuWindow.current).format('YYYY-MM-DD'),
                  format: 'Y-m-d',
                }}
                defaultValue={moment(visuWindow.current).format('YYYY-MM-DD')}
                onChange={this.setDayToJump}
                className={styles.formControl}
              />
            }
            {' '}
            <Button
              bsSize="small"
              bsStyle="primary"
              disabled={!dayToJump}
              onClick={this.jumpToDay}
            >
              Jump
            </Button>
          </div>
        </div>
        <br />
        <hr />
        <h4>Visu window default width</h4>
        <span className="">&nbsp;&nbsp;&nbsp;
          hours &nbsp; &nbsp; &nbsp;
          minutes &nbsp; &nbsp;
          seconds &nbsp;
          milliseconds
        </span>
        <div className={styles.fieldsContainer}>
          <div className={styles.inputDiv}>
            {
              dateToArray(moment.duration(visuWindow.defaultWidth)).map(x =>
                (<div className={styles.inputDiv} key={x[0]}>
                  <input
                    key={x[0]}
                    defaultValue={x[1]}
                    placeholder={x[0]}
                    ref={(el) => { this[`defaultWidth${x[0]}El`] = el; }}
                    onBlur={this.onDefaultWidthChange}
                    className={classnames(
                      styles.input,
                      styles[`input_${x[0]}`],
                      'form-control'
                    )}
                  />
                  {(x[0] === 'hours' || x[0] === 'minutes') && <span>:</span>}
                  {x[0] === 'seconds' && <span>.</span>}
                </div>)
              )
            }
          </div>
          <Button
            bsSize="small"
            bsStyle="primary"
            disabled={!defaultWidthChanged}
            onClick={this.willSetDefaultWidth}
          >
            Set default width
          </Button>
        </div>
        <form onSubmit={this.willUpdateCursors} >
          <br />
          <hr />
          <h4>Cursor timestamps</h4>
          {
            this.props.messages && this.props.messages.length ?
              this.props.messages.map((v, i) => {
                const key = `${i}_${v.message}`;
                return (
                  <Message
                    key={key}
                    type={v.type}
                    message={v.message}
                    removing={v.removing}
                    onClose={() => this.props.removeMessage(`timeSetter-${this.props.timebarUuid}`, v.uuid)}
                    onhover={() => this.props.cancelRemoveMessage(`timeSetter-${this.props.timebarUuid}`, v.uuid)}
                  />
                );
              }
              ) : null
            }
          {
            orderedCursors.map((x) => {
              let undisplayed = false;
              if (timebarMode !== 'Fixed' && x === 'slideLower') {
                undisplayed = true;
              }
              if (timebarMode === 'Normal' && x === 'slideUpper') {
                undisplayed = true;
              }
              let ms;
              if (visuWindow[x]) {
                ms = this.state[x] || visuWindow[x];
              } else if (x === 'slideLower') {
                ms = this.state.slideLower || slideWindow.lower;
              } else if (x === 'slideUpper') {
                ms = this.state.slideUpper || slideWindow.upper;
              }

              let disabled = cursor !== 'all';
              if (x === cursor) {
                disabled = false;
              }
              return (
                <TimeSetterFields
                  key={x}
                  cursor={x}
                  undisplayed={undisplayed}
                  disabled={disabled}
                  ms={ms}
                  onChange={this.onChangeAction}
                />
              );
            })
          }
          <div>
            <input
              type="submit"
              value="Save"
              className={classnames(
                'btn',
                'btn-primary',
                {
                  disabled: !changed,
                }
              )}
            />
            {' '}
            <button
              className={classnames(
                'btn',
                'btn-info',
                {
                  disabled: !changed,
                }
              )}
              onClick={this.cancel}
            >
              Cancel changes
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function dateToArray(m) {
  return [
    ['hours', m.hours()],
    ['minutes', m.minutes()],
    ['seconds', m.seconds()],
    ['milliseconds', m.milliseconds()],
  ];
}
