/*!*******************************************************************
 * Project : ISIS
 * Component : GPCC-timeBar
 * \file TimeBarJsModel.cpp
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

#include "timeBar/TimeBarJsModel.h"

#include <QtCore/QDebug>

#include "core/INT32.h"
#include "core/INT64.h"
#include "core/C_FLOAT.h"
#include "core/C_DOUBLE.h"
#include "core/BOOL.h"

#include "timeBarsModel/Timeline.h"

namespace timeBar
{

const QString TimeBarJsModel::TYPE_KEY_VALUE         = QString("timeBarConfiguration");
const QString TimeBarJsModel::ACTIONTYPE_KEY_NAME    = QString("actionType");
const QString TimeBarJsModel::MASTERTLID_KEY_NAME    = QString("masterId");
const QString TimeBarJsModel::VISUWINDOW_KEY_NAME    = QString("visuWindow");
const QString TimeBarJsModel::VISUSTART_KEY_NAME     = QString("lower");
const QString TimeBarJsModel::VISUEND_KEY_NAME       = QString("upper");
const QString TimeBarJsModel::CURRENTTIME_KEY_NAME   = QString("current");
const QString TimeBarJsModel::DEFAULT_WIDTH_KEY_NAME = QString("defaultWidth");
const QString TimeBarJsModel::SLIDEWINDOW_KEY_NAME   = QString("slideWindow");
const QString TimeBarJsModel::SLIDE_LOW_LIM_KEY_NAME = QString("lower");
const QString TimeBarJsModel::SLIDE_UP_LIM_KEY_NAME  = QString("upper");
const QString TimeBarJsModel::EXT_UP_LIM_KEY_NAME    = QString("extUpperBound");
const QString TimeBarJsModel::VISUMODE_KEY_NAME      = QString("mode");
const QString TimeBarJsModel::RULER_START_KEY_NAME   = QString("rulerStart");
const QString TimeBarJsModel::RULER_RES_KEY_NAME     = QString("rulerResolution");
const QString TimeBarJsModel::PLAYINGSTATE_KEY_NAME  = QString("playingState");
const QString TimeBarJsModel::SPEED_KEY_NAME         = QString("speed");
const QString TimeBarJsModel::TIMESPEC_KEY_NAME      = QString("timeSpec");
const QString TimeBarJsModel::OFS_FROM_UTC_KEY_NAME  = QString("offsetFromUTC");
const QString TimeBarJsModel::TIMELINES_KEY_NAME     = QString("timeLines");
const QString TimeBarJsModel::TLID_KEY_NAME          = QString("id");
const QString TimeBarJsModel::TLNAME_KEY_NAME        = QString("name");
const QString TimeBarJsModel::TLTYPE_KEY_NAME        = QString("kind");
const QString TimeBarJsModel::TLOFFSET_KEY_NAME      = QString("offset");
const QString TimeBarJsModel::DS_PATH_KEY_NAME       = QString("dsPath");
const QString TimeBarJsModel::SESSIONID_KEY_NAME     = QString("sessionId");

const QString TimeBarJsModel::INIT_ACTIONTYPE             = QString("initialUpd");
const QString TimeBarJsModel::CURR_TIME_UPD_ACTIONTYPE    = QString("currentTimeUpd");
const QString TimeBarJsModel::START_TIME_UPD_ACTIONTYPE   = QString("startTimeUpd");
const QString TimeBarJsModel::END_TIME_UPD_ACTIONTYPE     = QString("endTimeUpd");
const QString TimeBarJsModel::SLIDE_LIMITS_UPD_ACTIONTYPE = QString("slideLimUpd");
const QString TimeBarJsModel::EXT_LIMITS_UPD_ACTIONTYPE   = QString("extendedLimUpd");
const QString TimeBarJsModel::PLAY_STATE_UPD_ACTIONTYPE   = QString("playingStateUpd");
const QString TimeBarJsModel::SPEED_UPD_ACTIONTYPE        = QString("speedUpd");
const QString TimeBarJsModel::VISU_POS_UPD_ACTIONTYPE     = QString("visuPosUpd");
const QString TimeBarJsModel::VISU_MODE_UPD_ACTIONTYPE    = QString("visuModeUpd");
const QString TimeBarJsModel::MASTER_TL_ID_UPD_ACTIONTYPE = QString("masterTlIdUpd");
const QString TimeBarJsModel::TL_ADDED_ACTIONTYPE         = QString("tlAdded");
const QString TimeBarJsModel::TL_REMOVED_ACTIONTYPE       = QString("tlRemoved");
const QString TimeBarJsModel::TL_NAME_UPD_ACTIONTYPE      = QString("tlNameUpd");
const QString TimeBarJsModel::TL_OFFSET_UPD_ACTIONTYPE    = QString("tlOffsetUpd");
const QString TimeBarJsModel::TB_SAVE_ACTIONTYPE          = QString("tbSaving");

const QString TimeBarJsModel::REPLAY_PLAYINGSTATE         = QString("replay");
const QString TimeBarJsModel::PAUSE_PLAYINGSTATE          = QString("pause");
const QString TimeBarJsModel::REALTIME_PLAYINGSTATE       = QString("realtime");

/*!***************************************************************************
 * Method : TimeBarJsModel::TimeBarJsModel
 * Purpose : TimeBarJsModel default constructor
 ****************************************************************************/
TimeBarJsModel::TimeBarJsModel(QObject * parent):
        jsUtils::JsonMsg(parent)
{
    // Set configuration type
    _msgContent[jsUtils::JsonMsg::TYPE_KEY_NAME] = TYPE_KEY_VALUE;
    // Initialize the message content entry with an empty list (not mutable)
    _msgContent[TIMELINES_KEY_NAME] = _timelines;
    _msgContent[VISUWINDOW_KEY_NAME] = _visuWindow;
    _msgContent[SLIDEWINDOW_KEY_NAME] = _slideWindow;
}

/*!***************************************************************************
 * Method : TimeBarJsModel::TimeBarJsModel
 * Purpose : TimeBarJsModel Copy constructor
 ****************************************************************************/
TimeBarJsModel::TimeBarJsModel(const TimeBarJsModel& msg):
        jsUtils::JsonMsg(msg)
{
    // Nothing to do because all data is in _msgContent, so it has been copied by the parent
}

/*!***************************************************************************
 * Method : TimeBarJsModel::TimeBarJsModel
 * Purpose : TimeBarJsModel constructor from QJsonDocument
 ****************************************************************************/
TimeBarJsModel::TimeBarJsModel(const QByteArray & rawData, QObject* parent):
        jsUtils::JsonMsg(rawData,parent)
{
    // Nothing to do because all data is in _msgContent, so it has been written by the parent
}

/*!***************************************************************************
 * Method : TimeBarJsModel::~TimeBarJsModel
 * Purpose : TimeBarJsModel destructor
 ****************************************************************************/
TimeBarJsModel::~TimeBarJsModel()
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
 * Method : TimeBarJsModel::clear
 * Purpose : Clear all the data of the model
 ****************************************************************************/
void TimeBarJsModel::clear()
{
    // Clear the sub lists
    _timelines.clear();
    _visuWindow.clear();
    _slideWindow.clear();
    // Call the parent class to clear the generic part
    JsonMsg::clear();
    emit jsonMsgChanged();
}

/*!***************************************************************************
 * Method : TimeBarJsModel::toJson
 * Purpose : Convert the message to UTF-8 JSON indented document
 ****************************************************************************/
QByteArray TimeBarJsModel::toJson()
{
    // Copy the points into the _msgContent to take into account added points (QVariant object in QMap is not mutable)
    _msgContent[TIMELINES_KEY_NAME] = _timelines;
    _msgContent[VISUWINDOW_KEY_NAME] = _visuWindow;
    _msgContent[SLIDEWINDOW_KEY_NAME] = _slideWindow;
    // Call parent member to perform generic work
    return JsonMsg::toJson();
}

/*!***************************************************************************
 * Method : TimeBarJsModel::fromJson
 * Purpose : Fill this message content with the data contained in raw UTF-8 JSON document
 ****************************************************************************/
void TimeBarJsModel::fromJson(const QByteArray & rawData)
{
	// Call the parent member to perform the generic work
	JsonMsg::fromJson(rawData);

	// Populate the specific members
	if(_msgContent[TIMELINES_KEY_NAME].canConvert<QVariantList>()) {
		_timelines = qvariant_cast<QVariantList>(_msgContent[TIMELINES_KEY_NAME]);
	}
	if(_msgContent[VISUWINDOW_KEY_NAME].canConvert<QVariantMap>()) {
		_visuWindow = qvariant_cast<QVariantMap>(_msgContent[VISUWINDOW_KEY_NAME]);
	}
	if(_msgContent[SLIDEWINDOW_KEY_NAME].canConvert<QVariantMap>()) {
		_slideWindow = qvariant_cast<QVariantMap>(_msgContent[SLIDEWINDOW_KEY_NAME]);
	}
}

/*!***************************************************************************
 * Method : TimeBarJsModel::toTimeBarModel
 * Purpose : Fill-in a single timebar of TimeBarsModel from message
 ****************************************************************************/
void TimeBarJsModel::toTimeBarModel(timeBarsModel::TimeBar* model)
{
	core::INT32 index = 0;
	core::INT32 tmpInt32 = 0;
	core::INT64 tmpInt64 = 0;
	core::C_DOUBLE tmpDouble = 0;
	core::C_FLOAT tmpFloat = 0;
	core::BOOL convOk = false;
	timeBarsModel::Timelines * timelines = 0;
	timeBarsModel::Timeline * timeline = 0;

	// Read and write timebar members
	if(_msgContent.contains(jsUtils::JsonMsg::ID_KEY_NAME)) {
		model->modifyName(_msgContent[jsUtils::JsonMsg::ID_KEY_NAME].toString());
	}
	if(_msgContent.contains(MASTERTLID_KEY_NAME)) {
		tmpInt32 = _msgContent[MASTERTLID_KEY_NAME].toInt(&convOk);
		if(convOk) {
			model->modifyMasterSession(tmpInt32);
		}
	}
	if(_visuWindow.contains(VISUSTART_KEY_NAME)) {
		tmpInt64 = _visuWindow[VISUSTART_KEY_NAME].toLongLong(&convOk);
		if(convOk) {
			model->modifyStartTime(tmpInt64);
		}
	}
	if(_visuWindow.contains(VISUEND_KEY_NAME)) {
		tmpInt64 = _visuWindow[VISUEND_KEY_NAME].toLongLong(&convOk);
		if(convOk) {
			model->modifyEndTime(tmpInt64);
		}
	}
	if(_visuWindow.contains(CURRENTTIME_KEY_NAME)) {
		tmpInt64 = _visuWindow[CURRENTTIME_KEY_NAME].toLongLong(&convOk);
		if(convOk) {
			model->modifyCurrentTime(tmpInt64);
		}
	}
	if(_msgContent.contains(DEFAULT_WIDTH_KEY_NAME)) {
		tmpInt64 = _msgContent[DEFAULT_WIDTH_KEY_NAME].toLongLong(&convOk);
		if(convOk) {
			model->modifyDefaultVisuWindowWidth(tmpInt64);
		}
	}
	if(_slideWindow.contains(SLIDE_LOW_LIM_KEY_NAME)) {
		tmpInt64 = _slideWindow[SLIDE_LOW_LIM_KEY_NAME].toLongLong(&convOk);
		if(convOk) {
			model->modifyLowerSlideLimit(tmpInt64);
		}
	}
	if(_slideWindow.contains(SLIDE_UP_LIM_KEY_NAME)) {
		tmpInt64 = _slideWindow[SLIDE_UP_LIM_KEY_NAME].toLongLong(&convOk);
		if(convOk) {
			model->modifyUpperSlideLimit(tmpInt64);
		}
	}
	if(_msgContent.contains(EXT_UP_LIM_KEY_NAME)) {
		tmpInt64 = _msgContent[EXT_UP_LIM_KEY_NAME].toLongLong(&convOk);
		if(convOk) {
			model->modifyUpperExtendedLimit(tmpInt64);
		}
	}
	if(_msgContent.contains(VISUMODE_KEY_NAME)) {
		model->modifyVisualizationMode(_msgContent[VISUMODE_KEY_NAME].toString());
	}
	if(_msgContent.contains(RULER_START_KEY_NAME)) {
		tmpInt64 = _msgContent[RULER_START_KEY_NAME].toLongLong(&convOk);
		if(convOk) {
			model->modifyTimeBarLeftBorderTimeInMsSinceEpoch(tmpInt64);
		}
	}
	if(_msgContent.contains(RULER_RES_KEY_NAME)) {
		tmpDouble = _msgContent[RULER_RES_KEY_NAME].toDouble(&convOk);
		if(convOk) {
			model->modifyNbMsInPixel(tmpDouble);
		}
	}
	if(_msgContent.contains(PLAYINGSTATE_KEY_NAME)) {
		if(_msgContent[PLAYINGSTATE_KEY_NAME].toString().compare(REPLAY_PLAYINGSTATE) == 0) {
			model->modifyIsRealTime(false);
			model->modifyIsPlaying(true);
		}
		if(_msgContent[PLAYINGSTATE_KEY_NAME].toString().compare(PAUSE_PLAYINGSTATE) == 0) {
			model->modifyIsRealTime(false);
			model->modifyIsPlaying(false);
		}
		if(_msgContent[PLAYINGSTATE_KEY_NAME].toString().compare(REALTIME_PLAYINGSTATE) == 0) {
			model->modifyIsRealTime(true);
			model->modifyIsPlaying(true);
		}
	}
	if(_msgContent.contains(SPEED_KEY_NAME)) {
		tmpFloat = _msgContent[SPEED_KEY_NAME].toFloat(&convOk);
		if(convOk) {
			model->modifyVisualizationSpeed(tmpFloat);
		}
	}
	if(_msgContent.contains(TIMESPEC_KEY_NAME)) {
		model->modifyTimeSpec(_msgContent[TIMESPEC_KEY_NAME].toString());
	}
	if(_msgContent.contains(OFS_FROM_UTC_KEY_NAME)) {
		tmpInt32 = _msgContent[OFS_FROM_UTC_KEY_NAME].toInt(&convOk);
		if(convOk) {
			model->modifyOffsetFromUTC(tmpInt32);
		}
	}

	// Initialize drag as not on-going
	model->modifyIsDragOnGoing(false);

	// Check if the given model already have timelines
	if( model->getTimelines() ) {
		// Retrieve the timelines pointer from model
		timelines = model->getTimelines();
		// Remove all the existing timelines
		foreach(timeline, timelines->getTimelines()) {
			timelines->removeTimeline(timeline,false);
		}
	} else {
		// Create the timelines model with parent relationship to let the data model work
		timelines = new timeBarsModel::Timelines(model);
		// Set the created timeline list into model
		model->setTimelines(timelines);
	}

	// Check if there are timelines in the message
	if(_timelines.size()) {

		// Parse each timeline of the message
		while( index<_timelines.size() ) {
			// Check that the QVariant conversion works
			if(_timelines[index].canConvert<QVariantMap>()) {
				// Create the timeline model with parent relationship to let the data model work
				timeline = new timeBarsModel::Timeline(timelines);
				// Check each key for existence and reading
				if(_timelines[index].toMap().contains(TLNAME_KEY_NAME)) {
					timeline->modifyName(_timelines[index].toMap().value(TLNAME_KEY_NAME).toString());
				}
				if(_timelines[index].toMap().contains(TLTYPE_KEY_NAME)) {
					timeline->modifyType(_timelines[index].toMap().value(TLTYPE_KEY_NAME).toString());
				}
				if(_timelines[index].toMap().contains(TLOFFSET_KEY_NAME)) {
					tmpInt64 = _timelines[index].toMap().value(TLOFFSET_KEY_NAME).toLongLong(&convOk);
					if(convOk) {
						timeline->modifyOffset(tmpInt64);
					}
				}
				if(_timelines[index].toMap().contains(SESSIONID_KEY_NAME)) {
					timeline->modifyRef(_timelines[index].toMap().value(SESSIONID_KEY_NAME).toString());
				}
				// TLID_KEY_NAME is not existing in data model because this is a runtime computed data
				// DS_PATH_KEY_NAME is not read and written because not implemented in data model
				// Add the created timeline to the list without undo capability, otherwise the timeline is not added
				timelines->addTimeline(timeline,false);
			}
			index = index + 1;
		}
	}
}

/*!***************************************************************************
 * Method : TimeBarJsModel::setAction
 * Purpose : Set the action related to the message
 ****************************************************************************/
void TimeBarJsModel::setAction(QVariant action)
{
    _msgContent[ACTIONTYPE_KEY_NAME] = action;
    emit jsonMsgChanged();
}

/*!***************************************************************************
 * Method : TimeBarJsModel::setTimebarData
 * Purpose : Set the root level TimeBar data in json
 ****************************************************************************/
void TimeBarJsModel::setTimebarData(QVariant id, QVariant mode, QVariant play, QVariant speed, QVariant rulerStart,
        QVariant rulerRes, QVariant timeSpec, QVariant ofsFromUTC)
{
    _msgContent[jsUtils::JsonMsg::ID_KEY_NAME] = id;
    _msgContent[RULER_START_KEY_NAME] = rulerStart;
    _msgContent[RULER_RES_KEY_NAME] = rulerRes;
    _msgContent[TIMESPEC_KEY_NAME] = timeSpec;
    _msgContent[OFS_FROM_UTC_KEY_NAME] = ofsFromUTC;
    _msgContent[VISUMODE_KEY_NAME] = mode;
    _msgContent[PLAYINGSTATE_KEY_NAME] = play;
    _msgContent[SPEED_KEY_NAME] = speed;
    emit jsonMsgChanged();
}

/*!***************************************************************************
 * Method : TimeBarJsModel::setTimebarRuler
 * Purpose : Set the ruler TimeBar data in json
 ****************************************************************************/
void TimeBarJsModel::setTimebarRuler(QVariant rulerStart, QVariant rulerRes)
{
    _msgContent[RULER_START_KEY_NAME] = rulerStart;
    _msgContent[RULER_RES_KEY_NAME] = rulerRes;
    emit jsonMsgChanged();
}

/*!***************************************************************************
 * Method : TimeBarJsModel::setTimeSpec
 * Purpose : Set the time specification data in json
 ****************************************************************************/
void TimeBarJsModel::setTimeSpec(QVariant timeSpec, QVariant ofsFromUTC)
{
    _msgContent[TIMESPEC_KEY_NAME] = timeSpec;
    _msgContent[OFS_FROM_UTC_KEY_NAME] = ofsFromUTC;
    emit jsonMsgChanged();
}

/*!***************************************************************************
 * Method : TimeBarJsModel::addSessionTimeline
 * Purpose : Add a session timeline
 ****************************************************************************/
void TimeBarJsModel::addSessionTimeline(QVariant id, QVariant name, QVariant type, QVariant offset, QVariant sessId)
{
    QVariantMap timelineMap;
    // Fill the local timeline data map with values
    timelineMap[TLID_KEY_NAME] = id;
    timelineMap[TLNAME_KEY_NAME] = name;
    timelineMap[TLTYPE_KEY_NAME] = type;
    timelineMap[TLOFFSET_KEY_NAME] = offset;
    timelineMap[SESSIONID_KEY_NAME] = sessId;
    // Append the QVariantMap in the main timelines data list
    _timelines.append(QVariant(timelineMap));
    emit jsonMsgChanged();
}

/*!***************************************************************************
 * Method : TimeBarJsModel::addTimeline
 * Purpose : Add a timeline (not a session one)
 ****************************************************************************/
void TimeBarJsModel::addTimeline(QVariant id, QVariant name, QVariant type, QVariant offset, QVariant dsPath)
{
    QVariantMap timelineMap;
    // Fill the local timeline data map with values
    timelineMap[TLID_KEY_NAME] = id;
    timelineMap[TLNAME_KEY_NAME] = name;
    timelineMap[TLTYPE_KEY_NAME] = type;
    timelineMap[TLOFFSET_KEY_NAME] = offset;
    timelineMap[DS_PATH_KEY_NAME] = dsPath;
    // Append the QVariantMap in the main timelines data list
    _timelines.append(QVariant(timelineMap));
    emit jsonMsgChanged();
}

/*!***************************************************************************
 * Method : TimeBarJsModel::removeTimeline
 * Purpose : Remoave a timeline
 ****************************************************************************/
void TimeBarJsModel::removeTimeline(QVariant id)
{
    core::BOOL found = false;
    core::INT32 index = 0;

    // Look for the timeline with id equal to the given one
    while( (found==false) && (index<_timelines.size()) ) {
        // Check that the QVariant conversion works
        if(_timelines[index].canConvert<QVariantMap>()) {
            // Compare the timeline id with searched one
            if(_timelines[index].toMap().take(TLID_KEY_NAME).toString().compare(id.toString()) == 0 ) {
                // Remove the timeline
                _timelines.removeAt(index);
                found = true;
            }
        }
        index++;
    }
    if(found == true) {
        // Warn that timelines list has been updated
        emit jsonMsgChanged();
    }
}

/*!***************************************************************************
 * Method : TimeBarJsModel::updateTimelineName
 * Purpose : Update a timeline name in the message
 ****************************************************************************/
void TimeBarJsModel::updateTimelineName(QVariant id, QVariant name)
{
    core::BOOL found = false;
    core::INT32 index = 0;
    QVariantMap tlToUpd;

    // Look for the timeline with id equal to the given one
    while( (found==false) && (index<_timelines.size()) ) {
        // Check that the QVariant conversion works
        if(_timelines[index].canConvert<QVariantMap>()) {
            // Compare the timeline id with searched one
            if(_timelines[index].toMap().take(TLID_KEY_NAME).toString().compare(id.toString()) == 0 ) {
                // Update timeline name (QVariant type requires to remove and add again the element)
                tlToUpd = qvariant_cast<QVariantMap>(_timelines.takeAt(index));
                tlToUpd[TLNAME_KEY_NAME] = name.toString();
                _timelines.insert(index,tlToUpd);
                found = true;
            }
        }
        index++;
    }
    if(found == true) {
        // Warn that timelines list has been updated
        emit jsonMsgChanged();
    }
}

/*!***************************************************************************
 * Method : TimeBarJsModel::updateTimelineOffsets
 * Purpose : Update the offset of a timeline
 ****************************************************************************/
void TimeBarJsModel::updateTimelineOffset(QVariant id, QVariant offset)
{
    core::BOOL found = false;
    core::INT32 index = 0;
    QVariantMap tlToUpd;

    // Look for the timeline with id equal to the given one
    while( (found==false) && (index<_timelines.size()) ) {
        // Check that the QVariant conversion works
        if(_timelines[index].canConvert<QVariantMap>()) {
            // Compare the timeline id with searched one
            if(_timelines[index].toMap().take(TLID_KEY_NAME).toString().compare(id.toString()) == 0 ) {
                // Update timeline offset (QVariant type requires to remove and add again the element)
                tlToUpd = qvariant_cast<QVariantMap>(_timelines.takeAt(index));
                tlToUpd[TLOFFSET_KEY_NAME] = offset.toString();
                _timelines.insert(index,tlToUpd);
                found = true;
            }
        }
        index++;
    }
    if(found == true) {
        // Warn that timelines list has been updated
        emit jsonMsgChanged();
    }
}

/*!***************************************************************************
 * Method : TimeBarJsModel::setSlideModeData
 * Purpose : Set the sliding visualization mode data
 ****************************************************************************/
void TimeBarJsModel::setSlideModeData(QVariant lower, QVariant upper)
{
    _slideWindow[SLIDE_LOW_LIM_KEY_NAME] = lower;
    _slideWindow[SLIDE_UP_LIM_KEY_NAME] = upper;
    emit jsonMsgChanged();
}

/*!***************************************************************************
 * Method : TimeBarJsModel::setExtendedModeData
 * Purpose : Set the extended visualization mode data
 ****************************************************************************/
void TimeBarJsModel::setExtendedModeData(QVariant upper)
{
    _msgContent[EXT_UP_LIM_KEY_NAME] = upper;
    emit jsonMsgChanged();
}

/*!***************************************************************************
 * Method : TimeBarJsModel::setWindPosData
 * Purpose : Set the visualization window position data
 ****************************************************************************/
void TimeBarJsModel::setWindPosData(QVariant start, QVariant current, QVariant end)
{
    _visuWindow[VISUSTART_KEY_NAME] = start;
    _visuWindow[VISUEND_KEY_NAME] = end;
    _visuWindow[CURRENTTIME_KEY_NAME] = current;
    emit jsonMsgChanged();
}

/*!***************************************************************************
 * Method : TimeBarJsModel::setWindPosDefaultWidth
 * Purpose : Set the visualization window default width
 ****************************************************************************/
void TimeBarJsModel::setWindPosDefaultWidth(QVariant width)
{
    _visuWindow[DEFAULT_WIDTH_KEY_NAME] = width;
    emit jsonMsgChanged();
}

/*!***************************************************************************
 * Method : TimeBarJsModel::setMasterTlId
 * Purpose : Set the master timeline id
 ****************************************************************************/
void TimeBarJsModel::setMasterTlId(QVariant master)
{
    _msgContent[MASTERTLID_KEY_NAME] = master;
    emit jsonMsgChanged();
}

/*!***************************************************************************
 * Method : TimeBarJsModel::setWndStart
 * Purpose : Set the visualization window start
 ****************************************************************************/
void TimeBarJsModel::setWndStart(QVariant start)
{
    _visuWindow[VISUSTART_KEY_NAME] = start;
    emit jsonMsgChanged();
}

/*!***************************************************************************
 * Method : TimeBarJsModel::setWndEnd
 * Purpose : Set the visualization window end
 ****************************************************************************/
void TimeBarJsModel::setWndEnd(QVariant end)
{
    _visuWindow[VISUEND_KEY_NAME] = end;
    emit jsonMsgChanged();
}

/*!***************************************************************************
 * Method : TimeBarJsModel::setCurrentTime
 * Purpose : Set the visualization window current time
 ****************************************************************************/
void TimeBarJsModel::setCurrentTime(QVariant current)
{
    _visuWindow[CURRENTTIME_KEY_NAME] = current;
    emit jsonMsgChanged();
}

/*!***************************************************************************
 * Method : TimeBarJsModel::setPlayingState
 * Purpose : Set the visualization playing state
 ****************************************************************************/
void TimeBarJsModel::setPlayingState(QVariant play)
{
    _msgContent[PLAYINGSTATE_KEY_NAME] = play;
    emit jsonMsgChanged();
}

/*!***************************************************************************
 * Method : TimeBarJsModel::setSpeed
 * Purpose : Set the visualization playing speed
 ****************************************************************************/
void TimeBarJsModel::setSpeed(QVariant speed)
{
    _msgContent[SPEED_KEY_NAME] = speed;
    emit jsonMsgChanged();
}

/*!***************************************************************************
 * Method : TimeBarJsModel::setMode
 * Purpose : Set the visualization mode
 ****************************************************************************/
void TimeBarJsModel::setMode(QVariant mode)
{
    _msgContent[VISUMODE_KEY_NAME] = mode;
    emit jsonMsgChanged();
}

}
