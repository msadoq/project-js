import { FormGroup, FormControl, Row, Col, Button } from 'react-bootstrap';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _debounce from 'lodash/debounce';
import keyCodes from 'common/utils/keymap';

export default class SearchComponent extends Component {
  static propTypes = {
    pageId: PropTypes.string.isRequired,
    closeSearch: PropTypes.func.isRequired,
    searchInPage: PropTypes.func.isRequired,
    resetSearchInPage: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    searchCount: PropTypes.number,
    searching: PropTypes.string,
  };

  static defaultProps = {
    searchCount: null,
    searching: '',
  };

  constructor(props){
    super(props);
    this.handleEscape = this.handleEscape.bind(this);
  }

  state = {
    search: this.props.searching,
  };

  componentDidMount(){
    document.addEventListener('keydown', this.handleEscape, false);
  }
  componentWillUnmount(){
    document.removeEventListener('keydown', this.handleEscape, false);
  }

  getTitle() {
    const {
      title,
    } = this.props;
    return `Search in ${title}`;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      pageId,
      searchInPage,
      resetSearchInPage,
    } = this.props;
    if (this.state.search !== '' && this.state.search.length > 1) {
      searchInPage(pageId, this.state.search);
    } else {
      resetSearchInPage(pageId);
    }
  };

  handleEscape = (e) => {
    const {
      closeSearch,
    } = this.props;
    if (e.keyCode === keyCodes.escape) {
      closeSearch();
    }
  };

  debounceOnChange = _debounce(() => {
    const {
      pageId,
      searchInPage,
      resetSearchInPage,
    } = this.props;
    if (this.state.search !== '' && this.state.search.length > 1) {
      searchInPage(pageId, this.state.search);
    } else {
      resetSearchInPage(pageId);
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
          { this.getTitle() }
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
                    onKeyPress={this.handleKeyPress}
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
