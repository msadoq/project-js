/*!*******************************************************************
 * Project : ISIS
 * Component : GPCC-timeBar
 * \file TimeManagerEvent.cpp
 * \author ohuyard
 * \date 25th august 2016
 * \brief Declaration of TimeManager event type
 ********************************************************************/

/********************************************************************
 * HISTORY
 *
 * END-HISTORY
 ********************************************************************/

#include "timeBar/TimeManagerEvent.h"

namespace timeBar
{

/*!***************************************************************************
 * Method : TimeManagerEvent::TimeManagerEvent
 * Purpose : TimeManagerEvent Constructor
 ****************************************************************************/
TimeManagerEvent::TimeManagerEvent()
{
    _isWndStartPosUpd = false;
    _isWndEndPosUpd = false;
    _isCurTimePosUpd = false;
}

/*!***************************************************************************
 * Method : TimeManagerEvent::~TimeManagerEvent
 * Purpose : TimeManagerEvent Destructor
 ****************************************************************************/
TimeManagerEvent::~TimeManagerEvent()
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
 * Method : TimeManagerEvent::setToWndPosType
 * Purpose : Set the type of the event related to visualisation window position update
 ****************************************************************************/
void TimeManagerEvent::setToWndPosType(core::BOOL activated)
{
    _isWndStartPosUpd=activated;
    _isWndEndPosUpd=activated;
}

/*!***************************************************************************
 * Method : TimeManagerEvent::setCurTimePosType
 * Purpose : Set the type of the event related to current time position update
 ****************************************************************************/
void TimeManagerEvent::setCurTimePosType(core::BOOL activated)
{
    _isCurTimePosUpd=activated;
}

/*!***************************************************************************
 * Method : TimeManagerEvent::isWndStartPosType
 * Purpose : Check is the type of the event is related to the visualization window start position
 *****************************************************************/
core::BOOL TimeManagerEvent::isWndStartPosType() const
{
    return _isWndStartPosUpd;
}

/*!***************************************************************************
 * Method : TimeManagerEvent::isWndEndPosType
 * Purpose : Check is the type of the event is related to the visualization window end position
 *****************************************************************/
core::BOOL TimeManagerEvent::isWndEndPosType() const
{
    return _isWndEndPosUpd;
}

/*!***************************************************************************
 * Method : TimeManagerEvent::isCurTimePosType
 * Purpose : Check is the type of the event is related to the current time position
 *****************************************************************/
core::BOOL TimeManagerEvent::isCurTimePosType() const
{
    return _isCurTimePosUpd;
}

}
