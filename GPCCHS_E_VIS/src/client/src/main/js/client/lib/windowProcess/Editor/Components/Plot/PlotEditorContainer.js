import { PropTypes } from 'react';
import { connect } from 'react-redux';
import PlotEditor from './PlotEditor';
import {
  addEntryPoint,
  removeEntryPoint,
} from '../../../../store/actions/views';

const PlotEditorContainer = connect(
  null,
  {
    addEntryPoint,
    removeEntryPoint,
  }
)(PlotEditor);

PlotEditorContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
  viewType: PropTypes.string.isRequired,
  configuration: PropTypes.shape({
    type: PropTypes.string.isRequired,
    links: PropTypes.array,
    procedures: PropTypes.array,
    defaultRatio: PropTypes.shape({
      length: PropTypes.number,
      width: PropTypes.number,
    }),
    entryPoints: PropTypes.array,
    axes: PropTypes.object,
    grids: PropTypes.array,
    title: PropTypes.string,
    titleStyle: PropTypes.shape({
      font: PropTypes.string,
      size: PropTypes.number,
      bold: PropTypes.bool,
      italic: PropTypes.bool,
      underline: PropTypes.bool,
      strikeOut: PropTypes.bool,
      align: PropTypes.string,
      color: PropTypes.string,
    }),
    backgroundColor: PropTypes.string,
    legend: PropTypes.object,
    markers: PropTypes.array,
  }).isRequired,
  closeEditor: PropTypes.func,
};

export default PlotEditorContainer;
