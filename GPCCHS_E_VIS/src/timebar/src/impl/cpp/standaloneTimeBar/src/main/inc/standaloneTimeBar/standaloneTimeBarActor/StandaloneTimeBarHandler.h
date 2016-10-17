/*!*******************************************************************
 * Project : ISIS
 * Component : GPCCHS_E_VIS
 * \file StandaloneTimeBarHandler.h
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

#ifndef STANDALONETIMEBAR_STANDALONETIMEBARACTOR_STANDALONETIMEBARHANDLER_H_
#define STANDALONETIMEBAR_STANDALONETIMEBARACTOR_STANDALONETIMEBARHANDLER_H_

// Start of user code includes
#include <QtCore/QString>

// End of user code

#include "core/Message.h"
#include "core/UINT16.h"
#include "core/INT32.h"
#include "container/IsisPipe.h"
#include "container/IsisActor.h"
#include "container/CmdHandler.h"

// Start of user code namespaces

// End of user code

namespace standaloneTimeBar{

namespace standaloneTimeBarActor{

class StandaloneTimeBarHandler : public ::container::CmdHandler{

protected:
    // Start of user code ProtectedAttrZone
	static const QString SOCKET_URI_BASE;                 ///< URI template for the used socket binding
	static const QString PULL_PORT_ENV_VAR_NAME;          ///< Name of the environment variable containing the PULL socket port number
    // End of user code

public :
    /*!***************************************************************************
     * Method : StandaloneTimeBarHandler::StandaloneTimeBarHandler
     *
     * \brief Constructor
     *
     * \param actor The Isis actor
     * 
     * Constructor
     ****************************************************************************/
	StandaloneTimeBarHandler(container::IsisActor* const actor);

    /*!***************************************************************************
     * Method : StandaloneTimeBarHandler::~StandaloneTimeBarHandler
     *
     * \brief Destructor
     * 
     * Destructor
     ****************************************************************************/
    virtual ~StandaloneTimeBarHandler();

    /*!***************************************************************************
     * Method : CmdHandler::handleCmd
     *
     * \brief Handle command
     * 
     * \param pipe The Isis pipe
     * \param cmd The command id
     * \param msg The pipe message
     * \return core::INT32 0 if no error, -1 otherwise
     *
     * Handle command
     ****************************************************************************/
    core::INT32 handleCmd(container::IsisPipe* pipe, const core::UINT16 cmd, core::Message * const msg);

protected:
    // Start of user code ProtectedOperZone

    // End of user code

};

}

}

#endif
