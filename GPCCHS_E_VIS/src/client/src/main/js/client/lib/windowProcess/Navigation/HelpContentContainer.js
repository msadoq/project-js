import { connect } from 'react-redux';
import { openWikiHelper } from '../../store/actions/ui';

import HelpContent from './HelpContent';

const mapDispatchToProps = {
  openWikiHelper,
};

export default connect(null, mapDispatchToProps)(HelpContent);
