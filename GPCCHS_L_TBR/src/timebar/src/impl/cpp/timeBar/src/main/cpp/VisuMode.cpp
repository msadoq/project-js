/*!*******************************************************************
 * Project : ISIS
 * Component : GPCC-timeBar
 * \file VisuMode.cpp
 * \author Olivier HUYARD
 * \date 25th august 2016
 * \brief Declaration of visualization mode type
 ********************************************************************/

/********************************************************************
 * HISTORY
 *
 * END-HISTORY
 ********************************************************************/

#include "timeBar/VisuMode.h"

namespace timeBar
{

const QString VisuMode::NORMAL_MODE = QString("Normal");
const QString VisuMode::SLIDING_MODE = QString("Sliding");
const QString VisuMode::EXTENDED_MODE = QString("Extended");

/*!***************************************************************************
 * Method : VisuMode::VisuMode
 * Purpose : VisuMode default constructor
 ****************************************************************************/
VisuMode::VisuMode():
        _modeValue(TB_NORMAL_MODE)
{
    // Nothing to do
}

/*!***************************************************************************
 * Method : VisuMode::VisuMode
 * Purpose : VisuMode Copy constructor
 ****************************************************************************/
VisuMode::VisuMode(const VisuMode& mode):
        _modeValue(mode._modeValue)
{
    // Nothing to do
}

/*!***************************************************************************
 * Method : VisuMode::VisuMode
 * Purpose : VisuMode constructor from enum
 ****************************************************************************/
VisuMode::VisuMode(const modeValues& mode):
        _modeValue(mode)
{
    // Nothing to do
}

/*!***************************************************************************
 * Method : VisuMode::~VisuMode
 * Purpose : VisuMode destructor
 ****************************************************************************/
VisuMode::~VisuMode()
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
 * Method : VisuMode::operator=
 * Purpose : Copy operator
 ***************************************************************************/
// {{RELAX<assignthis> PCS DV14 TBC_CNES Logiscope false alarm: self-assignment is managed
// NB: The only way to have Logiscope see the protection on self-assignment is to violate the rule <sglreturn> which has
// a lower priority level than <assignthis>.
VisuMode& VisuMode::operator=(const VisuMode&  src)
{
    // Check if the copy source and destination are not the same
    if (this != &src) {
        // Copy the message content
        _modeValue = src._modeValue;
    }
    return *this;
}
// }}RELAX<assignthis>

/*!***************************************************************************
 * Method : VisuMode::value
 * Purpose : Return the enum value of the visualization mode
 ****************************************************************************/
core::UINT32 VisuMode::value()
{
    return _modeValue;
}

/*!***************************************************************************
 * Method : VisuMode::name
 * Purpose : Return name of the visualization mode
 ****************************************************************************/
QString VisuMode::name()
{
    QString ret_val(QString::null);
    // {{RELAX<swdef> OHD DV14 TBC_CNES No default case because all enum values are taken into account
    switch(_modeValue) {
        case TB_NORMAL_MODE:
            ret_val = NORMAL_MODE;
            break;
        case TB_SLIDING_MODE:
            ret_val = SLIDING_MODE;
            break;
        case TB_EXTENDED_MODE:
            ret_val = EXTENDED_MODE;
            break;
    }
    // }}RELAX<assignthis>
    return ret_val;
}

}
