# coding: utf-8
"""!
Project   : ISIS
Component : GPCCHS_L_IFL.bridge.convertUnitHandler
@file     : convertUnitHandler.py
@author   : ohuyard
@date     : 07/12/2017 
@brief    : Handler used to perform unit conversion from unit to unit
@type     : Python module with a single perform() function
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
    # Retrieve the unit of the input values from message and convert into STRING for GPINUC
    fromUnit = STRING(msg.popFrame(1, 1).getRaw().decode())
    # Retrieve the unit of the output values from message and convert into STRING for GPINUC
    toUnit = STRING(msg.popFrame(1, 1).getRaw().decode())
    # Retrieve the list of values to convert from message and convert into STRING for GPINUC
    valuesToConvert = STRING(msg.popFrame(1, 1).getRaw().decode())
    
    # Perform the conversion and convert the results in unicode
    return unitConverterLib.convertUnitBatch(valuesToConvert,fromUnit,toUnit).getValue().encode()
