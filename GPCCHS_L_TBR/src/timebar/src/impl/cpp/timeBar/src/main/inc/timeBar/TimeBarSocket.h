/*!*******************************************************************
 * Project : ISIS
 * Component : GPCC-timeBar
 * \file TimeBarSocket.h
 * \author Olivier HUYARD
 * \date 16th august 2016
 * \brief The timebar socket manager
 *
 * Manager of the socket used by the timebar to communicate with javascript
 ********************************************************************/

#ifndef _TIMEBAR_TIMEBARSOCKET_H_
#define _TIMEBAR_TIMEBARSOCKET_H_

/********************************************************************
 * HISTORY
 *
 * END-HISTORY
 ********************************************************************/


#include "TimeBar_global.h"

#include "czmq.h"

#include <QtCore/QObject>
#include <QtCore/QString>
#include <QtCore/QMap>
#include <QtCore/QByteArray>

#include "core/UINT32.h"
#include "core/INT32.h"
#include "core/VOID_PTR.h"

#include "core/Context.h"

namespace timeBar
{

class TimeBarSocket : public QObject
{
    Q_OBJECT

private:

    /*!----------------------------------------------------------
     * \brief Structure to store data related to a single zmq socket
     *-----------------------------------------------------------!*/
    typedef struct {
        core::VOID_PTR socket;     ///< Pointer to zmq socket
        QString uri;               ///< URI on which the socket is binded
        core::UINT32 type;         ///< Type of the socket, either ZMQ_PUSH or ZMQ_PULL
    } socketData;

    static const ::core::INT32 DEFAULT_SOCKET_RATE;  ///< Default socket rate

    static TimeBarSocket * _instance;                ///< Singleton instance
    ::core::Context * _context;                      ///< Pointer to the context to be used for sockets
    QMap<core::UINT32,socketData> _socketsMap;       ///< Map of sockets ids and their data
    core::UINT32 _socketIdCnt;                       ///< Free running counter for sockets identifiers

public:
    /*!***************************************************************
     * Method : get
     * \brief Getter of this singleton class
     *
     * \return Pointer to the unique instance of the class
     *
     * Get the only one instance of this class
     *****************************************************************/
    static TimeBarSocket* get();

    /*!***************************************************************
     * Method : finalize
     * \brief Delete the singleton
     *
     * Delete itself
     *****************************************************************/
    void finalize();

    /*!***************************************************************
    * Method : createSocket
    * \brief Create a socket to communicate
    *
    * \param type       Type of the socket, either ZMQ_PUSH or ZMQ_PULL
    * \param bundleName Name of the bundle in which the timebar is running, used by socket manager
    * \param uri        Unified resource identifier on which the socket shall be binded
    * \return           Identifier of the created socket, 0 means socket creation failure
    *
    * Create a socket to communicate
    *****************************************************************/
    core::UINT32 createSocket(core::UINT32 type, QString bundleName, QString uri);

    /*!***************************************************************
    * Method : createSocket
    * \brief Close and destroy a socket
    *
    * \param id      Identifier of the socket to close and destroy
    *
    * Close and destroy a socket
    *****************************************************************/
    void deleteSocket(core::UINT32 id);

    /*!***************************************************************
    * Method : send
    * \brief Send a message on a socket
    *
    * \param id      Identifier of the socket on which the message shall be sent
    * \param message Message to send
    *
    * Send a message on a socket
    * This call is not blocking, the frame is lost if there is no receiver
    *****************************************************************/
    void send(core::UINT32 id, const QByteArray& message);

    /*!***************************************************************
    * Method : receive
    * \brief Received a message from a socket
    *
    * \param id      Identifier of the socket on which the message shall be sent
    * \param message Received message
    *
    * Received a message from a socket
    * This call is blocking until a message is received
    *****************************************************************/
    void receive(core::UINT32 id, QByteArray& message);

private:
    /*!***************************************************************
    * Method : TimeBarSocket
    *
    * TimeBarSocket Constructor
    *****************************************************************/
    TimeBarSocket();

    /*!***************************************************************
    * Method : ~TimeBarSocket
    *
    * TimeBarSocket Destructor
    *****************************************************************/
    virtual ~TimeBarSocket();
};

}

#endif
