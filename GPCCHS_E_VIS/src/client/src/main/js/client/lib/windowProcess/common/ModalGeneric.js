import React, { PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import AddTimelineContainer from '../Timebar/LeftTab/AddTimelineContainer';
import EditTimelineContainer from '../Timebar/LeftTab/EditTimelineContainer';
import PlotAddAxisContainer from '../../viewManager/PlotView/Components/Editor/AddPlotAxisContainer';
import PlotAddEntryPointContainer from '../../viewManager/PlotView/Components/Editor/AddEntryPointContainer';
import TextAddEntryPointContainer from '../../viewManager/TextView/Components/Editor/AddEntryPointContainer';
import MimicAddEntryPointContainer from '../../viewManager/MimicView/Components/Editor/AddEntryPointContainer';
import TimeSetterContainer from '../Timebar/TimeSetter/TimeSetterContainer';
import EditPageContainer from '../Page/EditPageContainer';
import EditWindowContainer from '../Window/EditWindowContainer';
import EditWorkspaceContainer from '../Workspace/EditWorkspaceContainer';
import MoveViewToPageContainer from '../View/MoveViewToPageContainer';
import AddLinkContainer from '../../viewManager/commonEditor/Misc/AddLinkContainer';

const ModalGeneric = (props) => {
  let child;
  let title;
  switch (props.props.type) {
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
          child = (
            <TextAddEntryPointContainer
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
            <MimicAddEntryPointContainer
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
      <Modal show={props.isOpened} onHide={props.onClose}>
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
  isOpened: PropTypes.bool,
  props: PropTypes.shape().isRequired,
};

ModalGeneric.defaultProps = {
  isOpened: false,
  children: null,
};

export default ModalGeneric;
