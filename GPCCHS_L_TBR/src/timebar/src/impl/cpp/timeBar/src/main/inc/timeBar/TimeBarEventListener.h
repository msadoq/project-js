/*!*******************************************************************
 * Project : ISIS
 * Component : GPCC-timeBar
 * \file TimeBarEventListener.h
 * \author ohuyard
 * \date June 18, 2014
 * \brief This abstract class defines the behaviour of the timeBar events listeners.
 ********************************************************************/

/********************************************************************
 * HISTORY
 *
 * END-HISTORY
 ********************************************************************/

#ifndef TIMEBAREVENTLISTENER_H
#define TIMEBAREVENTLISTENER_H

#include "TimeBar_global.h"

#include <QtCore/QDateTime>
#include <QtCore/QFlags>
#include <QtCore/QHash>

namespace timeBar
{

class TimeBarEventListener
{

public:
    /*!----------------------------------------------------------
     * \brief Enumeration for visualization window elements identification
     *
     * The identification of timebar elements which can emit a signal
     *-----------------------------------------------------------!*/
    enum VISU_WND_ELT {
        VISU_WND_ELT_START_TIME = 0x1,   /*!< bit 0 is set when the start time of the visualization window has been updated */
        VISU_WND_ELT_END_TIME = 0x2,     /*!< bit 1 is set when the end time of the visualization window has been updated */
        VISU_WND_ELT_CURRENT_TIME = 0x4  /*!< bit 2 is set when the current time has been updated */
    };

    /*!----------------------------------------------------------
     * \brief Bits field type to store the updated visualization window elements
     *
     * Type to give to the signal user the list of visualization window
     * elements which have just been updated
     *-----------------------------------------------------------!*/
    Q_DECLARE_FLAGS(VisuWndElts, VISU_WND_ELT);

    /*!----------------------------------------------------------
     * \brief Structure to store the visualization window elements for a timeline
     *
     * Structure to bind together all the data related to the updated
     * elements within the visualization window of a timeline in a timebar
     *-----------------------------------------------------------!*/
    typedef struct {
        QDateTime start;      /*!< Start time of the visualization window in the timeline timebase */
        QDateTime end;        /*!< End time of the visualization window in the timeline timebase */
        QDateTime current;    /*!< Current time in the timeline timebase  */
    } timeLineEventData;

    /*!----------------------------------------------------------
     * \brief Structure to store all the data for the signal user
     *
     * Structure to bind together all the data related to the updated
     * elements within the timebar
     *-----------------------------------------------------------!*/
    typedef struct {
        VisuWndElts                   updElts;   /*!< Bitfield giving the updated elements of the visualization window */
        int                           updTl;     /*!< Unique identifier of the updated timeline. If set to 0, all timelines have been updated */
        int                           masterTlId;/*!< Unique identifier of the master session timeline */
        QHash<int, timeLineEventData> tlEvents;  /*!< Map of the timeline unique id with visualization window elements position in their respective timebases, provided even if the element position hasn't been updated */
    } timeBarEventData;

    /*!***************************************************************
     * Method : TimeBarEventListener
     *
     * TimeBarEventListener Constructor
     *****************************************************************/
    TimeBarEventListener();

    /*!***************************************************************
     * Method : ~TimeBarEventListener
     *
     * TimeBarEventListener Destructor
     *****************************************************************/
    virtual ~TimeBarEventListener();
    
    /*!***************************************************************
     * Method : updateWindowElts
     *
     * \param eventData   The new data of visualization window in TimeBar
     *
     * Warn that the visualization window elements position has been updated
     *****************************************************************/
    virtual void updateWindowElts(const timeBarEventData & eventData) = 0;

    /*!***************************************************************
     * Method : timelineAdded
     *
     * \param tlId   The unique Id of the newly added timeline
     *
     * Warn that a timeline has been added in the timebar
     *****************************************************************/
    virtual void timelineAdded(const int & tlId, const timeLineEventData & timelineData) = 0;

    /*!***************************************************************
     * Method : timelineRemoved
     *
     * \param tlId   The unique Id of the newly removed timeline (no id reuse)
     *
     * Warn that a timeline has been removed from the timebar
     *****************************************************************/
    virtual void timelineRemoved(const int & tlId) = 0;

    /*!***************************************************************
     * Method : timelineRenamed
     *
     * \param tlId    The unique Id of the renamed timeline (no id reuse)
     * \param oldName The old name of the timeline
     * \param newName The new name of the timeline
     *
     * Warn that a timeline has been renamed
     *****************************************************************/
    virtual void timelineRenamed(const int & tlId, const QString oldName, const QString newName) = 0;
};

Q_DECLARE_OPERATORS_FOR_FLAGS(TimeBarEventListener::VisuWndElts)

}
#endif
