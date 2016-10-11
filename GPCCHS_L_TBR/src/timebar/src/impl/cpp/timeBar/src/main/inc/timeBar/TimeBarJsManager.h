/*!*******************************************************************
 * Project : ISIS
 * Component : GPCC-timeBar
 * \file TimeBarJsManager.h
 * \author Olivier HUYARD
 * \date 16th august 2016
 * \brief The timebar javascript communication manager
 *
 * MLanager of the communication with the javascript part of the application
 ********************************************************************/

#ifndef TIMEBAR_TIMEBARJSMANAGER_H_
#define TIMEBAR_TIMEBARJSMANAGER_H_

/********************************************************************
 * HISTORY
 *
 * END-HISTORY
 ********************************************************************/


#include "TimeBar_global.h"

#include <QtCore/QObject>
#include <QtCore/QString>
#include <QtCore/QMap>

#include "core/UINT32.h"
#include "core/INT32.h"
#include "core/BOOL.h"

#include "timeBar/TimeBarTypes.h"
#include "timeBar/TimeBarJsModel.h"

#include "timeBarsModel/TimeBar.h"


namespace timeBar
{

class TimeBarJsManager : public QObject
{
    Q_OBJECT

private:

    timeBarsModel::TimeBar * _timeBarModel;                    ///< Pointer to the data model of the TimeBars
    QMap<core::INT32,timeBarsModel::Timeline* > _timelinesMap; ///< Map of timelines unique id and their reference in timebar data model
    core::UINT32 _socketId;                                    ///< Reference of the used socket
    TimeBarJsModel _currentJsonMsg;                            ///< Json message currently filled
    core::BOOL _isInitDone;                                    ///< Boolean to know if the timebar ends the initial configuration
    core::BOOL _isRealtimeSwitch;                              ///< Boolean used to manage at once all the data update at realtime entering
    core::BOOL _ignoreTbModelEvt;                              ///< Boolean used to ignore data model data updated during a coherent
                                                               //   visualization window position update by the TimeManager

public:
    /*!***************************************************************
    * Method : TimeBarJsManager
    *
    * \param model      Reference to the timebar data model
    * \param socketID   ID of the socket for communication with javascript
    * \param parent     Parent for the TimeBarMessageHandler singleton
    *
    * TimeBarJsManager Constructor
    *****************************************************************/
    TimeBarJsManager(timeBarsModel::TimeBar * model, core::UINT32 socketID, QObject* parent = 0);

    /*!***************************************************************
    * Method : ~TimeBarJsManager
    *
    * TimeBarJsManager Destructor
    *****************************************************************/
    ~TimeBarJsManager();

    /*!***************************************************************
    * Method : initialUpdate
    *
    * Send an initial and full timebar configuration to javascript
    * Intended to be called from populate of TimeManger after calls
    * of timelineAdded as many times as there is timelines
    *****************************************************************/
    void initialUpdate();

    /*!***************************************************************
    * Method : visuWindowMouseDragEvent
    *
    * Take into account a mouse drag data update start of the visualization window
    *****************************************************************/
    void visuWindowMouseDragEvent();

    /*!***************************************************************
    * Method : visuWindowMouseDropEvent
    *
    * \param isPlayingStateUpd Set to true if playing state is updated upon this event
    *
    * Take into account a mouse drop of the visualization window
    *****************************************************************/
    void visuWindowMouseDropEvent(core::BOOL isPlayingStateUpd);

    /*!***************************************************************
    * Method : masterSessionUpdateStart
    *
    * Take into account the start of model update due to master session timeline change
    *****************************************************************/
    void masterSessionUpdateStart();

    /*!***************************************************************
    * Method : masterSessionUpdateEnd
    *
    * \param tlId  Unique id of the master timeline
    *
    * Take into account the end of model update due to master session timeline change
    *****************************************************************/
    void masterSessionUpdateEnd(core::INT32 tlId);

    /*!***************************************************************
    * Method : currentTimeDragged
    *
    * \param isPlayingStateUpd Set to true if playing state is updated upon this event
    *
    * Take into account a mouse drop of the current time
    *****************************************************************/
    void currentTimeDragged(core::BOOL isPlayingStateUpd);

    /*!***************************************************************
    * Method : startTimeDragged
    *
    * Take into account a mouse drop of the start time
    *****************************************************************/
    void startTimeDragged();

    /*!***************************************************************
    * Method : endTimeDragged
    *
    * Take into account a mouse drop of the start time
    *****************************************************************/
    void endTimeDragged();

    /*!***************************************************************
    * Method : realtimeSwitchBegins
    *
    * Take into account the beginning of a state change into realtime playing
    *****************************************************************/
    void realtimeSwitchBegins();

    /*!***************************************************************
    * Method : realtimeSwitchEnds
    *
    * Take into account the end of a state change into realtime playing
    *****************************************************************/
    void realtimeSwitchEnds();

    /*!***************************************************************
    * Method : playingStarted
    *
    * Take into account a entering in playing state (replay)
    *****************************************************************/
    void playingStarted();

    /*!***************************************************************
    * Method : playingPaused
    *
    * Take into account a pause in playing
    *****************************************************************/
    void playingPaused();

    /*!***************************************************************
    * Method : currentTimeUpdated
    *
    * Take into account an update of current time
    *****************************************************************/
    void currentTimeUpdated();

    /*!***************************************************************
    * Method : visuWindowPosUpdated
    *
    * Take into account an update of visualization window position when playing
    *****************************************************************/
    void visuWindowPosUpdated();

    /*!***************************************************************
    * Method : currentTimeExtendVisuWnd
    *
    * Take into account an update of visualization window position when playing
    *****************************************************************/
    void currentTimeExtendVisuWnd();

    /*!***************************************************************
    * Method : speedUpdated
    *
    * \param isPlayingStateUpd Set to true if playing state is updated upon this event
    *
    * Take into account a playing speed
    *****************************************************************/
    void speedUpdated(core::BOOL isPlayingStateUpd);

    /*!***************************************************************************
     * Method : timebarDataSaveRequested
     *
     * Warn that user request a save of all timebar data
     ****************************************************************************/
    void timebarDataSaveRequested();

    /*!***************************************************************
    * Method : timelineAdded
    *
    * \param tlId     Unique id of the timeline
    * \param model    Reference to the data model of the added timeline
    * \param isMaster Set to true if the added timeline is the master one
    *
    * Take into account a new timeline
    *****************************************************************/
    void timelineAdded(core::INT32 tlId,timeBarsModel::Timeline* model,core::BOOL isMaster);

    /*!***************************************************************
    * Method : timelineRemoved
    *
    * \param tlId     Unique id of the removed timeline
    * \param isMaster Set to true if the removed timeline is the master one
    *
    * Remove a timeline
    *****************************************************************/
    void timelineRemoved(core::INT32 tlId, core::BOOL isMaster);

    /*!***************************************************************
    * Method : timelineOffsetUpdated
    *
    * \param tlId   Unique id of the timeline
    * \param offset New offset of the timeline
    *
    * Take into account a new timeline offset
    *****************************************************************/
    void timelineOffsetUpdated(core::INT32 tlId, qint64 offset);

    /*!***************************************************************
    * Method : timelineNameUpdated
    *
    * \param tlId      Unique id of the timeline
    * \param newName   New name of the timeline
    *
    * Take into account a new timeline name
    *****************************************************************/
    void timelineNameUpdated(core::INT32 tlId, QString newName);

protected slots:

    /*!*******************************************************************
     * Method : visualizationModeModified
     *
     * Called on visualization mode update
     ********************************************************************/
    void visualizationModeModified();

    /*!*******************************************************************
     * Method : lowerSlideLimitModified
     *
     * Called on lower sliding mode limit update
     ********************************************************************/
    void lowerSlideLimitModified();

    /*!*******************************************************************
     * Method : upperSlideLimitModified
     *
     * Called on lower sliding mode limit update
     ********************************************************************/
    void upperSlideLimitModified();

    /*!*******************************************************************
     * Method : upperExtendedLimitModified
     *
     * Called on lower extended mode limit update
     ********************************************************************/
    void upperExtendedLimitModified();

    /*!*******************************************************************
     * Method : defaultVisuWindowWidthModified
     *
     * Called on default visualization width update
     ********************************************************************/
    void defaultVisuWindowWidthModified();

    /*!******************************************************************
     * Method : rulerDataModified
     *
     * Called on ruler data update
     ********************************************************************/
    void rulerDataModified();

    /*!*****************************************************************
     * Method : timeSpecDataModified
     *
     * Called on time specification data update
     ********************************************************************/
    void timeSpecDataModified();

protected:
    /*!***************************************************************
    * Method : computePlayingState
    *
    * \return Playing state, one of TimeBarJsModel::*_PLAYINGSTATE values
    *
    * Compute the playing state from the data model
    *****************************************************************/
    QString computePlayingState();

    /*!***************************************************************
    * Method : sendMessage
    *
    * Send the current json message to clients
    *****************************************************************/
    void sendMessage();
};

}



#endif
