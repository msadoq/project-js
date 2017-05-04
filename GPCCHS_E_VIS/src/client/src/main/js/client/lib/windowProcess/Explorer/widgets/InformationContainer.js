import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getAll } from 'common/parameters';
import { getMasterSession } from './InformationSelectors';
import Information from './Information';

const mapStateToProps = createStructuredSelector({
  masterSession: getMasterSession,
  parameters: () => getAll(),
});

const InformationContainer = connect(mapStateToProps)(Information);

export default InformationContainer;
