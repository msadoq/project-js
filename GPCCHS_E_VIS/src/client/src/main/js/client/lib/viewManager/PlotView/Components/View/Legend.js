// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Fixed import errors in editor components.
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : New legend toggable on plotview !
// VERSION : 1.1.2 : FA : #6130 : 30/03/2017 : Highlight curve by selecting entry point in the legend.
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Fixed incorrect PropType in PlotView's legend.
// VERSION : 1.1.2 : DM : #6302 : 04/04/2017 : FIx lint in Grizzly and PlotView.js .
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Fix PlotView legend, due to connectedDataY -> connectedData.
// VERSION : 1.1.2 : DM : #5828 : 14/04/2017 : It's possible to select multiple lines in PlotView legend.
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : open parameter in editor via context menu
// VERSION : 1.1.2 : DM : #5828 : 11/05/2017 : User can now show/hide/remove EP from Plot in legend.
// VERSION : 1.1.2 : DM : #6829 : 27/06/2017 : PlotView legend : left right top bottom.
// VERSION : 1.1.2 : DM : #6830 : 20/07/2017 : Carried few changes to Grizzly-PlotView to avoid useless re-renders + removed stuff related to pointLabels.
// VERSION : 1.1.2 : FA : #7256 : 21/07/2017 : Legend PlotView colors are editable in styles/PlotView.css
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 24/08/2017 : Fixed few eslint errors / warnings no-console and spaced-comment.
// END-HISTORY
// ====================================================================

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
