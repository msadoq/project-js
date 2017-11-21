# coding: utf-8
"""!
Project   : ISIS
Component : GPCCHS_L_IFL-converter
@file     : converter.py
@author   : ohuyard
@date     : 21/11/2017 
@brief    : 
@type     : 
"""
# ====================================================================
# HISTORY
# END-HISTORY
# ====================================================================

from threading import Thread
from GPINUC_L_UCL.unitConverterLibrary.unitConverter import  UnitConverter
from GPCC.container.threadContext import ThreadContext
import zmq

class Converter(Thread):
    '''
    Generic unit converter routing conversion request from mesage to handlers
    '''
    def __init__(self, pushUrl=None, pullUrl=None):
        '''
        Initialize and configure the converter
        '''
        Thread.__init__(self)
        self._pushUrl = pushUrl
        self._pullUrl = pullUrl
        
    def run(self):
        '''
        Override of the thread execution function to do the necessary work
        '''
        # Init looping condition
        doLooping = True
        
        # Init sockets
        zmqContext = zmq.Context()
        pullSocket = zmqContext.socket(zmq.PULL)
        pushSocket = zmqContext.socket(zmq.PUSH)
        pushSocket.bind(self._pushUrl)
        pullSocket.connect(self._pullUrl)
        
        # Create uc lib
        unitConverterLibrary = UnitConverter()
        
        
        
        i = 0
        print  "Converter : Start thread loop"
        while doLooping == True:
            print "Converter : about to wait for reception"
            msg = pullSocket.recv_string()
            if "stop" not in msg:
                doLooping = False
            print "Converter : Message received! : "  + repr(msg)
            pushSocket.send("Response to message " + repr(i))
            i = i +1
        