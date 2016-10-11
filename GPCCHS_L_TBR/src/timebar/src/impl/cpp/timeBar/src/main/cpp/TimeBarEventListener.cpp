/*!*******************************************************************
 * Project : ISIS
 * Component : GPCC-timeBar
 * \file TimeBarEventListener.cpp
 * \author ohuyard
 * \date June 4, 2014
 * \brief This class defines the behaviour of the timeBar events listeners.
 ********************************************************************/

/********************************************************************
 * HISTORY
 *
 * END-HISTORY
 ********************************************************************/

#include <QtCore/QDebug>

#include "timeBar/TimeBarEventListener.h"
#include "timeBar/TimeManagers.h"

namespace timeBar
{

/*!***************************************************************************
 * Method : TimeBarEventListener::TimeBarEventListener
 * Purpose : TimeBarEventListener Constructor
 ****************************************************************************/
TimeBarEventListener::TimeBarEventListener()
{
    // Nothing to do
}

/*!***************************************************************************
 * Method : TimeBarEventListener::~TimeBarEventListener
 * Purpose : TimeBarEventListener Destructor
 ****************************************************************************/
TimeBarEventListener::~TimeBarEventListener()
{
    // Perform a try catch according to coding rule
    try {
        // Ask the TimeManagers to unsubscribe this listener from all notification, as its TimeManager won't be able to know that it has been deleted
        timeBar::TimeManagers::get()->unsubscribeListenerFromAll(this);
    }
    catch (...) {
        // Nothing to do
    }
}

}
