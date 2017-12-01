import React, { PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import AddTimelineContainer from '../Timebar/LeftTab/AddTimelineContainer';
import EditTimelineContainer from '../Timebar/LeftTab/EditTimelineContainer';
import PlotAddAxisContainer from '../../viewManager/PlotView/Components/Editor/AddPlotAxisContainer';
import PlotAddEntryPointContainer from '../../viewManager/PlotView/Components/Editor/AddEntryPointContainer';
import AddEntryPointContainer from '../../viewManager/common/Components/Editor/AddEntryPointContainer';
import GmaAckModalContainer from '../../viewManager/GroundAlarmView/Components/View/AckModalContainer';
import ObaAckModalContainer from '../../viewManager/OnboardAlarmView/Components/View/AckModalContainer';
import TimeSetterContainer from '../Timebar/TimeSetter/TimeSetterContainer';
import EditPageContainer from '../Page/EditPageContainer';
import EditWindowContainer from '../Window/EditWindowContainer';
import EditWorkspaceContainer from '../Workspace/EditWorkspaceContainer';
import MoveViewToPageContainer from '../View/MoveViewToPageContainer';
import AddLinkContainer from '../../viewManager/commonEditor/Misc/AddLinkContainer';
import SaveWizardModalContainer from './SaveWizardModal/SaveWizardModalContainer';
import DialogModal from './DialogModal'; // replacement for electron dialogbox

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
