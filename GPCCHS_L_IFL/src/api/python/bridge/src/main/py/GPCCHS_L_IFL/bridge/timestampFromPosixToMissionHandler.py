# coding: utf-8
"""!
Project   : ISIS
Component : GPCCHS_L_IFL.bridge.timestampFromPosixToMissionHandler
@file     : timestampFromPosixToMissionHandler.py
@author   : ohuyard
@date     : 07/12/2017 
@brief    : Handler used to perform time conversion from Posix to Mission
@type     : Python module with a single perform() function
"""
# ====================================================================
# HISTORY
# END-HISTORY
# ====================================================================

from GPCC.ccsds_mal.sTRING import STRING
from GPCC.ccsds_mal.sHORT import SHORT
from GPINUC_L_UCL.unitConverterLibrary.unitConverterException import UnitConverterException
      
def perform(unitConverterLib=None, msg=None):
    '''
    @brief : Generic entry point for all handlers
    @param : unitConverterLib (GPINUC_L_UCL.unitConverterLibrary.unitConverter) Ready to use UnitConverter
    @param : msg (GPCC.communicationLibrary.isisMessage) Message to be processed by the handler
    '''
    # Retrieve the reference session ID from message and convert into SHORT for GPINUC
    sessionId = SHORT(msg.popFrame(1, 1).getRaw().decode())
    # Retrieve the list of values to convert from message and convert into STRING for GPINUC
    valuesToConvert = STRING(msg.popFrame(1, 1).getRaw().decode())
    
    # Perform the conversion and convert the results in unicode
    resultsStr = None
    try:
        resultsStr = unitConverterLib.shiftTimestampFromMissionToPosixBatch(valuesToConvert,sessionId).getValue()
        raiseErr = None
    except UnitConverterException as e:
        raiseErr = e.getType()
     
    # Build the results list from the string
    if resultsStr:
        results = resultsStr.split(";")
    else:
        results = []
        
    return results, raiseErr
