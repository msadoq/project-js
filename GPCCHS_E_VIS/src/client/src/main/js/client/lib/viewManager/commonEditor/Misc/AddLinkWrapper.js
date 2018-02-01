// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add Misc/links in view editor
// VERSION : 1.1.2 : DM : #6785 : 13/06/2017 : Fix path writing after choice
// END-HISTORY
// ====================================================================

import React, { PropTypes, Component } from 'react';
import { v4 } from 'uuid';
import AddLink from './AddLink';

const initialValues = { name: '', path: '' };

export default class AddLinkWrapper extends Component {

  static propTypes = {
    viewId: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    addLink: PropTypes.func.isRequired,
  };

  willAddLink = (values) => {
    const {
      addLink,
      closeModal,
      viewId,
    } = this.props;
    addLink(viewId, values);
    closeModal();
  }

  render() {
    if (!this.myFormKey) {
      this.myFormKey = v4();
    }
    return (
      <AddLink
        onSubmit={this.willAddLink}
        form="new-link-form"
        initialValues={initialValues}
        myFormKey={this.myFormKey}
      />
    );
  }
}
