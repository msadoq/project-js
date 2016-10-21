/*!*******************************************************************
 * Project : ISIS
 * Component : GPCC-timeBar
 * \file TimeBarWidget.h
 * \author ohuyard
 * \date June 18, 2014
 * \brief This widget contains visualization control time bar
 *
 * This widget is composed of buttons for managing the time, a widget for the timelines
 * and buttons for adding session, dataset or recordset.
 ********************************************************************/

/********************************************************************
 * HISTORY
 *
 * END-HISTORY
 ********************************************************************/

#ifndef TIMEBAR_TIMEBARWIDGET_H
#define TIMEBAR_TIMEBARWIDGET_H

#include <QtCore/QCoreApplication>
#include <QtCore/QDateTime>
#include <QtCore/QString>
#include <QtCore/QVariant>

#include <QtWidgets/QMenu>
#include <QtWidgets/QWidget>
#include <QtWidgets/QDialog>
#include <QtWidgets/QDialogButtonBox>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QLabel>
#include <QtWidgets/QDateTimeEdit>
#include <QtWidgets/QTimeEdit>
#include <QtWidgets/QLineEdit>

#include <QtQuick/QQuickView>

#include "timeBar/TimeBarEventListener.h"
#include "timeBar/TimeManager.h"
#include "timeBar/TimeBarTypes.h"

#include "commonMMI/GenericConfigurationUtils.h"
#include "commonMMI/CMLConfigurationManager.h"

#include "timeBarsModel/Timeline.h"
#include "timeBarsModel/Timelines.h"
#include "timeBarsModel/TimeBar.h"

namespace Ui
{
class TimeBarWidget;
}

namespace timeBar
{

class TimeBarWidget : public QWidget
{
    Q_OBJECT
    // Enumeration sharing with QML
    Q_ENUMS(TBElt)
    Q_ENUMS(QmlVisuMode)
    // QML configuration parameters declaration
    Q_PROPERTY(quint32 borderWidth               READ borderWidth               CONSTANT)
    Q_PROPERTY(quint32 timelinesHeight           READ timelinesHeight           CONSTANT)
    Q_PROPERTY(quint32 tlNamesContainerInitWidth READ tlNamesContainerInitWidth CONSTANT)
    Q_PROPERTY(quint32 tlOffsetsContainerWidth   READ tlOffsetsContainerWidth   CONSTANT)
    Q_PROPERTY(quint32 minTimeScaleLabelsWidth   READ minTimeScaleLabelsWidth   CONSTANT)
    Q_PROPERTY(qreal   textSizeRatio             READ textSizeRatio             CONSTANT)
    Q_PROPERTY(qreal   minNbMsInPixel            READ minNbMsInPixel            CONSTANT)
    Q_PROPERTY(qreal   maxNbMsInPixel            READ maxNbMsInPixel            CONSTANT)
    Q_PROPERTY(quint32 tlOfsIndicatorHeight      READ tlOfsIndicatorHeight      CONSTANT)
    Q_PROPERTY(quint32 smallLineWidth            READ smallLineWidth            CONSTANT)
    Q_PROPERTY(bool    timeScaleLoaded           READ timeScaleLoaded           CONSTANT)
    Q_PROPERTY(qreal   zoomStepFactor            READ zoomStepFactor            CONSTANT)
    Q_PROPERTY(qreal   dataContainerWidth        READ dataContainerWidth        CONSTANT)
    Q_PROPERTY(qreal   barsWidth                 READ barsWidth                 CONSTANT)
    Q_PROPERTY(qreal   dataContainerLeftMargin   READ dataContainerLeftMargin   CONSTANT)
    Q_PROPERTY(QString currTimeBarColor          READ currTimeBarColor          CONSTANT)
    Q_PROPERTY(QString visuWndBarsColor          READ visuWndBarsColor          CONSTANT)
    Q_PROPERTY(QString tlShiftBarColor           READ tlShiftBarColor           CONSTANT)
    Q_PROPERTY(QString visuWndColor              READ visuWndColor              CONSTANT)
    // QML communication parameters declaration
    Q_PROPERTY(qint64     mouseCurrentPosition      READ mouseCurrentPosition      WRITE setmouseCurrentPosition      \
                                                    NOTIFY mouseCurrentPositionChanged)
    Q_PROPERTY(qint64     msSinceEpochDataContainer READ msSinceEpochDataContainer WRITE setmsSinceEpochDataContainer \
                                                    NOTIFY msSinceEpochDataContainerChanged)
    Q_PROPERTY(qint32     timeScaleLabelsWidth      READ timeScaleLabelsWidth      WRITE settimeScaleLabelsWidth      \
                                                    NOTIFY timeScaleLabelsWidthChanged)
    Q_PROPERTY(TBElt timeLineIdxMenu                READ timeLineIdxMenu           WRITE settimeLineIdxMenu           \
                                                    NOTIFY timeLineIdxMenuChanged)
    Q_PROPERTY(bool       showVisuWindowMenu        READ showVisuWindowMenu        WRITE setshowVisuWindowMenu        \
                                                    NOTIFY showVisuWindowMenuChanged)
    Q_PROPERTY(TBElt elementToMove                  READ elementToMove             WRITE setelementToMove             \
                                                    NOTIFY elementToMoveChanged)
    Q_PROPERTY(TBElt tlToRename                     READ tlToRename                WRITE settlToRename                \
                                                    NOTIFY tlToRenameChanged)
    Q_PROPERTY(qreal      movedEltXOfs              READ movedEltXOfs              WRITE setmovedEltXOfs              \
                                                    NOTIFY movedEltXOfsChanged)
    Q_PROPERTY(TBElt elementToDrag                  READ elementToDrag             WRITE setelementToDrag             \
                                                    NOTIFY elementToDragChanged)
    Q_PROPERTY(qreal      latchEltXOfs              READ latchEltXOfs              WRITE setlatchEltXOfs              \
                                                    NOTIFY latchEltXOfsChanged)
    Q_PROPERTY(TBElt timelineUnderMouse             READ timelineUnderMouse        WRITE settimelineUnderMouse        \
                                                    NOTIFY timelineUnderMouseChanged)
    Q_PROPERTY(QString    borderColor               READ borderColor               WRITE setborderColor               \
                                                    NOTIFY borderColorChanged)
    Q_PROPERTY(qint32     tlNamesContainerWidth     READ tlNamesContainerWidth     WRITE settlNamesContainerWidth     \
                                                    NOTIFY tlNamesContainerWidthChanged)
public:
    /*!----------------------------------------------------------
     * \brief Identifiers of visualization modes
     *
     * As it is not possible to share with QML an enum which is decalred
     * inside another class (VisuMode), create here an enum to share
     * visualization modes with QML
     *
     * Note from Qt documentation: The names of enum values must
     * begin with a capital letter in order to be accessible from QML.
     *-----------------------------------------------------------!*/
    enum QmlVisuMode
    {
        VISU_QML_MODE_NORMAL,     ///< Value for Normal visualization mode in QML
        VISU_QML_MODE_EXTENDED,   ///< Value for Extended visualization mode in QML
        VISU_QML_MODE_SLIDING     ///< Value for Sliding visualization mode in QML
    };

    /*!------------------------------------------------------------
     * \brief Timeline data container
     *
     * Container to store all the necessary data for a single timeline
     * displayed in the timebar.
     *
     * Note from Qt documentation: The names of enum values must
     * begin with a capital letter in order to be accessible from QML.
     *------------------------------------------------------------!*/
    typedef struct
    {
        timeBarsModel::Timeline* tlPtr; ///< Pointer to the timeline data in the data model

        qint64 startTime; ///< Start time of timeline in milliseconds since Epoch without its offset,
        /// this value is computed from data model

        qint64 endTime; ///< End time of timeline in milliseconds since Epoch without its offset,
        /// this value is computed from data model

        QColor color; ///< Color of the timeline in the timebar, this value is computed from data model timeline name

        TlType type; ///< Type of the timeline, either a session, a dataset or a recordset,
        /// this value is computed from data model

        bool isMaster; ///< Boolean to identify the master session, shall be kept coherent with data model

        core::INT32  uniqueId; ///< Unique timeline Id generated by the TimeManagers, it can't be null, so when it is,
        ///  this means that timeline data are not available in infrastructure so timeline shall not be displayed
    } timelineData;

    /*!----------------------------------------------------------
     * \brief Identifiers of the timebar elements
     *
     * The identification of timebar elements the user
     * can drag with an impact on timebar users.
     *
     * Note from Qt documentation: The names of enum values must
     * begin with a capital letter in order to be accessible from QML.
     *-----------------------------------------------------------!*/
    enum TBElt
    {
        TBElt_LowerSlideLimit=-8,   ///< Visualization window lower sliding mode limit
        TBElt_UpperSlideLimit=-7,   ///< Visualization window upper sliding mode limit
        TBElt_UpperExtendedLimit=-6,///< Visualization window upper extended mode limit
        TBElt_BeforeTime=-5,        ///< Visualization window start border
        TBElt_AfterTime=-4,         ///< Visualization window end border
        TBElt_CurrentTime=-3,       ///< Current time line inside the visualization window
        TBElt_VisuWindow=-2,        ///< Visualization window itself (the entire one, with its two borders and the current time line)
        TBElt_None=-1,              ///< Value to void the element identification
        TBElt_Tl1=0,                ///< Spare symbol for timelines index adressing
        TBElt_Tl2=1,                ///< Spare symbol for timelines index adressing
        TBElt_Tl3=2,                ///< Spare symbol for timelines index adressing
        TBElt_Tl4=3,                ///< Spare symbol for timelines index adressing
        TBElt_Tl5=4,                ///< Spare symbol for timelines index adressing
        TBElt_Tl6=5,                ///< Spare symbol for timelines index adressing
        TBElt_Tl7=6,                ///< Spare symbol for timelines index adressing
        TBElt_Tl8=7,                ///< Spare symbol for timelines index adressing
        TBElt_Tl9=8,                ///< Spare symbol for timelines index adressing
        TBElt_Tl10=9,               ///< Spare symbol for timelines index adressing
        TBElt_Tl11=10,              ///< Spare symbol for timelines index adressing
        TBElt_Tl12=11,              ///< Spare symbol for timelines index adressing
        TBElt_Tl13=12,              ///< Spare symbol for timelines index adressing
        TBElt_Tl14=13,              ///< Spare symbol for timelines index adressing
        TBElt_Tl15=14,              ///< Spare symbol for timelines index adressing
        TBElt_Tl16=15,              ///< Spare symbol for timelines index adressing
        TBElt_TlMax=16              ///< Symbol to define the maximum number of timelines supported by the implementation
    };

    // Public configuration parameters keys
    static const QString SOCKET_ID_KEY;                   ///< Key of socket identifier configuration parameter

private:

    // Displayed messages
    static const QString UNEXPECTED_TIMEBAR_ID_MSG;                 ///< UNEXPECTED_TIMEBAR_ID_MSG
    static const QString POSITION_CAPTION_MSG;                      ///< POSITION_CAPTION_MSG
    static const QString LOWER_LIMIT_BEFORE_START_MSG;              ///< LOWER_LIMIT_BEFORE_START_MSG
    static const QString LOWER_LIMIT_AFTER_CURRENT_MSG;             ///< LOWER_LIMIT_AFTER_CURRENT_MSG
    static const QString UPPER_LIMIT_AFTER_END_MSG;                 ///< UPPER_LIMIT_AFTER_END_MSG
    static const QString UPPER_LIMIT_BEFORE_CURRENT_MSG;            ///< UPPER_LIMIT_BEFORE_CURRENT_MSG
    static const QString EXT_LIMIT_BEFORE_END_MSG;                  ///< EXT_LIMIT_BEFORE_END_MSG
    static const QString WIN_START_AFTER_SLIDE_MSG;                 ///< WIN_START_AFTER_SLIDE_MSG
    static const QString WIN_START_AFTER_CURR_MSG;                  ///< WIN_START_AFTER_CURR_MSG
    static const QString WIN_END_BEFORE_CURR_MSG;                   ///< WIN_END_BEFORE_CURR_MSG
    static const QString WIN_END_BEFORE_SLIDE_MSG;                  ///< WIN_END_BEFORE_SLIDE_MSG
    static const QString WIN_END_OUT_CURR_AND_EXT_MSG;              ///< WIN_END_OUT_CURR_AND_EXT_MSG
    static const QString CURR_OUT_SLIDE_MSG;                        ///< CURR_OUT_SLIDE_MSG
    static const QString CURR_OUT_WIN_MSG;                          ///< CURR_OUT_WIN_MSG
    static const QString ENTERED_POS_NOT_VALID_MSG;                 ///< ENTERED_POS_NOT_VALID_MSG
    static const QString CHANGE_OFFSET_OF_MSG;                      ///< CHANGE_OFFSET_OF_MSG
    static const QString NB_DAYS_AND_SIGN_OF_OFFSET_MSG;            ///< NB_DAYS_AND_SIGN_OF_OFFSET_MSG
    static const QString FRACT_PART_OF_OFFSET_MSG;                  ///< FRACT_PART_OF_OFFSET_MSG
    static const QString ENTERED_OFFSET_NOT_VALID_MSG;              ///< ENTERED_OFFSET_NOT_VALID_MSG
    static const QString RENAME_MSG;                                ///< RENAME_MSG
    static const QString NEW_NAME_MSG;                              ///< NEW_NAME_MSG
    static const QString NAME_ALREADY_USED_MSG;                     ///< NAME_ALREADY_USED_MSG
    static const QString NAME_ALREADY_USED_TIMELINE_MSG;            ///< NAME_ALREADY_USED_TIMELINE_MSG
    static const QString DAYS_UNIT_MSG;                             ///< DAYS_UNIT_MSG
    static const QString ONE_X_SPEED_MSG;                           ///< ONE_X_SPEED_MSG
    static const QString QML_LOAD_ERROR_MSG;                        ///< QML_LOAD_ERROR_MSG
    static const QString INVALID_PAUSE_COLOR_MSG;                   ///< INVALID_PAUSE_COLOR_MSG
    static const QString INVALID_PAST_COLOR_MSG;                    ///< INVALID_PAST_COLOR_MSG
    static const QString INVALID_RT_COLOR_MSG;                      ///< INVALID_RT_COLOR_MSG
    static const QString INVALID_SPEED_UP_COLOR_MSG;                ///< INVALID_SPEED_UP_COLOR_MSG
    static const QString INVALID_SLOWDOWN_COLOR_MSG;                ///< INVALID_SLOWDOWN_COLOR_MSG
    static const QString CLOSE_TIMEBAR_MSG;                         ///< CLOSE_TIMEBAR_MSG
    static const QString CLOSE_TIMEBAR_CONFIRMATION_MSG;            ///< CLOSE_TIMEBAR_CONFIRMATION_MSG
    static const QString DEFAULT_VISU_WIND_WIDTH_MSG;               ///< DEFAULT_VISU_WIND_WIDTH_MSG
    static const QString NB_DAYS_CAPTION_MSG;                       ///< NB_DAYS_CAPTION_MSG
    static const QString FRACT_PART_CAPTION_MSG;                    ///< FRACT_PART_CAPTION_MSG
    static const QString INCORRECT_DEFAULT_VISU_WND_WIDTH_MSG;      ///< INCORRECT_DEFAULT_VISU_WND_WIDTH_MSG
    static const QString NEGATIVE_DEFAULT_VISU_WND_WIDTH_MSG;       ///< NEGATIVE_DEFAULT_VISU_WND_WIDTH_MSG
    static const QString SESSION_TO_OPEN_MSG;                       ///< SESSION_TO_OPEN_MSG
    static const QString OPEN_SESSION_MSG;                          ///< OPEN_SESSION_MSG
    static const QString SESSION_NAME_ALREADY_USED_MSG;             ///< SESSION_NAME_ALREADY_USED_MSG
    static const QString NAME_ALREADY_USED_CAPTION_MSG;             ///< NAME_ALREADY_USED_CAPTION_MSG
    static const QString SELECT_A_FILE_MSG;                         ///< SELECT_A_FILE_MSG
    static const QString XML_EXTENSION_CAPTION_MSG;                 ///< XML_EXTENSION_CAPTION_MSG
    static const QString IS_NOT_A_FILE_ERROR_MSG;                   ///< IS_NOT_A_FILE_ERROR_MSG
    static const QString NB_DAYS_TXT_CONV_MSG;                      ///< NB_DAYS_TXT_CONV_MSG

    // Configuration constants
    static const QString QML_REL_PATH;                  ///< the path to qml files, relatively to resources
    static const core::INT32     NORMAL_BT_GRID;                ///< Normal mode button group ID
    static const core::INT32     EXTENDED_BT_GRID;              ///< Extended mode button group ID
    static const core::INT32     SLIDING_BT_GRID;               ///< Sliding mode button group ID
    static const core::C_FLOAT   SPEED_MAX;                    ///< Upper playing speed limit
    static const core::C_FLOAT   SPEED_MIN;                    ///< Lower playing speed limit
    static const core::C_FLOAT   SPEED_INIT;                   ///< Initial playing speed

    static const qreal   DATA_CONTAINER_WIDTH;          ///< Width in pixels of the dataContainer.
    ///  This width shall be three times the screen width to allow drag on screen, to the right and the left.

    static const qreal   DATA_CONTAINER_LEFT_MARGIN;     ///< Number of pixels of the dataContainer
    /// which are after the mainContainer left border, in the not visible area. This margin is used to allow timescale drag.


    static const qreal   MIN_TIMELINE_WIDTH;            ///< Minimum displayed width of timelines.
    /// This value is useful to prevent the timelines from disapearing when the zoom is too low
    static const core::C_FLOAT   SPEEDS_LIST[];                ///< List of the playing speed used when up and down buttons are clicked
    static const core::INT32     PLAY_ICON_WIDTH;               ///< Width in pixels of the play button icon
    static const core::INT32     PLAY_ICON_HEIGHT;              ///< Height in pixels of the play button icon
    static const core::INT32     HUE_SHIFT_BTW_COLORS;          ///< Applied HUE shift when generating color from string
    static const core::INT32     SATURATION_STR_GEN_COLOR;      ///< Saturation of the color generated from string
    static const core::INT32     LUMINOSITY_STR_GEN_COLOR;      ///< Luminosity of the color generated from string
    static const core::INT32     OPACITY_STR_GEN_COLOR;         ///< Opacity of the color generated from string
    static const core::CHAR    QSTRING_SETNUM_FLOAT_TYPE;     ///< Float type specifier for QString.setNum()
    static const core::INT32     TL_NAMES_CONTAINER_WIDTH_INIT; ///< Width in pixels of the timelines names container

    static const core::C_FLOAT   ROUNDING_FACTOR_PLAYING_SPEED; ///< Factor used to round the playing speed number.
    /// 10 means 1 digit after decimal dot

    // Configuration parameters keys
    static const QString DATE_FORMAT_SHORT_KEY;            ///< Key of dateFormatShort configuration parameter
    static const QString DATE_FORMAT_LONG_KEY;             ///< Key of dateFormatLong configuration parameter
    static const QString ZOOM_STEP_FACTOR_KEY;             ///< Key of zoomStepFactor configuration parameter
    static const QString BORDER_COLOR_PAUSE_KEY;           ///< Key of borderColorPause configuration parameter
    static const QString BORDER_COLOR_PAST_KEY;            ///< Key of borderColorPast configuration parameter
    static const QString BORDER_COLOR_REAL_TIME_KEY;        ///< Key of borderColorRealTime configuration parameter
    static const QString BORDER_COLOR_SPEED_UP_KEY;         ///< Key of borderColorSpeedUp configuration parameter
    static const QString BORDER_COLOR_SLOW_DOWN_KEY;        ///< Key of borderColorSlowDown configuration parameter
    static const QString CURRENT_TIME_PLAY_LEFT_MARGIN_KEY;  ///< Key of currentTimePlayLeftMargin configuration parameter
    static const QString CURRENT_TIME_PLAY_RIGHT_MARGIN_KEY; ///< Key of currentTimePlayRightMargin configuration parameter

    // Configuration parameters initialization values
    static const QString DATE_FORMAT_SHORT_INIT;           ///< Initialization value of dateFormatShort configuration parameter
    static const QString DATE_FORMAT_LONG_INIT;            ///< Initialization value of dateFormatLong configuration parameter
    static const qreal ZOOM_STEP_FACTOR_INIT;              ///< Initialization value of zoomStepFactor configuration parameter
    static const QString BORDER_COLOR_PAUSE_INIT;          ///< Initialization value of borderColorPause configuration parameter
    static const QString BORDER_COLOR_PAST_INIT;           ///< Initialization value of borderColorPast configuration parameter
    static const QString BORDER_COLOR_REAL_TIME_INIT;       ///< Initialization value of borderColorRealTime configuration parameter
    static const QString BORDER_COLOR_SPEED_UP_INIT;        ///< Initialization value of borderColorSpeedUp configuration parameter
    static const QString BORDER_COLOR_SLOW_DOWN_INIT;       ///< Initialization value of borderColorSlowDown configuration parameter
    static const qreal CURRENT_TIME_PLAY_LEFT_MARGIN_INIT;   ///< Initialization value of currentTimePlayLeftMargin configuration parameter
    static const qreal CURRENT_TIME_PLAY_RIGHT_MARGIN_INIT;  ///< Initialization value of currentTimePlayRightMargin configuration parameter

    // Tooltips
    static const QString RESET_TIMELINE_OFS_TOOLTIP;      ///< Tooltip of _resetTimelineOfsAct
    static const QString SET_MASTER_SESS_TOOTIP;          ///< Tooltip of _setMasterSessionAct
    static const QString RESET_VISU_WND_WIDTH_TOOLTIP;    ///< Tooltip of _resetVisuWindowWidthAct
    static const QString SET_VISU_WND_WIDTH_TOOLTIP;      ///< Tooltip of _setVisuWindowWidthAct
    static const QString CLOSE_TIMELINE_TOOLTIP;          ///< Tooltip of _closeTimelineAct
    static const QString CLOSE_TIMEBAR_TOOLTIP;           ///< Tooltip of _closeTimebarAct
    static const QString SEARCH_IN_SESSION_TOOLTIP;       ///< Tooltip of _searchInSessionAct

    // Tooltips references
    static const QString GPCCCM_L_CML_0500_TOOLTIP;       ///< GPCCCM_L_CML_0500_TOOLTIP
    static const QString GPCCCM_L_CML_0501_TOOLTIP;       ///< GPCCCM_L_CML_0501_TOOLTIP
    static const QString GPCCCM_L_CML_0510_TOOLTIP;       ///< GPCCCM_L_CML_0510_TOOLTIP
    static const QString GPCCCM_L_CML_0511_TOOLTIP;       ///< GPCCCM_L_CML_0511_TOOLTIP

    // Actions captions
    static const QString RESET_TIMELINE_OFS_CAPTION;      ///< Captions of _resetTimelineOfsAct
    static const QString SET_MASTER_SESS_CAPTION;         ///< Captions of _setMasterSessionAct
    static const QString RESET_VISU_WND_WIDTH_CAPTION;    ///< Captions of _resetVisuWindowWidthAct
    static const QString SET_VISU_WND_WIDTH_CAPTION;      ///< Captions of _setVisuWindowWidthAct
    static const QString CLOSE_TIMELINE_CAPTION;          ///< Captions of _closeTimelineAct
    static const QString CLOSE_TIMEBAR_CAPTION;           ///< Captions of _closeTimebarAct
    static const QString SEARCH_IN_SESSION_CAPTION;       ///< Captions of _searchInSessionAct

    // Physical constants
    static const qint64 NB_MILLISECONDS_IN_24HRS;                   ///< Number of miliseconds in 24 hours
    static const qint64 NB_MILLISECONDS_IN_10SEC;                   ///< Number of miliseconds in 10 seconds
    static const core::INT32 NB_MONTH_IN_YEAR;                      ///< Number of months in one year
    static const core::INT32 DAYS_BTW_LBL_ROUND_LIMIT;              ///< Rounding limit representing 2 days (below we display 1.x days)
    static const core::INT32 NB_DAYS_HALF_MONTH_ROUND_LIMIT;        ///< Rounding limit reprensenting half a month
    static const core::INT32 DIFF_DAYS_MIN_MAX_MONTH_IN_YEAR;       ///< Number of days between the shortest and the longest month

    static const quint32 NB_BORDER_IN_TBAR;                         ///< Number of borders in the width of height of the timebar
    /// (from left to right or top to bottom)
    static const core::INT32 NB_PERCENT_IN_100_PERCENT;             ///< Number of percents in percents
    static const core::INT32 NB_HUE_VALUES;                         ///< Number of values of the HUE of a color
    static const core::INT32 HSV_VALUES_MAX_VAL;                    ///< Maximum value of HSV members of a color

    // Values of configuration parameters
    static const quint32 BORDER_WIDTH;                              ///< BORDER_WIDTH
    static const quint32 TIMELINES_HEIGHT;                          ///< TIMELINES_HEIGHT
    static const quint32 TL_NAMES_CONTAINER_INIT_WIDTH;             ///< TL_NAMES_CONTAINER_INIT_WIDTH
    static const quint32 TL_OFFSETS_CONTAINER_WIDTH;                ///< TL_OFFSETS_CONTAINER_WIDTH
    static const quint32 MIN_TIME_SCALE_LABELS_WIDTH;               ///< MIN_TIME_SCALE_LABELS_WIDTH
    static const qreal TEXT_SIZE_RATIO;                             ///< TEXT_SIZE_RATIO
    static const qreal MIN_NBMS_IN_PIXEL;                           ///< MIN_NBMS_IN_PIXEL
    static const qreal MAX_NBMS_IN_PIXEL;                           ///< MAX_NBMS_IN_PIXEL
    static const quint32 TL_OFS_INDICATOR_HEIGHT;                   ///< TL_OFS_INDICATOR_HEIGHT
    static const quint32 SMALL_LINE_WIDTH;                          ///< SMALL_LINE_WIDTH
    static const qreal BARS_WIDTH;                                  ///< BARS_WIDTH

    // Configuration variables
    QString _dateFormatShort;                ///< Short version of the format used when converting a QDateTime to string to display it
    QString _dateFormatLong;                 ///< Long version of the format used when converting a QDateTime to string to display it
    qreal   _zoomStepFactor;                 ///< Applied zoom factor on each mouse wheel step
    QString _borderColorPause;               ///< Timebar border color when playing is paused
    QString _borderColorPast;                ///< Timebar border color when playing not in real-time
    QString _borderColorRealTime;            ///< Timebar border color when playing in real-time
    QString _borderColorSpeedUp;             ///< Timebar border color when playing faster than real-time
    QString _borderColorSlowDown;            ///< Timebar border color when playing slower than real-time
    qreal   _currTimePlayLeftMargin;         ///< Left margin in percent of the timebar window which trigger
                                             ///  a dataContainer position jump when the current time enters it when playing
    qreal   _currTimePlayRightMargin;        ///< Right position in percent of the timebar window
                                             /// where the current time go on dataContainer position jump when playing
    bool    _isJavascriptModeActive;         ///< Activation state of the javascript mode, which disable some features

    // TimeManager of this timebar widget
    TimeManager* _timeManager;                      ///< Pointer to the TimeManager related to this timeBar Widget

    // Data model
    timeBarsModel::TimeBar* _timeBarModel;  ///< Pointer to the data model of the timebar
    QList<timelineData>     _timelinesData; ///< List containing the data of all the loaded timelines
    ///< List of timelines added in data model but not in the _timelinesData local one due to failed access to infrastructure data
    QList<timelineData>     _tlToAdd;       ///< used to store time lines to be added

    // Internal timebar graphical objects

    // Main containers
    Ui::TimeBarWidget *_ui;                     ///< The ui
    QQuickView*        _view;                   ///< The QML view
    QMenu*             _dataSetContextMenu;     ///< The context menu of dataset/recordset time lines
    QMenu*             _sessionsContextMenu;    ///< The context menu of session time lines
    QMenu*             _masterSessContextMenu;  ///< The context menu of the master session time line
    QMenu*             _tbContextMenu;          ///< The context menu of the time bar
    QWidget *          _timebarArea;            ///< Pointer to the graphical zone of the timebar
    QObject *          _rootTimeWidgetObj;      ///< Pointer to the root TimeBarWidget object in order to access to qml methods
    // Menus actions
    QAction *          _resetTimelineOfsAct;    ///< Reset to 0 the offset of a timeline
    QAction *          _setMasterSessionAct;    ///< Set the selected timeline as the master session
    QAction *          _resetVisuWindowWidthAct;///< Reset to configuration value the visualization window width
    QAction *          _setVisuWindowWidthAct;  ///< Set the value of the visualization window width in configuration
    QAction *          _closeTimelineAct;       ///< Close the timeline and remove it from the model
    QAction *          _closeTimebarAct;        ///< Close the timebar widget and destroy it and its manager
    QAction *          _searchInSessionAct;     ///< Search in all views of a session, forwarded to subscriber

    // Session list management
    QDialog *          _sessionsDlgBox;         ///< Open session dialog box
    /// which can be updated asynchronously when infrastructure send a new session list
    QList<sessionData> _sessionsList;           ///< List of the of sessions retrieved from TimeManagers
    // QML communication parameters fields
    qint64             _mouseCurrentPos;        ///< Current position of the mouse pointer in timebar in milliseconds since Epoch
    qint64             _dataContainerStartTime; ///< The dataContainer start in milliseconds since Epoch

    quint32            _timeScaleLabelsWidth;   ///< width in pixels of labels in the time scale,
    /// this value is computed again each time the zoom is used
    TBElt              _timeLineIdxMenu;        ///< Index of the timeline for which the context menu shall be displayed

    bool               _showVisuWindowMenu;     ///< Boolean to trigger from QML that the visu window context menu shall be displayed
    TBElt              _elementToMove;          ///< Name of the timebar element the user requested to move with a double click or a drag
    TBElt              _tlToRename;             ///< Name of the timeline the user requested to rename with a double click
    qreal              _movedEltXOfs;           ///< Offset of the dragged timeline in pixel inside dataContainer
    TBElt              _elementToDrag;          ///< Index of the timeline dragged by the mouse in the timebar

    qreal              _latchEltXOfs;           ///< Offset of the dragged timeline in pixels inside dataContainer when dragged ended,
    ///  so this offset shall be added to the one in the model
    TBElt              _timelineUnderMouse;     ///< Index of the timeline in which the mouse cursor it currently present
    QString            _borderColorCurrent;     ///< Current timebar border color

    qint64             _lastLblPos;             ///< Last position in milliseconds since Epoch
    /// of a time scale label for which QML requested a conversion in text format
    qint32             _tlNamesContainerWidth;  ///< Width in pixels of the column with timelines names

    // timeBar status variables
    Qt::TimeSpec       _datesTimeSpec;          ///< Time specification used for QDateTime manipulation
    QString            _currentSpeedTxt;        ///< The currently displaying or edited visualization speed in text format
    QString            _lastValidSpeedTxt;      ///< The last displayed valid visualization speed in text format

    bool               _timeScaleLoaded;        ///< Flag set to true when the scale of the timeline is computed,
    /// so at least one session/dataset/recordset has been loaded
    QQuickView::Status _qmlstatus;              ///< Loading status of the QML object, it can be 0=NoInit, 1=Ready, 2=Loading, 3=Error

    bool               _populateToDo;           ///< Is set to true by the populate function when QML not ready.
    qint64             _lastCurrentTime;        ///< Last known value of the current time used to compute dataContainer move

    static bool        _isFirstInit;            ///< Set to true on first call of constructor,
    /// and false when other timebars objects are constructed

    qint64             _pendingDataContainerOfs;///< Offset in milliseconds to apply to dataContainer
    /// when TimeManager will trigger TimeBarWidget following a change of master session

signals:
    // QML communication parameters NOTIFY services

    /*!*******************************************************************
     * Method : mouseCurrentPositionChanged
     * Emitted when mouseCurrentPositionChanged
     ********************************************************************/
    void mouseCurrentPositionChanged(qint64 n);

    /*!*******************************************************************
     * Method : msSinceEpochDataContainerChanged
     * Emitted when msSinceEpochDataContainerChanged
     ********************************************************************/
    void msSinceEpochDataContainerChanged(qint64 n);

    /*!*******************************************************************
     * Method : timeScaleLabelsWidthChanged
     * Emitted when timeScaleLabelsWidthChanged
     ********************************************************************/
    void timeScaleLabelsWidthChanged(quint32 n);

    /*!*******************************************************************
     * Method : timeLineIdxMenuChanged
     * Emitted when timeLineIdxMenuChanged
     ********************************************************************/
    void timeLineIdxMenuChanged(TBElt n);

    /*!*******************************************************************
     * Method : showVisuWindowMenuChanged
     * Emitted when showVisuWindowMenuChanged
     ********************************************************************/
    void showVisuWindowMenuChanged(bool n);

    /*!*******************************************************************
     * Method : elementToMoveChanged
     * Emitted when elementToMoveChanged
     ********************************************************************/
    void elementToMoveChanged(TBElt n);

    /*!*******************************************************************
     * Method : mouseCurrentPositionChanged
     * Emitted when
     ********************************************************************/
    void tlToRenameChanged(TBElt n);

    /*!*******************************************************************
     * Method : movedEltXOfsChanged
     * Emitted when movedEltXOfsChanged
     ********************************************************************/
    void movedEltXOfsChanged(qreal n);

    /*!*******************************************************************
     * Method : elementToDragChanged
     * Emitted when elementToDragChanged
     ********************************************************************/
    void elementToDragChanged(TBElt n);

    /*!*******************************************************************
     * Method : latchEltXOfsChanged
     * Emitted when latchEltXOfsChanged
     ********************************************************************/
    void latchEltXOfsChanged(qreal n);

    /*!*******************************************************************
     * Method : timelineUnderMouseChanged
     * Emitted when timelineUnderMouseChanged
     ********************************************************************/
    void timelineUnderMouseChanged(TBElt n);

    /*!*******************************************************************
     * Method : borderColorChanged
     * Emitted when borderColorChanged
     ********************************************************************/
    void borderColorChanged(QString n);

    /*!*******************************************************************
     * Method : tlNamesContainerWidthChanged
     * Emitted when tlNamesContainerWidthChanged
     ********************************************************************/
    void tlNamesContainerWidthChanged(qint32 n);

    /*!*******************************************************************
     * Method : timeBarReady
     *
     * Emitted when QML loading and populating are finished
     ********************************************************************/
    void timeBarReady();

    /*!*******************************************************************
     * Method : timeBarToClose
     *
     * \param visuWindow  Model related to the time bar to close
     *
     * Emitted the main application shall close this time bar
     ********************************************************************/
    void timeBarToClose(timeBarsModel::TimeBar * visuWindow);

    /*!*******************************************************************
     * Method : timeBarToClose
     *
     * \param tlId Unique identifier of the timeline of the session
     *
     * Emitted when the menu action asking for searching in all views of a session is triggered
     ********************************************************************/
    void searchInSessionViews(core::INT32 tlId);


public:
    // QML configuration conversion services

    /*!*******************************************************************
     * Method : visuModeName
     * Returns the QML enum from a the name of a visualization mode
     ********************************************************************/
    Q_INVOKABLE QmlVisuMode visuModeFromName(const QString &mode);

    /*!*******************************************************************
     * Method : fromXcoodstoMsSinceEpoch
     * Converts X coordinates to ms since epoch
     ********************************************************************/
    Q_INVOKABLE qint64 fromXcoodstoMsSinceEpoch(const qreal &n);

    /*!*******************************************************************
     * Method : fromMsSinceEpochToXcoordsPx
     * Converts ms since epoch to X coordinates
     ********************************************************************/
    Q_INVOKABLE qreal fromMsSinceEpochToXcoordsPx(const qint64 &n, const qint64 &dataContainerStart) const;

    /*!*******************************************************************
     * Method : fromPxtoMs
     * Converts a duration in millisecond to an X axe distance in pixel in dataContainer
     ********************************************************************/
    Q_INVOKABLE qint64 fromPxtoMs(const qreal &n);

    /*!*******************************************************************
     * Method : fromMsToPxSaturated
     * Converts an X axe distance in pixel in dataContainer to a duration in millisecond with
     * saturation to twice the dataContainer width in case the result if bigger
     * The saturation is necessary to prevent QML from managing too big number, which decrease
     * performance. The drawback is that real width of elements cannot be computed, so start
     * and end coordinates shall be used instead with fromMsSinceEpochToXcoordsPx service
     ********************************************************************/
    Q_INVOKABLE qreal fromMsToPxSaturated(const qint64 &n);

    /*!*******************************************************************
     * Method : txtTimeLabelfromMsSinceEpoch
     * Return a string representing a date in specified format from a time in in milliseconds since Epoch with correction
     * of this position to align it the first day of months
     ********************************************************************/
    Q_INVOKABLE QString txtTimeLabelfromMsSinceEpoch(const qint64 &time, const QString &format, const qint64 &durBtwLbls,
                                                     const bool canBeEarlier);
    /*!***************************************************************************
     * Method : correctedLabelfromMsSinceEpoch
     * Return the corrected value in ms since Epoch of a time label of the timebar time scale, shall always be called after
     *           txtTimeLabelfromMsSinceEpoch()
     ****************************************************************************/
    Q_INVOKABLE qint64 correctedLabelfromMsSinceEpoch();

    // QML configuration parameters READ services
    /*!***************************************************************************
     * Method : borderWidth
     * width in pixels of the colored border of the timeBar
     ****************************************************************************/
    quint32 borderWidth() const;
    /*!***************************************************************************
     * Method : timelinesHeight
     * Height in pixels of each session/dataset/recordset timeline, this height include the spacing between timelines
     ****************************************************************************/
    quint32 timelinesHeight() const;
    /*!***************************************************************************
     * Method : tlNamesContainerInitWidth
     * Initial width in pixel at startup of the timelines names container
     ****************************************************************************/
    quint32 tlNamesContainerInitWidth() const;
    /*!***************************************************************************
     * Method : tlOffsetsContainerWidth
     * Width in pixel of the timelines text offsets container
     ****************************************************************************/
    quint32 tlOffsetsContainerWidth() const;
    /*!***************************************************************************
     * Method : minTimeScaleLabelsWidth
     * Minimum number of pixels between two time labels in the timeline at the bottom of the timeBar
     ****************************************************************************/
    quint32 minTimeScaleLabelsWidth() const;
    /*!***************************************************************************
     * Method : textSizeRatio
     * Ratio between timelines height and font size inside them
     ****************************************************************************/
    qreal textSizeRatio() const;
    /*!***************************************************************************
     * Method : minNbMsInPixel
     * Minimum possible resolution (related to zoom limit)
     ****************************************************************************/
    qreal minNbMsInPixel() const;
    /*!***************************************************************************
     * Method : maxNbMsInPixel
     * Maximum possible resolution (related to zoom limit), correspond to 20 years on a full HD 1920px screen
     ****************************************************************************/
    qreal maxNbMsInPixel() const;
    /*!***************************************************************************
     * Method : tlOfsIndicatorHeight
     * Height in pixel of the bar representing the offset of a dataset/recordset
     ****************************************************************************/
    quint32 tlOfsIndicatorHeight() const;
    /*!***************************************************************************
     * Method : smallLineWidth
     * Width of the small lines in the timebar, like the border of the legendsContainer
     ****************************************************************************/
    quint32 smallLineWidth() const;
    /*!***************************************************************************
     * Method : barsWidth
     * Width in pixel of the vertical time indicator bars, as current time, start and end of visualization window
     ****************************************************************************/
    qreal barsWidth() const;
    /*!***************************************************************************
     * Method : dataContainerLeftMargin
     * Number of pixels of the dataContainer which are after the mainContainer left border, in the not visible area.
     * This margin is used to allow timescale drag.
     ****************************************************************************/
    qreal dataContainerLeftMargin() const;
    /*!***************************************************************************
     * Method : currTimeBarColor
     * Color of the current time bar
     ****************************************************************************/
    QString currTimeBarColor() const;
    /*!***************************************************************************
     * Method : visuWndBarsColor
     * Color of the start, end bars and sliding and extended modes limits of the visualization window
     ****************************************************************************/
    QString visuWndBarsColor() const;
    /*!***************************************************************************
     * Method : tlShiftBarColor
     * Color of the timeline shift indicator, the thin line visible below timelines when they are shifted from
     * their initial time position
     ****************************************************************************/
    QString tlShiftBarColor() const;
    /*!***************************************************************************
     * Method : visuWndColor
     * Color of the visualization window area, shall be partially transparent
     ****************************************************************************/
    QString visuWndColor() const;

    // QML communication parameters READ services
    /*!***************************************************************************
     * Method : timeScaleLoaded
     * Get timeScaleLoaded
     ****************************************************************************/
    bool timeScaleLoaded() const;
    /*!***************************************************************************
     * Method : zoomStepFactor
     * Get zoomStepFactor
     ****************************************************************************/
    qreal zoomStepFactor() const;
    /*!***************************************************************************
     * Method : dataContainerWidth
     * Get dataContainerWidth
     ****************************************************************************/
    qreal dataContainerWidth() const;
    /*!***************************************************************************
     * Method : mouseCurrentPosition
     * Get mouseCurrentPosition
     ****************************************************************************/
    qint64 mouseCurrentPosition() const;
    /*!***************************************************************************
     * Method : msSinceEpochDataContainer
     * Get msSinceEpochDataContainer
     ****************************************************************************/
    qint64 msSinceEpochDataContainer() const;
    /*!***************************************************************************
     * Method : timeScaleLabelsWidth
     * Get timeScaleLabelsWidth
     ****************************************************************************/
    quint32 timeScaleLabelsWidth() const;
    /*!***************************************************************************
     * Method : timeLineIdxMenu
     * Get timeLineIdxMenu
     ****************************************************************************/
    TBElt timeLineIdxMenu() const;
    /*!***************************************************************************
     * Method : showVisuWindowMenu
     * Get showVisuWindowMenu
     ****************************************************************************/
    bool showVisuWindowMenu() const;
    /*!***************************************************************************
     * Method : elementToMove
     * Get
     ****************************************************************************/
    TBElt elementToMove() const;
    /*!***************************************************************************
     * Method : tlToRename
     * Get tlToRename
     ****************************************************************************/
    TBElt tlToRename() const;
    /*!***************************************************************************
     * Method : movedEltXOfs
     * Get movedEltXOfs
     ****************************************************************************/
    qreal movedEltXOfs() const;
    /*!***************************************************************************
     * Method : elementToDrag
     * Get elementToDrag
     ****************************************************************************/
    TBElt elementToDrag() const;
    /*!***************************************************************************
     * Method : latchEltXOfs
     * Get latchEltXOfs
     ****************************************************************************/
    qreal latchEltXOfs() const;
    /*!***************************************************************************
     * Method : timelineUnderMouse
     * Get timelineUnderMouse
     ****************************************************************************/
    TBElt timelineUnderMouse() const;
    /*!***************************************************************************
     * Method : borderColor
     * Get borderColor
     ****************************************************************************/
    QString borderColor() const;
    /*!***************************************************************************
     * Method : tlNamesContainerWidth
     * Get tlNamesContainerWidth
     ****************************************************************************/
    qint32 tlNamesContainerWidth() const;

    // QML communication parameters WRITE services
    /*!***************************************************************************
     * Method : setmouseCurrentPosition
     * Set mouseCurrentPosition
     ****************************************************************************/
    void setmouseCurrentPosition(const qint64 &n);
    /*!***************************************************************************
     * Method : setmsSinceEpochDataContainer
     * Set msSinceEpochDataContainer
     ****************************************************************************/
    void setmsSinceEpochDataContainer(const qint64 &n);
    /*!***************************************************************************
     * Method : settimeScaleLabelsWidth
     * Set timeScaleLabelsWidth
     ****************************************************************************/
    void settimeScaleLabelsWidth(const quint32 &n);
    /*!***************************************************************************
     * Method : settimeLineIdxMenu
     * Set timeLineIdxMenu
     ****************************************************************************/
    void settimeLineIdxMenu(const TBElt &n);
    /*!***************************************************************************
     * Method : setshowVisuWindowMenu
     * Set showVisuWindowMenu
     ****************************************************************************/
    void setshowVisuWindowMenu(const bool &n);
    /*!***************************************************************************
     * Method : setelementToMove
     * Set elementToMove
     ****************************************************************************/
    void setelementToMove(const TBElt &n);
    /*!***************************************************************************
     * Method : settlToRename
     * Set tlToRename
     ****************************************************************************/
    void settlToRename(const TBElt &n);
    /*!***************************************************************************
     * Method : setmovedEltXOfs
     * Set movedEltXOfs
     ****************************************************************************/
    void setmovedEltXOfs(const qreal &n);
    /*!***************************************************************************
     * Method : setelementToDrag
     * Set elementToDrag
     ****************************************************************************/
    void setelementToDrag(const TBElt &n);
    /*!***************************************************************************
     * Method : setlatchEltXOfs
     * Set latchEltXOfs
     ****************************************************************************/
    void setlatchEltXOfs(const qreal &n);
    /*!***************************************************************************
     * Method : settimelineUnderMouse
     * Set timelineUnderMouse
     ****************************************************************************/
    void settimelineUnderMouse(const TBElt &n);
    /*!***************************************************************************
     * Method : setborderColor
     * Set borderColor
     ****************************************************************************/
    void setborderColor(const QString &n);
    /*!***************************************************************************
     * Method : settlNamesContainerWidth
     * Set tlNamesContainerWidth
     ****************************************************************************/
    void settlNamesContainerWidth(const qint32 &n);

    /*!***************************************************************************
     * Method : TimeBarWidget::setvisuWindowPos
     *
     * Update the visualization window start and end boundaries coherently, called on release event of mouse drag in TimeBarWidget
     ****************************************************************************/
    Q_INVOKABLE void setvisuWindowPos(const qint64 &start, const qint64 &end,const qint64 &curr,const qint64 &lowSlideLim,
                                      const qint64 &upSlideLim,const qint64 &upExtLim);

    /*!***************************************************************************
     * Method : TimeBarWidget::moveTimeline
     *
     * QML communication service, called from QML when user release mouse at the end of visu window drag
     ****************************************************************************/
    // {{RELAX<Qa.PortType> OHD DV14 TBC_CNES QML requires the use of Qt type, and int type doesn't have a redefinition in Qt
    Q_INVOKABLE void moveTimeline(const int src_idx, const int dest_idx);
    // }}RELAX<Qa.PortType>

public:
    /*!***************************************************************
     * Method : TimeBarWidget
     *
     * \param parent The parent widget
     *
     * Constructor
     *****************************************************************/
    explicit TimeBarWidget(QWidget *parent = 0);

    /*!***************************************************************
     * Method : ~TimeBarWidget
     * Destructor
     *****************************************************************/
    virtual ~TimeBarWidget();

    /*!***************************************************************
     * Method : populate
     *
     * \param tb  Model use to populate the time bar
     * \param config      Configuration of the widget (taken into account when given)
     *
     * Populate the time bar from its data model
     *****************************************************************/
    void populate(timeBarsModel::TimeBar *tb, commonMMI::keyValConfHash * config = 0);

    /*!***************************************************************
     * Method : closeTimebar
     *
     * Manage the closing request of this timebar from another software component
     *****************************************************************/
    void closeTimebar();

protected:
    /*!***************************************************************
     * Method : hideEvent
     *
     * The handler of the widget hide action by the user
     *****************************************************************/
    virtual void hideEvent(QHideEvent * event);

    /*!***************************************************************
     * Method : closeEvent
     *
     * The handler of the widget closing action by the user
     *****************************************************************/
    virtual void closeEvent(QCloseEvent * event);

    /*!***************************************************************
     * Method : userCloseTimebar
     *
     * Manage the closing of the timebar action in context menu
     *****************************************************************/
    void userCloseTimebar();

    /*!***************************************************************
     * Method : wheelEvent
     *
     * The handler of the mouse wheel action by the user
     *****************************************************************/
    virtual void wheelEvent(QWheelEvent * event);

    /*!***************************************************************
     * Method : contextMenuEvent
     *
     * The requester to show the context menu at right click in timeBar
     *****************************************************************/
    virtual void contextMenuEvent(QContextMenuEvent * event);

    /*!***************************************************************
     * Method : dragEnterEvent
     *
     * \param event The caught event
     *
     * Action triggered when entering the event in the view
     *****************************************************************/
    virtual void dragEnterEvent(QDragEnterEvent * event);

    /*!***************************************************************
     * Method : dragMoveEvent
     *
     * \param event The caught event
     *
     * Action triggered when moving the item in the view
     *****************************************************************/
    virtual void dragMoveEvent(QDragMoveEvent * event);

    /*!***************************************************************
     * Method : dropEvent
     *
     * \param event The caught event
     *
     * Action triggered when dropping an item in the view
     *****************************************************************/
    virtual void dropEvent(QDropEvent *event);

    /*!***************************************************************
     * Method : loadTimeScale
     *
     * Compute and display the timeline with all the dates labels
     *****************************************************************/
    void loadTimeScale();

    /*!***************************************************************
     * Method : openSet
     *
     * \param filename The name of the file to open
     *
     * Open a recordset or a dataset
     *****************************************************************/
    void openSet(const QString & filename);

    /*!***************************************************************
     * Method : insertTimeLine
     *
     * \param timelinedata The data of the timeline to add, the index inside will be updated
     * \param name         Name of the timeline to put in the data model (if data model entry not already existing)
     * \param ref          Ref to put in the data model for this timeline (if data model entry not already existing)
     * \param pos          Position of insertion of the timeline in _timelinesData and QML model
     * \return             Returns the index of the added timeline in the list model, -1 if the insertion hasn't been performed
     *
     * Insert a timeline in the QML and local data model
     *****************************************************************/
    core::INT32 insertTimeLine(timelineData * timelinedata, const QString & name, const QString & ref, core::INT32 pos = -1);

    /*!***************************************************************
     * Method : removeTimeline
     *
     * \param pos Index in the local timelinesData model of the timeline to remove
     *
     * Remove a timeline from both local and shared data model to let the models users be triggered
     *****************************************************************/
    void removeTimeline(core::INT32 pos);

    /*!***************************************************************
     * Method : updateTimelineOfs
     *
     * \param tlId   Identifier of the dataset/recordset to update the offset
     * \param ofs    Offset of the dataset/recordset in milliseconds
     * \param redraw Is set to true when QML shall be triggered to redraw the timeline
     * \param latch  Is set to true when the ofs value shall be added permanently to the Offset field of the model
     *               It is usefull to not add it permanently during mouse drag operation
     *
     * Update the offset of a dataset/recordset in milliseconds
     *****************************************************************/
    void updateTimelineOfs(TBElt tlId, qint64 ofs, bool redraw, bool latch);

    /*!***************************************************************
     * Method : getDateWithDialogBox
     *
     * \param  title Title of the dialog box
     * \param  desc  Description of the date to enter
     * \param  date  Current displayed date when dialog box is shown
     * \return       Return value set to true if the user clicked on OK button to close the box
     *
     * Open a dialog box for the user to request a time and a date and return it
     *****************************************************************/
    bool getDateWithDialogBox(const QString & title, const QString & desc, QDateTime * date);

    /*!***************************************************************
     * Method : getDurationWithDialogBox
     *
     * \param  title        Title of the dialog box
     * \param  daydesc      Description of the number of days to enter
     * \param  timedesc     Descrition of the time to enter (fractional part of the duration)
     * \param  days         Current displayed number of days of the duration
     * \param  time_in_day  Current displayed fractional part of the duration
     * \param  isNegative   Set to true when the returned duration is negative
     * \return              Return value set to true if the user clicked on OK button to close the box
     *
     * Open a dialog box for the user to request a time duration and return it
     *****************************************************************/
    bool getDurationWithDialogBox(const QString & title, const QString & daydesc, const QString & timedesc,
                                  qint64 * days, QDateTime * time_in_day, bool * isNegative);

    /*!***************************************************************
     * Method : setBorderColor
     *
     * Update the color of the timebar in QML
     *****************************************************************/
    void setBorderColor();

    /*!***************************************************************
     * Method : generateColorFromName
     *
     * \param  name   The name of the timeline
     * \return        The color computed from the timeline name
     *
     * Compute a color from a timeline name
     *****************************************************************/
    QColor generateColorFromName(QString name);

protected slots:

    /*!**************************************************************
     * Method : widgetUpdate
     *
     * \param width New width of the QML widget
     *
     * Trigger the timebar that the widget width is updated
     *****************************************************************/
    void widthChanged(core::INT32 width);

    /*!***************************************************************
     * Method : qmlStatusChanged
     *
     * Trigger the timebar that the QML loading status has changed
     *****************************************************************/
    void qmlStatusChanged(QQuickView::Status status);

    /*!***************************************************************
     * Method : setVisuWindowWidth
     *
     * Manage the selection of the set visualization window width action in context menu
     *****************************************************************/
    void setVisuWindowWidth();

    /*!***************************************************************
     * Method : resetVisuWindowWidth
     *
     * Manage the selection of the reset visualization window width action in context menu
     *****************************************************************/
    void resetVisuWindowWidth();

    /*!***************************************************************
     * Method : resetTimelineOffset
     *
     * Manage the selection of the reset timeline offset action in context menu
     *****************************************************************/
    void resetTimelineOffset();

    /*!***************************************************************
     * Method : searchInSession
     *
     * Manage the forward with timeline id of the request to search in all views of a session
     *****************************************************************/
    void searchInSession();

    /*!***************************************************************
     * Method : setMasterSession
     *
     * Manage the selection of the set master session action in context menu
     *****************************************************************/
    void setMasterSession();

    /*!***************************************************************
     * Method : closeTimeline
     *
     * Manage the closing of a timeline action in context menu
     *****************************************************************/
    void closeTimeline();

    /*!***************************************************************
     * Method : speedTxtEntered
     *
     * Take into account the new displaying speed entered by the user
     *****************************************************************/
    void speedTxtEntered();

    /*!***************************************************************
     * Method : speedTxtChanged
     *
     * \param text New text entered in the speed text edit area
     *
     * Store the new displaying speed entered by the user
     *****************************************************************/
    void speedTxtChanged(const QString & text);

    /*!***************************************************************
     * Method : openSession
     *
     * Open a dialog box to get the list of session to open
     *****************************************************************/
    void openSession();

    /*!***************************************************************
     * Method : fileChooser
     *
     * Open a file chooser to select a dataset/recordset file
     *****************************************************************/
    void fileChooser();

    /*!***************************************************************************
     * Method : switchToNormalMode
     *
     * Set the time display in normal mode
     ****************************************************************************/
    void switchToNormalMode();

    /*!***************************************************************************
     * Method : switchToExtendedMode
     *
     * Set the time display in extended mode
     ****************************************************************************/
    void switchToExtendedMode();

    /*!***************************************************************************
     * Method : switchToSlidingMode
     *
     * Set the time display in sliding mode
     ****************************************************************************/
    void switchToSlidingMode();

    /*!***************************************************************
     * Method : speedUp
     *
     * Increase the speed
     *****************************************************************/
    void speedUp();

    /*!***************************************************************
     * Method : speedDown
     *
     * Decrease the speed
     *****************************************************************/
    void speedDown();

    /*!***************************************************************
     * Method : pauseOrPlay
     *
     * \param checked True for play and false for pause
     *
     * Start or stop time going bys
     *****************************************************************/
    void pauseOrPlay(bool checked);

    /*!***************************************************************
     * Method : catchUpRealTime
     *
     * Catch-up real-time by setting speed to 1 and going to current real time
     *****************************************************************/
    void catchUpRealTime();

    /*!***************************************************************
     * Method : isRealTimeModified
     *
     * Perform the necessary actions on real-time state enter and exit
     *****************************************************************/
    void isRealTimeModified();

    /*!***************************************************************
     * Method : visualizationModeModified
     *
     * Perform the necessary actions on visualization mode change
     *****************************************************************/
    void visualizationModeModified();

    /*!***************************************************************
     * Method : visualizationSpeedModified
     *
     * Perform the necessary actions on visualization speed change
     *****************************************************************/
    void visualizationSpeedModified();

    /*!***************************************************************
     * Method : isPlayingModified
     *
     * Perform the necessary actions on playing state change
     *****************************************************************/
    void isPlayingModified();

    /*!*******************************************************************
     * Method : currentTimeModified
     *
     * Called on current time update performed in the timebar by the user
     ********************************************************************/
    void currentTimeModified();

    /*!*******************************************************************
     * Method : updateTimelinesIds
     *
     * Called when timelines identifiers have been updated due to granted access to infrastrcture
     ********************************************************************/
    void updateTimelinesIds();

    /*!*******************************************************************
     * Method : updateTimelinesOffsets
     *
     * Called when timelines offsets have been updated by TimeManager
     ********************************************************************/
    void updateTimelinesOffsets();
};

}
// end namespace timeBar

// Add the visualization mode QML enum in QVariant manage type, to allow it use in QML
Q_DECLARE_METATYPE(timeBar::TimeBarWidget::QmlVisuMode);

#endif
// TIMEBAR_TIMEBARWIDGET_H
