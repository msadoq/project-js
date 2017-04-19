import React, { PureComponent, PropTypes } from 'react';
import EditPage from './EditPage';

export default class EditPageWrapper extends PureComponent {
  static propTypes = {
    page: PropTypes.shape().isRequired,
    pages: PropTypes.shape().isRequired,
    updateTitle: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
  }

  willEditPage = (values) => {
    const {
      page,
      updateTitle,
      closeModal,
    } = this.props;
    updateTitle(
      page.uuid,
      values.title
    );
    closeModal();
  }

  render() {
    const {
      page,
      pages,
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
        }}
      />
    );
  }
}
