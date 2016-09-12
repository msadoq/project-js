import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Window from './Window';

const WindowContainer = props => <Window {...props} />;

export default connect()(WindowContainer);
