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
 * @returns {{fill: string, lineSize: number, pointSize: number, fontSize: number}}
 */
export function getDefaultValues(ctx, line) {
  // Default values
  const fill = line.fill || '#222222';
  const lineSize = typeof line.lineSize !== 'number' ? 1 : line.lineSize;
  const pointSize = typeof line.pointSize !== 'number' ? 0 : line.pointSize;

  ctx.strokeStyle = fill;
  ctx.fillStyle = fill;
  ctx.lineWidth = lineSize;

  // Only used for Dot points
  const fontSize = pointSize * 3;
  ctx.font = `${fontSize}px Arial`;

  if (line.lineStyle === 'Dashed') {
    ctx.setLineDash([6, 2]);
  } else if (line.lineStyle === 'Dotted') {
    ctx.setLineDash([3, 3]);
  } else {
    ctx.setLineDash([2, 0]);
  }

  return { fill, lineSize, pointSize, fontSize };
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
  data,
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

  // eslint-disable-next-line complexity, "DV6 TBC_CNES Draw function, must not be split"
  lines.forEach((line) => {
    const lineIndexes = indexes[line.id];
    const lineData = data[line.id];
    if (perfOutput) totalPoints += lineIndexes.length;
    if (!lineData || !lineIndexes) {
      // console.log(`No data for line ${line.id}`);
      return;
    }

    // Default values
    const { fill, lineSize, pointSize, fontSize } = getDefaultValues(ctx, line);

    // Do not draw
    if (!lineSize && (!pointSize || !line.pointStyle)) {
      updateLabelPosition(line.yAxisId, line.xAxisId, line.id, null);
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
    const lineIndexesLength = lineIndexes.length;
    for (let i = 0; i < lineIndexesLength; i += 1) {
      const index = lineIndexes[i];
      const packet = lineData[index];
      const previousPacket = lineData[lineIndexes[i - 1]];
      const nextPacket = lineData[lineIndexes[i + 1]];
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

      // Current cursor drawing
      drawCurrentCursor(ctx,
        parametric,
        current,
        previousPacket,
        nextPacket,
        packet,
        lastX,
        lastY,
        fontSize,
        lastColor,
        pointOffset);

      lastY = yScale(y);
      lastX = xScale(x);

      // Draw line
      if (lineSize > 0) {
        ctx.lineTo(lastX, lastY);
      }

      // Draw point
      // Point (only if size > 0 AND style not null
      if (line.pointStyle && pointSize) {
        pointOffset = pointSize / 2;
      }

      if (pointOffset && line.pointStyle === 'Square') {
        ctx.fillRect(lastX - pointOffset, lastY - pointOffset, pointSize, pointSize);
      } else if (pointOffset && line.pointStyle === 'Dot') {
        ctx.fillText('•', lastX - pointOffset, lastY + (fontSize / 3));
      } else if (pointOffset && line.pointStyle === 'Triangle') {
        ctx.stroke();
        drawTriangle(ctx, lastX, lastY, pointOffset);
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
      }
    }

    ctx.stroke();
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
 * @param ctx
 * @param parametric
 * @param current
 * @param previousPacket
 * @param nextPacket
 * @param packet
 * @param lastX
 * @param lastY
 * @param fontSize
 * @param lastColor
 * @param pointOffset
 */
export const drawCurrentCursor = (ctx,
                     parametric,
                     current,
                     previousPacket,
                     nextPacket,
                     packet,
                     lastX,
                     lastY,
                     fontSize,
                     lastColor,
                     pointOffset) => {
  if (
    parametric &&
    current &&
    previousPacket &&
    (
      // current is between two packets (past)
      (previousPacket.masterTime < current && packet.masterTime > current) ||
      // current is above the last known packet (often real time)
      (!nextPacket && packet.masterTime < current)
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
