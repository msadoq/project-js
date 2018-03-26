// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Fix bugs in PlotView/TextView editors
// VERSION : 1.1.2 : DM : #5828 : 26/04/2017 : Ported 1.1.0 patch to dev branch. EP Drag & drop auto-axis-creation.
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : General Editor Refacto : using GenericModal, using rc-collapse module instead of bootstrap accordion.
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Plot & Text editor panels and sub-panels are stored in store.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : General Editor Refacto : using GenericModal, using rc-collapse module instead of bootstrap accordion.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Plot & Text editor panels and sub-panels are stored in store.
// VERSION : 1.1.2 : DM : #6129 : 10/07/2017 : MimicView editor rc-collapse implementation + fixes on Plot and Text editors too.
// VERSION : 1.1.2 : FA : #7773 : 13/09/2017 : Fixed bug when editing PlotView/TextView/MimicView EntryPoint's name.
// END-HISTORY
// ====================================================================

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Glyphicon,
  Alert,
  Button,
} from 'react-bootstrap';
import classnames from 'classnames';
import Collapse from 'rc-collapse';
import { entryPointType } from 'viewManager/common/Components/types';
import { handleSubmit } from 'viewManager/common';
import styles from './EntryPointTree.css';
import EntryPointDetailsContainer from './EntryPointDetailsContainer';
/*
  EntryPointTree liste les EntryPoints à afficher.
  Permet également d'appliquer un filtre sur le nom
*/
const { Panel } = Collapse;
const emptyArray = [];

export default class EntryPointTree extends PureComponent {
  static propTypes = {
    entryPoints: PropTypes.arrayOf(entryPointType),
    search: PropTypes.string,
    viewId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    // from container mapDispatchToProps
    askRemoveEntryPoint: PropTypes.func.isRequired,
    updateEntryPoint: PropTypes.func.isRequired,
    updateViewPanels: PropTypes.func.isRequired,
    // from container mapStateToProps
    entryPointsPanels: PropTypes.shape({}).isRequired,
  }

  static defaultProps = {
    entryPoints: [],
    search: '',
  };

  static contextTypes = {
    windowId: PropTypes.string,
  }

  onChange = (openPanels) => {
    const { updateViewPanels, viewId } = this.props;
    updateViewPanels(viewId, 'entryPoints', openPanels);
  }

  getEntryPointByKey(key) {
    const entryPoints = this.props.entryPoints;
    return entryPoints.find(ep => ep.id === key);
  }

  handleRemove = (e, key) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.askRemoveEntryPoint(this.props.viewId, this.getEntryPointByKey(key));
  }


  handleSubmit = (submittedValues) => {
    const { updateEntryPoint, viewId } = this.props;
    handleSubmit(submittedValues, updateEntryPoint, viewId);
  };

  render() {
    const { windowId } = this.context;
    const mask = `${this.props.search}.*`;
    const { entryPoints, entryPointsPanels, viewId, pageId } = this.props;
    const list = entryPoints
      .filter(entryPoint => entryPoint.name.toLowerCase().match(mask.toLowerCase()));

    if (!list.length) {
      return (<Alert bsStyle="info" className="m0">
        Nothing to display.
      </Alert>);
    }

    return (
      <Collapse
        accordion={false}
        onChange={this.onChange}
        defaultActiveKey={entryPointsPanels === true ? emptyArray : Object.keys(entryPointsPanels)}
      >
        {list.map((entryPoint) => {
          const isOpen = entryPointsPanels[entryPoint.id];
          return (
            <Panel
              key={entryPoint.id}
              header={
                <div className="rc-collapse-header-inner">
                  {entryPoint.objectStyle && entryPoint.objectStyle.curveColor &&
                    <div style={{ width: '30px' }}>
                      <div
                        className={styles.colorSquare}
                        style={{
                          backgroundColor: entryPoint.objectStyle.curveColor,
                        }}
                      />
                    </div>
                  }
                  <span className="flex">{entryPoint.name}</span>
                  <div>
                    <Button
                      bsSize="xsmall"
                      className={classnames('btn-link', styles.removeButton)}
                      onClick={e => this.handleRemove(e, entryPoint.id)}
                    >
                      <Glyphicon
                        className="text-danger"
                        glyph="remove"
                        title="Remove"
                      />
                    </Button>
                  </div>
                </div>
              }
            >
              {isOpen && <EntryPointDetailsContainer
                key={`${entryPoint.id}#detailsContainer`}
                windowId={windowId}
                viewId={viewId}
                pageId={pageId}
                entryPoint={entryPoint}
                onSubmit={this.handleSubmit}
                initialValues={entryPoint}
                form={`entrypoint-title-form-${entryPoint.id}-${viewId}`}
              />}
            </Panel>
          );
        })}
      </Collapse>
    );
  }
}
