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
from GPCC.ccsds_mal.uOCTET import UOCTET
from GPCC.ccsds_mal.uSHORT import USHORT
from GPCC.ccsds_mal.interactorFactory import InteractorFactory
from GPCC.container.isisActor import IsisActor
from GPCC.container.pipeNodeType import PipeNodeType
# Start of user code ImportsZone
from GPCCHS_L_IFL.bridge_test.BridgeUser.bridgeServer import BridgeServer
from GPCC.core.zmq import ZMQ
from GPCC.communicationLibrary.isisSocket import IsisSocket
from GPCC.core.messageFrame import MessageFrame
from GPCC.communicationLibrary.isisMessage import IsisMessage
from GPCC.ccsds_mal.sTRING import STRING
from GPCC.ccsds_mal.uINTEGER import UINTEGER
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
        print("DEBUG BridgeUser : onActivate start")
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
        
        # Send a conversion request
        
        # Create the message to send with only one column
        msgToSend = IsisMessage(1, 4)
        # Add the first frame : type of conversion
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "TimestampFromMissionToPosix".encode()))
        # Add the second frame : the request ID to be able to link the response to the request
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "ABCDEF001".encode()))
        # Add the third frame : the reference session for the time conversion, the one configured in the test configuration
        msgToSend.addFrame(1, MessageFrame(frame = None, data = sessionId.encode()))
        # Add the fourth frame : the list of conversions to do
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "1,0;2,0".encode()))
        
        # Send the message
        reqChannel.sendMessage(msgToSend, 0)
        print("DEBUG BridgeUser : Message sent, wait response")
        response = respChannel.receiveMessage(0)
        print("DEBUG BridgeUser : Response received, frame count is: ", repr(response.getFrameCount()))
        
        # Drop the two first frames of the response, because they are useless
        response.popFrame(1,1)
        response.popFrame(1,1)
        # Read the result from the third frame
        frame = response.popFrame(1,1)
        print("DEBUG BridgeUser : Received response for request of ID: ", repr(frame.getRaw().decode()))
        frame = response.popFrame(1,1)
        print("DEBUG BridgeUser : Received result are: ", repr(frame.getRaw().decode()))
        
        # Create the STOP message
        msgToSend = IsisMessage(1, 1)
        # Add the first frame : type of conversion
        msgToSend.addFrame(1, MessageFrame(frame = None, data = "STOP".encode()))
        print("DEBUG BridgeUser : Sent stop message")
        reqChannel.sendMessage(msgToSend, 0)
        print("DEBUG BridgeUser : Stop message sent")
        
        print("DEBUG BridgeUser : onActivate ends")
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

