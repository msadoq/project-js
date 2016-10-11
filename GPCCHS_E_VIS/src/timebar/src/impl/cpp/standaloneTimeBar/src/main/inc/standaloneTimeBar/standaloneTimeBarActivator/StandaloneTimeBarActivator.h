// Produced by Acceleo Cpp Generator 0.0.6-R4S1

/*!*******************************************************************
 * Project : ISIS
 * Component : GPCCHS_E_VIS
 * \file StandaloneTimeBarActivator.h
 * \author isis
 * \date 18/11/2014
 * \brief TODO Enter documentation in RSA model
 * \type BundleActivator
 * 
 * TODO Enter documentation in RSA model
 ********************************************************************/

/********************************************************************
 * HISTORY
 * Start of user code HistoryZone
 *
 * End of user code
 * END-HISTORY
 ********************************************************************/

#ifndef STANDALONETIMEBAR_STANDALONETIMEBARACTIVATOR_STANDALONETIMEBARACTIVATOR_H_
#define STANDALONETIMEBAR_STANDALONETIMEBARACTIVATOR_STANDALONETIMEBARACTIVATOR_H_

// Start of user code includes

// End of user code
#include "container/IsisModuleActor.h"

// Start of user code namespaces

// End of user code

namespace standaloneTimeBar{

namespace standaloneTimeBarActivator{

class StandaloneTimeBarActivator : public ::container::IsisModuleActor{

protected:

protected:
    // Start of user code ProtectedAttrZone

    // End of user code

public:

    /*!***************************************************************************
     * Method : StandaloneTimeBarActivator::launchActor
     *
     * \brief This method is dedicated to thread management.
     * Every actor is launch and instanciated by the same thread
     *
     * \param args Launching arguments
     * \param ctx The context
     * \param parentPipe The parent pipe
     *
     * This method is dedicated to thread management.
     * Every actor is launch and instanciated by the same thread
     ****************************************************************************/
    static void launchActor(void* args, zctx_t* ctx, void* parentPipe);

    /*!***************************************************************************
     * Method : StandaloneTimeBarActivator::StandaloneTimeBarActivator
     *
     * \brief Constructor
     *
     * \param context The context
     * \param parentPipe The Isis pipe
     *
     * Constructor of StandaloneTimeBarActivator
     ****************************************************************************/
    StandaloneTimeBarActivator(core::Context* const context, container::IsisPipe* const parentPipe);

    /*!***************************************************************************
     * Method : StandaloneTimeBarActivator::~StandaloneTimeBarActivator
     *
     * \brief Destructor
     *
     * Destructor of ~StandaloneTimeBarActivator
     ****************************************************************************/
    virtual ~StandaloneTimeBarActivator();

    /*!***************************************************************************
     * Method : StandaloneTimeBarActivator::doInit
     *
     * \brief StandaloneTimeBarActivator initialization
     * 
     * StandaloneTimeBarActivator initialization
     ****************************************************************************/
    void doInit();

    /*!***************************************************************************
     * Method : StandaloneTimeBarActivator::postInit
     *
     * \brief StandaloneTimeBarActivator postinitialization
     *
     * StandaloneTimeBarActivator postinitialization
     ****************************************************************************/
    virtual void postInit();


protected:
    // Start of user code ProtectedOperZone

    // End of user code
};

} // namespace standaloneTimeBarActivator

} // namespace standaloneTimeBar

#endif // STANDALONETIMEBAR_STANDALONETIMEBARACTIVATOR_STANDALONETIMEBARACTIVATOR_H_
