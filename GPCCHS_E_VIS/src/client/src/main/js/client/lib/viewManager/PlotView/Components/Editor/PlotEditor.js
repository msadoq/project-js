import React, { Component, PropTypes } from 'react';
import Navbar from '../../../commonEditor/Navbar/Navbar';
import PlotTab from './PlotTab';
import { Misc } from '../../../commonEditor/Misc';
import EntryPointTree from './EntryPointTree';
import EntryPointActions from '../../../commonEditor/EntryPoint/EntryPointActions';
import styles from '../../../commonEditor/Editor.css';

const newEntryPoint = {
  name: 'NewEntryPoint',
  timeBasedData: true,
  connectedData: {
    formula: '',
    fieldX: '',
    unit: 's',
    digits: 5,
    format: 'decimal',
    domain: '',
    timeline: '',
    axisId: 'time',
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

  ],
};

const navbarItems = ['Entry Points', 'Plot'];

/*
  Composant racine de l'éditeur Plot.
*/
export default class PlotEditor extends Component {
  static propTypes = {
    // actions
    addEntryPoint: PropTypes.func.isRequired,
    removeEntryPoint: PropTypes.func.isRequired,

    // rest
    viewId: PropTypes.string.isRequired,
    closeEditor: PropTypes.func.isRequired,
    configuration: PropTypes.shape({
      procedures: PropTypes.array,
      entryPoints: PropTypes.array,
      axes: PropTypes.object,
      grids: PropTypes.array,
      legend: PropTypes.object,
      markers: PropTypes.array,
    }).isRequired,
  }

  componentWillMount() {
    this.setState({
      currentDisplay: 0,
      search: '',
    });
  }

  handleAddEntryPoint = (values) => {
    const { addEntryPoint, viewId } = this.props;
    addEntryPoint(
      viewId,
      {
        ...newEntryPoint,
        ...values,
      }
    );
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
        markers,
      },
    } = this.props;
    return (
      <div className={styles.contentWrapper}>
        <Navbar
          currentDisplay={currentDisplay}
          items={navbarItems}
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
              remove={this.removeEntryPoint}
            />,
          ]}
        </div>
      </div>
    );
  }
}
