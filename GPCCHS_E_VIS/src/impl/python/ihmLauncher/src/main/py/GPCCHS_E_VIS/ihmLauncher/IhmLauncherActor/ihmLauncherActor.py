# Produced by Acceleo Python Generator 1.1.2-R8

# -*- coding: utf-8 -*-
"""!
Project   : ISIS
Component : GPCCHS_E_VIS
@file     : IhmLauncherActor.py
@author   : isis
@date     : 
@brief    : Actor which monitor javascript application execution to stop GPCCDC when it finish.
@type     : Actor
"""


# ====================================================================
# Start of user code HistoryZone
# HISTORY
#
# VERSION : 1.1.2 : FA : #7472 : 01/09/2017 : Update javascript VIMA launcher to used iedit and
#  manage the features it launch, remove the old launcher
# VERSION : 2.0.0 : FA : #8557 : 20/10/2017 : Addition of Js VIMA configuration path read in
#  session document and give it a GPCCHS launch
# END-HISTORY
# End of user code HistoryZone
# ====================================================================


from GPCC.communicationLibrary.mALInteractorFactory import MALInteractorFactory
from GPCC.ccsds_mal.uOCTET import UOCTET
from GPCC.ccsds_mal.uSHORT import USHORT
from GPCC.ccsds_mal.interactorFactory import InteractorFactory
from GPCC.container.isisActor import IsisActor
from GPCC.container.isisModuleActor import IsisModuleActor
from GPCC.container.actorStopCause import ActorStopCause
from GPCC.container.pipeNodeType import PipeNodeType
# Start of user code ImportsZone
from collections import OrderedDict
from GPCC.core.propertyType import PropertyType
from GPCC.ccsds_mal.bOOLEAN import BOOLEAN
from GPCC.ccsds_mal.sTRING import STRING
from GPCC.container.threadContext import ThreadContext
from GPCC.core.isisTrace import IsisTrace
from GPCCTC_L_CNT.isisContainerCommon.internalFeatureMuxer import InternalFeatureMuxer
from GPCCHS_E_VIS.ihmLauncher.IhmLauncherActor.dcFeature import DcFeature
from GPCCHS_E_VIS.ihmLauncher.IhmLauncherActor.mcFeature import McFeature
from GPCCHS_E_VIS.ihmLauncher.IhmLauncherActor.hsFeature import HsFeature
# End of user code

class IhmLauncherActor (IsisActor) :
    """!
    @brief: GPCCHS_E_VIS.IhmLauncherActor : Actor which monitor javascript application execution to stop GPCCDC when it finish.
    """

    # Start of user code ProtectedAttrZone

    # End of user code

    def __init__(self,nodeType, parentPipe):
        """!
        @brief : Constructor of IhmLauncherActor
        @param : nodeType (container::PipeNodeType) The node type 
        @param : parentPipe (container::IsisPipe) The parent pipe 
        """
        # generated
        IsisActor.__init__(self,nodeType = nodeType, parentPipe = parentPipe)
        self._interactorFactory = MALInteractorFactory()
        # Start of user code Constructor
        self._gpccdcFeat = None
        self._gpmcpuFeat = None
        self._gpcchsFeat = None
        self._hsRunning = False
        self._dcRunning = False
        self._mcRunning = False
        # End of user code

    def __del__(self):
        """!
        @brief : Destructor of IhmLauncherActor
        """
        # generated
        
        #Start of user code Destructor
        
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
        actor = IhmLauncherActor(PipeNodeType.NORMAL_NODE, parentPipe)
        
        # Start of user code launchActor

        # End of user code

        # Start the actor loop
        actor.start()
        return

    def doInit(self):
        """!
        @brief : IhmLauncherActor initialization
        """
        # generated

        # Start of user code doInit
        pass
        # End of user code

    def onStop(self, stopCause):
        """!
        @brief IhmLauncherActor.onStop
               Method called on stop
        @param ActorStopCause : stopCause, Stop cause
        """
        # Start of user code onStop
        
        # optional injection point, empty by default
        return
        # End of user code
    
    def onExit(self) :
        """!
        @brief : IhmLauncherActor initialization
        """
        # generated
        # Start of user code onExit
        pass
        # End of user code
    
    def onActivate(self) :
        """!
        @brief : IhmLauncherActor initialisation
        """
        # Start of user code onActivate
        okStatus = True
        
        # Retreive configuration
        
        # Required configuration parameters
        fmdRoot = self.getProperty(PropertyType.USER_CONFIGURATION, "IhmLauncherConfig-fmdRoot")
        nodePath = self.getProperty(PropertyType.USER_CONFIGURATION, "IhmLauncherConfig-nodePath")
        dcPushUri = self.getProperty(PropertyType.USER_CONFIGURATION, "IhmLauncherConfig-dcPushUri")
        dcPullUri = self.getProperty(PropertyType.USER_CONFIGURATION, "IhmLauncherConfig-dcPullUri")
        mcPushUri = self.getProperty(PropertyType.USER_CONFIGURATION, "IhmLauncherConfig-mcPushUri")
        mcPullUri = self.getProperty(PropertyType.USER_CONFIGURATION, "IhmLauncherConfig-mcPullUri")
        featuresConfFile = self.getProperty(PropertyType.USER_CONFIGURATION, "IhmLauncherConfig-featuresConfFile")
        sessionID = str(ThreadContext.getSessionID_static())
        hsConfKey = 'SESSION.'+ sessionID + '.VIMA_JS_CONFIGURATION_FILE_PATH'
        hsConfFile = self.getProperty(PropertyType.PROPERTY, hsConfKey)
        if not hsConfFile:
            IsisTrace.error("GPCCHS_E_VIS.IhmLauncherActor : no Js VIMA configuration file defined in default session {}. Check if a\
             default session is selected, and if VIMA_JS_CONFIGURATION_FILE_PATH is defined in session number {} configuration file"
             .format(sessionID,sessionID) )
            okStatus = False
        if fmdRoot and nodePath and dcPushUri and dcPullUri and mcPushUri and mcPullUri and featuresConfFile and hsConfFile:
            fmdRoot = STRING(None, fmdRoot.getRaw()).getValue()
            nodePath = STRING(None, nodePath.getRaw()).getValue()
            dcPushUri = STRING(None, dcPushUri.getRaw()).getValue()
            dcPullUri = STRING(None, dcPullUri.getRaw()).getValue()
            mcPushUri = STRING(None, mcPushUri.getRaw()).getValue()
            mcPullUri = STRING(None, mcPullUri.getRaw()).getValue()
            featuresConfFile = STRING(None, featuresConfFile.getRaw()).getValue()
            hsConfFile = STRING(None, hsConfFile.getRaw()).getValue()
        else:
            okStatus = False
            IsisTrace.error("GPCCHS_E_VIS.IhmLauncherActor error, some required configuration arguments has not been received. \
            fmdRoot: {}, nodePath: {}, dcPushUri: {}, dcPullUri: {}, mcPushUri: {}, mcPullUri: {}, featuresConfFile: {}, \
            hsConfFile: {}".format(fmdRoot,nodePath,dcPushUri,dcPullUri,mcPushUri,mcPullUri,featuresConfFile, hsConfFile) )
            
        # Optional configuration parameters
        debug = self.getProperty(PropertyType.USER_CONFIGURATION, "IhmLauncherConfig-debug")
        if debug is not None:
            debug = BOOLEAN(None, debug.getRaw()).getValue()
        additionalArgsCnt = 0
        additionalArgs = []
        additionalArg = self.getProperty(PropertyType.USER_CONFIGURATION, "IhmLauncherConfig-additionalArg" + str(additionalArgsCnt))
        while additionalArg is not None:
            additionalArgs.append(STRING(None, additionalArg.getRaw()).getValue())
            additionalArgsCnt = additionalArgsCnt + 1
            additionalArg = self.getProperty(PropertyType.USER_CONFIGURATION, "IhmLauncherConfig-additionalArg" + str(additionalArgsCnt))

        # Create and start GPMCPU Feature
        ret = False
        self._gpmcpuFeat = InternalFeatureMuxer.createFeature_static(McFeature.allocate, actor=self, doExport=True, doMonitor=True)
        if debug == True:
            IsisTrace.debug("GPCCHS_E_VIS.IhmLauncherActor GPMCPU feature about to be created and started with configuration file : {}"
                            .format(featuresConfFile))
        if self._gpmcpuFeat is not None and okStatus == True:
            ret = self._gpmcpuFeat.setConfiguration(featuresConfFile)
        else:
            okStatus = False
            IsisTrace.error("GPCCHS_E_VIS.IhmLauncherActor error, GPMCPU feature creation failed, feature is {}"
                            .format(self._gpmcpuFeat))
        if ret == True:
            self._mcRunning = self._gpmcpuFeat.autoStart()
        else:
            okStatus = False
            IsisTrace.error("GPCCHS_E_VIS.IhmLauncherActor error, GPMCPU configuration failed, setConfiguration returned {}"
                            .format(ret))
        if not self._mcRunning:
            okStatus = False
            IsisTrace.error("GPCCHS_E_VIS.IhmLauncherActor error, GPMCPU feature start failed, autostart returned {}"
                                    .format(self._mcRunning))
        # Create and start GPCCDC Feature
        ret = False
        self._gpccdcFeat = InternalFeatureMuxer.createFeature_static(DcFeature.allocate, actor=self, doExport=True, doMonitor=True)
        if debug == True:
            IsisTrace.debug("GPCCHS_E_VIS.IhmLauncherActor GPCCDC feature about to be created and started with configuration file : {}"
                            .format(featuresConfFile))
        if self._gpccdcFeat is not None and okStatus == True:
            ret = self._gpccdcFeat.setConfiguration(featuresConfFile)
        else:
            okStatus = False
            IsisTrace.error("GPCCHS_E_VIS.IhmLauncherActor error, GPCCDC feature creation failed, feature is {}"
                            .format(self._gpccdcFeat))
        if ret == True:
            self._dcRunning = self._gpccdcFeat.autoStart()
        else:
            okStatus = False
            IsisTrace.error("GPCCHS_E_VIS.IhmLauncherActor error, GPCCDC configuration failed, setConfiguration returned {}"
                            .format(ret))
        if self._dcRunning is not True:
            okStatus = False
            IsisTrace.error("GPCCHS_E_VIS.IhmLauncherActor error, GPCCDC feature start failed, autostart returned {}"
                                    .format(self._dcRunning))
        # Create and start GPCCHS feature
        if okStatus == True:
            ret = False
            parameterDict = OrderedDict()
            parameterDict["arg1"] = "/usr/share/isis/lib/js/gpcchs_e_vis_launcher/client/lpisis_gpcchs_e_clt"
            parameterDict["arg2"] = "--ISIS_DOCUMENTS_ROOT=" + fmdRoot
            parameterDict["arg3"] = "--NODE_PATH=" + nodePath
            parameterDict["arg4"] = "--ZMQ_GPCCDC_PUSH=" + dcPushUri
            parameterDict["arg5"] = "--ZMQ_GPCCDC_PULL=" + dcPullUri
            parameterDict["arg6"] = "--ZMQ_GPMCPU_PUSH=" + mcPushUri
            parameterDict["arg7"] = "--ZMQ_GPMCPU_PULL=" + mcPullUri
            parameterDict["arg8"] = "--CONFIGURATION=" + hsConfFile
            argNb = len(parameterDict) + 1 # Add one to get the number of the next argument
            for arg in additionalArgs:
                parameterDict["arg"+str(argNb)] = arg
                argNb = argNb + 1
            argNb = argNb - 1 # do minus 1 because we need the number of argument and not more the index of the next argument
            if debug == True:
                IsisTrace.debug("GPCCHS_E_VIS.IhmLauncherActor GPCCHS feature about to be created and started with parameterDict : {}"
                            .format(parameterDict))
            self._gpcchsFeat = InternalFeatureMuxer.createFeature_static(HsFeature.allocate, actor=self, doExport=True, doMonitor=True)
            if self._gpcchsFeat is not None:
                ret = self._gpcchsFeat.addParameter("command","/usr/share/isis/bin/gpcchs_e_clt_wrapper")
                if ret is not True:
                    okStatus = False
                    IsisTrace.error("GPCCHS_E_VIS.IhmLauncherActor error, cannot add the command parameter to GPCCHS feature")
                ret = self._gpcchsFeat.addParameter("argc",str(argNb))
                if ret is not True:
                    okStatus = False
                    IsisTrace.error("GPCCHS_E_VIS.IhmLauncherActor error, cannot add the argc parameter to GPCCHS feature")
                for key,val in parameterDict.items():
                    ret = self._gpcchsFeat.addParameter(key,val)
                    if ret is not True:
                        okStatus = False
                        IsisTrace.error("GPCCHS_E_VIS.IhmLauncherActor error, cannot add the following additional parameter to GPCCHS\
                         feature : ",repr(key)," ",repr(val))
                if okStatus == True:
                    self._hsRunning = self._gpcchsFeat.autoStart()
                if self._hsRunning is not True:
                    okStatus = False
                    IsisTrace.error("GPCCHS_E_VIS.IhmLauncherActor error, GPCCHS feature start failed, autostart returned {}"
                                    .format(self._hsRunning))
            else:
                okStatus = False
                IsisTrace.error("GPCCHS_E_VIS.IhmLauncherActor error, GPCCHS feature creation failed and returned {}"
                                .format(self._gpcchsFeat))

        # End of user code
    

    def onPropertyUpdate(self, propertyType, propertyName, propertyValue) :
        """!
        @brief onPropertyUpdate : initialization
        @param : PropertyType : propertyType, TODO documentation
        @param : String : propertyName, TODO documentation
        @param : ATTRIBUTE : propertyValue, TODO documentation
        """
        # Start of user code onPropertyUpdate
        pass
        # End of user code

    def postInit(self):
        """!
        @brief : IhmLauncherActor postinitialization
        """
        # generated

        # Start of user code postInit
        pass
        # End of user code

    
    # Start of user code ProtectedOperZone

    def hsDestroyed(self):
        """!
        @brief : Called by the GPCCHS feature has been destroyed
        """
        # Store GPCCHS running status
        self._hsRunning = False
        # Check if this actor should be terminated
        self.checkActorStop()
    
    def mcDestroyed(self):
        """!
        @brief : Called by the GPMCPU feature has been destroyed
        """
        # Store GPMCPU running status
        self._mcRunning = False
        # Check if this actor should be terminated
        self.checkActorStop()
    
    def dcDestroyed(self):
        """!
        @brief : Called by the GPCCDC feature has been destroyed
        """
        # Store GPCCDC running status
        self._dcRunning = False
        # Check if this actor should be terminated
        self.checkActorStop()

    def hsHasStopped(self):
        """!
        @brief : Called by the GPCCHS feature when it has ended
        """
        # If GPCCHS has been stopped, destroy HS, DC and MC features to terminate in a clean way
        self._gpcchsFeat.autoDestroy()
        self._gpccdcFeat.autoDestroy()
        self._gpmcpuFeat.autoDestroy()
       
    def checkActorStop(self):
        """!
        @brief : Check if this actor should be stopped
        """
        # If HS, DC and MC has been destroyed, terminate this actor
        if self._hsRunning == False and self._dcRunning == False and self._mcRunning == False:
            IsisModuleActor.stopModule_static(ActorStopCause.STOP_END)

    # End of user code

