# coding: utf-8
"""!
Project   : ISIS
Component : GPCCHS_L_IFL-bridge
@file     : bridge.py
@author   : ohuyard
@date     : 01/12/2017 
@brief    : Bridge used by GPCCHS to process data
@type     : Object
"""
# ====================================================================
# HISTORY
# END-HISTORY
# ====================================================================

from GPCC.core.zmq import ZMQ
from GPCC.communicationLibrary.isisSocket import IsisSocket
from GPINUC_L_UCL.unitConverterLibrary.unitConverter import  UnitConverter
from GPCCHS_L_IFL.bridge.bridgeHandler import BridgeHandler

class Bridge():
    '''
    @brief : Bridge used by GPCCHS to process data
    '''
    def __init__(self, actorContext=None, requestUrl=None, responseUrl=None):
        '''
        @brief : Initialize and configure the server
        @param : actorContext (GPCC.container.isisActorContext) Context of the actor using the bridge
        @param : requestUrl (str) URL on which listen the resquests
        @param : responseUrl (str) URL on which send the responses
        '''
        # Initialize necessary data
        self._requestUrl = requestUrl
        self._responseUrl = responseUrl
        self._actorContext = actorContext
        self._ucLib = None
        self._pushChannel = None
        
    def perform(self):
        '''
        @brief : Blocking function which listen to requests and forward them to corresponding handlers
        '''
        # Initialize the looping condition
        doLooping = True
        
        # Create the unit converter library
        ucLib = UnitConverter()
        # Open the unit converter library
        ucLib.open(self._actorContext)
        
        # Initialize the listening socket
        pullChannel = IsisSocket(self._actorContext, ZMQ.PULL)
        pullChannel.connect(self._requestUrl)
     
        # Start the listening loop
        while doLooping == True:
            # Receive the next conversion request
            msg = pullChannel.receiveMessage(0)
            # Check if there is a message
            if msg is not None and msg.getFrameCount() > 0:
                # Remove the not used header frame (first one)
                msg.popFrame(1, 1)
                # Remove the second frame, which correspond to the size (nb lines and columns) of the message
                msg.popFrame(1, 1)
                # Get the first relevant frame
                firstFrame = msg.popFrame(1, 1).getRaw().decode()

                # Test if the bridge execution shall end
                if firstFrame ==  "STOP":
                    doLooping = False
                else:
                    # If the message is not "STOP", compute the handler class name
                    handlerClassName = firstFrame + "Handler"
                    # Get the next frame, which contains the request ID
                    requestID = msg.popFrame(1, 1).getRaw().decode()

                    # Then create and start the processing thread
                    newHandler = BridgeHandler(self._actorContext,self._responseUrl,requestID,ucLib,handlerClassName,msg)
                    newHandler.start()
                    
        # Close the listening socket
        #pullChannel.close() #(deactivated due to FA9685 in IsisSocket)
        # Close unit converter library
        ucLib.close(self._actorContext)
                    
        