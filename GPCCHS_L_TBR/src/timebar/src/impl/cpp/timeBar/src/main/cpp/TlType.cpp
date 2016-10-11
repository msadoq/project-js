/*!*******************************************************************
 * Project : ISIS
 * Component : GPCC-timeBar
 * \file TlType.cpp
 * \author Olivier HUYARD
 * \date 25th august 2016
 * \brief Declaration of timelines types
 ********************************************************************/

/********************************************************************
 * HISTORY
 *
 * END-HISTORY
 ********************************************************************/

#include "timeBar/TlType.h"

namespace timeBar
{

const QString TlType::SESSION = QString("Session");
const QString TlType::DATASET = QString("Dataset");
const QString TlType::RECORDSET = QString("Recordset");

/*!***************************************************************************
 * Method : TlType::TlType
 * Purpose : TlType default constructor
 ****************************************************************************/
TlType::TlType():
        _tlValue(TL_SESSION)
{
    // Nothing to do
}

/*!***************************************************************************
 * Method : TlType::TlType
 * Purpose : TlType Copy constructor
 ****************************************************************************/
TlType::TlType(const TlType& type):
        _tlValue(type._tlValue)
{
    // Nothing to do
}

/*!***************************************************************************
 * Method : TlType::TlType
 * Purpose : TlType constructor from enum
 ****************************************************************************/
TlType::TlType(const tlValues& type):
        _tlValue(type)
{
    // Nothing to do
}

/*!***************************************************************************
 * Method : TlType::TlType
 * Purpose : TlType constructor from string
 ****************************************************************************/
TlType::TlType(const QString& name)
{
    _tlValue = TL_SESSION;
    if(name.compare(SESSION)==0) {
        _tlValue = TL_SESSION;
    }
    if(name.compare(DATASET)==0) {
        _tlValue = TL_DATASET;
    }
    if(name.compare(RECORDSET)==0) {
        _tlValue = TL_RECORDSET;
    }
}

/*!***************************************************************************
 * Method : TlType::~TlType
 * Purpose : TlType destructor
 ****************************************************************************/
TlType::~TlType()
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
 * Method : TlType::operator=
 * Purpose : Copy operator
 ***************************************************************************/
// {{RELAX<assignthis> PCS DV14 TBC_CNES Logiscope false alarm: self-assignment is managed
// NB: The only way to have Logiscope see the protection on self-assignment is to violate the rule <sglreturn> which has
// a lower priority level than <assignthis>.
TlType& TlType::operator=(const TlType&  src)
{
    // Check if the copy source and destination are not the same
    if (this != &src) {
        // Copy the message content
        _tlValue = src._tlValue;
    }
    return *this;
}
// }}RELAX<assignthis>

/*!***************************************************************************
 * Method : TlType::operator==
 * Purpose : Equality operator
 ***************************************************************************/
bool TlType::operator==(const TlType&  src) const
{
    bool ret_val = false;

    if (_tlValue ==  src._tlValue) {
        ret_val = true;
    }
    return ret_val;
}

/*!***************************************************************************
 * Method : TlType::value
 * Purpose : Return the enum value of the timeline type
 ****************************************************************************/
core::UINT32 TlType::value()
{
    return _tlValue;
}

/*!***************************************************************************
 * Method : TlType::name
 * Purpose : Return name of the timeline type
 ****************************************************************************/
QString TlType::name()
{
    QString ret_val(QString::null);
    // {{RELAX<swdef> OHD DV14 TBC_CNES No default case because all enum values are taken into account
    switch(_tlValue) {
        case TL_SESSION:
            ret_val = SESSION;
            break;
        case TL_DATASET:
            ret_val = DATASET;
            break;
        case TL_RECORDSET:
            ret_val = RECORDSET;
            break;
    }
    // }}RELAX<assignthis>
    return ret_val;
}

}
