// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving DynamicView PlotView and TextView in dataManager.
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Adapting PlotView and Grizzly for the new data structure.
// VERSION : 1.1.2 : DM : #3622 : 15/03/2017 : Grizzly : perfOutput as an option, log lines number, points number and axis.
// VERSION : 1.1.2 : DM : #3622 : 15/03/2017 : Fixed perf log in Grizzly, counting total number of points differently.
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Fix linting rules on hsc hss and common
// VERSION : 1.1.2 : FA : #6130 : 30/03/2017 : Highlight curve by selecting entry point in the legend.
// VERSION : 1.1.2 : DM : #6302 : 03/04/2017 : Add comment and fix coding convetions warning and un-needed relaxations
// VERSION : 1.1.2 : DM : #6302 : 04/04/2017 : FIx lint in Grizzly and PlotView.js .
// VERSION : 1.1.2 : DM : #6302 : 06/04/2017 : Fix some lint errors, added justification and DV6 TBC_CNES prefix on others.
// VERSION : 1.1.2 : DM : #5828 : 25/04/2017 : Grizzly : when y axis labels are out of range, they are hidden.
// VERSION : 1.1.2 : DM : #5828 : 12/05/2017 : Small fix in Grizzly: leftMargin for LinesCanvas is always accurate.
// VERSION : 1.1.2 : FA : ISIS-FT-2107 : 13/06/2017 : Prep for point labels option on PlotView.
// VERSION : 1.1.2 : DM : #6829 : 06/07/2017 : PlotView perfOutput is available, just set perOutput={true} to Grizzly.
// VERSION : 1.1.2 : FA : #7185 : 06/07/2017 : Fix lint errors and warnings
// VERSION : 1.1.2 : DM : #6829 : 10/07/2017 : PlotView default yAccessor : .value instead of .y
// VERSION : 1.1.2 : DM : #6829 : 10/07/2017 : linesCanvas prop lines[n].yAccessor is not mandatory.
// VERSION : 1.1.2 : DM : #6835 : 18/07/2017 : PlotView's lines take string instead of function for colorAccessor attribute.
// VERSION : 1.1.2 : DM : #6830 : 20/07/2017 : Carried few changes to Grizzly-PlotView to avoid useless re-renders + removed stuff related to pointLabels.
// VERSION : 1.1.2 : DM : #6830 : 20/07/2017 : Grizzly/PlotView : having only one method on Chart to calculate position styles for ToolTip, LinesCanvas and Background divs.
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : DM : #6835 : 08/09/2017 : Simplified style for canvas divs and tooltip divs, calculated only once in main Chart component.
// VERSION : 1.1.2 : FA : #7755 : 18/09/2017 : When pointStyle, lineStyle or other property is changed on EP, curves get updated automatically.
// VERSION : 1.1.2 : FA : #7814 : 18/09/2017 : Handling data differently in PlotView : using indexes to iterate.
// VERSION : 1.1.2 : FA : #7814 : 19/09/2017 : GrizzlyParametric now also works with indexes and data.
// END-HISTORY
// ====================================================================

import React, { PropTypes, Component } from 'react';
import styles from './GrizzlyChart.css';

export default class LinesCanvas extends Component {

  static propTypes = {
    updateLabelPosition: PropTypes.func.isRequired,
    axisId: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
    data: PropTypes.objectOf(PropTypes.shape).isRequired,
    indexes: PropTypes.objectOf(PropTypes.shape).isRequired,
    showLabels: PropTypes.bool,
    perfOutput: PropTypes.bool.isRequired,
    lines: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        yAxis: PropTypes.string.isRequired,
        fill: PropTypes.string,
        lineStyle: PropTypes.string,
        lineSize: PropTypes.number,
        pointSize: PropTypes.number,
        pointStyle: PropTypes.string,
        dataAccessor: PropTypes.string,
        yAccessor: PropTypes.func,
        colorAccessor: PropTypes.string,
      })
    ).isRequired,
    divStyle: PropTypes.shape().isRequired,
  }

  static defaultProps = {
    showLabels: false,
    showPointLabels: false,
  }

  componentDidMount() {
    this.draw();
  }

  shouldComponentUpdate(nextProps) {
    let shouldRender = false;

    const attrs = ['yAxesAt', 'top', 'height', 'margin', 'width', 'perfOutput', 'divStyle',
      'xScale', 'showLabels', 'data', 'indexes', 'yScale', 'showPointLabels', 'dataAccessor'];
    for (let i = 0; i < attrs.length; i += 1) {
      if (nextProps[attrs[i]] !== this.props[attrs[i]]) {
        shouldRender = true;
      }
    }

    if (!this.linesObject) {
      shouldRender = true;
    }
    const linesObject = {};
    nextProps.lines.forEach((l) => {
      if (this.linesObject && l !== this.linesObject[l.name]) {
        shouldRender = true;
      }
      linesObject[l.name] = l;
    });
    this.linesObject = linesObject;

    return shouldRender;
  }

  componentDidUpdate() {
    this.draw();
  }

  drawTriangle = (ctx, lastX, lastY, pointOffset) => {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY - pointOffset);
    ctx.lineTo(lastX - pointOffset, lastY + pointOffset);
    ctx.lineTo(lastX + pointOffset, lastY + pointOffset);
    ctx.lineTo(lastX, lastY - pointOffset);
    ctx.fill();
    ctx.stroke();
  }

  draw = () => {
    const {
      perfOutput,
      height,
      width,
      lines,
      data,
      indexes,
      xScale,
      updateLabelPosition,
      axisId,
      showLabels,
      yScale,
    } = this.props;

    const ctx = this.el.getContext('2d');

    ctx.clearRect(0, 0, width, height);

    let totalPoints = 0;
    // eslint-disable-next-line no-console, "DV6 TBC_CNES Perf logging"
    if (perfOutput) console.time();

    // eslint-disable-next-line complexity, "DV6 TBC_CNES Draw function, must not be split"
    lines.forEach((line) => {
      const lineIndexes = line.dataAccessor && indexes
        ? indexes[line.dataAccessor]
        : line.indexes;
      const lineData = line.dataAccessor && data
        ? data[line.dataAccessor]
        : line.data;

      if (perfOutput) totalPoints += lineIndexes.length;
      if (!lineIndexes || !lineData) {
        // console.log(`No data for line ${line.id}`);
        return;
      }

      // Default values
      const fill = line.fill || '#222222';
      const lineSize = typeof line.lineSize !== 'number' ? 1 : line.lineSize;
      const pointSize = typeof line.pointSize !== 'number' ? 0 : line.pointSize;

      ctx.strokeStyle = fill;
      ctx.fillStyle = fill;
      ctx.lineWidth = lineSize;

      // Only uszed for Dot points
      const fontSize = pointSize * 3;
      ctx.font = `${fontSize}px Arial`;

      if (line.lineStyle === 'Dashed') {
        ctx.setLineDash([6, 2]);
      } else if (line.lineStyle === 'Dotted') {
        ctx.setLineDash([3, 3]);
      } else {
        ctx.setLineDash([2, 0]);
      }

      // Do not draw
      if (!lineSize && (!pointSize || !line.pointStyle)) {
        updateLabelPosition(axisId, line.id, null);
        return;
      }

      // =============== DRAWING
      ctx.beginPath();

      // Point (only if size > 0 AND style not null
      let pointOffset;
      if (line.pointStyle && pointSize) {
        pointOffset = pointSize / 2;
      }

      let lastColor = fill;
      let lastX;
      let lastY;
      const lineIndexLength = lineIndexes.length;
      for (let i = 0; i < lineIndexLength; i += 1) {
        const index = lineIndexes[i];
        const packet = lineData[index];
        if (!packet) {
          return;
        }
        if (line.colorAccessor) {
          const color = lineData[index][line.colorAccessor] || fill;
          if (color && color !== lastColor) {
            ctx.stroke();
            lastColor = color;
            ctx.strokeStyle = lastColor;
            ctx.fillStyle = lastColor;
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
          }
        }

        const x = line.xAccessor ? line.xAccessor(packet) : packet.x;
        const y = line.yAccessor ? line.yAccessor(packet) : packet.value;
        lastY = yScale(y);
        lastX = xScale(x);

        // Draw line
        if (lineSize > 0) {
          ctx.lineTo(lastX, lastY);
        }

        // Draw point
        if (pointOffset && line.pointStyle === 'Square') {
          ctx.fillRect(lastX - pointOffset, lastY - pointOffset, pointSize, pointSize);
        } else if (pointOffset && line.pointStyle === 'Dot') {
          ctx.fillText('•', lastX - pointOffset, lastY + (fontSize / 3));
        } else if (pointOffset && line.pointStyle === 'Triangle') {
          ctx.stroke();
          this.drawTriangle(ctx, lastX, lastY, pointOffset);
          ctx.beginPath();
          ctx.moveTo(lastX, lastY);
        }
      }

      ctx.stroke();

      if (!showLabels) {
        return;
      }

      // Horizontal line
      const lastYPosition = yScale(
        line.yAccessor ?
          line.yAccessor(lineData[lineIndexes[lineIndexLength - 1]]) :
          lineData[lineIndexes[lineIndexLength - 1]].value
      );
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 3]);
      const lastPacket = lineData[lineIndexes[lineIndexLength - 1]];
      ctx.moveTo(xScale(line.xAccessor ? line.xAccessor(lastPacket) : lastPacket.x), lastYPosition);
      ctx.lineTo(
        xScale(
          line.xAccessor ? line.xAccessor(lineData[lineIndexes[0]]) : lineData[lineIndexes[0]].x
        ),
        lastYPosition
      );

      updateLabelPosition(
        axisId,
        line.id,
        (lastYPosition < 0 || lastYPosition > height) ? null : lastYPosition
      );

      ctx.stroke();
    });

    if (perfOutput) {
      // eslint-disable-next-line no-console, "DV6 TBC_CNES Perf logging"
      console.log(
        'axis',
        axisId,
        'Just drawed',
        lines.length,
        'lines, about',
        totalPoints,
        'total points'
      );
      // eslint-disable-next-line no-console, "DV6 TBC_CNES Perf logging"
      console.timeEnd();
    }
  }

  assignEl = (el) => { this.el = el; }

  render() {
    const {
      height,
      width,
      divStyle,
    } = this.props;

    return (
      <canvas
        ref={this.assignEl}
        height={height}
        width={width}
        className={styles.canvas}
        style={divStyle}
      />
    );
  }
}
