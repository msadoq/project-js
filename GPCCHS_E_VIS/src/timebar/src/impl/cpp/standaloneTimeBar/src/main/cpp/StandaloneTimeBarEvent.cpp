/*!*******************************************************************
 * Project : ISIS
 * Component : StandaloneTimeBarEvent
 * \file StandaloneTimeBarEvent.cpp
 * \author OHD
 * \date 17/10/2016
 * \brief StandaloneTimeBar specific events
 *
 * Class to defined StandaloneTimeBar specific events
 ********************************************************************/

/********************************************************************
 * HISTORY
 *
 * END-HISTORY
 ********************************************************************/

#include "standaloneTimeBar/StandaloneTimeBarEvent.h"

namespace standaloneTimeBar
{

/*!***************************************************************************
 * Method : StandaloneTimeBarEvent::StandaloneTimeBarEvent
 * Purpose : constructor
 ****************************************************************************/
StandaloneTimeBarEvent::StandaloneTimeBarEvent(QByteArray timeBarConf):
    QEvent(QEvent::User),
	_timebarConf(timeBarConf)
{
	// Nothing more to do
}

/*!***************************************************************************
 * Method : StandaloneTimeBarEvent::~StandaloneTimeBarEvent
 * Purpose : destructor
 ****************************************************************************/
StandaloneTimeBarEvent::~StandaloneTimeBarEvent()
{
    // Perform a try catch according to coding rule
    try {
        // Nothing to do
    } catch (...) {}
}

/*!***************************************************************************
 * Method : StandaloneTimeBarEvent::getTimeBarConf
 * Purpose : Get the timebar configuration
 ****************************************************************************/
QByteArray StandaloneTimeBarEvent::getTimeBarConf()
{
	return _timebarConf;
}

}
