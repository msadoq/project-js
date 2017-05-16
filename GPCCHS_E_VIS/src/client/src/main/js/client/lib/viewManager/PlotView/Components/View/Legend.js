import React, { PropTypes, PureComponent } from 'react';
import _get from 'lodash/get';
import { Glyphicon } from 'react-bootstrap';
import classnames from 'classnames';
import styles from './Legend.css';

export default class Legend extends PureComponent {

  static propTypes = {
    show: PropTypes.bool.isRequired,
    toggleShowLegend: PropTypes.func.isRequired,
    removeEntryPoint: PropTypes.func.isRequired,
    hideEp: PropTypes.func.isRequired,
    hideEpNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    showEp: PropTypes.func.isRequired,
    showEpNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    yAxes: PropTypes.arrayOf(
      PropTypes.shape
    ).isRequired,
    lines: PropTypes.arrayOf(
      PropTypes.shape
    ).isRequired,
    onContextMenu: PropTypes.func.isRequired,
  }

  render() {
    const {
      yAxes,
      lines,
      show,
      showEp,
      showEpNames,
      hideEp,
      hideEpNames,
      removeEntryPoint,
      onContextMenu,
    } = this.props;

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
        className={styles.plotLegend}
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
              <h4 className={styles.plotLegendAxisName}>{axis.label}</h4>
              <div className={styles.plotLegendLegends}>
                {
                  axis.lines.map(line =>
                    <div
                      className={classnames(
                        styles.legend
                      )}
                      key={line.name}
                      onContextMenu={event => onContextMenu(event, line.name)}
                    >
                      <span
                        className={styles.plotLegendColor}
                        style={{
                          background: _get(line, ['objectStyle', 'curveColor']) || '#222',
                        }}
                      />
                      <span
                        className={styles.plotLegendName}
                      >
                        {` : ${line.name}`}
                      </span>
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
