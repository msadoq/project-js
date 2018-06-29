import React from 'react';
import PropTypes from 'prop-types';

// import classnames from 'classnames';


class CatalogItemMetadata extends React.Component {

  state = {};

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitForm = () => {
    const { submit } = this.props;
    submit();
  };

  render() {
    return (
      <form>
        <input name="catalog" value={this.state.catalog} onChange={this.handleChange} />
        <input name="catalogItem" value={this.state.catalogItem} onChange={this.handleChange} />
        <button onClick={this.submitForm}>fetch metadata</button>
      </form>
    );
  }
}

CatalogItemMetadata.propTypes = {
  submit: PropTypes.func.isRequired,
};

CatalogItemMetadata.defaultProps = {};

export default CatalogItemMetadata;
