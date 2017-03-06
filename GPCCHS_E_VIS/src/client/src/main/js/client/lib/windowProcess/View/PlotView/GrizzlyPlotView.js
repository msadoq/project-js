import React, { PureComponent, PropTypes } from 'react';
import _ from 'lodash/fp';
import _get from 'lodash/get';
import _max from 'lodash/max';
import _min from 'lodash/min';
import classnames from 'classnames';
import Dimensions from 'react-dimensions';
import getLogger from 'common/log';
import { get } from 'common/parameters';

import GrizzlyChart from './Grizzly/Chart';

import DroppableContainer from '../../common/DroppableContainer';
import CloseableAlert from '../CloseableAlert';
import styles from './PlotView.css';

const logger = getLogger('view:plot');

const getComObject =
  _.propOr('UNKNOWN_COM_OBJECT', 0);


// parse clipboard data to create partial entry point
function parseDragData(data) {
  return {
    name: data.item,
    connectedDataX: {
      formula: `${data.catalogName}.${data.item}<${getComObject(data.comObjects)}>.groundDate`,
    },
    connectedDataY: {
      formula: `${data.catalogName}.${data.item}<${getComObject(data.comObjects)}>.${get('DEFAULT_FIELD')[getComObject(data.comObjects)]}`,
    },
  };
}

const plotPadding = 15;
const mainStyle = { padding: `${plotPadding}px` };

export class GrizzlyPlotView extends PureComponent {
  static propTypes = {
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired,
    data: PropTypes.shape({
      lines: PropTypes.array, // eslint-disable-line react/no-unused-prop-types
      columns: PropTypes.array, // eslint-disable-line react/no-unused-prop-types
    }),
    visuWindow: PropTypes.shape({
      lower: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
      current: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
      upper: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
    }),
    viewId: PropTypes.string.isRequired,
    addEntryPoint: PropTypes.func.isRequired,
    entryPoints: PropTypes.objectOf(PropTypes.object).isRequired,
    // ({
    //   connectedDataX: PropTypes.shape({
    //     axisId: PropTypes.string,
    //     digits: PropTypes.number,
    //     domain: PropTypes.string,
    //     filter: PropTypes.arrayOf(PropTypes.shape({
    //       field: PropTypes.string,
    //       operand: PropTypes.string,
    //       operator: PropTypes.string,
    //     })),
    //     format: PropTypes.string,
    //     formula: PropTypes.string,
    //     timeline: PropTypes.string,
    //     unit: PropTypes.string,
    //   }),
    //   connectedDataY: PropTypes.shape({
    //     axisId: PropTypes.string,
    //     digits: PropTypes.number,
    //     domain: PropTypes.string,
    //     filter: PropTypes.arrayOf(PropTypes.shape({
    //       field: PropTypes.string,
    //       operand: PropTypes.string,
    //       operator: PropTypes.string,
    //     })),
    //     format: PropTypes.string,
    //     formula: PropTypes.string,
    //     timeline: PropTypes.string,
    //     unit: PropTypes.string,
    //   }),
    //   name: PropTypes.string,
    //   id: PropTypes.string,
    // })).isRequired,
    configuration: PropTypes.shape({
      type: PropTypes.string.isRequired,
      links: PropTypes.array,
      procedures: PropTypes.array,
      defaultRatio: PropTypes.shape({
        length: PropTypes.number,
        width: PropTypes.number,
      }),
      entryPoints: PropTypes.array,
      axes: PropTypes.object,
      showYAxes: PropTypes.string,
      grids: PropTypes.array,
      title: PropTypes.string,
      titleStyle: PropTypes.shape({
        font: PropTypes.string,
        size: PropTypes.number,
        bold: PropTypes.bool,
        italic: PropTypes.bool,
        underline: PropTypes.bool,
        strikeOut: PropTypes.bool,
        align: PropTypes.string,
        color: PropTypes.string,
      }),
      backgroundColor: PropTypes.string,
      legend: PropTypes.object,
      markers: PropTypes.array,
    }).isRequired,
  };

  static defaultProps = {
    data: {
      lines: [],
      columns: [],
    },
    visuWindow: null,
  };

  shouldComponentUpdate(nextProps) {
    const {
      data,
      entryPoints,
      visuWindow,
      configuration,
      containerWidth,
      containerHeight,
    } = this.props;
    return !(
      data === nextProps.data &&
      entryPoints === nextProps.entryPoints &&
      visuWindow === nextProps.visuWindow &&
      configuration === nextProps.configuration &&
      containerWidth === nextProps.containerWidth &&
      containerHeight === nextProps.containerHeight
    );
  }

  onDrop = this.drop.bind(this);

  getEntryPointErrors(supClass = '') {
    const epWithErrors = Object
      .keys(this.props.entryPoints)
      .filter(key => this.props.entryPoints[key].error)
      .map(key => ({
        error: this.props.entryPoints[key].error,
        key,
      }));

    return epWithErrors.length ?
      <CloseableAlert
        bsStyle="danger"
        className={classnames(
          'z100',
          'mb10',
          'w100',
          'posAbsolute',
          supClass
        )}
      >
        <div>
          {epWithErrors
            .map(ep => (
              <div
                className={styles.entryPointErrorSubDiv}
                key={ep.key}
              >
                {ep.name}: {ep.error}
              </div>
            ))}
        </div>
      </CloseableAlert> : undefined;
  }

  drop(e) {
    const data = e.dataTransfer.getData('text/plain');
    const content = JSON.parse(data);

    if (!_get(content, 'catalogName')) {
      return;
    }

    // eslint-disable-next-line no-console
    this.props.addEntryPoint(
      this.props.viewId,
      parseDragData(content)
    );

    e.stopPropagation();
  }

  shouldRender() {
    const {
      containerWidth,
      containerHeight,
      data,
      visuWindow,
      entryPoints,
    } = this.props;
    let info;
    if (containerWidth <= 0 || containerHeight <= 0) {
      info = `invisible size received ${containerWidth}x${containerHeight}`;
    }
    if (!visuWindow) {
      info = 'No vizualisation window';
    }
    if (!data.columns || !data.columns.length || data.columns.length < 2) {
      info = 'no point';
    }
    if (data.columns && data.columns.length < 2) {
      info = 'only one point';
    }

    if (!entryPoints || !Object.keys(entryPoints).length) {
      info = 'invalid view configuration';
    }
    return info;
  }

  render() {
    logger.debug('render');
    const noRender = this.shouldRender();

    if (noRender) {
      logger.debug('no render due to', noRender);
      // TODO : clean message component
      return (
        <DroppableContainer
          onDrop={this.onDrop}
          className={styles.errorContent}
        >
          {this.getEntryPointErrors()}
          <div className="flex">
            <div className={styles.renderErrorText}>
              Unable to render view <br />
              {noRender}
            </div>
          </div>
        </DroppableContainer>
      );
    }
    const {
      containerWidth,
      containerHeight,
      data,
      data: { columns },
      configuration: { showYAxes, axes, grids, entryPoints },
      visuWindow,
    } = this.props;

    const yAxes = Object.values(axes).filter(a => a.label !== 'Time');
    const xExtents = [visuWindow.lower, visuWindow.upper];

    return (
      <DroppableContainer
        onDrop={this.onDrop}
        text="add entry point"
        className={classnames(
          'h100',
          'posRelative'
        )}
        style={mainStyle}
      >
        <GrizzlyChart
          height={containerHeight - (plotPadding * 2)}
          width={containerWidth - (plotPadding * 2)}
          enableTooltip
          tooltipColor="blue"
          allowYZoom
          allowYPan
          allowZoom
          allowPan
          xExtents={xExtents}
          current={visuWindow.current}
          yAxesAt={showYAxes}
          xAxisAt="bottom"
          yAxes={yAxes.map((axis) => {
            const grid = grids.find(g => g.yAxisId === axis.id || g.yAxisId === axis.label);
            const axisEntryPoints = entryPoints
              .filter(ep => _get(ep, ['connectedDataY', 'axisId']) === axis.id);
            return {
              id: axis.id,
              yExtents:
                axis.autoLimits === true ?
                [
                  _min(axisEntryPoints.map(ep => data.min[ep.name])),
                  _max(axisEntryPoints.map(ep => data.max[ep.name])),
                ]
                :
                [axis.min, axis.max],
              data: columns,
              orient: 'top',
              format: '.3f',
              showAxis: axis.showAxis === true,
              showLabels: axis.showLabels === true,
              showTicks: axis.showTicks === true,
              autoLimits: false,
              showGrid: _get(grid, 'showGrid', false),
              gridStyle: _get(grid, ['line', 'style']),
              gridSize: _get(grid, ['line', 'size']),
              unit: axis.unit,
              label: axis.label,
              labelStyle: axis.style,
            };
          })}
          lines={
            entryPoints.map(ep =>
              ({
                id: ep.name,
                yAxis: _get(ep, ['connectedDataY', 'axisId']),
                fill: _get(ep, ['objectStyle', 'curveColor']),
                lineSize: _get(ep, ['objectStyle', 'line', 'size']),
                lineStyle: _get(ep, ['objectStyle', 'line', 'style']),
                pointStyle: _get(ep, ['objectStyle', 'points', 'style']),
                pointSize: _get(ep, ['objectStyle', 'points', 'size']),
                yAccessor: d => _get(d, [ep.name, 'value']),
                colorAccessor: d => _get(d, [ep.name, 'color']),
              })
            )
          }
        />
      </DroppableContainer>
    );
  }
}

const SizeablePlotView = Dimensions()(GrizzlyPlotView);

export default SizeablePlotView;
