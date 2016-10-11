/*!*******************************************************************
 * Project : ISIS
 * Component : GPCC-timeBar
 * \file TimelineSignalRouter.h
 * \author ohuyard
 * \date 25th august 2016
 * \brief Declaration of TimeManager event type
 ********************************************************************/

/********************************************************************
 * HISTORY
 *
 * END-HISTORY
 ********************************************************************/

#ifndef TIMEBAR_TIMELINESIGNALROUTER_H
#define TIMEBAR_TIMELINESIGNALROUTER_H

#include "TimeBar_global.h"

#include <QtCore/QObject>
#include <QtCore/QString>

#include "core/INT32.h"
#include "core/INT64.h"

namespace timeBar
{

// Early declaration for TimelineSignalRouter
class TimeManager;

class TimelineSignalRouter: public QObject
{
    Q_OBJECT

private:
    core::INT32 _uniqueId;              ///< Unique identifier of the timeline
    TimeManager * _manager;             ///< TimeManager to trigger with the timeline id

public:
    /*!***************************************************************
     * Method : TimelineSignalRouter
     *
     * TimelineSignalRouter Constructor
     *****************************************************************/
    TimelineSignalRouter();

    /*!***************************************************************
     * Method : TimelineSignalRouter
     *
     * TimelineSignalRouter Constructor
     *****************************************************************/
    TimelineSignalRouter(TimeManager * manager, core::INT32 id);

    /*!***************************************************************
     * Method : ~TimelineSignalRouter
     *
     * TimelineSignalRouter Destructor
     *****************************************************************/
    virtual ~TimelineSignalRouter();

public slots:
    /*!***************************************************************
     * Method : offsetModified
     *
     * \param oldOffset Old offset of the moved timeline
     * \param newOffset New offset of the moved timeline
     *
     * Route the timeline signal to its consummer
     *****************************************************************/
    void offsetModified(core::INT64 oldOffset, core::INT64 newOffset);

    /*!***************************************************************
     * Method : timelineRenamed
     *
     * \param oldName  Old name of the timeline in the data model
     * \param newName  New name of the timeline in the data model
     *
     * Route the timeline signal to its consummer
     *****************************************************************/
    void timelineRenamed(const QString & oldName, const QString & newName);

};

}
#endif
