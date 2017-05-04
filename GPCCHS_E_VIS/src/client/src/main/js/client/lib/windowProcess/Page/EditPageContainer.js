import { PropTypes } from 'react';
import { connect } from 'react-redux';

import { getPage, getPages } from '../../store/reducers/pages';
import { updateTitle } from '../../store/actions/pages';

import EditPageWrapper from './EditPageWrapper';

const mapStateToProps = (state, { pageUuid }) => {
  const page = getPage(state, { pageId: pageUuid });
  return {
    page,
    pages: getPages(state),
  };
};

const mapDispatchToProps = { updateTitle };

const EditPageContainer = connect(mapStateToProps, mapDispatchToProps)(EditPageWrapper);

EditPageContainer.propTypes = {
  pageId: PropTypes.string,
};

export default EditPageContainer;
