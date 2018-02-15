from threading import Thread
from bridge_v2 import Bridge

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
        '''
        @brief : Server listening thread
        '''
        # Create Bridge Api
        bridgeLib = Bridge(self._actorContext,self._requestUrl,self._responseUrl)
        
        # Perform the blocking call to Bridge Api
        bridgeLib.perform()
        