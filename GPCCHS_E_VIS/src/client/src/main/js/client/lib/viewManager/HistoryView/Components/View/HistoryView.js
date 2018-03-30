// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : prepare packet and history files
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// END-HISTORY
// ====================================================================

import React from 'react';
import PropTypes from 'prop-types';
// import classnames from 'classnames';
import _ from 'lodash/fp';
import withMouseWheelEvents from 'windowProcess/common/hoc/withMouseWheelEvents';
import withDimensions from 'windowProcess/common/hoc/withDimensions';
import withBatchedSetState from 'windowProcess/common/hoc/withBatchedSetState';
// import { HISTORYVIEW_SEPARATOR } from 'constants';

import HistoryTable from './HistoryTable/HistoryTable';

// import styles from './HistoryView.scss';

/*
const getDataByLine = (lineId, allData) => {
  const [ep, timestamp] = lineId.split(HISTORYVIEW_SEPARATOR);
  return allData[ep][timestamp];
};
*/

const THEAD_DEFAULT_HEIGHT = 33; // in pixel

const DATA = [
  {
    title: 'H1',
    cols: [
      {
        title: 'c11',
        sort: 'DESC',
      },
      {
        title: 'c12',
      },
    ],
    data: [
      [1.23456789, 2.123456789],
      [5.123456789, 6.123456789],
      [9.123456789, 10.123456789],
    ],
  },
  {
    title: 'H2',
    cols: [
      {
        title: 'c21',
      },
      {
        title: 'c22',
      },
    ],
    data: [
      [3.123456789, 4.123465798],
      [7.12456789, 8.123546789],
      [11.123456789, 12.123456789],
    ],
  },
  {
    title: 'H3',
    cols: [
      {
        title: 'c21',
      },
      {
        title: 'c22',
      },
    ],
    data: [
      [3.123456789, 4.123465798],
      [7.12456789, 8.123546789],
      [11.123456789, 12.123456789],
    ],
  },
  {
    title: 'H4',
    cols: [
      {
        title: 'c21',
      },
      {
        title: 'c22',
      },
    ],
    data: [
      [3.123456789, 4.123465798],
      [7.12456789, 8.123546789],
      [11.123456789, 12.123456789],
    ],
  },
  {
    title: 'H5',
    cols: [
      {
        title: 'c21',
      },
      {
        title: 'c22',
      },
    ],
    data: [
      [3.123456789, 4.123465798],
      [7.12456789, 8.123546789],
      [11.123456789, 12.123456789],
    ],
  },
];

const META = {
  currentIndex: 0,
};

/*
const Table = ({
                 lines, cols, position, displayedRows, rowHeight, current, data: allData,
               }) => (
  <table>
    <thead>
    <tr
      className={classnames({ [styles.prevCurrent]: current === position })}
    >
      {
        cols.map(col => (
          <th style={{ height: `${THEAD_DEFAULT_HEIGHT}px` }} key={col}>
            {col}
          </th>
        ))
      }
    </tr>
    </thead>
    <tbody>
    {
      _.slice(position, displayedRows + position)(lines).map((line, i) => {
        const data = getDataByLine(line, allData);
        const lineId = position + i;
        const isCurrent = current === lineId;
        const isPrevCurrent = current - 1 === lineId;
        const rowKey = data.epName + data.masterTime;
        return (
          <tr
            className={classnames({
              [styles.current]: isCurrent,
              [styles.prevCurrent]: isPrevCurrent,
            })}
            key={rowKey}
          >
            {
              cols.map(col => (
                <td
                  style={{ height: `${rowHeight}px` }}
                  key={col + rowKey}
                >
                  {data[col]}
                </td>
              ))
            }
          </tr>
        );
      })
    }
    </tbody>
  </table>
);

Table.propTypes = {
  position: PropTypes.number,
  current: PropTypes.shape({}),
  data: PropTypes.shape({}).isRequired,
  cols: PropTypes.arrayOf(PropTypes.string).isRequired,
  lines: PropTypes.arrayOf(PropTypes.string).isRequired,
  rowHeight: PropTypes.number.isRequired,
  displayedRows: PropTypes.number.isRequired,
};
Table.defaultProps = {
  current: {},
  position: 0,
};
*/


class HistoryView extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      current: PropTypes.shape({}),
      data: PropTypes.shape({}).isRequired,
      cols: PropTypes.arrayOf(PropTypes.string).isRequired,
      lines: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired,
    rowHeight: PropTypes.number,
  }

  static defaultProps = {
    rowHeight: THEAD_DEFAULT_HEIGHT, // in pixel
  }

  state = { position: 0 }

  componentWillReceiveProps(nextProps) {
    if (this.state.position >= this.getLastPosition(nextProps)) {
      this.setState(_.set('position', this.getLastPosition(nextProps)));
    }
  }

  onScrollUp = () => {
    if (this.state.position > 0) {
      this.setState(_.update('position', _.add(-1)));
    }
  }

  onScrollDown = () => {
    if (this.state.position < this.getLastPosition()) {
      this.setState(_.update('position', _.add(1)));
    }
  }

  getLastPosition = (props = this.props) => (
    Math.max(0, (props.data.lines.length - this.getNbElems(props)) + 1)
  )

  getNbElems = (props = this.props) => Math.floor(props.containerHeight / props.rowHeight)

  getScrollAreaHeight = () => this.props.containerHeight - (this.props.rowHeight * 2)

  getScrollBarPosition = () => (
    (this.state.position / this.getLastPosition()) * this.getScrollAreaHeight()
  )

  render() {
    /*
    const style = {
      height: this.props.containerHeight,
      width: this.props.containerWidth,
    };
    return (
      <div
        className={classnames('HistoryView', styles.container)}
        style={style}
      >
        <div style={{ top: `calc(${this.getScrollBarPosition()}px + 33px)` }} className={styles.scrollbar} />
        <Table
          scrollBarPosition={this.getScrollBarPosition()}
          rowHeight={this.props.rowHeight}
          position={this.state.position}
          displayedRows={this.getNbElems()}
          {...this.props.data}
        />
      </div>
    );
    */

    return <HistoryTable meta={META} data={DATA} />;
  }
}

export default _.compose(
  withDimensions({ elementResize: true }),
  withBatchedSetState({ delay: 60 }), // throttled every 60ms
  withMouseWheelEvents()
)(HistoryView);
