/*!*******************************************************************
 * Project : ISIS
 * Component : GPCCHS_E_VIS
 * \file StandaloneTimeBarActor.cpp
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

// Start of user code includes

// End of user code

#include "standaloneTimeBar/standaloneTimeBarActor/StandaloneTimeBarActor.h"

#include "core/IsisHelper.h"
#include "container/LaunchActorArguments.h"

namespace standaloneTimeBar{

namespace standaloneTimeBarActor{

/*!***************************************************************************
 * Method : launchActor
 * Purpose : This method is dedicated to thread management
 *      Every actor is launch and instanciated by the same thread
 *****************************************************************************/
void StandaloneTimeBarActor::launchActor(void* args, zctx_t* ctx, void* parentPipe)
{
    // Get context from args



    container::LaunchActorArguments* arguments = reinterpret_cast<container::LaunchActorArguments*>(args);

    // Create Isis Pipe
    container::IsisPipe* pipe = new container::IsisPipe(arguments->getContext(), parentPipe);

    // Create the StandaloneTimeBarActor instance
    StandaloneTimeBarActor standaloneTimeBarActor(container::NORMAL_NODE, pipe);

    // Start of user code launchActor
    // End of user code
    // Start the actor loop
    standaloneTimeBarActor.start();
}

/*!***************************************************************************
 * Method : StandaloneTimeBarActor::StandaloneTimeBarActor
 * Purpose : Constructor
 ****************************************************************************/
StandaloneTimeBarActor::StandaloneTimeBarActor(const container::PipeNodeType nodeType, container::IsisPipe * const parentPipe)
: IsisActor(nodeType, parentPipe), _standaloneTimeBarHandler(0)

{    
    // generated



    // Start of user code Constructor
    // End of user code

}

/*!***************************************************************************
 * Method : StandaloneTimeBarActor::~StandaloneTimeBarActor
 * Purpose : Destructor
 ****************************************************************************/
StandaloneTimeBarActor::~StandaloneTimeBarActor()

{    
    // Start of user code init_DestructorTryCatch
    // End of user code
    try{
    // Start of user code Destructor
    // End of user code
    }
    // Start of user code catchDestructorException
    // End of user code
    catch(...){
    // Start of user code defaultCatchDestructorException
    // End of user code
    }
}

/*!***************************************************************************
 * Method : StandaloneTimeBarActor::doInit
 * Purpose : StandaloneTimeBarActor initialization
 ****************************************************************************/
void StandaloneTimeBarActor::doInit()
{    
    // generated
        registerStandaloneTimeBarHandler();
    // Start of user code doInit

    // End of user code
}

/*!***************************************************************************
 * Method : StandaloneTimeBarActor::postInit
 * Purpose : StandaloneTimeBarActor initialization
 ****************************************************************************/
void StandaloneTimeBarActor::postInit(){

    // generated
    // Start of user code postInit

    // End of user code
}

/*!***************************************************************************
 * Method : StandaloneTimeBarActor::registerStandaloneTimeBarHandler
 * Purpose : Register handler 
 ****************************************************************************/
void StandaloneTimeBarActor::registerStandaloneTimeBarHandler(){
    _standaloneTimeBarHandler = new StandaloneTimeBarHandler(this);

    registerCmdHandler(280, _standaloneTimeBarHandler);
    registerNodeCmd(280);
    // Start of user code registerStandaloneTimeBarHandler

    // End of user code
}


}

}
