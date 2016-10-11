/*!*******************************************************************
 * Project : ISIS
 * Component : GPCC-timeBar
 * \file TimeBarWidget.cpp
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

#include <QtCore/QFileInfo>
#include <QtCore/QDateTime>
#include <QtCore/QDebug>
#include <QtQuick/QQuickItem>
#include <QtQuick/QQuickView>
#include <QtWidgets/QFileDialog>
#include <QtWidgets/QInputDialog>
#include <QtWidgets/QMessageBox>
#include <QtWidgets/QListWidget>
#include <QtWidgets/QListWidgetItem>
#include <QtQml>
#include <algorithm>

#include "commonMMI/CommonMMI_global.h"
#include "commonMMIUtils/LogWrapper.h"
#include "commonMMI/GUIApplication.h"
#include "commonMMI/Assistant.h"
#include "ui_TimeBarWidget.h"
#include "timeBar/TimeBarWidget.h"
#include "timeBar/TimeManager.h"
#include "timeBar/TimeManagers.h"

namespace timeBar
{

// Displayed messages
const QString TimeBarWidget::UNEXPECTED_TIMEBAR_ID_MSG(tr("Unexpected ID for timebar element to move: %1"));
const QString TimeBarWidget::POSITION_CAPTION_MSG(tr("Position:"));
const QString TimeBarWidget::LOWER_LIMIT_BEFORE_START_MSG(tr("The entered position for lower limit (%1) is before the visualization window\
start position (%2).\n\nPlease enter a date of lower limit newer than visualization window start (%2)."));
const QString TimeBarWidget::LOWER_LIMIT_AFTER_CURRENT_MSG(tr("The entered position for lower limit (%1) is after the current time positio\
n (%2).\n\nPlease enter a date of lower limit older than current time position (%2)."));
const QString TimeBarWidget::UPPER_LIMIT_AFTER_END_MSG(tr("The entered position for upper limit (%1) is after the visualization window end\
position (%2).\n\nPlease enter a date of upper limit older than visualization window end (%2)."));
const QString TimeBarWidget::UPPER_LIMIT_BEFORE_CURRENT_MSG(tr("The entered position for upper limit (%1) is before the current time posit\
ion (%2).\n\nPlease enter a date of upper limit newer than current time position (%2)."));
const QString TimeBarWidget::EXT_LIMIT_BEFORE_END_MSG(tr("The entered position for upper extended (%1) is before the visualization window \
end position (%2).\n\nPlease enter a date of upper extended limit newer than visualization window end (%2)."));
const QString TimeBarWidget::WIN_START_AFTER_SLIDE_MSG(tr("The entered position for visualization window (%1) is after the lower slide lim\
it position (%2).\n\nPlease enter a date of visualization window start older than current time position (%2)."));
const QString TimeBarWidget::WIN_START_AFTER_CURR_MSG(tr("The entered position for visualization window (%1) is after the current time pos\
ition (%2).\n\nPlease enter a date of visualization window start older than current time position (%2)."));
const QString TimeBarWidget::WIN_END_BEFORE_CURR_MSG(tr("The entered position for visualization window end (%1) is before the current time\
position (%2).\n\nPlease enter a date of visualization window end newer than current time position (%2)."));
const QString TimeBarWidget::WIN_END_BEFORE_SLIDE_MSG(tr("The entered position for visualization window end (%1) is before the upper slide\
limit position (%2).\n\nPlease enter a date of visualization window end newer than upper slide limit position (%2)."));
const QString TimeBarWidget::WIN_END_OUT_CURR_AND_EXT_MSG(tr("The entered position for visualization window end  (%1) is not between curre\
nt time and upper extended limit positions.\n\nPlease enter a date of visualization window end newer than current time (%2) and older than\
 extended limit position (%3)."));
const QString TimeBarWidget::CURR_OUT_SLIDE_MSG(tr("The entered position for current time (%1) is not between lower and upper slide limits\
 positions.\n\nPlease enter a current time date newer than lower slide limit (%2) and older than upper slide limit (%3)."));
const QString TimeBarWidget::CURR_OUT_WIN_MSG(tr("The entered position for current time (%1) is not within visualization window start and \
end positions.\n\nPlease enter a current time date newer than visualization window start (%2) and older than visualization window end (%3)\
."));
const QString TimeBarWidget::ENTERED_POS_NOT_VALID_MSG(tr("The entered position is not valid"));
const QString TimeBarWidget::CHANGE_OFFSET_OF_MSG(tr("Change offset of "));
const QString TimeBarWidget::NB_DAYS_AND_SIGN_OF_OFFSET_MSG(tr("Number of days and sign of the offset:"));
const QString TimeBarWidget::FRACT_PART_OF_OFFSET_MSG(tr("Fractional part of the offset:"));
const QString TimeBarWidget::ENTERED_OFFSET_NOT_VALID_MSG(tr("The entered offset is not valid"));
const QString TimeBarWidget::RENAME_MSG(tr("Rename"));
const QString TimeBarWidget::NEW_NAME_MSG(tr("New name:"));
const QString TimeBarWidget::NAME_ALREADY_USED_MSG(tr("Name already used"));
const QString TimeBarWidget::NAME_ALREADY_USED_TIMELINE_MSG(tr("This name is already used for another session/dataset/recordset, please en\
ter an available name."));
const QString TimeBarWidget::DAYS_UNIT_MSG(tr("%1 days"));
const QString TimeBarWidget::ONE_X_SPEED_MSG(tr("x1.0"));
const QString TimeBarWidget::QML_LOAD_ERROR_MSG(tr("QML loading errors: %1 on timebar %2"));
const QString TimeBarWidget::INVALID_PAUSE_COLOR_MSG(tr("Invalid timeBar borderColorPause \"%1\" in configuration, see SVG color keywords \
names"));
const QString TimeBarWidget::INVALID_PAST_COLOR_MSG(tr("Invalid timeBar borderColorPast \"%1\" in configuration, see SVG color keywords na\
mes"));
const QString TimeBarWidget::INVALID_RT_COLOR_MSG(tr("Invalid timeBar borderColorRealTime \"%1\" in configuration, see SVG color keywords \
names"));
const QString TimeBarWidget::INVALID_SPEED_UP_COLOR_MSG(tr("Invalid timeBar borderColorSpeedUp \"%1\" in configuration, see SVG color keyw\
ords names"));
const QString TimeBarWidget::INVALID_SLOWDOWN_COLOR_MSG(tr("Invalid timeBar borderColorSlowDown \"%1\" in configuration, see SVG color key\
words names"));
const QString TimeBarWidget::CLOSE_TIMEBAR_MSG(tr("Close %1"));
const QString TimeBarWidget::CLOSE_TIMEBAR_CONFIRMATION_MSG(tr("Are you sure to close this time bar and disconnect it from all the views a\
nd pages using it?"));
const QString TimeBarWidget::DEFAULT_VISU_WIND_WIDTH_MSG(tr("Default visualization window width"));
const QString TimeBarWidget::NB_DAYS_CAPTION_MSG(tr("Number of days:"));
const QString TimeBarWidget::FRACT_PART_CAPTION_MSG(tr("Fractional part:"));
const QString TimeBarWidget::INCORRECT_DEFAULT_VISU_WND_WIDTH_MSG(tr("Incorrect default visualization window width"));
const QString TimeBarWidget::NEGATIVE_DEFAULT_VISU_WND_WIDTH_MSG(tr("The defaut width of the visualization window cannot be negative"));
const QString TimeBarWidget::SESSION_TO_OPEN_MSG(tr("Sessions to open"));
const QString TimeBarWidget::OPEN_SESSION_MSG(tr("Open session"));
const QString TimeBarWidget::SESSION_NAME_ALREADY_USED_MSG(tr("Session name already used"));
const QString TimeBarWidget::NAME_ALREADY_USED_CAPTION_MSG(tr("This name is already used for another session, enter a new one:"));
const QString TimeBarWidget::SELECT_A_FILE_MSG(tr("Select a file"));
const QString TimeBarWidget::XML_EXTENSION_CAPTION_MSG(tr("XML files (*.xml)"));
const QString TimeBarWidget::IS_NOT_A_FILE_ERROR_MSG(tr("%1 is not a file"));
const QString TimeBarWidget::NB_DAYS_TXT_CONV_MSG("%1%2");

// Configuration constants
const QString TimeBarWidget::QML_REL_PATH("other/qml/TimeBarWidget.qml");
const core::INT32 TimeBarWidget::NORMAL_BT_GRID = 0;
const core::INT32 TimeBarWidget::EXTENDED_BT_GRID = 1;
const core::INT32 TimeBarWidget::SLIDING_BT_GRID = 2;
const core::C_FLOAT TimeBarWidget::SPEED_MAX = 10.0;
const core::C_FLOAT TimeBarWidget::SPEED_MIN = 0.1;
const core::C_FLOAT TimeBarWidget::SPEED_INIT = 1.0;
const qreal TimeBarWidget::DATA_CONTAINER_WIDTH = 1920*3;
const qreal TimeBarWidget::DATA_CONTAINER_LEFT_MARGIN = 1920;
const qreal TimeBarWidget::MIN_TIMELINE_WIDTH = 3;
const core::C_FLOAT TimeBarWidget::SPEEDS_LIST[] = {0.1,0.2,0.5,1,2,5,10};
bool TimeBarWidget::_isFirstInit = true;
const core::INT32 TimeBarWidget::PLAY_ICON_WIDTH = 40;
const core::INT32 TimeBarWidget::PLAY_ICON_HEIGHT = 40;
const core::INT32 TimeBarWidget::HUE_SHIFT_BTW_COLORS = 59;
const core::INT32 TimeBarWidget::SATURATION_STR_GEN_COLOR = 100;
const core::INT32 TimeBarWidget::LUMINOSITY_STR_GEN_COLOR = 70;
const core::INT32 TimeBarWidget::OPACITY_STR_GEN_COLOR = 100;
const core::CHAR TimeBarWidget::QSTRING_SETNUM_FLOAT_TYPE = 'f';
const core::INT32 TimeBarWidget::TL_NAMES_CONTAINER_WIDTH_INIT = 100;
const core::C_FLOAT TimeBarWidget::ROUNDING_FACTOR_PLAYING_SPEED = 10;

// Static variables for configuration parameters keys
const QString TimeBarWidget::SOCKET_ID_KEY("socketId");
const QString TimeBarWidget::DATE_FORMAT_SHORT_KEY("dateFormatShort");
const QString TimeBarWidget::DATE_FORMAT_LONG_KEY("dateFormatLong");
const QString TimeBarWidget::ZOOM_STEP_FACTOR_KEY("zoomStepFactor");
const QString TimeBarWidget::BORDER_COLOR_PAUSE_KEY("borderColorPause");
const QString TimeBarWidget::BORDER_COLOR_PAST_KEY("borderColorPast");
const QString TimeBarWidget::BORDER_COLOR_REAL_TIME_KEY("borderColorRealTime");
const QString TimeBarWidget::BORDER_COLOR_SPEED_UP_KEY("borderColorSpeedUp");
const QString TimeBarWidget::BORDER_COLOR_SLOW_DOWN_KEY("borderColorSlowDown");
const QString TimeBarWidget::CURRENT_TIME_PLAY_LEFT_MARGIN_KEY("currentTimePlayLeftMargin");
const QString TimeBarWidget::CURRENT_TIME_PLAY_RIGHT_MARGIN_KEY("currentTimePlayRightMargin");

// Static variables for configuration parameters initialization values
const QString TimeBarWidget::DATE_FORMAT_SHORT_INIT;
const QString TimeBarWidget::DATE_FORMAT_LONG_INIT;
const qreal TimeBarWidget::ZOOM_STEP_FACTOR_INIT=2;
const QString TimeBarWidget::BORDER_COLOR_PAUSE_INIT("black");
const QString TimeBarWidget::BORDER_COLOR_PAST_INIT("darkblue");
const QString TimeBarWidget::BORDER_COLOR_REAL_TIME_INIT("lightgreen");
const QString TimeBarWidget::BORDER_COLOR_SPEED_UP_INIT("yellow");
const QString TimeBarWidget::BORDER_COLOR_SLOW_DOWN_INIT("lightblue");
const qreal TimeBarWidget::CURRENT_TIME_PLAY_LEFT_MARGIN_INIT=0.1;
const qreal TimeBarWidget::CURRENT_TIME_PLAY_RIGHT_MARGIN_INIT=0.1;

// Tooltips
const QString TimeBarWidget::RESET_TIMELINE_OFS_TOOLTIP(tr("Reset to 0 the time offset of a time line"));
const QString TimeBarWidget::SET_MASTER_SESS_TOOTIP(tr("Define this session as the master one"));
const QString TimeBarWidget::RESET_VISU_WND_WIDTH_TOOLTIP(tr("Reset the width of the visualization window to its default value"));
const QString TimeBarWidget::SET_VISU_WND_WIDTH_TOOLTIP(tr("Set the default width of the visualization window"));
const QString TimeBarWidget::CLOSE_TIMELINE_TOOLTIP(tr("Disconnect the timebar from this timeline and remove it"));
const QString TimeBarWidget::CLOSE_TIMEBAR_TOOLTIP(tr("Disconnect from all the time lines of this time bar and close this time bar"));
const QString TimeBarWidget::SEARCH_IN_SESSION_TOOLTIP(tr("Search in all the views related to this session"));

// Tooltips references
const QString TimeBarWidget::GPCCCM_L_CML_0500_TOOLTIP("GPCCCM_L_CML_0500");
const QString TimeBarWidget::GPCCCM_L_CML_0501_TOOLTIP("GPCCCM_L_CML_0501");
const QString TimeBarWidget::GPCCCM_L_CML_0510_TOOLTIP("GPCCCM_L_CML_0510");
const QString TimeBarWidget::GPCCCM_L_CML_0511_TOOLTIP("GPCCCM_L_CML_0511");

// Actions captions
const QString TimeBarWidget::RESET_TIMELINE_OFS_CAPTION(tr("Reset time &offset"));
const QString TimeBarWidget::SET_MASTER_SESS_CAPTION(tr("Define as &master"));
const QString TimeBarWidget::RESET_VISU_WND_WIDTH_CAPTION(tr("&Reset window width to default"));
const QString TimeBarWidget::SET_VISU_WND_WIDTH_CAPTION(tr("&Set default window width"));
const QString TimeBarWidget::CLOSE_TIMELINE_CAPTION(tr("&Close time line"));
const QString TimeBarWidget::CLOSE_TIMEBAR_CAPTION(tr("Close &time bar"));
const QString TimeBarWidget::SEARCH_IN_SESSION_CAPTION(tr("Search in &views"));

// Physical constants
const qint64 TimeBarWidget::NB_MILLISECONDS_IN_24HRS=1000*60*60*24;
const core::INT32 TimeBarWidget::NB_MONTH_IN_YEAR=12;
const core::INT32 TimeBarWidget::DAYS_BTW_LBL_ROUND_LIMIT=2;
const core::INT32 TimeBarWidget::NB_DAYS_HALF_MONTH_ROUND_LIMIT=16;
const core::INT32 TimeBarWidget::DIFF_DAYS_MIN_MAX_MONTH_IN_YEAR=3;
const quint32 TimeBarWidget::NB_BORDER_IN_TBAR=2;
const core::INT32 TimeBarWidget::NB_PERCENT_IN_100_PERCENT = 100;
const core::INT32 TimeBarWidget::NB_HUE_VALUES = 360;
const core::INT32 TimeBarWidget::HSV_VALUES_MAX_VAL = 255;
const qint64 TimeBarWidget::NB_MILLISECONDS_IN_10SEC = 10000;

// Values of configuration parameters
const quint32 TimeBarWidget::BORDER_WIDTH(6);
const quint32 TimeBarWidget::TIMELINES_HEIGHT(20);
const quint32 TimeBarWidget::TL_NAMES_CONTAINER_INIT_WIDTH(100);
const quint32 TimeBarWidget::TL_OFFSETS_CONTAINER_WIDTH(100);
const quint32 TimeBarWidget::MIN_TIME_SCALE_LABELS_WIDTH(100);
const qreal TimeBarWidget::TEXT_SIZE_RATIO(0.65);
const qreal TimeBarWidget::MIN_NBMS_IN_PIXEL(1);
const qreal TimeBarWidget::MAX_NBMS_IN_PIXEL((1000.0*3600.0*24.0*365.0*20.0)/1920.0);
const quint32 TimeBarWidget::TL_OFS_INDICATOR_HEIGHT(2);
const quint32 TimeBarWidget::SMALL_LINE_WIDTH(2);
const qreal TimeBarWidget::BARS_WIDTH(3);

/*!***************************************************************************
 * Method : TimeBarWidget::getDateWithDialogBox
 * Purpose : Open a dialog box for the user to request a time and a date and return it
 ****************************************************************************/

bool TimeBarWidget::getDateWithDialogBox(const QString & title, const QString & desc, QDateTime * date)
{
    QDialog dateInputDialog(this);
    QVBoxLayout mainLayout;
    // Creation of new QDialogButtonBox
    QDialogButtonBox * buttonsBox = new QDialogButtonBox((QDialogButtonBox::Ok | QDialogButtonBox::Cancel) ,Qt::Horizontal);
    QLabel description;
    // Will store a new QDateTimeEdit created from date
    QDateTimeEdit * dateTimeInput = 0;
    bool status;
    
    // Build dialog box
    connect(buttonsBox,&QDialogButtonBox::accepted, &dateInputDialog, &QDialog::accept);
    connect(buttonsBox,&QDialogButtonBox::rejected, &dateInputDialog, &QDialog::reject);

    description.setText(desc);
    dateTimeInput =  new QDateTimeEdit(*date);
    dateTimeInput->setDisplayFormat(_dateFormatShort);
    mainLayout.addWidget(&description);
    mainLayout.addWidget(dateTimeInput);
    mainLayout.addWidget(buttonsBox);
    
    dateInputDialog.setLayout(&mainLayout);
    dateInputDialog.setWindowTitle(title);
    // Open dialog box
    dateInputDialog.exec();
    
    // Check if the user click on Ok
    if( dateInputDialog.result() ) {
        status = true;
    } else {
        status = false;
    }
    // Retrieved entered date
    date->setMSecsSinceEpoch(dateTimeInput->dateTime().toMSecsSinceEpoch());
   
    // Delete dialog box object not automatically deleted
    delete buttonsBox;
    delete dateTimeInput;
    
    return status;
}

/*!***************************************************************************
 * Method : TimeBarWidget::getDurationWithDialogBox
 * Purpose : Open a dialog box for the user to request a time duration and return it
 ****************************************************************************/

bool TimeBarWidget::getDurationWithDialogBox(const QString & title, const QString & daydesc, const QString & timedesc, qint64 * days,
                                             QDateTime * time_in_day, bool * isNegative)
{
    QDialog dateInputDialog(this);
    QVBoxLayout mainLayout;
    // New QDialogButtonBox
    QDialogButtonBox * buttonsBox = new QDialogButtonBox((QDialogButtonBox::Ok | QDialogButtonBox::Cancel) ,Qt::Horizontal);
    QLabel daydescription;
    QLabel timedescription;
    // Will store a new QTimeEdit
    QTimeEdit * timeInput = 0;
    // Will store a new QLineEdit
    QLineEdit * nbDaysInput = 0;
    QString sign;
    QString nbDaysTxt;
    bool status;
    
    connect(buttonsBox,&QDialogButtonBox::accepted, &dateInputDialog, &QDialog::accept);
    connect(buttonsBox,&QDialogButtonBox::rejected, &dateInputDialog, &QDialog::reject);

    if( (*isNegative==true) && (*days==0) ) {
        sign = "-";
    } else {
        sign = "";
    }
    nbDaysTxt = NB_DAYS_TXT_CONV_MSG.arg(sign).arg(*days);

    daydescription.setText(daydesc);
    timedescription.setText(timedesc);
    timeInput =  new QTimeEdit(time_in_day->time());
    timeInput->setDisplayFormat("HH:mm:ss.zzz");
    nbDaysInput =  new QLineEdit(nbDaysTxt);
    mainLayout.addWidget(&daydescription);
    mainLayout.addWidget(nbDaysInput);
    mainLayout.addWidget(&timedescription);
    mainLayout.addWidget(timeInput);
    mainLayout.addWidget(buttonsBox);
    
    dateInputDialog.setLayout(&mainLayout);
    dateInputDialog.setWindowTitle(title);
    dateInputDialog.exec();
    
    if( dateInputDialog.result() ) {
        status = true;
    } else {
        status = false;
    }
    time_in_day->setTime(timeInput->time());
    if( nbDaysInput->text().count("-") > 0 ) {
        *isNegative = true;
    } else {
        *isNegative = false;
    }
    *days = nbDaysInput->text().remove(" ").toLongLong();
    
    delete buttonsBox;
    delete timeInput;
    delete nbDaysInput;
    
    return status;
}

/*!***************************************************************************
 * Method : TimeBarWidget::isRealTimeModified
 * Purpose : Perform the necessary action on real-time state enter and exit
 ****************************************************************************/

void TimeBarWidget::isRealTimeModified()
{
    // Get a pointer to the application
    commonMMI::GUIApplication* application = commonMMI::GUIApplication::get();

    if( _timeBarModel->getIsRealTime() == false ) {
        // Update button caption
        _ui->_realTimeButton->setIcon(application->getIcon(commonMMI::Icons::MODE_REAL_TIME));
        _ui->_realTimeButton->setToolTip(commonMMI::Assistant::get()->getToolTip(GPCCCM_L_CML_0500_TOOLTIP));
    } else {
        // Update button caption
        _ui->_realTimeButton->setIcon(application->getIcon(commonMMI::Icons::MODE_REPLAY));
        _ui->_realTimeButton->setToolTip(commonMMI::Assistant::get()->getToolTip(GPCCCM_L_CML_0501_TOOLTIP));
    }
    // Update timebar border color
    setBorderColor();
}

/*!***************************************************************************
 * Method : TimeBarWidget::visualizationModeModified
 * Purpose : Perform the necessary actions on visualization mode change
 ****************************************************************************/

void TimeBarWidget::visualizationModeModified()
{
    QVariant returnedValue;
    TimeBarWidget::QmlVisuMode newMode = VISU_QML_MODE_NORMAL;

    // The allowed position of window end depend on the playing mode
    if(_timeBarModel->getVisualizationMode().compare(VisuMode(VisuMode::TB_NORMAL_MODE).name()) == 0) {
        _ui->_normalModeButton->setChecked(true);
        // Set the parameter content according to QML modes names
        newMode = VISU_QML_MODE_NORMAL;
    } else if(_timeBarModel->getVisualizationMode().compare(VisuMode(VisuMode::TB_SLIDING_MODE).name()) == 0) {
        _ui->_slidingModeButton->setChecked(true);
        // Set the parameter content according to QML modes names
        newMode = VISU_QML_MODE_SLIDING;
    } else if (_timeBarModel->getVisualizationMode().compare(VisuMode(VisuMode::TB_EXTENDED_MODE).name()) == 0) {
        _ui->_extendedModeButton->setChecked(true);
        // Set the parameter content according to QML modes names
        newMode = VISU_QML_MODE_EXTENDED;
    }
    // Call the QML method to update the mode
    QMetaObject::invokeMethod(_rootTimeWidgetObj,"setMode",Q_RETURN_ARG(QVariant, returnedValue),Q_ARG(QVariant, newMode));
}

/*!***************************************************************************
 * Method : TimeBarWidget::visualizationSpeedModified
 * Purpose : Perform the necessary actions on visualization speed change
 ****************************************************************************/

void TimeBarWidget::visualizationSpeedModified()
{
    // Update the visualization speed text label
    // Float to QString conversion, 'f' format is [-]9.9 and precision is 1 digit
    _lastValidSpeedTxt.setNum(_timeBarModel->getVisualizationSpeed(),QSTRING_SETNUM_FLOAT_TYPE,1);
    // Insert the x in front of the speed number
    _lastValidSpeedTxt.insert(0, QString("x"));
    // Write the text label
    _ui->_speedEdit->setText(_lastValidSpeedTxt);

    // Update timebar border color
    setBorderColor();
}

/*!***************************************************************************
 * Method : TimeBarWidget::isPlayingModified
 * Purpose : Perform the necessary actions on playing state change
 ****************************************************************************/

void TimeBarWidget::isPlayingModified()
{
    // Get a pointer to the application
    commonMMI::GUIApplication* application = commonMMI::GUIApplication::get();

    if(_timeBarModel->getIsPlaying()== true) {
        // Request to start playing, set the button to true in case this request is not coming from the button
        if(_ui->_startButton->isChecked() == false) {
            _ui->_startButton->setChecked(true);
        }
        _ui->_startButton->setIcon(application->getIcon(commonMMI::Icons::PAUSE));
        _ui->_startButton->setToolTip(commonMMI::Assistant::get()->getToolTip(GPCCCM_L_CML_0511_TOOLTIP));
    } else {
        // Request to stop playing, set the button to true in case this request is not coming from the button
        if(_ui->_startButton->isChecked() == true) {
            _ui->_startButton->setChecked(false);
        }
        _ui->_startButton->setIcon(application->getIcon(commonMMI::Icons::PLAY));
        _ui->_startButton->setToolTip(commonMMI::Assistant::get()->getToolTip(GPCCCM_L_CML_0510_TOOLTIP));
    }
    // Update the timebar border color
    setBorderColor();
}

/*!***************************************************************************
 * Method : TimeBarWidget::currentTimeModified
 * Purpose : Called on current time update performed in the timebar by the user
 ****************************************************************************/

void TimeBarWidget::currentTimeModified()
{
    // If QML ready and timebar is playing, check current time position in window to make dataContainer jump if necessary
    if(_rootTimeWidgetObj && _timeBarModel->getIsPlaying()) {
        // Get QQuickItem child of QmlMainContainer
        QQuickItem* mainContainer = _rootTimeWidgetObj->findChild<QQuickItem*>("QmlMainContainer");
        qreal timeBarWidth= mainContainer->width() - tlNamesContainerWidth() -
                            tlOffsetsContainerWidth() - (NB_BORDER_IN_TBAR*borderWidth()) - barsWidth();
        qint64 rightBorderMs= fromXcoodstoMsSinceEpoch(DATA_CONTAINER_LEFT_MARGIN + timeBarWidth - (timeBarWidth*_currTimePlayRightMargin));
        // If the current time has moved across the right defined border, make the dataContainer jump
        if( (_lastCurrentTime <= rightBorderMs) && (_timeBarModel->getCurrentTime() > rightBorderMs) ) {
            setmsSinceEpochDataContainer(
                       _timeBarModel->getCurrentTime() - fromPxtoMs(DATA_CONTAINER_LEFT_MARGIN + (timeBarWidth*_currTimePlayLeftMargin) ) );
        }
    }
    // Store the new current time
    _lastCurrentTime = _timeBarModel->getCurrentTime();
}

/*!***************************************************************************
 * Method : TimeBarWidget::setBorderColor
 * Purpose : Update the color of the timebar in QML
 ****************************************************************************/
void TimeBarWidget::setBorderColor()
{
    // Playing at x1.0 speed (real-time or in the past)
    if(_timeBarModel->getIsPlaying() && (_timeBarModel->getVisualizationSpeed() == 1)) {
        if( _timeBarModel->getIsRealTime() == true ) {
            setborderColor(_borderColorRealTime);
        } else {
            setborderColor(_borderColorPast);
        }
    } else if(_timeBarModel->getIsPlaying() && (_timeBarModel->getVisualizationSpeed() > 1)) {
        // Playing at more than x1.0 speed
        setborderColor(_borderColorSpeedUp);
    } else if(_timeBarModel->getIsPlaying() && (_timeBarModel->getVisualizationSpeed() < 1)) {
        // Playing at less than x1.0 speed
        setborderColor(_borderColorSlowDown);
    } else if(!_timeBarModel->getIsPlaying()) {
        // Not playing (necessary in the past)
        setborderColor(_borderColorPause);
    }
}

/*!***************************************************************************
 * Method : TimeBarWidget::setmouseCurrentPosition
 * Purpose : update the current position of the mouse in the timebar
 ****************************************************************************/

void TimeBarWidget::setmouseCurrentPosition(const qint64 &n)
{
    QDateTime current_pos;
    QPalette txtPalette;
    current_pos.setTimeSpec(_datesTimeSpec);
    if(_datesTimeSpec == Qt::OffsetFromUTC) {
        current_pos.setOffsetFromUtc(_timeBarModel->getOffsetFromUTC());
    }

    if (n != _mouseCurrentPos) {
        _mouseCurrentPos = n;
        emit mouseCurrentPositionChanged(n);
        if(_timeScaleLoaded== true) {
            // Update current time text label if the timeline scale has been loaded
            current_pos.setMSecsSinceEpoch(_mouseCurrentPos);
            _ui->_currentTimeLabel->setText(current_pos.toString(_dateFormatLong));
            
            // Check that _timelineUnderMouse is still valid because the timeline under mouse may have been removed by removeTimeline
            if( (_timelineUnderMouse > TBElt_None) && (_timelineUnderMouse < _timelinesData.size()) ) {
                // Update the label text color to be the same as the timeline
                txtPalette = _ui->_timelineTimeLabel->palette();
                txtPalette.setColor(QPalette::WindowText, _timelinesData[_timelineUnderMouse].color);
                _ui->_timelineTimeLabel->setPalette(txtPalette);
                // Update the timeline mouse position text label with current mouse time position in timeline timebase
                current_pos.setMSecsSinceEpoch(_mouseCurrentPos - _timelinesData[_timelineUnderMouse].tlPtr->getOffset());
                _ui->_timelineTimeLabel->setText(current_pos.toString(_dateFormatLong));
                // Reset the timeline indicator to be able to detect when mouse exit the timeline area
                _timelineUnderMouse = TBElt_None;
            } else {
                // Empty the timeline mouse position text label
                _ui->_timelineTimeLabel->setText("");
            }
        }
    }
}

/*!***************************************************************************
 * Method : TimeBarWidget::setmsSinceEpochDataContainer
 * Purpose : update the time position of the dataContainer start
 ****************************************************************************/

void TimeBarWidget::setmsSinceEpochDataContainer(const qint64 &n)
{
    QVariant returnedValue;
    QVariant tlId;
    QVariant tlXpos;
    QVariant tlWidth;
    QVariant tlBase;
    qreal startTl;
    qreal endTl;
    core::INT32 i;

    if (n != _dataContainerStartTime) {
        _dataContainerStartTime = n;
        emit msSinceEpochDataContainerChanged(n);

        // Update the data model
        _timeBarModel->setTimeBarLeftBorderTimeInMsSinceEpoch(_dataContainerStartTime + fromPxtoMs(DATA_CONTAINER_LEFT_MARGIN));

        // Update the time scale of the timebar
        QMetaObject::invokeMethod(_rootTimeWidgetObj, "updateTimescale",Q_RETURN_ARG(QVariant, returnedValue));
        // Then update the timelines X position and width
        for(i=0;i<_timelinesData.size();i++) {
            // Sessions timelines are infinite, only dataset/recordset timelines need computation for position and width
            if( _timelinesData[i].type.value() != TlType::TL_SESSION ) {
                startTl = fromMsSinceEpochToXcoordsPx(_timelinesData[i].startTime +
                         _timelinesData[i].tlPtr->getOffset(),_dataContainerStartTime);
                endTl = fromMsSinceEpochToXcoordsPx(_timelinesData[i].endTime +
                        _timelinesData[i].tlPtr->getOffset(),_dataContainerStartTime);
                tlXpos = startTl;
                tlBase = fromMsSinceEpochToXcoordsPx(_timelinesData[i].startTime,_dataContainerStartTime);
                tlWidth = endTl - startTl;
                if( tlWidth < MIN_TIMELINE_WIDTH ) {
                    tlWidth = MIN_TIMELINE_WIDTH;
                }
            } else {
                tlXpos = 0;
                tlBase = 0;
                tlWidth = DATA_CONTAINER_WIDTH;
            }
            tlId = i;
            // Call the QML method to update the time lines positions in the model
            QMetaObject::invokeMethod(_rootTimeWidgetObj,"updateTimelines",Q_RETURN_ARG(QVariant, returnedValue),
                                      Q_ARG(QVariant, tlId),Q_ARG(QVariant, tlXpos),Q_ARG(QVariant, tlWidth),Q_ARG(QVariant, tlBase));
        }
    }
}

/*!***************************************************************************
 * Method : TimeBarWidget::settimelinesLabelsWidth
 * Purpose : update the width in pixels between two timeline labels
 ****************************************************************************/

void TimeBarWidget::settimeScaleLabelsWidth(const quint32 &n)
{
    if (n != _timeScaleLabelsWidth) {
        _timeScaleLabelsWidth= n;
        emit timeScaleLabelsWidthChanged(n);
    }
}

/*!***************************************************************************
 * Method : TimeBarWidget::setshowVisuWindowMenu
 * Purpose : Request to show the visualiation window context menu
 ****************************************************************************/

void TimeBarWidget::setshowVisuWindowMenu(const bool &n)
{
    if (n != _showVisuWindowMenu) {
        _showVisuWindowMenu = n;
        if(_tbContextMenu->isVisible() ==  false) {
            _tbContextMenu->exec(QCursor::pos());
            _showVisuWindowMenu = false;
        }
        emit showVisuWindowMenuChanged(n);
    }
}

/*!***************************************************************************
 * Method : TimeBarWidget::settimeLineIdxMenu
 * Purpose : Request a reset of the position of the timeline of index n
 ****************************************************************************/

void TimeBarWidget::settimeLineIdxMenu(const TBElt &n)
{
    if ( (n != _timeLineIdxMenu) && (n > TBElt_None) && (n < _timelinesData.size()) && (n < TBElt_TlMax) ) {
        _timeLineIdxMenu = n;
        // Check if we need to open dataset/recordset context menu or a session context menu
        if( _timelinesData[n].type.value() != TlType::TL_SESSION ) {
            if(_dataSetContextMenu->isVisible() ==  false) {
                _dataSetContextMenu->exec(QCursor::pos());
                // Reset the context menu timeline index
                _timeLineIdxMenu=TBElt_None;
            }
        } else {
            // Will store master or current session
            QMenu * menuToOpen = 0;
            // Check if we need to open simple session context menu or the master session context menu
            if( _timelinesData[n].isMaster ==  true ) {
                menuToOpen = _masterSessContextMenu;
            } else {
                menuToOpen = _sessionsContextMenu;
            }
            // Open the context menu is not already displayed
            if( menuToOpen && (menuToOpen->isVisible() ==  false) ) {
                menuToOpen->exec(QCursor::pos());
                // Reset the context menu timeline index
                _timeLineIdxMenu=TBElt_None;
            }
        }
        emit timeLineIdxMenuChanged(n);
    }
}

/*!***************************************************************************
 * Method : TimeBarWidget::setmovedEltXOfs
 * Purpose : Specify the offset in pixel of the dragged element designated by _elementToDrag
 ****************************************************************************/

void TimeBarWidget::setmovedEltXOfs(const qreal &n)
{
    if ( (n != _movedEltXOfs) && (_elementToDrag >= 0) && (_elementToDrag < _timelinesData.size())  ) {
        _movedEltXOfs = n;
        // Update the offset in the model
        emit movedEltXOfsChanged(n);

        // Update the session/dataset/recordset timelilne offset
        updateTimelineOfs(_elementToDrag,fromPxtoMs(n),false,false);
    }
}


/*!***************************************************************************
 * Method : TimeBarWidget::setlatchEltXOfs
 * Purpose : Ask to latch in the model the offset of dragged element designated by _elementToDrag
 ****************************************************************************/

void TimeBarWidget::setlatchEltXOfs(const qreal &n)
{
    if ( (n != _latchEltXOfs) && (_elementToDrag > TBElt_None) && (_elementToDrag < _timelinesData.size())  ) {
        _latchEltXOfs = n;
        // Update the offset in the model
        emit latchEltXOfsChanged(n);

        // Update the session/dataset/recordset timelilne offset with redraw in order to
        // avoid session timelines to be dragged out of screen because they shall be infinite
        updateTimelineOfs(_elementToDrag,fromPxtoMs(n),true,true);
    }
}

/*!***************************************************************************
 * Method : TimeBarWidget::setelementToMove
 * Purpose : Request an update of the position of a visualization window element
 ****************************************************************************/

void TimeBarWidget::setelementToMove(const TBElt &n)
{
    // Dialog boxes
    bool isDlgBoxOk;
    bool isNegative;
    QString eltDsc;
    QMessageBox errMsgBox(this);
    bool showErrorBox=false;
    QString errorBoxMsg;
    QString errorBoxTitle;
    // Time variable
    qint64 timeOffset;
    qint64 tlOffset;
    QDateTime eltPos;
    qint64 nbDays;
    QDateTime windowStartDate;
    QDateTime currentTimeDate;
    QDateTime windowEndDate;
    QDateTime lowerLimit;
    QDateTime upperLimit;

    // Initialize local variables
    windowStartDate.setTimeSpec(_datesTimeSpec);
    currentTimeDate.setTimeSpec(_datesTimeSpec);
    windowEndDate.setTimeSpec(_datesTimeSpec);
    lowerLimit.setTimeSpec(_datesTimeSpec);
    upperLimit.setTimeSpec(_datesTimeSpec);

    if(_datesTimeSpec == Qt::OffsetFromUTC) {
        windowStartDate.setOffsetFromUtc(_timeBarModel->getOffsetFromUTC());
        currentTimeDate.setOffsetFromUtc(_timeBarModel->getOffsetFromUTC());
        windowEndDate.setOffsetFromUtc(_timeBarModel->getOffsetFromUTC());
        lowerLimit.setOffsetFromUtc(_timeBarModel->getOffsetFromUTC());
        upperLimit.setOffsetFromUtc(_timeBarModel->getOffsetFromUTC());
    }

    _elementToMove = n;

    // Check if the element to move is not a session/dataset/recordset timelilne or "none"
    if(n < TBElt_None) {
        // Get the current position of the element and the description to associate with
        switch(_elementToMove) {
            case TBElt_LowerSlideLimit:
                eltDsc = "Lower sliding mode limit";
                eltPos.setMSecsSinceEpoch(_timeBarModel->getLowerSlideLimit());
                break;
            case TBElt_UpperSlideLimit:
                eltDsc = "Upper sliding mode limit";
                eltPos.setMSecsSinceEpoch(_timeBarModel->getUpperSlideLimit());
                break;
            case TBElt_UpperExtendedLimit:
                eltDsc = "Upper extended mode limit";
                eltPos.setMSecsSinceEpoch(_timeBarModel->getUpperExtendedLimit());
                break;
            case TBElt_BeforeTime:
                eltDsc = "Window start time";
                eltPos.setMSecsSinceEpoch(_timeBarModel->getStartTime());
                break;
            case TBElt_AfterTime:
                eltDsc = "Window end time";
                eltPos.setMSecsSinceEpoch(_timeBarModel->getEndTime());
                break;
            case TBElt_CurrentTime:
                eltDsc = "Current time";
                eltPos.setMSecsSinceEpoch(_timeBarModel->getCurrentTime());
                break;
            case TBElt_VisuWindow:
                eltDsc = "Window position";
                eltPos.setMSecsSinceEpoch(_timeBarModel->getStartTime());
                break;
            default:
                // Unexpected value
                LOF_INFO(UNEXPECTED_TIMEBAR_ID_MSG.arg(static_cast<core::INT32>(_elementToMove)));
                _elementToMove = TBElt_None;
                break;
        }

        // Display input text dialog box to ask new position to the user
        isDlgBoxOk = getDateWithDialogBox(eltDsc, POSITION_CAPTION_MSG, &eltPos);
       
        // If the user close the dialog box with Ok
        if (isDlgBoxOk) {
            // Create the QDateTime version of this date
            qint64 newEltTime = eltPos.toMSecsSinceEpoch();
            // Process the new position depending the considered element
            switch(_elementToMove) {
                // Lower slide limit
                case TBElt_LowerSlideLimit:
                    if( newEltTime < _timeBarModel->getStartTime() ) {
                        // new lower slide limit is before window start
                        windowStartDate.setMSecsSinceEpoch(_timeBarModel->getStartTime());
                        showErrorBox=true;
                        errorBoxMsg = LOWER_LIMIT_BEFORE_START_MSG.arg(eltPos.toString(_dateFormatShort)).
                                arg(windowStartDate.toString(_dateFormatShort));
                    }
                    if( newEltTime > _timeBarModel->getCurrentTime() ) {
                        // new lower slide limit is after current time
                        currentTimeDate.setMSecsSinceEpoch(_timeBarModel->getCurrentTime());
                        showErrorBox=true;
                        errorBoxMsg = LOWER_LIMIT_AFTER_CURRENT_MSG.arg(eltPos.toString(_dateFormatShort)).
                                arg(currentTimeDate.toString(_dateFormatShort));
                    }
                    // If the position of the element is correct, update it
                    if( showErrorBox == false ) {
                        _timeBarModel->setLowerSlideLimit(newEltTime);
                    }
                    break;
                // Upper slide limit
                case TBElt_UpperSlideLimit:
                    if( newEltTime > _timeBarModel->getEndTime() ) {
                        // new upper slide limit is after window end
                        windowEndDate.setMSecsSinceEpoch(_timeBarModel->getEndTime());
                        showErrorBox=true;
                        errorBoxMsg =
                         UPPER_LIMIT_AFTER_END_MSG.arg(eltPos.toString(_dateFormatShort)).arg(windowEndDate.toString(_dateFormatShort));
                    }
                    if( newEltTime < _timeBarModel->getCurrentTime() ) {
                        // new upper slide limit is before current time
                        currentTimeDate.setMSecsSinceEpoch(_timeBarModel->getCurrentTime());
                        showErrorBox=true;
                        errorBoxMsg = UPPER_LIMIT_BEFORE_CURRENT_MSG.arg(eltPos.toString(_dateFormatShort)).
                                arg(currentTimeDate.toString(_dateFormatShort));
                    }
                    // If the position of the element is correct, update it
                    if( showErrorBox == false ) {
                        _timeBarModel->setUpperSlideLimit(newEltTime);
                    }
                    break;
                // Upper extended limit
                case TBElt_UpperExtendedLimit:
                    if( newEltTime < _timeBarModel->getEndTime() ) {
                        // new upper extended limit is before window end
                        windowEndDate.setMSecsSinceEpoch(_timeBarModel->getEndTime());
                        showErrorBox=true;
                        errorBoxMsg =
                         EXT_LIMIT_BEFORE_END_MSG.arg(eltPos.toString(_dateFormatShort)).arg(windowEndDate.toString(_dateFormatShort));
                    }
                    // If the position of the element is correct, update it
                    if( showErrorBox == false ) {
                        _timeBarModel->setUpperExtendedLimit(newEltTime);
                    }
                    break;
                // Visualization window start position
                case TBElt_BeforeTime:
                    // The allowed position of window start depend on the playing mode
                    if( _timeBarModel->getVisualizationMode().compare(VisuMode(VisuMode::TB_SLIDING_MODE).name()) == 0 ) {
                        // Sliding mode
                        if( newEltTime > _timeBarModel->getLowerSlideLimit()) {
                            // new window start time is after the lower slide limit
                            currentTimeDate.setMSecsSinceEpoch(_timeBarModel->getLowerSlideLimit());
                            showErrorBox=true;
                            errorBoxMsg = WIN_START_AFTER_SLIDE_MSG.arg(eltPos.toString(_dateFormatShort)).
                                    arg(currentTimeDate.toString(_dateFormatShort));
                        }
                    } else {
                        // Normal or extended mode
                        if( newEltTime > _timeBarModel->getCurrentTime()) {
                            // new window start time is after the current time
                            currentTimeDate.setMSecsSinceEpoch(_timeBarModel->getCurrentTime());
                            showErrorBox=true;
                            errorBoxMsg = WIN_START_AFTER_CURR_MSG.arg(eltPos.toString(_dateFormatShort)).
                                    arg(currentTimeDate.toString(_dateFormatShort));
                        }
                    }
                    // If the position of the element is correct according to its type and the playing mode, update it
                    if( showErrorBox == false ) {
                        _timeBarModel->setStartTime(newEltTime);
                    }
                    break;
                // Visualization window end position
                case TBElt_AfterTime:
                    // The allowed position of window end depend on the playing mode
                    if(_timeBarModel->getVisualizationMode().compare(VisuMode(VisuMode::TB_NORMAL_MODE).name()) == 0) {
                        if( newEltTime < _timeBarModel->getCurrentTime()) { // new window end time is before the current time
                            currentTimeDate.setMSecsSinceEpoch(_timeBarModel->getCurrentTime());
                            showErrorBox=true;
                            errorBoxMsg = WIN_END_BEFORE_CURR_MSG.arg(eltPos.toString(_dateFormatShort)).
                                    arg(currentTimeDate.toString(_dateFormatShort));
                        }
                    } else if(_timeBarModel->getVisualizationMode().compare(VisuMode(VisuMode::TB_SLIDING_MODE).name()) == 0) {
                        if( newEltTime < _timeBarModel->getUpperSlideLimit()) {
                            // new window end time is before the upper slide limit
                            currentTimeDate.setMSecsSinceEpoch(_timeBarModel->getUpperSlideLimit());
                            showErrorBox=true;
                            errorBoxMsg = WIN_END_BEFORE_SLIDE_MSG.arg(eltPos.toString(_dateFormatShort)).
                                    arg(currentTimeDate.toString(_dateFormatShort));
                        }
                    } else if (_timeBarModel->getVisualizationMode().compare(VisuMode(VisuMode::TB_EXTENDED_MODE).name()) == 0) {
                        if( (newEltTime > _timeBarModel->getUpperExtendedLimit()) || (newEltTime < _timeBarModel->getCurrentTime()) ) {
                            // new window end time is not between current time and upper extended limit
                            lowerLimit.setMSecsSinceEpoch(_timeBarModel->getCurrentTime());
                            upperLimit.setMSecsSinceEpoch(_timeBarModel->getUpperExtendedLimit());
                            showErrorBox=true;
                            errorBoxMsg = WIN_END_OUT_CURR_AND_EXT_MSG.arg(eltPos.toString(_dateFormatShort))
                                          .arg(lowerLimit.toString(_dateFormatShort)).arg(upperLimit.toString(_dateFormatShort));
                        }
                    }
                    // If the position of the element is correct according to its type and the playing mode, update it
                    if( showErrorBox == false ) {
                        _timeBarModel->setEndTime(newEltTime);
                    }
                    break;
                // Current time position
                case TBElt_CurrentTime:
                    // The allowed position of the current time bar depend on the playing mode
                    if( _timeBarModel->getVisualizationMode().compare(VisuMode(VisuMode::TB_SLIDING_MODE).name()) == 0 ) {
                        // Sliding mode
                        if( (newEltTime < _timeBarModel->getLowerSlideLimit()) || (newEltTime > _timeBarModel->getUpperSlideLimit()) ) {
                            // new current time is not between lower and upper slide limits
                            lowerLimit.setMSecsSinceEpoch(_timeBarModel->getLowerSlideLimit());
                            upperLimit.setMSecsSinceEpoch(_timeBarModel->getUpperSlideLimit());
                            showErrorBox=true;
                            errorBoxMsg = CURR_OUT_SLIDE_MSG.arg(eltPos.toString(_dateFormatShort)).
                                    arg(lowerLimit.toString(_dateFormatShort)).arg(upperLimit.toString(_dateFormatShort));
                        }
                    } else {
                        // Normal or extended mode
                        if( (newEltTime < _timeBarModel->getStartTime()) || (newEltTime > _timeBarModel->getEndTime()) ) {
                            // new current time is not within visualization window
                            windowStartDate.setMSecsSinceEpoch(_timeBarModel->getStartTime());
                            windowEndDate.setMSecsSinceEpoch(_timeBarModel->getEndTime());
                            showErrorBox=true;
                            errorBoxMsg = CURR_OUT_WIN_MSG.arg(eltPos.toString(_dateFormatShort))
                                                          .arg(windowStartDate.toString("dd MM yyyy HH:mm:ss.zzz"))
                                                          .arg(windowEndDate.toString(_dateFormatShort));
                        }
                    }
                    // If the position of the element is correct according to its type and the playing mode, update it
                    if( showErrorBox == false ) {
                        // Trigger current time bar position update
                        _timeBarModel->setCurrentTime(newEltTime);
                    }
                    break;
                // The entire visualization window
                case TBElt_VisuWindow:
                    // There is not more check to perform here, as soon as the date is valid, the visualization window can move
                    timeOffset = newEltTime - _timeBarModel->getStartTime();
                    _timeManager->setvisuWindowPos(newEltTime,
                                                   (_timeBarModel->getEndTime()+timeOffset),
                                                   (_timeBarModel->getCurrentTime()+timeOffset),
                                                   (_timeBarModel->getLowerSlideLimit()+timeOffset),
                                                   (_timeBarModel->getUpperSlideLimit()+timeOffset),
                                                   (_timeBarModel->getUpperExtendedLimit()+timeOffset)
                                                  );
                    break;
                default:
                    // Nothing to do because this default case is handled in the switch-case above
                    break;
            }
            // Error box title for visualization window element
            errorBoxTitle = ENTERED_POS_NOT_VALID_MSG;
        }
    } else if( (n > TBElt_None) && (n < _timelinesData.size()) ) {
        // The element to move is a session/dataset/recordset timelilne
        // Create the description of the element to move by adding "offset" to the name of the dataset/recordset
        eltDsc = CHANGE_OFFSET_OF_MSG;
        eltDsc.append(_timelinesData[n].tlPtr->getName());
        // Create the text version of the current dataset/recordset offset
        tlOffset = _timelinesData[n].tlPtr->getOffset();
        // Extract the signed number of days
        nbDays = tlOffset / NB_MILLISECONDS_IN_24HRS;
        if( tlOffset < 0 ) {
            isNegative = true;
        } else {
            isNegative = false;
        }
        // Extract the unsigned fractional time duration smaller than 1 day
        timeOffset = qAbs(tlOffset) % NB_MILLISECONDS_IN_24HRS;
        // Set the timespec to UTC because we compute time difference, and not absolute date
        eltPos.setTimeSpec(Qt::UTC);
        eltPos.setMSecsSinceEpoch(timeOffset);
        // Display input text dialog box to ask the offset
        isDlgBoxOk = getDurationWithDialogBox(eltDsc,NB_DAYS_AND_SIGN_OF_OFFSET_MSG, FRACT_PART_OF_OFFSET_MSG,&nbDays,&eltPos,&isNegative);
                                            
        // If the user close the dialog box with Ok
        if (isDlgBoxOk) {
            // Get the number of ms represented by the hh:mm:ss.zzz part of the offset, UTC is used because we deal with time difference,
            // not absolute date
            qint64 newEltTime = eltPos.toMSecsSinceEpoch();
            // Compute the whole offset in millisecond by adding or substracting the number of days depending on the entered sign
            if( (nbDays < 0) || (isNegative==true) ) {
                newEltTime = (NB_MILLISECONDS_IN_24HRS*nbDays) - newEltTime;
            } else {
                newEltTime = newEltTime + NB_MILLISECONDS_IN_24HRS*nbDays;
            }
            // Update the session/dataset/recordset timelilne offset
            // Substract the offset of the model because updateTimelineOfs add it to the offset given in ofs parameter,
            // so we need to substract first it in order to get correct value witten by updateTimelineOfs
            updateTimelineOfs(_elementToMove, (newEltTime - _timelinesData[n].tlPtr->getOffset()), true,true);
        }
        // Error box title for dataset/recordset
        errorBoxTitle = ENTERED_OFFSET_NOT_VALID_MSG;
    }
    
    // If the entered date created an error, display the associated error dialog box
    if( showErrorBox == true ) {
        errMsgBox.setText(errorBoxTitle);
        errMsgBox.setDetailedText(errorBoxMsg);
        errMsgBox.setIcon(QMessageBox::Critical);
        errMsgBox.setStandardButtons(QMessageBox::Ok);
        errMsgBox.setDefaultButton(QMessageBox::Ok);
        errMsgBox.exec();
    }
}

/*!***************************************************************************
 * Method : TimeBarWidget::settlToRename
 * Purpose : Request an update of the name of a timeline
 ****************************************************************************/

void TimeBarWidget::settlToRename(const TBElt &n)
{
    // Dialog boxes
    bool isDlgBoxOk;
    QMessageBox errMsgBox(this);
    bool showErrorBox;
    // QML communication variables
    QVariant returnedValue;
    QVariant tlId;
    QVariant tlLabel;
    QVariant tlColor;
    // Local variables
    QString newTlName;
    core::INT32 i;

    _tlToRename = n;

    // Check if the element to rename is an existing timeline and javascript mode is off
    if((_tlToRename>TBElt_None) && (_tlToRename<TBElt_TlMax) && (_tlToRename<_timelinesData.size()) && (_isJavascriptModeActive==false)) {

        // While user clicked Ok and the name is already used, ask for another name
        showErrorBox = true;
        isDlgBoxOk = true;
        while(showErrorBox && isDlgBoxOk) {
            // Ask the user to enter the new name for this timeline
            newTlName = QInputDialog::getText(this,RENAME_MSG,NEW_NAME_MSG,QLineEdit::Normal,_timelinesData[_tlToRename].tlPtr->getName(),
                                              &isDlgBoxOk);

            // Check that the entered name is not already used for another timeline
            showErrorBox = false;
            for(i=0;(i<_timelinesData.size()) && (showErrorBox==false);i++) {
                if(_timelinesData[i].tlPtr->getName().compare(newTlName)==0) {
                    showErrorBox= true;
                }
            }

            // If the entered date created an error, display the associated error dialog box
            if( showErrorBox == true ) {
                errMsgBox.setText(NAME_ALREADY_USED_MSG);
                errMsgBox.setDetailedText(NAME_ALREADY_USED_TIMELINE_MSG);
                errMsgBox.setIcon(QMessageBox::Critical);
                errMsgBox.setStandardButtons(QMessageBox::Ok);
                errMsgBox.setDefaultButton(QMessageBox::Ok);
                errMsgBox.exec();
            }
        }

        // If the user clicked Ok in the dialog box and the entered name is valid
        if(isDlgBoxOk) {
            // Update the name in the model
            _timelinesData[_tlToRename].tlPtr->setName(newTlName);
            // Update the color in the local model
            _timelinesData[_tlToRename].color = generateColorFromName(newTlName);

            tlId = _tlToRename;
            tlLabel = newTlName;
            tlColor = _timelinesData[_tlToRename].color.name();
            // Call the QML method to update the timeline name in the model
            QMetaObject::invokeMethod(_rootTimeWidgetObj,"updateTimelineName",Q_RETURN_ARG(QVariant, returnedValue),
                                      Q_ARG(QVariant, tlId),Q_ARG(QVariant, tlLabel),Q_ARG(QVariant, tlColor));
        }
    }
}

/*!***************************************************************************
 * Method : TimeBarWidget::setelementToDrag
 * Purpose : Request an update of the position of a dragged timeline
 ****************************************************************************/

void TimeBarWidget::setelementToDrag(const TBElt &n)
{
    if ( (n != _elementToDrag) && (n > TBElt_None) && (n < _timelinesData.size()) && (n < TBElt_TlMax)  ) {
        _elementToDrag = n;
        emit elementToDragChanged(n);
    }
}

/*!***************************************************************************
 * Method : TimeBarWidget::settimelineUnderMouse
 * Purpose : Ask for the update of the current mouse position label in a given timeline time reference
 ****************************************************************************/

void TimeBarWidget::settimelineUnderMouse(const TBElt &n)
{
    if ( (n > TBElt_None) && (n < _timelinesData.size()) && (n < TBElt_TlMax) ) {
        _timelineUnderMouse = n;
        emit timelineUnderMouseChanged(n);
    }
}

/*!***************************************************************************
 * Method : TimeBarWidget::setborderColor
 * Purpose : Update the timebar border color
 ****************************************************************************/

void TimeBarWidget::setborderColor(const QString &n)
{
    if ( n !=  _borderColorCurrent ) {
        _borderColorCurrent = n;
        emit borderColorChanged(n);
    }
}

/*!***************************************************************************
 * Method : TimeBarWidget::setvisuWindowPos
 * Purpose : Update the visualization window start and end boundaries coherently, called on release event of mouse drag in TimeBarWidget
 ****************************************************************************/

void TimeBarWidget::setvisuWindowPos(const qint64 &start, const qint64 &end,const qint64 &curr,
                                     const qint64 &lowSlideLim,const qint64 &upSlideLim,const qint64 &upExtLim)
{
    _timeManager->setvisuWindowPos(start, end, curr, lowSlideLim, upSlideLim, upExtLim);
}


/*!***************************************************************************
 * Method : TimeBarWidget::settlNamesContainerWidth
 * Purpose : Update the width of the column with timeline names during mouse drag
 ****************************************************************************/

void TimeBarWidget::settlNamesContainerWidth(const qint32 &n)
{
    if ( n !=  _tlNamesContainerWidth ) {
        _tlNamesContainerWidth = n;
        emit tlNamesContainerWidthChanged(n);
    }
}

/*!***************************************************************************
 * Method : TimeBarWidget::moveTimeline
 * Purpose : move a timeline in list model from a source index to a destination index
 ****************************************************************************/
// {{RELAX<Qa.PortType> OHD DV14 TBC_CNES QML requires the use of Qt type, and int type doesn't have a redefinition in Qt
void TimeBarWidget::moveTimeline(const int src_idx, const int dest_idx)
{
    int src_dmIdx;
    int dst_dmIdx;
    QList<timeBarsModel::Timeline*> tl_list;

    // Check validity of the timeline move operation
    if ( (src_idx >= 0) && (src_idx < _timelinesData.size()) &&
         (dest_idx >= 0) && (dest_idx < _timelinesData.size())  ) {
        // Get the list of timelines from the data model, it can be longer than the local list _timelinesData due to
        // potential not accessible sessions which have be added to the local list
        tl_list = _timeBarModel->getTimelines()->getTimelines();
        // Retrived the source and destination elements in the data model
        src_dmIdx = tl_list.indexOf(_timelinesData[src_idx].tlPtr);
        dst_dmIdx = tl_list.indexOf(_timelinesData[dest_idx].tlPtr);
        // Check the retrieved indexes
        if( (src_dmIdx>=0) && (dst_dmIdx>=0) ) {
            // Move the timeline in local model (used for QML)
            _timelinesData.move(src_idx,dest_idx);
            // Move the timeline in data model (which also contains not accessible sessions)
            _timeBarModel->getTimelines()->moveTimeline(src_dmIdx,dst_dmIdx);
            // Update the master session index if necessary
            // Don't trigger TimeManager because this is only a change in order, not a real master session update
            if(_timeBarModel->getMasterSession()==src_dmIdx) {
                _timeBarModel->setMasterSession(dst_dmIdx);
            }
        }
    }
}
// }}RELAX<Qa.PortType>

/*!***************************************************************************
 * Method : TimeBarWidget::visuModeFromName
 * Purpose : Returns the QML enum from a the name of a visualization mode
 ****************************************************************************/

TimeBarWidget::QmlVisuMode TimeBarWidget::visuModeFromName(const QString &mode)
{
    QmlVisuMode ret_val = VISU_QML_MODE_NORMAL;

    // Translate visualization mode from name to QML enum
    if(mode.compare(VisuMode(VisuMode::TB_EXTENDED_MODE).name()) == 0) {
        ret_val = VISU_QML_MODE_EXTENDED;
    }
    if(mode.compare(VisuMode(VisuMode::TB_SLIDING_MODE).name()) == 0) {
        ret_val = VISU_QML_MODE_SLIDING;
    }

    return ret_val;
}

/*!***************************************************************************
 * Method : TimeBarWidget::fromXcoodstoMsSinceEpoch
 * Purpose : convert X coordinate in dataContainer to a date in millisecond since Epoch
 ****************************************************************************/

qint64 TimeBarWidget::fromXcoodstoMsSinceEpoch(const qreal &n)
{
    return (( n * _timeBarModel->getNbMsInPixel() ) + _dataContainerStartTime);
}

/*!***************************************************************************
 * Method : TimeBarWidget::fromMsSinceEpochToXcoordsPx
 * Purpose : convert a date in millisecond since Epoch to X coordinate in dataContainer
 *           dataContainerStart is given as parameter instead using _dataContainerStartTime
 *           because as this service is used in QML binding, this allow QML engine to perform
 *           recomputation in case _dataContainerStartTime is updated
 ****************************************************************************/

qreal TimeBarWidget::fromMsSinceEpochToXcoordsPx(const qint64 &n, const qint64 &dataContainerStart) const
{
    qreal retVal;
    retVal = (( n - dataContainerStart ) / _timeBarModel->getNbMsInPixel());
    // To allow acceptable performances of the QML, avoid management of elements too far outside the dataContainer
    if( retVal > DATA_CONTAINER_WIDTH ) {
        // If the graphical object is after the right of the dataContainer, put it on the right border of the dataContainer
        retVal = DATA_CONTAINER_WIDTH;
    }
    if( retVal < 0 ) {
        // If the graphical object is before the left border of the dataContainer, put it on the left border of the dataContainer
        retVal = 0;
    }
    return retVal;
}

/*!***************************************************************************
 * Method : TimeBarWidget::fromPxtoMs
 * Purpose : convert a duration in millisecond to an X axe distance in pixel in dataContainer
 ****************************************************************************/

qint64 TimeBarWidget::fromPxtoMs(const qreal &n)
{
    return (n * _timeBarModel->getNbMsInPixel());
}

/*!***************************************************************************
 * Method : TimeBarWidget::fromMsToPxSaturated
 * Purpose : convert an X axe distance in pixel in dataContainer to a duration in millisecond with
 *           saturation to twice the dataContainer width in case the result if bigger
 *           The saturation is necessary to prevent QML from managing too big number, which decrease
 *           performance. The drawback is that real width of elements cannot be computed, so start
 *           and end coordinates shall be used instead with fromMsSinceEpochToXcoordsPx service
 ****************************************************************************/

qreal TimeBarWidget::fromMsToPxSaturated(const qint64 &n)
{
    qreal retVal;
    retVal = n / _timeBarModel->getNbMsInPixel();
    // To allow acceptable performances of the QML, avoid managment of elements too far outside the dataContainer
    if( retVal > DATA_CONTAINER_WIDTH ) {
        retVal =  DATA_CONTAINER_WIDTH;
    }
    return retVal;
}

/*!***************************************************************************
 * Method : TimeBarWidget::txtTimeLabelfromMsSinceEpoch
 * Purpose : Return a string representing a date in specified format from a time in in milliseconds since Epoch with correction
 *           of this position to align it the first day of months
 ****************************************************************************/

QString TimeBarWidget::txtTimeLabelfromMsSinceEpoch(const qint64 &time, const QString &format, const qint64 &durBtwLbls,
                                                    const bool canBeEarlier)
{
    QDateTime date;
    core::INT32 monthDay;
    core::INT32 month;
    core::INT32 year;
    core::INT32 daysBtwLbl;
    // Set the timespec
    date.setTimeSpec(_datesTimeSpec);
    if(_datesTimeSpec == Qt::OffsetFromUTC) {
        date.setOffsetFromUtc(_timeBarModel->getOffsetFromUTC());
    }
    // Compute the duration between labels in days
    daysBtwLbl = static_cast<core::INT32>(durBtwLbls) / NB_MILLISECONDS_IN_24HRS;
    // Check if the duration between labels is longer than two days, in which case the label position may be rounded
    if(daysBtwLbl > DAYS_BTW_LBL_ROUND_LIMIT) {
        // Get the day number in the month, the month and year numbers
        date.setMSecsSinceEpoch(time);
        monthDay = date.date().day();
        month = date.date().month();
        year = date.date().year();

        // Rounding case 1 : duration between labels is smaller or equal to half a month,
        // so put the label on a modulo of this duration within the month
        if(daysBtwLbl<NB_DAYS_HALF_MONTH_ROUND_LIMIT) {
            // Check if the day in the month has to be aligned on the modulo of the number of days between labels
            if( ((monthDay-1) % daysBtwLbl) != 0) {
                // Check if the label can be aligned back on the closest modulo, which is not possible if it is the first label of
                // the dataContainer
                if(canBeEarlier && ((monthDay-1) % daysBtwLbl) < (daysBtwLbl/DAYS_BTW_LBL_ROUND_LIMIT)) {
                    // Align previous modulo
                    monthDay = monthDay - ((monthDay-1) % daysBtwLbl);
                } else {
                    // Align on next modulo
                    monthDay = monthDay + daysBtwLbl - ((monthDay-1) % daysBtwLbl);
                }
            }
            // Check if the label is so close to the end of the month that we need to set it on the 1st of next month
            // Do this check in both case : either we added days to reach modulo border or not
            if( monthDay > (date.date().daysInMonth()-(daysBtwLbl/DAYS_BTW_LBL_ROUND_LIMIT)) ) {
                monthDay = 1;
                month = month + 1;
                if(month>NB_MONTH_IN_YEAR) {
                    month=1;
                    year++;
                }
            }
        } else {
            // Rouding case 2 : duration between labels is greater than half a month, so put the label on the first day of a month
            // Check if we align on first of current or next month,
            // the value 3 is used due to the difference of month duration between 28 and 31 days
            if(monthDay > DIFF_DAYS_MIN_MAX_MONTH_IN_YEAR) {
                month = month + 1;
                if(month>NB_MONTH_IN_YEAR) {
                    month=1;
                    year++;
                }
            }
            // Set the label on the 1st of the month
            monthDay = 1;
        }
        // Set date here to put in any cases the time to 0h00m00s
        date = QDateTime(QDate(year,month,monthDay));
        // Correct the label position
        _lastLblPos = date.toMSecsSinceEpoch();
    } else {
        // Nominal case, no rounding on 1st day of month is necessary
        date.setMSecsSinceEpoch(time);
        _lastLblPos = time;
    }
    return date.toString(format);
}

/*!***************************************************************************
 * Method : TimeBarWidget::correctedLabelfromMsSinceEpoch
 * Purpose : Return the corrected value in ms since Epoch of a time label of the timebar time scale, shall always be called after
 *           txtTimeLabelfromMsSinceEpoch()
 ****************************************************************************/

qint64 TimeBarWidget::correctedLabelfromMsSinceEpoch()
{
    return _lastLblPos;
}

// QML configuration parameters READ services
/*!***************************************************************************
 * Method : borderWidth
 * Purpose : width in pixels of the colored border of the timeBar
 ****************************************************************************/
quint32 TimeBarWidget::borderWidth() const
{
    return BORDER_WIDTH;
}
/*!***************************************************************************
 * Method : timelinesHeight
 * Purpose : Height in pixels of each session/dataset/recordset timeline, this height include the spacing between timelines
 ****************************************************************************/
quint32 TimeBarWidget::timelinesHeight() const
{
    return TIMELINES_HEIGHT;
}
/*!***************************************************************************
 * Method : tlNamesContainerInitWidth
 * Purpose : Initial width in pixel at startup of the timelines names container
 ****************************************************************************/
quint32 TimeBarWidget::tlNamesContainerInitWidth() const
{
    return TL_NAMES_CONTAINER_INIT_WIDTH;
}
/*!***************************************************************************
 * Method : tlOffsetsContainerWidth
 * Purpose : Width in pixel of the timelines text offsets container
 ****************************************************************************/
quint32 TimeBarWidget::tlOffsetsContainerWidth() const
{
    return TL_OFFSETS_CONTAINER_WIDTH;
}
/*!***************************************************************************
 * Method : minTimeScaleLabelsWidth
 * Purpose : Minimum number of pixels between two time labels in the timeline at the bottom of the timeBar
 ****************************************************************************/
quint32 TimeBarWidget::minTimeScaleLabelsWidth() const
{
    return MIN_TIME_SCALE_LABELS_WIDTH;
}
/*!***************************************************************************
 * Method : textSizeRatio
 * Purpose : Ratio between timelines height and font size inside them
 ****************************************************************************/
qreal TimeBarWidget::textSizeRatio() const
{
    return TEXT_SIZE_RATIO;
}
/*!***************************************************************************
 * Method : minNbMsInPixel
 * Purpose : Minimum possible resolution (related to zoom limit)
 ****************************************************************************/
qreal TimeBarWidget::minNbMsInPixel() const
{
    return MIN_NBMS_IN_PIXEL;
}
/*!***************************************************************************
 * Method : maxNbMsInPixel
 * Purpose : Maximum possible resolution (related to zoom limit), correspond to 20 years on a full HD 1920px screen
 ****************************************************************************/
qreal TimeBarWidget::maxNbMsInPixel() const
{
    return MAX_NBMS_IN_PIXEL;
}
/*!***************************************************************************
 * Method : tlOfsIndicatorHeight
 * Purpose : Height in pixel of the bar representing the offset of a dataset/recordset
 ****************************************************************************/
quint32 TimeBarWidget::tlOfsIndicatorHeight() const
{
    return TL_OFS_INDICATOR_HEIGHT;
}
/*!***************************************************************************
 * Method : smallLineWidth
 * Purpose : Width of the small lines in the timebar, like the border of the legendsContainer
 ****************************************************************************/
quint32 TimeBarWidget::smallLineWidth() const
{
    return SMALL_LINE_WIDTH;
}
/*!***************************************************************************
 * Method : barsWidth
 * Purpose : Width in pixel of the vertical time indicator bars, as current time, start and end of visualization window
 ****************************************************************************/
qreal TimeBarWidget::barsWidth() const
{
    return BARS_WIDTH;
}
/*!***************************************************************************
 * Method : dataContainerLeftMargin
 * Purpose : Number of pixels of the dataContainer which are after the mainContainer left border, in the not visible area.
 * This margin is used to allow timescale drag.
 ****************************************************************************/
qreal TimeBarWidget::dataContainerLeftMargin() const
{
    return DATA_CONTAINER_LEFT_MARGIN;
}
/*!***************************************************************************
 * Method : currTimeBarColor
 * Purpose : Color of the current time bar
 ****************************************************************************/
QString TimeBarWidget::currTimeBarColor() const
{
    return commonMMI::CMLConfigurationManager::get()->getCurrentTimeColor();
}
/*!***************************************************************************
 * Method : visuWndBarsColor
 * Purpose : Color of the start, end bars and sliding and extended modes limits of the visualization window
 ****************************************************************************/
QString TimeBarWidget::visuWndBarsColor() const
{
    return "red";
}
/*!***************************************************************************
 * Method : tlShiftBarColor
 * Purpose : Color of the timeline shift indicator, the thin line visible below timelines when they are shifted from
 * their initial time position
 ****************************************************************************/
QString TimeBarWidget::tlShiftBarColor() const
{
    return "red";
}
/*!***************************************************************************
 * Method : visuWndColor
 * Purpose : Color of the visualization window area, shall be partially transparent
 ****************************************************************************/
QString TimeBarWidget::visuWndColor() const
{
    return "#30FF0000";
}

// QML communication parameters READ services
/*!***************************************************************************
 * Method : timeScaleLoaded
 * Purpose : Get timeScaleLoaded
 ****************************************************************************/
bool TimeBarWidget::timeScaleLoaded() const
{
    return _timeScaleLoaded;
}
/*!***************************************************************************
 * Method : zoomStepFactor
 * Purpose : Get zoomStepFactor
 ****************************************************************************/
qreal TimeBarWidget::zoomStepFactor() const
{
    return _zoomStepFactor;
}
/*!***************************************************************************
 * Method : dataContainerWidth
 * Purpose : Get dataContainerWidth
 ****************************************************************************/
qreal TimeBarWidget::dataContainerWidth() const
{
    return DATA_CONTAINER_WIDTH;
}
/*!***************************************************************************
 * Method : mouseCurrentPosition
 * Purpose : Get mouseCurrentPosition
 ****************************************************************************/
qint64 TimeBarWidget::mouseCurrentPosition() const
{
    return _mouseCurrentPos;
}
/*!***************************************************************************
 * Method : msSinceEpochDataContainer
 * Purpose : Get msSinceEpochDataContainer
 ****************************************************************************/
qint64 TimeBarWidget::msSinceEpochDataContainer() const
{
    return _dataContainerStartTime;
}
/*!***************************************************************************
 * Method : timeScaleLabelsWidth
 * Purpose : Get timeScaleLabelsWidth
 ****************************************************************************/
quint32 TimeBarWidget::timeScaleLabelsWidth() const
{
    return _timeScaleLabelsWidth;
}
/*!***************************************************************************
 * Method : timeLineIdxMenu
 * Purpose : Get timeLineIdxMenu
 ****************************************************************************/
TimeBarWidget::TBElt TimeBarWidget::timeLineIdxMenu() const
{
    return _timeLineIdxMenu;
}
/*!***************************************************************************
 * Method : showVisuWindowMenu
 * Purpose : Get showVisuWindowMenu
 ****************************************************************************/
bool TimeBarWidget::showVisuWindowMenu() const
{
    return _showVisuWindowMenu;
}
/*!***************************************************************************
 * Method : elementToMove
 * Purpose : Get
 ****************************************************************************/
TimeBarWidget::TBElt TimeBarWidget::elementToMove() const
{
    return _elementToMove;
}
/*!***************************************************************************
 * Method : tlToRename
 * Purpose : Get tlToRename
 ****************************************************************************/
TimeBarWidget::TBElt TimeBarWidget::tlToRename() const
{
    return _tlToRename;
}
/*!***************************************************************************
 * Method : movedEltXOfs
 * Purpose : Get movedEltXOfs
 ****************************************************************************/
qreal TimeBarWidget::movedEltXOfs() const
{
    return _movedEltXOfs;
}
/*!***************************************************************************
 * Method : elementToDrag
 * Purpose : Get elementToDrag
 ****************************************************************************/
TimeBarWidget::TBElt TimeBarWidget::elementToDrag() const
{
    return _elementToDrag;
}
/*!***************************************************************************
 * Method : latchEltXOfs
 * Purpose : Get latchEltXOfs
 ****************************************************************************/
qreal TimeBarWidget::latchEltXOfs() const
{
    return _latchEltXOfs;
}
/*!***************************************************************************
 * Method : timelineUnderMouse
 * Purpose : Get timelineUnderMouse
 ****************************************************************************/
TimeBarWidget::TBElt TimeBarWidget::timelineUnderMouse() const
{
    return _timelineUnderMouse;
}
/*!***************************************************************************
 * Method : borderColor
 * Purpose : Get borderColor
 ****************************************************************************/
QString TimeBarWidget::borderColor() const
{
    return _borderColorCurrent;
}
/*!***************************************************************************
 * Method : tlNamesContainerWidth
 * Purpose : Get tlNamesContainerWidth
 ****************************************************************************/
qint32 TimeBarWidget::tlNamesContainerWidth() const
{
    return _tlNamesContainerWidth;
}

/*!***************************************************************************
 * Method : TimeBarWidget::updateTimelineOfs
 * Purpose : Update the offset of a timeline in milliseconds
 ****************************************************************************/

void TimeBarWidget::updateTimelineOfs(TBElt id, qint64 ofs, bool redraw, bool latch)
{
    QVariant returnedValue;
    QVariant tlId;
    QVariant tlLbl;
    QVariant tlXpos;
    QVariant tlBase;
    QVariant tlWidth;
    qreal startTl;
    qreal endTl;
    QString txtLabel;
    QString labelFormat;
    QString labelLegend;
    qint64 absOfs;
    qint64 newOfs;
    QDateTime hmsOfs;
    // Set the timespec to UTC because we compute time difference, and not absolute date
    hmsOfs.setTimeSpec(Qt::UTC);

    if ( (id > TBElt_None) && (id < _timelinesData.size()) && (id < TBElt_TlMax) ) {
        // Update the offset in the timeline data        
        if( latch==true ) {
            _timelinesData[id].tlPtr->setOffset( _timelinesData[id].tlPtr->getOffset() + ofs );
            newOfs = _timelinesData[id].tlPtr->getOffset();
        } else {
            newOfs = _timelinesData[id].tlPtr->getOffset() + ofs;
        }

        // Generate the new text label for the offset of the timeline

        // Take into account the sign of the offset
        if( newOfs < 0 ) {
            txtLabel = " - ";
        } else {
            txtLabel = " + ";
        }
        absOfs = qAbs(newOfs);
        
        // Define the label time format depending on the offset value
        labelFormat = "dd";
        labelLegend = "";
        if( absOfs < NB_MILLISECONDS_IN_10SEC) {
            labelFormat = "ss.zzz";
            labelLegend = " s";
        } else {
            if( absOfs < NB_MILLISECONDS_IN_24HRS) {
                labelFormat = "HH:mm:ss";
                labelLegend = "";
            }
        }
        
        // Process differently an offset lower and greater than 24 hrs
        if( labelFormat != "dd" ) {
            hmsOfs.setMSecsSinceEpoch(absOfs);
            // Generate a label showing the number of hours, minutes and seconds
            txtLabel = txtLabel + hmsOfs.toString(labelFormat);
            txtLabel = txtLabel + labelLegend;
        } else {
            // Generate a label showing the number of days
            txtLabel = txtLabel + DAYS_UNIT_MSG.arg(qRound( static_cast<qreal>(absOfs) / NB_MILLISECONDS_IN_24HRS ));
        }
        tlId = id;
        tlLbl = txtLabel;
        
        // Call the QML function to update the text label
        QMetaObject::invokeMethod(_rootTimeWidgetObj,"updateTimelineOfsTxtLbl",Q_RETURN_ARG(QVariant, returnedValue),
                                  Q_ARG(QVariant, tlId),Q_ARG(QVariant, tlLbl));
        
        // Check if the timelines in QML shall be redraw
        if( redraw == true ) {
            // We also need to redraw the timeline, compute the parameters to give to QML
            // Sessions timelines are infinite, only dataset/recordset timelines need computation for position and width
            if( _timelinesData[id].type.value() != TlType::TL_SESSION ) {
                startTl = fromMsSinceEpochToXcoordsPx(_timelinesData[id].startTime + _timelinesData[id].tlPtr->getOffset(),
                                                      _dataContainerStartTime);
                endTl = fromMsSinceEpochToXcoordsPx(_timelinesData[id].endTime + _timelinesData[id].tlPtr->getOffset(),
                                                    _dataContainerStartTime);
                tlXpos = startTl;
                tlBase = fromMsSinceEpochToXcoordsPx(_timelinesData[id].startTime,_dataContainerStartTime);
                tlWidth = endTl - startTl;
                if( tlWidth < MIN_TIMELINE_WIDTH ) {
                    tlWidth = MIN_TIMELINE_WIDTH;
                }
            } else {
                tlXpos = 0;
                tlBase = 0;
                tlWidth = DATA_CONTAINER_WIDTH;
            }
            tlId = id;
            // Call the QML method to update the time lines positions in the model
            QMetaObject::invokeMethod(_rootTimeWidgetObj,"updateTimelines",Q_RETURN_ARG(QVariant, returnedValue),
                                      Q_ARG(QVariant, tlId),Q_ARG(QVariant, tlXpos),Q_ARG(QVariant, tlWidth),Q_ARG(QVariant, tlBase));
        }
    }
}

/*!***************************************************************************
 * Method : TimeBarWidget::TimeBarWidget
 * Purpose : Constructor
 ****************************************************************************/
TimeBarWidget::TimeBarWidget(QWidget *parent) :
    QWidget(parent),
    _ui(new Ui::TimeBarWidget),
    _view(new QQuickView())
{
    // Get the pointer to the GUI
    commonMMI::GUIApplication* application = commonMMI::GUIApplication::get();

    // Perform initialization actions to do only once for all the timebars
    if(_isFirstInit==true) {
        // Register enum types of TimeBarWidget to share them with QML
        qmlRegisterType<TimeBarWidget>("timeBarQml", 1, 0, "TBElt");
        qmlRegisterType<TimeBarWidget>("timeBarQml", 1, 0, "QmlVisuMode");
        _isFirstInit = false;
    }

    // Initialize user interface
    _ui->setupUi(this);

    // Initialize the data model pointer
    _timeBarModel = 0;

    // Initialize the TimeManager pointer
    _timeManager = 0;

    // Initialize time specification to local time
    _datesTimeSpec = Qt::LocalTime;

    // Initialize the playing speed
    _currentSpeedTxt = ONE_X_SPEED_MSG;
    _lastValidSpeedTxt = ONE_X_SPEED_MSG;
    _ui->_speedEdit->setText(ONE_X_SPEED_MSG);
    
    // Pointers initialization
    _rootTimeWidgetObj = 0;
    _sessionsDlgBox = 0;
    
    // Status variables initialization
    _timeScaleLoaded = false;
    _dataContainerStartTime = 0;
    _mouseCurrentPos = _dataContainerStartTime;
    _lastCurrentTime = 0;
    _timeScaleLabelsWidth = minTimeScaleLabelsWidth();
    _elementToMove = TBElt_None;
    _timelineUnderMouse = TBElt_None;
    _movedEltXOfs = 0;
    _latchEltXOfs = 0;
    _elementToDrag = TBElt_None;
    _tlToRename = TBElt_None;
    _populateToDo = true;
    _lastLblPos = 0;
    _tlNamesContainerWidth = TL_NAMES_CONTAINER_WIDTH_INIT;
    _pendingDataContainerOfs = 0;
    _isJavascriptModeActive = false;
    
    // Settings initialization, useful to prevent reading of not initialized data in case of non nominal behavior
    _dateFormatShort = DATE_FORMAT_SHORT_INIT;
    _dateFormatLong = DATE_FORMAT_LONG_INIT;
    _zoomStepFactor = ZOOM_STEP_FACTOR_INIT;
    _borderColorPause = BORDER_COLOR_PAUSE_INIT;
    _borderColorPast = BORDER_COLOR_PAST_INIT;
    _borderColorRealTime = BORDER_COLOR_REAL_TIME_INIT;
    _borderColorSpeedUp = BORDER_COLOR_SPEED_UP_INIT;
    _borderColorSlowDown = BORDER_COLOR_SLOW_DOWN_INIT;
    _borderColorCurrent = _borderColorPause;
    _currTimePlayLeftMargin = CURRENT_TIME_PLAY_LEFT_MARGIN_INIT;
    _currTimePlayRightMargin = CURRENT_TIME_PLAY_RIGHT_MARGIN_INIT;

    // Button group initialization
    _ui->_modeButtonGroup->setId(_ui->_normalModeButton, NORMAL_BT_GRID);
    _ui->_modeButtonGroup->setId(_ui->_extendedModeButton, EXTENDED_BT_GRID);
    _ui->_modeButtonGroup->setId(_ui->_slidingModeButton, SLIDING_BT_GRID);

    // Defining icons for the control bar
    _ui->_speedDownButton->setIcon(application->getIcon(commonMMI::Icons::FAST_REWIND));
    _ui->_speedUpButton->setIcon(application->getIcon(commonMMI::Icons::FAST_FORWARD));
    _ui->_startButton->setIcon(application->getIcon(commonMMI::Icons::PLAY).pixmap(PLAY_ICON_WIDTH, PLAY_ICON_HEIGHT));
    _ui->_normalModeButton->setIcon(application->getIcon("normal-mode.png"));
    _ui->_extendedModeButton->setIcon(application->getIcon("extended-mode.png"));
    _ui->_slidingModeButton->setIcon(application->getIcon("sliding-mode.png"));

    // Defining icons for the add buttons
    _ui->_sessionButton->setIcon(application->getIcon(commonMMI::Icons::OPEN_SESSION));
    _ui->_dataSetButton->setIcon(application->getIcon(commonMMI::Icons::ADD_DATASET));
    _ui->_recordSetButton->setIcon(application->getIcon(commonMMI::Icons::ADD_RECORDSET));
    
    // Defining text for current time and timeline labels
    _ui->_currentTimeLabel->setText("");
    _ui->_timelineTimeLabel->setText("");

    // Initialize the timelineTimeLabel color as it have to be updated depending on the timeline below the mouse
    _ui->_timelineTimeLabel->setAutoFillBackground(true);
    QPalette txtPalette = _ui->_timelineTimeLabel->palette();
    txtPalette.setColor(QPalette::WindowText, QColor(Qt::black));
    _ui->_timelineTimeLabel->setPalette(txtPalette);

    // QML configuration
    _view->rootContext()->setContextProperty("configParams", this);

    // QML integration
    _timebarArea = QWidget::createWindowContainer(_view, this);
    _ui->verticalLayout->insertWidget(1, _timebarArea);
    _timebarArea->setMinimumHeight(NB_BORDER_IN_TBAR*(borderWidth()+timelinesHeight()));
    _timebarArea->setMinimumWidth(tlOffsetsContainerWidth()+tlNamesContainerInitWidth());
    _timebarArea->setContextMenuPolicy(Qt::DefaultContextMenu);
    _qmlstatus = QQuickView::Null;

    // Defining menu actions
     _resetTimelineOfsAct = new QAction(RESET_TIMELINE_OFS_CAPTION, this);
     _resetTimelineOfsAct->setStatusTip(RESET_TIMELINE_OFS_TOOLTIP);
     _setMasterSessionAct = new QAction(SET_MASTER_SESS_CAPTION, this);
     _setMasterSessionAct->setStatusTip(SET_MASTER_SESS_TOOTIP);
     _searchInSessionAct = new QAction(SEARCH_IN_SESSION_CAPTION, this);
     // TODO : Enable search in session views action when it will be fully implemented
     _searchInSessionAct->setEnabled(false);
     _searchInSessionAct->setStatusTip(SEARCH_IN_SESSION_TOOLTIP);
     _resetVisuWindowWidthAct = new QAction(RESET_VISU_WND_WIDTH_CAPTION, this);
     _resetVisuWindowWidthAct->setStatusTip(RESET_VISU_WND_WIDTH_TOOLTIP);
     _setVisuWindowWidthAct = new QAction(SET_VISU_WND_WIDTH_CAPTION, this);
     _setVisuWindowWidthAct->setStatusTip(SET_VISU_WND_WIDTH_TOOLTIP);
     _closeTimelineAct = new QAction(CLOSE_TIMELINE_CAPTION, this);
     _closeTimelineAct->setStatusTip(CLOSE_TIMELINE_TOOLTIP);
     _closeTimebarAct = new QAction(CLOSE_TIMEBAR_CAPTION, this);
     _closeTimebarAct->setStatusTip(CLOSE_TIMEBAR_TOOLTIP);
   
    // Defining context menus
    _showVisuWindowMenu = false;
    _tbContextMenu = new QMenu(this);
    _tbContextMenu->addAction(_resetVisuWindowWidthAct);
    _tbContextMenu->addAction(_setVisuWindowWidthAct);
    _tbContextMenu->addAction(_closeTimebarAct);
    _timeLineIdxMenu = TBElt_None;
    _dataSetContextMenu = new QMenu(this);
    _dataSetContextMenu->addAction(_resetTimelineOfsAct);
    _dataSetContextMenu->addAction(_resetVisuWindowWidthAct);
    _dataSetContextMenu->addAction(_setVisuWindowWidthAct);
    _dataSetContextMenu->addAction(_closeTimelineAct);
    _sessionsContextMenu = new QMenu(this);
    _sessionsContextMenu->addAction(_resetTimelineOfsAct);
    _sessionsContextMenu->addAction(_setMasterSessionAct);
    _sessionsContextMenu->addAction(_searchInSessionAct);
    _sessionsContextMenu->addAction(_resetVisuWindowWidthAct);
    _sessionsContextMenu->addAction(_setVisuWindowWidthAct);
    _sessionsContextMenu->addAction(_closeTimelineAct);
    _masterSessContextMenu = new QMenu(this);
    _masterSessContextMenu->addAction(_resetVisuWindowWidthAct);
    _masterSessContextMenu->addAction(_setVisuWindowWidthAct);
    _masterSessContextMenu->addAction(_searchInSessionAct);
    _masterSessContextMenu->addAction(_closeTimelineAct);

    // Connecting signals with slots
    connect(_resetTimelineOfsAct, &QAction::triggered, this, &TimeBarWidget::resetTimelineOffset);
    connect(_setMasterSessionAct, &QAction::triggered, this, &TimeBarWidget::setMasterSession);
    connect(_searchInSessionAct, &QAction::triggered, this, &TimeBarWidget::searchInSession);
    connect(_resetVisuWindowWidthAct, &QAction::triggered, this, &TimeBarWidget::resetVisuWindowWidth);
    connect(_setVisuWindowWidthAct, &QAction::triggered, this, &TimeBarWidget::setVisuWindowWidth);
    connect(_closeTimelineAct, &QAction::triggered, this, &TimeBarWidget::closeTimeline);
    connect(_closeTimebarAct, &QAction::triggered, this, &TimeBarWidget::closeTimebar);
    connect(_ui->_sessionButton, &QToolButton::clicked, this, &TimeBarWidget::openSession);
    connect(_ui->_dataSetButton, &QToolButton::clicked, this, &TimeBarWidget::fileChooser);
    connect(_ui->_recordSetButton, &QToolButton::clicked, this, &TimeBarWidget::fileChooser);
    connect(_ui->_startButton, &QToolButton::clicked, this, &TimeBarWidget::pauseOrPlay);
    connect(_ui->_speedDownButton, &QToolButton::clicked, this, &TimeBarWidget::speedDown);
    connect(_ui->_speedUpButton, &QToolButton::clicked, this, &TimeBarWidget::speedUp);
    connect(_ui->_realTimeButton, &QToolButton::clicked, this, &TimeBarWidget::catchUpRealTime);
    connect(_ui->_normalModeButton, &QToolButton::clicked, this, &TimeBarWidget::switchToNormalMode);
    connect(_ui->_extendedModeButton, &QToolButton::clicked, this, &TimeBarWidget::switchToExtendedMode);
    connect(_ui->_slidingModeButton, &QToolButton::clicked, this, &TimeBarWidget::switchToSlidingMode);    
    connect(_ui->_speedEdit, &QLineEdit::textChanged, this, &TimeBarWidget::speedTxtChanged); 
    connect(_ui->_speedEdit, &QLineEdit::editingFinished, this, &TimeBarWidget::speedTxtEntered);
    connect(_view, &QQuickView::statusChanged, this, &TimeBarWidget::qmlStatusChanged);
    connect(_view, &QWindow::widthChanged, this, &TimeBarWidget::widthChanged);
    
    // Disable playing button until timeline is loaded
    _ui->_startButton->setEnabled(false);
    _ui->_realTimeButton->setEnabled(false);
}

/*!***************************************************************************
 * Method : TimeBarWidget::~TimeBarWidget
 * Purpose : Destructor
 ****************************************************************************/
TimeBarWidget::~TimeBarWidget()
{
    try {
        // Disconnect signals
        if(_view) {
            disconnect(_view, &QQuickView::statusChanged, this, &TimeBarWidget::qmlStatusChanged);
            disconnect(_view, &QWindow::widthChanged, this, &TimeBarWidget::widthChanged);
        }
        // Data model signals
        if(_timeBarModel) {
            disconnect(_timeBarModel, &timeBarsModel::TimeBar::visualizationModeModified, this, &TimeBarWidget::visualizationModeModified);
            disconnect(_timeBarModel, &timeBarsModel::TimeBar::isRealTimeModified, this, &TimeBarWidget::isRealTimeModified);
            disconnect(_timeBarModel, &timeBarsModel::TimeBar::visualizationSpeedModified
                    , this, &TimeBarWidget::visualizationSpeedModified);
            disconnect(_timeBarModel, &timeBarsModel::TimeBar::isPlayingModified, this, &TimeBarWidget::isPlayingModified);
            disconnect(_timeBarModel, &timeBarsModel::TimeBar::currentTimeModified, this, &TimeBarWidget::currentTimeModified);
        }
        // TimeManager signals
        if(_timeManager) {
            disconnect(_timeManager, &TimeManager::timelinesIdsUpdated, this, &TimeBarWidget::updateTimelinesIds);
            disconnect(_timeManager, &TimeManager::timelinesOfsUpdated, this, &TimeBarWidget::updateTimelinesOffsets);
        }

        // Delete the TimeManager
        TimeManagers::get()->deleteTimeManager(_timeManager->objectName());
        _timeManager = 0;

        // Delete the created objects
        delete _dataSetContextMenu;
        delete _sessionsContextMenu;
        delete _masterSessContextMenu;
        delete _tbContextMenu;
        delete _resetVisuWindowWidthAct;
        delete _resetTimelineOfsAct;
        delete _setMasterSessionAct;
        delete _setVisuWindowWidthAct;
        delete _closeTimelineAct;
        delete _closeTimebarAct;
        delete _searchInSessionAct;
        delete _view;
        delete _ui;
    }
    catch (...) { // %RELAX<Pr.Instruction> RME DV14 TBC_CNES Logiscope false alarm: catch block
    }
}

/*!***************************************************************************
 * Method : TimeBarWidget::widgetUpdate
 * Purpose : Trigger the timebar that the widget is updated
 ****************************************************************************/
void TimeBarWidget::widthChanged(core::INT32 width)
{
    // If populate have been done
    if( _populateToDo == false ) {
        // Update the dataContainer position
        setmsSinceEpochDataContainer( _timeBarModel->getTimeBarLeftBorderTimeInMsSinceEpoch() - fromPxtoMs(DATA_CONTAINER_LEFT_MARGIN) );
    }
}

/*!***************************************************************************
 * Method : TimeBarWidget::qmlStatusChanged
 * Purpose : Trigger the timebar that the QML loading status has changed
 ****************************************************************************/
void TimeBarWidget::qmlStatusChanged(QQuickView::Status status)
{
    // Latch the new status in memory
    _qmlstatus = status;

    // If the QML is loaded, write to pointer to access it
    if(status==QQuickView::Ready) {
        _rootTimeWidgetObj = _view->rootObject();
    }
    if(status==QQuickView::Error) {
        QListIterator<QQmlError> iter(_view->errors());
        while(iter.hasNext()) {
            LOF_ERROR(QML_LOAD_ERROR_MSG.arg(iter.next().toString()).arg(this->objectName()));
        }
    }

    // If the populate hasn't been done but already requested, do it now
    if( (_populateToDo == true) && (status==QQuickView::Ready) && (_timeBarModel) ) {
        populate(_timeBarModel);
    }
}

/*!***************************************************************************
 * Method : TimeBarWidget::populate
 * Purpose : Populate visualization window from data model
 ****************************************************************************/
void TimeBarWidget::populate(timeBarsModel::TimeBar *tb, commonMMI::keyValConfHash * config)
{
    // Variable for timeline data storage
    timelineData timelinedata;
    QDateTime date;
    core::BOOL masterSessionFound=false;
    core::INT32 tlIdx = 0;
    core::INT32 addedTlIdx=-1;
    TlType tlType(TlType::TL_SESSION);
    core::UINT32 socketID = 0;
    core::BOOL socketIdValid = false;

    // If not known, save the TimeBar data model and give it to the QML
    if((tb) && (!_timeBarModel)) {
        QUrl url(commonMMI::GUIApplication::RSRC_SEARCH + ":" + QML_REL_PATH);
        // Save the data model pointer
        _timeBarModel = tb;

        // Set QML context property to access data model
        _view->rootContext()->setContextProperty("dataModel", _timeBarModel);

        // QML loading
        _qmlstatus = QQuickView::Null;
        _view->setSource(url);
        _view->setResizeMode(QQuickView::SizeRootObjectToView);

        // Retrieve the javascript socket configuration if any
        if(config->contains(SOCKET_ID_KEY)) {
        	socketID = config->value(SOCKET_ID_KEY).toInt(&socketIdValid);
            // Invalid the socket id if the conversion from string failed
            if(socketIdValid == false) {
            	socketID = 0;
            } else {
            	// activate the javascript mode
            	_isJavascriptModeActive = true;
            }
        }
        // Create a TimeManager for this widget
        _timeManager = TimeManagers::get()->createTimeManager(_timeBarModel,socketID);

        // Disable timeline opening and closing in javascript mode
        if(_isJavascriptModeActive) {
        	_ui->_sessionButton->setEnabled(false);
    		_ui->_dataSetButton->setEnabled(false);
    		_ui->_recordSetButton->setEnabled(false);
    		_closeTimelineAct->setEnabled(false);
        }
    }

    // If a configuration is given, read it
    if(config) {
        // Get the timebar settings from the given configuration
        if(config->contains(DATE_FORMAT_SHORT_KEY)) {
            _dateFormatShort = config->value(DATE_FORMAT_SHORT_KEY);
        }
        if(config->contains(DATE_FORMAT_LONG_KEY)) {
            _dateFormatLong = config->value(DATE_FORMAT_LONG_KEY);
        }
        if(config->contains(ZOOM_STEP_FACTOR_KEY)) {
            _zoomStepFactor = config->value(ZOOM_STEP_FACTOR_KEY).toDouble();
        }
        if(config->contains(CURRENT_TIME_PLAY_LEFT_MARGIN_KEY)) {
            _currTimePlayLeftMargin = config->value(CURRENT_TIME_PLAY_LEFT_MARGIN_KEY).toDouble();
        }
        if(config->contains(CURRENT_TIME_PLAY_RIGHT_MARGIN_KEY)) {
            _currTimePlayRightMargin =  config->value(CURRENT_TIME_PLAY_RIGHT_MARGIN_KEY).toDouble();
        }
        if(config->contains(BORDER_COLOR_PAUSE_KEY)) {
            _borderColorPause = config->value(BORDER_COLOR_PAUSE_KEY);
            if( !QColor(_borderColorPause).isValid() ) {
                LOF_INFO(INVALID_PAUSE_COLOR_MSG.arg(_borderColorPause));
                _borderColorPause = BORDER_COLOR_PAUSE_INIT;
            }
        }
        if(config->contains(BORDER_COLOR_PAST_KEY)) {
            _borderColorPast = config->value(BORDER_COLOR_PAST_KEY);
            if( !QColor(_borderColorPast).isValid() ) {
                LOF_INFO(INVALID_PAST_COLOR_MSG.arg(_borderColorPast));
                _borderColorPast = BORDER_COLOR_PAST_INIT;
            }
        }
        if(config->contains(BORDER_COLOR_REAL_TIME_KEY)) {
            _borderColorRealTime = config->value(BORDER_COLOR_REAL_TIME_KEY);
            if( !QColor(_borderColorRealTime).isValid() ) {
                LOF_INFO(INVALID_RT_COLOR_MSG.arg(_borderColorRealTime));
                _borderColorRealTime = BORDER_COLOR_REAL_TIME_INIT;
            }
        }
        if(config->contains(BORDER_COLOR_SPEED_UP_KEY)) {
            _borderColorSpeedUp = config->value(BORDER_COLOR_SPEED_UP_KEY);
            if( !QColor(_borderColorSpeedUp).isValid() ) {
                LOF_INFO(INVALID_SPEED_UP_COLOR_MSG.arg(_borderColorSpeedUp));
                _borderColorSpeedUp = BORDER_COLOR_SPEED_UP_INIT;
            }
        }
        if(config->contains(BORDER_COLOR_SLOW_DOWN_KEY)) {
            _borderColorSlowDown = config->value(BORDER_COLOR_SLOW_DOWN_KEY);
            if( !QColor(_borderColorSlowDown).isValid() ) {
                LOF_INFO(INVALID_SLOWDOWN_COLOR_MSG.arg(_borderColorSlowDown));
                _borderColorSlowDown = BORDER_COLOR_SLOW_DOWN_INIT;
            }
        }
        // Border color current is equal to border color pause because we assume that the timebar is paused at startup, if not,
        // this will be taken into account upon data model read
        _borderColorCurrent = _borderColorPause;
    }

    // Update pointer to QML
    if(_rootTimeWidgetObj==0) {
        _rootTimeWidgetObj = _view->rootObject();
    }

    // If all is ready to populate the QML
    if( (_populateToDo == true) && (_qmlstatus==QQuickView::Ready) ) {
        // Set a name to QML object for test purpose
        _view->setObjectName(QString("timeBarQmlFrame_%1").arg(_timeBarModel->getName()));
        _timebarArea->setObjectName(QString("timeBarQmlWidget_%1").arg(_timeBarModel->getName()));

        // Record the current time initial position
        _lastCurrentTime = _timeBarModel->getCurrentTime();

        // Initialize the drag on going flag
        _timeBarModel->setIsDragOnGoing(false);

        // Read and convert the time specification
        if( _timeBarModel->getTimeSpec().compare("OffsetFromUTC",Qt::CaseInsensitive) == 0 ) {
            _datesTimeSpec = Qt::OffsetFromUTC;
        } else if( _timeBarModel->getTimeSpec().compare("UTC",Qt::CaseInsensitive) == 0 ) {
            _datesTimeSpec = Qt::UTC;
        } else {
            // Qt::LocalTime
            _datesTimeSpec = Qt::LocalTime;
        }

        // Set start date to the current one minus 1 year at 0h00m00
        date = QDateTime(QDate(QDate::currentDate().year()-1,QDate::currentDate().month(),QDate::currentDate().day()));

        // Open the timelines stored in the data model
        for(tlIdx=0;tlIdx<_timeBarModel->getTimelines()->getTimelines().size();tlIdx++) {
            timelinedata.tlPtr = _timeBarModel->getTimelines()->getTimelines().value(tlIdx);
            tlType = TlType(TlType::TL_SESSION);
            timelinedata.isMaster = false;
            timelinedata.color = generateColorFromName(timelinedata.tlPtr->getName());
            // Check if it is a session or a dataset/recordset
            if(timelinedata.tlPtr->getType().compare(tlType.name())==0) {
                timelinedata.type = tlType;
                // For sessions, start and end time are arbitrary, because the drawn timelines are infinite, only the offset is usefull
                timelinedata.startTime = date.toMSecsSinceEpoch();
                timelinedata.endTime = timelinedata.startTime + NB_MILLISECONDS_IN_24HRS;
                if(tlIdx == _timeBarModel->getMasterSession()) {
                    masterSessionFound = true;
                    timelinedata.isMaster = true;
                }
            } else {
                tlType = TlType(TlType::TL_DATASET);
                if(timelinedata.tlPtr->getType().compare(tlType.name())==0) {
                    timelinedata.type = tlType;
                    // TODO : update this initialization with actual read of dataset in datastore :
                    timelinedata.startTime = date.toMSecsSinceEpoch();
                    timelinedata.endTime = QDateTime(QDateTime::currentDateTime()).toMSecsSinceEpoch() + NB_MILLISECONDS_IN_24HRS;
                }
                tlType = TlType(TlType::TL_RECORDSET);
                if(timelinedata.tlPtr->getType().compare(tlType.name())==0) {
                    timelinedata.type = tlType;
                    // TODO : update this initialization with actual read of recordset in datastore
                    timelinedata.startTime = QDateTime(QDateTime::currentDateTime()).toMSecsSinceEpoch();
                    timelinedata.endTime = timelinedata.startTime + NB_MILLISECONDS_IN_24HRS;
                }
            }
            // Add the session timeline to QML
            addedTlIdx = insertTimeLine(&timelinedata, timelinedata.tlPtr->getName(), timelinedata.tlPtr->getRef());

            // Apply the timeline offset from the data model if the timeline addition was successful
            if( addedTlIdx >=0 ) {
                // ofs field is set to 0 because this field is added to the data model offset by the updateTimelineOfs function and
                // we don't want to add additional offset in this case
                updateTimelineOfs(static_cast<TBElt>(addedTlIdx),0, true,false);
            }
        }

        // Connect signals with slots
        connect(_timeBarModel, &timeBarsModel::TimeBar::visualizationModeModified, this, &TimeBarWidget::visualizationModeModified);
        connect(_timeBarModel, &timeBarsModel::TimeBar::isRealTimeModified, this, &TimeBarWidget::isRealTimeModified);
        connect(_timeBarModel, &timeBarsModel::TimeBar::visualizationSpeedModified, this, &TimeBarWidget::visualizationSpeedModified);
        connect(_timeBarModel, &timeBarsModel::TimeBar::isPlayingModified, this, &TimeBarWidget::isPlayingModified);
        connect(_timeBarModel, &timeBarsModel::TimeBar::currentTimeModified, this, &TimeBarWidget::currentTimeModified);

        // Connect to TimeManager to take into account granted access to infrastructure
        connect(_timeManager, &TimeManager::timelinesIdsUpdated, this, &TimeBarWidget::updateTimelinesIds);
        connect(_timeManager, &TimeManager::timelinesOfsUpdated, this, &TimeBarWidget::updateTimelinesOffsets);

        // If a session has been found, enable real-time
        if(masterSessionFound==true) {
            _ui->_realTimeButton->setEnabled(true);
        }

        // Call the update signals to let the timebar notification service take data model into account,
        // order is very important due to relationship between parameters
        visualizationModeModified();
        isPlayingModified();
        isRealTimeModified();
        // Call visualizationSpeedModified to update the border color according to visualization speed
        visualizationSpeedModified();

        // Update the dataContainer position according to data model
        setmsSinceEpochDataContainer( _timeBarModel->getTimeBarLeftBorderTimeInMsSinceEpoch() - fromPxtoMs(DATA_CONTAINER_LEFT_MARGIN) );

        // Record that populate have been done
        _populateToDo = false;

        // Emit the signal to initialize another timebar
        emit timeBarReady();
    }
}

/*!***************************************************************************
 * Method : TimeBarWidget::updateTimelinesIds
 * Purpose : Called when timelines identifiers have been updated due to granted access to infrastrcture
 ****************************************************************************/
void TimeBarWidget::updateTimelinesIds()
{
    core::INT32 i;
    core::INT32 posForInsert;
    core::INT32 insertedPos;
    core::INT32 tlToAddIdx;
    timeBarsModel::Timeline* tlToCheck;

    // Check if there is postponed timeline additions
    if(!_tlToAdd.isEmpty()) {
        posForInsert=0;
        tlToAddIdx=0;
        // Check all the timelines in the data model to see which ones can be inserted
        for(i=0;(i<_timeBarModel->getTimelines()->getTimelines().size()) && (tlToAddIdx<_tlToAdd.size());i++) {
            // Check if this timeline is one of the postponed ones
            tlToCheck = _timeBarModel->getTimelines()->getTimelines()[i];
            if(tlToCheck == _tlToAdd[tlToAddIdx].tlPtr) {
                // Try to insert the timeline, if it is not possible, -1 will be returned,
                // no need to give name and ref because they are already in data model
                insertedPos = insertTimeLine(&_tlToAdd.first(),"","",posForInsert);
                if(insertedPos!=-1) {
                    // Remove the timeline from the list
                    _tlToAdd.removeAt(tlToAddIdx);
                    // Increment the insertion position because we just inserted a timeline
                    posForInsert++;
                } else {
                    tlToAddIdx++;
                }
            } else {
                // Increment the insertion position because this mean that this timeline is already present in local and QML models
                posForInsert++;
            }
        }
    }

    // Clear our side of session list
    _sessionsList.clear();
    // Update the session list
    _timeManager->getSessionsList(&_sessionsList);
    // Sort by names the sessions list
    std::sort(_sessionsList.begin(),_sessionsList.end(),sessionDataComp);

    // Check if there is the session dialog box open to update its content
    if(_sessionsDlgBox) {
        // Check if the dialog box is visible, which mean that we can update its content one the fly
        if(_sessionsDlgBox->isVisible()) {
            // Look for the sessions list widget
            QListWidget * sessionsListWidget = _sessionsDlgBox->findChild<QListWidget*>("sessionsList");

            if(sessionsListWidget) {
                // Compare one by one all the element of the received session list and QListWidget and add or remove the necessary elements
                core::INT32 widgetIdx=0;
                i=0;
                while( i<_sessionsList.size() ) {
                    if(sessionsListWidget->item(widgetIdx)) {
                        if(_sessionsList[i].name.compare(sessionsListWidget->item(widgetIdx)->text()) < 0) {
                            // The item in session list is higher in alphabetical order than the one in the widget,
                            // add the one of the session list (new session)
                            sessionsListWidget->insertItem(widgetIdx,_sessionsList[i].name);
                            widgetIdx++;
                            i++;
                        } else {
                            if(_sessionsList[i].name.compare(sessionsListWidget->item(widgetIdx)->text()) == 0) {
                                // Both list have the same element, nothing to do, continue with next element
                                widgetIdx++;
                                i++;
                            } else {
                                // The item in session list is lower in alphabetical order than the one in the widget,
                                // remove the one of the widget (not more existing)
                                if(_sessionsList[i].name.compare(sessionsListWidget->item(widgetIdx)->text()) > 0) {
                                    sessionsListWidget->takeItem(widgetIdx);
                                }
                            }
                        }
                    } else {
                        // No more element to compare in the QListWidget, so simply add the new ones at the end
                        sessionsListWidget->addItem(_sessionsList[i].name);
                        widgetIdx++;
                        i++;
                    }
                }

                // Refresh the dialog box
                sessionsListWidget->update();
            }
        }
    }
}

/*!***************************************************************************
 * Method : TimeBarWidget::updateTimelinesOffsets
 * Purpose : Called when timelines offsets have been updated by TimeManager
 ****************************************************************************/
void TimeBarWidget::updateTimelinesOffsets()
{
    // Update the offset text label and base position for each timeline
    for(core::INT32 i=0;i<_timelinesData.size();i++) {
        // Don't latch the offset because this is not the actual one, and don't redraw the timeline, only its offset text label
        // Put zero as ofs parameter value because this value is added to the offset of the data model, and we don't need to add it here
        updateTimelineOfs(static_cast<TBElt>(i), 0, false, false);
    }
    // Update msSinceEpochDataContainer in order to keep the same position on screen for all timebar elements
    setmsSinceEpochDataContainer(msSinceEpochDataContainer() - _pendingDataContainerOfs);
}

/*!***************************************************************************
 * Method : TimeBarWidget::hideEvent
 * Purpose : The handler of the widget hide action by the user
 ****************************************************************************/
void TimeBarWidget::hideEvent(QHideEvent * event)
{
    // Nothing to do for the moment because no configuration need to be saved, all saved values are in data model
}

/*!***************************************************************************
 * Method : TimeBarWidget::closeEvent
 * Purpose : The handler of the widget closing action by the user
 ****************************************************************************/
void TimeBarWidget::closeEvent(QCloseEvent * event)
{
    // Never called because the timebar widget is a DockWidget and they are not closed but
    // hidden by the cross button of their upper right corner
}

/*!***************************************************************************
 * Method : TimeBarWidget::closeTimebar
 * Purpose : Manage the closing of the timebar action in context menu
 ****************************************************************************/
void TimeBarWidget::closeTimebar()
{
    if( QMessageBox::warning(this,CLOSE_TIMEBAR_MSG.arg(_timeBarModel->getName()),CLOSE_TIMEBAR_CONFIRMATION_MSG,
                             (QMessageBox::Yes|QMessageBox::Cancel),QMessageBox::Cancel) == QMessageBox::Yes) {
        // Remove all the timelines from the timebar
        while(_timelinesData.size()) {
            removeTimeline(0);
        }
        // Ask the main application to remove the time bar from the data model,
        // this will trigger correct objects destruction in mainApplicationMMIBundle and TimeManagers
        emit timeBarToClose(_timeBarModel);
    }
}

/*!***************************************************************************
 * Method : TimeBarWidget::wheelEvent
 * Purpose : The handler of the mouse wheel action by the user
 ****************************************************************************/
void TimeBarWidget::wheelEvent(QWheelEvent * event)
{
    // Test show that event->angleDelta().y() is either +120 or -120 depending on the scrolling direction
    // Mouse Wheel event not used here because it is in the QML container
}

/*!***************************************************************************
 * Method : TimeBarWidget::contextMenuEvent
 * Purpose : The requester to show the context menu at right click in timeBar
 ****************************************************************************/
void TimeBarWidget::contextMenuEvent(QContextMenuEvent * event)
{
    // Upon a right click in the Widget (outside the QML area), show up the time bar context menu
    _tbContextMenu->exec(QCursor::pos());
}

/*!***************************************************************************
 * Method : TimeBarWidget::dragEnterEvent
 * Purpose : Action triggered when entering the event in the view
 ****************************************************************************/
void TimeBarWidget::dragEnterEvent(QDragEnterEvent * event)
{
    event->acceptProposedAction();
    // Not implemented, this is only a stub
}

/*!***************************************************************************
 * Method : TimeBarWidget::dragMoveEvent
 * Purpose : Action triggered when moving the item in the view
 ****************************************************************************/
void TimeBarWidget::dragMoveEvent(QDragMoveEvent * event)
{
    event->accept();
    // Not implemented, this is only a stub
}

/*!***************************************************************************
 * Method : TimeBarWidget::dropEvent
 * Purpose : Action triggered when dropping an item in the view
 *****************************d***********************************************/
void TimeBarWidget::dropEvent(QDropEvent *event)
{
    QList<QUrl> urlList;
    QString fName;
    QFileInfo info;

    // Not implemented, this is only a stub
    event->acceptProposedAction();

    if (event->mimeData()->hasUrls()) {
        urlList = event->mimeData()->urls();
        if (urlList.size() > 0) {
            fName = urlList[0].toLocalFile();
            info.setFile(fName);
            openSet(info.fileName());
        }
    }
}

/*!***************************************************************************
 * Method : TimeBarWidget::setVisuWindowWidth
 * Purpose : Manage the selection of the set visualization window width action in context menu
 ****************************************************************************/
void TimeBarWidget::setVisuWindowWidth()
{
    // Dialog boxes
    bool isDlgBoxOk;
    bool isNegative;
    // Error message box
    QMessageBox errMsgBox(this);
    // Time variable
    qint64 timeOffset;
    QDateTime eltPos;
    qint64 nbDays;

    // Create the text version of the default visualization window width
    // Extract the signed number of days
    nbDays = _timeBarModel->getDefaultVisuWindowWidth() / NB_MILLISECONDS_IN_24HRS;
    isNegative = false;
    // Extract the unsigned fractional time duration smaller than 1 day
    timeOffset = qAbs(_timeBarModel->getDefaultVisuWindowWidth()) % NB_MILLISECONDS_IN_24HRS;
    // Set the timespec to UTC because we compute time difference, and not absolute date
    eltPos.setTimeSpec(Qt::UTC);
    eltPos.setMSecsSinceEpoch(timeOffset);
    // Display input text dialog box to ask the offset
    isDlgBoxOk = getDurationWithDialogBox(DEFAULT_VISU_WIND_WIDTH_MSG,NB_DAYS_CAPTION_MSG, FRACT_PART_CAPTION_MSG,
                                          &nbDays, &eltPos,&isNegative);

    // If the user close the dialog box with Ok
    if (isDlgBoxOk) {
        // If the entered width is not valid, display the error dialog box
        if( (isNegative == true) || (nbDays < 0) ) {
            errMsgBox.setText(INCORRECT_DEFAULT_VISU_WND_WIDTH_MSG);
            errMsgBox.setDetailedText(NEGATIVE_DEFAULT_VISU_WND_WIDTH_MSG);
            errMsgBox.setIcon(QMessageBox::Critical);
            errMsgBox.setStandardButtons(QMessageBox::Ok);
            errMsgBox.setDefaultButton(QMessageBox::Ok);
            errMsgBox.exec();
        } else {
            // Get the number of ms represented by the hh:mm:ss.zzz part of the duration, UTC is used because we deal with time difference,
            // not absolute date
            qint64 newEltTime = eltPos.toMSecsSinceEpoch();
            // Compute the whole duration in millisecond by adding the number of days (because this number cannot be negative)
            newEltTime = newEltTime + NB_MILLISECONDS_IN_24HRS*nbDays;
            // Update the default visualization window width
            _timeBarModel->setDefaultVisuWindowWidth(newEltTime);
        }
    }


}

/*!***************************************************************************
 * Method : TimeBarWidget::resetVisuWindowWidth
 * Purpose : Manage the selection of the reset visualization window width action in context menu
 ****************************************************************************/
void TimeBarWidget::resetVisuWindowWidth()
{
    // Compute the relative position of the current time bar to keep it in visualization window with new width
    qint64 curr = _timeBarModel->getCurrentTime();
    qreal width = (qreal)(_timeBarModel->getEndTime() - _timeBarModel->getStartTime());
    qreal newWidth = (qreal)(_timeBarModel->getDefaultVisuWindowWidth());
    qreal startToCurrRatio = (qreal)(curr - _timeBarModel->getStartTime()) / width;
    qreal lowSldLimToCurrRatio = (qreal)(curr - _timeBarModel->getLowerSlideLimit()) / width;
    qreal currToUpSldLimRatio = (qreal)(_timeBarModel->getUpperSlideLimit() - curr) / width;
    qreal currToEndRatio = (qreal)(_timeBarModel->getEndTime() - curr) / width;
    qreal currToExtLimRatio = (qreal)(_timeBarModel->getUpperExtendedLimit() - curr) / width;

    // Resize the visualization window around the currentTime without moving it
    _timeManager->setvisuWindowPos(curr - qRound64(newWidth * startToCurrRatio),
                                   curr + qRound64(newWidth * currToEndRatio),
                                   curr,
                                   curr - qRound64(newWidth * lowSldLimToCurrRatio),
                                   curr + qRound64(newWidth * currToUpSldLimRatio),
                                   curr + qRound64(newWidth * currToExtLimRatio)
                                   );
}

/*!***************************************************************************
 * Method : TimeBarWidget::resetTimelineOffset
 * Purpose : Manage the selection of the reset timeline offset action in context menu
 ****************************************************************************/
void TimeBarWidget::resetTimelineOffset()
{
    if( (_timeLineIdxMenu > TBElt_None) && (_timeLineIdxMenu<_timelinesData.size()) ) {
        // Call updateTimelineOfs with offset equal to the opposit of current one because
        // this service add the ofs parameter to the value from data model
        // Also ask for data model update and redraw of timeline
        updateTimelineOfs(_timeLineIdxMenu, -(_timelinesData[_timeLineIdxMenu].tlPtr->getOffset()), true,true);
     }
}

/*!***************************************************************************
 * Method : TimeBarWidget::searchInSession
 * Purpose : Manage the forward with timeline id of the request to search in all views of a session
 ****************************************************************************/
void TimeBarWidget::searchInSession()
{
    // Check the timeline id validity
    if( (_timeLineIdxMenu > TBElt_None) && (_timeLineIdxMenu<_timelinesData.size()) ) {
        // Emit the signal to forward the search request with the corresponding timeline id
        emit searchInSessionViews(_timelinesData[_timeLineIdxMenu].uniqueId);
     }
}

/*!***************************************************************************
 * Method : TimeBarWidget::setMasterSession
 * Purpose : Manage the selection of the set master session action in context menu
 ****************************************************************************/
void TimeBarWidget::setMasterSession()
{
    QList<timeBarsModel::Timeline*> tl_list;
    QVariant returnedValue;
    QVariant inputIdxMenu=_timeLineIdxMenu;
    core::INT32 i;
    core::INT32 dmIdx;
    qint64 masterSessOldOfs = 0;

    if( (_timeLineIdxMenu > TBElt_None) && (_timeLineIdxMenu < _timelinesData.size()) ) {
        // As we have only one master session, first reset the status of previous master session
        for(i=0;i<_timelinesData.size();i++) {
            if( _timelinesData[i].isMaster == true ) {
                _timelinesData[i].isMaster = false;
            }
        }
        // Set the selected session as master in local model
        _timelinesData[_timeLineIdxMenu].isMaster = true;
        masterSessOldOfs = _timelinesData[_timeLineIdxMenu].tlPtr->getOffset();

        // Look for the index of this new master session in data model
        // Get the list of timelines from the data model, it can be longer than the local list _timelinesData due
        // to potential not accessible sessions which have be added to the local list
        tl_list = _timeBarModel->getTimelines()->getTimelines();
        dmIdx = tl_list.indexOf(_timelinesData[_timeLineIdxMenu].tlPtr);
        // Check if the retrieved index is valid
        if(dmIdx>=0) {
            // Record the offset to apply to dataContainer start position when TimeManager will trigger this widget
            _pendingDataContainerOfs = masterSessOldOfs;

            // Record the expected new current time position to prevent this widget from taking into account the
            // current time position update related to this change of master session
            _lastCurrentTime = _timeBarModel->getCurrentTime() - masterSessOldOfs;

            // Update the master session index in data model
            _timeBarModel->setMasterSession(dmIdx);

            // Trigger TimeManager about the master session update
            _timeManager->setMasterSession(_timelinesData[_timeLineIdxMenu].tlPtr);

            // Enable if necessary the Real-time button
            if(!_ui->_realTimeButton->isEnabled()) {
                _ui->_realTimeButton->setEnabled(true);
            }
        }
        // Call the QML method to update the master session index in the QML timelines model
        QMetaObject::invokeMethod(_rootTimeWidgetObj,"setSessionAsMaster",Q_RETURN_ARG(QVariant, returnedValue),
                                  Q_ARG(QVariant, inputIdxMenu));
    }
}

/*!***************************************************************************
 * Method : TimeBarWidget::closeTimeline
 * Purpose : Manage the closing of a timeline action in context menu
 ****************************************************************************/
void TimeBarWidget::closeTimeline()
{
    // Check if the QML set the Id of the timeline corresponding to this user action
    if( (_timeLineIdxMenu > TBElt_None) && (_timeLineIdxMenu < _timelinesData.size()) ) {
        // Trigger timeline removal from local, main and qml data models
        removeTimeline(_timeLineIdxMenu);
    }
}

/*!***************************************************************************
 * Method : TimeBarWidget::speedTxtEntered
 * Purpose : Take into account the new displaying speed entered by the user
 ****************************************************************************/
void TimeBarWidget::speedTxtEntered()
{
    core::C_FLOAT newSpeed = _currentSpeedTxt.toFloat();
    // Check entered speed validity
    if( (newSpeed >= SPEED_MIN) && (newSpeed <= SPEED_MAX)) {
        // Update the visualization speed by rounding the speed in a Float to a single digit precision
        _timeBarModel->setVisualizationSpeed(
                          static_cast<core::C_FLOAT>( qRound( ROUNDING_FACTOR_PLAYING_SPEED * newSpeed ) ) / ROUNDING_FACTOR_PLAYING_SPEED
                          );
    } else {
        // Replace invalid speed in the text label by the last valid one
        _ui->_speedEdit->setText(_lastValidSpeedTxt);
    }
}

/*!***************************************************************************
 * Method : TimeBarWidget::speedTxtChanged
 * Purpose : Store the new displaying speed entered by the user
 ****************************************************************************/
void TimeBarWidget::speedTxtChanged(const QString & text)
{
    // This service is called for validation purpose each time the user type a character
    // As no "on the fly" validation is necessary, we only store the entered text and wait for Enter key to be pressed to
    // validate the new value inside speedTxtEntered() service
    _currentSpeedTxt = text;
}

/*!***************************************************************************
 * Method : TimeBarWidget::openSet
 * Purpose : Open a recordset or a dataset
 ****************************************************************************/
void TimeBarWidget::openSet(const QString & filename)
{
    // Error message box
    QMessageBox errMsgBox(this);
    // Variable for session data storage
    timelineData timelinedata;
    bool xmlFileValid=false;
    QDateTime date;
    QString name;
    QString ref;

    // TODO : update this initialization with actual read of dataset/recordset xml data file
    if(filename.contains("data",Qt::CaseInsensitive)) {
        name = "Dataset";
        timelinedata.type = TlType(TlType::TL_DATASET);
        date = QDateTime(QDate(QDate::currentDate().year()-1,QDate::currentDate().month(),QDate::currentDate().day()));
        timelinedata.startTime = date.toMSecsSinceEpoch();
        timelinedata.endTime = QDateTime(QDateTime::currentDateTime()).toMSecsSinceEpoch() + NB_MILLISECONDS_IN_24HRS;
        xmlFileValid=true;
    }
    if(filename.contains("rec",Qt::CaseInsensitive)) {
        name = "Recordset";
        timelinedata.type = TlType(TlType::TL_RECORDSET);
        timelinedata.startTime = QDateTime(QDateTime::currentDateTime()).toMSecsSinceEpoch();
        // TODO : update this initialization with actual read of recordset xml data file
        timelinedata.endTime = timelinedata.startTime + (7200000);
        xmlFileValid=true;
    }

    // If dataset/recordset xml was valid, add it to timelines data variable
    if(xmlFileValid == true ) {
        // Check if the set to open is a Recordset in order to move the visualization window and current time around it
        if(timelinedata.type.value() == TlType::TL_RECORDSET) {
            // Compute the current relative position of Sliding and Extended modes limits (upper slide limit and current time are both
            // set on visualization window end border)
            core::C_FLOAT visuWndWidth = static_cast<core::C_FLOAT>(_timeBarModel->getEndTime() - _timeBarModel->getStartTime());
            core::C_FLOAT lowerSlideRatio = static_cast<core::C_FLOAT>(
                    _timeBarModel->getLowerSlideLimit()-_timeBarModel->getStartTime()) / visuWndWidth;
            core::C_FLOAT upperExtRatio = static_cast<core::C_FLOAT>(
                    _timeBarModel->getUpperExtendedLimit()-_timeBarModel->getEndTime()) / visuWndWidth;
            // Compute the new positions of all visualization window elements
            qint64 newStartTime = timelinedata.startTime;
            qint64 newEndTime = timelinedata.endTime;
            core::C_FLOAT newVisuWndWidth = static_cast<core::C_FLOAT>(newEndTime -  newStartTime);
            qint64 newLowerSlideLim = newStartTime + (qint64)(newVisuWndWidth * lowerSlideRatio);
            qint64 newUpperSlideLim = newEndTime;
            qint64 newUpperExtLim = newEndTime + (qint64)(newVisuWndWidth * upperExtRatio);
            // Will update the position of the data container in order to have the new current time position in the visible area
            QQuickItem* mainContainer = 0;
            qreal timeBarWidth;

            // Update the visualization window position according to loaded recordset
            // (new current time is equal to new visualization window end time)
            _timeManager->setvisuWindowPos(newStartTime,newEndTime,newEndTime,newLowerSlideLim,newUpperSlideLim,newUpperExtLim);
            // Update the position of the data container in order to have the new current time position in the visible area
            mainContainer = _rootTimeWidgetObj->findChild<QQuickItem*>("QmlMainContainer");
            timeBarWidth = mainContainer->width() - tlNamesContainerWidth() -
                                 tlOffsetsContainerWidth() - (NB_BORDER_IN_TBAR*borderWidth()) - barsWidth();
            setmsSinceEpochDataContainer( newEndTime - fromPxtoMs(DATA_CONTAINER_LEFT_MARGIN + (timeBarWidth*_currTimePlayLeftMargin) ) );
        }
        // Complete the timeline data with the ones which are indenpendent from the xml file content
        timelinedata.tlPtr = 0;
        timelinedata.isMaster = false;
        timelinedata.color = generateColorFromName(name);
        ref = filename;

        // Add the session timeline to data model and QML
        insertTimeLine(&timelinedata, name, ref);
    }
}

/*!***************************************************************************
 * Method : TimeBarWidget::openSession
 * Purpose : Open a dialog box to get the list of session to open
 ****************************************************************************/
void TimeBarWidget::openSession()
{
    // Error message box
    QMessageBox errMsgBox(this);
    // Variable for session data storage
    timelineData timelinedata;
    QList<QListWidgetItem*> selection;
    core::INT32 sessionIdxToOpen;
    QString SessName;
    QString SessRef;
    // Variables for session name check
    bool sessionFound;
    bool sessionNameValid;
    bool sessionNameChecked;
    bool isDlgBoxOk;
    // Local variables
    core::INT32 i;
    core::INT32 widgetSessIdx;

    QVBoxLayout mainLayout;
    // Create new  QDialogButtonBox
    QDialogButtonBox * buttonsBox = new QDialogButtonBox((QDialogButtonBox::Open|QDialogButtonBox::Cancel),Qt::Horizontal,_sessionsDlgBox);
    QLabel description;
    QListWidget sessionListWidget;
    bool isOkClicked;
    // Ask TimeManager to update the sessions list
    _timeManager->updateSessionsList();
    // The session list will be read and sorted within updateTimelinesIds()

    // Create and open a dialog box to propose all the available sessions with the possibility to select several ones
    _sessionsDlgBox = new QDialog(this);

    // Make the necessary dialog box button connections
    connect(buttonsBox,&QDialogButtonBox::accepted, _sessionsDlgBox, &QDialog::accept);
    connect(buttonsBox,&QDialogButtonBox::rejected, _sessionsDlgBox, &QDialog::reject);
    connect(&sessionListWidget, &QListWidget::itemDoubleClicked, _sessionsDlgBox, &QDialog::accept);

    // Add the list of session in the widget
    sessionListWidget.setObjectName("sessionsList");
    for(i=0; i<_sessionsList.size();i++) {
        sessionListWidget.addItem(_sessionsList.value(i).name);
    }
    // If there is at least one session, select the first one because on opening the QListWidget put the focus on first entry
    if(i>1) {
        sessionListWidget.setCurrentRow(0);
    }

    // Set the selection mode to multiple selection with Ctrl keyboard key
    sessionListWidget.setSelectionMode(QAbstractItemView::ExtendedSelection);

    // Set dialog box text
    description.setText(SESSION_TO_OPEN_MSG);

    // Set dialog box layout, title and open it
    mainLayout.addWidget(&description);
    mainLayout.addWidget(&sessionListWidget);
    mainLayout.addWidget(buttonsBox);
    _sessionsDlgBox->setLayout(&mainLayout);
    _sessionsDlgBox->setWindowTitle(OPEN_SESSION_MSG);
    _sessionsDlgBox->exec();

    // Get the button click by the user, either Ok or Cancel
    if( _sessionsDlgBox->result() ) {
        isOkClicked = true;
    } else {
        isOkClicked = false;
    }

    // If the user clicked on Ok in the dialog box
    if(isOkClicked ==  true) {
        // Compute the indexes of selected session to get data from original _sessionsList
        selection = sessionListWidget.selectedItems();

        // Loop on all the selected sessions one by one
        for(widgetSessIdx=0; (widgetSessIdx< selection.size()); widgetSessIdx++) {
            sessionIdxToOpen = sessionListWidget.row(selection[widgetSessIdx]);

            // Retrieved data from session list
            SessName = _sessionsList.value(sessionIdxToOpen).name;
            SessRef = QString("%1").arg(_sessionsList.value(sessionIdxToOpen).id);

            // Check if the session name is unique in this timebar
            sessionNameChecked = false;
            isDlgBoxOk = true;
            // Loop as long as the user click on Ok after entering a name which is already used
            while( (sessionNameChecked==false) && (isDlgBoxOk==true) ) {
                sessionNameValid = true;
                for (i=0;(i<_timelinesData.size())  && (sessionNameValid); i++) {
                    if( _timelinesData[i].tlPtr->getName().compare(SessName) == 0 ) {
                        sessionNameValid=false;
                    }
                }
                sessionNameChecked=true;
                if(sessionNameValid==false) {
                    SessName = QInputDialog::getText(this,SESSION_NAME_ALREADY_USED_MSG,NAME_ALREADY_USED_CAPTION_MSG,
                                                     QLineEdit::Normal,SessName,&isDlgBoxOk);
                    sessionNameChecked = false;
                } else {
                    isDlgBoxOk=true;
                }
            }

            // If the session have a unique name and the user didn't click on Cancel
            if(isDlgBoxOk==true) {

                // Initialize the timeline data
                timelinedata.tlPtr = 0;
                timelinedata.type = TlType(TlType::TL_SESSION);
                timelinedata.color = generateColorFromName(SessName);
                // For sessions, start and end time are arbitrary, because the drawn timelines are infinite, only the offset is useful
                timelinedata.startTime = msSinceEpochDataContainer();
                timelinedata.endTime = timelinedata.startTime + NB_MILLISECONDS_IN_24HRS;

                // Check for another already opened session, to know if this one is the master and if realtime shall be activated
                sessionFound=false;
                for(i=0;i<_timelinesData.size();i++) {
                    if( _timelinesData[i].type.value() == TlType::TL_SESSION ) {
                        sessionFound=true;
                    }
                }
                if( sessionFound == false ) {
                    timelinedata.isMaster = true;
                    // Set the master session index in data model before calling insertTimeLine because TimeManager needs this when it will
                    // be triggered by timeline addition to data model
                    _timeBarModel->setMasterSession(_timeBarModel->getTimelines()->getTimelines().size());
                    // Enable real-time button
                    _ui->_realTimeButton->setEnabled(true);
                } else {
                    timelinedata.isMaster = false;
                }

                // Add the session timeline to data model and QML
                insertTimeLine(&timelinedata,SessName,SessRef);
            }
        }
    }

    // Dialog box and button have been deleted on box close, but reset the pointer
    _sessionsDlgBox = 0;
}

/*!***************************************************************************
 * Method : TimeBarWidget::insertTimeLine
 * Purpose : Insert a timeline in the QML and local data model
 ****************************************************************************/
core::INT32 TimeBarWidget::insertTimeLine(timelineData * timelinedata, const QString & name, const QString & ref, core::INT32 pos)
{
    // Variable for QML communication
    QVariant returnedValue;
    QVariant inputName;
    QVariant inputXPos;
    QVariant inputXBase;
    QVariant inputXWidth;
    QVariant inputColor;
    QVariant inputOfsTxt;
    QVariant inputIsSession;
    QVariant inputIsMaster;
    QVariant inputListIdx;
    // Variables for timeline data computation
    qreal startTl;
    qreal endTl;
    bool isSession;
    core::INT32 returned_idx;
    QList<core::INT32> tlIds;

    // Initialize the insertion index (which is also the returned value)
    returned_idx = pos;

    // Add the timeline to data model in case it is not already in it, even if unique session id retrieval failed
    timeBarsModel::Timeline* currentTl;
    if(timelinedata->tlPtr == 0) {
        currentTl = new timeBarsModel::Timeline;
        currentTl->setName(name);
        currentTl->setRef(ref);
        currentTl->setType(timelinedata->type.name());
        currentTl->setOffset(0);
        timelinedata->tlPtr = currentTl;
        // Actually add the timeline to the data model
        // The MasterSession field of data model has already been updated if applicable
        _timeBarModel->getTimelines()->addTimeline(currentTl);
        // If the insertion shouldn't have been done at the end
        if(pos!=-1) {
            // Move the inserted timeline
            _timeBarModel->getTimelines()->moveTimeline(_timeBarModel->getTimelines()->getTimelines().size()-1,pos);
        }
    }

    if(_timeScaleLoaded == false) {
        // If the time scale is not loaded, load it in order to get the current time on the left edge of the timebar
        loadTimeScale();
    }

    // If the requested position for timeline insertion in model is not specified, this means that it shall be put at the end
    // but also that we need to check if there is a unique id for it, in which case the timeline data are accessible and the timeline can
    // appear in the timebar
    if(pos == -1) {
        tlIds.clear();
        _timeManager->getTimelinesIds(QRegExp(timelinedata->tlPtr->getName()), &tlIds);

        if(!tlIds.isEmpty()) {
            // Set the valid returned timeline unique id
            timelinedata->uniqueId = tlIds.first();
        } else {
            // Timeline data not accessible, set id to invalid and return -1
            timelinedata->uniqueId = 0;
            returned_idx = -1;
        }
    }

    // If the timeline has a unique Id, add it to local model and QML model to display it, otherwise keep is hidden because this mean
    // it is not possible to connect to its data
    if(timelinedata->uniqueId) {
        // Compute the timeline index if the insertion is requested at the end
        if(pos == -1) {
            returned_idx = _timelinesData.size();
        }

        // Set the parameters to send to QML
        inputName = timelinedata->tlPtr->getName();
        if(timelinedata->type.value() == TlType::TL_SESSION) {
            startTl = 0;
            endTl = DATA_CONTAINER_WIDTH;
            isSession = true;
        } else {
            startTl = fromMsSinceEpochToXcoordsPx(timelinedata->startTime,_dataContainerStartTime);
            endTl = fromMsSinceEpochToXcoordsPx(timelinedata->endTime,_dataContainerStartTime);
            isSession = false;
        }
        inputXPos = startTl;
        inputXBase = inputXPos;
        inputXWidth = endTl - startTl;
        inputColor = timelinedata->color.name();
        // Put an empty offset text because it will be generated right after the timeline insertion, by calling
        inputOfsTxt = "";
        inputIsSession = isSession;
        inputIsMaster = timelinedata->isMaster;
        inputListIdx = returned_idx;

        // Call the QML method to insert the timeline in the QML model
        QMetaObject::invokeMethod(_rootTimeWidgetObj,"insertSet",Q_RETURN_ARG(QVariant, returnedValue),
                                  Q_ARG(QVariant, inputListIdx),Q_ARG(QVariant, inputName),Q_ARG(QVariant, inputXPos),
                                  Q_ARG(QVariant, inputXBase),Q_ARG(QVariant, inputXWidth),Q_ARG(QVariant, inputColor),
                                  Q_ARG(QVariant, inputOfsTxt),Q_ARG(QVariant, inputIsSession),Q_ARG(QVariant, inputIsMaster));

        // Insert the timeline data in the local data model
        _timelinesData.insert(returned_idx,*timelinedata);

        // Generate the timeline offset text (no new to redraw and to latch)
        updateTimelineOfs(static_cast<TBElt>(returned_idx), 0,false, false);
    } else {
        // Unique id is not existing for this timeline, so it shall not appear in timebar because its data is not accessible
        // Schedule this timeline for later insertion
        _tlToAdd.append(*timelinedata);
    }

    return returned_idx;
}

/*!***************************************************************************
 * Method : TimeBarWidget::removeTimeline
 * Purpose : Remove a timeline from both local and shared data model to let the models users be triggered
 ****************************************************************************/
void TimeBarWidget::removeTimeline(core::INT32 pos)
{
    // Variable for QML communication
    QVariant returnedValue;
    QVariant inputPos;
    // Local variables
    core::INT32 backOfs;
    core::INT32 idx;

    // If the timeline to remove is master, set as the new master one the first timeline above in the model
    if(_timelinesData[pos].isMaster) {
        // Compute the offset to move back by one in the model, as we remove a timeline,
        // the model cannot be empty and size() is at least equal to 1
        backOfs = _timelinesData.size() - 1 ;
        // Set the search start on the timeline before the one to remove
        idx = (pos + backOfs) % _timelinesData.size();
        // Initialize the new master timeline index to invalid value
        _timeLineIdxMenu = TBElt_None;
        // As long as the entire timeline list hasn't been checked
        while(idx != pos) {
            if(_timelinesData[idx].type.value() ==  TlType::TL_SESSION) {
                // Session found, so set it as master
                _timeLineIdxMenu = static_cast<TBElt>(idx);
                setMasterSession();
                // Stop the searching loop
                idx = pos;
            } else {
                // Move back by 1 the searching index
                idx = (idx + backOfs) % _timelinesData.size();
            }
        }
        // If no other session has been found to become master, disable Real-time button
        if(_timeLineIdxMenu == TBElt_None) {
            _ui->_realTimeButton->setEnabled(false);
        }
    }

    // Call the QML method to remove timeline from QML data model
    inputPos = pos;
    QMetaObject::invokeMethod(_rootTimeWidgetObj,"removeSet",Q_RETURN_ARG(QVariant, returnedValue),Q_ARG(QVariant, inputPos));

    // Remove the timeline from the main data model, this will trigger the subscribers
    _timeBarModel->getTimelines()->removeTimeline(_timelinesData[pos].tlPtr);

    // Remove the timeline from the local data model
    _timelinesData.removeAt(pos);

}

/*!***************************************************************************
 * Method : TimeBarWidget::generateColorFromName
 * Purpose : Compute a color from a timeline name
 ****************************************************************************/
QColor TimeBarWidget::generateColorFromName(QString name)
{
    core::INT32 hue=0;
    QColor ret_val;

    // Loop over all characters to sum their values
    for(core::INT32 i=0; i<name.size();i++) {
        hue = hue + name.data()[i].unicode();
    }
    // The hue is from 0 to 359, and the most recognizable colors have a space of 60 between them,
    // so add 59 to move each time we run over the entire 360 values Hue circle
    hue = (hue * HUE_SHIFT_BTW_COLORS) % NB_HUE_VALUES;
    // Set the return color with the computed hue, 100% saturation, 70% luminosity and 100% opacity
    ret_val.setHsv(hue,(SATURATION_STR_GEN_COLOR*HSV_VALUES_MAX_VAL/NB_PERCENT_IN_100_PERCENT),
                       (LUMINOSITY_STR_GEN_COLOR*HSV_VALUES_MAX_VAL/NB_PERCENT_IN_100_PERCENT),
                       (OPACITY_STR_GEN_COLOR*HSV_VALUES_MAX_VAL/NB_PERCENT_IN_100_PERCENT)
                   );

    return ret_val;
}

/*!***************************************************************************
 * Method : TimeBarWidget::fileChooser
 * Purpose : Open a file chooser to select a dataset/recordset file
 ****************************************************************************/
void TimeBarWidget::fileChooser()
{
    QString file = QFileDialog::getOpenFileName(this, SELECT_A_FILE_MSG, commonMMI::GUIApplication::get()->getDataStoreURI(),
                                                XML_EXTENSION_CAPTION_MSG);
            
    QFileInfo fileInfo(file);
    
    if (fileInfo.isFile()) {
        openSet(fileInfo.fileName());
    } else {
        LOF_INFO(IS_NOT_A_FILE_ERROR_MSG.arg(fileInfo.absoluteFilePath()));
    }
}

/*!***************************************************************************
 * Method : TimeBarWidget::loadTimeScale
 * Purpose : Compute and display the timeline with all the dates labels
 ****************************************************************************/
void TimeBarWidget::loadTimeScale()
{
    // update msSinceEpochDataContainer which will trigger an entire dataContainer redraw
    setmsSinceEpochDataContainer(_timeBarModel->getTimeBarLeftBorderTimeInMsSinceEpoch() - fromPxtoMs(DATA_CONTAINER_LEFT_MARGIN) );

    // Enable playing button
    _ui->_startButton->setEnabled(true);

    // Set timeline as loaded
    _timeScaleLoaded = true;
}

/*!***************************************************************************
 * Method : TimeBarWidget::pauseOrPlay
 * Purpose : Start or stop time going by
 ****************************************************************************/
void TimeBarWidget::pauseOrPlay(bool checked)
{
    // Update the playing status in data model
    _timeBarModel->setIsPlaying(checked);
}

/*!***************************************************************************
 * Method : TimeBarWidget::catchUpRealTime
 * Purpose : Catch-up real-time by setting speed to 1 and going to current real time
 ****************************************************************************/
void TimeBarWidget::catchUpRealTime()
{
    // Update the real-time state in data model
    _timeBarModel->setIsRealTime(true);
}

/*!***************************************************************************
 * Method : TimeBarWidget::switchToNormalMode
 * Purpose : Set the time display in normal mode
 ****************************************************************************/
void TimeBarWidget::switchToNormalMode()
{
    _timeBarModel->setVisualizationMode(VisuMode(VisuMode::TB_NORMAL_MODE).name());
}

/*!***************************************************************************
 * Method : TimeBarWidget::switchToExtendedMode
 * Purpose : Set the time display in extended mode
 ****************************************************************************/
void TimeBarWidget::switchToExtendedMode()
{
    _timeBarModel->setVisualizationMode(VisuMode(VisuMode::TB_EXTENDED_MODE).name());
}

/*!***************************************************************************
 * Method : TimeBarWidget::switchToSlidingMode
 * Purpose : Set the time display in sliding mode
 ****************************************************************************/
void TimeBarWidget::switchToSlidingMode()
{
    _timeBarModel->setVisualizationMode(VisuMode(VisuMode::TB_SLIDING_MODE).name());
}

/*!***************************************************************************
 * Method : TimeBarWidget::speedUp
 * Purpose : Increase the speed
 ****************************************************************************/
void TimeBarWidget::speedUp()
{
    core::INT32 nbSpeeds = sizeof(SPEEDS_LIST)/sizeof(float);
    core::INT32 i;
    core::C_FLOAT newSpeed;

    // Look for the speed immediately higher in speeds list
    i=0;
    while( (i<nbSpeeds) && (SPEEDS_LIST[i] <= _timeBarModel->getVisualizationSpeed()) ) {
        i = i + 1;
    }
    if( i<nbSpeeds ) {
        newSpeed=SPEEDS_LIST[i];
    } else {
        i = i - 1;
        newSpeed=SPEEDS_LIST[i];
    }
    _timeBarModel->setVisualizationSpeed(newSpeed);
}

/*!***************************************************************************
 * Method : TimeBarWidget::speedDown
 * Purpose : Decrease the speed
 ****************************************************************************/
void TimeBarWidget::speedDown()
{
    core::INT32 nbSpeeds = sizeof(SPEEDS_LIST)/sizeof(float);
    core::INT32 i;
    core::C_FLOAT newSpeed;

    // Look for the speed immediately lower in speeds list
    i=nbSpeeds - 1;
    while( (i>=0) && (SPEEDS_LIST[i] >= _timeBarModel->getVisualizationSpeed()) ) {
        i = i - 1;
    }
    if( i>=0 ) {
        newSpeed=SPEEDS_LIST[i];
    } else {
        i = i + 1;
        newSpeed=SPEEDS_LIST[i];
    }
    _timeBarModel->setVisualizationSpeed(newSpeed);
}


}// end namespace timeBar
