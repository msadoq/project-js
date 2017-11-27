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

from GPCCHS_L_IFL.converter.conversionHandler import ConversionHandler
from GPCC.core.messageFrame import MessageFrame
from GPCC.communicationLibrary.isisMessage import IsisMessage
from GPCC.ccsds_mal.sTRING import STRING

class TimestampFromMissionToPosixHandler(ConversionHandler):
    '''
    Handler for conversion of timestamp from mission time to posix time
    '''
    def __init__(self, actorContext=None, msg=None):
        '''
        Initialization of the handler
        '''
        # First initialize the parent class
        ConversionHandler.__init__(self,actorContext,msg)
        # Then initialize handler specific data
        self.convertedValues = None

    def run(self):
        '''
        Conversion thread
        '''
        # Only call the parent class run function
        # It will perform necessary generic operation and then call performConversionsendConvertedValues
        ConversionHandler.run(self)
        
    def performConversion(self):
        '''
        Conversion function
        '''
        # Retrieve the reference session ID from message and convert into STRING for GPINUC
        sessionId = STRING(self._msg.popFrame(1, 1).getRaw().decode())
        # Retrieve the list of values to convert from message and convert into STRING for GPINUC
        valuesToConvert = STRING(self._msg.popFrame(1, 1).getRaw().decode())
        
        # Perform the conversion and convert the results in unicode
        self.convertedValues = self._ucLib.shiftTimestampFromMissionToPosixBatch(valuesToConvert,sessionId).getValue().encode()
        
    def sendConvertedValues(self):
        '''
        Result sending Function
        '''
        # Create the results message
        msgToSend = IsisMessage(1, 1)
        # Add the conversion results in it
        msgToSend.addFrame(1, MessageFrame(frame = None, data = self.convertedValues))
        # Send the results
        self._pushChannel.sendMessage(msgToSend, 0)
        
def runConversion(actorContext=None, msg=None):
    '''
    Generic entry point of this module
    '''
    converter = TimestampFromMissionToPosixHandler(actorContext, msg)
    converter.start()
        