# -*- coding: utf-8 -*-
"""!
Project   : ISIS
Component : GPCCHS_E_VIS
@file     : HsFeature.py
@author   : isis
@date     : 31/08/2017
@brief    : Feature used to let IhmLauncherActor monitor javascript VIMA execution
@type     : InternalFeature
"""


# ====================================================================
# Start of user code HistoryZone
# HISTORY
#
# VERSION : 1.1.2 : FA : #7472 : 01/09/2017 : Update javascript VIMA launcher to used iedit and
#  manage the features it launch, remove the old launcher
# END-HISTORY
# End of user code HistoryZone
# ====================================================================

from GPCCTC_L_CNT.isisContainerCommon.internalFeature import InternalFeature
from GPCCTC_L_CNT.isisContainerCommon.containerUtils import ContainerUtils
from GPCC.container.threadContext import ThreadContext
from GPCC.ccsds_mal.uLONG import ULONG

class HsFeature(InternalFeature):
    """!
    @brief: GPCCHS_E_VIS.ihmLauncher.IhmLauncherActor.HsFeature : Feature used to let IhmLauncherActor monitor javascript VIMA execution
    """
    
    def __init__(self, muxer, mid):
        """!
        @brief: Constructor
        """ 
        InternalFeature.__init__(self, muxer, mid)
        self.setFeature("gpcctc_l_cnt-genericLauncher.xml")
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
        return HsFeature(muxer, mid)

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
        ThreadContext.getActor_static().hsDestroyed()

    def monitor(self, status):
        """!
        @brief: Feature monitor handler
        """ 
        # Check if the status correspond to the end of GPCCHS feature execution
        if ContainerUtils.hasEnded_static(ULONG(status)) :
            # Warn the actor
            ThreadContext.getActor_static().hsHasStopped()

