/*!*******************************************************************
 * Project : ISIS
 * Component : GPCC-timeBar
 * \file TimeBarSocket.cpp
 * \author Olivier HUYARD
 * \date 16th august 2016
 * \brief The timebar socket manager
 *
 * Manager of the socket used by the timebar to communicate with javascript
 ********************************************************************/


/********************************************************************
 * HISTORY
 *
 * END-HISTORY
 ********************************************************************/

#include "timeBar/TimeBarSocket.h"

#include <QtCore/QDebug>

#include "zsocket.h"
#include "zsockopt.h"
#include "czmq_library.h"

#include "core/INT32.h"
#include "core/UINT32.h"
#include "core/C_STRING.h"
#include "core/CHAR.h"

#include "commonMMIUtils/ComManager.h"
#include "commonMMIUtils/LogWrapper.h"

namespace timeBar
{

// Initialize the instance reference to not created
TimeBarSocket* TimeBarSocket::_instance = 0;

/// Default socket rate
const ::core::INT32 TimeBarSocket::DEFAULT_SOCKET_RATE(800000000);

/*!***************************************************************************
 * Method : TimeBarSocket::TimeBarSocket
 * Purpose : TimeBarSocket constructor
 ****************************************************************************/
TimeBarSocket::TimeBarSocket():
        QObject()
{
    // Initialize members
    _instance = 0;
    _context = 0;
    _socketIdCnt = 0;
}

/*!***************************************************************************
 * Method : TimeBarSocket::~TimeBarSocket
 * Purpose : TimeBarSocket destructor
 ****************************************************************************/
TimeBarSocket::~TimeBarSocket()
{
    // Perform a try catch according to coding rule
    try {
        // Nothing to do
    }
    catch (...) {
        // Nothing to do
    }
}

/*!***************************************************************************
 * Method : TimeBarSocket::get
 * Purpose : Get the only one instance of this class
 ****************************************************************************/
TimeBarSocket* TimeBarSocket::get()
{
    // Check is singleton already created
    if (_instance == 0) {
        // Create object if not already existing
        _instance = new TimeBarSocket;
    }
    return _instance;
}

/*!***************************************************************************
 * Method : TimeBarSocket::finalize
 * Purpose : Delete the singleton
 ****************************************************************************/
void TimeBarSocket::finalize()
{
    // If context has been set
    if(_context) {
        // Delete the created sockets
        core::VOID_PTR sockToRemove = 0;
        // While the sockets map hasn't be empty
        while(!_socketsMap.isEmpty()) {
            // Take the first socket of the map
            sockToRemove = _socketsMap.take(_socketsMap.firstKey()).socket;
            // Check that socket reference is not null
            if (sockToRemove) {
                // Destroy the socket
                zsocket_destroy(reinterpret_cast<zctx_t*>(_context->getContext()), sockToRemove);
            }
        }
    }
    // Delete the created instance
    if (_instance) {
        delete _instance;
    }
}

/*!***************************************************************************
 * Method : TimeBarSocket::createSocket
 * Purpose : Set the context to be used for the ZMQ communication
 ****************************************************************************/
core::UINT32 TimeBarSocket::createSocket(core::UINT32 type, QString bundleName, QString uri)
{
    // Create references for required objects
	core::UINT32 socketId = 0;
	core::INT32 ret_val = 0;
	core::C_STRING uri_cpy = 0;
	// Initialize the created socket to not created
	core::VOID_PTR createdSock = 0;

	// Retrieve actor context if necessary
	if(_context == 0) {
		_context = dynamic_cast<core::Context*>(commonMMIUtils::ComManager::getInstance()->getIsisActorContext(bundleName));
	}

	// Check if the context has been initialized
	if(_context) {
		// Try to create the socket
		createdSock = zsocket_new(reinterpret_cast<zctx_t*>(_context->getContext()),type);

		// If socket has been created
		if( createdSock ) {
			// Configure the PUSH/PULL socket

			// Set the high water marks to unlimited
			zsocket_set_hwm(createdSock, 0);
			zsocket_set_sndhwm(createdSock, 0);
			zsocket_set_rcvhwm(createdSock, 0);

			// Set the linger delay to unlimited
			zsocket_set_linger(createdSock, -1);

			// Prepare URI string
			// Use a copy of the uri because it seems this is not possible
			// to get a non const char* on a QString
			uri_cpy = new core::CHAR[uri.size()+1];
			static_cast<void>(std::strncpy(uri_cpy,uri.toStdString().c_str(),uri.size()+1));

			// Connect or bind the socket depending on its type
			if(type == ZMQ_PUSH) {
				// Try to bind the socket
				ret_val = zsocket_bind(createdSock,uri_cpy);
			}
			if(type == ZMQ_PULL) {
				// Try to connect to URI
				ret_val = zsocket_connect(createdSock,uri_cpy);
			}
			// Delete the temporary URI copy
			delete uri_cpy;

			// Check if socket binding/connection succeeded
			if(ret_val >= 0) {
				// Store the socket information
				_socketIdCnt++;
				socketId = _socketIdCnt;
				_socketsMap[socketId].socket = createdSock;
				_socketsMap[socketId].uri = uri;
				_socketsMap[socketId].type = type;
			} else {
				if(type == ZMQ_PUSH) {
					// Report the bind error
					LOF_ERROR(QString("Fail to bind socket for timebar on the URI: %1, returned code is %2").arg(uri).arg(ret_val));
				}
				if(type == ZMQ_PULL) {
					// Report the connection error
					LOF_ERROR(QString("Fail to connect socket for timebar to the URI: %1, returned code is %2").arg(uri).arg(ret_val));
				}
				// Otherwise delete the created socket
				zsocket_destroy(reinterpret_cast<zctx_t*>(_context->getContext()), createdSock);
			}
		} else {
			// Report the context retrieval error
			LOF_ERROR(QString("Fail to create timebar socket for bind on uri : %1").arg(uri));
		}
	} else {
		// Report the context retrieval error
		LOF_ERROR(QString("Fail to retrieve context to create socket for timebar from bundle:%1").arg(bundleName));
	}

	return socketId;
}

/*!***************************************************************************
 * Method : TimeBarSocket::deleteSocket
 * Purpose : Close and destroy a socket
 ****************************************************************************/
void TimeBarSocket::deleteSocket(core::UINT32 id)
{
	core::INT32 ret_val = -1;
	core::UINT32 type = 0;
	core::C_STRING uri_cpy = 0;

    // Check if the socket exists
    if(_socketsMap.contains(id)) {
    	// Prepare URI string
		// Use a copy of the uri because it seems this is not possible
		// to get a non const char* on a QString
		uri_cpy = new core::CHAR[_socketsMap[id].uri.size()+1];
		static_cast<void>(std::strncpy(uri_cpy,_socketsMap[id].uri.toStdString().c_str(),_socketsMap[id].uri.size()+1));
    	// Get the socket type
    	type = _socketsMap[id].type;
		// Disconnect or unbind the socket depending on its type
		if(type == ZMQ_PUSH) {
			// Try to unbind the socket
			ret_val = zsocket_unbind(_socketsMap[id].socket,uri_cpy);
			// Check for error
			if(ret_val) {
				// Report the unbinding error
				LOF_ERROR(QString("Fail to unbind socket for timebar on the URI: %1").arg(_socketsMap[id].uri));
			}
		}
		if(type == ZMQ_PULL) {
			// Try to disconnect from URI
			ret_val = zsocket_disconnect(_socketsMap[id].socket,uri_cpy);
			// Check for error
			if(ret_val) {
				// Report the disconnection error
				LOF_ERROR(QString("Fail to disconnect socket for timebar to the URI: %1").arg(_socketsMap[id].uri));
			}
		}
        // Destroy the socket
        zsocket_destroy(reinterpret_cast<zctx_t*>(_context->getContext()),_socketsMap[id].socket);
        // Remove the socket from the map
        _socketsMap.remove(id);
        // Wait a little bit let the unbind/disconnect free the port (otherwise later bind/connect fails upon timebar re-creation)
        zclock_sleep(100);
    }
}

/*!***************************************************************************
 * Method : TimeBarSocket::send
 * Purpose : Send a message on a socket
 ****************************************************************************/
void TimeBarSocket::send(core::UINT32 id, const QByteArray& message)
{
    // Create reference to message payload
    core::VOID_PTR payloadRef = 0;
    core::C_STRING msg_cpy = 0;

    // Check if the socket exists
    if(_socketsMap.contains(id)) {
        // Copy the message content to let zsocket keeps it as long as necessary
        msg_cpy = new core::CHAR[message.size()+1];
        payloadRef = static_cast<core::VOID_PTR>(std::strncpy(msg_cpy,message.data(),message.size()+1));

        // Send the message without waiting
        // Do not check the ret_val, if lower than 0, this mean that javascript side is not listening, but this shall not be blocking
        static_cast<void>(zsocket_sendmem(_socketsMap[id].socket,payloadRef,message.size(),ZFRAME_DONTWAIT));
    }
}

/*!***************************************************************************
 * Method : TimeBarSocket::receive
 * Purpose : Received a message from a socket
 ****************************************************************************/
void TimeBarSocket::receive(core::UINT32 id, QByteArray& message)
{
	// Create reference to message payload
	zframe_t * rcvFrame = 0;
	core::INT32 recvLen = 0;

	// Check if the socket exists
	if(_socketsMap.contains(id)) {
		// Call the receive service from zmq
		rcvFrame = zframe_recv(_socketsMap[id].socket);

		// Check that a frame has been returned
		if(rcvFrame) {
			// Get the received message length
			recvLen = zframe_size(rcvFrame);
			// Resize the QByteArray to let it receive the message content
			message.resize(recvLen);
			// Copy the message content
			std::memcpy(static_cast<void*>(message.data()),static_cast<void*>(zframe_data(rcvFrame)),recvLen);
			// Put a null byte at the end to avoid memory corruption by QByteArray
			message.data()[recvLen] = 0;
		}
	}
}

}


