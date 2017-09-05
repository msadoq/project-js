# Produced by Acceleo Python Generator 1.1.2-R8

# -*- coding: utf-8 -*-
"""!
Project   : ISIS
Component : GPCCHS_E_VIS
@file     : IhmLauncherConfigHandler.py
@author   : isis
@date     : 
@brief    : Configuration handler of Javascript GPVI IHM
@type     : ConfigurationElementHandler
"""


# ====================================================================
# Start of user code HistoryZone
# HISTORY
#
# END-HISTORY
# End of user code HistoryZone
# ====================================================================


from GPCC.container.configurationElementHandler import ConfigurationElementHandler
# Start of user code ImportZone
from GPCCHS_E_VIS.ihmLauncher.IhmLauncherConfig.ihmLauncherConfigInterface import IhmLauncherConfigInterface
from GPCC.core.propertyType import PropertyType
from GPCC.ccsds_mal.sTRING import STRING
from GPCC.ccsds_mal.bOOLEAN import BOOLEAN
# End of user code

# End of user code
class IhmLauncherConfigHandler(ConfigurationElementHandler) :
    """!
    @brief: GPCCHS_E_VIS.IhmLauncherConfigHandler : Configuration handler of Javascript GPVI IHM
    """

    # Start of user code ProtectedAttrZone
    
    # End of user code

    def __init__(self, actor) : 
        """!
        @brief : Constructor
        @param : actor The Isis actor
        """
        # generated
        ConfigurationElementHandler.__init__(self, actor = actor)
        # Start of user code __init__
            
        # End of user code

    def __del__(self):
        """!
        @brief : Destructor of IhmLauncherConfigHandler
        """
        #generated
        # Start of user code __del__

        # End of user code
    
    def config(self, elementName, elementConfiguration):
        """!
        @brief : config : Manage configurationElement
        @param elementName The configurationElement name
        @param elementConfiguration The configuration corresponding to the configurationElement name
        Handle message
        """
        # generated
        # Start of user code config
        interface = IhmLauncherConfigInterface()
        interface.readFromString(str(elementConfiguration))
        debug = interface.xmlIhmLauncherConfig.xmldebug
        if debug is not None:
            self._actor.updateProperty(PropertyType.USER_CONFIGURATION, elementName + "-debug", BOOLEAN(debug.getValue()))
        fmdroot = interface.xmlIhmLauncherConfig.xmlfmdRoot
        if fmdroot is not None:
            self._actor.updateProperty(PropertyType.USER_CONFIGURATION, elementName + "-fmdRoot", STRING(fmdroot.getValue()))
        nodepath = interface.xmlIhmLauncherConfig.xmlnodePath
        if nodepath is not None:
            self._actor.updateProperty(PropertyType.USER_CONFIGURATION, elementName + "-nodePath", STRING(nodepath.getValue()))
        dcpushuri = interface.xmlIhmLauncherConfig.xmldcPushUri
        if dcpushuri is not None:
            self._actor.updateProperty(PropertyType.USER_CONFIGURATION, elementName + "-dcPushUri", STRING(dcpushuri.getValue()))
        dcpulluri = interface.xmlIhmLauncherConfig.xmldcPullUri
        if dcpulluri is not None:
            self._actor.updateProperty(PropertyType.USER_CONFIGURATION, elementName + "-dcPullUri", STRING(dcpulluri.getValue()))
        dcconffile = interface.xmlIhmLauncherConfig.xmldcConfFile
        if dcconffile is not None:
            self._actor.updateProperty(PropertyType.USER_CONFIGURATION, elementName + "-dcConfFile", STRING(dcconffile.getValue()))
        additionalargs = interface.xmlIhmLauncherConfig.xmladditionalArg
        if additionalargs is not None:
            argCnt = 0
            for arg in additionalargs: 
                self._actor.updateProperty(PropertyType.USER_CONFIGURATION, elementName + "-additionalArg" + str(argCnt), STRING(arg.getValue()))
                argCnt = argCnt + 1
        # End of user code

    # Start of user code ProtectedOperZone

    # End of user code

