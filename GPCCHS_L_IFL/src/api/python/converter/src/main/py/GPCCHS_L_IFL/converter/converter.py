# coding: utf-8
"""!
Project   : ISIS
Component : GPCCHS_L_IFL-converter
@file     : converter.py
@author   : ohuyard
@date     : 21/11/2017 
@brief    : Converter used by GPCCHS to perform units conversion
@type     : Thread
"""
# ====================================================================
# HISTORY
# END-HISTORY
# ====================================================================

from threading import Thread
from GPCC.core.zmq import ZMQ
from GPCC.communicationLibrary.isisSocket import IsisSocket
from importlib import import_module
from GPCC.core.isisTrace import IsisTrace

class Converter(Thread):
    '''
    Generic unit converter routing conversion request from mesage to handlers
    '''
    def __init__(self, pullUrl=None, actorContext=None):
        '''
        Initialize and configure the converter
        '''
        Thread.__init__(self)
        self._pullUrl = pullUrl
        self._actorContext = actorContext
        
    def run(self):
        '''
        Override of the thread execution function to do the necessary work
        '''
        # Initialize the looping condition
        doLooping = True
        
        # Initialize the sockets
        pullChannel = IsisSocket(self._actorContext, ZMQ.PULL)
        pullChannel.connect(self._pullUrl)
      
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

                # Test is converter stop is requested
                if firstFrame ==  "STOP":
                    doLooping = False
                else:
                    # If the message is not "STOP", try to load a handler corresponding to it
                    # Compute the class name
                    handlerClassName = firstFrame + "Handler"
                    # Compute the module name
                    handlerModuleName = "GPCCHS_L_IFL.converter." + handlerClassName[:1].lower() + handlerClassName[1:]
                    try:
                        # Put in lower case the first letter, because python module names always start with lower case letter
                        module = import_module(handlerModuleName)
                    except ImportError as err: 
                        IsisTrace.error("GPCCHS_L_IFL.converter : Handler name error {0}, during import of handler : {1}"\
                                        .format(err,handlerModuleName))
                    
                    # If import has been successful, perform the conversion
                    module.runConversion(self._actorContext,msg)
        