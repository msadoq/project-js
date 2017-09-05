import { PropTypes } from 'react';
import _ from 'lodash/fp';
import { v4 } from 'uuid';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import HistoryView from './HistoryView';

const createLines = _.times(n => ({
  name: v4() + '-' + v4() + '-' + v4() + '-' + v4(),
  value: n + 1,
  timestamp: (n + 1) * 1000,
  a: !n ? _.times(_.always('z'), 1000) : 'aaaaaaaaaaaaaaaaaaaa',
  b: 'bbbbbbbbbbbbbbbbbbbb',
  c: 'cccccccccccccccccccc',
}));

const lines = createLines(100);

const mapStateToProps = createStructuredSelector({
  data: () => ({
    cols: ['timestamp', 'name', 'value', 'a', 'b', 'c'],
    lines,
  }),
});

const HistoryViewContainer = connect(mapStateToProps)(HistoryView);

HistoryViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default HistoryViewContainer;
