// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Fixed import errors in editor components.
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : New legend toggable on plotview !
// VERSION : 1.1.2 : FA : #6130 : 30/03/2017 : Highlight curve by selecting entry point in the
//  legend.
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Fixed incorrect PropType in PlotView's legend.
// VERSION : 1.1.2 : DM : #6302 : 04/04/2017 : FIx lint in Grizzly and PlotView.js .
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Fix PlotView legend, due to connectedDataY ->
//  connectedData.
// VERSION : 1.1.2 : DM : #5828 : 14/04/2017 : It's possible to select multiple lines in PlotView
//  legend.
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : open parameter in editor via context menu
// VERSION : 1.1.2 : DM : #5828 : 11/05/2017 : User can now show/hide/remove EP from Plot in
//  legend.
// VERSION : 1.1.2 : DM : #6829 : 27/06/2017 : PlotView legend : left right top bottom.
// VERSION : 1.1.2 : DM : #6830 : 20/07/2017 : Carried few changes to Grizzly-PlotView to avoid
//  useless re-renders + removed stuff related to pointLabels.
// VERSION : 1.1.2 : FA : #7256 : 21/07/2017 : Legend PlotView colors are editable in
//  styles/PlotView.css
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 24/08/2017 : Fixed few eslint errors / warnings no-console
//  and spaced-comment.
// END-HISTORY
// ====================================================================

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _memoize from 'lodash/memoize';
import { Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';
import classnames from 'classnames';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import styles from './Legend.css';

export const tooltip = title => (
  <Tooltip id="tooltip">
    {title}
  </Tooltip>
);

export const renderShowEntryPoint = (showEp, line, showEpNames) => (
  <OverlayTrigger placement="bottom" overlay={tooltip('Show Entry Point')}>
    <Glyphicon
      glyph="eye-open"
      onClick={e => showEp(e, line.id)}
      className={classnames(
        { [styles.showEyeSelected]: showEpNames.includes(line.id) },
        styles.eyeButton)
      }
    />
  </OverlayTrigger>
);

export const renderHideEntryPoint = (hideEp, line, hideEpNames) => (
  <OverlayTrigger placement="bottom" overlay={tooltip('Hide Entry Point')}>
    <Glyphicon
      glyph="eye-close"
      onClick={e => hideEp(e, line.id)}
      className={classnames(
        { [styles.hideEyeSelected]: hideEpNames.includes(line.id) },
        styles.eyeButton)
      }
    />
  </OverlayTrigger>
);

export const renderRemoveEntryPoint = (removeEntryPoint, line) => (
  <OverlayTrigger placement="bottom" overlay={tooltip('Remove Entry Point')}>
    <Glyphicon
      glyph="remove"
      onClick={e => removeEntryPoint(e, line.id)}
      className={classnames(styles.removeButton, 'text-danger')}
    />
  </OverlayTrigger>
);

export const renderShowNonSignificantData = (showNonNominal, line, showEpNonNominal) => (
  <OverlayTrigger placement="bottom" overlay={tooltip('Display non significant values')}>
    <Glyphicon
      glyph="plus-sign"
      onClick={e => showNonNominal(e, line.id)}
      className={classnames(
        { [styles.showEyeSelected]: showEpNonNominal.includes(line.id) },
        styles.eyeButton)
      }
    />
  </OverlayTrigger>
);

const renderLegendName = name => (<span className={styles.plotLegendName}>{name}</span>);

const topBottom = ['top', 'bottom'];
const leftRight = ['left', 'right'];

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
    showNonNominal: PropTypes.func.isRequired,
    showEpNonNominal: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    legendLocation: 'bottom',
  };

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

  memoizeHeightStyle = _memoize(
    (plotHeight, legendLocation) => ({
      maxHeight: (leftRight.includes(legendLocation)
        ? `${plotHeight}px`
        : 'auto'
      ),
    })
  );

  memoizeLineColor = _memoize(
    (line, attribute) => ({
      [attribute]: _get(line, ['objectStyle', 'curveColor']) || '#222',
    })
  );

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
      showNonNominal,
      showEpNonNominal,
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
      <ErrorBoundary>
        <div
          className={topBottom.includes(legendLocation)
            ? styles.plotLegendHorizontal
            : styles.plotLegendVertical
          }
          style={this.memoizeHeightStyle(
            `${plotHeight}-${legendLocation}`,
            plotHeight,
            legendLocation
          )}
        >
          <button
            onClick={this.props.toggleShowLegend}
            className="btn-primary"
          >
            {show
              ? 'Hide legend'
              : 'Show legend'
            }
          </button>
          {
            show && sortedAndValidAxes.map(axis =>
              <div key={axis.id}>
                <h4 className={classnames('LegendAxisName', styles.plotLegendAxisName)}>{axis.label}</h4>
                <div
                  className={
                    classnames({
                      [styles.plotLegendLegendsHorizontal]: topBottom.includes(legendLocation),
                      [styles.plotLegendLegendsVertical]: leftRight.includes(legendLocation),
                    })
                  }
                >
                  {
                    axis.lines.map(line =>
                      <div
                        className={classnames('LegendItem', styles.legend)}
                        style={this.memoizeLineColor(
                          `${line.id}-borderColor`,
                          line,
                          'borderColor'
                        )}
                        key={line.name}
                        onContextMenu={event => onContextMenu(event, line.name)}
                      >
                        <span
                          className={styles.plotLegendColor}
                          style={this.memoizeLineColor(
                            `${line.id}-background`,
                            line,
                            'background'
                          )}
                        />
                        {topBottom.includes(legendLocation) && renderLegendName(line.name) }
                        {renderShowEntryPoint(showEp, line, showEpNames)}
                        {renderHideEntryPoint(hideEp, line, hideEpNames)}
                        {renderRemoveEntryPoint(removeEntryPoint, line)}
                        {renderShowNonSignificantData(showNonNominal, line, showEpNonNominal)}
                        {leftRight.includes(legendLocation) && renderLegendName(line.name)}
                      </div>
                  )
                }
                </div>
              </div>
          )
        }
        </div>
      </ErrorBoundary>
    );
  }
}
