import React, { Component, PropTypes } from 'react';
import _get from 'lodash/get';
import Navbar from '../Navbar';
import { PlotTab } from './';
import Misc from '../Misc';
import EntryPointTree from '../EntryPointTree';
import EntryPointActions from '../EntryPointActions';
import styles from '../../Editor.css';
import debug from '../../../../common/debug/windowDebug';

const logger = debug('Editor:Plot');

const newEntryPoint = {
  name: 'NewEntryPoint',
  connectedDataX: {
    fullName: '',
    unit: 'ms',
    digits: 5,
    format: 'decimal',
    domain: '',
    session: 'Session 1',
    axisId: 'time'
  },
  connectedDataY: {
    fullName: '',
    unit: 'ms',
    digits: 5,
    format: 'decimal',
    domain: '',
    session: 'Session 1',
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

    // rest
    viewId: PropTypes.string.isRequired,
    closeEditor: PropTypes.func.isRequired,
    configuration: PropTypes.shape({
      type: PropTypes.string,
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
  addEntryPoint = () => {
    const { addEntryPoint, viewId } = this.props;
    addEntryPoint(viewId, { ...newEntryPoint });
  }
  removeEntryPoint = (key) => {
    const { removeEntryPoint, viewId } = this.props;
    removeEntryPoint(viewId, key);
  }
  handleGrid = (label, newVal) => {
    logger.debug('Grid onChange', label, newVal);
  }
  handlePlotTitle = (newVal) => {
    const currentValue = this.props.configuration.title;
    logger.debug('Title onChange', `${currentValue} => ${newVal}`);
  }
  handlePlotTitleStyle = (label, newVal) => {
    const currentValue = this.props.configuration.titleStyle;
    logger.debug('TitleStyle onChange', currentValue, newVal);
  }
  handlePlotMarkers = (key, label, newVal) => {
    const path = `markers[${key}][${label}]`;
    const currentValue = _get(this.props.configuration, path);
    logger.debug('Markers onChange', key, label, `${currentValue} => ${newVal}`);
  }
  handleAxes = (key, label, newVal) => {
    const path = `axes[${key}][${label}]`;
    const currentValue = _get(this.props.configuration, path);
    logger.debug('Axes onChange', key, label, `${currentValue} => ${newVal}`);
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
        {currentDisplay === 2 && <Misc />}
        {currentDisplay === 1 && <PlotTab
          handleGrid={this.handleGrid}
          handlePlotTitle={this.handlePlotTitle}
          handlePlotTitleStyle={this.handlePlotTitleStyle}
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
            addEntryPoint={this.addEntryPoint}
          />
          <EntryPointTree
            entryPoints={entryPoints}
            search={search}
            handleEntryPoint={this.handleEntryPoint}
            remove={this.removeEntryPoint}
          />
        </div>}
      </div>
    );
  }
}
