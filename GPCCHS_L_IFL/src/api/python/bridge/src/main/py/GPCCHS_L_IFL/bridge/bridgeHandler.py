# coding: utf-8
"""!
Project   : ISIS
Component : GPCCHS_L_IFL-BridgeHandler
@file     : bridgeHandler.py
@author   : ohuyard
@date     : 01/12/2017 
@brief    : Thread executing the requested handler to process a given message and send results 
@type     : Thread
"""
# ====================================================================
# HISTORY
# END-HISTORY
# ====================================================================

from threading import Thread
from GPCC.communicationLibrary.isisSocket import IsisSocket
from GPCC.core.zmq import ZMQ
from GPCC.core.messageFrame import MessageFrame
from GPCC.communicationLibrary.isisMessage import IsisMessage
from importlib import import_module
from GPCC.core.isisTrace import IsisTrace

class BridgeHandler(Thread):
    '''
    @brief : Thread executing the requested handler to process a given message and send results
    '''
    def __init__(self, actorContext=None, responseUrl=None, requestID=None, unitConverterLib=None, handlerClassName=None, msg=None):
        '''
        @brief : Initialize and configure the handler
        @param : actorContext (GPCC.container.isisActorContext) Context of the actor using the bridge
        @param : responseUrl (str) URL on which send the response
        @param : requestID (str) ID to send with the response
        @param : unitConverterLib (GPINUC_L_UCL.unitConverterLibrary.unitConverter) Ready to use UnitConverter
        @param : handlerClassName (str) Name of the handler to call
        @param : msg (GPCC.communicationLibrary.isisMessage) Message to be processed by the handler
        '''
        # First call the parent class initialization
        Thread.__init__(self)
        # Then initialize this class specific fields
        self._actorContext = actorContext
        self._responseUrl = responseUrl
        self._requestID = requestID
        self._ucLib = unitConverterLib
        self._handlerClassName = handlerClassName
        self._msg = msg
        
    def run(self):
        '''
        @brief : Handler thread
        '''
        # Compute the module name
        handlerModuleName = "GPCCHS_L_IFL.bridge." + self._handlerClassName[:1].lower() + self._handlerClassName[1:]
        try:
            # Put in lower case the first letter, because python module names always start with lower case letter
            module = import_module(handlerModuleName)
        except ImportError as err: 
            IsisTrace.error("GPCCHS_L_IFL.bridge : Handler name error {0}, during import of handler : {1}"\
                            .format(err,handlerModuleName))
        
        # If import has been successful, perform the conversion
        results = module.perform(self._ucLib,self._msg)
        
        # Initialize the socket to send the results
        responseChannel = IsisSocket(self._actorContext, ZMQ.PUSH)
        # Connect on result publication channel
        responseChannel.connect(self._responseUrl)
       
        # Create the results message
        msgToSend = IsisMessage(1, 2)
        # Add the request ID  in response message
        
        msgToSend.addFrame(1, MessageFrame(frame = None, data = self._requestID.encode()))
        # Add the results in response message
        msgToSend.addFrame(1, MessageFrame(frame = None, data = results))
        # Send the results
        responseChannel.sendMessage(msgToSend, 0)
       
        # Close the socket
        #_responseChannel.close() #(deactivated due to bug in IsisSocket)
        
        # End of work, the thread can end
        