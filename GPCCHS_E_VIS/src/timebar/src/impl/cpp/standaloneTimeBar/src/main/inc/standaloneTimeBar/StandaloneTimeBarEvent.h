/*!*******************************************************************
 * Project : ISIS
 * Component : StandaloneTimeBarEvent
 * \file StandaloneTimeBarEvent.h
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

#ifndef STANDALONETIMEBAR_STANDALONETIMEBAR_STANDALONETIMEBAREVENT_H_
#define STANDALONETIMEBAR_STANDALONETIMEBAR_STANDALONETIMEBAREVENT_H_


#include <QtCore/QEvent>
#include <QtCore/QByteArray>

namespace standaloneTimeBar
{

class StandaloneTimeBarEvent: public QEvent
{
public:


protected:

	QByteArray _timebarConf;       ///< Single timebar configuration

public:
    /*!***************************************************************
     * Method : StandaloneTimeBarEvent
     *
     * \param timeBarConf Received timebar configuration
     *
     * Constructor
     *****************************************************************/
	StandaloneTimeBarEvent(QByteArray timeBarConf);

    /*!***************************************************************
     * Method : ~StandaloneTimeBarEvent
     *
     * Destructor
     *****************************************************************/
    virtual ~StandaloneTimeBarEvent();

    /*!***************************************************************
     * Method : getTimeBarConf
     *
     * Get the timebar configuration
     *****************************************************************/
    QByteArray getTimeBarConf();

};

}

#endif
