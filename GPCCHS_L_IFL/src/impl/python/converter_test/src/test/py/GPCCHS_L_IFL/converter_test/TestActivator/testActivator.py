# Produced by Acceleo Python Generator 1.1.2-R8

# -*- coding: utf-8 -*-
"""!
Project   : ISIS
Component : GPCCHS_L_IFL
@file     : TestActivator.py
@author   : isis
@date     : 
@brief    : TODO Enter documentation in RSA model
@type     : BundleActivator
"""


# ====================================================================
# Start of user code HistoryZone
# HISTORY
#
# END-HISTORY
# End of user code HistoryZone
# ====================================================================


from GPCCHS_L_IFL.converter_test.ConverterUser.converterUser import ConverterUser
from GPCC.ccsds_mal.interactorFactory import InteractorFactory
from GPCC.ccsds_mal.serviceDefinition import ServiceDefinition
from GPCC.container.isisModuleActor import IsisModuleActor
from GPCC.core.propertyType import PropertyType
from GPCC.ccsds_mal.uOCTET import UOCTET
from GPCC.ccsds_mal.uSHORT import USHORT
from GPCC.ccsds_mal.uLONG import ULONG
# Start of user code ImportsZone
from GPCC.ccsds_mal.sTRING import STRING
from GPCC.ccsds_mal.uINTEGER import UINTEGER
from GPCC.container.pipeNodeCmd import PipeNodeCmd
from GPCC.container.pipeMessage import PipeMessage
from GPCC.container.interPipeProtocolManager import InterPipeProtocolManager
from GPCC.ccsds_mal.attributeType import AttributeType
# End of user code

class TestActivator(IsisModuleActor):
    """!
    @brief: GPCCHS_L_IFL.TestActivator : TODO Enter documentation in RSA model
    """

    # Start of user code ProtectedAttrZone
    
    # End of user code

    def __init__(self, context, parentPipe):
        """!
        @brief : Constructor of TestActivator
        @param : context (core::Context)
        @param : parentPipe (container::IsisPipe)
        """
        # generated
        IsisModuleActor.__init__(self, context, parentPipe)
        
        
        self._converterUser = None
        

        
        # Start of user code Constructor

        # End of user code

    def __del__(self):
        """!
        @brief : Destructor of TestActivator
        """
        # generated
        del self._converterUser
        
        # Start of user code Destructor

        # End of user code

    @staticmethod
    def launchActor(ctx, parentPipe, args=None):
        """!
        @brief : This method is dedicated to thread management 
            Every reactor is launch and instanciated by the same thread
        @param : ctx The context
        @param : parentPipe The parent pipe
        @param : args Launching arguments
        """

        # Create the actor instance
        actor = TestActivator(ctx, parentPipe)
        
        # Start of user code launchActor

        # End of user code

        # Start the actor loop
        actor.start()
        return

    def initModule(self):
        """!
        @brief : TestActivator initialization
        """
        # generated
        # Register the actorGroup
        self.registerActorGroup("TestActivator", self.getActorID())

        # Register Handlers



        # Start of user code initModule
        
        # End of user code

    def onStop(self, stopCause):
        """!
        @brief TestActivator.onStop
               Method called on stop
        @param ActorStopCause : stopCause, Stop cause
        """
        # Start of user code onStop
        # optional injection point, empty by default
        return
        # End of user code
        
    def onExit(self):
        """!
        @brief : TestActivator activator termination process hook
        """
        # generated
        # Start of user code onExit

        # End of user code

    def onActivate(self):
        """!
        @brief : TestActivator post activation process hook
        """
        # generated


        # Start of user code onActivate
        self.createConverterUser()
        # End of user code

    def onPropertyUpdate(self, propertyType, propertyName, propertyValue):
        """!
        @brief : TestActivator property update process hook
        @param PropertyType : property, 
        @param STRING : propertyName, 
        @param ATTRIBUTE : propertyValue, 
        """
        # generated

        IsisModuleActor.onPropertyUpdate(self, propertyType, propertyName, propertyValue)

        # Start of user code onPropertyUpdate
        
        # End of user code

    def postInit(self):
        """!
        @brief : TestActivator initialization
        """
        # generated

        # Start of user code postInit
        pass
        # End of user code


    def createConverterUser(self):
        """!
        @brief : createConverterUser : Used to create every instance of ConverterUser managed by this BundleActivator
        """
        # generated
        args = None
        actorID = ULONG(0)
        # Start of user code argsCreateConverterUser
            
        # End of user code
        self.createActor( ConverterUser.launchActor, args, "ConverterUser", actorID )

        # Start of user code createConverterUser

        # End of user code
    

    
    
    # Start of user code ProtectedOperZone

    # End of user code

