/*!*******************************************************************
 * Project : ISIS
 * Component : GPCC-timeBar
 * \file TimeManagers.cpp
 * \author ohuyard
 * \date November 17, 2014
 * \brief This class manage all the time managers related to all the timeBars
 ********************************************************************/

/********************************************************************
 * HISTORY
 *
 * END-HISTORY
 ********************************************************************/

#include <QtCore/QDebug>
#include <QtCore/QListIterator>
#include <QtCore/QString>
#include <QtCore/QDateTime>

#include "sessionLibraryWrapper/SessionLibrary.h"
#include "sessionLibraryWrapper/SessionLibraryEvent.h"
#include "timeBar/TimeManagers.h"

namespace timeBar
{

// Initialize instance pointer
TimeManagers* TimeManagers::_instance = 0;
const core::INT32 TimeManagers::SYNC_TIMER_REC=5000;
const core::INT32 TimeManagers::INVALID_SESSION_ID_ERROR=-1;

/*!***************************************************************************
 * Method : TimeManagers::TimeManagers
 * Purpose : TimeManagers Constructor
 ****************************************************************************/
TimeManagers::TimeManagers() :
        QObject()
{
    // Initialize the data model pointer
    _timeBarsModel = 0;

    // Initialize the instance pointer
    _instance = 0;

    // Initialize the unique timeline id counter
    _uniqueIdCnt = 0;

    // Initialize the message pointer
    _sessionsMessage = 0;

    // Create the time base for session time check
    _synchroTimer = new QTimer(this);
    connect(_synchroTimer, &QTimer::timeout, this, &TimeManagers::timerEvent);
    _synchroTimer->setInterval(SYNC_TIMER_REC);
}

/*!***************************************************************************
 * Method : TimeManagers::~TimeManagers
 * Purpose : TimeManagers Destructor
 ****************************************************************************/
TimeManagers::~TimeManagers()
{
    // It is a singleton, so the object desctruction correspond to static resource will be done on application close
    // Nevertheless, instanciated single object is deleted in finalize service
}

/*!***************************************************************************
 * Method : TimeManagers::get
 * Purpose : Get the only one instance of this class
 ****************************************************************************/
TimeManagers* TimeManagers::get()
{
    if (_instance == 0) {
        // Create object if not already existing
        _instance = new TimeManagers;
    }
    return _instance;
}

/*!***************************************************************************
 * Method : TimeManagers::getTimeManager
 * Purpose : Get the pointer to the TimeManager object of specified name
 ****************************************************************************/
TimeManager * TimeManagers::getTimeManager(QString timeManagerName)
{
    // Initialize returned value
    TimeManager * ret_val = 0;
    if(_timeManagersMap.contains(timeManagerName)) {
        ret_val = _timeManagersMap[timeManagerName];
    }
    return ret_val;
}

/*!***************************************************************************
 * Method : TimeManagers::getTimeManagersNames
 * Purpose : Get the names of all the time bars
 ****************************************************************************/
QList<QString> TimeManagers::getTimeManagersNames() const
{
    return _timeManagersMap.keys();
}

/*!***************************************************************************
 * Method : TimeManagers::updateSessionsList
 * Purpose : Trigger the request of session list to infrastructure
 ****************************************************************************/
void TimeManagers::updateSessionsList()
{
    // Delete previous message if any
    if(_sessionsMessage) {
        delete _sessionsMessage;
    }
    // Ask the session library for the list of available sessions
    sessionLibraryWrapper::SessionLibrary::getSessionList(this);
}

/*!***************************************************************************
 * Method : TimeManagers::populate
 * Purpose : Populate the time bars from data model
 ****************************************************************************/
void TimeManagers::populate(timeBarsModel::TimeBars *timeBars)
{
    // Store the pointer to the data model
    _timeBarsModel = timeBars;

    // Ask the session library for the list of available sessions
    updateSessionsList();
}

/*!***************************************************************************
 * Method : TimeManagers::finalize
 * Purpose : Delete all TimeManager objects and itself
 ****************************************************************************/
void TimeManagers::finalize()
{
    // Disconnect and delete the synchronization timer (if created)
    if(_synchroTimer) {
        disconnect(_synchroTimer, &QTimer::timeout, this, &TimeManagers::timerEvent);
        delete _synchroTimer;
    }
}

/*!***************************************************************************
 * Method : TimeManagers::triggerUpdate
 * Purpose : Event handler to received answer from SessionLibrary
 ****************************************************************************/
bool TimeManagers::event(QEvent * event)
{
    // Initialize returned value to not recognized by default the event
    bool ret_val=false;
    // Retrieve reference to session event
    sessionLibraryWrapper::SessionLibraryEvent* session_event = dynamic_cast<sessionLibraryWrapper::SessionLibraryEvent*>(event);
    // Check that input pointer are not null
    if(session_event) {
        if(session_event->_message) {
            // Save message reference
            _sessionsMessage = session_event->_message;
            // Clear current session list
            _sessionList.clear();
            // Get the list of available sessions from sessionLibrary
            sessionLibrary::SessionLibrary lib;
            lib.retrieveSessionListFromMessage(&_sessionList,_sessionsMessage);
            // Run the session time checking timer is not already running
            if(!_synchroTimer->isActive()){
              _synchroTimer->start();
            }
            // Trigger timebars that sessions access is granted
            emit timelinesIdsUpdated();
        }
        // Qt event is recognize event if the message is empty or not valid
        ret_val = true;
    }

    return ret_val;
}

/*!***************************************************************************
 * Method : TimeManagers::timerEvent
 * Purpose : Called periodically to check the sessions times
 ****************************************************************************/
void TimeManagers::timerEvent()
{
    ccsds_mal::FINETIME fineTime;
    core::INT64 sessionTime;
    core::INT64 systemTime;
    TlType sessionTl(TlType::TL_SESSION);

    // Update the time difference between session and system time for each session
    QMapIterator<core::INT32,timelineData> iter(_sessionIdMap);
    while (iter.hasNext()) {
        iter.next();
        // Time offset is only relevant for sessions (and sessionInfo pointer is null for dataset/recordset)
        // Check also the sessionInfo because if infrastructure connection with session is not done, this pointer will be null
        if( (iter.value().type == sessionTl) && (iter.value().sessionInfo) ) {
          systemTime = QDateTime::currentMSecsSinceEpoch();
          sessionLibraryWrapper::SessionLibrary::getSessionTime(&fineTime, iter.value().sessionInfo->getId());
          sessionTime = fineTime.getNbMilliSec();
          _sessionIdMap[iter.key()].timeOfs = systemTime - sessionTime;
        }
    }
}

/*!***************************************************************************
 * Method : TimeManagers::timebarsDataSaved
 * Purpose : Warn the timebars manager that user request a save of all timebars data
 ****************************************************************************/
void TimeManagers::timebarsDataSaved()
{
    // Ask to all the TimeManager objects to save the data of their timebar
    QMapIterator<QString,TimeManager *> iter(_timeManagersMap);
    while (iter.hasNext()) {
        iter.next();
        iter.value()->saveTimeBarData();
    }
}

/*!***************************************************************************
 * Method : TimeManagers::createTimeManager
 * Purpose : Create a TimeManager and returns the reference to it
 ****************************************************************************/
TimeManager * TimeManagers::createTimeManager(timeBarsModel::TimeBar* timeBar, core::UINT32 socketID)
{
    QString currentTBName = timeBar->getName();
    _timeManagersMap[currentTBName] = new TimeManager;
    _timeManagersMap[currentTBName]->setObjectName(currentTBName);
    _timeManagersMap[currentTBName]->populate(timeBar,socketID);
    return _timeManagersMap[currentTBName];
}

/*!***************************************************************************
 * Method : TimeManagers::deleteTimeManager
 * Purpose : Delete a TimeManager and remove the references to it
 ****************************************************************************/
void TimeManagers::deleteTimeManager(QString timeManagerName)
{
    // Delete the TimeManager
    delete _timeManagersMap[timeManagerName];
    // Remove the key from the map
    _timeManagersMap.remove(timeManagerName);
}

/*!***************************************************************************
 * Method : TimeManagers::unsubscribeListenerFromAll
 * Purpose : Unsubscribe a TimeBarEventListener from all it subscriptions to be able to delete it
 ****************************************************************************/
void TimeManagers::unsubscribeListenerFromAll(TimeBarEventListener *listener)
{
    // Ask to all the TimeManager objects to unsubscribe the listener, because we don't know in which one this listener is
    QMapIterator<QString,TimeManager *> iter(_timeManagersMap);
    while (iter.hasNext()) {
        iter.next();
        iter.value()->unsubscribeFromAll(listener);
    }
}

/*!***************************************************************************
 * Method : TimeManagers::subscribeListenerToAll
 * Purpose : Subscribe a TimeBarEventListener to all the timebars for all the events
 ****************************************************************************/
void TimeManagers::subscribeListenerToAll(TimeBarEventListener *listener)
{
    // Ask to all the TimeManager objects to subscribe the listener to both current time and visualization window position
    QMapIterator<QString,TimeManager *> iter(_timeManagersMap);
    // Create TimeManager reference for loop
    TimeManager * currTimeManager = 0;
    while (iter.hasNext()) {
        iter.next();
        currTimeManager = iter.value();
        currTimeManager->subscribeToAll(listener);
    }
}

/*!***************************************************************************
 * Method : TimeManagers::getSessionId
 * Purpose : Get the session identifier of the timeline identified by a unique id
 ****************************************************************************/
core::INT32 TimeManagers::getSessionId(core::INT32 tlId, core::UINT16 * sessionId)
{
    core::INT32 ret_val=INVALID_SESSION_ID_ERROR;
    TlType sessionTl(TlType::TL_SESSION);

    if( _sessionIdMap.contains(tlId)) {
        if( _sessionIdMap[tlId].type == sessionTl) {
            *sessionId = _sessionIdMap[tlId].sessionInfo->getId()->getValue();
            ret_val = 0;
        }
    }
    return ret_val;
}

/*!***************************************************************************
 * Method : TimeManagers::getSessionInfo
 * Purpose : Get a pointer to SessionInfo according to the timeLine ID
 ****************************************************************************/
core::INT32 TimeManagers::getSessionInfo(core::INT32 tlId,  QString &name, core::UINT32 &state, core::UINT32 &id)
{
    core::INT32 ret_val=INVALID_SESSION_ID_ERROR;
    TlType sessionTl(TlType::TL_SESSION);

    if( _sessionIdMap.contains(tlId)) {
        if( _sessionIdMap[tlId].type == sessionTl) {
            name = QString(_sessionIdMap[tlId].sessionInfo->getName()->getValue());
            state = (core::UINT32)(_sessionIdMap[tlId].sessionInfo->getState()->getValue());
            id = (core::UINT32)(_sessionIdMap[tlId].sessionInfo->getId()->getValue());

            ret_val = 0;
        }
    }
    return ret_val;
}

/*!***************************************************************************
 * Method : TimeManagers::createUniqueTlId
 * Purpose : Create and return a unique id for a timeline, this id is null in case of not accessible session data
 ****************************************************************************/
core::INT32 TimeManagers::createUniqueTlId(const TlType& type, core::UINT32 sessionId)
{
    core::UINT32 i;
    core::INT32 id=0;
    bool sessionFound;
    TlType sessionTl(TlType::TL_SESSION);

    // Proceeed to id generation depending on timeline type (session of not)
    if(type == sessionTl) {
        // SESSION timeline
        // Look for the sessionId in the list of the available ones received from infrastructure
        sessionFound=false;
        for(i=0;(i<_sessionList.size()) && (sessionFound==false);i++){
            if(_sessionList.at(i)->getId()->getValue() == sessionId){
                // The sessionId exist in infrastructure, so the session data are accessible
                // Create the unique timeline id
                _uniqueIdCnt++;
                id = _uniqueIdCnt;
                // Store the timeline data with initial 0ms time offset
                _sessionIdMap[id].type = type;
                _sessionIdMap[id].sessionInfo = _sessionList.at(i);
                _sessionIdMap[id].timeOfs = 0;
                // End the search loop
                sessionFound=true;
            }
        }
    } else {
        // DATASET or RECORDSET timeline
        // Create the unique timeline id
        _uniqueIdCnt++;
        id = _uniqueIdCnt;
        // Store the timeline data without sessionInfo and time offset which are meaningless in this case
        _sessionIdMap[id].type = type;
        _sessionIdMap[id].sessionInfo = 0;
        _sessionIdMap[id].timeOfs = 0;
    }

    return id;
}

/*!***************************************************************************
 * Method : TimeManagers::removeTimeline
 * Purpose : Remove the timeline linked to a given unique id for a timeline
 ****************************************************************************/
void TimeManagers::removeTimeline(core::INT32 tlId)
{
    if( _sessionIdMap.contains(tlId)) {
        // If the unique id is in the map, remove it because this timeline is not more present in its timebar
        _sessionIdMap.remove(tlId);
        // Do not change the _uniqueIdCnt because it shall keep being incremented to ensure the unicity of timelines id
    }
}

/*!***************************************************************************
 * Method : TimeManagers::getSessionTime
 * Purpose : Get the session time related to the session given by the tlId parameter
 ****************************************************************************/
core::INT64 TimeManagers::getSessionTime(core::INT32 tlId)
{
    core::INT64 ret_val=0;
    TlType sessionTl(TlType::TL_SESSION);

    if( _sessionIdMap.contains(tlId)) {
        if( _sessionIdMap[tlId].type == sessionTl) {
            ret_val = QDateTime::currentMSecsSinceEpoch() + _sessionIdMap[tlId].timeOfs;
        }
    }

    return ret_val;
}

/*!***************************************************************************
 * Method : TimeManagers::getSessionsList
 * Purpose : Get the list of the available sessions
 ****************************************************************************/
void TimeManagers::getSessionsList(QList<sessionData> * list)
{
    sessionData session;
    core::UINT32 i;

    for(i=0; i < _sessionList.size(); i++) {
        session.name = QString(_sessionList[i]->getName()->getValue());
        session.state = (core::UINT32)(_sessionList[i]->getState()->getValue());
        session.id = (core::UINT32)(_sessionList[i]->getId()->getValue());
        list->append(session);
    }
}

}
