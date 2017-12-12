# Produced by Acceleo Python Generator 1.1.2-R8

# -*- coding: utf-8 -*-
"""!
Project   : ISIS
Component : GPCCHS_L_IFL
@file     : BridgeUser.py
@author   : isis
@date     : 
@brief    : TODO Enter documentation in RSA model
@type     : Actor
"""


# ====================================================================
# Start of user code HistoryZone
# HISTORY
#
# END-HISTORY
# End of user code HistoryZone
# ====================================================================


from GPCC.communicationLibrary.mALInteractorFactory import MALInteractorFactory
from GPCC.container.isisActor import IsisActor
from GPCC.container.pipeNodeType import PipeNodeType
# Start of user code ImportsZone
from GPCCHS_L_IFL.bridge_test.BridgeUser.bridgeServer import BridgeServer
from bridge.ConvertUnitValues_pb2 import ConvertUnitValues
from bridge.ResultValues_pb2 import ResultValues
from GPCC.ccsds_mal.cOMPOSITE import COMPOSITE
from GPCC.core.zmq import ZMQ
from GPCC.communicationLibrary.isisSocket import IsisSocket
from GPCC.core.messageFrame import MessageFrame
from GPCC.communicationLibrary.isisMessage import IsisMessage
from GPCC.ccsds_mal.sTRING import STRING
from GPCC.core.propertyType import PropertyType
# End of user code

class BridgeUser (IsisActor) :
    """!
    @brief: GPCCHS_L_IFL.BridgeUser : TODO Enter documentation in RSA model
    """

    # Start of user code ProtectedAttrZone
    
    # End of user code

    def __init__(self,nodeType, parentPipe):
        """!
        @brief : Constructor of BridgeUser
        @param : nodeType (container::PipeNodeType) The node type 
        @param : parentPipe (container::IsisPipe) The parent pipe 
        """
        # generated
        IsisActor.__init__(self,nodeType = nodeType, parentPipe = parentPipe)
        self._interactorFactory = MALInteractorFactory()
        # Start of user code Constructor
        self._bridge = None
        # End of user code

    def __del__(self):
        """!
        @brief : Destructor of BridgeUser
        """
        # generated
        
        #Start of user code Destructor
        
        # End of user code

    @staticmethod
    def launchActor(ctx, parentPipe, args=None):
        """!
        @brief : This method is dedicated to thread management 
            Every reactor is launch and instanciated by the same thread
        @param : ctx The context
        @param : parentPipe The parent pipe
        @param : args Launching arguments
        """

        # Create the actor instance
        actor = BridgeUser(PipeNodeType.NORMAL_NODE, parentPipe)
        
        # Start of user code launchActor

        # End of user code

        # Start the actor loop
        actor.start()
        return

    def doInit(self):
        """!
        @brief : BridgeUser initialization
        """
        # generated

        # Start of user code doInit
        pass
        # End of user code

    def onStop(self, stopCause):
        """!
        @brief BridgeUser.onStop
               Method called on stop
        @param ActorStopCause : stopCause, Stop cause
        """
        # Start of user code onStop
        # optional injection point, empty by default
        return
        # End of user code
    
    def onExit(self) :
        """!
        @brief : BridgeUser initialization
        """
        # generated
        # Start of user code onExit
        pass
        # End of user code
    
    def onActivate(self) :
        """!
        @brief : BridgeUser initialisation
        """
        # Start of user code onActivate
        actorContext = self.getContext()
        
        # Initialize the time properties of this actor
        sessionId = self.setTimeProperties()
        
        # Define the URL for 0MQ communications
        userRespUrl = "ipc://response.ipc"
        userReqUrl = "ipc://request.ipc"
       
        # Initialize 0MQ connection
        reqChannel = IsisSocket(actorContext, ZMQ.PUSH)
        respChannel = IsisSocket(actorContext, ZMQ.PULL)
        reqChannel.bind(userReqUrl)
        respChannel.bind(userRespUrl)

        # Create and start the server thread
        server = BridgeServer(actorContext,userReqUrl,userRespUrl)
        server.start()
        
        # Initialize request id
        requestID = 0
        
        ##################################
        print("Test : /////////////// Time conversion from Mission to Posix test ///////////////")
        ##################################
        
        # Update request id
        requestID = requestID + 1
        # Create the message to send with only one column
        msgToSend = IsisMessage(1, 4)
        # Add the first frame : type of conversion
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "TimestampFromMissionToPosix".encode()))
        # Add the second frame : the request ID to be able to link the response to the request
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "ABCDEF{0:03d}".format(requestID).encode()))
        # Add the third frame : the reference session for the time conversion, the one configured in the test configuration
        msgToSend.addFrame(1, MessageFrame(frame = None, data = sessionId.encode()))
        # Add the fourth frame : the list of conversions to do
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "1,0;2,0".encode()))
        
        # Send the message
        reqChannel.sendMessage(msgToSend, 0)
        print("Test : Message sent for conversion ", repr(requestID), ", wait response")
        response = respChannel.receiveMessage(0)
        
        # Drop the two first frames of the response, because they are useless
        response.popFrame(1,1)
        response.popFrame(1,1)
        # Read the result from the third frame
        frame = response.popFrame(1,1)
        print("Test : Received response for request of ID: ", repr(frame.getRaw().decode()))
        frame = response.popFrame(1,1)
        print("Test : Error message is: ", repr(frame.getRaw().decode()))
        frame = response.popFrame(1,1)
        results = ResultValues()
        results.ParseFromString(bytes(frame.getRaw()))
        valuesList = []
        for value in results.values:
            valuesList.append(value._string.value)
        print("Test : Received result are: ", repr(valuesList))
        
        ##################################
        print("Test : /////////////// Time conversion from Posix to Mission test ///////////////")
        ##################################
        
        # Update request id
        requestID = requestID + 1
        # Create the message to send with only one column
        msgToSend = IsisMessage(1, 4)
        # Add the first frame : type of conversion
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "TimestampFromPosixToMission".encode()))
        # Add the second frame : the request ID to be able to link the response to the request
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "ABCDEF{0:03d}".format(requestID).encode()))
        # Add the third frame : the reference session for the time conversion, the one configured in the test configuration
        msgToSend.addFrame(1, MessageFrame(frame = None, data = sessionId.encode()))
        # Add the fourth frame : the list of conversions to do
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "454000000001,0;454000000002,0".encode()))
        
        # Send the message
        reqChannel.sendMessage(msgToSend, 0)
        print("Test : Message sent for conversion ", repr(requestID), ", wait response")
        response = respChannel.receiveMessage(0)
        
        # Drop the two first frames of the response, because they are useless
        response.popFrame(1,1)
        response.popFrame(1,1)
        # Read the result from the third frame
        frame = response.popFrame(1,1)
        print("Test : Received response for request of ID: ", repr(frame.getRaw().decode()))
        frame = response.popFrame(1,1)
        print("Test : Error message is: ", repr(frame.getRaw().decode()))
        frame = response.popFrame(1,1)
        results = ResultValues()
        results.ParseFromString(bytes(frame.getRaw()))
        valuesList = []
        for value in results.values:
            valuesList.append(value._string.value)
        print("Test : Received result are: ", repr(valuesList))
        
        ##################################
        print("Test : /////////////// Time conversion from base to TAI ///////////////")
        ##################################
        
        # Update request id
        requestID = requestID + 1
        # Create the message to send with only one column
        msgToSend = IsisMessage(1, 4)
        # Add the first frame : type of conversion
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "TimeToTai".encode()))
        # Add the second frame : the request ID to be able to link the response to the request
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "ABCDEF{0:03d}".format(requestID).encode()))
        # Add the third frame : the reference of the time to convert
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "GPS".encode()))
        # Add the fourth frame : the list of conversions to do
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "2,3600,500000;3,3600,500000".encode()))
        
        # Send the message
        reqChannel.sendMessage(msgToSend, 0)
        print("Test : Message sent for conversion ", repr(requestID), ", wait response")
        response = respChannel.receiveMessage(0)
        
        # Drop the two first frames of the response, because they are useless
        response.popFrame(1,1)
        response.popFrame(1,1)
        # Read the result from the third frame
        frame = response.popFrame(1,1)
        print("Test : Received response for request of ID: ", repr(frame.getRaw().decode()))
        frame = response.popFrame(1,1)
        print("Test : Error message is: ", repr(frame.getRaw().decode()))
        frame = response.popFrame(1,1)
        results = ResultValues()
        results.ParseFromString(bytes(frame.getRaw()))
        valuesList = []
        for value in results.values:
            valuesList.append(value._string.value)
        print("Test : Received result are: ", repr(valuesList))
        
        ##################################
        print("Test : /////////////// Time conversion from base to TAI in milliseconds ///////////////")
        ##################################
        
        # Update request id
        requestID = requestID + 1
        # Create the message to send with only one column
        msgToSend = IsisMessage(1, 5)
        # Add the first frame : type of conversion
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "TimeToMsTai".encode()))
        # Add the second frame : the request ID to be able to link the response to the request
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "ABCDEF{0:03d}".format(requestID).encode()))
        # Add the third frame : the reference session for the time conversion, the one configured in the test configuration
        msgToSend.addFrame(1, MessageFrame(frame = None, data = sessionId.encode()))
        # Add the fourth frame : the reference of the time to convert
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "J2000".encode()))
        # Add the fifth frame : the list of conversions to do
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "366.25;367.25".encode()))
        
        # Send the message
        reqChannel.sendMessage(msgToSend, 0)
        print("Test : Message sent for conversion ", repr(requestID), ", wait response")
        response = respChannel.receiveMessage(0)
                
        # Drop the two first frames of the response, because they are useless
        response.popFrame(1,1)
        response.popFrame(1,1)
        # Read the result from the third frame
        frame = response.popFrame(1,1)
        print("Test : Received response for request of ID: ", repr(frame.getRaw().decode()))
        frame = response.popFrame(1,1)
        print("Test : Error message is: ", repr(frame.getRaw().decode()))
        frame = response.popFrame(1,1)
        results = ResultValues()
        results.ParseFromString(bytes(frame.getRaw()))
        valuesList = []
        for value in results.values:
            valuesList.append(value._string.value)
        print("Test : Received result are: ", repr(valuesList))
        
        ##################################
        print("Test : /////////////// Time conversion UTC to TAI ///////////////")
        ##################################
        
        # Update request id
        requestID = requestID + 1
        # Create the message to send with only one column
        msgToSend = IsisMessage(1, 4)
        # Add the first frame : type of conversion
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "ClockUtcToTai".encode()))
        # Add the second frame : the request ID to be able to link the response to the request
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "ABCDEF{0:03d}".format(requestID).encode()))
        # Add the third frame : the reference session for the time conversion, the one configured in the test configuration
        msgToSend.addFrame(1, MessageFrame(frame = None, data = sessionId.encode()))
        # Add the fourth frame : the list of conversions to do
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "946684800000,123456789;996684800000,123456789".encode()))
        
        # Send the message
        reqChannel.sendMessage(msgToSend, 0)
        print("Test : Message sent for conversion ", repr(requestID), ", wait response")
        response = respChannel.receiveMessage(0)
        
        # Drop the two first frames of the response, because they are useless
        response.popFrame(1,1)
        response.popFrame(1,1)
        # Read the result from the third frame
        frame = response.popFrame(1,1)
        print("Test : Received response for request of ID: ", repr(frame.getRaw().decode()))
        frame = response.popFrame(1,1)
        print("Test : Error message is: ", repr(frame.getRaw().decode()))
        frame = response.popFrame(1,1)
        results = ResultValues()
        results.ParseFromString(bytes(frame.getRaw()))
        valuesList = []
        for value in results.values:
            valuesList.append(value._string.value)
        print("Test : Received result are: ", repr(valuesList))
        
        ##################################
        print("Test : /////////////// Time conversion TAI to UTC ///////////////")
        ##################################
        
        # Update request id
        requestID = requestID + 1
        # Create the message to send with only one column
        msgToSend = IsisMessage(1, 4)
        # Add the first frame : type of conversion
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "ClockTaiToUtc".encode()))
        # Add the second frame : the request ID to be able to link the response to the request
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "ABCDEF{0:03d}".format(requestID).encode()))
        # Add the third frame : the reference session for the time conversion, the one configured in the test configuration
        msgToSend.addFrame(1, MessageFrame(frame = None, data = sessionId.encode()))
        # Add the fourth frame : the list of conversions to do
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "946684832000,123456789;996684832000,123456789".encode()))
        
        # Send the message
        reqChannel.sendMessage(msgToSend, 0)
        print("Test : Message sent for conversion ", repr(requestID), ", wait response")
        response = respChannel.receiveMessage(0)
        
        # Drop the two first frames of the response, because they are useless
        response.popFrame(1,1)
        response.popFrame(1,1)
        # Read the result from the third frame
        frame = response.popFrame(1,1)
        print("Test : Received response for request of ID: ", repr(frame.getRaw().decode()))
        frame = response.popFrame(1,1)
        print("Test : Error message is: ", repr(frame.getRaw().decode()))
        frame = response.popFrame(1,1)
        results = ResultValues()
        results.ParseFromString(bytes(frame.getRaw()))
        valuesList = []
        for value in results.values:
            valuesList.append(value._string.value)
        print("Test : Received result are: ", repr(valuesList))
        
        ##################################
        print("Test : /////////////// Unit conversion ///////////////")
        ##################################
        
        # Update request id
        requestID = requestID + 1
        # Create input values protobuf
        unitConv = ConvertUnitValues()
        unitConv.fromUnit = "km"
        unitConv.toUnit = "m"
        value = unitConv.values.add()
        value._string.value = "3.5".encode()
        value = unitConv.values.add()
        value._string.value = "2.5".encode()
        value = unitConv.values.add()
        value._string.value = "1.5".encode()
        
        # Create the message to send with only one column
        msgToSend = IsisMessage(1, 5)
        # Add the first frame : type of conversion
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "ConvertUnit".encode()))
        # Add the second frame : the request ID to be able to link the response to the request
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "ABCDEF{0:03d}".format(requestID).encode()))
        
        # Add the third frame : the necessary data for conversion
        # This frame will contain a list of ccsds_mal.types_pb2.ATTRIBUTE
        handlerFrame = COMPOSITE(data = unitConv.SerializeToString(), size = unitConv.ByteSize() )
        msgToSend.addFrame(1 ,handlerFrame)
       
        # Send the message
        reqChannel.sendMessage(msgToSend, 0)
        print("Test : Message sent for conversion ", repr(requestID), ", wait response")
        response = respChannel.receiveMessage(0)
        
        # Drop the two first frames of the response, because they are useless
        response.popFrame(1,1)
        response.popFrame(1,1)
        # Read the result from the third frame
        frame = response.popFrame(1,1)
        print("Test : Received response for request of ID: ", repr(frame.getRaw().decode()))
        frame = response.popFrame(1,1)
        print("Test : Error message is: ", repr(frame.getRaw().decode()))
        frame = response.popFrame(1,1)
        results = ResultValues()
        results.ParseFromString(bytes(frame.getRaw()))
        valuesList = []
        for value in results.values:
            valuesList.append(value._string.value)
        print("Test : Received result are: ", repr(valuesList))
        
        ##################################
        print("Test : /////////////// Unit conversion error (no input values) ///////////////")
        ##################################
        
        # Update request id
        requestID = requestID + 1
        # Create input values protobuf
        unitConv = ConvertUnitValues()
        unitConv.fromUnit = "m"
        unitConv.toUnit = "mm"
        # Do not add values to create conversion error
        
        # Create the message to send with only one column
        msgToSend = IsisMessage(1, 5)
        # Add the first frame : type of conversion
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "ConvertUnit".encode()))
        # Add the second frame : the request ID to be able to link the response to the request
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "ABCDEF{0:03d}".format(requestID).encode()))
        
        # Add the third frame : the necessary data for conversion
        # This frame will contain a list of ccsds_mal.types_pb2.ATTRIBUTE
        handlerFrame = COMPOSITE(data = unitConv.SerializeToString(), size = unitConv.ByteSize() )
        msgToSend.addFrame(1 ,handlerFrame)
       
        # Send the message
        reqChannel.sendMessage(msgToSend, 0)
        print("Test : Message sent for conversion ", repr(requestID), ", wait response")
        response = respChannel.receiveMessage(0)
        
        # Drop the two first frames of the response, because they are useless
        response.popFrame(1,1)
        response.popFrame(1,1)
        # Read the result from the third frame
        frame = response.popFrame(1,1)
        print("Test : Received response for request of ID: ", repr(frame.getRaw().decode()))
        frame = response.popFrame(1,1)
        print("Test : Error message is: ", repr(frame.getRaw().decode()))
        frame = response.popFrame(1,1)
        results = ResultValues()
        results.ParseFromString(bytes(frame.getRaw()))
        valuesList = []
        for value in results.values:
            valuesList.append(value._string.value)
        print("Test : Received result are: ", repr(valuesList))
        
        ##################################
        print("Test : /////////////// Handler import error ///////////////")
        ##################################
        
        # Update request id
        requestID = requestID + 1
        # Create the message to send with only one column
        msgToSend = IsisMessage(1, 5)
        # Add the first frame : type of conversion
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "empty".encode()))
        # Add the second frame : the request ID to be able to link the response to the request
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "ABCDEF{0:03d}".format(requestID).encode()))
        # Add the third frame : the unit of the input values
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "km".encode()))
        # Add the fourth frame : the unit for the output values
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "m".encode()))
        # Add the fifth frame : the list of conversions to do
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "3.5;2.5;1.5".encode()))
        
        # Send the message
        reqChannel.sendMessage(msgToSend, 0)
        print("Test : Message sent for conversion ", repr(requestID), ", wait response")
        response = respChannel.receiveMessage(0)
        print("Test : Response received, frame count is: ", repr(response.getFrameCount()))
        
        # Drop the two first frames of the response, because they are useless
        response.popFrame(1,1)
        response.popFrame(1,1)
        # Read the result from the third frame
        frame = response.popFrame(1,1)
        print("Test : Received response for request of ID: ", repr(frame.getRaw().decode()))
        frame = response.popFrame(1,1)
        print("Test : Error message is: ", repr(frame.getRaw().decode()))
        frame = response.popFrame(1,1)
        results = ResultValues()
        results.ParseFromString(bytes(frame.getRaw()))
        valuesList = []
        for value in results.values:
            valuesList.append(value._string.value)
        print("Test : Received result are: ", repr(valuesList))
        
        ################################
        print("Test : /////////////// End of test, send STOP message  ///////////////")
        ################################
        
        msgToSend = IsisMessage(1, 1)
        # Add the first frame : type of conversion
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "STOP".encode()))
        print("Test : Sent stop message")
        reqChannel.sendMessage(msgToSend, 0)
        print("Test : Stop message sent")
        
        # End of user code
    

    def onPropertyUpdate(self, propertyType, propertyName, propertyValue) :
        """!
        @brief onPropertyUpdate : initialization
        @param : PropertyType : propertyType, TODO documentation
        @param : String : propertyName, TODO documentation
        @param : ATTRIBUTE : propertyValue, TODO documentation
        """
        # Start of user code onPropertyUpdate
        pass
        # End of user code

    def postInit(self):
        """!
        @brief : BridgeUser postinitialization
        """
        # generated

        # Start of user code postInit
        pass
        # End of user code

    
    # Start of user code ProtectedOperZone
    def setTimeProperties(self):
        """
        @brief setTimeProperties : Update the properties of the actors to define time properties for the conversion
        @return : String : ID of the configured session
        """
        # Define the time properties for the test
        sessionId = "182"
        epochKey = "SESSION." + sessionId + ".EPOCH"
        epochValue = "454000000"
        iersKey = "SESSION." + sessionId + ".IERS"
        iersValue = "(63072000,0) (78796800,11) (94694400,12) (126230400,13) (157766400,14) (189302400,15) \
                     (220924800,16) (252460800,17) (283996800,18) (315532800,19) (362793600,20) (394329600,21) \
                     (425865600,22) (489024000,23) (567993600,24) (631152000,25) (662688000,26) (709948800,27) \
                     (741484800,28) (773020800,29) (662688000,30) (867715200,31) (915148800,32) (1136073600,33) \
                     (1230768000,34) (1341100800,35)"
        iersCntKey = "SESSION." + sessionId + ".IERS_count"
        iersCntValue = str(len(iersValue.split(" ")))
        
        # Update actor property directly
        self.updateProperty(PropertyType.PROPERTY, epochKey, STRING(epochValue))
        self.updateProperty(PropertyType.PROPERTY, iersKey, STRING(iersValue))
        self.updateProperty(PropertyType.PROPERTY, iersCntKey, STRING(iersCntValue))

        # Return the configured session ID
        return sessionId
    # End of user code

