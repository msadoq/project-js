import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SaveAgentModal from './SaveAgentModal';
import { getPagesWithViews } from '../../store/selectors/pages';
import { askSaveView } from '../../store/actions/views';
import { askSavePage } from '../../store/actions/pages';

const mapStateToProps = createStructuredSelector({
  pages: getPagesWithViews,
});

const mapDispatchToProps = {
  askSavePage,
  askSaveView,
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveAgentModal);
