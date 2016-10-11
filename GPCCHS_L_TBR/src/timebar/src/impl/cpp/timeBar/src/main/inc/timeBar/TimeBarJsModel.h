/*!*******************************************************************
 * Project : ISIS
 * Component : GPCC-timeBar
 * \file TimeBarJsModel.h
 * \author Olivier HUYARD
 * \date 16th august 2016
 * \brief The timebar data model for javascript
 *
 * Data model of the timebar used to communicate with javascript
 ********************************************************************/

/********************************************************************
 * HISTORY
 *
 * END-HISTORY
 ********************************************************************/

#ifndef TIMEBAR_TIMEBARJSMODEL_H_
#define TIMEBAR_TIMEBARJSMODEL_H_

#include <QtCore/QObject>
#include <QtCore/QString>
#include <QtCore/QVariantMap>

#include "timeBarsModel/TimeBar.h"

#include "jsUtils/JsonMsg.h"

namespace timeBar
{

class TimeBarJsModel : public jsUtils::JsonMsg
{
    Q_OBJECT

public:
    // ACTIONTYPE key values
    static const QString INIT_ACTIONTYPE;            /// Action type value for initial timebar data setting
    static const QString CURR_TIME_UPD_ACTIONTYPE;   /// Action type value for current time updated action
    static const QString START_TIME_UPD_ACTIONTYPE;  /// Action type value for start time updated action
    static const QString END_TIME_UPD_ACTIONTYPE;    /// Action type value for end time updated action
    static const QString SLIDE_LIMITS_UPD_ACTIONTYPE;/// Action type value for sliding mode limits updated action
    static const QString EXT_LIMITS_UPD_ACTIONTYPE;  /// Action type value for extended mode limits updated action
    static const QString PLAY_STATE_UPD_ACTIONTYPE;  /// Action type value for playing state updated action
    static const QString SPEED_UPD_ACTIONTYPE;       /// Action type value for speed updated action
    static const QString VISU_POS_UPD_ACTIONTYPE;    /// Action type value for visualization window data updated action
    static const QString VISU_MODE_UPD_ACTIONTYPE;   /// Action type value for visualization window mode updated action
    static const QString MASTER_TL_ID_UPD_ACTIONTYPE;/// Action type value for master timeline id updated action
    static const QString TL_ADDED_ACTIONTYPE;        /// Action type value for timeline addition
    static const QString TL_REMOVED_ACTIONTYPE;      /// Action type value for timeline removal
    static const QString TL_NAME_UPD_ACTIONTYPE;     /// Action type value for timeline name updated action
    static const QString TL_OFFSET_UPD_ACTIONTYPE;   /// Action type value for timeline offset updated action
    static const QString TB_SAVE_ACTIONTYPE      ;   /// Action type value for timebar data saving in DataStore

    // PLAYINGSTATE key values
    static const QString REPLAY_PLAYINGSTATE;        /// State for play in the past playing state
    static const QString PAUSE_PLAYINGSTATE;         /// State for pause playing state
    static const QString REALTIME_PLAYINGSTATE;      /// State for real-time playing state

protected:
    static const QString TYPE_KEY_VALUE;        /// Value of the type key
    static const QString ACTIONTYPE_KEY_NAME;   /// Name of the action type key
    static const QString MASTERTLID_KEY_NAME;   /// Name of the master timeline id key
    static const QString VISUWINDOW_KEY_NAME;   /// Name of visualization window parameters list key
    static const QString VISUSTART_KEY_NAME;    /// Name of the visualization window start key
    static const QString VISUEND_KEY_NAME;      /// Name of the visualization window end key
    static const QString CURRENTTIME_KEY_NAME;  /// Name of the visualization window current time key
    static const QString DEFAULT_WIDTH_KEY_NAME;/// Name of the visualization window default width key
    static const QString SLIDEWINDOW_KEY_NAME;  /// Name of sliding mode parameters list key
    static const QString SLIDE_LOW_LIM_KEY_NAME;/// Name of the sliding mode lower limit key
    static const QString SLIDE_UP_LIM_KEY_NAME; /// Name of the sliding mode upper limit key
    static const QString EXT_UP_LIM_KEY_NAME;   /// Name of extended mode upper limit key
    static const QString VISUMODE_KEY_NAME;     /// Name of the visualization mode key
    static const QString RULER_START_KEY_NAME;  /// Name of the ruler start time (ms since epoch) key
    static const QString RULER_RES_KEY_NAME;    /// Name of the ruler resolution (ms per pixel) key
    static const QString PLAYINGSTATE_KEY_NAME; /// Name of the playing state key
    static const QString SPEED_KEY_NAME;        /// Name of the visualization speed key
    static const QString TIMESPEC_KEY_NAME;     /// Name of the time specification key
    static const QString OFS_FROM_UTC_KEY_NAME; /// Name of the offset from UTC key
    static const QString TIMELINES_KEY_NAME;    /// Name of timelines list key
    static const QString TLID_KEY_NAME;         /// Name of the timeline identifier key
    static const QString TLNAME_KEY_NAME;       /// Name of the timeline name key
    static const QString TLTYPE_KEY_NAME;       /// Name of the timeline type key
    static const QString TLOFFSET_KEY_NAME;     /// Name of the timeline offset key
    static const QString DS_PATH_KEY_NAME;      /// Name of the timeline dataset/recordset file path in DataStore key
    static const QString SESSIONID_KEY_NAME;    /// Name of the timelines session identifier key

    // Message extended content
    QVariantList _timelines;                   /// List of the timelines
    QVariantMap _visuWindow;                   /// Sub map of visualization window parameters
    QVariantMap _slideWindow;                  /// Sub map of sliding mode parameters

public:
    /*!***************************************************************
     * Method : TimeBarJsModel
     * \brief Default constructor
     *
     * \param parent            Parent object
     *
     * TimeBarJsModel default constructor
     *****************************************************************/
    explicit TimeBarJsModel(QObject * parent = 0);

    /*!***************************************************************
     * Method : TimeBarJsModel
     * \brief TimeBarJsModel copy constructor
     *
     * \param msg Copy source
     *
     * TimeBarJsModel Copy constructor
     *****************************************************************/
    explicit TimeBarJsModel(const TimeBarJsModel& msg);

    /*!***************************************************************
     * Method : TimeBarJsModel
     * \brief TimeBarJsModel constructor from QJsonDocument
     *
     * \param jsonDoc QJsonDocument document in which retrieve the message content
     * \param parent  Parent object
     *
     * TimeBarJsModel constructor from QJsonDocument
     *****************************************************************/
    explicit TimeBarJsModel(const QByteArray & rawData, QObject* parent = 0);

    /*!***************************************************************
     * Method : ~TimeBarJsModel
     * \brief TimeBarJsModel destructor
     *
     * TimeBarJsModel destructor
     *****************************************************************/
    virtual ~TimeBarJsModel();

    /*!***************************************************************
     * Method : clear
     * \brief Empty the entire message
     *
     * Clear all the data of the model
     *****************************************************************/
    void clear();

    /*!***************************************************************
     * Method : toJson
     * \brief Convert message to UTF8 JSON document
     *
     * \return Converted message
     *
     * Convert the message to UTF-8 JSON indented document
     *****************************************************************/
    QByteArray toJson();

    /*!***************************************************************
     * Method : fromJson
     * \brief Fill the message from the content of a QJsonDocument
     *
     * \param rawData Raw data to read JSON document
     *
     * Fill this message content with the data contained in raw UTF-8 JSON document
     *****************************************************************/
    void fromJson(const QByteArray & rawData);

    /*!***************************************************************
     * Method : toTimeBarModel
     * \brief Fill-in a single timebar of TimeBarsModel from message
     *
     * \param model TimeBarsModel of a single timebar to fill it
     *
     * Fill-in a single timebar of TimeBarsModel from message
     *****************************************************************/
    void toTimeBarModel(timeBarsModel::TimeBar* model);

    /*!***************************************************************
     * Method : setAction
     * \brief Set the action
     *
     * \param action  Action performed on timebar data
     *
     * Set the action related to the message
     *****************************************************************/
    void setAction(QVariant action);

    /*!***************************************************************
     * Method : setTimebarData
     * \brief Set the root level TimeBar data in json
     *
     * \param id         Timebar name
     * \param mode       Visualization window playing mode
     * \param play       Visualization window playing state
     * \param speed      Visualization window playing speed
     * \param rulerStart Start time of the ruler
     * \param rulerRes   Resolution in ms per pixels of the ruler
     * \param timeSpec   Time specification
     * \param ofsFromUTC Offset from UTC for time specification
     *
     * Set the root level TimeBar data in json
     *****************************************************************/
    void setTimebarData(QVariant id, QVariant mode, QVariant play, QVariant speed, QVariant rulerStart,
                        QVariant rulerRes, QVariant timeSpec, QVariant ofsFromUTC);

    /*!***************************************************************
     * Method : setTimebarRuler
     * \brief Set the ruler TimeBar data in json
     *
     * \param rulerStart Start time of the ruler
     * \param rulerRes   Resolution in ms per pixels of the ruler
     *
     * Set the ruler TimeBar data in json
     *****************************************************************/
    void setTimebarRuler(QVariant rulerStart, QVariant rulerRes);

    /*!***************************************************************
     * Method : setTimeSpec
     * \brief Set the ruler TimeBar data in json
     *
     * \param timeSpec   Time specification
     * \param ofsFromUTC Offset from UTC for time specification
     *
     * Set the time specification data in json
     *****************************************************************/
    void setTimeSpec(QVariant timeSpec, QVariant ofsFromUTC);

    /*!***************************************************************
     * Method : addSessionTimeline
     * \brief Add a session timeline
     *
     * \param id       Timeline id
     * \param name     Timeline name
     * \param type     Timeline type
     * \param offset   Timeline offset
     * \param sessId   Id of the session linked to the session timeline
     *
     * Add a session timeline
     *****************************************************************/
    void addSessionTimeline(QVariant id, QVariant name, QVariant type, QVariant offset, QVariant sessId);

    /*!***************************************************************
     * Method : addTimeline
     * \brief Add a timeline (not a session one)
     *
     * \param id       Timeline id
     * \param name     Timeline name
     * \param type     Timeline type
     * \param offset   Timeline offset
     * \param dsPath   Timeline ressource path in DataStore
     *
     * Add a timeline (not a session one)
     *****************************************************************/
    void addTimeline(QVariant id, QVariant name, QVariant type, QVariant offset, QVariant dsPath);

    /*!***************************************************************
     * Method : removeTimeline
     * \brief Remove a timeline
     *
     * \param id       Timeline id
     *
     * Remove a timeline
     *****************************************************************/
    void removeTimeline(QVariant id);

    /*!***************************************************************
     * Method : updateTimelineName
     * \brief Update a timeline name
     *
     * \param id      Timeline id
     * \param name    New timeline name
     *
     * Update a timeline name in the message
     *****************************************************************/
    void updateTimelineName(QVariant id, QVariant name);

    /*!***************************************************************
     * Method : UpdateTimelineOffset
     * \brief Update the offset of a timeline
     *
     * \param id       Timeline id
     * \param offset   Timeline offset
     *
     * Update the offset of a timeline
     *****************************************************************/
    void updateTimelineOffset(QVariant id, QVariant offset);

    /*!***************************************************************
     * Method : setSlideModeData
     * \brief Set the sliding visualization mode data
     *
     * \param lower   Sliding mode lower limit
     * \param upper   Sliding mode upper limit
     *
     * Set the sliding visualization mode data
     *****************************************************************/
    void setSlideModeData(QVariant lower, QVariant upper);

    /*!***************************************************************
     * Method : setExtendedModeData
     * \brief Set the extended visualization mode data
     *
     * \param upper   Extended mode upper limit
     *
     * Set the extended visualization mode data
     *****************************************************************/
    void setExtendedModeData(QVariant upper);

    /*!***************************************************************
     * Method : setWindPosData
     * \brief Set the visualization window position data
     *
     * \param start   Visualization window start position
     * \param current Visualization window current time position
     * \param end     Visualization window end position
     *
     * Set the visualization window position data
     *****************************************************************/
    void setWindPosData(QVariant start, QVariant current, QVariant end);

    /*!***************************************************************
     * Method : setWindPosDefaultWidth
     * \brief Set the visualization window default width
     *
     * \param width   Visualization window default width
     *
     * Set the visualization window default width
     *****************************************************************/
    void setWindPosDefaultWidth(QVariant width);

    /*!***************************************************************
     * Method : setMasterTlId
     * \brief Set the master timeline id
     *
     * \param master  Master timeline id
     *
     * Set the master timeline id
     *****************************************************************/
    void setMasterTlId(QVariant master);

    /*!***************************************************************
     * Method : setWndStart
     * \brief Set the visualization window start
     *
     * \param start   Visualization window start position
     *
     * Set the visualization window start
     *****************************************************************/
    void setWndStart(QVariant start);

    /*!***************************************************************
     * Method : setWndEnd
     * \brief Set the visualization window end
     *
     * \param end     Visualization window end position
     *
     * Set the visualization window end
     *****************************************************************/
    void setWndEnd(QVariant end);

    /*!***************************************************************
     * Method : setCurrentTime
     * \brief Set the visualization window current time
     *
     * \param current Visualization window current time position
     *
     * Set the visualization window current time
     *****************************************************************/
    void setCurrentTime(QVariant current);

    /*!***************************************************************
     * Method : setPlayingState
     * \brief Set the visualization playing state
     *
     * \param play    Visualization window playing state
     *
     * Set the visualization playing state
     *****************************************************************/
    void setPlayingState(QVariant play);

    /*!***************************************************************
     * Method : setSpeed
     * \brief Set the visualization playing speed
     *
     * \param speed    Visualization window playing speed
     *
     * Set the visualization playing speed
     *****************************************************************/
    void setSpeed(QVariant speed);

    /*!***************************************************************
     * Method : setMode
     * \brief Set the visualization mode
     *
     * \param mode    Visualization mode
     *
     * Set the visualization mode
     *****************************************************************/
    void setMode(QVariant mode);
};


}
#endif
