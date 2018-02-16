from threading import Thread
import zmq
import json
import time
from GPCC.communicationLibrary.isisSocket import IsisSocket
from GPCC.core.zmq import ZMQ
from GPCC.core.messageFrame import MessageFrame
from GPCC.communicationLibrary.isisMessage import IsisMessage
from importlib import import_module
from GPINUC_L_UCL.unitConverterLibrary.unitConverterExceptionType import UnitConverterExceptionType
from GPINUC_L_UCL.unitConverterLibrary.unitConverterException import UnitConverterException
from bridge.ResultValues_pb2 import ResultValues
from GPCC.ccsds_mal.cOMPOSITE import COMPOSITE

class BridgeHandler(Thread):
    '''
    @brief : Thread executing the requested handler to process a given message and send results
    '''
    def __init__(self, actorContext=None, responseUrl=None, requestID=None, unitConverterLib=None, handlerClassName=None, msg=None, queue=None):
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
        self._queue = queue

    def run(self):
        '''
        @brief : Handler thread
        '''      
        # Initialize error status
        errorMsg = None
        # Compute the module name
        handlerModuleName = "GPCCHS_L_IFL.bridge." + self._handlerClassName[:1].lower() + self._handlerClassName[1:]
        try:
            # Put in lower case the first letter, because python module names always start with lower case letter
            module = import_module(handlerModuleName)
        except ImportError as err: 
            errorMsg = "GPCCHS_L_IFL.bridgeHandler : Handler import error : {0}".format(err)
        
        # If module import has been successful
        if errorMsg == None:
            # Initialize errorMsg to ensure that it is a string
            errorMsg = ""
            # If import has been successful, perform the conversion
            results, ucErr = module.perform(self._ucLib,self._msg)
            # Module import has been successful so manage the error returned by UnitConverter library
            if ucErr:
                # Retrieve the error message (filled what ever the error type)
                errorMsg = ucErr.what()
        else:
            # Otherwise create results object
            results = ResultValues()

        valuesList = []
        for value in results.values:
          valuesList.append(value._float.value)

        #responseChannel.send_multipart([self._requestID.encode('utf-8'), str(valuesList[0]).encode('utf-8')])
        message_response = dict()
        message_response['header'] = {};
        message_response['header']['transactionID'] = self._requestID;
        message_response['header']['method'] = self._handlerClassName;
        message_response['payload'] = valuesList[0];
        self._queue.add_message(json.dumps(message_response))
        # End of work, the thread can end
        