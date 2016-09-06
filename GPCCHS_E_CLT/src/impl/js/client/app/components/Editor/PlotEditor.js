import React, { Component, PropTypes } from 'react';
import Navbar from './Navbar';
import PlotTab from './PlotTab';
import Misc from './Misc';
import EntryPointTree from './EntryPointTree';
import EntryPointActions from './EntryPointActions';
import styles from '../Editor.css';

/*
  Composant racine de l'éditeur Plot.
*/
export default class Editor extends Component {
  static propTypes = {
    closeEditor: PropTypes.func.isRequired,
    configuration: PropTypes.any,
  }
  constructor(...args) {
    super(...args);
    this.state = {
      currentDisplay: 0,
      search: '',
      entryPoints: this.props.configuration.attributes.plotViewEntryPoints,
      axes: this.props.configuration.attributes.axes,
      grid: this.props.configuration.attributes.grid,
      title: this.props.configuration.attributes.title,
      titleStyle: this.props.configuration.attributes.titleStyle,
      plotBackGround: this.props.configuration.attributes.plotBackgroundColour,
      legend: this.props.configuration.attributes.legend,
      markers: this.props.configuration.attributes.markers
    };
    this.changeCurrentDisplay = this.changeCurrentDisplay.bind(this);
    this.changeSearch = this.changeSearch.bind(this);
    this.handleEntryPoint = this.handleEntryPoint.bind(this);
    this.handlePlotTitle = this.handlePlotTitle.bind(this);
    this.handlePlotTitleStyle = this.handlePlotTitleStyle.bind(this);
    this.handleGrid = this.handleGrid.bind(this);
    this.removeEntryPoint = this.removeEntryPoint.bind(this);
    this.addEntryPoint = this.addEntryPoint.bind(this);
    this.handleAxes = this.handleAxes.bind(this);
  }
  handleEntryPoint(key, label, newVal) {
    let val = newVal;
    const labels = label.split('.');

    if (labels[0] === 'connectedDataY') {
      let tmp = this.state.entryPoints[key].connectedDataY;
      tmp = Object.assign({}, tmp, {
        [labels[1]]: newVal,
      });
      val = tmp;
    }
    
    if (label === 'stateColour') {
      const tmp = this.state.entryPoints[key].stateColours;
      if (newVal.keyToRemove !== undefined) {
        tmp.splice(newVal.keyToRemove, 1);
      } else {
        tmp.push({ colour: newVal.color, condition: newVal.filter });
      }
      val = tmp;
    }

    const newState = this.state.entryPoints;
    newState[key] = Object.assign({}, newState[key], {
      [labels[0]]: val,
    });

    this.setState({
      entryPoints: newState,
    });
  }
  addEntryPoint() {
    const newEntryPoint = {
      "name":"NewEntryPoint",
      "connectedDataX":{
          "fullName":"",
          "unit":"ms",
          "digits":5,
          "format":"decimal",
          "domain":"",
          "session":"Session 1",
          "axisId":"time"
      },
      "connectedDataY":{
          "fullName":"",
          "unit":"ms",
          "digits":5,
          "format":"decimal",
          "domain":"",
          "session":"Session 1",
          "axisId":"time"
      },
      "lineStyle":"Continuous",
      "pointsStyle":"None",
      "curveColour":"#222222",
      "stateColours":[

      ]
    };
    const newState = this.state.entryPoints;
    newState.push(newEntryPoint);
    this.setState({
      entryPoints: newState,
    });
  }
  removeEntryPoint(key) {
    const newState = this.state.entryPoints;
    delete newState[key];
    this.setState({
      entryPoints: newState,
    });
  }
  handleGrid(label, newVal) {
    let newState = this.state.grid;
    newState = Object.assign({}, newState, {
      [label]: newVal,
    });

    this.setState({
      grid: newState,
    });
    console.log(`${label} : ${newVal}`);
  }
  handlePlotTitle(val) {
    this.setState({ title: val });
    console.log(`title : ${val}`);
  }
  handlePlotTitleStyle(label, newVal) {
    let newState = this.state.titleStyle;
    newState = Object.assign({}, newState, {
      [label]: newVal,
    });

    this.setState({
      titleStyle: newState,
    });
    console.log(`${label} : ${newVal}`);
  }
  handleAxes(key, label, newVal) {
    let val = newVal;
    const labels = label.split('.');

    if (labels[0] === 'style') {
      let tmp = this.state.axes[key].style;
      tmp = Object.assign({}, tmp, {
        [labels[1]]: newVal,
      });
      val = tmp;
    }

    const newState = this.state.axes;
    newState[key] = Object.assign({}, newState[key], {
      [labels[0]]: val,
    });

    this.setState({
      axes: newState,
    });
    console.log(`${label} : ${newVal}`);
  }
  /*
    Applée lorsque le formulaire de filtre des entrypoints est mis à jour.
  */
  changeSearch(s) {
    this.setState({ search: s });
  }
  /*
    Applée lorsque le un item de la navbar est cliqué.
    param id :
      0 : EntryPoints
      1 : PlotTab
      2 : Misc
  */
  changeCurrentDisplay(id) {
    this.setState({ currentDisplay: id });
  }
  render() {
    return (
      <div className={styles.editor}>
        <Navbar
          currentDisplay={this.state.currentDisplay}
          items={['Entry Points', 'Plot', 'Miscs']}
          changeCurrentDisplay={this.changeCurrentDisplay}
          closeEditor={this.props.closeEditor}
        />
        {
          (this.state.currentDisplay === 2) ?
            <Misc /> :
            null
        }
        {
          (this.state.currentDisplay === 1) ?
            <PlotTab
              handleGrid={this.handleGrid}
              handlePlotTitle={this.handlePlotTitle}
              handlePlotTitleStyle={this.handlePlotTitleStyle}
              handlePlotAxes={this.handleAxes}
              axes={this.props.configuration.attributes.axes}
              title={this.state.title}
              grid={this.state.grid}
              titleStyle={this.state.titleStyle}
            /> :
            null
        }
        {
          (this.state.currentDisplay === 0) ?
            <div>
              <EntryPointActions
                changeSearch={this.changeSearch}
                addEntryPoint={this.addEntryPoint}
              />
              <EntryPointTree
                entryPoints={this.state.entryPoints}
                search={this.state.search}
                handleEntryPoint={this.handleEntryPoint}
                remove={this.removeEntryPoint}
              />
            </div>
           :
            null
        }
      </div>
    );
  }
}
