/*!*******************************************************************
 * Project : ISIS
 * Component : GPCC-timeBar
 * \file VisuMode.h
 * \author Olivier HUYARD
 * \date 25th august 2016
 * \brief Declaration of visualization mode type
 ********************************************************************/

/********************************************************************
 * HISTORY
 *
 * END-HISTORY
 ********************************************************************/

#ifndef TIMEBAR_VISUMODE_H
#define TIMEBAR_VISUMODE_H

#include "TimeBar_global.h"

#include "core/UINT32.h"

#include <QtCore/QString>

namespace timeBar
{

class VisuMode
{
public:
    /*!----------------------------------------------------------
     * \brief Enumeration for visualization modes
     *
     * The different visualization modes in which a timebar car be
     *-----------------------------------------------------------!*/
    typedef enum
    {
        TB_NORMAL_MODE,  ///< Normal visualization mode
        TB_SLIDING_MODE, ///< Sliding visualization mode
        TB_EXTENDED_MODE ///< Extended visualization mode
    } modeValues;

protected:
    modeValues _modeValue;         /// Value of the visualization mode

    static const QString NORMAL_MODE;   /// Name of the normal visualization mode
    static const QString SLIDING_MODE;  /// Name of the sliding visualization mode
    static const QString EXTENDED_MODE; /// Name of the extended visualization mode

public:
    /*!***************************************************************
     * Method : VisuMode
     * \brief Constructor
     *
     * VisuMode default constructor
     *****************************************************************/
    explicit VisuMode();

    /*!***************************************************************
     * Method : VisuMode
     * \brief VisuMode copy constructor
     *
     * \param mode Copy source
     *
     * VisuMode Copy constructor
     *****************************************************************/
    explicit VisuMode(const VisuMode& mode);

    /*!***************************************************************
     * Method : VisuMode
     * \brief VisuMode constructor from enum
     *
     * \param mode Mode value
     *
     * VisuMode constructor from enum
     *****************************************************************/
    explicit VisuMode(const modeValues& type);

    /*!***************************************************************
     * Method : ~VisuMode
     * \brief VisuMode destructor
     *
     * VisuMode destructor
     *****************************************************************/
    virtual ~VisuMode();

    /*!***************************************************************
     * Method : operator=
     * \brief Copy operator
     *
     * \param src Copy source
     *
     * Copy operator
     *****************************************************************/
    virtual VisuMode& operator=(const VisuMode&  src);

    /*!***************************************************************
     * Method : value
     * \brief Value getter
     *
     * Return the enum value of the visualization mode
     *****************************************************************/
    core::UINT32 value();

    /*!***************************************************************
     * Method : name
     * \brief Name getter
     *
     * Return name of the visualization mode
     *****************************************************************/
    QString name();
};

}
#endif
