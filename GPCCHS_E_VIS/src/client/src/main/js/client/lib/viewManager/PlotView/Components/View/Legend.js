import React, { PropTypes, PureComponent } from 'react';
import _get from 'lodash/get';
import styles from './PlotView.css';

export default class Legend extends PureComponent {

  static propTypes = {
    show: PropTypes.bool.isRequired,
    toggleShowLegend: PropTypes.func.isRequired,
    yAxes: PropTypes.arrayOf(
      PropTypes.shape
    ).isRequired,
    lines: PropTypes.arrayOf(
      PropTypes.shape
    ).isRequired,
  }

  render() {
    const {
      yAxes,
      lines,
      show,
    } = this.props;

    const sortedAndValidAxes = yAxes
      .map((axis) => {
        const axisLines = lines
          .filter(line => _get(line, ['connectedDataY', 'axisId']) === axis.id);
        return {
          ...axis,
          lines: axisLines,
        };
      })
      .filter(axis => axis.lines.length > 0 && axis.showAxis);

    console.log('show', show);
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
              <ul>
                {
                  axis.lines.map(line =>
                    <li
                      key={line.name}
                    >
                      <span
                        className={styles.plotLegendColor}
                        style={{
                          background: _get(line, ['objectStyle', 'curveColor']) || '#222',
                        }}
                      />
                      <span>
                        {` : ${line.name}`}
                      </span>
                    </li>
                  )
                }
              </ul>
            </div>
          )
        }
      </div>
    );
  }
}
