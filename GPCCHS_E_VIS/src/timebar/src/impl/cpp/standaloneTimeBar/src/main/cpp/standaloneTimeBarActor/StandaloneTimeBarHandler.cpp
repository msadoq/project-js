/*!*******************************************************************
 * Project : ISIS
 * Component : GPCCHS_E_VIS
 * \file StandaloneTimeBarHandler.cpp
 * \author OHD
 * \date 17/10/2016
 * \brief StandaloneTimeBar Handler
 * \type Handler
 ********************************************************************/

/********************************************************************
 * HISTORY
 * Start of user code HistoryZone
 *
 * End of user code
 * END-HISTORY
 ********************************************************************/

#include <QtCore/QString>
#include <QtCore/QCoreApplication>

#include "core/UINT32.h"
#include "core/BOOL.h"

#include "commonMMI/MMIBundleInterface.h"
#include "commonMMI/GUIApplication.h"

#include "timeBar/TimeBarSocket.h"

#include "standaloneTimeBar/standaloneTimeBarActor/StandaloneTimeBarHandler.h"
#include "standaloneTimeBar/standaloneTimeBarActivator/StandaloneTimeBarMMIBundle.h"
#include "standaloneTimeBar/StandaloneTimeBarEvent.h"

namespace standaloneTimeBar{

namespace standaloneTimeBarActor{

const QString StandaloneTimeBarHandler::SOCKET_URI_BASE        = QString("tcp://127.0.0.1:%1");
const QString StandaloneTimeBarHandler::PULL_PORT_ENV_VAR_NAME = QString("PORT_NUM_TIMEBAR_PULL");

/*!***************************************************************************
 * Method : StandaloneTimeBarHandler::StandaloneTimeBarHandler
 * Purpose : Constructor
 ****************************************************************************/
StandaloneTimeBarHandler::StandaloneTimeBarHandler(container::IsisActor * const actor)
: container::CmdHandler(actor)
{    
	// Nothing to do
}

/*!***************************************************************************
 * Method : StandaloneTimeBarHandler::~StandaloneTimeBarHandler
 * Purpose : Destructor
 ****************************************************************************/
StandaloneTimeBarHandler::~StandaloneTimeBarHandler()
{    
    // Perform a try catch according to coding rule
    try {
        // Nothing to do
    } catch (...) {}
}

/*!***************************************************************************
 * Method : StandaloneTimeBarHandler::handleCmd
 * Purpose : Handle command
 ****************************************************************************/
core::INT32 StandaloneTimeBarHandler::handleCmd(container::IsisPipe* pipe, const core::UINT16 cmd, core::Message * const msg)
{
	core::UINT32 port = 0;
	core::BOOL portNumValid = false;
	core::UINT32 socketID = 0;
	QByteArray timeBarConf;
	commonMMI::MMIBundleInterface * dest = 0;
	standaloneTimeBar::standaloneTimeBarActivator::StandaloneTimeBarMMIBundle * standaloneTimeBarBundle = 0;
	standaloneTimeBar::StandaloneTimeBarEvent * event = 0;
	QString envVarName(PULL_PORT_ENV_VAR_NAME);

	// Check if the environment variable for the port number of this timebar exists
	if( qEnvironmentVariableIsSet(qPrintable(envVarName)) ) {
			// Retrieve the value of the environment variable
			port = qgetenv(qPrintable(envVarName)).toInt(&portNumValid);
			// Check if conversion of the variable value into integer succeeded
			if(portNumValid) {
				// Create the socket for the timebar
				socketID = timeBar::TimeBarSocket::get()->createSocket(ZMQ_PULL,"StandaloneTimeBar",SOCKET_URI_BASE.arg(port));
				// Check if the socket creation succeeded
				if(socketID) {
					LOF_INFO(QString("TimeBar is waiting to received its configuration from URI : %1 ").arg(SOCKET_URI_BASE.arg(port)));
					// Start endless reception loop to receive timebar creation request with their configuration
					while(1) {
						// Wait for the timebar configuration from javascript
						timeBar::TimeBarSocket::get()->receive(socketID,timeBarConf);

						// Send the received configuration into an event
						dest = commonMMI::GUIApplication::get()->getBundle(standaloneTimeBar::standaloneTimeBarActivator::StandaloneTimeBarMMIBundle::getPipeId());
						standaloneTimeBarBundle = dynamic_cast<standaloneTimeBar::standaloneTimeBarActivator::StandaloneTimeBarMMIBundle*>(dest);

						// If the reference to the destination has been correctly retrieved, post the event
						if(standaloneTimeBarBundle){
							event =  new StandaloneTimeBarEvent(timeBarConf);
							QCoreApplication::postEvent(standaloneTimeBarBundle,event);
							// Do not delete the created event, because it shall be the work of the receiver (Qt framework rule)
						}
					}

					// Delete the PULL socket not more usefull
					timeBar::TimeBarSocket::get()->deleteSocket(socketID);
				} else {
					// Report the socket creation error
					LOF_ERROR(QString("Socket creation failed to retrieve timeBar configuration from URI ").arg(SOCKET_URI_BASE.arg(port)));
				}
			} else {
				// Report the port number error
				LOF_ERROR(QString("Port number in environment variable %1 is not a valid number").arg(envVarName));
			}
	} else {
   		// Report the port definition error
		LOF_ERROR(QString("Environment variable for port number to be used by timebar not defined. Expected variable is : %1").arg(envVarName));
	}

    return 0;
}

}

}
