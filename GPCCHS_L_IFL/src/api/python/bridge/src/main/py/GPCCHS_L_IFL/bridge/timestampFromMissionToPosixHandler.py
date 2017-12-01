# coding: utf-8
"""!
Project   : ISIS
Component : GPCCHS_L_IFL-TimestampFromMissionToPosix_handler
@file     : TimestampFromMissionToPosix_handler.py
@author   : ohuyard
@date     : 24/11/2017 
@brief    : Handler used to perform unit conversion
@type     : ConversionHandler
"""
# ====================================================================
# HISTORY
# END-HISTORY
# ====================================================================

from GPCC.ccsds_mal.sTRING import STRING
      
def perform(unitConverterLib=None, msg=None):
    '''
    @brief : Generic entry point for all handlers
    @param : unitConverterLib (GPINUC_L_UCL.unitConverterLibrary.unitConverter) Ready to use UnitConverter
    @param : msg (GPCC.communicationLibrary.isisMessage) Message to be processed by the handler
    '''
    # Retrieve the reference session ID from message and convert into STRING for GPINUC
    sessionId = STRING(msg.popFrame(1, 1).getRaw().decode())
    # Retrieve the list of values to convert from message and convert into STRING for GPINUC
    valuesToConvert = STRING(msg.popFrame(1, 1).getRaw().decode())
    
    # Perform the conversion and convert the results in unicode
    return unitConverterLib.shiftTimestampFromMissionToPosixBatch(valuesToConvert,sessionId).getValue().encode()
