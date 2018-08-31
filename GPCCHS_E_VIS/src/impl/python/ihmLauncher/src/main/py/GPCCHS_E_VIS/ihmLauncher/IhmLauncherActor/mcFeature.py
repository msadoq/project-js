# -*- coding: utf-8 -*-
"""!
Project   : ISIS
Component : GPCCHS_E_VIS
@file     : McFeature.py
@author   : isis
@date     : 31/08/2018
@brief    : Feature used to let IhmLauncherActor terminate GPCPU_D_DBR in case javascript VIMA terminate
@type     : InternalFeature
"""


# ====================================================================
# Start of user code HistoryZone
# HISTORY
# END-HISTORY
# End of user code HistoryZone
# ====================================================================

from GPCCTC_L_CNT.isisContainerCommon.internalFeature import InternalFeature
from GPCC.container.threadContext import ThreadContext


class McFeature(InternalFeature):
    """!
    @brief: GPCCHS_E_VIS.ihmLauncher.IhmLauncherActor.McFeature : Feature used to let IhmLauncherActor
            terminate GPCPU_D_DBR in case javascript VIMA terminate
    """
    
    def __init__(self, muxer, mid):
        """!
        @brief: Constructor
        """        
        InternalFeature.__init__(self, muxer, mid)
        self.setFeature("FeaturePusDaemonDataBroker.xml")
        return

    def __del__(self):
        """!
        @brief: Destructor
        """ 
        return

    @staticmethod
    def allocate(muxer, mid):
        """!
        @brief: Allocator
        """ 
        return McFeature(muxer, mid)

    def created(self, result):
        """!
        @brief: Feature creation handler
        """ 
        return

    def activated(self, result):
        """!
        @brief: Feature activation handler
        """ 
        return

    def started(self, result):
        """!
        @brief: Feature start handler
        """ 
        return

    def paused(self, result):
        """!
        @brief: Feature pause handler
        """ 
        return

    def resumed(self, result):
        """!
        @brief: Feature resume handler
        """ 
        return

    def stopped(self, result):
        """!
        @brief: Feature stop handler
        """ 
        return

    def destroyed(self, result):
        """!
        @brief: Feature destroy handler
        """ 
        # Warn the actor
        ThreadContext.getActor_static().mcDestroyed()

    def monitor(self, status):
        """!
        @brief: Feature monitor handler
        """ 
        return

