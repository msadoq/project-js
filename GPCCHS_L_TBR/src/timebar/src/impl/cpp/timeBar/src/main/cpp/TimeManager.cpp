/*!*******************************************************************
 * Project : ISIS
 * Component : GPCC-timeBar
 * \file TimeManager.cpp
 * \author ohuyard
 * \date June 4, 2014
 * \brief This class manage time and dispatch events for the timeBar
 ********************************************************************/

/********************************************************************
 * HISTORY
 *
 * END-HISTORY
 ********************************************************************/

#include <QtCore/QCoreApplication>
#include <QtCore/QDebug>

#include "core/UINT32.h"

#include "commonMMI/GUIApplication.h"

#include "timeBar/TimeBarTypes.h"
#include "timeBar/TimeManager.h"
#include "timeBar/TimeManagers.h"

namespace timeBar
{

const core::INT32 TimeManager::NORMAL_TIME_SIMU_PERIOD_MS = 100;
const core::INT32 TimeManager::JS_TIME_SIMU_PERIOD_MS = 250;

/*!***************************************************************************
 * Method : sessionDataComp
 * Purpose : Return True if the sessionData j has a name which is after the one of sessionData i in Latin1 alphabetical order
 ****************************************************************************/
bool sessionDataComp(sessionData i, sessionData j) {
    return (i.name<j.name);
}

/*!***************************************************************************
 * Method : TimeManager::TimeManager
 * Purpose : TimeManager Constructor
 ****************************************************************************/
TimeManager::TimeManager() :
        QObject()
{
    // Javascript mode is disabled by default
    _isJavascriptModeActive = false;

	// Initialize default time simulation update frequency to 10Hz
	_timebaseIncrementMs = NORMAL_TIME_SIMU_PERIOD_MS;

    // Create the time base for simulation and real-time
    _playingTimer = new QTimer(this);
    connect(_playingTimer, &QTimer::timeout, this, &TimeManager::timerEvent);
    _playingTimer->setInterval(_timebaseIncrementMs);

    // Initialize TimeManager state
    _last_current_time = 0;
    _last_start_time = 0;
    _last_end_time = 0;
    // Upon initialization, we assume we are not in real-time
    _msSinceEpochOfLastTimerEvent = QDateTime::currentMSecsSinceEpoch();
    // Initialize the master session unique Id to invalid value
    _masterSessionUniqueTlId = 0;

    // Initialize time specification to local time
    _datesTimeSpec = Qt::LocalTime;

    // Initialize the data model pointer
    _tb = 0;

    // Initialize the timelines model pointer
    _timelinesModel = 0;

    // Initialize reference to TimeBarJsManager
    _jsManager = 0;
}

/*!***************************************************************************
 * Method : TimeManager::~TimeManager
 * Purpose : TimeManager Destructor
 ****************************************************************************/
TimeManager::~TimeManager()
{
    // Perform a try catch according to coding rule
    try {
        // Disconnect from all signals
        // Delete TimeBarJsManager if created
        if(_jsManager) {
            delete _jsManager;
            _jsManager = 0;
        }

        // QTimer signal disconnection
        disconnect(_playingTimer, &QTimer::timeout, this, &TimeManager::timerEvent);

        // Visualization window model update signals disconnection
        if(_tb) {
            disconnect(_tb, &timeBarsModel::TimeBar::currentTimeModified, this, &TimeManager::currentTimeModified);
            disconnect(_tb, &timeBarsModel::TimeBar::startTimeModified, this, &TimeManager::startTimeModified);
            disconnect(_tb, &timeBarsModel::TimeBar::endTimeModified, this, &TimeManager::endTimeModified);
            disconnect(_tb, &timeBarsModel::TimeBar::isPlayingModified, this, &TimeManager::isPlayingModified);
            disconnect(_tb, &timeBarsModel::TimeBar::isRealTimeModified, this, &TimeManager::isRealTimeModified);
            disconnect(_tb, &timeBarsModel::TimeBar::visualizationSpeedModified, this, &TimeManager::visualizationSpeedModified);
            disconnect(_tb, &timeBarsModel::TimeBar::timelinesModified, this, &TimeManager::timelinesModified);
            disconnect(TimeManagers::get(), &TimeManagers::timelinesIdsUpdated, this, &TimeManager::updateTimelinesIds);
        }
        // Timelines data model update signals disconnection after removing timelines from this data model
        if(_timelinesModel) {
            disconnect(_timelinesModel, &timeBarsModel::Timelines::timelineAdded, this, &TimeManager::timelineAdded);
            disconnect(_timelinesModel, &timeBarsModel::Timelines::timelineRemoved, this, &TimeManager::timelineRemoved);
        }

        // Delete QTimer
        delete _playingTimer;

        // Delete timelines routers
        foreach( timeLineData tldata, _timelinesMap) {
            if (tldata.router) {
                delete tldata.router;
                tldata.router = 0;
            }
        }
    }
    catch (...) {
        // Nothing to do
    }
}

/*!***************************************************************************
 * Method : TimeManager::computeTimelineData
 * Purpose : Compute the data structure for a single timeline
 ****************************************************************************/
void TimeManager::computeTimelineData(const core::INT64 offset, TimeBarEventListener::timeLineEventData * tlData)
{
    // Write visualization start time data
    tlData->start.setTimeSpec(_datesTimeSpec);
    if(_datesTimeSpec == Qt::OffsetFromUTC) {
        tlData->start.setOffsetFromUtc(_tb->getOffsetFromUTC());
    }
    // Substract the offset because if the timeline has been dragged in the future (on the right) by 2hrs, visualization window bar will be at 10h inside it instead at 12h on the timescale
    tlData->start.setMSecsSinceEpoch(_tb->getStartTime()-offset);

    // Write visualization end time data
    tlData->end.setTimeSpec(_datesTimeSpec);
    if(_datesTimeSpec == Qt::OffsetFromUTC) {
        tlData->end.setOffsetFromUtc(_tb->getOffsetFromUTC());
    }
    tlData->end.setMSecsSinceEpoch(_tb->getEndTime()-offset);

    // Write current time data
    tlData->current.setTimeSpec(_datesTimeSpec);
    if(_datesTimeSpec == Qt::OffsetFromUTC) {
        tlData->current.setOffsetFromUtc(_tb->getOffsetFromUTC());
    }
    tlData->current.setMSecsSinceEpoch(_tb->getCurrentTime()-offset);
}

/*!***************************************************************************
 * Method : TimeManager::computeEventData
 * Purpose : Compute the event data structure to give to subscriber when a visualization window element has been updated
 ****************************************************************************/
void TimeManager::computeEventData(const bool start, const bool end, const bool current, TimeBarEventListener::timeBarEventData * eventData)
{
    // Initialize updated timeline id to invalid value (meaning all timelines have been updated). This field may be overwritten by caller
    eventData->updTl = 0;

    // Set the master timeline id
    eventData->masterTlId = _masterSessionUniqueTlId;

    // Update event global flags
    eventData->updElts = 0;
    if(start) {
        eventData->updElts|=TimeBarEventListener::VISU_WND_ELT_START_TIME;
    }
    if(end) {
        eventData->updElts|=TimeBarEventListener::VISU_WND_ELT_END_TIME;
    }
    if(current) {
        eventData->updElts|=TimeBarEventListener::VISU_WND_ELT_CURRENT_TIME;
    }

    // Update timelines related event data
    QMapIterator<core::INT32,timeLineData> iter(_timelinesMap);
    TimeBarEventListener::timeLineEventData tlData;
    core::INT64 offset = 0;
    core::INT32 tlId = 0;
    while (iter.hasNext()) {
        iter.next();
        tlId = iter.key();
        offset = iter.value().model->getOffset();

        computeTimelineData(offset,&tlData);

        eventData->tlEvents[tlId] = tlData;
    }
}

/*!***************************************************************************
 * Method : TimeManager::subscribeToAll
 * Purpose : Subscribe a listener to visualization window position and current time position update events
 ****************************************************************************/
void TimeManager::subscribeToAll(TimeBarEventListener *listener)
{
    TimeBarEventListener::timeBarEventData eventData;

    // Store the trigger activation status
    _listenersMap[listener].setToWndPosType(true);
    _listenersMap[listener].setCurTimePosType(true);

    // If the data model has been set, trigger the subscribers
    if(_tb) {
        // Generate the event data
        computeEventData(true, true, true, &eventData);

        // trigger the subscriber
        listener->updateWindowElts(eventData);
    }
}

/*!***************************************************************************
 * Method : TimeManager::subscribeToCurTimePos
 * Purpose : Subscribe a listener to current time position update events
 ****************************************************************************/
void TimeManager::subscribeToCurTimePos(TimeBarEventListener *listener)
{
    TimeBarEventListener::timeBarEventData eventData;

    // Store the trigger activation status
    _listenersMap[listener].setCurTimePosType(true);

    // If the data model has been set, trigger the subscribers
    if(_tb) {
        // Generate the event data
        computeEventData(false, false, true, &eventData);

        // Trigger the subscribers
        listener->updateWindowElts(eventData);
    }
}

/*!***************************************************************************
 * Method : TimeManager::unsubscribeFromCurTimePos
 * Purpose : Unsubscribe a listener from current time position update events
 ****************************************************************************/
void TimeManager::unsubscribeFromCurTimePos(TimeBarEventListener *listener)
{
    // If subscriber is known, update its subscription
    if(_listenersMap.contains(listener)) {
        _listenersMap[listener].setCurTimePosType(false);
    }
}

/*!***************************************************************************
 * Method : TimeManager::unsubscribeFromAll
 * Purpose : Unsubscribe a listener from all events
 ****************************************************************************/
void TimeManager::unsubscribeFromAll(TimeBarEventListener *listener)
{
    // If subscriber is known, update its subscription
    if(_listenersMap.contains(listener)) {
        _listenersMap[listener].setToWndPosType(false);
        _listenersMap[listener].setCurTimePosType(false);
    }
}

/*!***************************************************************************
 * Method : TimeManager::getTimelinesIds
 * Purpose : Get the list of unique id of timelines with name matching to regular expression
 ****************************************************************************/
void TimeManager::getTimelinesIds(const QRegExp & regExp, QList<core::INT32> * tlIds)
{
    if(_timelinesMap.count()>0) {
        QMapIterator<core::INT32,timeLineData> iter(_timelinesMap);
        tlIds->clear();
        while (iter.hasNext()) {
            iter.next();
            // Look for the timelines with name matching the regular expression
            if(regExp.exactMatch(iter.value().model->getName())) {
                tlIds->append(iter.key());
            }
        }
    }
}

/*!***************************************************************************
 * Method : TimeManager::getSessionsIds
 * Purpose : Get the list of GPIN session ids of timelines with name matching to regular expression
 ****************************************************************************/
void TimeManager::getSessionsIds(const QRegExp & regExp, QList<core::INT32> * sessionIds)
{

    if(_timelinesMap.count()>0) {
        QMapIterator<core::INT32,timeLineData> iter(_timelinesMap);
        sessionIds->clear();
        while (iter.hasNext()) {
            iter.next();
            // Look for the timelines with name matching the regular expression
            if(regExp.exactMatch(iter.value().model->getName())) {
                sessionIds->append(iter.value().model->getRef().toInt());
            }
        }
    }

}

/*!***************************************************************************
 * Method : TimeManager::setvisuWindowPos
 * Purpose : update the visualization window start and end boundaries coherently, called on release event of mouse drag in TimeBarWidget
 ****************************************************************************/
void TimeManager::setvisuWindowPos(const core::INT64 &start, const core::INT64 &end,const core::INT64 &curr,const core::INT64 &lowSlideLim,const core::INT64 &upSlideLim,const core::INT64 &upExtLim)
{
    core::BOOL isPlayingStateUpd = false;
    // Store the most recent known visualization window elements position to be able to avoid redundant triggers
    _last_current_time = curr;
    _last_start_time = start;
    _last_end_time = end;

    // Warn the javascript manager about the update of data model due to mouse drag of visualization window
    if(_jsManager) {
    	_jsManager->visuWindowMouseDragEvent();
    }

    // Update visualization window elements in data model
    _tb->setLowerSlideLimit(lowSlideLim);
    _tb->setUpperSlideLimit(upSlideLim);
    _tb->setUpperExtendedLimit(upExtLim);
    _tb->setStartTime(start);
    _tb->setEndTime(end);
    _tb->setCurrentTime(curr);

    // Trigger coherent update of subscribers
    triggerUpdate(true,true,true);

    // Check if real-time shall be exited
    if(_tb->getIsRealTime() == true) {
        // Record the playing state update
        isPlayingStateUpd = true;
        // Also exit real-time mode due to mouse drag
        _tb->setIsRealTime(false);
    }

    // Warn the javascript manager about the end of data model update linked to visualization window drag
    if(_jsManager) {
    	_jsManager->visuWindowMouseDropEvent(isPlayingStateUpd);
    }
}

/*!***************************************************************************
 * Method : TimeManager::setMasterSession
 * Purpose : Update the master session
 ****************************************************************************/
void TimeManager::setMasterSession(timeBarsModel::Timeline* tlPtr)
{
    core::INT32 id=0;
    QMapIterator<core::INT32,timeLineData> iter(_timelinesMap);
    // Don't clear _tlIdsForOfsUpdDrop to be able to manage two master session change at a time
    core::INT64 masterSessOfs = tlPtr->getOffset();
    core::INT64 oldOfs = 0;
    core::INT64 newOfs = 0;

    // Warn the javascript manager about the start of master session change
    if(_jsManager) {
    	_jsManager->masterSessionUpdateStart();
    }

    // Look for the timeline with given data model address
    while (iter.hasNext()) {
        iter.next();
        if(iter.value().model == tlPtr) {
            id = iter.key();
        }
        // Check the new and old offset of each timeline in order to know if the offset update signal will be raised (to drop it)
        oldOfs = iter.value().model->getOffset();
        // Subtract the offset of the new master session from all the timelines offsets (including the new master one to get null offset for it)
        newOfs = oldOfs - masterSessOfs;
        // If old and new offset are different, a signal will be raised when we will update the timeline offset, so we need to ignore it
        if(oldOfs != newOfs) {
            // Add each timeline to the list of timeline offset event to drop
            _tlIdsForOfsUpdDrop.append(iter.key());
        }
        // Update the new offset in the data model (which will raise a signal if it is different from the old offset)
        iter.value().model->setOffset(newOfs);
    }

    // Update master session unique id
    _masterSessionUniqueTlId = id;

    // Update the known visualization window elements position to avoid triggers
    _last_current_time = _tb->getCurrentTime() - masterSessOfs;
    _last_start_time = _tb->getStartTime() - masterSessOfs;
    _last_end_time = _tb->getEndTime() - masterSessOfs;

    // Update visualization window elements in data model
    _tb->setLowerSlideLimit(_tb->getLowerSlideLimit() - masterSessOfs);
    _tb->setUpperSlideLimit(_tb->getUpperSlideLimit() - masterSessOfs);
    _tb->setUpperExtendedLimit(_tb->getUpperExtendedLimit() - masterSessOfs);
    _tb->setStartTime(_last_start_time);
    _tb->setEndTime(_last_end_time);
    _tb->setCurrentTime(_last_current_time);

    // Emit signal to trigger the widget to refresh its labels
    emit timelinesOfsUpdated();

    // Warn the javascript manager about the end of master session change
    if(_jsManager) {
    	_jsManager->masterSessionUpdateEnd(_masterSessionUniqueTlId);
    }
}

/*!***************************************************************************
 * Method : TimeManager::getSessionsList
 * Purpose : Get the list of the available sessions
 ****************************************************************************/
void TimeManager::getSessionsList(QList<sessionData> * list)
{
    // Forward the request to TimeManagers
    TimeManagers::get()->getSessionsList(list);
}

/*!***************************************************************
 * Method : getTimeLineNamesFromSessionID
 *
 * Get the list of corresponding time line names sharing same sessionID
 *****************************************************************/
QList<QString> TimeManager::getTimeLineNamesFromSessionID(core::INT32 sessionID)
{
    QList<QString> returnedList;
    QString stringSessionID = QString("%1").arg(sessionID);
    foreach( timeLineData tldata, _timelinesMap) {
        if (tldata.model->getRef().compare(stringSessionID) == 0) {
            returnedList.append(tldata.model->getName());
        }
    }
    return returnedList;
}

/*!***************************************************************************
 * Method : TimeManager::saveTimeBarData
 * Purpose : Warn that user request a save of all timebar data
 ****************************************************************************/
void TimeManager::saveTimeBarData()
{
    if(_jsManager) {
        // Forward the request to TimeBarJsManager
        _jsManager->timebarDataSaveRequested();
    }
}

/*!***************************************************************************
 * Method : TimeManager::updateSessionsList
 * Purpose : Trigger the request of session list to infrastructure
 ****************************************************************************/
void TimeManager::updateSessionsList()
{
    // Forward the request to TimeManagers
    TimeManagers::get()->updateSessionsList();
}


/*!***************************************************************************
 * Method : TimeManager::populate
 * Purpose : Populate the time bar from its data model
 ****************************************************************************/
void TimeManager::populate(timeBarsModel::TimeBar *tb,core::UINT32 socketID)
{
    // Save pointer to data model
    _tb = tb;

    // Initialize the javascript manager if the configuration for it is received
    if( socketID ) {
    	// Activate the javascript mode
    	_isJavascriptModeActive = true;
    	// Create the JsonManager
    	_jsManager = new TimeBarJsManager(_tb,socketID,this);
    	// Update time simulation frequency to reduce its value to 4Hz
    	_timebaseIncrementMs = JS_TIME_SIMU_PERIOD_MS;
    	_playingTimer->setInterval(_timebaseIncrementMs);
    }

    // Save current visualization window elements positions to be able to detect double triggers
    _last_current_time = _tb->getCurrentTime();
    _last_start_time = _tb->getStartTime();
    _last_end_time = _tb->getEndTime();

    // Read and convert the time specification
    if( _tb->getTimeSpec().compare("OffsetFromUTC",Qt::CaseInsensitive) == 0 ) {
        _datesTimeSpec = Qt::OffsetFromUTC;
    } else if( _tb->getTimeSpec().compare("UTC",Qt::CaseInsensitive) == 0 ) {
        _datesTimeSpec = Qt::UTC;
    } else {
        _datesTimeSpec = Qt::LocalTime;
    }

    // Check if there is timelines in the model
    if(tb->getTimelines()) {
		// Load the timelines data from the data model. This will also inform the TimeBarJsManager
		foreach(timeBarsModel::Timeline* tl, tb->getTimelines()->getTimelines()) {
			timelineAdded(tl);
		}
    }

    // Connect signals with slots
    timelinesModified();
    connect(_tb, &timeBarsModel::TimeBar::currentTimeModified, this, &TimeManager::currentTimeModified);
    connect(_tb, &timeBarsModel::TimeBar::startTimeModified, this, &TimeManager::startTimeModified);
    connect(_tb, &timeBarsModel::TimeBar::endTimeModified, this, &TimeManager::endTimeModified);
    connect(_tb, &timeBarsModel::TimeBar::isPlayingModified, this, &TimeManager::isPlayingModified);
    connect(_tb, &timeBarsModel::TimeBar::isRealTimeModified, this, &TimeManager::isRealTimeModified);
    connect(_tb, &timeBarsModel::TimeBar::visualizationSpeedModified, this, &TimeManager::visualizationSpeedModified);
    connect(_tb, &timeBarsModel::TimeBar::timelinesModified, this, &TimeManager::timelinesModified);

    // Connect to TimeManagers to take into account granted access to infrastructure
    connect(TimeManagers::get(), &TimeManagers::timelinesIdsUpdated, this, &TimeManager::updateTimelinesIds);

    // Call the update signals to let the time manager notification service take data model into account, order is very important due to relationship between parameters
    isPlayingModified();
    isRealTimeModified();
    visualizationSpeedModified();

    // Trigger all subscribers for initial visualization window position
    triggerUpdate(true,true,true);

    // Trigger javascript code for update
    if(_jsManager) {
    	_jsManager->initialUpdate();
    }
}

/*!***************************************************************************
 * Method : TimeManager::timelinesModified
 * Purpose : Triggered when the list of timelines is updated in order to subscribe to timelines updates
 ****************************************************************************/
void TimeManager::timelinesModified()
{
    // If the TimeManage is already connected to a timelines model, first disconnect
    if(_timelinesModel) {
        disconnect(_timelinesModel, &timeBarsModel::Timelines::timelineAdded, this, &TimeManager::timelineAdded);
        disconnect(_timelinesModel, &timeBarsModel::Timelines::timelineRemoved, this, &TimeManager::timelineRemoved);
    }
    // Then connect to the new timelines model
    if(_tb->getTimelines()) {
        _timelinesModel = _tb->getTimelines();
        connect(_timelinesModel, &timeBarsModel::Timelines::timelineAdded, this, &TimeManager::timelineAdded);
        connect(_timelinesModel, &timeBarsModel::Timelines::timelineRemoved, this, &TimeManager::timelineRemoved);
    }
}

/*!***************************************************************************
 * Method : TimeManager::timerEvent
 * Purpose : Called periodically to simulate a time base
 ****************************************************************************/
void TimeManager::timerEvent()
{
    core::INT64 timeIncrementMs;
    core::INT64 currentTime;

    // When a mouse drag is on-going in the timebar, wait for it to finish before taking into account new time events
    if(_tb->getIsDragOnGoing() == false) {
        // Read current time
        currentTime = getCurrentTime();
        // Compute time increment since last update
        timeIncrementMs =  static_cast<core::INT64>(static_cast<float>(currentTime -_msSinceEpochOfLastTimerEvent)*_tb->getVisualizationSpeed());
        // Update the position of all visualization window elements
        updateCurrentTime(timeIncrementMs);
        // Store the time reference of timer start
        _msSinceEpochOfLastTimerEvent = currentTime;
    }

}

/*!***************************************************************************
 * Method : TimeManager::currentTimeModified
 * Purpose : Called on current time update performed in the timebar by the user
 ****************************************************************************/
void TimeManager::currentTimeModified()
{
    core::BOOL isPlayingStateUpd = false;
    if(_tb->getCurrentTime() != _last_current_time ) {
        // If the new current time position is not know, this is a reaction on mouse drag, so trigger the subscribers
        triggerUpdate(false,false,true);
        // and store this new current time position as a known one
       _last_current_time = _tb->getCurrentTime();
       // Check if real-time shall be exited
       if(_tb->getIsRealTime() == true) {
           // Record the playing state update
           isPlayingStateUpd = true;
           // Also exit real-time mode due to mouse drag
           _tb->setIsRealTime(false);
       }
       // Trigger javascript code for update
       if(_jsManager) {
    	   _jsManager->currentTimeDragged(isPlayingStateUpd);
       }
    }
}

/*!***************************************************************************
 * Method : TimeManager::startTimeModified
 * Purpose : Called on visualization window start update performed in the timebar by the user
 ****************************************************************************/
void TimeManager::startTimeModified()
{
    // Only trigger subscribers if start time is different from the last one received
    if(_tb->getStartTime() != _last_start_time ) {
        triggerUpdate(true,false,false);
       _last_start_time = _tb->getStartTime();
       // Trigger javascript code for update
       if(_jsManager) {
    	   _jsManager->startTimeDragged();
       }
    }
}

/*!***************************************************************************
 * Method : TimeManager::endTimeModified
 * Purpose : Called on visualization window end update performed in the timebar by the user
 ****************************************************************************/
void TimeManager::endTimeModified()
{
    // Only trigger subscribers if end time is different from the last one received
    if(_tb->getEndTime() != _last_end_time ) {
        triggerUpdate(false,true,false);
       _last_end_time = _tb->getEndTime();
       // Trigger javascript code for update
       if(_jsManager) {
    	   _jsManager->endTimeDragged();
       }
    }
}

/*!***************************************************************************
 * Method : TimeManager::isRealTimeModified
 * Purpose : Called when the timebar enter or exit real-time status
 ****************************************************************************/
void TimeManager::isRealTimeModified()
{
    // Check if we enter or exit the real-time visualization
    if(_tb->getIsRealTime() == true) {
        // Trigger javascript managing object to start real-time state switch
        // We need to do it this way because the state machine of TimeManager need to be improved
    	if(_jsManager) {
    		_jsManager->realtimeSwitchBegins();
    	}
        // Set speed to x1.0 on real-time entering
        _tb->setVisualizationSpeed(1);
        // Put the current time on visualization window upper border
        if(_tb->getVisualizationMode().compare(VisuMode(VisuMode::TB_SLIDING_MODE).name()) == 0 ) {
            // In Sliding mode, put the current time on the upper sliding limit
            _last_current_time = _tb->getLowerSlideLimit();
            _tb->setCurrentTime(_last_current_time);
        } else {
            // In Normal and Extended modes, put the current time on visualization window end border
            _last_current_time = _tb->getEndTime();
            _tb->setCurrentTime(_last_current_time);
        }
        // Update the position of all visualization window elements
        updateCurrentTime(getCurrentTime() - _tb->getCurrentTime());
        // Start playing if it was not
        if(_tb->getIsPlaying() == false) {
            _tb->setIsPlaying(true);
        }
        // Trigger javascript managing object to end real-time state switch
        if(_jsManager) {
        	_jsManager->realtimeSwitchEnds();
        }
    }
}

/*!***************************************************************************
 * Method : TimeManager::isPlayingModified
 * Purpose : Called when the timebar playing is started or paused
 ****************************************************************************/
void TimeManager::isPlayingModified()
{
    // Check the type of transition
    if(_tb->getIsPlaying() == true) {
        // Store the time reference of timer start
        _msSinceEpochOfLastTimerEvent = getCurrentTime();
        // Start time simulation timer
        _playingTimer->start();
        // Trigger javascript code for update only if not in real-time (in which case trigger already occured)
        if(_tb->getIsRealTime() == false && _jsManager) {
            _jsManager->playingStarted();
        }
    } else {
        // Stop time simulation timer
        _playingTimer->stop();
        // Exit real-time mode due to mouse drag
        _tb->setIsRealTime(false);
        // Trigger javascript code for update
        if(_jsManager) {
        	_jsManager->playingPaused();
        }
    }
}

/*!***************************************************************************
 * Method : TimeManager::visualizationSpeedModified
 * Purpose : Perform the necessary actions on visualization speed change
 ****************************************************************************/
void TimeManager::visualizationSpeedModified()
{
    core::BOOL isPlayingStateUpd = false;
    if(_tb->getVisualizationSpeed() != 1) {
        // Record the playing state update
        isPlayingStateUpd = true;
        // Also exit real-time mode due to mouse drag
        _tb->setIsRealTime(false);
    }
    // Trigger javascript code for update
    if(_jsManager) {
    	_jsManager->speedUpdated(isPlayingStateUpd);
    }
}

/*!***************************************************************************
 * Method : TimeManager::timelineAdded
 * Purpose : Perform the necessary actions on timeline opening in a timebar
 ****************************************************************************/
void TimeManager::timelineAdded(timeBarsModel::Timeline* timeline)
{
    TlType tlType(timeline->getType());
    core::UINT32 sessionId=0;
    core::INT32 tlId;
    core::BOOL isMaster=false;

    // Compute timeline data to retrieve and id
    if(tlType.value() == TlType::TL_SESSION) {
        sessionId = timeline->getRef().toUInt();
    }

    // Ask TimeManagers for a timeline unique id
    tlId = TimeManagers::get()->createUniqueTlId(tlType, sessionId);

    // Check if the timeline unique id has been created
    if(tlId) {
        // Create signal router for timelines updates and store timeline data model pointer
        _timelinesMap[tlId].router = new TimelineSignalRouter(this,tlId);
        _timelinesMap[tlId].model = timeline;

        // Check if this new timeline is the master one (this is true when this timeline is the first opened session)
        if( _tb->getTimelines()->getTimelines().indexOf(timeline) == _tb->getMasterSession()) {
            _masterSessionUniqueTlId = tlId;
            isMaster = true;
        }

        // Subscribe the TimeManager to offset modification signal
        connect(timeline, &timeBarsModel::Timeline::offsetModified, _timelinesMap[tlId].router, &TimelineSignalRouter::offsetModified);
        connect(timeline, &timeBarsModel::Timeline::nameModified,   _timelinesMap[tlId].router, &TimelineSignalRouter::timelineRenamed);

        // Check all the subscribers and trigger them if they has subscribed to at least one update
        // Create a copy of the list of listeners to trigger
        QListIterator<TimeBarEventListener *> listenerIter(_listenersMap.keys());
        // Create reference for the listener to call in the while loop
        TimeBarEventListener * currentListener = 0;
        TimeBarEventListener::timeLineEventData tlData;
        core::INT64 offset = timeline->getOffset();

        computeTimelineData(offset,&tlData);

        while (listenerIter.hasNext()) {
            currentListener = listenerIter.next();
            if( _listenersMap.contains(currentListener) &&
                (
                    _listenersMap[currentListener].isWndStartPosType() ||
                    _listenersMap[currentListener].isWndEndPosType() ||
                    _listenersMap[currentListener].isCurTimePosType()
                )
              )
            {
                // Trigger a subscriber
                // We assume that the content of _listenersMap can be updated within this function call, that's why we access the map with a QListIterator over a copy a the map keys
                currentListener->timelineAdded(tlId,tlData);
            }
        }

        // Trigger javascript code for timeline addition
        if(_jsManager) {
        	_jsManager->timelineAdded(tlId,timeline,isMaster);
        }
    } else {
        // If timeline hasn't been created, schedule it for later creation
        _tlToAdd.append(timeline);
    }
}

/*!***************************************************************************
 * Method : TimeManager::timelineRemoved
 * Purpose : Perform the necessary actions on timeline closing in a timebar
 ****************************************************************************/
void TimeManager::timelineRemoved(core::INT32 index, timeBarsModel::Timeline* timeline)
{
    QMapIterator<core::INT32, timeLineData> timlinesIter(_timelinesMap);
    core::INT32 tlId=0;
    core::BOOL isMaster = false;

    // Unsubscribe the TimeManager from offset modification signal
    while (timlinesIter.hasNext()) {
        timlinesIter.next();
        if( timlinesIter.value().model == timeline ) {
            tlId = timlinesIter.key();
            disconnect(timeline, &timeBarsModel::Timeline::offsetModified, timlinesIter.value().router, &TimelineSignalRouter::offsetModified);
            disconnect(timeline, &timeBarsModel::Timeline::nameModified,   timlinesIter.value().router, &TimelineSignalRouter::timelineRenamed);
        }
    }

    // If the removed timelines had a unique timeline id
    if(tlId) {
        // Check all the subscribers and trigger them if they has subscribed to at least one update
        // Create a copy of the list of listeners to trigger
        QListIterator<TimeBarEventListener *> listenerIter(_listenersMap.keys());
        // Create reference for the listener to call in the while loop
        TimeBarEventListener * currentListener = 0;

        while (listenerIter.hasNext()) {
            currentListener = listenerIter.next();
            if( _listenersMap.contains(currentListener) &&
                (
                    _listenersMap[currentListener].isWndStartPosType() ||
                    _listenersMap[currentListener].isWndEndPosType() ||
                    _listenersMap[currentListener].isCurTimePosType()
                )
              )
            {
                // Trigger a subscriber
                // We assume that the content of _listenersMap can be updated within this function call, that's why we access the map with a QListIterator over a copy a the map keys
                currentListener->timelineRemoved(tlId);
            }
        }
        // Check if this removed timeline is the master one
        if( tlId == _masterSessionUniqueTlId) {
            // Set the master session unique id to an invalid value
            _masterSessionUniqueTlId = 0;
            isMaster = true;
        }

        // Trigger javascript code for timeline removal
        if(_jsManager) {
        	_jsManager->timelineRemoved(tlId, isMaster);
        }

        // Remove the timeline from the _timelinesMap
        _timelinesMap.remove(tlId);

        // Remove the timeline from the TimeManagers
        TimeManagers::get()->removeTimeline(tlId);
    }
}

/*!***************************************************************************
 * Method : TimeManager::offsetModified
 * Purpose : Perform the necessary actions on timeline offset update
 ****************************************************************************/
void TimeManager::offsetModified(core::INT32 tlId, core::INT64 oldOffset, core::INT64 newOffset)
{
    // Create a copy of the list of listeners to trigger
    QListIterator<TimeBarEventListener *> listenerIter(_listenersMap.keys());
    // Create reference for the listener to call in the while loop
    TimeBarEventListener * currentListener = 0;
    TimeBarEventListener::timeBarEventData eventData;

    // Check if the event shall be dropped (which is the case upon change of master timeline)
    if(!_tlIdsForOfsUpdDrop.contains(tlId)) {
        // Generate the event data
        computeEventData(true, true, false, &eventData);

        // Set the id of the updated timeline
        eventData.updTl = tlId;

        // Check all the subscribers and trigger them if they has subscribed to at least one update
        while (listenerIter.hasNext()) {
            currentListener = listenerIter.next();
            if( _listenersMap.contains(currentListener) &&
                (
                    _listenersMap[currentListener].isWndStartPosType() ||
                    _listenersMap[currentListener].isWndEndPosType() ||
                    _listenersMap[currentListener].isCurTimePosType()
                )
              )
            {
                // Trigger a subscriber
                // We assume that the content of _listenersMap can be updated within this function call, that's why we access the map with a QListIterator over a copy a the map keys
                currentListener->updateWindowElts(eventData);
            }
        }

        // Trigger javascript code for update
        if(_jsManager) {
        	_jsManager->timelineOffsetUpdated(tlId, newOffset);
        }
    } else {
        // Remove the event we drop from the list
        // Remove only one event in case two changes of master session have been done since the last possible execution of this code
        _tlIdsForOfsUpdDrop.removeOne(tlId);
    }
}

/*!***************************************************************************
 * Method : TimeManager::timelineRenamed
 * Purpose : Perform the necessary actions on timeline renaming in a timebar
 ****************************************************************************/
void TimeManager::timelineRenamed(core::INT32 tlId, const QString & oldName, const QString & newName)
{
    // Create a copy of the list of listeners to trigger
    QListIterator<TimeBarEventListener *> listenerIter(_listenersMap.keys());
    // Create reference for the listener to call in the while loop
    TimeBarEventListener * currentListener = 0;

    // Check all the subscribers and trigger them if they has subscribed to at least one update
    while (listenerIter.hasNext()) {
        currentListener = listenerIter.next();
        if( _listenersMap.contains(currentListener) &&
            (
                _listenersMap[currentListener].isWndStartPosType() ||
                _listenersMap[currentListener].isWndEndPosType() ||
                _listenersMap[currentListener].isCurTimePosType()
            )
          )
        {
            // Trigger a subscriber
            // We assume that the content of _listenersMap can be updated within this function call, that's why we access the map with a QListIterator over a copy a the map keys
            currentListener->timelineRenamed(tlId, oldName, newName);
        }
    }
    // Trigger javascript code for update
    if(_jsManager) {
    	_jsManager->timelineNameUpdated(tlId, newName);
    }
}

/*!***************************************************************************
 * Method : TimeManager::updateTimelinesIds
 * Purpose : Called when timelines identifiers have been updated due to granted access to infrastrcture
 ****************************************************************************/
void TimeManager::updateTimelinesIds()
{
    core::INT32 tlToAddSize = _tlToAdd.size();

    // Check if there is postponed timeline addition
    for(core::INT32 i = 0; i< tlToAddSize; i++) {
        // Perform the postponed additions of timelines
        timeBarsModel::Timeline* tl = _tlToAdd.takeFirst();
        timelineAdded(tl);
    }
    // Forward to subscribers this request to take into account new session availability
    emit timelinesIdsUpdated();
}

/*!***************************************************************************
 * Method : TimeManager::getMasterSessionRealTime
 * Purpose : Read the current real-time of the master session, in order to be used as real-time reference
 ****************************************************************************/
core::INT64 TimeManager::getMasterSessionRealTime()
{
    return TimeManagers::get()->getSessionTime(_masterSessionUniqueTlId);
}

/*!***************************************************************************
 * Method : TimeManager::getCurrentTime
 * Purpose : Read the current time from correct source according to real-time state
 ****************************************************************************/
core::INT64 TimeManager::getCurrentTime()
{
    core::INT64 ret_val;

    // Read the time reference according to on real-time state
    if(_tb->getIsRealTime() == true) {
        // Use session time reference
        ret_val = getMasterSessionRealTime();
    } else {
        // Use internal local system time reference
        ret_val = QDateTime::currentMSecsSinceEpoch();
    }

    return ret_val;
}

/*!***************************************************************************
 * Method : TimeManager::updateCurrentTime
 * Purpose : Update the time position of the current time and all visualization window elements
 ****************************************************************************/
void TimeManager::updateCurrentTime(const core::INT64 msincrement)
{
    // Declare temporary variable for new computed values
    core::INT64 wndTimeDiff = 0;
    core::INT64 newCurr = 0;
    core::INT64 newStart = 0;
    core::INT64 newEnd = 0;
    core::INT64 newLowSlideLim = 0;
    core::INT64 newUpSlideLim = 0;
    core::INT64 newUpExtLim = 0;
    // Compute new elements position
    newCurr = _tb->getCurrentTime() + msincrement;
    newStart = _tb->getStartTime() + msincrement;
    newEnd = _tb->getEndTime() + msincrement;
    newLowSlideLim = _tb->getLowerSlideLimit() + msincrement;
    newUpSlideLim = _tb->getUpperSlideLimit() + msincrement;
    newUpExtLim = _tb->getUpperExtendedLimit() + msincrement;
    core::INT64 currRealTime = getCurrentTime();
    // Check if the time increment make the current time exceed current real-time, in order to switch in real-time mode if we were not already
    if( (newCurr >= currRealTime) && (_tb->getCurrentTime() < currRealTime) && (_tb->getIsRealTime() == false) ) {
        _tb->setIsRealTime(true);
    } else {
        // As the switch to real-time will call this service, avoid a double execution by using else case to perform the other actions
        // Update the visualization window elements position depending on the visualization mode
        if( (_tb->getVisualizationMode().compare(VisuMode(VisuMode::TB_NORMAL_MODE).name()) == 0) || (msincrement < 0)) {
            // Store the most recent known visualization window elements position to be able to avoid redundant triggers
            _last_current_time = newCurr;
            _last_start_time = newStart;
            _last_end_time = newEnd;
            // Update the visualization window elements position and the dataContainer position and call the service to take them into account
            _tb->setStartTime(newStart);
            _tb->setEndTime(newEnd);
            _tb->setCurrentTime(newCurr);
            _tb->setUpperSlideLimit(newUpSlideLim);
            _tb->setLowerSlideLimit(newLowSlideLim);
            _tb->setUpperExtendedLimit(newUpExtLim);
            // Trigger the subscriber for entire visualization window slide
            triggerUpdate(true,true,true);
            // Trigger javascript code for update, will also detect playing state transitions
            if(_jsManager) {
            	_jsManager->visuWindowPosUpdated();
            }
        } else if( _tb->getVisualizationMode().compare(VisuMode(VisuMode::TB_EXTENDED_MODE).name()) == 0) {
            // Check if the currentTime can move alone
            if( newCurr <= _tb->getEndTime() ) {
                // Store new current time to prevent TimeManager from new current time as an unknown one
                _last_current_time = newCurr;
                // Update current time position
                _tb->setCurrentTime(newCurr);
                // Trigger the subscriber for current time update only
                triggerUpdate(false,false,true);
                // Trigger javascript code for update, will also detect playing state transitions
                if(_jsManager) {
                	_jsManager->currentTimeUpdated();
                }
            } else {
                // Check if the visualization window width can be increased
                if( (_tb->getEndTime() + msincrement) <= _tb->getUpperExtendedLimit() ) {
                    // Store the most recent known visualization window elements position to be able to avoid redundant triggers
                    _last_current_time = newCurr;
                    _last_end_time = newCurr;
                    // First move the end of visualization window to stick to new current time
                    _tb->setEndTime(newCurr);
                    // Then update the currentTime position
                    _tb->setCurrentTime(newCurr);
                    // Trigger the subscriber for current time and end of visualization window update
                    triggerUpdate(false,true,true);
                    // Trigger javascript code for update, will also detect playing state transitions
                    if(_jsManager) {
                    	_jsManager->currentTimeExtendVisuWnd();
                    }
                } else {
                    // Neither currentTime nor afterTime can be moved alone, so update the whole visualization window position
                    // Compute the actual time position update for the visualization window
                    wndTimeDiff = newCurr - _tb->getUpperExtendedLimit();
                    // Store the most recent known visualization window elements position to be able to avoid redundant triggers
                    _last_current_time = newCurr;
                    _last_start_time = _tb->getStartTime() + wndTimeDiff;
                    // Stick the visualization window end to the upper extended limit
                    _last_end_time = _tb->getUpperExtendedLimit() + wndTimeDiff;
                    // Stick the window end on upper extended limit before moving the whole window, this is useful when catching up real-time to a point which is far in the future
                    _tb->setEndTime(_last_end_time);
                    // Move the whole visualization window
                    _tb->setCurrentTime(_last_current_time);
                    _tb->setStartTime(_last_start_time);
                    _tb->setUpperSlideLimit(_tb->getUpperSlideLimit() + wndTimeDiff);
                    _tb->setLowerSlideLimit(_tb->getLowerSlideLimit() + wndTimeDiff);
                    _tb->setUpperExtendedLimit(_last_end_time);
                    // Trigger the subscriber for entire visualization window slide
                    triggerUpdate(true,true,true);
                    // Trigger javascript code for update, will also detect playing state transitions
                    if(_jsManager) {
                    	_jsManager->visuWindowPosUpdated();
                    }
                }
            }
        } else if (_tb->getVisualizationMode().compare(VisuMode(VisuMode::TB_SLIDING_MODE).name()) == 0 ) {
            // Check if currentTime can move alone
            if( newCurr <= _tb->getUpperSlideLimit() ) {
                // Store new current time to prevent TimeManager from new current time as an unknown one
                _last_current_time = newCurr;
                // Update current time position
                _tb->setCurrentTime(newCurr);
                // Trigger the subscriber for current time update only
                triggerUpdate(false,false,true);
                // Trigger javascript code for update, will also detect playing state transitions
                if(_jsManager) {
                	_jsManager->currentTimeUpdated();
                }
            } else {
                // Compute the time duration for the window jump in order to keep the window on a multiple of the duration between lowerSlideLimit and upperSlideLimit
                core::INT64 limTimeDiff = _tb->getUpperSlideLimit() - _tb->getLowerSlideLimit();
                // If the current time difference is more than the duration between lower and upper sliding limit, compute how many time we need to add this duration to keep current time between limits
                if( (msincrement > limTimeDiff) && ( limTimeDiff != 0 ) ) {
                    wndTimeDiff = limTimeDiff * (msincrement / limTimeDiff);
                    // Add one more time the duration between limits to keep current time inside them
                    if(_tb->getUpperSlideLimit() + wndTimeDiff < newCurr ) {
                        wndTimeDiff += limTimeDiff;
                    }
                } else if( limTimeDiff == 0 ) {
                    // If the duration between lower and upper slide limits is null, update the window position with the same value as current time
                    wndTimeDiff = msincrement;
                } else {
                    // Otherwise, in nominal case, update the window position by the duration between lower and upper slide limits
                    wndTimeDiff = limTimeDiff;
                }
                // Store the most recent known visualization window elements position to be able to avoid redundant triggers
                _last_current_time = newCurr;
                _last_start_time = _tb->getStartTime() + wndTimeDiff;
                _last_end_time = _tb->getEndTime() + wndTimeDiff;
                // Update the visualization window elements position
                _tb->setCurrentTime(_last_current_time);
                _tb->setStartTime(_last_start_time);
                _tb->setEndTime(_last_end_time);
                _tb->setUpperSlideLimit(_tb->getUpperSlideLimit() + wndTimeDiff);
                _tb->setLowerSlideLimit(_tb->getLowerSlideLimit() + wndTimeDiff);
                _tb->setUpperExtendedLimit(_tb->getUpperExtendedLimit() + wndTimeDiff);
                // Trigger the subscriber for entire visualization window slide
                triggerUpdate(true,true,true);
                // Trigger javascript code for update, will also detect playing state transitions
                if(_jsManager) {
                	_jsManager->visuWindowPosUpdated();
                }
            }
        }
    }
}

/*!***************************************************************************
 * Method : TimeManager::triggerUpdate
 * Purpose : Trigger the subscribers of visualization window elements position update
 ****************************************************************************/
void TimeManager::triggerUpdate(const bool start, const bool end, const bool current)
{
    // Create a copy of the list of listeners to trigger
    QListIterator<TimeBarEventListener *> listenerIter(_listenersMap.keys());
    // Create a reference for the warned listener in the while loop
    TimeBarEventListener * currentListener = 0;
    TimeBarEventListener::timeBarEventData eventData;

    // Generate the event data to send to subscribers
    computeEventData(start, end, current, &eventData);

    // Check all the subscribers and trigger them according to updated elements and subscriptions
    while (listenerIter.hasNext()) {
        // Take the listener to trigger from the copied list
        currentListener = listenerIter.next();
        // Check that the listener is still in the QMap (which can be modified by updateWindowElts() call, and check the subscriptions
        if( (_listenersMap.contains(currentListener)) &&
            (
                (_listenersMap[currentListener].isWndStartPosType() && start) ||
                (_listenersMap[currentListener].isWndEndPosType() && end) ||
                (_listenersMap[currentListener].isCurTimePosType() && current)
            )
          )
        {
            // Trigger a subscriber
            // we assume that the content of _listenersMap can be updated within this function call, that's why we access the map with a QListIterator over a copy a the map keys
            currentListener->updateWindowElts(eventData);
        }
    }
}
/*!***************************************************************************
 * Method : TimeManager::getTimesLineName
 * Purpose : Return list of the names of all the timeLine managed by the timebar
 ****************************************************************************/
QList<QString> TimeManager::getTimesLineName()
{
    QList<QString> sessionListName;

    // Create the list of names to return
    foreach(timeLineData data,_timelinesMap) {
        sessionListName.append(data.model->getName());
    }

    // Return the list of names
    return sessionListName;
}

}
