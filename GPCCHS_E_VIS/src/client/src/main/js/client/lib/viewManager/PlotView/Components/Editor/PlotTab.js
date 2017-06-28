import React, { Component, PropTypes } from 'react';
import Collapse from 'rc-collapse';
import { Button, Glyphicon } from 'react-bootstrap';
import PlotGridsContainer from './PlotGridsContainer';
import PlotAxesContainer from './PlotAxesContainer';
import ViewParamsContainer from './ViewParamsContainer';

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
    viewId: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
    updateViewPanels: PropTypes.func.isRequired,
    panels: PropTypes.shape({}).isRequired,
  };

  static contextTypes = {
    windowId: PropTypes.string,
  };

  onChange = (openPanels) => {
    const { updateViewPanels, viewId } = this.props;
    updateViewPanels(viewId, 'panels', openPanels);
  }

  handleAddPlotAxis = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { openModal, viewId } = this.props;
    const { windowId } = this.context;
    openModal(windowId, { type: 'addPlotAxis', viewId });
  }

  render() {
    const { viewId, panels } = this.props;

    return (
      <Collapse
        accordion={false}
        onChange={this.onChange}
        defaultActiveKey={Object.keys(panels)}
      >
        <Panel
          header="Parameters"
          key="parameters"
        >
          {
            panels.parameters &&
            <ViewParamsContainer viewId={viewId} />
          }
        </Panel>
        <Panel
          header="Grid"
          key="grid"
        >
          {
            panels.grid &&
            <PlotGridsContainer viewId={viewId} />
          }
        </Panel>

        <Panel
          key="axes"
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
            panels.axes &&
            <PlotAxesContainer
              viewId={viewId}
              panel="axes"
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
