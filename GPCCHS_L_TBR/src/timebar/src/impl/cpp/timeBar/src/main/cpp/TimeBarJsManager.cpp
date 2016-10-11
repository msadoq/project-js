/*!*******************************************************************
 * Project : ISIS
 * Component : GPCC-timeBar
 * \file TimeBarJsManager.cpp
 * \author Olivier HUYARD
 * \date 16th august 2016
 * \brief The timebar javascript communication manager
 *
 * MLanager of the communication with the javascript part of the application
 ********************************************************************/

/********************************************************************
 * HISTORY
 *
 * END-HISTORY
 ********************************************************************/

#include <QtCore/QDebug>
#include <QtCore/QList>
#include <QtCore/QMapIterator>

#include "zmq.h"

#include "timeBar/TimeBarJsManager.h"
#include "timeBar/TimeBarSocket.h"

#include "timeBar/TimeManagers.h"

#include "commonMMIUtils/LogWrapper.h"

namespace timeBar
{

/*!***************************************************************************
 * Method : TimeBarJsManager::TimeBarJsManager
 * Purpose : TimeBarJsManager Constructor
 ****************************************************************************/
TimeBarJsManager::TimeBarJsManager(timeBarsModel::TimeBar * model, core::UINT32 socketID, QObject* parent):
        QObject(parent),
        _timeBarModel(model),
        _socketId(0),
        _isInitDone(false),
        _isRealtimeSwitch(false),
        _ignoreTbModelEvt(false)
{
    // Connect signals with slots
    connect(_timeBarModel, &timeBarsModel::TimeBar::visualizationModeModified, this, &TimeBarJsManager::visualizationModeModified);
    connect(_timeBarModel, &timeBarsModel::TimeBar::lowerSlideLimitModified, this, &TimeBarJsManager::lowerSlideLimitModified);
    connect(_timeBarModel, &timeBarsModel::TimeBar::upperSlideLimitModified, this, &TimeBarJsManager::upperSlideLimitModified);
    connect(_timeBarModel, &timeBarsModel::TimeBar::upperExtendedLimitModified, this, &TimeBarJsManager::upperExtendedLimitModified);
    connect(_timeBarModel, &timeBarsModel::TimeBar::defaultVisuWindowWidthModified, this, &TimeBarJsManager::defaultVisuWindowWidthModified);
    connect(_timeBarModel, &timeBarsModel::TimeBar::nbMsInPixelModified, this, &TimeBarJsManager::rulerDataModified);
    connect(_timeBarModel, &timeBarsModel::TimeBar::timeBarLeftBorderTimeInMsSinceEpochModified, this, &TimeBarJsManager::rulerDataModified);
    connect(_timeBarModel, &timeBarsModel::TimeBar::timeSpecModified, this, &TimeBarJsManager::timeSpecDataModified);
    connect(_timeBarModel, &timeBarsModel::TimeBar::offsetFromUTCModified, this, &TimeBarJsManager::timeSpecDataModified);
    // Initialize the masterTlId field to empty in the json message, in order to have it even if there is not session opened
    _currentJsonMsg.setMasterTlId(QVariant(""));
    // Initialize socket data
    _socketId = socketID;
}

/*!***************************************************************************
 * Method : TimeBarJsManager::~TimeBarJsManager
 * Purpose : TimeBarJsManager Destructor
 ****************************************************************************/
TimeBarJsManager::~TimeBarJsManager()
{
    // Perform a try catch according to coding rule
    try {
        // Disconnect signals
        disconnect(_timeBarModel, &timeBarsModel::TimeBar::visualizationModeModified, this, &TimeBarJsManager::visualizationModeModified);
        disconnect(_timeBarModel, &timeBarsModel::TimeBar::lowerSlideLimitModified, this, &TimeBarJsManager::lowerSlideLimitModified);
        disconnect(_timeBarModel, &timeBarsModel::TimeBar::upperSlideLimitModified, this, &TimeBarJsManager::upperSlideLimitModified);
        disconnect(_timeBarModel, &timeBarsModel::TimeBar::upperExtendedLimitModified, this, &TimeBarJsManager::upperExtendedLimitModified);
        disconnect(_timeBarModel, &timeBarsModel::TimeBar::defaultVisuWindowWidthModified, this, &TimeBarJsManager::defaultVisuWindowWidthModified);
        disconnect(_timeBarModel, &timeBarsModel::TimeBar::nbMsInPixelModified, this, &TimeBarJsManager::rulerDataModified);
        disconnect(_timeBarModel, &timeBarsModel::TimeBar::timeBarLeftBorderTimeInMsSinceEpochModified, this, &TimeBarJsManager::rulerDataModified);
        disconnect(_timeBarModel, &timeBarsModel::TimeBar::timeSpecModified, this, &TimeBarJsManager::timeSpecDataModified);
        disconnect(_timeBarModel, &timeBarsModel::TimeBar::offsetFromUTCModified, this, &TimeBarJsManager::timeSpecDataModified);
        // Close socket if created
        if(_socketId) {
            TimeBarSocket::get()->deleteSocket(_socketId);
            _socketId = 0;
        }
    }
    catch (...) {
        // Nothing to do
    }
}

/*!***************************************************************************
 * Method : TimeBarJsManager::initialUpdate
 * Purpose : Send an initial and full timebar configuration to javascript
******************************************************************************/
void TimeBarJsManager::initialUpdate()
{
    // Create the JSON message to send
    QString playingState;

    // Compute the playing state from data model
    playingState = computePlayingState();

    // The call of this method end the initialization process performed by the TimeManager
    // This process contains the following calls:
    // timelineAdded() as many times as there is timelines
    // masterSessionUpdated() upon creation of the master session timeline
    // initialUpdate() to end the initialiation process and send the timebar configuration
    _currentJsonMsg.setTimebarData(QVariant(_timeBarModel->getName()),QVariant(_timeBarModel->getVisualizationMode()),
                                   QVariant(playingState),QVariant(_timeBarModel->getVisualizationSpeed()),
                                   QVariant(_timeBarModel->getTimeBarLeftBorderTimeInMsSinceEpoch()),
                                   QVariant(_timeBarModel->getNbMsInPixel()), QVariant(_timeBarModel->getTimeSpec()),
                                   QVariant(_timeBarModel->getOffsetFromUTC()) );
    _currentJsonMsg.setWindPosData(QVariant(_timeBarModel->getStartTime()),QVariant(_timeBarModel->getCurrentTime()),
                                   QVariant(_timeBarModel->getEndTime()) );
    _currentJsonMsg.setWindPosDefaultWidth(QVariant(_timeBarModel->getDefaultVisuWindowWidth()));
    _currentJsonMsg.setSlideModeData(QVariant(_timeBarModel->getLowerSlideLimit()),QVariant(_timeBarModel->getUpperSlideLimit()));
    _currentJsonMsg.setExtendedModeData(QVariant(_timeBarModel->getUpperExtendedLimit()));
    // Do not set here the timeline data in json message because this is performed by the dedicated services
    // At this time, the master session id is not known, so it cannot be set

    // Set the action in the message
    _currentJsonMsg.setAction(QVariant(TimeBarJsModel::INIT_ACTIONTYPE));
    // Send the json message
    sendMessage();
    // Set the timebar initialization has finished
    _isInitDone = true;
}

/*!***************************************************************************
 * Method : TimeBarJsManager::visuWindowMouseDragEvent
 * Purpose : Take into account a mouse drag data update start of the visualization window
******************************************************************************/
void TimeBarJsManager::visuWindowMouseDragEvent()
{
    // Set drag flag as true to ignore data model update until end of data update by TimeManager
    _ignoreTbModelEvt = true;
}

/*!***************************************************************************
 * Method : TimeBarJsManager::visuWindowMouseDropEvent
 * Purpose : Take into account a mouse drop of the visualization window
******************************************************************************/
void TimeBarJsManager::visuWindowMouseDropEvent(core::BOOL isPlayingStateUpd)
{
    QString playingState;
    // Only take into account event when initialization has finished
    if(_isInitDone) {
        // Set the new visualization window position
        _currentJsonMsg.setWindPosData(QVariant(_timeBarModel->getStartTime()),QVariant(_timeBarModel->getCurrentTime()),
                                       QVariant(_timeBarModel->getEndTime()));
        // Check if playing state has been updated
        if(isPlayingStateUpd) {
            // Compute the playing state from data model
            playingState = computePlayingState();
            // Set the playing state in message, because it has changed
            _currentJsonMsg.setPlayingState(playingState);
        }
        // Set the action in the message
        _currentJsonMsg.setAction(QVariant(TimeBarJsModel::VISU_POS_UPD_ACTIONTYPE));
        // Send the message
        sendMessage();
    }
    // Set drag flag as false to listen again to data model updates
    _ignoreTbModelEvt = false;
}


/*!***************************************************************************
 * Method : TimeBarJsManager::masterSessionUpdateStart
 * Purpose : Take into account the start of model update due to master session timeline change
******************************************************************************/
void TimeBarJsManager::masterSessionUpdateStart()
{
    // Set drag flag as true to ignore data model update until end of data update by TimeManager
    _ignoreTbModelEvt = true;
}

/*!***************************************************************************
 * Method : TimeBarJsManager::masterSessionUpdated
 * Purpose : Take into account the end of model update due to master session timeline change
*****************************************************************************/
void TimeBarJsManager::masterSessionUpdateEnd(core::INT32 tlId)
{
    QMapIterator<core::INT32,timeBarsModel::Timeline*> iter(_timelinesMap);

    // Fill only the master session id in the message
    _currentJsonMsg.setMasterTlId(QVariant(tlId));
    // Parse the entire timeline list for offset update in json message
    while (iter.hasNext()) {
        iter.next();
        // Update timeline offset in message because master timeline change has triggered offset recomputation
        _currentJsonMsg.updateTimelineOffset(QVariant(iter.key()),QVariant(iter.value()->getOffset()));
    }

    // Only send message if we are not more in initialization
    if(_isInitDone) {
        // Set the action in the message
        _currentJsonMsg.setAction(QVariant(TimeBarJsModel::MASTER_TL_ID_UPD_ACTIONTYPE));
        // Send the message
        sendMessage();
    }
    // Set drag flag as false to listen again to data model updates
    _ignoreTbModelEvt = false;
}

/*!***************************************************************************
 * Method : TimeBarJsManager::currentTimeDragged
 * Purpose : Take into account a mouse drop of the current time
*****************************************************************************/
void TimeBarJsManager::currentTimeDragged(core::BOOL isPlayingStateUpd)
{
    QString playingState;
    // Only take into account event when initialization has finished
    if(_isInitDone) {
        // Set the new current time position
        _currentJsonMsg.setCurrentTime(QVariant(_timeBarModel->getCurrentTime()));
        // Check if playing state has been updated
        if(isPlayingStateUpd) {
            // Compute the playing state from data model
            playingState = computePlayingState();
            // Set the playing state in message, because it has changed
            _currentJsonMsg.setPlayingState(playingState);
        }
        // Set the action in the message
        _currentJsonMsg.setAction(QVariant(TimeBarJsModel::CURR_TIME_UPD_ACTIONTYPE));
        // Send the message
        sendMessage();
    }
}

/*!***************************************************************************
 * Method : TimeBarJsManager::startTimeDragged
 * Purpose : Take into account a mouse drop of the start time
*****************************************************************************/
void TimeBarJsManager::startTimeDragged()
{
    // Only take into account event when initialization has finished
    if(_isInitDone) {
        // Set the message content
        _currentJsonMsg.setWndStart(QVariant(_timeBarModel->getStartTime()));
        // Set the action in the message
        _currentJsonMsg.setAction(QVariant(TimeBarJsModel::START_TIME_UPD_ACTIONTYPE));
        // Send the message
        sendMessage();
    }
}

/*!***************************************************************************
 * Method : TimeBarJsManager::endTimeDragged
 * Purpose : Take into account a mouse drop of the start time
*****************************************************************************/
void TimeBarJsManager::endTimeDragged()
{
    // Only take into account event when initialization has finished
    if(_isInitDone) {
        // Set the message content
        _currentJsonMsg.setWndEnd(QVariant(_timeBarModel->getEndTime()));
        // Set the action in the message
        _currentJsonMsg.setAction(QVariant(TimeBarJsModel::END_TIME_UPD_ACTIONTYPE));
        // Send the message
        sendMessage();
    }
}

/*!***************************************************************************
 * Method : TimeBarJsManager::realtimeSwitchBegins
 * Purpose : Take into account the beginning of a state change into realtime playing
*****************************************************************************/
void TimeBarJsManager::realtimeSwitchBegins()
{
    // Only take into account event when initialization has finished
    if(_isInitDone) {
        // Only update the playing state in the message, because other fields may be updated soon
        _currentJsonMsg.setPlayingState(QVariant(TimeBarJsModel::REALTIME_PLAYINGSTATE));
        // Set realtime switched as started
        _isRealtimeSwitch = true;
    }
}

/*!***************************************************************************
 * Method : TimeBarJsManager::realtimeSwitchEnds
 * Purpose : Take into account the end of a state change into realtime playing
*****************************************************************************/
void TimeBarJsManager::realtimeSwitchEnds()
{
    // Only take into account event when initialization has finished
    if(_isInitDone) {
        // At this time, all the data changed due to real-time entering has been update, so message can be sent
        // Set the action in the message
        _currentJsonMsg.setAction(QVariant(TimeBarJsModel::PLAY_STATE_UPD_ACTIONTYPE));
        // Send the message
        sendMessage();
        // Set realtime switched as ended
        _isRealtimeSwitch = false;
    }
}

/*!***************************************************************************
 * Method : TimeBarJsManager::playingStarted
 * Purpose : Take into account a entering in playing state (replay)
*****************************************************************************/
void TimeBarJsManager::playingStarted()
{
    // Only take into account event when initialization has finished
    if(_isInitDone) {
        // Set the message content
        _currentJsonMsg.setPlayingState(QVariant(TimeBarJsModel::REPLAY_PLAYINGSTATE));
        // Set the action in the message
        _currentJsonMsg.setAction(QVariant(TimeBarJsModel::PLAY_STATE_UPD_ACTIONTYPE));
        // Send the message
        sendMessage();
    }
}

/*!***************************************************************************
 * Method : TimeBarJsManager::playingPaused
 * Purpose : Take into account a pause in playing
*****************************************************************************/
void TimeBarJsManager::playingPaused()
{
    // Only take into account event when initialization has finished
    if(_isInitDone) {
        // Set the message content
        _currentJsonMsg.setPlayingState(QVariant(TimeBarJsModel::PAUSE_PLAYINGSTATE));
        // Set the action in the message
        _currentJsonMsg.setAction(QVariant(TimeBarJsModel::PLAY_STATE_UPD_ACTIONTYPE));
        // Send the message
        sendMessage();
    }
}

/*!***************************************************************************
 * Method : TimeBarJsManager::currentTimeUpdated
 * Purpose : Take into account an update of current time
*****************************************************************************/
void TimeBarJsManager::currentTimeUpdated()
{
    // Only take into account event when initialization has finished
    if(_isInitDone) {
        // Set the message content
        _currentJsonMsg.setCurrentTime(QVariant(_timeBarModel->getCurrentTime()));
        // Set the action in the message
        _currentJsonMsg.setAction(QVariant(TimeBarJsModel::CURR_TIME_UPD_ACTIONTYPE));
        // Send the message if we are not switching to realtime
        if(_isRealtimeSwitch == false) {
            sendMessage();
        }
    }
}

/*!***************************************************************************
 * Method : TimeBarJsManager::visuWindowPosUpdated
 * Purpose : Take into account an update of visualization window position when playing
*****************************************************************************/
void TimeBarJsManager::visuWindowPosUpdated()
{
    // Only take into account event when initialization has finished
    if(_isInitDone) {
        // Set the message content
        _currentJsonMsg.setWindPosData(QVariant(_timeBarModel->getStartTime()),QVariant(_timeBarModel->getCurrentTime()),
                                       QVariant(_timeBarModel->getEndTime()));
        // Set the action in the message
        _currentJsonMsg.setAction(QVariant(TimeBarJsModel::VISU_POS_UPD_ACTIONTYPE));
        // Send the message if we are not switching to realtime
        if(_isRealtimeSwitch == false) {
            // Send the message
            sendMessage();
        }
    }
}

/*!***************************************************************************
 * Method : TimeBarJsManager::currentTimeExtendVisuWnd
 * Purpose : Take into account an update of visualization window position when playing
*****************************************************************************/
void TimeBarJsManager::currentTimeExtendVisuWnd()
{
    // Only take into account event when initialization has finished
    if(_isInitDone) {
        // Set the message content
        _currentJsonMsg.setWindPosData(QVariant(_timeBarModel->getStartTime()),QVariant(_timeBarModel->getCurrentTime()),
                                       QVariant(_timeBarModel->getEndTime()));
        // Set the action in the message
        _currentJsonMsg.setAction(QVariant(TimeBarJsModel::VISU_POS_UPD_ACTIONTYPE));
        // Send the message if we are not switching to realtime
        if(_isRealtimeSwitch == false) {
            // Send the message
            sendMessage();
        }
    }
}

/*!***************************************************************************
 * Method : TimeBarJsManager::timebarDataSaveRequested
 * Purpose : Warn that user request a save of all timebar data
*****************************************************************************/
void TimeBarJsManager::timebarDataSaveRequested()
{
    // Only take into account event when initialization has finished
    if(_isInitDone) {
        // Set the action in the message
        _currentJsonMsg.setAction(QVariant(TimeBarJsModel::TB_SAVE_ACTIONTYPE));
        // Send the message
        sendMessage();
    }
}

/*!***************************************************************************
 * Method : TimeBarJsManager::speedUpdated
 * Purpose : Take into account a playing speed
*****************************************************************************/
void TimeBarJsManager::speedUpdated(core::BOOL isPlayingStateUpd)
{
    QString playingState;
    // Only take into account event when initialization has finished
    if(_isInitDone) {
        // Set the message content
        _currentJsonMsg.setSpeed(QVariant(_timeBarModel->getVisualizationSpeed()));
        // Check if playing state has been updated
        if(isPlayingStateUpd) {
            // Compute the playing state from data model
            playingState = computePlayingState();
            // Set the playing state in message, because it has changed
            _currentJsonMsg.setPlayingState(playingState);
        }
        // Set the action in the message
        _currentJsonMsg.setAction(QVariant(TimeBarJsModel::SPEED_UPD_ACTIONTYPE));
        // Send the message if we are not switching to realtime
        if(_isRealtimeSwitch == false) {
            // Send the message
            sendMessage();
        }
    }
}

/*!***************************************************************************
 * Method : TimeBarJsManager::timelineAdded
 * Purpose : Take into account a new timeline
*****************************************************************************/
void TimeBarJsManager::timelineAdded(core::INT32 tlId,timeBarsModel::Timeline* model,core::BOOL isMaster)
{
    TlType sessionType(TlType::TL_SESSION);
    TlType tlType(model->getType());
    QString sessionName(QString::null);

    // Add the timeline unique id to the list of known ids
    _timelinesMap[tlId] = model;

    // Check if the timeline is a session one
    if(model->getType().compare(sessionType.name()) == 0) {
        // Add session timeline in the message
        _currentJsonMsg.addSessionTimeline(QVariant(tlId),QVariant(model->getName()),QVariant(tlType.name()),
                                           QVariant(model->getOffset()),QVariant(model->getRef()));
        // Check if this session is the master one
        if(isMaster) {
            // Fill only the master session id in the message
            _currentJsonMsg.setMasterTlId(QVariant(tlId));
        }
    } else {
        // Add the timeline in the message
        _currentJsonMsg.addTimeline(QVariant(tlId),QVariant(model->getName()),QVariant(tlType.name()),
                                    QVariant(model->getOffset()),QVariant(model->getRef()));
    }
    // Check if we are in initialization
    if(_isInitDone) {
        // Set the action in the message
        _currentJsonMsg.setAction(QVariant(TimeBarJsModel::TL_ADDED_ACTIONTYPE));
        // Send the message
        sendMessage();
    }
    // Don't send the message otherwise, this will be done at the end of the initialization
}

/*!***************************************************************************
 * Method : TimeBarJsManager::timelineRemoved
 * Purpose : Remove a timeline
*****************************************************************************/
void TimeBarJsManager::timelineRemoved(core::INT32 tlId, core::BOOL isMaster)
{
    // Remove the timeline unique id from the list of known ids
    _timelinesMap.remove(tlId);
    // Put the removed timeline id in the message
    _currentJsonMsg.removeTimeline(QVariant(tlId));
    // Clean the id of the master timeline in case the removed timeline is the master one
    if(isMaster) {
        _currentJsonMsg.setMasterTlId(QVariant(""));
    }

    // Only take into account event when initialization has finished
    if(_isInitDone) {
        // Set the action in the message
        _currentJsonMsg.setAction(QVariant(TimeBarJsModel::TL_REMOVED_ACTIONTYPE));
        // Send the message
        sendMessage();
    }
}

/*!***************************************************************************
 * Method : TimeBarJsManager::timelineOffsetUpdated
 * Purpose : Take into account a new timeline offset
*****************************************************************************/
void TimeBarJsManager::timelineOffsetUpdated(core::INT32 tlId, qint64 offset)
{
    // Only take into account event when initialization has finished
    if(_isInitDone) {
        // Set the message content
        _currentJsonMsg.updateTimelineOffset(QVariant(tlId),QVariant(offset));
        // Set the action in the message
        _currentJsonMsg.setAction(QVariant(TimeBarJsModel::TL_OFFSET_UPD_ACTIONTYPE));
        // Send the message
        sendMessage();
    }
}

/*!***************************************************************************
 * Method : TimeBarJsManager::timelineNameUpdated
 * Purpose : Take into account a new timeline name
*****************************************************************************/
void TimeBarJsManager::timelineNameUpdated(core::INT32 tlId, QString newName)
{
    // Only take into account event when initialization has finished
    if(_isInitDone) {
        // Set the message content
        _currentJsonMsg.updateTimelineName(QVariant(tlId),QVariant(newName));
        // Set the action in the message
        _currentJsonMsg.setAction(QVariant(TimeBarJsModel::TL_NAME_UPD_ACTIONTYPE));
        // Send the message
        sendMessage();
    }
}


/*!***************************************************************************
 * Method : TimeBarJsManager::visualizationModeModified
 * Purpose : Called on visualization mode update
*****************************************************************************/
void TimeBarJsManager::visualizationModeModified()
{
    // Only take into account event when initialization has finished
    if(_isInitDone) {
        // Set the message content
        _currentJsonMsg.setMode(QVariant(_timeBarModel->getVisualizationMode()));
        // Set the action in the message
        _currentJsonMsg.setAction(QVariant(TimeBarJsModel::VISU_MODE_UPD_ACTIONTYPE));
        // Send the message
        sendMessage();
    }
}

/*!***************************************************************************
 * Method : TimeBarJsManager::lowerSlideLimitModified
 * Purpose : Called on lower sliding mode limit update
*****************************************************************************/
void TimeBarJsManager::lowerSlideLimitModified()
{
    // Only take into account when initialization done
    if(_isInitDone) {
        // Set the message content
        _currentJsonMsg.setSlideModeData(QVariant(_timeBarModel->getLowerSlideLimit()),QVariant(_timeBarModel->getUpperSlideLimit()));
        // Only send message when not playing nor state switching
        if((_timeBarModel->getIsPlaying() == false) && (_isRealtimeSwitch ==  false) && (_ignoreTbModelEvt ==  false)) {
            // Set the action in the message
            _currentJsonMsg.setAction(QVariant(TimeBarJsModel::SLIDE_LIMITS_UPD_ACTIONTYPE));
            // Send the message
            sendMessage();
        }
    }
}

/*!***************************************************************************
 * Method : TimeBarJsManager::upperSlideLimitModified
 * Purpose : Called on lower sliding mode limit update
*****************************************************************************/
void TimeBarJsManager::upperSlideLimitModified()
{
    // Only take into account when initialization done
    if(_isInitDone) {
        // Set the message content
        _currentJsonMsg.setSlideModeData(QVariant(_timeBarModel->getLowerSlideLimit()),QVariant(_timeBarModel->getUpperSlideLimit()));
        // Only send message when not playing nor state switching
        if((_timeBarModel->getIsPlaying() == false) && (_isRealtimeSwitch ==  false) && (_ignoreTbModelEvt ==  false)) {
            // Set the action in the message
            _currentJsonMsg.setAction(QVariant(TimeBarJsModel::SLIDE_LIMITS_UPD_ACTIONTYPE));
            // Send the message
            sendMessage();
        }
    }
}

/*!***************************************************************************
 * Method : TimeBarJsManager::upperExtendedLimitModified
 * Purpose : Called on lower extended mode limit update
*****************************************************************************/
void TimeBarJsManager::upperExtendedLimitModified()
{
    // Only take into account when initialization done
    if(_isInitDone) {
        // Set the message content
        _currentJsonMsg.setExtendedModeData(QVariant(_timeBarModel->getUpperExtendedLimit()));
        // Only send message when not playing nor state switching
        if((_timeBarModel->getIsPlaying() == false) && (_isRealtimeSwitch ==  false) && (_ignoreTbModelEvt ==  false)) {
            // Set the action in the message
            _currentJsonMsg.setAction(QVariant(TimeBarJsModel::EXT_LIMITS_UPD_ACTIONTYPE));
            // Send the message
            sendMessage();
        }
    }
}

/*!***************************************************************************
 * Method : TimeBarJsManager::defaultVisuWindowWidthModified
 * Purpose : Called on default visualization width update
*****************************************************************************/
void TimeBarJsManager::defaultVisuWindowWidthModified()
{
    // Only take into account event when initialization has finished
    if(_isInitDone) {
        // Set the message content
        _currentJsonMsg.setWindPosDefaultWidth(QVariant(_timeBarModel->getDefaultVisuWindowWidth()));
    }
}

/*!***************************************************************************
 * Method : TimeBarJsManager::rulerDataModified
 * Purpose : Called on ruler data update
*****************************************************************************/
void TimeBarJsManager::rulerDataModified()
{
    // Only take into account event when initialization has finished
    if(_isInitDone) {
        // Set the message content
        _currentJsonMsg.setTimebarRuler(QVariant(_timeBarModel->getTimeBarLeftBorderTimeInMsSinceEpoch()),
                                        QVariant(_timeBarModel->getNbMsInPixel()));
    }
}

/*!***************************************************************************
 * Method : TimeBarJsManager::timeSpecDataModified
 * Purpose : Called on time specification data update
*****************************************************************************/
void TimeBarJsManager::timeSpecDataModified()
{
    // Only take into account event when initialization has finished
    if(_isInitDone) {
        // Set the message content
        _currentJsonMsg.setTimeSpec(QVariant(_timeBarModel->getTimeSpec()),QVariant(_timeBarModel->getOffsetFromUTC()));
    }
}

/*!***************************************************************************
 * Method : TimeBarJsManager::computePlayingState
 * Purpose : Compute the playing state from the data model
*****************************************************************************/
QString TimeBarJsManager::computePlayingState()
{
    QString ret_val;

    // Check the two boolean to map the four possible states to the three meaningful ones
    // being in real-time and not playing is not functionally possible
    if(_timeBarModel->getIsRealTime()) {
        ret_val = TimeBarJsModel::REALTIME_PLAYINGSTATE;
    } else if(_timeBarModel->getIsPlaying()==false) {
        ret_val = TimeBarJsModel::PAUSE_PLAYINGSTATE;
    } else {
        ret_val = TimeBarJsModel::REPLAY_PLAYINGSTATE;
    }
    return ret_val;
}

/*!***************************************************************************
 * Method : TimeBarJsManager::sendMessage
 * Purpose : Send the current json message to clients
*****************************************************************************/
void TimeBarJsManager::sendMessage()
{
    // If socket creation has succeeded, send the json message
    if(_socketId) {
        // Send the message
        TimeBarSocket::get()->send(_socketId,_currentJsonMsg.toJson());
    }
}

}
