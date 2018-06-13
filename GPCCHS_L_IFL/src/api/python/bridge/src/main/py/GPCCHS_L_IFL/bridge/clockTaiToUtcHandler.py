# coding: utf-8
"""!
Project   : ISIS
Component : GPCCHS_L_IFL.bridge.clockTaiToUtcHandler
@file     : clockTaiToUtcHandler.py
@author   : ohuyard
@date     : 07/12/2017 
@brief    : Handler used to perform time conversion from TAI clock to UTC
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
from GPCC.ccsds_mal.fINETIME import FINETIME
from bridge.ConvertUnitValues_pb2 import ConvertUnitValues
from bridge.ResultValues_pb2 import ResultValues
from GPINUC_L_UCL.unitConverterLibrary.unitConverterException import UnitConverterException
      
def perform(unitConverterLib=None, msg=None):
    '''
    @brief : Generic entry point for all handlers
    @param : unitConverterLib (GPINUC_L_UCL.unitConverterLibrary.unitConverter) Ready to use UnitConverter
    @param : msg (GPCC.communicationLibrary.isisMessage) Message to be processed by the handler
    '''
    # Extract the protobuf from the frame
    convToDo = ConvertUnitValues()
    convToDo.ParseFromString(bytes(msg.popFrame(1, 1).getRaw()))
    # Retrieve the session ID and convert into SHORT for GPINUC
    sessionId = SHORT(convToDo.sessionId)
    # Retrieve the list of ccsds_mal.types_pb2.ATTRIBUTE values to convert them into list of GPCC.ccsds_mal.fINETIME.FINETIME
    valuesToConvertList = []
    for attribute in convToDo.values:
        valuesToConvertList.append(FINETIME(attribute._finetime.millisec,attribute._finetime.pico))
    
    # Perform the conversion and convert the results in unicode
    resultsList = []
    try:
        resultsList = unitConverterLib.clockTAItoUTCBatch(valuesToConvertList, sessionId)
        raisedErr = None
    except UnitConverterException as e:
        raisedErr = e
    
    # Convert the results from GPCC.ccsds_mal.fINETIME.FINETIME list into ccsds_mal.types_pb2.ATTRIBUTE list for protobuf
    resultsProto = ResultValues()
    for value in resultsList:
        # Create the value in protobuf repeated structure
        protoVal = resultsProto.values.add()
        # Fill the value in protobuf repeated structure
        protoVal._finetime.millisec = value.getNbMilliSec()
        protoVal._finetime.pico = value.getNbPicoSec()
        
    return resultsProto, raisedErr
