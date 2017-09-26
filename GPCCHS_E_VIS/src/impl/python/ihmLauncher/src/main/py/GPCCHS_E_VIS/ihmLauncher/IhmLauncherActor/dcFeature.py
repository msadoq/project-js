# -*- coding: utf-8 -*-
"""!
Project   : ISIS
Component : GPCCHS_E_VIS
@file     : DcFeature.py
@author   : isis
@date     : 31/08/2017
@brief    : Feature used to let IhmLauncherActor terminate GPCCDC in case javascript VIMA terminate
@type     : InternalFeature
"""


# ====================================================================
# Start of user code HistoryZone
# HISTORY
#
# VERSION : 1.1.2 : FA : #7472 : 01/09/2017 : Update javascript VIMA launcher to used iedit and manage the features it launch, remove the old launcher
# END-HISTORY
# End of user code HistoryZone
# ====================================================================

from GPCCTC_L_CNT.isisContainerCommon.internalFeature import InternalFeature
from GPCC.container.threadContext import ThreadContext


class DcFeature(InternalFeature):
    """!
    @brief: GPCCHS_E_VIS.ihmLauncher.IhmLauncherActor.DcFeature : Feature used to let IhmLauncherActor terminate GPCCDC in case javascript VIMA terminate
    """
    
    def __init__(self, muxer, mid):
        InternalFeature.__init__(self, muxer, mid)
        self.setFeature("gpccdc_d_dbr-default.xml")
        return

    def __del__(self):
        return

    @staticmethod
    def allocate(muxer, mid):
        return DcFeature(muxer, mid)

    def created(self, result):
        return

    def activated(self, result):
        return

    def started(self, result):
        return

    def paused(self, result):
        return

    def resumed(self, result):
        return

    def stopped(self, result):
        return

    def destroyed(self, result):
        # Warn the actor
        ThreadContext.getActor_static().dcDestroyed()

    def monitor(self, status):
        return

