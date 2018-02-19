import zmq
from GPINUC_L_UCL.unitConverterLibrary.unitConverter import  UnitConverter
from bridge.ConvertUnitValues_pb2 import ConvertUnitValues
from GPCC.communicationLibrary.isisMessage import IsisMessage
from GPCC.ccsds_mal.cOMPOSITE import COMPOSITE
from bridgeHandler_v2 import BridgeHandler

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
        
        # Initialize the listening socket
        # pullChannel = IsisSocket(self._actorContext, ZMQ.PULL)
        # pullChannel.connect(self._requestUrl)

        context = zmq.Context()
        pullChannel = context.socket(zmq.SUB)
        pullChannel.connect(self._requestUrl)
        pullChannel.setsockopt_string(zmq.SUBSCRIBE, '')  

        # Start the listening loop
        while doLooping == True:
            # Receive the next conversion request
            method, transactionID, value, unitesource, unitecible = pullChannel.recv_multipart()

            # Check if there is a conversion to do
            if unitesource is not None and unitecible is not None and value is not None:
                # Test if the bridge execution shall end
                if method.decode('utf-8') ==  "STOP":
                    doLooping = False
                else:
                    # compute the handler class name
                    handlerClassName = method.decode('utf-8') + "Handler"
                    # Get the request ID
                    requestID = transactionID.decode('utf-8')
                    # Decode informations for conversion
                    unitesourceDecode = unitesource.decode('utf-8')
                    unitecibleDecode = unitecible.decode('utf-8')
                    valueDecode = float(value.decode('utf-8'))             

                    unitConv = ConvertUnitValues()
                    unitConv.fromUnit = unitesourceDecode
                    unitConv.toUnit = unitecibleDecode
                    value = unitConv.values.add()
                    value._float.value = valueDecode                

                    msg = IsisMessage(1, 3)
                    handlerFrame = COMPOSITE(data = unitConv.SerializeToString(), size = unitConv.ByteSize() )
                    msg.addFrame(1 ,handlerFrame)

                    # Then create and start the processing thread
                    newHandler = BridgeHandler(self._actorContext,self._responseUrl,requestID,ucLib,handlerClassName,msg)
                    newHandler.start()
                    
        