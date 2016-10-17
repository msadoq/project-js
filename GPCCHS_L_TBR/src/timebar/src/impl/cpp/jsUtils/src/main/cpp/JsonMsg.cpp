/*!*******************************************************************
 * Project : ISIS
 * Component : GPCCHS
 * \file JsonMsg.cpp
 * \author Olivier HUYARD
 * \date 08 december 2015
 * \brief Json message
 *
 * Message that can be sent to Json objects
 *
 ********************************************************************/

#include "jsUtils/JsonMsg.h"
#include "core/BOOL.h"

#include "commonMMI/CommonMMI_global.h"

#include <QtCore/QDebug>

namespace jsUtils
{

// Initialization of constants
const QString JsonMsg::JSON_PARSE_ERROR_MSG("Error when parsing received JSON : %1");
const QString JsonMsg::TYPE_KEY_NAME("type");
const QString JsonMsg::ID_KEY_NAME("id");

/*!***************************************************************************
 * Method : JsonMsg::JsonMsg
 * Purpose : Default JsonMsg constructor
 ****************************************************************************/
JsonMsg::JsonMsg(QObject* parent):
        QObject(parent)
{
    // Nothing to do
}

/*!***************************************************************************
 * Method : JsonMsg::JsonMsg
 * Purpose : JsonMsg Copy constructor
 ****************************************************************************/
JsonMsg::JsonMsg(const JsonMsg& msg):
        QObject()
{
    // Copy the source object
    _msgContent = msg._msgContent;
}

/*!***************************************************************************
 * Method : JsonMsg::JsonMsg
 * Purpose : JsonMsg constructor from QJsonDocument
 ****************************************************************************/
JsonMsg::JsonMsg(const QByteArray & rawData, QObject* parent):
        QObject(parent)
{
    // Fill the content from Json raw data
    fromJson(rawData);
}

/*!***************************************************************************
 * Method : JsonMsg::~JsonMsg
 * Purpose : Destructor
 ****************************************************************************/
JsonMsg::~JsonMsg()
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
 * Method : JsonMsg::operator=
 * Purpose : Copy operator
 ***************************************************************************/
// {{RELAX<assignthis> PCS DV14 TBC_CNES Logiscope false alarm: self-assignment is managed
// NB: The only way to have Logiscope see the protection on self-assignment is to violate the rule <sglreturn> which has
// a lower priority level than <assignthis>.
JsonMsg& JsonMsg::operator=(const JsonMsg&  src)
{
    // Check if the copy source and destination are not the same
    if (this != &src) {
        // Copy the message content
        _msgContent = src._msgContent;
    }
    return *this;
}
// }}RELAX<assignthis>

/*!***************************************************************************
 * Method : JsonMsg::setId
 * Purpose : Set the unique identifier of the object related to this message
 ****************************************************************************/
void JsonMsg::setId(QString id)
{
    _msgContent[JsonMsg::ID_KEY_NAME] = id;
}

/*!***************************************************************************
 * Method : JsonMsg::getId
 * Purpose : Retrieve the identifier of the message
 ****************************************************************************/
QString JsonMsg::getId()
{
    QString ret_val(QString::null);
    // Check if the type exist in map
    if(_msgContent.contains(JsonMsg::ID_KEY_NAME)) {
        ret_val = _msgContent[JsonMsg::ID_KEY_NAME].toString();
    }
    return ret_val;
}

/*!***************************************************************************
 * Method : JsonMsg::getType
 * Purpose : Retrieve the type of the message
 ****************************************************************************/
QString JsonMsg::getType()
{
    QString ret_val(QString::null);
    // Check if the type exist in map
    if(_msgContent.contains(JsonMsg::TYPE_KEY_NAME)) {
        ret_val = _msgContent[JsonMsg::TYPE_KEY_NAME].toString();
    }
    return ret_val;
}

/*!***************************************************************************
 * Method : JsonMsg::toJson
 * Purpose : Convert the message to UTF-8 JSON indented document
 ****************************************************************************/
QByteArray JsonMsg::toJson()
{
    QJsonDocument document;

    // Fill Json from message content
    document = QJsonDocument::fromVariant(_msgContent);
    // Return the converted data (use default indented format)
    return document.toJson();
}

/*!***************************************************************************
 * Method : JsonMsg::fromJson
 * Purpose : Fill this message content with the data contained in raw UTF-8 JSON document
 ****************************************************************************/
void JsonMsg::fromJson(const QByteArray & rawData)
{
    QJsonDocument document;
    QJsonParseError error;

    // Fill the content from Json
    document = QJsonDocument::fromJson(rawData, &error); // %RELAX<Don.Initialisation> PCS DV6 TBC_CNES Logiscope false alarm: init done by default ctor

    // Check if an error occured during parsing
    if(error.error) {
        // Report parsing error
        LOF_INFO(JSON_PARSE_ERROR_MSG.arg(error.errorString()));
    } else {
        // Put the read data in message content
        _msgContent = document.toVariant().toMap();
    }
}


/*!***************************************************************************
 * Method : JsonMsg::clear
 * Purpose : Clear all the data of the model
 ****************************************************************************/
void JsonMsg::clear()
{
    QVariant type;
    QVariant id;
    core::BOOL isTypeSet = false;
    core::BOOL isIdSet = false;
    // Save the type and id fields
    if(_msgContent.contains(JsonMsg::TYPE_KEY_NAME)) {
        type = _msgContent[JsonMsg::TYPE_KEY_NAME];
        isTypeSet = true;
    }
    if(_msgContent.contains(JsonMsg::ID_KEY_NAME)) {
        id = _msgContent[JsonMsg::ID_KEY_NAME];
        isIdSet = true;
    }
    // Clear the message content
    _msgContent.clear();
    // Put back type and id in the message if they were existing
    if(isTypeSet) {
        _msgContent[JsonMsg::TYPE_KEY_NAME] = type;
    }
    if(isIdSet) {
        _msgContent[JsonMsg::ID_KEY_NAME] = type;
    }
}

}
