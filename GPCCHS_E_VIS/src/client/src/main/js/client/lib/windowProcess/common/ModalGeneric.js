// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : New GenericModal component displayed or not
//  displayed at root (Window.js) AddTimeline and EditTimeline forms displayed through it.
// VERSION : 1.1.2 : DM : #5828 : 13/04/2017 : EntryPoint addition now uses GenericModal. General
//  refacto of default EntryPoints props, set in viewManager's setDefaultEntryPoint for text, plot
//  and Dynamic.
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : Timesetter is displayed with GenericModal component.
// VERSION : 1.1.2 : DM : #5828 : 19/04/2017 : Page title edition using contextMenu and
//  GenericModal.
// VERSION : 1.1.2 : DM : #5828 : 24/04/2017 : Edit window title available through upper menu
//  Window -> Rename.
// VERSION : 1.1.2 : DM : #5828 : 25/04/2017 : Renamed two modal titles, removed useless
//  classnames.
// VERSION : 1.1.2 : DM : #5828 : 26/04/2017 : Page title edition is accessible through the upper
//  menu.
// VERSION : 1.1.2 : DM : #5828 : 27/04/2017 : Uniforming new EP process for PlotView and textView.
//  Fot PlotView EP, user might choose unit and axis in form to prevent VIMA from auto-creating Y
//  axis.
// VERSION : 1.1.2 : DM : #5828 : 03/05/2017 : update MoveViewToPage modal to the generic modal
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : General Editor Refacto : using GenericModal, using
//  rc-collapse module instead of bootstrap accordion.
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add possibility to modify domainName and sessionName
//  from GUI for view, page, window and workspace
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add possibility to modify domainName and sessionName
//  from GUI for view, page, window and workspace
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : General Editor Refacto : using GenericModal, using
//  rc-collapse module instead of bootstrap accordion.
// VERSION : 1.1.2 : DM : #6129 : 18/05/2017 : Fix Add new EP in mimicview
// VERSION : 1.1.2 : DM : #6129 : 31/05/2017 : Merge branch 'dev' into abesson-mimic
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add Misc/links in view editor
// VERSION : 1.1.2 : FA : ISIS-FT-2132 : 15/06/2017 : Ask to save before closing view or page
// VERSION : 1.1.2 : FA : ISIS-FT-2132 : 20/06/2017 : Fix asking to save before closing view or
//  page
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Add DialogModal used by ModalGeneric
// VERSION : 1.1.2 : FA : #7185 : 06/07/2017 : Fix lint errors and warnings
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Improve SaveAgentModal + onClosePage /
//  onSavePage seems to be OK
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Move SaveAgentModal in a separate folder
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Rename SaveAgent in SaveWizard .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add SaveAgentModal to ModalGeneric .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 24/07/2017 : Remove 2 old unused modals
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 2.0.0 : DM : #7111 : 20/09/2017 : Add editor in history view data and fix history view
//  data reducer
// VERSION : 2.0.0 : DM : #5806 : 20/10/2017 : Merge branch jmaupeti_alarmstub into dev
// VERSION : 2.0.0 : DM : #5806 : 23/10/2017 : Implement basic GMA ack modal
// VERSION : 2.0.0 : DM : #5806 : 26/10/2017 : Fork GMA to OBA (viewManager)
// VERSION : 2.0.0 : DM : #6832 : 08/11/2017 : Fix AckModal closing using a new action
//  WS_MODAL_CLOSED
// VERSION : 2.0.0 : FA : #9494 : 01/12/2017 : Regression in View Editor ( domain ) // move
//  MimicView common components to dedicated folder
// VERSION : 2.0.0 : FA : #9494 : 01/12/2017 : Regression in View Editor ( domain ) // move
//  TextView common components to dedicated folder
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import React from 'react';
import PropTypes from 'prop-types';
import AddLinkContainer from 'viewManager/commonEditor/Misc/AddLinkContainer';
import { Modal } from 'react-bootstrap';
import PlotAddAxisContainer from 'viewManager/PlotView/Components/Editor/AddPlotAxisContainer';
import PlotAddEntryPointContainer from 'viewManager/PlotView/Components/Editor/AddEntryPointContainer';
import AddEntryPointContainer from 'viewManager/common/Components/Editor/AddEntryPointContainer';
import GmaAckModalContainer from 'viewManager/GroundAlarmView/Components/View/AckModalContainer';
import ObaAckModalContainer from 'viewManager/OnboardAlarmView/Components/View/AckModalContainer';
import DialogModal from './DialogModal'; // replacement for electron dialogbox
import TimeSetterContainer from '../Timebar/TimeSetter/TimeSetterContainer';
import EditPageContainer from '../Page/EditPageContainer';
import EditWindowContainer from '../Window/EditWindowContainer';
import EditWorkspaceContainer from '../Workspace/EditWorkspaceContainer';
import MoveViewToPageContainer from '../View/MoveViewToPageContainer';
import AddTimelineContainer from '../Timebar/LeftTab/AddTimelineContainer';
import SaveWizardModalContainer from './SaveWizardModal/SaveWizardModalContainer';
import EditTimelineContainer from '../Timebar/LeftTab/EditTimelineContainer';
import PUS11ModalContainer from '../../viewManager/PUS11View/Components/View/PUS11ModalContainer';

/* eslint-disable complexity, "DV6 TBC_CNES Generic elements must have an action for each cases using this element" */

const ModalGeneric = (props) => {
  let child;
  let title;
  switch (props.props.type) {
    case 'dialog':
      title = props.props.title;
      child = (
        <DialogModal
          {...props.props}
          closeModal={props.onClose}
        />
      );
      break;
    case 'pus11Modal':
      title = props.props.title;
      child = (
        <PUS11ModalContainer
          {...props.props}
          closeModal={props.onClose}
        />
      );
      break;
    case 'saveWizard':
      title = 'Save documents';
      if (props.props.title) {
        title = `${title} - ${props.props.title}`;
      }
      child = (
        <SaveWizardModalContainer
          {...props.props}
          closeModal={props.onClose}
        />
      );
      break;
    case 'gmaAck':
      title = 'Acknowledgement';
      if (props.props.title) {
        title = `${title} - ${props.props.title}`;
      }
      child = (
        <GmaAckModalContainer
          {...props.props}
          closeModal={props.onClose}
        />
      );
      break;
    case 'obaAck':
      title = 'Acknowledgement';
      if (props.props.title) {
        title = `${title} - ${props.props.title}`;
      }
      child = (
        <ObaAckModalContainer
          {...props.props}
          closeModal={props.onClose}
        />
      );
      break;
    case 'addTimeline':
      title = 'Add timeline';
      child =
        (<AddTimelineContainer
          {...props.props}
          closeModal={props.onClose}
        />);
      break;
    case 'editTimeline':
      title = 'Edit timeline';
      child =
        (<EditTimelineContainer
          {...props.props}
          closeModal={props.onClose}
        />);
      break;
    case 'addPlotAxis':
      title = 'Add plot axis';
      child = (
        <PlotAddAxisContainer
          {...props.props}
          closeModal={props.onClose}
        />
      );
      break;
    case 'addEntryPoint':
      title = 'Add entry point';
      switch (props.props.viewType) {
        case 'TextView':
        case 'HistoryView':
          child = (
            <AddEntryPointContainer
              {...props.props}
              closeModal={props.onClose}
            />);
          break;
        case 'PlotView':
          child = (
            <PlotAddEntryPointContainer
              {...props.props}
              closeModal={props.onClose}
            />);
          break;
        case 'MimicView':
          child = (
            <AddEntryPointContainer
              {...props.props}
              closeModal={props.onClose}
            />);
          break;
        default:
          child = <div />;
      }
      break;
    case 'timeSetter':
      title = 'Time setter';
      child = (
        <TimeSetterContainer
          {...props.props}
          closeModal={props.onClose}
        />);
      break;
    case 'editWindow':
      title = 'Edit window';
      child = (
        <EditWindowContainer
          {...props.props}
          closeModal={props.onClose}
        />);
      break;
    case 'editPage':
      title = 'Edit page';
      child = (
        <EditPageContainer
          {...props.props}
          closeModal={props.onClose}
        />);
      break;
    case 'editWorkspace':
      title = 'Edit Workspace';
      child = (
        <EditWorkspaceContainer
          {...props.props}
          closeModal={props.onClose}
        />);
      break;
    case 'moveViewToPage':
      title = 'Move view to another page';
      child = (
        <MoveViewToPageContainer
          {...props.props}
          closeModal={props.onClose}
        />);
      break;
    case 'addLink':
      title = 'Add link';
      child = (
        <AddLinkContainer
          {...props.props}
          closeModal={props.onClose}
        />
      );
      break;
    default:
      child = (<div />);
      break;
  }

  return (
    <div className="modal-container">
      <Modal
        show={props.isOpened}
        onHide={props.onClose}
        onExited={props.onExited}
        bsSize={props.props.bsSize ? props.props.bsSize : null}
      >
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
          <button
            className="btn-sm btn btn-danger btn-close"
            onClick={props.onClose}
          >
            x
          </button>
        </Modal.Header>
        <Modal.Body>
          {child}
        </Modal.Body>
      </Modal>
    </div>
  );
};

ModalGeneric.propTypes = {
  onClose: PropTypes.func.isRequired,
  onExited: PropTypes.func.isRequired,
  isOpened: PropTypes.bool,
  props: PropTypes.shape().isRequired,
};

ModalGeneric.defaultProps = {
  isOpened: false,
  children: null,
};

export default ModalGeneric;
