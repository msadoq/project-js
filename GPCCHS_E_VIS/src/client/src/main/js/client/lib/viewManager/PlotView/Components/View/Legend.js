import React, { PropTypes, PureComponent } from 'react';
import _get from 'lodash/get';
import classnames from 'classnames';
import styles from './PlotView.css';

export default class Legend extends PureComponent {

  static propTypes = {
    show: PropTypes.bool.isRequired,
    toggleShowLegend: PropTypes.func.isRequired,
    selectLine: PropTypes.func.isRequired,
    selectedLineNames: PropTypes.array.isRequired,
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
      selectLine,
      selectedLineNames,
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
                    <button
                      className={classnames(
                        selectedLineNames.includes(line.name) ?
                        styles.selectedLegend : styles.legend,
                        'btn', 'btn-default', 'btn-xs'
                      )}
                      onClick={e => selectLine(e, line.name)}
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
                    </button>
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
