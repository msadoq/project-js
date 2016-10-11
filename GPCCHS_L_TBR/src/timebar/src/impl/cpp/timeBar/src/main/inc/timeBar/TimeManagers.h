/*!*******************************************************************
 * Project : ISIS
 * Component : GPCC-timeBar
 * \file TimeManagers.h
 * \author ohuyard
 * \date November 17, 2014
 * \brief This class manage all the time managers related to all the timeBars
 ********************************************************************/

/********************************************************************
 * HISTORY
 *
 * END-HISTORY
 ********************************************************************/

#ifndef TIMEBAR_TIMEMANAGERS_H
#define TIMEBAR_TIMEMANAGERS_H

#include "TimeBar_global.h"

#include <QtCore/QObject>
#include <QtCore/QMap>
#include <QtCore/QString>
#include <QtCore/QRegExp>
#include <QtCore/QList>

#include "core/UINT16.h"
#include "core/UINT32.h"
#include "core/INT32.h"
#include "core/INT64.h"
#include "core/Message.h"

#include "timeBar/TimeBarTypes.h"
#include "timeBar/TimeManager.h"

#include "sessionLibrary/SessionLibrary.h"

#include "timeBarsModel/TimeBar.h"
#include "timeBarsModel/TimeBars.h"

namespace timeBar
{


class TimeManagers: public QObject
{
    Q_OBJECT

public:
    static const core::INT32 INVALID_SESSION_ID_ERROR;             ///< Value returned by getSessionId when session is not valid

private:
    /*!----------------------------------------------------------
     * \brief Structure to store the infrastructure ID and type of timelines
     *
     * Structure to bind together the ID of a session in GPIN type if a timeline is a session one
     * and its type in order to know which timelines are session and which ones are not
     *-----------------------------------------------------------!*/
    typedef struct {
        TlType                          type;        ///< Type of the timeline
        sessionModel::SessionInfo*      sessionInfo; ///< In case of Session timeline, the pointer to infrastructure data
        core::INT64                          timeOfs;///< Time correction to apply between system time and session time
    } timelineData;

    static TimeManagers* _instance;                        ///< The static instance of the singleton
    QMap<QString,TimeManager *> _timeManagersMap;          ///< The map with all the TimeManager objects pointers and their names
    timeBarsModel::TimeBars * _timeBarsModel;              ///< Pointer to the data model of the TimeBars
    QMap<core::INT32,timelineData> _sessionIdMap;                  ///< Map to associate TimeManagers unique id to GPIN identification number
    core::INT32 _uniqueIdCnt;                                      ///< Counter to generate the unique timeline id
    std::vector<sessionModel::SessionInfo*> _sessionList;  ///< List of available sessions to be opened in timebars
    core::Message * _sessionsMessage;                      ///< Pointer to the message from infrastructure containing the sessions informations
    static const core::INT32 SYNC_TIMER_REC;                       ///< Duration in ms between two check of session times
    QTimer * _synchroTimer;                                ///< Timer to check regulary the time difference between system time and all sessions times

public:
    /*!***************************************************************
     * Method : get
     *
     * \return TimeManagers A pointer to the unique instance of the class
     *
     * Get the only one instance of this class
     *****************************************************************/
    static TimeManagers* get();

    /*!***************************************************************
     * Method : getTimeManager
     *
     * \param timeManagerName  Name of the TimeBar related to the TimeManager
     * \return                 Pointer to the TimeManager related to the Time Bar of the given name, 0 if it is unknown
     *
     * Get the pointer to the TimeManager object of specified name
     *****************************************************************/
    TimeManager * getTimeManager(QString timeManagerName);

    /*!***************************************************************
     * Method : getTimeManagersNames
     *
     * \return  The list of all available time bar names
     *
     * Get the names of all the time bars
     *****************************************************************/
    QList<QString> getTimeManagersNames() const;

    /*!***************************************************************
     * Method : populate
     *
     * \param timeBars Model used to populate the time bars
     * \param parent   Parent for the TimeManagers singleton
     *
     * Populate the time bars from their data model
     *****************************************************************/
    void populate(timeBarsModel::TimeBars *timeBars);

    /*!***************************************************************
     * Method : finalize
     *
     * Delete all TimeManager objects and itself
     *****************************************************************/
    void finalize();

    /*!***************************************************************
     * Method : event
     *
     * \param event The event
     *
     * Event handler to received answer from SessionLibrary
     *****************************************************************/
    bool event(QEvent * event);

    /*!***************************************************************
     * Method : unsubscribeListenerFromAll
     *
     * \param listener The listener to unsubscribe
     *
     * Unsubscribe a TimeBarEventListener from all it subscriptions to be able to delete it
     *****************************************************************/
    void unsubscribeListenerFromAll(TimeBarEventListener *listener);

    /*!***************************************************************
     * Method : subscribeListenerToAll
     *
     * \param listener The listener to subscribe
     *
     * Subscribe a TimeBarEventListener to all the timebars for all the events
     *****************************************************************/
    void subscribeListenerToAll(TimeBarEventListener *listener);

    /*!***************************************************************
     * Method : getSessionId
     *
     * \param tlId      Unique id of the timeline among all timebars
     * \param sessionId Identifier of the session related to the timeline of tlId
     * \return          Zero if session id has been found, -1 if the tlId hasn't been found or the timeline is not a session
     *
     * Get the session identifier of the timeline identified by a unique id
     *****************************************************************/
    core::INT32 getSessionId(core::INT32 tlId, core::UINT16 * sessionId);

    /*!***************************************************************************
     * Method : TimeManagers::getSessionInfo
     *
     * \param tlId   Unique timeline id of the timeline corresponding to the session
     * \param name   Retrieved name of the session
     * \param state  Retrieved state of the session
     * \param id     Retrieved id of the session
     * \return       Zero if session id has been found, -1 if the tlId hasn't been found or the timeline is not a session
     *
     * Purpose : Get a copy of SessionInfo according to the timeLine ID
     ****************************************************************************/
    core::INT32 getSessionInfo(core::INT32 tlId, QString &name, core::UINT32 &state, core::UINT32 &id);

    /*!***************************************************************
     * Method : createtUniqueTlId
     *
     * \param type      Type of the timeline : session, dataset or recordset
     * \param sessionId If the timeline is a session one, this is the infrastructure id used to access to the session data
     *
     * Create and return a unique id for a timeline, this id is null in case of not accessible session data
     *****************************************************************/
    core::INT32 createUniqueTlId(const TlType& type, core::UINT32 sessionId);

    /*!***************************************************************
     * Method : removeTimeline
     *
     * \param tlId      Unique Id of the timeline to remove
     *
     * Remove the timeline linked to a given unique id for a timeline
     *****************************************************************/
    void removeTimeline(core::INT32 tlId);

    /*!***************************************************************
     * Method : getSessionTime
     *
     * \param tlId      Unique id of the timeline among all timebars
     * \return          Real-time session date in milliseconds since epoch
     *
     * Get the session time related to the session given by the tlId parameter
     *****************************************************************/
    core::INT64 getSessionTime(core::INT32 tlId);

    /*!***************************************************************
     * Method : getSessionsList
     *
     * \param  list The list of the sessions names
     * \return      The number of available sessions to be opened
     *
     * Get the list of the available sessions
     *****************************************************************/
    void getSessionsList(QList<sessionData> * list);

    /*!***************************************************************
     * Method : updateSessionsList
     *
     * Trigger the request of session list to infrastructure
     *****************************************************************/
    void updateSessionsList();

    /*!***************************************************************************
     * Method : timerEvent
     *
     * Called periodically to check the sessions times
     ****************************************************************************/
    void timerEvent();

    /*!*******************************************************************
     * Method : timebarsDataSaved
     *
     * Warn the timebars manager that user request a save of all timebars data
     ********************************************************************/
    void timebarsDataSaved();

    /*!***************************************************************
     * Method : createTimeManager
     *
     * \param timeBar    Pointer to the data model of the time bar for which we create a TimeManager
     * \param socketID   ID of the socket for communication with javascript
     * \return           Pointer to the created TimeManager
     *
     * Create a TimeManager and returns the reference to it
     *****************************************************************/
    TimeManager * createTimeManager(timeBarsModel::TimeBar* timeBar, core::UINT32 socketID = 0);

    /*!***************************************************************
     * Method : removeTimeBar
     *
     * \param timeManagerName    The name of the TimeManager to delete
     *
     * Delete a TimeManager and remove the references to it
     *****************************************************************/
    void deleteTimeManager(QString timeManagerName);

signals:
    /*!*******************************************************************
     * Method : timelinesIdsUpdated
     *
     * Emitted when the infrastructure access to timeline data has been granted
     ********************************************************************/
    void timelinesIdsUpdated();

private:
    /*!***************************************************************
     * Method : TimeManagers
     *
     * TimeManagers Constructor
     *****************************************************************/
     TimeManagers();

    /*!***************************************************************
     * Method : ~TimeManagers
     *
     * TimeManagers Destructor
     *****************************************************************/
    virtual ~TimeManagers();
};

}
#endif
