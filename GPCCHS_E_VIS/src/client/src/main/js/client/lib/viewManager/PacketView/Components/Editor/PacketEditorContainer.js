import { connect } from 'react-redux';
import PacketEditor from './PacketEditor';

const PacketViewContainer = connect()(PacketEditor);

export default PacketViewContainer;
