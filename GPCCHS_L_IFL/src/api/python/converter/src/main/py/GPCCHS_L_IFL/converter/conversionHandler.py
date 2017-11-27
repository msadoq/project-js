# coding: utf-8
"""!
Project   : ISIS
Component : GPCCHS_L_IFL-ConversionHandler
@file     : conversionHandler.py
@author   : ohuyard
@date     : 24/11/2017 
@brief    : Base class for the handlers performing unit conversion for GPCCHS
@type     : Thread
"""
# ====================================================================
# HISTORY
# END-HISTORY
# ====================================================================

from threading import Thread
from GPINUC_L_UCL.unitConverterLibrary.unitConverter import  UnitConverter
from GPCC.communicationLibrary.isisSocket import IsisSocket
from GPCC.core.zmq import ZMQ

class ConversionHandler(Thread):
    '''
    Base class for all the conversion handlers
    '''
    def __init__(self, actorContext=None, msg=None):
        '''
        Initialize and configure the handler
        '''
        # First call the parent class initialization
        Thread.__init__(self)
        # Then initialize this class specific fields
        self._publishUrl = None
        self._actorContext = actorContext
        self._pushChannel = None
        self._ucLib = None
        self._msg = msg
        
    def run(self):
        '''
        Conversion thread
        '''
        # Retrieve the publishUrl from the message
        self._publishUrl = self._msg.popFrame(1, 1).getRaw().decode()
        
        # Create the unit converter library
        self._ucLib = UnitConverter()
        
        # Open the unit converter library
        self._ucLib.open(self._actorContext)
       
        # Perform the conversion
        self.performConversion()
        
        # Initialize the socket to send the converted values
        self._pushChannel = IsisSocket(self._actorContext, ZMQ.PUSH)
        # Connect on result publication channel
        self._pushChannel.connect(self._publishUrl)
        
        # Send converted values
        self.sendConvertedValues()
       
        # Close the socket
        #self._pubChannel.close() #(deactivated due to bug in IsisSocket)
        
        # Close unit converter library
        self._ucLib.close(self._actorContext)
        
        # End of work, the thread can end
        