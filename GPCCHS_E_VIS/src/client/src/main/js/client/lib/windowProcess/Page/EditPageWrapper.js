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
          domainName: page.domainName || '',
          sessionName: page.sessionName || '',
        }}
        domains={domains}
        sessions={sessions}
      />
    );
  }
}
