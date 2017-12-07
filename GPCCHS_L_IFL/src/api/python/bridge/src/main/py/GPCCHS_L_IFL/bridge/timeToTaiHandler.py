# coding: utf-8
"""!
Project   : ISIS
Component : GPCCHS_L_IFL.bridge.timeToTaiHandler
@file     : timeToTaiHandler.py
@author   : ohuyard
@date     : 07/12/2017 
@brief    : Handler used to perform time conversion from time base to TAI
@type     : Python module with a single perform() function
"""
# ====================================================================
# HISTORY
# END-HISTORY
# ====================================================================

from GPCC.ccsds_mal.sTRING import STRING
from GPCC.ccsds_mal.sHORT import SHORT
      
def perform(unitConverterLib=None, msg=None):
    '''
    @brief : Generic entry point for all handlers
    @param : unitConverterLib (GPINUC_L_UCL.unitConverterLibrary.unitConverter) Ready to use UnitConverter
    @param : msg (GPCC.communicationLibrary.isisMessage) Message to be processed by the handler
    '''
    # Retrieve the base of the input values from message and convert into STRING for GPINUC
    fromBase = STRING(msg.popFrame(1, 1).getRaw().decode())
    # Retrieve the list of values to convert from message and convert into STRING for GPINUC
    valuesToConvert = STRING(msg.popFrame(1, 1).getRaw().decode())
    
    # Perform the conversion and convert the results in unicode
    return unitConverterLib.shiftTimeBatch(valuesToConvert,fromBase).getValue().encode()
