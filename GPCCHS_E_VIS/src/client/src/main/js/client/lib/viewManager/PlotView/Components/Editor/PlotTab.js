import React, { Component, PropTypes } from 'react';
import Collapse from 'rc-collapse';
import { Button, Glyphicon } from 'react-bootstrap';
import PlotGridsContainer from './PlotGridsContainer';
import PlotAxesContainer from './PlotAxesContainer';
import ViewParamsContainer from '../../../commonEditor/ViewParamsContainer';

const { Panel } = Collapse;
/*
  PlotTab représente l'onglet "Plot" de l'éditeur Plot.
  C'est un arbre qui contient 4 branches :
    - TITLE : Edition du titre et des styles du titre de la Plot
    - GRID : Edition des parametres de la Grille
    - AXES : Edition des différents axes.
    - MARKERS :
*/
export default class PlotTab extends Component {
  static propTypes = {
    viewId: PropTypes.string,
    openModal: PropTypes.func.isRequired,
  };

  static contextTypes = {
    windowId: PropTypes.string,
  };

  state = {
    openPanels: [],
  };

  onChange = openPanels =>
    this.setState({ openPanels })

  handleAddPlotAxis = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { openModal, viewId } = this.props;
    const { windowId } = this.context;
    openModal(windowId, { type: 'addPlotAxis', viewId });
  }

  render() {
    const { viewId } = this.props;
    const {
      openPanels,
    } = this.state;

    return (
      <Collapse accordion={false} onChange={this.onChange}>
        <Panel
          header="Parameters"
          key="Parameters"
        >
          {
            openPanels.includes('Parameters') &&
            <ViewParamsContainer viewId={viewId} />
          }
        </Panel>
        <Panel
          header="Grid"
          key="Grid"
        >
          {
            openPanels.includes('Grid') &&
            <PlotGridsContainer viewId={viewId} />
          }
        </Panel>

        <Panel
          key="Axes"
          header={
            <div className="rc-collapse-header-inner">
              <span className="flex" style={{ paddingLeft: '13px' }}>Axes</span>
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
            </div>
          }
        >
          {
            openPanels.includes('Axes') &&
            <PlotAxesContainer
              viewId={viewId}
            />
          }
        </Panel>
        { /* @TODO v2, to be uncommented soon.
          to add a marker you need to use the plot menu
          to be uncommented too!
        <PlotMarkersContainer
          viewId={viewId}
          eventKey="4"
          expanded={isMarkersOpen}
          open={this.openMarkers}
          close={this.closeMarkers}
        />*/}
      </Collapse>
    );
  }
}
