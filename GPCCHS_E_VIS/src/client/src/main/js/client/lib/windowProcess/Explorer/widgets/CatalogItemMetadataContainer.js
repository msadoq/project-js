import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { askItemMetadata } from 'store/actions/catalogs';
import CatalogItemMetadata from './CatalogItemMetadata';

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = {
  submit: askItemMetadata,
};

export default connect(mapStateToProps, mapDispatchToProps)(CatalogItemMetadata);
