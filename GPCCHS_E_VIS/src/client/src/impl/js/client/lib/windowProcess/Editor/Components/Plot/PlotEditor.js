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
    timeline: '',
    axisId: 'time'
  },
  connectedDataY: {
    formula: '',
    unit: 'ms',
    digits: 5,
    format: 'decimal',
    domain: '',
    timeline: '',
    axisId: 'time'
  },
  objectStyle: {
    line: {
      style: 'Continuous',
      size: 3,
    },
    points: {
      style: 'None',
      size: 3,
    },
    curveColor: '#222222',
  },
  stateColors: [

  ]
};
/*
  Composant racine de l'éditeur Plot.
*/
export default class PlotEditor extends Component {
  static propTypes = {
    // actions
    updateEntryPoint: PropTypes.func.isRequired,
    addEntryPoint: PropTypes.func.isRequired,
    removeEntryPoint: PropTypes.func.isRequired,

    // rest
    viewId: PropTypes.string.isRequired,
    closeEditor: PropTypes.func.isRequired,
    configuration: PropTypes.shape({
      type: PropTypes.string.isRequired,
      links: PropTypes.array,
      procedures: PropTypes.array,
      defaultRatio: PropTypes.shape({
        length: PropTypes.number,
        width: PropTypes.number
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
        color: PropTypes.string
      }),
      backgroundColor: PropTypes.string,
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
  handleAddEntryPoint = () => {
    const { addEntryPoint, viewId } = this.props;
    addEntryPoint(viewId, { ...newEntryPoint });
  }
  removeEntryPoint = (key) => {
    const { removeEntryPoint, viewId } = this.props;
    removeEntryPoint(viewId, key);
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
        markers
      }
    } = this.props;
    return (
      <div className={styles.contentWrapper}>
        <Navbar
          currentDisplay={currentDisplay}
          items={['Entry Points', 'Plot']}
          changeCurrentDisplay={this.changeCurrentDisplay}
          closeEditor={this.props.closeEditor}
        />
        <div className={styles.content}>
          {currentDisplay === 2 && <Misc />}
          {currentDisplay === 1 && <PlotTab
            axes={axes}
            markers={markers}
            title={title}
            grids={grids}
            titleStyle={titleStyle}
          />}
          {currentDisplay === 0 && [
            <EntryPointActions
              key="EntryPointActions"
              changeSearch={this.changeSearch}
              addEntryPoint={this.handleAddEntryPoint}
            />,
            <EntryPointTree
              key="EntryPointTree"
              entryPoints={entryPoints}
              search={search}
              handleEntryPoint={this.handleEntryPoint}
              remove={this.removeEntryPoint}
            />
          ]}
        </div>
      </div>
    );
  }
}
