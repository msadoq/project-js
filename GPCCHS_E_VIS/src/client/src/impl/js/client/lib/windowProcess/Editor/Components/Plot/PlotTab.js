import React, { PropTypes } from 'react';
import {
  Accordion,
  Panel
} from 'react-bootstrap';
import {
  PlotTitle,
  PlotGrid,
  PlotAxis
} from './';
import Marker from '../Marker';
import styles from './PlotTab.css';


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
    handleGrid: PropTypes.func,
    handlePlotTitle: PropTypes.func,
    handlePlotTitleStyle: PropTypes.func,
    handlePlotAxes: PropTypes.func,
    handlePlotMarkers: PropTypes.func
  }
  state = {
    isTitleOpen: false,
    isAxesOpen: false,
    isGridOpen: false,
    isMarkersOpen: false
  };

  handleTitleStyle = (field, value) => this.props.handlePlotTitleStyle(field, value);
  handleTitle = e => this.props.handlePlotTitle(e.target.value);
  handleWidth = e => this.props.handleGrid('width', e.target.value);
  handleShow = state => this.props.handleGrid('showGrid', state === 'ON');
  handleAlign = val => this.props.handlePlotTitleStyle('align', val);
  handleLineStyle = val => this.props.handleGrid('lineStyle', val);
  handleYAxis = e => this.props.handleGrid('yAxisId', e.target.value);

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
      handlePlotMarkers
    } = this.props;

    return (
      <div className={styles.PlotTreeFirstLvl}>
        <Accordion>
          <Panel
            header="Title"
            eventKey="1"
            expanded={isTitleOpen}
            onSelect={this.openTitle}
            onExited={this.closeTitle}
          >
            {isTitleOpen && <PlotTitle
              titleStyle={titleStyle}
              title={title}
              onTitleStyleChange={this.handleTitleStyle}
              onAlignChange={this.handleAlign}
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
              grids={grids}
              onShow={this.handleShow}
              onLineStyleChange={this.handleLineStyle}
              onWidthChange={this.handleWidth}
              onYAxisChange={this.handleYAxis}
            />}
          </Panel>
          <Panel
            header="Axes"
            eventKey="3"
            expanded={isAxesOpen}
            onSelect={this.openAxes}
            onExited={this.closeAxes}
          >
            {isAxesOpen && axes.map((axis, key) =>
              <PlotAxis
                key={key}
                idAxe={key}
                label={axis.label}
                unit={axis.unit}
                axisStyle={axis.style}
                min={axis.min}
                max={axis.max}
                autoLimits={axis.autoLimits}
                tickStep={axis.tickStep}
                autoTick={axis.autoTick}
                showTicks={axis.showTicks}
                showTickLabels={axis.showTickLabels}
                isLogarithmic={axis.isLogarithmic}
                showAxis={axis.showAxis}
                style={axis.style}
                handlePlotAxes={handlePlotAxes}
              />
            )}
          </Panel>
          <Panel
            header="Markers"
            eventKey="4"
            expanded={isMarkersOpen}
            onSelect={this.openMarkers}
            onExited={this.closeMarkers}
          >
            {isMarkersOpen && markers.map((marker, key) =>
              <Marker
                key={key}
                idAxe={key}
                kind={marker.kind}
                label={marker.label}
                relPosX={marker.relativePosX}
                relPosY={marker.relativePosY}
                markerStyle={marker.style}
                handlePlotMarker={handlePlotMarkers}
                axes={axes}
              />
            )}
          </Panel>
        </Accordion>
      </div>
    );
  }
}
