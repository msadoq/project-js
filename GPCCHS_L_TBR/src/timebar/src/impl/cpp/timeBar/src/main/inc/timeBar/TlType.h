/*!*******************************************************************
 * Project : ISIS
 * Component : GPCC-timeBar
 * \file TlType.h
 * \author Olivier HUYARD
 * \date 25th august 2016
 * \brief Declaration of timelines types
 ********************************************************************/

/********************************************************************
 * HISTORY
 *
 * END-HISTORY
 ********************************************************************/

#ifndef TIMEBAR_TLTYPE_H
#define TIMEBAR_TLTYPE_H

#include "TimeBar_global.h"

#include "core/UINT32.h"

#include <QtCore/QString>

namespace timeBar
{

class TlType
{
public:
    /*!----------------------------------------------------------
     * \brief Enumeration for timelines type
     *
     * The different types a timeline can be
     *-----------------------------------------------------------!*/
    typedef enum
    {
        TL_SESSION,  ///< Session timeline type
        TL_DATASET,  ///< Dataset timeline type
        TL_RECORDSET ///< Recordset timeline type
    } tlValues;

protected:
    tlValues _tlValue;               /// Value of the timeline type

    static const QString SESSION;   /// Name of the session timeline type
    static const QString DATASET;   /// Name of the dataset timeline type
    static const QString RECORDSET; /// Name of the recordset timeline type

public:
    /*!***************************************************************
     * Method : TlType
     * \brief Default constructor
     *
     * TlType default constructor
     *****************************************************************/
    explicit TlType();

    /*!***************************************************************
     * Method : TlType
     * \brief TlType copy constructor
     *
     * \param type Copy source
     *
     * TlType Copy constructor
     *****************************************************************/
    explicit TlType(const TlType& type);

    /*!***************************************************************
     * Method : TlType
     * \brief TlType constructor from enum
     *
     * \param type Type value
     *
     * TlType constructor from enum
     *****************************************************************/
    explicit TlType(const tlValues& type);

    /*!***************************************************************
     * Method : TlType
     * \brief TlType constructor from string
     *
     * \param name Type name
     *
     * TlType constructor from string
     *****************************************************************/
    explicit TlType(const QString& name);

    /*!***************************************************************
     * Method : ~TlType
     * \brief TlType destructor
     *
     * TlType destructor
     *****************************************************************/
    virtual ~TlType();

    /*!***************************************************************
     * Method : operator=
     * \brief Copy operator
     *
     * \param src Copy source
     *
     * Copy operator
     *****************************************************************/
    virtual TlType& operator=(const TlType&  src);

    /*!***************************************************************
     * Method : operator==
     * \brief Equality operator
     *
     * \param src Comparision source
     *
     * Equality operator
     *****************************************************************/
    virtual bool operator==(const TlType&  src) const;

    /*!***************************************************************
     * Method : value
     * \brief Value getter
     *
     * Return the enum value of the timeline type
     *****************************************************************/
    core::UINT32 value();

    /*!***************************************************************
     * Method : name
     * \brief Name getter
     *
     * Return name of the timeline type
     *****************************************************************/
    QString name();
};

}
#endif
