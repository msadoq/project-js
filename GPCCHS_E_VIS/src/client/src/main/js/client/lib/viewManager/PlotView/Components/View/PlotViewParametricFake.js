import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import getLogger from '../../../../common/logManager';
import Dimensions from '../../../../windowProcess/common/Dimensions';
import GrizzlyChart from './GrizzlyParametric/Chart';

import DroppableContainer from '../../../../windowProcess/common/DroppableContainer';
import CloseableAlert from './CloseableAlert';
import styles from './PlotView.css';

const logger = getLogger('view:plot');

const yAxesParamertic = [
  {
    id: 'yaxis-1',
    orient: 'top',
    extents: [-20, 80],
    autoLimits: false,
    showAxis: true,
    showLabels: true,
    showTicks: true,
    autoTick: true,
    tickStep: 10,
    showGrid: true,
    gridStyle: 'Continuous',
    gridSize: 1,
    unit: 'V',
    label: 'Y axis 1',
    format: '.2f',
    labelStyle: {},
  },
  {
    id: 'yaxis-2',
    orient: 'top',
    extents: [-30, 70],
    autoLimits: false,
    showAxis: true,
    showLabels: true,
    showTicks: true,
    autoTick: true,
    tickStep: 10,
    showGrid: true,
    gridStyle: 'Continuous',
    gridSize: 1,
    unit: 'V',
    label: 'Y axis 2',
    format: '.2f',
    labelStyle: {},
  },
];

const xAxesParamertic = [
  {
    id: 'xaxis-1',
    orient: 'top',
    extents: [0, 200],
    autoLimits: false,
    showAxis: true,
    showLabels: true,
    showTicks: true,
    autoTick: true,
    tickStep: 10,
    showGrid: true,
    gridStyle: 'Continuous',
    gridSize: 1,
    unit: 'V',
    label: 'X axis 1',
    format: '.2f',
    labelStyle: {},
  },
  {
    id: 'xaxis-2',
    orient: 'top',
    extents: [-20, 180],
    autoLimits: false,
    showAxis: true,
    showLabels: true,
    showTicks: true,
    autoTick: true,
    tickStep: 10,
    showGrid: true,
    gridStyle: 'Continuous',
    gridSize: 1,
    unit: 'V',
    label: 'X axis 2',
    format: '.2f',
    labelStyle: {},
  },
];

const linesParametric = [
  {
    indexes: [
      10000,
      10010,
      10020,
      10030,
      10040,
    ],
    data: {
      10000: { x: 20, y: 30 },
      10010: { x: 22, y: 32 },
      10020: { x: 24, y: 34 },
      10030: { x: 26, y: 36 },
      10040: { x: 28, y: 38 },
    },
    id: 'line-1',
    yAxisId: 'yaxis-1',
    xAxisId: 'xaxis-1',
    fill: '#22F',
    lineStyle: null,
    lineSize: null,
    pointSize: null,
    pointStyle: null,
    yAccessor: null,
    xAccessor: null,
    colorAccessor: null,
    tooltipFormatter: null,
  },
  {
    indexes: [
      10000,
      10010,
      10020,
      10030,
      10040,
    ],
    data: {
      10000: { x: 42, y: 30 },
      10010: { x: 46, y: 32 },
      10020: { x: 50, y: 34 },
      10030: { x: 54, y: 36 },
      10040: { x: 58, y: 38 },
    },
    id: 'line-2',
    yAxisId: 'yaxis-2',
    xAxisId: 'xaxis-1',
    fill: '#22F',
    lineStyle: null,
    lineSize: null,
    pointSize: null,
    pointStyle: null,
    yAccessor: null,
    xAccessor: null,
    colorAccessor: null,
    tooltipFormatter: null,
  },
  {
    indexes: [
      10000,
      10010,
      10020,
      10030,
      10040,
      10050,
      10060,
      10070,
      10080,
      10090,
    ],
    data: {
      10000: { x: 42, y: 40 },
      10010: { x: 46, y: 38 },
      10020: { x: 50, y: 36 },
      10030: { x: 54, y: 34 },
      10040: { x: 58, y: 32 },
      10050: { x: 56, y: 30 },
      10060: { x: 54, y: 28 },
      10070: { x: 52, y: 26 },
      10080: { x: 50, y: 24 },
      10090: { x: 48, y: 22 },
    },
    id: 'line-3',
    yAxisId: 'yaxis-2',
    xAxisId: 'xaxis-2',
    fill: '#2FF',
    lineStyle: null,
    lineSize: null,
    pointSize: null,
    pointStyle: null,
    yAccessor: null,
    xAccessor: null,
    colorAccessor: null,
    tooltipFormatter: null,
  },
];

const plotPadding = 15;
const mainStyle = { padding: `${plotPadding}px` };

export class GrizzlyPlotView extends PureComponent {
  static propTypes = {
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired,
    updateDimensions: PropTypes.func.isRequired,
    visuWindow: PropTypes.shape({
      lower: PropTypes.number,
      current: PropTypes.number,
      upper: PropTypes.number,
    }),
    entryPoints: PropTypes.objectOf(PropTypes.object).isRequired,
    configuration: PropTypes.shape({
      procedures: PropTypes.array,
      entryPoints: PropTypes.array,
      axes: PropTypes.object,
      showYAxes: PropTypes.string,
      showLegend: PropTypes.bool.isRequired,
      grids: PropTypes.array,
      legend: PropTypes.object,
      markers: PropTypes.array,
    }).isRequired,
    showLinks: PropTypes.bool,
    isMaxVisuDurationExceeded: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    data: {
      lines: [],
      columns: [],
    },
    visuWindow: null,
    inspectorEpId: null,
    links: [],
    showLinks: false,
  };

  state = {};

  componentDidMount() {
    setTimeout(() => {
      this.props.updateDimensions();
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let shouldRender = false;
    const attrs = ['data', 'entryPoints', 'visuWindow', 'configuration',
      'containerWidth', 'containerHeight'];
    for (let i = 0; i < attrs.length; i += 1) {
      if (nextProps[attrs[i]] !== this.props[attrs[i]]) {
        shouldRender = true;
      }
    }
    if (nextProps.showLinks !== this.props.showLinks) {
      shouldRender = true;
    }
    if (nextState.showEpNames !== this.state.showEpNames) {
      shouldRender = true;
    }
    if (nextState.hideEpNames !== this.state.hideEpNames) {
      shouldRender = true;
    }
    return shouldRender;
  }

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

  shouldRender() {
    const {
      containerWidth,
      containerHeight,
      visuWindow,
      entryPoints,
      isMaxVisuDurationExceeded,
    } = this.props;
    let info;
    if (isMaxVisuDurationExceeded) {
      return 'Visu Window is too long for this type of view';
    }
    if (containerWidth <= 0 || containerHeight <= 0) {
      info = `invisible size received ${containerWidth}x${containerHeight}`;
    }
    if (!visuWindow) {
      info = 'No vizualisation window';
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
          onContextMenu={this.onContextMenu}
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
      configuration: {
        showYAxes,
      },
      visuWindow,
    } = this.props;

    const addStyle = {};

    return (
      <div
        style={mainStyle}
        className="PlotView h100 posRelative"
      >
        <GrizzlyChart
          additionalStyle={addStyle}
          height={containerHeight - 5}
          width={containerWidth - 10}
          tooltipColor="white"
          enableTooltip
          allowYZoom
          allowYPan
          allowZoom
          allowPan
          allowLasso
          perfOutput
          current={visuWindow.current}
          yAxesAt={showYAxes}
          xAxesAt="bottom"
          xAxes={xAxesParamertic}
          yAxes={yAxesParamertic}
          lines={linesParametric}
        />
      </div>
    );
  }
}

const SizeablePlotView = Dimensions({ elementResize: true })(GrizzlyPlotView);

export default SizeablePlotView;
