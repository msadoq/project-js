/*!*******************************************************************
 * Project : ISIS
 * Component : StandaloneTimeBarMMIBundle
 * \file StandaloneTimeBarMMIBundle.cpp
 * \author Olivier HUYARD
 * \date 29/09/2016
 * \brief StandaloneTimeBar MMI Bundle main class.
 * 
 * MMI Bundle class is used for defining how MMI Bundle should be 
 * initialized, finalized and how it can open document 
 ********************************************************************/

/********************************************************************
 * HISTORY
 * Start of user code HistoryZone
 *
 * End of user code
 * END-HISTORY
 ********************************************************************/

// Start of user code includes

#include "timeBar/TimeManagers.h"
#include "timeBar/TimeManager.h"
#include "timeBar/TimeBarSocket.h"
#include "timeBar/TimeBarJsModel.h"
#include "timeBar/VisuMode.h"

#include "commonMMI/GenericConfigurationUtils.h"
#include "commonMMI/MainWindow.h"
#include "commonMMI/DockWidget.h"
#include "commonMMIUtils/ComManager.h"

#include "container/PipeMessage.h"

#include "core/BOOL.h"
#include "core/UINT32.h"

#include <QtCore/QDateTime>
#include <QtCore/QString>

// End of user code

#include "commonMMI/GUIApplication.h"
#include "standaloneTimeBar/standaloneTimeBarActivator/StandaloneTimeBarMMIBundle.h"
#include "standaloneTimeBar/StandaloneTimeBarEvent.h"

namespace standaloneTimeBar
{

namespace standaloneTimeBarActivator
{

const QString StandaloneTimeBarMMIBundle::SOCKET_URI_BASE        = QString("tcp://127.0.0.1:%1");
const QString StandaloneTimeBarMMIBundle::PUSH_PORT_ENV_VAR_NAME_BASE = QString("PORT_NUM_TIMEBAR_PUSH_%1");

/*!***************************************************************************
 * Method : StandaloneTimeBarMMIBundle::~StandaloneTimeBarMMIBundle
 * Purpose : Destructor
 ****************************************************************************/
StandaloneTimeBarMMIBundle::~StandaloneTimeBarMMIBundle()
{
    // Perform a try catch according to coding rule
    try {
        // Nothing to do
    } catch (...) {}
}

/*!***************************************************************************
 * Method : StandaloneTimeBarMMIBundle::getName
 * Purpose : Return the name
 ****************************************************************************/
QString StandaloneTimeBarMMIBundle::getName() const
{
    return StandaloneTimeBarMMIBundle::getPipeId();
}

/*!***************************************************************************
 * Method : StandaloneTimeBarMMIBundle::getPipeId
 * Purpose : Return the Pipe ID to use with commonMMIUtils::ComManager
 ****************************************************************************/
QString StandaloneTimeBarMMIBundle::getPipeId()
{
    return "StandaloneTimeBar";
}

/*!***************************************************************************
 * Method : StandaloneTimeBarMMIBundle::initialize
 * Purpose : Initialize the plugin. Called on plugin init
 ****************************************************************************/
void StandaloneTimeBarMMIBundle::initialize()
{
    commonMMI::GUIApplication* application = commonMMI::GUIApplication::get();
    commonMMI::MainWindow* mainWindow = application->getMainWindow();

    // Initialize necessary class members
    _document = new commonMMI::DocumentModel;
	_timeBarsDataModel = new timeBarsModel::TimeBars(_document);

	// Hide not used widgets (OnTheFlyChecking for example)
    QList<commonMMI::DockWidget*> dockWidgets = mainWindow->findChildren<commonMMI::DockWidget*>();
    foreach(commonMMI::DockWidget* dock, dockWidgets) {
        if(dock) {
        	dock->hide();
        }
    }

    // Initialize the data models for timebars
	initTimeBarsModel();

    // Show main window
    mainWindow->show();
    mainWindow->activateWindow();
    mainWindow->raise();

    // Start the StandaloneTimeBar Actor to wait for timebar configuration reception
	container::PipeMessage * msg = commonMMIUtils::ComManager::getInstance()->createCmdMessage(getPipeId(),280);
	QString * str = new QString("START");
	msg->addFrame(zframe_new(str, sizeof(*str)));
	commonMMIUtils::ComManager::getInstance()->sendMessage(getPipeId(),msg);
}

/*!***************************************************************************
 * Method : StandaloneTimeBarMMIBundle::finalize
 * Purpose : Finalize the plugin. Called before plugin closure.
 ****************************************************************************/
void StandaloneTimeBarMMIBundle::finalize()
{
    // Start of user code finalize
	// Nothing to do
	// End of user code
}

/*!***************************************************************************
 * Method : StandaloneTimeBarMMIBundle::openDocument
 * Purpose : Open a document in the MMI Bundle.
 ****************************************************************************/
void StandaloneTimeBarMMIBundle::openDocument(const QString & path, const QMap<QString, QString>& config)
{
    // Start of user code openDocument
	// Nothing to do
    // End of user code
}

// Start of user code ProtectedOperZone


/*!***************************************************************************
 * Method : StandaloneTimeBarMMIBundle::createEmptyTimeBar
 * Purpose : Create an empty TimeBar of specified name and return it
 ****************************************************************************/
timeBarsModel::TimeBar* StandaloneTimeBarMMIBundle::createEmptyTimeBar(const QString name)
{
	// Create an empty model for the timelines (without opened timelines)
    timeBarsModel::Timelines* timeLines(0) ;

    // Create a base timeBar for the empty workspace with 1h time bar and current time set to real current time
    timeBarsModel::TimeBar* newTB = new timeBarsModel::TimeBar();

    // Set default time bar width to 2 hours
    qint64 defaultVisuWndWidth = 7200000;
    // Set default zoom to fit with visualization window width
    qint64 defaultZoom = 11250;
    qint64 currentTime = QDateTime::currentDateTime().toMSecsSinceEpoch();

    // Initialize all the fields of TimeBar for which the value set by the default constructor may be a problem
    newTB->modifyName(name);
    newTB->modifyTimeSpec("LocalTime");
    newTB->modifyVisualizationMode(timeBar::VisuMode(timeBar::VisuMode::TB_NORMAL_MODE).name());
    newTB->modifyCurrentTime(currentTime);
    newTB->modifyStartTime(currentTime - defaultVisuWndWidth);
    newTB->modifyEndTime(currentTime);
    newTB->modifyDefaultVisuWindowWidth(defaultVisuWndWidth);
    newTB->modifyLowerSlideLimit(newTB->getStartTime());
    newTB->modifyUpperSlideLimit(newTB->getEndTime());
    newTB->modifyUpperExtendedLimit(newTB->getEndTime());
    newTB->modifyVisualizationSpeed(1);
    newTB->modifyNbMsInPixel(defaultZoom);
    newTB->modifyTimeBarLeftBorderTimeInMsSinceEpoch(newTB->getStartTime());

    // Create an empty list of timelines
    timeLines = new timeBarsModel::Timelines(newTB);
    newTB->setTimelines(timeLines);

    return newTB;
}

/*!***************************************************************************
 * Method : StandaloneTimeBarMMIBundle::initTimeBarsModel
 * Purpose : Initialize the data model of timebars
 ****************************************************************************/
void StandaloneTimeBarMMIBundle::initTimeBarsModel(void)
{
    // Populate the TimeManagers singleton to initialize it
    timeBar::TimeManagers::get()->populate(_timeBarsDataModel);

    // Connect the TimeBar creation and deletion handlers to the model before creating TimeManager objects in order to get
    // the right calls order on time bar destruction (first widget, then manager)
    disconnect(_timeBarsDataModel);
    connect(_timeBarsDataModel, &timeBarsModel::TimeBars::timeBarAdded, this, &StandaloneTimeBarMMIBundle::timeBarAdded);
    connect(_timeBarsDataModel, &timeBarsModel::TimeBars::timeBarRemoved, this, &StandaloneTimeBarMMIBundle::timeBarRemoved);
}

/*!***************************************************************************
 * Method : StandaloneTimeBarMMIBundle::timeBarAdded
 * Purpose : Triggered when a new time bar is added to the application
 ****************************************************************************/
void StandaloneTimeBarMMIBundle::timeBarAdded(timeBarsModel::TimeBar* timeBar)
{
    // First add the model pointer to the queue for initialization to show that an initialization is requested or on-going
    _timeBarInitQueue.prepend(timeBar);

    // If the queue has only one element, start the initialization of the timebar widget
    // This part is a critical section, because if this service is interrupted here to be executed for another time bar,
    // none of them will be initialized
    if (_timeBarInitQueue.size() == 1) {
        initializeTimeBar(timeBar);
    }
}

/*!***************************************************************************
 * Method : StandaloneTimeBarMMIBundle::timeBarRemoved
 * Purpose : Triggered when a new time bar is removed from the
 * application
 ****************************************************************************/
void StandaloneTimeBarMMIBundle::timeBarRemoved(int index, timeBarsModel::TimeBar* timeBar)
{
    // Get the pointer to MainWindow to be able to insert a timeBar Widget
    commonMMI::MainWindow* mainWindow = commonMMI::GUIApplication::get()->getMainWindow();

    // Remove the timebar from the window
    mainWindow->deleteWidget(_timeBarsMap[timeBar]);

    // Remove the reference from the map
    _timeBarsMap.remove(timeBar);
}

/*!***************************************************************************
 * Method : StandaloneTimeBarMMIBundle::createPushSocket
 * Purpose : Create a socket to let the timebar push to javascript all the user actions
 ****************************************************************************/
core::UINT32 StandaloneTimeBarMMIBundle::createPushSocket(QString tbName)
{
    core::UINT32 port = 0;
    core::BOOL portNumValid = false;
    core::UINT32 socketID = 0;
    QString envVarName(PUSH_PORT_ENV_VAR_NAME_BASE.arg(tbName));

	// Check if the environment variable for the port number of this timebar exists
    if( qEnvironmentVariableIsSet(qPrintable(envVarName)) ) {
            // Retrieve the value of the environment variable
            port = qgetenv(qPrintable(envVarName)).toInt(&portNumValid);
			// Check if conversion of the variable value into integer succeeded
			if(portNumValid) {
				// Create the socket for the timebar
				socketID = timeBar::TimeBarSocket::get()->createSocket(ZMQ_PUSH,"StandaloneTimeBar",SOCKET_URI_BASE.arg(port));
				// Check if the socket creation succeeded
				if(!socketID) {
					// Report the socket creation error
					LOF_ERROR(QString("Socket creation failed to let timeBar send update to from URI ").arg(SOCKET_URI_BASE.arg(port)));
				}
			} else {
				// Report the port number error
				LOF_ERROR(QString("Port number in environment variable %1 is not a valid number").arg(envVarName));
			}
	} else {
   		// Report the port definition error
		LOF_ERROR(QString("Environment variable for port number to be used by timebar not defined. Expected variable is : %1").arg(envVarName));
	}
	return socketID;
}

/*!***************************************************************************
 * Method : StandaloneTimeBarMMIBundle::initializeTimeBar
 * Purpose : Create a TimeBarWidget and populate it with the given timeBar model data
 ****************************************************************************/
void StandaloneTimeBarMMIBundle::initializeTimeBar(timeBarsModel::TimeBar* timeBar)
{
	// Timebar configuration variables
	core::UINT32 socketID = 0;
	commonMMI::keyValConfHash timeBarWidgetConf;

	// Get the pointer to MainWindow to be able to insert a timeBar Widget
	commonMMI::MainWindow* mainWindow = commonMMI::GUIApplication::get()->getMainWindow();

	// Create the socket to let the timebar push the user actions to javascript
	socketID = createPushSocket(timeBar->getName());
	// Put the socket ID in timebar configuration structure
	timeBarWidgetConf[timeBar::TimeBarWidget::SOCKET_ID_KEY] = QString("%1").arg(socketID);

	// Create the timeBar Widget
	_timeBarsMap[timeBar] = new timeBar::TimeBarWidget;
	_timeBarsMap[timeBar]->setObjectName(timeBar->getName());

	// Disconnection to avoid multiple connections
	disconnect(_timeBarsMap[timeBar]) ;

	// Connect the slot for initialization of next time bar
	connect(_timeBarsMap[timeBar], &timeBar::TimeBarWidget::timeBarReady,this, &StandaloneTimeBarMMIBundle::initNextTimeBar);

	// Connect the slot to receive the closing request from the widget with a QueuedConnection in order to avoid crash
	// due to pending events in even queue when widget is closed
	connect(_timeBarsMap[timeBar], &timeBar::TimeBarWidget::timeBarToClose,this, &StandaloneTimeBarMMIBundle::removeTimeBar, Qt::QueuedConnection);

	// Add the timeBar Widget in the mainWindow
	mainWindow->addWidget(_timeBarsMap[timeBar]);

	// Populate the timeBar Widget to set it up
	_timeBarsMap[timeBar]->populate(timeBar, &timeBarWidgetConf);
}

/*!***************************************************************************
 * Method : StandaloneTimeBarMMIBundle::initNextTimeBar
 * Purpose : Action triggered when the populate of a TimeBarWidget is finished
 ****************************************************************************/
void StandaloneTimeBarMMIBundle::initNextTimeBar()
{
	// First remove the time bar we just finish the initialization from the queue,
	// emptiness test is only for robustness, the queue should never be empty
	if (!_timeBarInitQueue.isEmpty()) {
		_timeBarInitQueue.removeLast();
	}
	// Then check if another time bar is waiting to be initialized
	if (!_timeBarInitQueue.isEmpty()) {
		initializeTimeBar(_timeBarInitQueue.last());
	}
}

/*!***************************************************************************
 * Method : StandaloneTimeBarMMIBundle::removeTimeBar
 * Purpose : Manage the request of the user to close and remove a timebar from the application
 ****************************************************************************/
void StandaloneTimeBarMMIBundle::removeTimeBar(timeBarsModel::TimeBar* timeBar)
{
    // Remove the time bar from the data model, this will trigger necessary disconnection and removal
	_timeBarsDataModel->removeTimeBar(timeBar);
}

/*!***************************************************************************
 * Method : StandaloneTimeBarMMIBundle::event
 * Purpose : Event handler for new timebar creation
 ****************************************************************************/
bool StandaloneTimeBarMMIBundle::event(QEvent * e)
{
	// Do not catch this event by default
	core::BOOL ret_val = false;
	core::INT32 foundIdx = -1;
	core::INT32 tbIdx = 0;
	StandaloneTimeBarEvent * tbEvent = dynamic_cast<StandaloneTimeBarEvent*>(e);
	timeBarsModel::TimeBar * newTimeBar = 0;
	timeBar::TimeBarJsModel jsModel;

	// If the event type correspond to StandaloneTimeBarEvent
    if (tbEvent){
    	// Set return value in order to catch this event (which means that it will be deleted on this function return)
    	ret_val = true;

    	// Create a jsonMessage from the received bytes array
    	jsModel.fromJson(tbEvent->getTimeBarConf());
    	// Check if the timebar is already known
    	while( (tbIdx < _timeBarsDataModel->getTimeBars().size()) && (foundIdx==-1) ) {
    		// Check if the name of the timebar in json message is one of the timebars from the data model
    		if( _timeBarsDataModel->getTimeBars()[tbIdx]->getName().compare(jsModel.getId()) == 0 ){
    			foundIdx = tbIdx;
    		}
    		// Increment timebar index
    		tbIdx++;
    	}

    	// Check if the received timebar configuration has the name of an already opened timebar
    	if( foundIdx != -1 ) {
    		// Update the already existing timebar with the received configuration
    		jsModel.toTimeBarModel(_timeBarsDataModel->getTimeBars()[foundIdx]);
    	} else {
    		// Create an empty timebar model for the new timebar (the model takes ownership on it, so it shall not be deleted here)
    		newTimeBar = new timeBarsModel::TimeBar();
    		// Fill-in the new timebar data model
    		jsModel.toTimeBarModel(newTimeBar);
    		// Add the newly created timebar to the main model
    		_timeBarsDataModel->addTimeBar(newTimeBar);
    	}
    }

    return ret_val;
}

}

}
