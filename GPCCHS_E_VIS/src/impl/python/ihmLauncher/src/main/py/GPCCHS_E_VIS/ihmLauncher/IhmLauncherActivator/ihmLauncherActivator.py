# Produced by Acceleo Python Generator 1.1.2-R8

# -*- coding: utf-8 -*-
"""!
Project   : ISIS
Component : GPCCHS_E_VIS
@file     : IhmLauncherActivator.py
@author   : isis
@date     : 
@brief    : Activator of Javascript GPVI IHM
@type     : BundleActivator
"""


# ====================================================================
# Start of user code HistoryZone
# HISTORY
#
# END-HISTORY
# End of user code HistoryZone
# ====================================================================


from GPCCHS_E_VIS.ihmLauncher.IhmLauncherActor.ihmLauncherActor import IhmLauncherActor
from GPCC.ccsds_mal.interactorFactory import InteractorFactory
from GPCC.ccsds_mal.serviceDefinition import ServiceDefinition
from GPCC.container.isisModuleActor import IsisModuleActor
from GPCC.core.propertyType import PropertyType
from GPCC.ccsds_mal.uOCTET import UOCTET
from GPCC.ccsds_mal.uSHORT import USHORT
from GPCC.ccsds_mal.uLONG import ULONG
from GPCC.container.pipeNodeCmd import PipeNodeCmd
from GPCC.container.configurationElementDispatcherHandler import ConfigurationElementDispatcherHandler
from GPCCHS_E_VIS.ihmLauncher.IhmLauncherActivator.ihmLauncherConfigHandler import IhmLauncherConfigHandler
# Start of user code ImportsZone

# End of user code

class IhmLauncherActivator(IsisModuleActor):
    """!
    @brief: GPCCHS_E_VIS.IhmLauncherActivator : Activator of Javascript GPVI IHM
    """

    # Start of user code ProtectedAttrZone
    
    # End of user code

    def __init__(self, context, parentPipe):
        """!
        @brief : Constructor of IhmLauncherActivator
        @param : context (core::Context)
        @param : parentPipe (container::IsisPipe)
        """
        # generated
        IsisModuleActor.__init__(self, context, parentPipe)
        
        
        self._ihmLauncherActor = None
        

        
        # Start of user code Constructor

        # End of user code

    def __del__(self):
        """!
        @brief : Destructor of IhmLauncherActivator
        """
        # generated
        del self._ihmLauncherActor
        
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
        actor = IhmLauncherActivator(ctx, parentPipe)
        
        # Start of user code launchActor

        # End of user code

        # Start the actor loop
        actor.start()
        return

    def initModule(self):
        """!
        @brief : IhmLauncherActivator initialization
        """
        # generated
        # Register the actorGroup
        self.registerActorGroup("IhmLauncherActivator", self.getActorID())

        # Register Handlers
        self.registerIhmLauncherConfigHandler()



        # Start of user code initModule
        
        # End of user code

    def onStop(self, stopCause):
        """!
        @brief IhmLauncherActivator.onStop
               Method called on stop
        @param ActorStopCause : stopCause, Stop cause
        """
        # Start of user code onStop
        # optional injection point, empty by default
        return
        # End of user code
        
    def onExit(self):
        """!
        @brief : IhmLauncherActivator activator termination process hook
        """
        # generated
        # Start of user code onExit

        # End of user code

    def onActivate(self):
        """!
        @brief : IhmLauncherActivator post activation process hook
        """
        # generated


        # Start of user code onActivate
        pass
        # End of user code

    def onPropertyUpdate(self, propertyType, propertyName, propertyValue):
        """!
        @brief : IhmLauncherActivator property update process hook
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
        @brief : IhmLauncherActivator initialization
        """
        # generated

        # Start of user code postInit
        self.createIhmLauncherActor()
        # End of user code


    def createIhmLauncherActor(self):
        """!
        @brief : createIhmLauncherActor : Used to create every instance of IhmLauncherActor managed by this BundleActivator
        """
        # generated
        args = None
        actorID = ULONG(0)
        # Start of user code argsCreateIhmLauncherActor
            
        # End of user code
        self.createActor( IhmLauncherActor.launchActor, args, "IhmLauncherActor", actorID )

        # Start of user code createIhmLauncherActor
            
        # End of user code
    

    def registerIhmLauncherConfigHandler(self):
        """!
        @brief : registerIhmLauncherConfigHandler
        """
        # Allocate handler
        ihmLauncherConfigHandler = IhmLauncherConfigHandler(self)
    
        # Initialize the configurationElement dispather
        if self._userConfigurationDispatcher is None :
            self._userConfigurationDispatcher = ConfigurationElementDispatcherHandler(self)
    
            self.registerCmdHandler(PipeNodeCmd.ACTIVATE, self._userConfigurationDispatcher)
    
    
        # Register the configurationElement to be received during the activate
        self.addConfigurationName("IhmLauncherConfig")
    
        # Register the configurationElement to the dispatcher
        self._userConfigurationDispatcher.registerConfigurationElementHandler("IhmLauncherConfig", ihmLauncherConfigHandler)
    
        # Start of user code registerIhmLauncherConfigHandler
    
        # End of user code
    
    
    # Start of user code ProtectedOperZone
    
    # End of user code

