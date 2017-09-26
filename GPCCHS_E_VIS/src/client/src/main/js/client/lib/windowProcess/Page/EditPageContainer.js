// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 19/04/2017 : Page title edition using contextMenu and GenericModal.
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add possibility to modify domainName and sessionName from GUI for view, page, window and workspace
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add possibility to modify domainName and sessionName from GUI for view, page, window and workspace
// END-HISTORY
// ====================================================================

import { PropTypes } from 'react';
import { connect } from 'react-redux';

import { getPage, getPages } from '../../store/reducers/pages';
import { updateTitle, updateDomainName, updateSessionName } from '../../store/actions/pages';
import { getDomains } from '../../store/reducers/domains';
import { getSessions } from '../../store/reducers/sessions';

import EditPageWrapper from './EditPageWrapper';

const mapStateToProps = (state, { pageUuid }) => {
  const page = getPage(state, { pageId: pageUuid });
  return {
    page,
    pages: getPages(state),
    domains: getDomains(state),
    sessions: getSessions(state),
  };
};

const mapDispatchToProps = { updateTitle, updateDomainName, updateSessionName };

const EditPageContainer = connect(mapStateToProps, mapDispatchToProps)(EditPageWrapper);

EditPageContainer.propTypes = {
  pageId: PropTypes.string,
};

export default EditPageContainer;
