import { connect } from 'react-redux';
import ApplicationProcessField from './ApplicationProcessField';

const mapStateToProps = () => ({
  applicationProcesses: [{
    name: 'ORBIT',
  }, {
    name: 'WHATEVER',
  }], // @todo fetch from ???
});

const ApplicationProcessFieldContainer = connect(mapStateToProps, {})(ApplicationProcessField);

export default ApplicationProcessFieldContainer;
