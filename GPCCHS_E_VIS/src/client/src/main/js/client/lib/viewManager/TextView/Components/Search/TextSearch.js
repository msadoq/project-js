import { FormGroup, FormControl, Row, Col, Button } from 'react-bootstrap';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _debounce from 'lodash/debounce';

export default class Search extends Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    closeSearch: PropTypes.func.isRequired,
    searchInView: PropTypes.func.isRequired,
    resetSearchInView: PropTypes.func.isRequired,
    searchCount: PropTypes.number,
    searching: PropTypes.string,
  };

  static defaultProps = {
    searchCount: null,
    searching: '',
  };

  state = {
    search: this.props.searching,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      viewId,
      searchInView,
      resetSearchInView,
    } = this.props;
    if (this.state.search !== '') {
      searchInView(viewId, this.state.search);
    } else {
      resetSearchInView(viewId);
    }
  };

  debounceOnChange = _debounce(() => {
    const {
      viewId,
      searchInView,
      resetSearchInView,
    } = this.props;
    if (this.state.search !== '' && this.state.search.length > 1) {
      searchInView(viewId, this.state.search);
    } else {
      resetSearchInView(viewId);
    }
  }, 500);

  newSearch = (e) => {
    e.persist();
    const search = e.target.value;
    this.setState({ search });
    this.debounceOnChange(e);
  };

  render() {
    const {
      closeSearch,
      searchCount,
    } = this.props;

    return (
      <div>
        <h4
          className="text-center mb10"
        >
          Search in Text View
        </h4>
        {
          this.state.search !== '' && searchCount !== 0 && searchCount !== null &&
          <Row>
            <Col xs={10} xsOffset={1}>
              <p className="searchMatches">{searchCount} occurrences found</p>
            </Col>
          </Row>
        }
        <div>
          <form onSubmit={this.handleSubmit}>
            <Row>
              <Col xs={10} xsOffset={1}>
                <FormGroup controlId="searchText">
                  <FormControl
                    className="col-xs-10"
                    type="text"
                    placeholder="Enter research text"
                    value={this.state.search}
                    onChange={this.newSearch}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={4} xsOffset={1}>
                <Button
                  onClick={() => closeSearch()}
                  className="center mt20"
                >
                  Cancel
                </Button>
              </Col>
              <Col xs={4} xsOffset={3}>
                <Button
                  onClick={this.handleSubmit}
                  className="center mt20"
                >
                  Search
                </Button>
              </Col>
            </Row>
          </form>
        </div>
      </div>
    );
  }
}
