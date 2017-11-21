# -*- coding: utf-8 -*-

from GPCCHS_L_IFL.converter.converter import  Converter
import zmq

userPullUrl = "ipc://response.ipc"
userPushUrl = "ipc://request.ipc"
myConverter = Converter(pushUrl=userPullUrl,pullUrl=userPushUrl)

myConverter.start()

zmqContext = zmq.Context()
pullSocket = zmqContext.socket(zmq.PULL)
pushSocket = zmqContext.socket(zmq.PUSH)
pushSocket.bind(userPushUrl)
pullSocket.connect(userPullUrl)

print "About to send message"
pushSocket.send("Sent message content")
print "Message sent, wait response"
response = pullSocket.recv_string()

print "Receveid response is: ", repr(response)

print "Sent stop message"

pushSocket.send("stop")

