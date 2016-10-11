// Produced by Acceleo Cpp Generator 0.0.6-R4S1

/*!*******************************************************************
 * Project : ISIS
 * Component : GPCCHS_E_VIS
 * \file StandaloneTimeBarActivator.cpp
 * \author Olivier HUYARD
 * \date 29/09/2016
 * \brief StandaloneTimeBar bundle activator
 * \type Bundle Activator
 ********************************************************************/

/********************************************************************
 * HISTORY
 * Start of user code HistoryZone
 *
 * End of user code
 * END-HISTORY
 ********************************************************************/

// Start of user code includes

#include <QtCore/QDebug>


// End of user code
#include <sstream>
#include "ccsds_mal/URI.h"
#include "container/IsisPipe.h"
#include "container/ActorIDGenerator.h"
#include "core/ChannelHandler.h"
#include "standaloneTimeBar/standaloneTimeBarActivator/StandaloneTimeBarMMIBundle.h"

#include "core/IsisHelper.h"
#include "ccsds_mal/ServiceDefinition.h"
#include "container/LaunchActorArguments.h"
#include "commonMMIUtils/ComManager.h"

#include "standaloneTimeBar/standaloneTimeBarActivator/StandaloneTimeBarActivator.h"

namespace standaloneTimeBar{

namespace standaloneTimeBarActivator{

/*!***************************************************************************
 * Method : launchActor
 * Purpose : This method is dedicated to thread management
 *      Every reactor is launch and instanciated by the same thread
 *****************************************************************************/
void StandaloneTimeBarActivator::launchActor(void* args, zctx_t* ctx, void* parentPipe)
{
    // Get context from args


    container::LaunchActorArguments* arguments = reinterpret_cast<container::LaunchActorArguments*>(args);

    // Create Isis Pipe
    container::IsisPipe* pipe = new container::IsisPipe(arguments->getContext(), parentPipe);

    // Create the StandaloneTimeBarActivator instance
    StandaloneTimeBarActivator standaloneTimeBarActivator(arguments->getContext(), pipe);

    // Start of user code launchActor
    // End of user code

    // Start the actor loop
    standaloneTimeBarActivator.start();
}

/*!***************************************************************************
 * Method : StandaloneTimeBarActivator::StandaloneTimeBarActivator
 * Purpose : Constructor
 ****************************************************************************/
StandaloneTimeBarActivator::StandaloneTimeBarActivator(core::Context* const context, container::IsisPipe* const parentPipe)
: IsisModuleActor(context, parentPipe)
{
    // generated
    // Start of user code Constructor
    // End of user code
}

/*!***************************************************************************
 * Method : StandaloneTimeBarActivator::~StandaloneTimeBarActivator
 * Purpose : Destructor
 ****************************************************************************/
StandaloneTimeBarActivator::~StandaloneTimeBarActivator()
{    
    // generated

    // Start of user code Destructor
    // End of user code
}

/*!***************************************************************************
 * Method : StandaloneTimeBarActivator::doInit
 * Purpose : StandaloneTimeBarActivator initialization
 ****************************************************************************/
void StandaloneTimeBarActivator::doInit()
{    
    // generated
    container::IsisModuleActor::doInit();


    std::stringstream ipcpath; //pipe full path
    int id; //pseudo actor ID
    ccsds_mal::URI* uri; // pipe uri
    container::IsisPipe * ipc;
    ipcpath << PIPE_URI_PREFIX << _context->getContainerDirectory() << "/" << StandaloneTimeBarMMIBundle::getPipeId().toStdString()  << _context->getActorContext()->getPID();
    id = container::ActorIDGenerator::getActorIdentifier(_context->getActorContext());
    uri = new ccsds_mal::URI(const_cast<core::C_STRING>(ipcpath.str().c_str()));
    ipc = new container::IsisPipe(_context->getActorContext(), uri , true);

    // Register the communication pipe
    _manager->registerPipe(ipc, id);
    
    // don't monitor this pipe
    stopPipeMonitor(id);


    // Start of user code doInit
    commonMMIUtils::ComManager::getInstance()->registerIsisActorContext(StandaloneTimeBarMMIBundle::getPipeId(),this->getContext());
    // End of user code
}


/*!***************************************************************************
 * Method : StandaloneTimeBarActivator::postInit
 * Purpose : StandaloneTimeBarActivator postinitialization
 ****************************************************************************/
void StandaloneTimeBarActivator::postInit(){

    // generated

    // Start of user code postInit
    // End of user code
}




extern "C" void create(void *args, zctx_t *ctx, void *pipe) {
    StandaloneTimeBarActivator::launchActor(args, ctx, pipe);
}

// Start of user code ProtectedOperZone

// End of user code

} // namespace standaloneTimeBarActivator

} // namespace standaloneTimeBar
