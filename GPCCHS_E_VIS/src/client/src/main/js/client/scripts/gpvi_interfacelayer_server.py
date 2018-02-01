# coding: utf-8
import sys
import ctypes
import time
import zmq
import os
import json
from threading import Thread

print("Test Pyhton")

context = zmq.Context()
socketSUB = context.socket(zmq.SUB)
socketSUB.connect("tcp://127.0.0.1:5052")
socketSUB.setsockopt_string(zmq.SUBSCRIBE, ''.decode('ascii'))
nombre = 5000



socketPUB = context.socket(zmq.PUB)
socketPUB.bind("tcp://127.0.0.1:5053")

libc = ctypes.cdll.LoadLibrary('libc.so.6')
# System dependent, see e.g. /usr/include/x86_64-linux-gnu/asm/unistd_64.h to have the correct SYS_gettid number
SYS_gettid = 186
def getThreadId():
   """Returns OS thread id - Specific to Linux"""
   return libc.syscall(SYS_gettid)


class Traiter(Thread):
    def __init__(self, message, compteur):
        Thread.__init__(self)
        self.message = message
	self.compteur = compteur


    def run(self):
	#DEBUG
	print("Received request: "+ self.message + " in thread " + repr(self.compteur) )
	j = json.loads(self.message);
	#print("DUMPS = " + json.dumps(self.message, indent=4))
	#DEBUG
	print("JSON object: "+ repr(j) + " JSON HEADER.transID = " + repr(j['header']['transactionID']));
	if  self.compteur == nombre - 1:
		fin = time.time()
		temps = fin - debut 
		print("Date de fin = "+ repr(fin))
		print("Durée = "+ repr(temps) + " s")
	
	
			
	uuid = j['header']['transactionID']
	method = j['header']['method']
	parametres = j['payload']
	
	module = __import__(method + "_handler");	

	ret = module.handler(parametres);
	#DEBUG
	#print("REPONSE =====> UUID = " + repr(uuid) + " method = "+ method + " parametres = "+repr(parametres) +" PID = " + repr(os.getpid()) + " ThreadID = " + repr(getThreadId())+  " RET CODE = " + repr(ret));
	
	# format and send the response
	#socketPUB.send_string(repr(uuid) + "@@" + str(ret));
	message_response = dict()
	message_response['header'] = {};
	message_response['header']['transactionID'] = uuid;
	message_response['header']['method'] = method;
	message_response['payload'] = ret;
	print("================+>>>>>>> DUMP the response ="+ json.dumps(message_response, indent=4));
	socketPUB.send_string(json.dumps(message_response));

		
i = 0
print("PID = " + repr(os.getpid()) + " Thread ID in main : " + repr(getThreadId())+"\n");

while True:
	#  Wait for next request from client
	#message = socketSUB.recv_string()
	message = socketSUB.recv()
	if i == 0 : 
		debut = time.time()
		print("====> DEBUT = " + repr(debut));
	Traiter(message, i).start();
	i = i + 1;

	
   
