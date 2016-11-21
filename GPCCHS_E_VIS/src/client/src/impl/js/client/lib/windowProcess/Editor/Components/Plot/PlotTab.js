import React, { PropTypes } from 'react';
import {
  Accordion,
  Panel,
  Glyphicon,
  Button
} from 'react-bootstrap';
import {
  PlotGrid,
  PlotAxes,
  PlotMarkers
} from './';
import ViewTitle from '../ViewTitle';

/*
  PlotTab représente l'onglet "Plot" de l'éditeur Plot.
  C'est un arbre qui contient 4 branches :
    - TITLE : Edition du titre et des styles du titre de la Plot
    - GRID : Edition des parametres de la Grille
    - AXES : Edition des différents axes.
    - MARKERS :
*/
export default class PlotTab extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    axes: PropTypes.array,
    markers: PropTypes.array,
    grids: PropTypes.array,
    titleStyle: PropTypes.object,
    handleGrids: PropTypes.func,
    handlePlotTitle: PropTypes.func,
    handlePlotTitleStyle: PropTypes.func,
    handleAddPlotAxis: PropTypes.func,
    handleRemovePlotAxis: PropTypes.func,
    handlePlotAxes: PropTypes.func,
    handlePlotMarkers: PropTypes.func
  }
  state = {
    isTitleOpen: false,
    isAxesOpen: false,
    isGridOpen: false,
    isMarkersOpen: false
  };

  handleAddPlotAxis = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.handleAddPlotAxis();
  }

  openTitle = () => this.setState({ isTitleOpen: true });
  closeTitle = () => this.setState({ isTitleOpen: false });

  openGrid = () => this.setState({ isGridOpen: true });
  closeGrid = () => this.setState({ isGridOpen: false });

  openAxes = () => this.setState({ isAxesOpen: true });
  closeAxes = () => this.setState({ isAxesOpen: false });

  openMarkers = () => this.setState({ isMarkersOpen: true });
  closeMarkers = () => this.setState({ isMarkersOpen: false });

  render() {
    const {
      isTitleOpen,
      isAxesOpen,
      isGridOpen,
       isMarkersOpen
       } = this.state;
    const {
      axes,
      markers,
      title,
      titleStyle,
      grids,
      handlePlotAxes,
      handleRemovePlotAxis,
      handlePlotMarkers,
      handleGrids,
      handlePlotTitle,
      handlePlotTitleStyle
    } = this.props;

    return (
      <Accordion>
        <Panel
          header="Title"
          eventKey="1"
          expanded={isTitleOpen}
          onSelect={this.openTitle}
          onExited={this.closeTitle}
        >
          {isTitleOpen && <ViewTitle
            titleStyle={titleStyle}
            title={title}
            onTitleChange={handlePlotTitle}
            onTitleStyleChange={handlePlotTitleStyle}
          />}
        </Panel>
        <Panel
          header="Grid"
          eventKey="2"
          expanded={isGridOpen}
          onSelect={this.openGrid}
          onExited={this.closeGrid}
        >
          {isGridOpen && <PlotGrid
            index={0}
            grid={grids && grids[0]}
            onChange={handleGrids}
          />}
        </Panel>
        <Panel
          header={<span>
            <Button
              bsSize="xsmall"
              className="pull-right btn-link"
              onClick={this.handleAddPlotAxis}
            >
              <Glyphicon
                className="text-success"
                glyph="plus"
                title="Add"
              />
            </Button>
            Axes
          </span>}
          eventKey="3"
          expanded={isAxesOpen}
          onSelect={this.openAxes}
          onExited={this.closeAxes}
        >
          <PlotAxes
            axes={axes}
            handleRemovePlotAxis={handleRemovePlotAxis}
            handlePlotAxes={handlePlotAxes}
          />
        </Panel>
        <Panel
          header="Markers"
          eventKey="4"
          expanded={isMarkersOpen}
          onSelect={this.openMarkers}
          onExited={this.closeMarkers}
        >
          <PlotMarkers
            markers={markers}
            axes={axes}
            handlePlotMarkers={handlePlotMarkers}
          />
        </Panel>
      </Accordion>
    );
  }
}
