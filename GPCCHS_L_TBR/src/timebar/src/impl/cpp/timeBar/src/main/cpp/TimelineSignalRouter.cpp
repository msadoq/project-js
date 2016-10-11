/*!*******************************************************************
 * Project : ISIS
 * Component : GPCC-timeBar
 * \file TimelineSignalRouter.cpp
 * \author ohuyard
 * \date 25th august 2016
 * \brief Declaration of TimeManager event type
 ********************************************************************/

/********************************************************************
 * HISTORY
 *
 * END-HISTORY
 ********************************************************************/

#include <QtCore/QDebug>

#include "timeBar/TimelineSignalRouter.h"
#include "timeBar/TimeManager.h"

namespace timeBar
{

/*!***************************************************************************
 * Method : TimelineSignalRouter::TimelineSignalRouter
 * Purpose : TimelineSignalRouter Constructor
 ****************************************************************************/
TimelineSignalRouter::TimelineSignalRouter() :
        QObject()
{
    // Initialize id to invalid value
    _uniqueId = 0;
    // Initialize receiver pointer
    _manager = 0;
}

/*!***************************************************************************
 * Method : TimelineSignalRouter::TimelineSignalRouter
 * Purpose : TimelineSignalRouter Constructor
 ****************************************************************************/
TimelineSignalRouter::TimelineSignalRouter(TimeManager * manager, core::INT32 id) :
        QObject()
{
    // Initialize id
    _uniqueId = id;
    // Initialize receiver pointer
    _manager = manager;
}

/*!***************************************************************************
 * Method : TimelineSignalRouter::~TimelineSignalRouter
 * Purpose : TimelineSignalRouter Destructor
 ****************************************************************************/
TimelineSignalRouter::~TimelineSignalRouter()
{
    // Perform a try catch according to coding rule
    try {
        // Nothing to do
    }
    catch (...) {
        // Nothing to do
    }
}

/*!***************************************************************************
 * Method : TimelineSignalRouter::offsetModified
 * Purpose : Route the timeline signal to its consummer
 ****************************************************************************/
void TimelineSignalRouter::offsetModified(core::INT64 oldOffset, core::INT64 newOffset)
{
    if(_manager) {
        _manager->offsetModified(_uniqueId,oldOffset,newOffset);
    }
}

/*!***************************************************************************
 * Method : TimelineSignalRouter::timelineRenamed
 * Purpose : Route the timeline signal to its consummer
 ****************************************************************************/
void TimelineSignalRouter::timelineRenamed(const QString & oldName, const QString & newName)
{
    if(_manager) {
        _manager->timelineRenamed(_uniqueId,oldName,newName);
    }
}

}
