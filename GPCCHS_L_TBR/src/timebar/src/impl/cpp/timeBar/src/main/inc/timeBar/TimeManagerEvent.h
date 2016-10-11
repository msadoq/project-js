/*!*******************************************************************
 * Project : ISIS
 * Component : GPCC-timeBar
 * \file TimeManagerEvent.h
 * \author ohuyard
 * \date 25th august 2016
 * \brief Declaration of TimeManager event type
 ********************************************************************/

/********************************************************************
 * HISTORY
 *
 * END-HISTORY
 ********************************************************************/

#ifndef TIMEBAR_TIMEMANAGEREVENT_H
#define TIMEBAR_TIMEMANAGEREVENT_H

#include "core/BOOL.h"

namespace timeBar
{

class TimeManagerEvent
{
protected:
    core::BOOL _isWndStartPosUpd; ///< The event is of type visualization window start position update
    core::BOOL _isWndEndPosUpd; ///< The event is of type visualization window end position update
    core::BOOL _isCurTimePosUpd; ///< The event is of type current time position update

public:
    /*!***************************************************************
     * Method : TimeManagerEvent
     *
     * TimeManagerEvent Constructor without parameters
     *****************************************************************/
    TimeManagerEvent();

    /*!***************************************************************
     * Method : ~TimeManagerEvent
     *
     * TimeManagerEvent Destructor
     *****************************************************************/
    virtual ~TimeManagerEvent();

    /*!***************************************************************
     * Method : setToWndPosType
     *
     * \param activated Activation status to visualisation window position update
     *
     * Set the type of the event related to visualisation window position update
     *****************************************************************/
    void setToWndPosType(core::BOOL activated);

    /*!***************************************************************
     * Method : setCurTimePosType
     *
     * \param activated Activation status to current time position update
     *
     * Set the type of the event related to current time position update
     *****************************************************************/
    void setCurTimePosType(core::BOOL activated);

    /*!***************************************************************
     * Method : isWndStartPosType
     *
     * \return bool Is true if the event type contains the visualisation window start position
     *
     * Check is the type of the event is related to the visualization window start position
     *****************************************************************/
    core::BOOL isWndStartPosType() const;

    /*!***************************************************************
     * Method : isWndEndPosType
     *
     * \return bool Is true if the event type contains the visualisation window end position
     *
     * Check is the type of the event is related to the visualization window end position
     *****************************************************************/
    core::BOOL isWndEndPosType() const;

    /*!***************************************************************
     * Method : isCurTimePosType
     *
     * \return bool Is true if the event type contains the current time position
     *
     * Check is the type of the event is related to the current time position
     *****************************************************************/
    core::BOOL isCurTimePosType() const;
};

}
#endif
