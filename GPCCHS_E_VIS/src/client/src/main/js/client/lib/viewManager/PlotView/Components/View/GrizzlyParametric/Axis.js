import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import styles from './GrizzlyChart.css';
import { lineType, labelStyleType } from './types';

export default class Axis extends Component {
  static propTypes = {
    direction: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    lines: PropTypes.arrayOf(lineType.isRequired).isRequired,
    // showLabels: bool,
    label: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    xAxisHeight: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    showGrid: PropTypes.bool,
    chartWidth: PropTypes.number.isRequired,
    yAxisWidth: PropTypes.number.isRequired,
    labelStyle: PropTypes.shape(labelStyleType.isRequired),
    margin: PropTypes.number.isRequired,
    yAxesAt: PropTypes.string,
    xAxesAt: PropTypes.string,
    assignLabelEl: PropTypes.func.isRequired,
    assignEl: PropTypes.func.isRequired,
    memoizeAssignRef: PropTypes.func.isRequired,
    side: PropTypes.number.isRequired,
  };

  static defaultProps = {
    direction: 'horizontal',
    yAxesAt: 'left',
    xAxesAt: 'bottom',
    // showLabels: false,
    showGrid: true,
    labelStyle: {
      color: '#333333',
      bgColor: '#FFFFFF',
      align: 'center',
      font: 'Arial',
      italic: false,
      bold: false,
      underline: false,
      size: 11,
    },
  };

  render() {
    const {
      direction,
      lines,
      // showLabels,
      label,
      height,
      xAxisHeight,
      index,
      showGrid,
      chartWidth,
      yAxisWidth,
      labelStyle,
      margin,
      yAxesAt,
      xAxesAt,
      side,
      assignLabelEl,
      assignEl,
      memoizeAssignRef,
    } = this.props;

    const divStyle = {};
    const style = {};
    let divClassName;
    let axisClassName;
    let axisLabel;
    let lineLabel;
    if (direction === 'vertical') {
      const axisWidth = index === 0 && showGrid ? chartWidth + yAxisWidth : yAxisWidth;

      divStyle.height = height;
      divStyle.width = axisWidth;
      // divStyle.top = top;
      if (yAxesAt === 'left') {
        divStyle.left = margin;
      } else if (yAxesAt === 'right' && index === 0) {
        divStyle.left = 0;
      } else if (yAxesAt === 'right') {
        divStyle.right = margin;
      } else {
        divStyle.left = 0;
      }

      // vertical position
      style.width = axisWidth;
      style.height = height;

      divClassName = styles.yAxisDiv;
      axisLabel = styles.yAxisLabel;
      lineLabel = styles.yAxisLineLabel;
      axisClassName = styles.yAxis;
    } else {
      divStyle.height = index === 0 && showGrid ? height + xAxisHeight : xAxisHeight;
      divStyle.width = chartWidth;
      if (xAxesAt === 'top') {
        divStyle.top = margin;
      } else {
        divStyle.top = index === 0 ? 0 : height + margin;
      }

      if (yAxesAt === 'left') {
        divStyle.left = side;
      } else if (yAxesAt === 'right') {
        divStyle.right = side;
      } else {
        divStyle.left = 0;
      }

      // vertical position
      style.width = chartWidth;
      style.height = xAxisHeight;

      divClassName = styles.xAxisDiv;
      axisLabel = styles.xAxisLabel;
      lineLabel = styles.xAxisLineLabel;
      axisClassName = styles.xAxis;
    }
    return (
      <ErrorBoundary>
        <div
          style={divStyle}
          className={divClassName}
        >
          <span
            ref={assignLabelEl}
            className={classnames(
              'label',
              axisLabel,
              {
                [styles.labelUnderline]: labelStyle.underline,
                [styles.labelBold]: labelStyle.bold,
                [styles.labelItalic]: labelStyle.italic,
              }
            )}
          >
            { label }
          </span>
          {
            lines.map(line =>
              <span
                key={line.id}
                className={classnames(
                  'label',
                  line.highlighted ? styles.highlighted : '',
                  lineLabel,
                  { hidden: _.isEmpty(line.data) || !line.displayLine }
                )}
                ref={memoizeAssignRef(line.id)}
              >
                {line.id} ({line.unit})
              </span>
            )
          }
          <svg
            style={style}
            ref={assignEl}
            className={axisClassName}
          />
        </div>
      </ErrorBoundary>
    );
  }
}
