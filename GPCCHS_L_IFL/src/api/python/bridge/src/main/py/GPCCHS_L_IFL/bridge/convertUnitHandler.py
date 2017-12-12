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

from bridge.ConvertUnitValues_pb2 import ConvertUnitValues
from GPINUC_L_UCL.unitConverterLibrary.unitConverterException import UnitConverterException
from GPCC.ccsds_mal.sTRING import STRING
      
def perform(unitConverterLib=None, msg=None):
    '''
    @brief : Generic entry point for all handlers
    @param : unitConverterLib (GPINUC_L_UCL.unitConverterLibrary.unitConverter) Ready to use UnitConverter
    @param : msg (GPCC.communicationLibrary.isisMessage) Message to be processed by the handler
    '''
    # Get the only frame of the message
    msgFrame = msg.popFrame(1, 1)
    # Extract the protobuf from the frame
    convToDo = ConvertUnitValues()
    convToDo.ParseFromString(bytes(msgFrame.getRaw()))
    # Retrieve the unit of the input values from message and convert into STRING for GPINUC
    fromUnit = STRING(convToDo.fromUnit)
    # Retrieve the unit of the output values from message and convert into STRING for GPINUC
    toUnit = STRING(convToDo.toUnit)
    # Retrieve the list of values to convert from message and convert into STRING for GPINUC
    valuesToConvertList = convToDo.values # List of ccsds_mal.types_pb2.ATTRIBUTE
    # Temporary format for GPINUC, later it won't be a string but a list of ATTRIBUTE
    valuesToConvert = ""
    # Concatenate the values to convert into a single string
    for value in valuesToConvertList:
        valuesToConvert = valuesToConvert + value._string.value + ";"
    # Remove the trailing ";" character
    valuesToConvert = STRING(valuesToConvert[:-1])
    
    # Perform the conversion and convert the results in unicode
    resultsStr = None
    try:
        resultsStr = unitConverterLib.convertUnitBatch(valuesToConvert,fromUnit,toUnit).getValue()
        raisedErr = None
    except UnitConverterException as e:
        raisedErr = e.getType()
    
    # Build the results list from the string
    if resultsStr:
        results = resultsStr.split(";")
    else:
        results = []
        
    return results, raisedErr
