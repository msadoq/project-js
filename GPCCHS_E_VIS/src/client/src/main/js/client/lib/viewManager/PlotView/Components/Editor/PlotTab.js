// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : General Editor Refacto : using GenericModal, using rc-collapse module instead of bootstrap accordion.
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Plot & Text editor panels and sub-panels are stored in store.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : General Editor Refacto : using GenericModal, using rc-collapse module instead of bootstrap accordion.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Plot & Text editor panels and sub-panels are stored in store.
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : DM : #6829 : 27/06/2017 : PlotView legend : left right top bottom.
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 24/08/2017 : Fixed few eslint errors / warnings no-console and spaced-comment.
// END-HISTORY
// ====================================================================

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
        /> */}
      </Collapse>
    );
  }
}
