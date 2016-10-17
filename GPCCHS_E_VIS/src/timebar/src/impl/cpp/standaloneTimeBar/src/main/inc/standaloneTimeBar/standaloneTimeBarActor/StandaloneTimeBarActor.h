/*!*******************************************************************
 * Project : ISIS
 * Component : GPCCHS_E_VIS
 * \file StandaloneTimeBarActor.h
 * \author OHD
 * \date 17/10/2016
 * \brief StandaloneTimeBar Actor
 * \type Actor
 ********************************************************************/

/********************************************************************
 * HISTORY
 * Start of user code HistoryZone
 *
 * End of user code
 * END-HISTORY
 ********************************************************************/

#ifndef STANDALONETIMEBAR_STANDALONETIMEBARACTOR_STANDALONETIMEBARACTOR_H__
#define STANDALONETIMEBAR_STANDALONETIMEBARACTOR_STANDALONETIMEBARACTOR_H__

// Start of user code includes

// End of user code

#include "standaloneTimeBar/standaloneTimeBarActor/StandaloneTimeBarHandler.h"
#include "container/IsisActor.h"

// Start of user code namespaces

// End of user code

namespace standaloneTimeBar{

namespace standaloneTimeBarActor{

// Start of user code GlobalNamespaceAttributes

// End of user code

class StandaloneTimeBarActor : public ::container::IsisActor{

protected:

    ::standaloneTimeBar::standaloneTimeBarActor::StandaloneTimeBarHandler* _standaloneTimeBarHandler;

protected:
    // Start of user code ProtectedAttrZone

    // End of user code

public:
    /*!***************************************************************************
     * Method : StandaloneTimeBarActor::launchActor
     *
     * \brief This method is dedicated to thread management.
     * Every actor is launch and instanciated by the same thread
     *
     * \param args Launching arguments
     * \param ctx The context
     * \param parentPipe The parent pipe
     * This method is dedicated to thread management.
     * Every actor is launch and instanciated by the same thread
     ****************************************************************************/
    static void launchActor(void* args, zctx_t* ctx, void* parentPipe);

    /*!***************************************************************************
     * Method : StandaloneTimeBarActor::StandaloneTimeBarActor
     *
     * \brief Constructor
     *
     * \param nodeType The node type
     * \param parentPipe The parent pipe
     *
     * Constructor
     ****************************************************************************/
    StandaloneTimeBarActor(const container::PipeNodeType nodeType, container::IsisPipe * const parentPipe);

    /*!***************************************************************************
     * Method : StandaloneTimeBarActor::~StandaloneTimeBarActor
     *
     * \brief Destructor
     *
     * Destructor
     ****************************************************************************/
    virtual ~StandaloneTimeBarActor();

    /*!***************************************************************************
     * Method : StandaloneTimeBarActor::doInit
     *
     * \brief StandaloneTimeBarActor initialization
     * 
     * StandaloneTimeBarActor initialization
     ****************************************************************************/
    void doInit();

    /*!***************************************************************************
     * Method : StandaloneTimeBarActor::postInit
     *
     * \brief StandaloneTimeBarActor postinitialization
     *
     * StandaloneTimeBarActor postinitialization
     ****************************************************************************/
    virtual void postInit();


    /*!***************************************************************************
     * Method : StandaloneTimeBarActor::registerStandaloneTimeBarHandler
     *
     * \brief Register StandaloneTimeBarHandler handler
     *
     * Register StandaloneTimeBarHandler handler
     ****************************************************************************/
    void registerStandaloneTimeBarHandler();

protected:
    // Start of user code ProtectedOperZone

    // End of user code
};

}

}

#endif
