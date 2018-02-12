import { connect } from 'react-redux';
import { toggle } from 'store/actions/timebars';
import _ from 'lodash';
import SaveVisualizationToggle from './SaveVisualizationToggle';

const mapStateToProps = (state, ownProps) => ({
  isActive: _.get(state, ['timebars', ownProps.timebarUuid, 'visuWindow', 'saved'], false),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleClick: () => dispatch(toggle(ownProps.timebarUuid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SaveVisualizationToggle);
