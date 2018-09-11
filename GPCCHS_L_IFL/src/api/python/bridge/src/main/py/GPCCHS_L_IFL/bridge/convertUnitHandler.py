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
# VERSION : 2.0.0 : FA : ISIS-FT-1937 : 07/12/2017 : Implement all the conversion handler in their
#  first version (without using protobuf)
# VERSION : 2.0.0 : FA : ISIS-FT-1937 : 12/12/2017 : Update implementation to use protobuf for
#  converted data and results
# VERSION : 2.0.0 : FA : ISIS-FT-1937 : 02/01/2018 : Update code to take into account R10S3 version
#  of GPINUC
# END-HISTORY
# ====================================================================

from GPCC.ccsds_mal.fLOAT import FLOAT
from bridge.ConvertUnitValues_pb2 import ConvertUnitValues
from bridge.ResultValues_pb2 import ResultValues
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
    # Retrieve the list of ccsds_mal.types_pb2.ATTRIBUTE values to convert them into list of GPCC.ccsds_mal.fINETIME.FINETIME
    valuesToConvertList = []
    for attribute in convToDo.values:
        valuesToConvertList.append(FLOAT(attribute._float.value))
    
    # Perform the conversion and convert the results in unicode
    resultsList = []
    try:
        resultsList = unitConverterLib.convertUnitBatch(valuesToConvertList,fromUnit,toUnit)
        raisedErr = None
    except UnitConverterException as e:
        raisedErr = e
        
    # Convert the results from GPCC.ccsds_mal.fINETIME.FINETIME list into ccsds_mal.types_pb2.ATTRIBUTE list for protobuf
    resultsProto = ResultValues()
    
    for value in resultsList:
        # Create the value in protobuf repeated structure
        protoVal = resultsProto.values.add()
        # Fill the value in protobuf repeated structure
        protoVal._float.value = float(value.getValue())
        
    return resultsProto, raisedErr

