import zmq
import json
from GPINUC_L_UCL.unitConverterLibrary.unitConverter import  UnitConverter
from bridge.ConvertUnitValues_pb2 import ConvertUnitValues
from GPCC.communicationLibrary.isisMessage import IsisMessage
from GPCC.ccsds_mal.cOMPOSITE import COMPOSITE
from bridgeHandler_v2 import BridgeHandler
import time

class Bridge():
    '''
    @brief : Bridge used by GPCCHS to process data
    '''
    def __init__(self, actorContext=None, requestUrl=None, responseUrl=None, queue=None):
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
        self._queue = queue
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

        context = zmq.Context()
        pullChannel = context.socket(zmq.SUB)
        pullChannel.connect(self._requestUrl)
        pullChannel.setsockopt_string(zmq.SUBSCRIBE, '')  

        # Start the listening loop
        while doLooping == True:
            # Receive the next conversion request
            message = pullChannel.recv()
            j = json.loads(message.decode());
            uuid = j['header']['transactionID']
            method = j['header']['method']
            unitesource = j['payload']['unitesource']
            unitecible = j['payload']['unitecible']
            value = j['payload']['value']

            # Check if there is a conversion to do
            if unitesource is not None and unitecible is not None and value is not None:
                # Test if the bridge execution shall end
                if method ==  "STOP":                                                                                       
                    doLooping = False
                else:
                    # compute the handler class name
                    handlerClassName = method + "Handler"
                    # Get the request ID
                    requestID = uuid
                    # Decode informations for conversion
                    unitesourceDecode = unitesource
                    unitecibleDecode = unitecible         

                    unitConv = ConvertUnitValues()
                    unitConv.fromUnit = unitesourceDecode            
                    unitConv.toUnit = unitecibleDecode
                    for v in value:
                        valueTmp = unitConv.values.add()
                        valueTmp._float.value = float(v['value'])              

                    msg = IsisMessage(1, 3)
                    handlerFrame = COMPOSITE(data = unitConv.SerializeToString(), size = unitConv.ByteSize() )
                    msg.addFrame(1 ,handlerFrame)

                    # Then create and start the processing thread
                    newHandler = BridgeHandler(self._actorContext,self._responseUrl,requestID,ucLib,handlerClassName,msg, self._queue)
                    newHandler.start()
            time.sleep(0.05)
        