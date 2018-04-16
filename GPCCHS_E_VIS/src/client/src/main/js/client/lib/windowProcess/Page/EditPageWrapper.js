// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 19/04/2017 : Page title edition using contextMenu and
//  GenericModal.
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add possibility to modify domainName and sessionName
//  from GUI for view, page, window and workspace
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add possibility to modify domainName and sessionName
//  from GUI for view, page, window and workspace
// VERSION : 2.0.0 : FA : ISIS-FT-2248 : 18/10/2017 : Fallback/Wildcard for sessions and domains is
//  now functionnal. Plus fixed page and workspace modal editor for undefined values.
// VERSION : 2.0.0.1 : FA : #11627 : 13/04/2018 : deal with multidomain sat colors
// END-HISTORY
// ====================================================================

import React, { PureComponent, PropTypes } from 'react';
import EditPage from './EditPage';

export default class EditPageWrapper extends PureComponent {
  static propTypes = {
    page: PropTypes.shape().isRequired,
    pages: PropTypes.shape().isRequired,
    updateTitle: PropTypes.func.isRequired,
    updateDomainName: PropTypes.func.isRequired,
    updateSessionName: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    domains: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    sessions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  }

  willEditPage = (values) => {
    const {
      page,
      updateTitle,
      updateDomainName,
      updateSessionName,
      closeModal,
    } = this.props;

    updateTitle(page.uuid, values.title);
    if (values.domainName !== page.domainName) {
      updateDomainName(page.uuid, values.domainName);
    }
    if (values.sessionName !== page.sessionName) {
      updateSessionName(page.uuid, values.sessionName);
    }
    closeModal();
  }

  render() {
    const {
      page,
      pages,
      domains,
      sessions,
    } = this.props;

    return (
      <EditPage
        form={`edit-page-title-${page.uuid}`}
        onSubmit={this.willEditPage}
        uuid={page.uuid}
        pages={pages}
        // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop, "DV6 TBC_CNES ReduxForm"
        initialValues={{
          title: page.title,
          domainName: page.domainName || '*',
          sessionName: page.sessionName || '*',
        }}
        domains={domains}
        sessions={sessions}
      />
    );
  }
}
