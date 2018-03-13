from threading import Thread
from bridge_v2 import Bridge
from queue import PileSingleton
import zmq
import time

class BridgeServer(Thread):
    '''
    @brief : Class representing the bridge execution thread in GPCCHS_E_VIS
    '''
    def __init__(self, actorContext=None, requestUrl=None, responseUrl=None):
        '''
        @brief : Initialize and configure the server
        @param : actorContext (GPCC.container.isisActorContext) Context of the actor using the bridge
        @param : requestUrl (str) URL on which listen the resquests
        @param : responseUrl (str) URL on which send the responses
        '''
        # First call the parent class initialization
        Thread.__init__(self)
        # Then initialize this class specific fields
        self._requestUrl = requestUrl
        self._responseUrl = responseUrl
        self._actorContext = actorContext

    def run(self):    
        queue = PileSingleton()
        # Thread which handle response sending message
        sendResponse = SendResponseThread(self._responseUrl, queue)
        sendResponse.start()

        # Create Bridge Api
        bridgeLib = Bridge(self._actorContext,self._requestUrl,self._responseUrl, queue)
        
        # Perform the blocking call to Bridge Api
        bridgeLib.perform()

class SendResponseThread(Thread):
    def __init__(self, responseUrl=None, queue= None):
        # First call the parent class initialization
        Thread.__init__(self)
        # Then initialize this class specific fields
        self._responseUrl = responseUrl
        self._queue = queue
    def run(self):
        context = zmq.Context()
        responseChannel = context.socket(zmq.PUB)
        responseChannel.bind(self._responseUrl)

        while True:
            if int(format(self._queue.size())) > 0:
                message = self._queue.process()
                responseChannel.send_string(message)
            time.sleep(0.05)
        