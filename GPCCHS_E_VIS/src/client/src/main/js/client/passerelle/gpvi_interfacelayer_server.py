# coding: utf-8
from bridgeServer_v2 import BridgeServer

server = BridgeServer(None, "ipc://convertUnitRequest.ipc", "ipc://convertUnitResponse.ipc")
server.start()


