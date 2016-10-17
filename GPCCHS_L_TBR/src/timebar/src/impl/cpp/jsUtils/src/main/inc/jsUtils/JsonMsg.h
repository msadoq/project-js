/*!*******************************************************************
 * Project : ISIS
 * Component : GPCCHS
 * \file JsonMsg.h
 * \author Olivier HUYARD
 * \date 08 december 2015
 * \brief Json message
 *
 * Message that can be sent to Json objects
 *
 ********************************************************************/

#ifndef JSUTILS_JSONMSG_H
#define JSUTILS_JSONMSG_H

#include <QtCore/QObject>
#include <QtCore/QVariant>
#include <QtCore/QMap>
#include <QtCore/QJsonDocument>
#include <QtCore/QByteArray>

namespace jsUtils
{

class JsonMsg: public QObject
{
    Q_OBJECT

protected:

    static const QString JSON_PARSE_ERROR_MSG; /// Error message in case of JSON parsing error
    static const QString TYPE_KEY_NAME;        /// Name of the type key
    static const QString ID_KEY_NAME;          /// Name of the id key
    QVariantMap _msgContent;                   /// Content of the message

public:
    // {{RELAX<Tr.ParamOptionnel> OHD DV14 TBC_CNES
    // The inheritance from QObject requires that this constructor have a optional pointer to its parent
    // This is the way Qt manage the inheritance relationship
    /*!***************************************************************
     * Method : JsonMsg
     * \brief JsonMsg constructor
     *
     * \param parent Parent object
     *
     * Default JsonMsg constructor
     *****************************************************************/
    explicit JsonMsg(QObject* parent = 0);
    // }}RELAX<Tr.ParamOptionnel>

    /*!***************************************************************
     * Method : JsonMsg
     * \brief JsonMsg copy constructor
     *
     * \param msg Copy source
     *
     * JsonMsg Copy constructor
     *****************************************************************/
    explicit JsonMsg(const JsonMsg& msg);

    // {{RELAX<Tr.ParamOptionnel> OHD DV14 TBC_CNES
    // The inheritance from QObject requires that this constructor have a optional pointer to its parent
    // This is the way Qt manage the inheritance relationship
    /*!***************************************************************
     * Method : JsonMsg
     * \brief JsonMsg constructor from QJsonDocument
     *
     * \param jsonDoc QJsonDocument document in which retrieve the message content
     * \param parent  Parent object
     *
     * JsonMsg constructor from QJsonDocument
     *****************************************************************/
    explicit JsonMsg(const QByteArray & rawData, QObject* parent = 0);
    // }}RELAX<Tr.ParamOptionnel>

    /*!***************************************************************
     * Method : ~JsonMsg
     * \brief JsonMsg destructor
     *
     * JsonMsg destructor
     *****************************************************************/
    virtual ~JsonMsg();

    /*!***************************************************************
     * Method : operator=
     * \brief Copy operator
     *
     * \param src Copy source
     *
     * Copy operator
     *****************************************************************/
    virtual JsonMsg& operator=(const JsonMsg&  src);

    /*!***************************************************************
     * Method : setId
     * \brief Set the plot identifier
     *
     * \param id Unique identifier of the object
     *
     * Set the unique identifier of the object related to this message
     *****************************************************************/
    void setId(QString id);

    /*!***************************************************************
     * Method : getId
     * \brief Get the identifier of the message
     *
     * \return The identifier of the message
     *
     * Retrieve the identifier of the message
     *****************************************************************/
    QString getId();

    /*!***************************************************************
     * Method : getType
     * \brief Get the type of the message
     *
     * \return The type of the message
     *
     * Retrieve the type of the message
     *****************************************************************/
    QString getType();

    /*!***************************************************************
     * Method : toJson
     * \brief Convert message to UTF8 JSON document
     *
     * \return Converted message
     *
     * Convert the message to UTF-8 JSON indented document
     *****************************************************************/
    virtual QByteArray toJson();

    /*!***************************************************************
     * Method : fromJson
     * \brief Fill the message from the content of a QJsonDocument
     *
     * \param rawData Raw data to read JSON document
     *
     * Fill this message content with the data contained in raw UTF-8 JSON document
     *****************************************************************/
    virtual void fromJson(const QByteArray & rawData);

    /*!***************************************************************
     * Method : clear
     * \brief Empty the entire message
     *
     * Clear all the data of the model
     *****************************************************************/
    virtual void clear();

signals:

    /*!***************************************************************
     * Method : jsonMsgChanged
     * \brief Message update signal
     *
     * Emit when the message has been updated partially or totally
     *****************************************************************/
    void jsonMsgChanged();

};
}
#endif
