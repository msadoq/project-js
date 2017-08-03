import React, { PropTypes, Component } from 'react';
import _get from 'lodash/get';
import { Glyphicon } from 'react-bootstrap';
import classnames from 'classnames';
import styles from './Legend.css';

export default class Legend extends Component {

  static propTypes = {
    show: PropTypes.bool.isRequired,
    legendLocation: PropTypes.string,
    plotHeight: PropTypes.number.isRequired,
    toggleShowLegend: PropTypes.func.isRequired,
    removeEntryPoint: PropTypes.func.isRequired,
    hideEp: PropTypes.func.isRequired,
    hideEpNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    showEp: PropTypes.func.isRequired,
    showEpNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    axes: PropTypes.shape().isRequired,
    lines: PropTypes.arrayOf(
      PropTypes.shape
    ).isRequired,
    onContextMenu: PropTypes.func.isRequired,
  }

  static defaultProps = {
    legendLocation: 'bottom',
  }

  shouldComponentUpdate(nextProps) {
    let shouldRender = false;
    const attrs = Object.keys(this.props);
    for (let i = 0; i < attrs.length; i += 1) {
      if (nextProps[attrs[i]] !== this.props[attrs[i]]) {
        console.log(attrs[i], 'changed');
        shouldRender = true;
      }
    }
    return shouldRender;
  }

  render() {
    const {
      axes,
      lines,
      show,
      showEp,
      showEpNames,
      hideEp,
      hideEpNames,
      legendLocation,
      removeEntryPoint,
      onContextMenu,
      plotHeight,
    } = this.props;

    const yAxes = Object.values(axes).filter(a => a.label !== 'Time');
    const sortedAndValidAxes = yAxes
      .map((axis) => {
        const axisLines = lines
          .filter(line => _get(line, ['connectedData', 'axisId']) === axis.id);
        return {
          ...axis,
          lines: axisLines,
        };
      })
      .filter(axis => axis.lines.length > 0 && axis.showAxis);

    return (
      <div
        className={
          legendLocation === 'top' || legendLocation === 'bottom' ?
          styles.plotLegendHorizontal : styles.plotLegendVertical
        }
        style={{
          maxHeight: (legendLocation === 'right' || legendLocation === 'left') ? `${plotHeight}px` : 'auto',
        }}
      >
        <button
          onClick={this.props.toggleShowLegend}
          className="btn-primary"
        >
          {show ? 'Hide legend' : 'Show legend'}
        </button>
        {
          show && sortedAndValidAxes.map(axis =>
            <div
              key={axis.id}
            >
              <h4 className={classnames('LegendAxisName', styles.plotLegendAxisName)}>{axis.label}</h4>
              <div
                className={
                  classnames({
                    [styles.plotLegendLegendsHorizontal]: legendLocation === 'top' || legendLocation === 'bottom',
                    [styles.plotLegendLegendsVertical]: legendLocation === 'right' || legendLocation === 'left',
                  })
                }
              >
                {
                  axis.lines.map(line =>
                    <div
                      className={classnames('LegendItem', styles.legend)}
                      style={{
                        borderColor: _get(line, ['objectStyle', 'curveColor']) || '#222',
                      }}
                      key={line.name}
                      onContextMenu={event => onContextMenu(event, line.name)}
                    >
                      <span
                        className={styles.plotLegendColor}
                        style={{
                          background: _get(line, ['objectStyle', 'curveColor']) || '#222',
                        }}
                      />
                      {
                        (legendLocation === 'top' || legendLocation === 'bottom') &&
                        <span
                          className={styles.plotLegendName}
                        >
                          {line.name}
                        </span>
                      }
                      <Glyphicon
                        glyph="eye-open"
                        onClick={e => showEp(e, line.id)}
                        className={
                          classnames(
                            {
                              [styles.showEyeSelected]: showEpNames.includes(line.id),
                            },
                            styles.eyeButton
                          )
                        }
                      />

                      <Glyphicon
                        glyph="eye-close"
                        onClick={e => hideEp(e, line.id)}
                        className={
                          classnames(
                            {
                              [styles.hideEyeSelected]: hideEpNames.includes(line.id),
                            },
                            styles.eyeButton
                          )
                        }
                      />

                      <Glyphicon
                        glyph="remove"
                        onClick={e => removeEntryPoint(e, line.id)}
                        className={
                          classnames(
                            styles.removeButton,
                            'text-danger'
                          )
                        }
                      />
                      {
                        (legendLocation === 'left' || legendLocation === 'right') &&
                        <span
                          className={styles.plotLegendName}
                        >{line.name}</span>
                      }
                    </div>
                  )
                }
              </div>
            </div>
          )
        }
      </div>
    );
  }
}
