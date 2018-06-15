# coding: utf-8
"""!
Project   : ISIS
Component : GPCCHS_L_IFL.bridge.timeToMsTaiHandler
@file     : timeToMsTaiHandler.py
@author   : ohuyard
@date     : 07/12/2017 
@brief    : Handler used to perform time conversion from time base to TAI in milliseconds
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

from GPCC.ccsds_mal.sTRING import STRING
from GPCC.ccsds_mal.sHORT import SHORT
from GPCC.ccsds_mal.fLOAT import FLOAT
from bridge.ConvertUnitValues_pb2 import ConvertUnitValues
from bridge.ResultValues_pb2 import ResultValues
from GPINUC_L_UCL.unitConverterLibrary.unitConverterException import UnitConverterException
from GPINUC_L_UCL.unitConverterLibrary.unitConverterExceptionType import UnitConverterExceptionType
      
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
    # Retrieve the session ID and convert into SHORT for GPINUC
    sessionId = SHORT(convToDo.sessionId)
    # Retrieve the unit of the input values from message and convert into STRING for GPINUC
    fromBase = STRING(convToDo.fromUnit)
    print("shiftTimeToMsBatch fromBase:",fromBase.toString())
    # Retrieve the list of ccsds_mal.types_pb2.ATTRIBUTE values to convert them into list of GPCC.ccsds_mal.fLOAT.FLOAT
    valuesToConvertList = []
    for attribute in convToDo.values:
        valuesToConvertList.append(FLOAT(attribute._float.value))
    
    # Initialize results list
    resultsList = []
    # Check if the conversion is implemented
    if fromBase.getValue() == "GPS":
        raisedErr = UnitConverterException(UnitConverterExceptionType.INPUT_PARAMETER_INVALID,\
                                           "Conversion from GPS not supported (not yet implemented)")
    else:
        # Perform the conversion and convert the results in unicode
        try:
            resultsList = unitConverterLib.shiftTimeToMsBatch(valuesToConvertList,fromBase, sessionId)
            raisedErr = None
        except UnitConverterException as e:
            raisedErr = e
        
    # Convert the results from numpy.float32 list into ccsds_mal.types_pb2.ATTRIBUTE list for protobuf
    resultsProto = ResultValues()
    for value in resultsList:
        # Create the value in protobuf repeated structure
        protoVal = resultsProto.values.add()
        # Fill the value in protobuf repeated structure
        protoVal._float.value = float(value.getValue())
        
    return resultsProto, raisedErr
