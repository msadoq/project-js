/*!*******************************************************************
 * Project : ISIS
 * Component : GPCC-timeBar
 * \file TimeManager.h
 * \author ohuyard
 * \date June 18, 2014
 * \brief This class manage time and dispatch events for the timeBar
 ********************************************************************/

/********************************************************************
 * HISTORY
 *
 * END-HISTORY
 ********************************************************************/

#ifndef TIMEBAR_TIMEMANAGER_H
#define TIMEBAR_TIMEMANAGER_H

#include "TimeBar_global.h"

#include <QtCore/QObject>
#include <QtCore/QMap>
#include <QtCore/QList>
#include <QtCore/QDateTime>
#include <QtCore/QTimer>
#include <QtCore/QSignalMapper>

#include "core/BOOL.h"
#include "core/INT32.h"
#include "core/INT64.h"

#include "timeBar/TimeManagerEvent.h"
#include "timeBar/TimelineSignalRouter.h"
#include "timeBar/TimeBarEventListener.h"
#include "timeBar/TimeBarJsManager.h"

#include "timeBarsModel/Timeline.h"
#include "timeBarsModel/Timelines.h"
#include "timeBarsModel/TimeBar.h"

namespace timeBar
{

/*!----------------------------------------------------------
 * \brief Structure to store the infrastructure ID and type of timelines
 *
 * Structure to bind together the ID of a session in GPIN type if a timeline is a session one
 * and its type in order to know which timelines are session and which ones are not
 *-----------------------------------------------------------!*/
typedef struct {
    QString name;        ///< Name of the session in the infrastructure */
    core::UINT32 state;  ///< State of the session as it is received from infrastructure */
    core::UINT32 id;     ///< Identifier of the session in infrastructure (GPIN) */
} sessionData;

/*!***************************************************************
 * Method : sessionDataComp
 *
 * \param i First sessionData to use for comparision
 * \param j Second sessionData to use for comparision
 *
 * Return True if the sessionData j has a name which is after the one of sessionData i in Latin1 alphabetical order
 *****************************************************************/
bool sessionDataComp(sessionData i, sessionData j);

class TimeManager: public QObject
{
    Q_OBJECT

private:
    /*!----------------------------------------------------------
     * \brief Structure to store the visualization window elements for a timeline
     *
     * Structure to bind together all the data related to the updated
     * elements within the visualization window of a timeline in a timebar
     *-----------------------------------------------------------!*/
    typedef struct {
        timeBarsModel::Timeline* model;     ///< Pointer to the timeline data model
        TimelineSignalRouter* router;       ///< Pointer to the timeline signal router
    } timeLineData;

    // Configuration constants
    static const core::INT32 NORMAL_TIME_SIMU_PERIOD_MS;         ///< Time simulation refreshing period in milliseconds for normal mode
    static const core::INT32 JS_TIME_SIMU_PERIOD_MS;             ///< Time simulation refreshing period in milliseconds for javascript mode

    // Internal resources
    QMap<TimeBarEventListener *, TimeManagerEvent> _listenersMap;///< The listeners maps with the events they subscribed to
    QTimer * _playingTimer;                                      ///< Timer to control the display according to time
    timeBarsModel::TimeBar * _tb;                                ///< Pointer to the data model of the timebar
    TimeBarJsManager * _jsManager;                               ///< Pointer to the manager of the communication with javascript side of the timebar
    core::INT64 _msSinceEpochOfLastTimerEvent;                   ///< Timestamp in milliseconds since Epoch of the last timer event, used to compensate timer event delays

    // Configuration variables
    core::INT32 _timebaseIncrementMs;                            ///< Duration in ms between two reference time base ticks
    Qt::TimeSpec _datesTimeSpec;                                 ///< Time specification used for QDateTime manipulation

    // Runtime data
    core::INT64 _last_current_time;                              ///< Last value of current time used for trigger, usefull to avoid double trigger in case of coherent visualization window update
    core::INT64 _last_start_time;                                ///< Last value of start time used for trigger, usefull to avoid double trigger in case of coherent visualization window update
    core::INT64 _last_end_time;                                  ///< Last value of end time used for trigger, usefull to avoid double trigger in case of coherent visualization window update
    QMap<core::INT32, timeLineData> _timelinesMap;               ///< The map of unique timelines id with pointers to their entry in the data model and signal router

    core::INT32 _masterSessionUniqueTlId;                        ///< The unique timeline id of the master session
    timeBarsModel::Timelines * _timelinesModel;                  ///< Pointer to be able to connect and disconnect the TimeManager to timelines addition and removal from the data model
    QList<timeBarsModel::Timeline*> _tlToAdd;                    ///< List of timelines added in data model but not in the timebar due to failed access to infrastructure data
    QList<core::INT32> _tlIdsForOfsUpdDrop;                      ///< List of the timelines unique IDs for which a timeline offset event shall be dropped, usefull when master timeline change
    bool _isJavascriptModeActive;                                ///< Activation state of the javascript mode, which change some features

public:
    /*!***************************************************************
     * Method : TimeManager
     *
     * TimeManager Constructor
     *****************************************************************/
    TimeManager();

    /*!***************************************************************
     * Method : ~TimeManager
     *
     * TimeManager Destructor
     *****************************************************************/
    virtual ~TimeManager();

    /*!***************************************************************
     * Method : subscribeToAll
     *
     * \param listener The listener for the subscription
     *
     * Subscribe a listener to visualization window position and current time position update events
     *****************************************************************/
    void subscribeToAll(TimeBarEventListener *listener);

    /*!***************************************************************
     * Method : subscribeToCurTimePos
     *
     * \param listener The listener for the subscription
     *
     * Subscribe a listener to current time position update events
     *****************************************************************/
    void subscribeToCurTimePos(TimeBarEventListener *listener);

    /*!***************************************************************
     * Method : unsubscribeFromCurTimePos
     *
     * \param listener The listener to unsubscribe
     *
     * Unsubscribe a listener from current time position update events
     *****************************************************************/
    void unsubscribeFromCurTimePos(TimeBarEventListener *listener);

    /*!***************************************************************
     * Method : unsubscribeFromAll
     *
     * \param listener The listener to unsubscribe
     *
     * Unsubscribe a listener from all events
     *****************************************************************/
    void unsubscribeFromAll(TimeBarEventListener *listener);

    /*!***************************************************************
     * Method : getTimelinesIds
     *
     * \param  regExp Regular expression to look for timelines with their session names
     * \param  tlIds  List of the unique id of the timelines with names matching to regExp
     *
     * Get the list of unique id of timelines with name matching to regular expression
     *****************************************************************/
    void getTimelinesIds(const QRegExp & regExp, QList<core::INT32> * tlIds);

    /*!***************************************************************
     * Method : getSessionsIds
     *
     * \param  regExp Regular expression to look for timelines with their session names
     * \param  sessionIds  List of GPIN session ids of the timelines with names matching to regExp
     *
     * Get the list of GPIN session ids of timelines with name matching to regular expression
     *****************************************************************/
    void getSessionsIds(const QRegExp & regExp, QList<core::INT32> * sessionIds);

    /*!***************************************************************
     * Method : setvisuWindowPos
     * 
     * \param start       New position in millisecond since epoch of the visualization window start
     * \param end         New position in millisecond since epoch of the visualization window end
     * \param curr        New position in millisecond since epoch of the current time
     * \param lowSlideLim New position in millisecond since epoch of the lower slide limit
     * \param upSlideLim  New position in millisecond since epoch of the upper slide limit
     * \param upExtLim    New position in millisecond since epoch of the upper extended limit
     *
     * Ask for a coherent position update of all the visualization window elements
     *****************************************************************/
    Q_INVOKABLE void setvisuWindowPos(const core::INT64 &start, const core::INT64 &end,const core::INT64 &curr,const core::INT64 &lowSlideLim,const core::INT64 &upSlideLim,const core::INT64 &upExtLim);

    /*!***************************************************************************
     * Method : setMasterSession
     *
     * Update the master session
     ****************************************************************************/
    void setMasterSession(timeBarsModel::Timeline* tlPtr);

    /*!***************************************************************
     * Method : getSessionsList
     *
     * \param  list The list of the sessions names
     *
     * Get the list of the available sessions
     *****************************************************************/
    void getSessionsList(QList<sessionData> * list);

    /*!***************************************************************
     * Method : getTimeLineNamesFromSessionID
     *
     * \param  sessionID The GPIN Session ID
     *
     * \return the list of time line names
     *
     * Get the list of corresponding time line names sharing same sessionID
     *****************************************************************/
    QList<QString> getTimeLineNamesFromSessionID(core::INT32 sessionID);

    /*!***************************************************************
     * Method : populate
     *
     * \param tb        model use to populate the time bar
     * \param socketID  ID of the socket for communication with javascript, no communication if ID=0
     *
     * Populate the time bar from its data model
     *****************************************************************/
    void populate(timeBarsModel::TimeBar *tb, core::UINT32 socketID = 0);

    /*!***************************************************************************
     * Method : timerEvent
     * 
     * Called periodically to simulate a time base
     ****************************************************************************/
    void timerEvent();

    /*!***************************************************************************
     * Method : saveTimeBarData
     *
     * Warn that user request a save of all timebar data
     ****************************************************************************/
    void saveTimeBarData();

    /*!***************************************************************
     * Method : updateSessionsList
     *
     * Trigger the request of session list to infrastructure
     *****************************************************************/
    void updateSessionsList();

    /*!***************************************************************************
     * Method : TimeManager::getTimesLineName
     * Purpose : Return list of the names of all the timeLine managed by the timebar
     ****************************************************************************/
    QList<QString> getTimesLineName();

signals:
    /*!*******************************************************************
     * Method : timelinesIdsUpdated
     *
     * Emitted when the infrastructure access to timeline data has been granted
     ********************************************************************/
    void timelinesIdsUpdated();

    /*!*******************************************************************
     * Method : timelinesOfsUpdated
     *
     * Emitted when all timelines offset text labels shall be updated
     ********************************************************************/
    void timelinesOfsUpdated();

public slots:
    /*!***************************************************************
     * Method : offsetModified
     *
     * \param tlId      Unique identifier of the timeline
     * \param oldOffset Old offset of the moved timeline
     * \param newOffset New offset of the moved timeline
     *
     * Perform the necessary actions on timeline offset update
     *****************************************************************/
    void offsetModified(core::INT32 tlId, core::INT64 oldOffset, core::INT64 newOffset);

    /*!***************************************************************
     * Method : timelineRenamed
     *
     * \param tlId     Unique identifier of the timeline
     * \param oldName  Old name of the timeline in the data model
     * \param newName  New name of the timeline in the data model
     *
     * Perform the necessary actions on timeline renaming in a timebar
     *****************************************************************/
    void timelineRenamed(core::INT32 tlId, const QString & oldName, const QString & newName);

protected slots:
    /*!*******************************************************************
     * Method : currentTimeModified
     *
     * Called on current time update performed in the timebar by the user
     ********************************************************************/
    void currentTimeModified();

    /*!*******************************************************************
     * Method : startTimeModified
     *
     * Called on visualization window start update performed in the timebar by the user
     ********************************************************************/
    void startTimeModified();

    /*!*******************************************************************
     * Method : endTimeModified
     *
     * Called on visualization window end update performed in the timebar by the user
     ********************************************************************/
    void endTimeModified();

    /*!*******************************************************************
     * Method : isRealTimeModified
     *
     * Called when the timebar enter or exit real-time status
     ********************************************************************/
    void isRealTimeModified();

    /*!*******************************************************************
     * Method : isPlayingModified
     *
     * Called when the timebar playing is started or paused
     ********************************************************************/
    void isPlayingModified();

    /*!***************************************************************
     * Method : visualizationSpeedModified
     *
     * Perform the necessary actions on visualization speed change
     *****************************************************************/
    void visualizationSpeedModified();

    /*!***************************************************************
     * Method : timelinesModified
     *
     * Triggered when the list of timelines is updated in order to subscribe to timelines updates
     *****************************************************************/
    void timelinesModified();

    /*!***************************************************************
     * Method : timelineAdded
     *
     * \param timeline Pointer to the added timeline in the data model
     *
     * Perform the necessary actions on timeline opening in a timebar
     *****************************************************************/
    void timelineAdded(timeBarsModel::Timeline* timeline);

    /*!***************************************************************
     * Method : timelineRemoved
     *
     * \param index     Index of the removed timeline in the data model
     * \param timeline  Pointer to the removed timeline from the data model
     *
     * Perform the necessary actions on timeline closing in a timebar
     *****************************************************************/
    void timelineRemoved(core::INT32 index, timeBarsModel::Timeline* timeline);

    /*!*******************************************************************
     * Method : updateTimelinesIds
     *
     * Called when timelines identifiers have been updated due to granted access to infrastrcture
     ********************************************************************/
    void updateTimelinesIds();

private:
    /*!***************************************************************
      * Method : getCurrentTime
      *
      * Read the current time from correct source according to real-time state
     *****************************************************************/
    core::INT64 getCurrentTime();

    /*!***************************************************************
      * Method : getMasterSessionRealTime
      *
      * Read the current real-time of the master session, in order to be used as real-time reference
     *****************************************************************/
    core::INT64 getMasterSessionRealTime();

    /*!***************************************************************
      * Method : updateCurrentTime
      *
      * \param msincrement   Set to true if a the start date of visualization window has been updated
      *
      * Update the time position of the current time and all visualization window elements
     *****************************************************************/
     void updateCurrentTime(const core::INT64 msincrement);

     /*!***************************************************************
       * Method : computeTimelineData
       *
       * \param offset   Time offset of the timeline for which the data structure is filled
       * \param tlData   Data structure to fill with the data of the timeline
       *
       * Compute the data structure for a single timeline
      *****************************************************************/
      void computeTimelineData(const core::INT64 offset, TimeBarEventListener::timeLineEventData * tlData);

     /*!***************************************************************
       * Method : computeEventData
       *
       * \param start     Set to true if a the start date of visualization window has been updated
       * \param end       Set to true if a the end date of visualization window has been updated
       * \param current   Set to true if a the current time position has been updated
       * \param eventData Event data to fill in with value according to updated visualization window elements
       *
       * Compute the event data structure to give to subscriber when a visualization window element has been updated
      *****************************************************************/
      void computeEventData(const bool start, const bool end, const bool current, TimeBarEventListener::timeBarEventData * eventData);

    /*!***************************************************************
      * Method : triggerWndPosUpd
      *
      * \param start   Set to true if a the start date of visualization window has been updated
      * \param end     Set to true if a the end date of visualization window has been updated
      * \param current Set to true if a the current time position has been updated
      *
      * Trigger the subscribers of visualization window elements position update
     *****************************************************************/
     void triggerUpdate(const bool start, const bool end, const bool current);
};

}
#endif
