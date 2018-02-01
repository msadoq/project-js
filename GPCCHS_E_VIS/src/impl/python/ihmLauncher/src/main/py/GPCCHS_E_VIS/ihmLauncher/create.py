# Produced by Acceleo Python Generator 1.1.2-R8

# -*- coding: utf-8 -*-
"""!
Project   : ISIS
Component : GPCCHS_E_VIS
@file     : __init__.py
@author   : isis
@date     : 
@brief    : /
@type     : Create
"""


# ====================================================================
# Start of user code HistoryZone
# HISTORY
#
# VERSION : 1.1.2 : FA : #7472 : 01/09/2017 : Update javascript VIMA launcher to used iedit and manage the features it launch, remove the old launcher
# END-HISTORY
# End of user code HistoryZone
# ====================================================================


from GPCCHS_E_VIS.ihmLauncher.IhmLauncherActivator.ihmLauncherActivator import IhmLauncherActivator

def create(ctx, parentPipe, args=None):
    """!
    @brief create : encapsulation of BundleActivator's launchActor
    @param : ctx The context
    @param : parentPipe The parent pipe
    @param : args Launching arguments
    """
    IhmLauncherActivator.launchActor(ctx, parentPipe, args)
