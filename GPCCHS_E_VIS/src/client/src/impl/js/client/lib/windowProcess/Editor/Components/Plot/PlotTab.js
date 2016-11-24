import React from 'react';
import {
  Accordion,
  Panel
} from 'react-bootstrap';
import {
  PlotAxesContainer,
  PlotGridsContainer,
  PlotMarkersContainer
} from './';
import ViewTitleContainer from '../ViewTitleContainer';

/*
  PlotTab représente l'onglet "Plot" de l'éditeur Plot.
  C'est un arbre qui contient 4 branches :
    - TITLE : Edition du titre et des styles du titre de la Plot
    - GRID : Edition des parametres de la Grille
    - AXES : Edition des différents axes.
    - MARKERS :
*/
export default class PlotTab extends React.Component {
  static contextTypes = {
    viewId: React.PropTypes.string
  };

  state = {
    isTitleOpen: false,
    isAxesOpen: false,
    isGridOpen: false,
    isMarkersOpen: false
  };

  openTitle = () => this.setState({ isTitleOpen: true });
  closeTitle = () => this.setState({ isTitleOpen: false });

  openGrid = () => this.setState({ isGridOpen: true });
  closeGrid = () => this.setState({ isGridOpen: false });

  openAxes = () => this.setState({ isAxesOpen: true });
  closeAxes = () => this.setState({ isAxesOpen: false });

  openMarkers = () => this.setState({ isMarkersOpen: true });
  closeMarkers = () => this.setState({ isMarkersOpen: false });

  render() {
    const { viewId } = this.context;
    const {
      isTitleOpen,
      isAxesOpen,
      isGridOpen,
      isMarkersOpen
    } = this.state;

    return (
      <Accordion>
        <Panel
          header="Title"
          eventKey="1"
          expanded={isTitleOpen}
          onSelect={this.openTitle}
          onExited={this.closeTitle}
        >
          {isTitleOpen && <ViewTitleContainer viewId={viewId} />}
        </Panel>
        <Panel
          header="Grid"
          eventKey="2"
          expanded={isGridOpen}
          onSelect={this.openGrid}
          onExited={this.closeGrid}
        >
          {isGridOpen && <PlotGridsContainer viewId={viewId} />}
        </Panel>

        <PlotAxesContainer
          viewId={viewId}
          eventKey="3"
          expanded={isAxesOpen}
          open={this.openAxes}
          close={this.closeAxes}
        />

        <PlotMarkersContainer
          viewId={viewId}
          eventKey="4"
          expanded={isMarkersOpen}
          open={this.openMarkers}
          close={this.closeMarkers}
        />
      </Accordion>
    );
  }
}
