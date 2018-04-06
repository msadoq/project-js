/**
 * @param ctx
 * @param lastX
 * @param lastY
 * @param pointOffset
 */
export function drawTriangle(ctx, lastX, lastY, pointOffset) {
  ctx.beginPath();
  ctx.moveTo(lastX, lastY - pointOffset);
  ctx.lineTo(lastX - pointOffset, lastY + pointOffset);
  ctx.lineTo(lastX + pointOffset, lastY + pointOffset);
  ctx.lineTo(lastX, lastY - pointOffset);
  ctx.fill();
  ctx.stroke();
}

/**
 * @param ctx
 * @param line
 * @returns {{lineSize: number, pointSize: number, fontSize: number}}
 */
export function getDefaultValues(ctx, line) {
  // Default values
  const lineSize = typeof line.lineSize !== 'number' ? 1 : line.lineSize;
  const pointSize = typeof line.pointSize !== 'number' ? 0 : line.pointSize;
  let pointOffset;

  // Only used for Dot points
  const fontSize = pointSize * 3;

  if (line.lineStyle === 'Dashed') {
    ctx.setLineDash([6, 2]);
  } else if (line.lineStyle === 'Dotted') {
    ctx.setLineDash([3, 3]);
  } else {
    ctx.setLineDash([2, 0]);
  }

  if (line.pointStyle && pointSize) {
    pointOffset = pointSize / 2;
  }

  return { lineSize, pointSize, fontSize, pointOffset };
}

/**
 * @param attrs
 * @param nextProps
 * @param currentLineObjects
 * @param currentProps
 * @returns {{shouldRender: boolean, linesObject: {}}}
 */
export function shouldRenderComponent(attrs, nextProps, currentLineObjects, currentProps) {
  let shouldRender = false;
  for (let i = 0; i < attrs.length; i += 1) {
    if (nextProps[attrs[i]] !== currentProps[attrs[i]]) {
      shouldRender = true;
    }
  }

  if (!currentLineObjects) {
    shouldRender = true;
  }
  const linesObject = {};
  nextProps.lines.forEach((l) => {
    if (currentLineObjects && l !== currentLineObjects[l.name]) {
      shouldRender = true;
    }
    linesObject[l.name] = l;
  });

  return { shouldRender, linesObject };
}

export const drawLinesCanvas = (
  perfOutput,
  lines,
  updateLabelPosition,
  showLabelsX,
  showLabelsY,
  yScale,
  xScale,
  indexes,
  current,
  parametric,
  divStyle,
  ctx
) => {
  ctx.clearRect(0, 0, divStyle.width, divStyle.height);
  let totalPoints = 0;

  // eslint-disable-next-line no-console, "DV6 TBC_CNES Perf logging"
  if (perfOutput) console.time();

  if (lines.length === 0) return;

  lines.forEach((line) => {
    const lineIndexes = indexes[line.id];
    const lineData = line.data;
    if (perfOutput) totalPoints += lineIndexes.length;

    if (!lineData || !lineIndexes) {
      return;
    }

    drawLine(perfOutput,
      lines,
      updateLabelPosition,
      showLabelsX,
      showLabelsY,
      yScale,
      xScale,
      indexes,
      current,
      parametric,
      divStyle,
      ctx,
      line);
  });

  if (perfOutput) {
    // eslint-disable-next-line no-console, "DV6 TBC_CNES Perf logging"
    console.log(
      'axis pair',
      `{lines[0].xAxisId}-${lines[0].yAxisId}`,
      'Just drawed',
      lines.length,
      'lines, about',
      totalPoints,
      'total points'
    );
    // eslint-disable-next-line no-console, "DV6 TBC_CNES Perf logging"
    console.timeEnd();
  }
};

/**
 * Called for each line displayed on the plot.
 * This one is composed of multiple values that can be drawn through sub-lines or dots
 *
 * @param perfOutput
 * @param lines
 * @param updateLabelPosition
 * @param showLabelsX
 * @param showLabelsY
 * @param yScale
 * @param xScale
 * @param indexes
 * @param current
 * @param parametric
 * @param divStyle
 * @param ctx
 * @param line
 */
// eslint-disable-next-line complexity, "DV6 TBC_CNES Draw function, must not be split"
export const drawLine = (perfOutput,
                         lines,
                         updateLabelPosition,
                         showLabelsX,
                         showLabelsY,
                         yScale,
                         xScale,
                         indexes,
                         current,
                         parametric,
                         divStyle,
                         ctx,
                         line) => {
// Default values
  const { lineSize, pointSize, fontSize, pointOffset } = getDefaultValues(ctx, line);
  const fill = line.fill || '#222222';
  let lastColor;
  const lineIndexes = indexes[line.id];
  const lineData = line.data;

  ctx.lineWidth = lineSize;
  ctx.font = `${fontSize}px Arial`;

  // Do not draw
  if (!lineSize && (!pointSize || !line.pointStyle)) {
    updateLabelPosition(line.yAxisId, line.xAxisId, line.id, null);
    return;
  }

  // =============== DRAWING
  ctx.beginPath();
  currentY = yScale(line.yAccessor
    ? line.yAccessor(lineData[lineIndexes[0]])
    : lineData[lineIndexes[0]].value)
  ;
  currentX = xScale(line.xAccessor
    ? line.xAccessor(lineData[lineIndexes[0]])
    : lineData[lineIndexes[0]].x)
  ;
  lastColor = lineData[lineIndexes[0]][line.colorAccessor];
  // Init ctx with the right color
  ctx.fillStyle = lastColor;
  ctx.strokeStyle = lastColor;

  ctx.moveTo(currentX, currentY); // required as beginPath set to {0,0}

  let currentX;
  let currentY;
  let nextX;
  let nextY;
  let stoppedCurrent;
  let stoppedPrevious = false;
  const shouldDrawPoint = pointOffset && ['Square', 'Dot', 'Triangle'].indexOf(line.pointStyle) !== -1;
  const shouldDrawSubLine = (i, stopCurrent, stopPrevious) =>
    lineSize && i > 0 && !stopCurrent && !stopPrevious;
  const drawPoint = drawPointType(line, pointOffset, pointSize, fontSize);

  const lineIndexesLength = lineIndexes.length;
  for (let i = 0; i < lineIndexesLength; i += 1) {
    const index = lineIndexes[i];
    const previousPacket = lineData[lineIndexes[i - 1]];
    const packet = lineData[index];
    const nextPacket = lineData[lineIndexes[i + 1]] || packet;

    if (!packet) {
      return;
    }
    stoppedCurrent = line.stopInstruction ? (line.stopInstruction(packet) || false) : false;
    currentY = yScale(line.yAccessor ? line.yAccessor(packet) : packet.value);
    currentX = xScale(line.xAccessor ? line.xAccessor(packet) : packet.x);
    nextY = yScale(line.yAccessor ? line.yAccessor(nextPacket) : nextPacket.value);
    nextX = xScale(line.xAccessor ? line.xAccessor(nextPacket) : nextPacket.x);

    const color = (line.colorAccessor && lineData[index][line.colorAccessor])
      ? lineData[index][line.colorAccessor]
      : fill // default color for curve tooltip
    ;
    // Current cursor drawing
    drawCurrentCursor(ctx,
      currentX,
      currentY,
      fontSize,
      fill,
      pointOffset,
      parametric,
      current,
      packet,
      previousPacket,
      nextPacket);

    if (lastColor !== color) {
      ctx.stroke(); // draw previous lines
      ctx.beginPath(); // draw previous lines
      ctx.fillStyle = color; // for dots
      ctx.strokeStyle = color; // for sub-lines
      ctx.moveTo(currentX, currentY); // required as beginPath set to {0,0}
      lastColor = color;
    }

    // should we draw the current point
    if (!stoppedCurrent && shouldDrawPoint) {
      drawPoint(ctx, currentX, currentY);
    }

    // should draw a subline between current data and next data
    if (shouldDrawSubLine(i, stoppedCurrent, stoppedPrevious)) {
      ctx.lineTo(nextX, nextY);
    } else {
      ctx.moveTo(nextX, nextY);
    }

    stoppedPrevious = stoppedCurrent;
  }

  ctx.stroke(); // final stroke to draw all remaining lines
  if (!showLabelsX && !showLabelsY) {
    return;
  }

  // Horizontal line
  const lastPacket = lineData[lineIndexes[lineIndexesLength - 1]];
  const lastXPosition = xScale(line.xAccessor ? line.xAccessor(lastPacket) : lastPacket.x);
  const lastYPosition = yScale(line.yAccessor ? line.yAccessor(lastPacket) : lastPacket.value);
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.setLineDash([6, 3]);
  ctx.moveTo(lastXPosition, lastYPosition);
  ctx.lineTo(
    0,
    lastYPosition
  );
  ctx.moveTo(lastXPosition, lastYPosition);
  ctx.lineTo(
    lastXPosition,
    divStyle.height
  );

  updateLabelPosition(
    line.xAxisId,
    line.yAxisId,
    line.id,
    {
      x: (lastXPosition < 0 || lastXPosition > divStyle.width) ? null : lastXPosition,
      y: (lastYPosition < 0 || lastYPosition > divStyle.height) ? null : lastYPosition,
    }
  );

  ctx.stroke();
};
/**
 * @param line
 * @param pointOffset
 * @param pointSize
 * @param fontSize
 * @returns {*}
 */
export const drawPointType = (line, pointOffset, pointSize, fontSize) => {
  let drawPoint;
  switch (line.pointStyle) {
    case 'Square':
      drawPoint = (c, x, y) => {
        c.fillRect(x - pointOffset, y - pointOffset, pointSize, pointSize);
      };
      break;
    case 'Dot':
      drawPoint = (c, x, y) => {
        c.fillText('•', x - pointOffset, y + (fontSize / 3));
      };
      break;
    case 'Triangle':
      drawPoint = (c, x, y) => {
        c.stroke();
        drawTriangle(c, x, y, pointOffset);
        c.beginPath();
        c.moveTo(x, y);
      };
      break;
    default:
      drawPoint = () => null;
      break;
  }

  return drawPoint;
};
/**
 * @param ctx
 * @param lastX
 * @param lastY
 * @param fontSize
 * @param lastColor
 * @param pointOffset
 * @param parametric
 * @param current
 * @param packet
 * @param previousPacket
 * @param nextPacket
 */
export const drawCurrentCursor = (ctx,
                                  lastX,
                                  lastY,
                                  fontSize,
                                  lastColor,
                                  pointOffset,
                                  parametric,
                                  current,
                                  packet,
                                  previousPacket,
                                  nextPacket
                                  ) => {
  if (
    parametric &&
    current &&
    previousPacket &&
    (
      // current is between two packets (past)
      // current is above the last known packet (often real time)
      (
        previousPacket.masterTime < current
        && packet.masterTime > current
      )
      // current is above the last known packet (often real time)
      || (!nextPacket && packet.masterTime < current)

    )
  ) {
    ctx.stroke();
    ctx.beginPath();
    ctx.font = `${fontSize * 2}px Arial`;
    ctx.fillStyle = '#1E2';
    ctx.strokeStyle = '#1E2';
    ctx.fillText('O', lastX - (pointOffset * 1.5), lastY + (fontSize / 1.5));
    ctx.stroke();
    ctx.beginPath();
    ctx.font = `${fontSize}px Arial`;
    ctx.strokeStyle = lastColor;
    ctx.fillStyle = lastColor;
    ctx.moveTo(lastX, lastY);
  }
};
