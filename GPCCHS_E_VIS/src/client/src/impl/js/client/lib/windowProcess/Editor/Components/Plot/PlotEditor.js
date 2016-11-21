import React, { Component, PropTypes } from 'react';
import _get from 'lodash/get';
import Navbar from '../Navbar/Navbar';
import { PlotTab } from './';
import { Misc } from '../Misc';
import EntryPointTree from '../EntryPoint/EntryPointTree';
import EntryPointActions from '../EntryPoint/EntryPointActions';
import styles from '../../Editor.css';

const newEntryPoint = {
  name: 'NewEntryPoint',
  connectedDataX: {
    formula: '',
    unit: 'ms',
    digits: 5,
    format: 'decimal',
    domain: '',
    timeline: 'Session 1',
    axisId: 'time'
  },
  connectedDataY: {
    formula: '',
    unit: 'ms',
    digits: 5,
    format: 'decimal',
    domain: '',
    timeline: 'Session 1',
    axisId: 'time'
  },
  lineStyle: 'Continuous',
  pointsStyle: 'None',
  curveColour: '#222222',
  stateColours: [

  ]
};
/*
  Composant racine de l'éditeur Plot.
*/
export default class Editor extends Component {
  static propTypes = {
    // actions
    updateEntryPoint: PropTypes.func.isRequired,
    addEntryPoint: PropTypes.func.isRequired,
    removeEntryPoint: PropTypes.func.isRequired,
    updateGrid: PropTypes.func.isRequired,
    updateTitle: PropTypes.func.isRequired,
    updateTitleStyle: PropTypes.func.isRequired,
    addAxis: PropTypes.func.isRequired,
    removeAxis: PropTypes.func.isRequired,
    updateAxis: PropTypes.func.isRequired,
    updateMarker: PropTypes.func.isRequired,

    // rest
    viewId: PropTypes.string.isRequired,
    closeEditor: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    configuration: PropTypes.shape({
      type: PropTypes.string.isRequired,
      links: PropTypes.array,
      procedures: PropTypes.array,
      defaultRatio: PropTypes.shape({
        length: PropTypes.number,
        width: PropTypes.number
      }),
      entryPoints: PropTypes.array,
      axes: PropTypes.array,
      grids: PropTypes.array,
      title: PropTypes.string,
      titleStyle: PropTypes.shape({
        font: PropTypes.string,
        size: PropTypes.number,
        bold: PropTypes.boolean,
        italic: PropTypes.boolean,
        underline: PropTypes.boolean,
        strikeOut: PropTypes.boolean,
        align: PropTypes.string,
        color: PropTypes.string
      }),
      plotBackgroundColour: PropTypes.string,
      legend: PropTypes.object,
      markers: PropTypes.array,
    })
  }

  componentWillMount() {
    console.log('componentWillMount', this.props);
    this.setState({
      currentDisplay: 0,
      search: ''
    });
  }
  handleEntryPoint = (key, label, newVal) => {
    const { configuration, updateEntryPoint, viewId } = this.props;
    const currentEntryPoint = _get(configuration, `entryPoints[${key}]`);
    updateEntryPoint(viewId, key, {
      ...currentEntryPoint,
      [label]: newVal
    });
  }
  handleAddEntryPoint = () => {
    const { addEntryPoint, viewId } = this.props;
    addEntryPoint(viewId, { ...newEntryPoint });
  }
  removeEntryPoint = (key) => {
    const { removeEntryPoint, viewId } = this.props;
    removeEntryPoint(viewId, key);
  }
  handleGrids = (key, label, newVal) => {
    const { configuration, updateGrid, viewId } = this.props;
    const currentGrid = _get(configuration, `grids[${key}]`);
    updateGrid(viewId, key, {
      ...currentGrid,
      [label]: newVal
    });
  }
  handlePlotTitle = (newVal) => {
    const { updateTitle, viewId } = this.props;
    updateTitle(viewId, newVal);
  }
  handlePlotTitleStyle = (label, newVal) => {
    const { configuration, updateTitleStyle, viewId } = this.props;
    updateTitleStyle(viewId, {
      ...configuration.titleStyle,
      [label]: newVal
    });
  }
  handlePlotMarkers = (key, label, newVal) => {
    const { configuration, updateMarker, viewId } = this.props;
    const currentMarker = _get(configuration, `markers[${key}]`);
    updateMarker(viewId, key, {
      ...currentMarker,
      [label]: newVal
    });
  }
  handleAddAxis = () => {
    const { configuration, addAxis, viewId } = this.props;
    const currentLength = _get(configuration, 'axes.length', 0);
    addAxis(viewId, {
      label: `Axis ${currentLength}`
    });
  }
  handleRemovePlotAxis = (key) => {
    const { removeAxis, viewId } = this.props;
    removeAxis(viewId, key);
  }
  handleAxes = (key, label, newVal) => {
    const { configuration, updateAxis, viewId } = this.props;
    const currentAxis = _get(configuration, `axes[${key}]`);
    updateAxis(viewId, key, {
      ...currentAxis,
      [label]: newVal
    });
  }

  changeSearch = s => this.setState({ search: s });
  /*
    Appelée lorsque le un item de la navbar est cliqué.
    param id :
      0 : EntryPoints
      1 : PlotTab
      2 : Misc
  */
  changeCurrentDisplay = id => this.setState({ currentDisplay: id });

  render() {
    const { currentDisplay, search } = this.state;
    const {
      configuration: {
        entryPoints,
        axes,
        grids,
        title,
        titleStyle,
        // plotBackGround,
        // legend,
        markers
      }
    } = this.props;
    return (
      <div className={styles.editor}>
        <Navbar
          currentDisplay={currentDisplay}
          items={['Entry Points', 'Plot', 'Miscs']}
          changeCurrentDisplay={this.changeCurrentDisplay}
          closeEditor={this.props.closeEditor}
        />
        <div className={styles.content}>
          {currentDisplay === 2 && <Misc />}
          {currentDisplay === 1 && <PlotTab
            handleGrids={this.handleGrids}
            handlePlotTitle={this.handlePlotTitle}
            handlePlotTitleStyle={this.handlePlotTitleStyle}
            handleAddPlotAxis={this.handleAddAxis}
            handleRemovePlotAxis={this.handleRemovePlotAxis}
            handlePlotAxes={this.handleAxes}
            handlePlotMarkers={this.handlePlotMarkers}
            axes={axes}
            markers={markers}
            title={title}
            grids={grids}
            titleStyle={titleStyle}
          />}
          {currentDisplay === 0 && <div>
            <EntryPointActions
              changeSearch={this.changeSearch}
              addEntryPoint={this.handleAddEntryPoint}
            />
            <EntryPointTree
              entryPoints={entryPoints}
              search={search}
              handleEntryPoint={this.handleEntryPoint}
              remove={this.removeEntryPoint}
            />
          </div>}
        </div>
      </div>
    );
  }
}
