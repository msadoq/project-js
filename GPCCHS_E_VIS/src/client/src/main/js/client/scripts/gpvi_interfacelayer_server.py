# coding: utf-8
import sys
import ctypes
import time
import zmq
import os
import json
from threading import Thread
from bridgeServer_v2 import BridgeServer

server = BridgeServer(None, "tcp://127.0.0.1:5052", "tcp://127.0.0.1:5053")
server.start()


	
   
