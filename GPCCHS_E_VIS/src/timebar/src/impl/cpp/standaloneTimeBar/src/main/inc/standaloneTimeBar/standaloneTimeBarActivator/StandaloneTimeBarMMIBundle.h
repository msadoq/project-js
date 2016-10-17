/*!*******************************************************************
 * Project : ISIS
 * Component : StandaloneTimeBarMMIBundle
 * \file StandaloneTimeBarMMIBundle.h
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

#ifndef STANDALONETIMEBAR_STANDALONETIMEBARACTIVATOR_STANDALONETIMEBARMMIBUNDLE_H_
#define STANDALONETIMEBAR_STANDALONETIMEBARACTIVATOR_STANDALONETIMEBARMMIBUNDLE_H_

// Start of user code includes
// End of user code

#include <QtCore/QObject>
#include <QtCore/QString>
#include <QtCore/QMap>
#include <QtCore/QList>

#include "timeBarsModel/TimeBar.h"
#include "timeBarsModel/TimeBars.h"
#include "timeBar/TimeBarWidget.h"

#include "commonMMI/MMIBundleInterface.h"
#include "commonMMI/DocumentModel.h"

// Start of user code namespaces

// End of user code

namespace standaloneTimeBar
{

namespace standaloneTimeBarActivator
{

class StandaloneTimeBarMMIBundle : public QObject, public ::commonMMI::MMIBundleInterface
{

Q_OBJECT
Q_PLUGIN_METADATA(IID MMIBundleInterface_iid)
Q_INTERFACES(commonMMI::MMIBundleInterface)

protected:
    // Start of user code ProtectedAttrZone

	static const QString SOCKET_URI_BASE;                      ///< URI template for the used socket binding
	static const QString PUSH_PORT_ENV_VAR_NAME_BASE;          ///< Base name of the environment variable containing the PUSH socket port number

	commonMMI::DocumentModel * _document;                                 ///< Document requires to let the data model work
	timeBarsModel::TimeBars* _timeBarsDataModel;                          ///< Data model of all the timebars
	QMap<timeBarsModel::TimeBar*, timeBar::TimeBarWidget*> _timeBarsMap;  ///< Map to link the TimeBar models with their TimeBarWidget
	QList<timeBarsModel::TimeBar*> _timeBarInitQueue;                     ///< Initialization queue for time bars

public:
    /*!***************************************************************
     * Method : removeTimeBar
     *
     * \param timeBar  Model related to the time bar to close
     *
     * Manage the request of the user to close and remove a timebar from the application
     *****************************************************************/
    void removeTimeBar(timeBarsModel::TimeBar* timeBar);

// End of user code

public:
   /*!***************************************************************************
     * Method : ~StandaloneTimeBarMMIBundle
     *
     * Destructor
     ****************************************************************************/
    virtual ~StandaloneTimeBarMMIBundle();

    /*!***************************************************************
     * Method : getName
     * 
     * \brief Get the MMI Bundle name
     *
     * \return The MMI Bundle name
     *
     * Get the MMI Bundle name
     *****************************************************************/
    virtual QString getName() const;

    /*!***************************************************************
     * Method : getPipeId
     *
     * \return The MMI Bundle ID
     *****************************************************************/
    static QString getPipeId();

    /*!***************************************************************
     * Method : initialize
     * 
     * \brief Initialize MMI Bundle
     *
     * Initialize MMI Bundle
     *****************************************************************/
    virtual void initialize();

    /*!***************************************************************
     * Method : finalize
     * 
     * \brief Finalize MMI Bundle
     *
     * Finalize MMI Bundle
     *****************************************************************/
    virtual void finalize();

    /*!***************************************************************
     * Method : openDocument
     *
     * \brief Open the document with given path in MMI Bundle
     *
     * \param path
     *
     * Open the document with given path in MMI Bundle
     *****************************************************************/
    virtual void openDocument(const QString & path, const QMap<QString, QString>& config= QMap<QString, QString>());

    /*!***************************************************************
     * Method : event
     *
     * \param e The received event
     *
     * Event handler for new timebar creation
     *****************************************************************/
    bool event(QEvent * e);

protected:
    // Start of user code ProtectedOperZone

private:
    /*!***************************************************************
     * Method : createPushSocket
     *
     * \param tbName Name of the timebar to compute environment variable for port number
     * \return       The ID of the created socket
     *
     * Create a socket to let the timebar push to javascript all the user actions
     *****************************************************************/
    core::UINT32 createPushSocket(QString tbName);

    /*!***************************************************************
     * Method : initializeTimeBar
     *
     * \param timeBar The timebar to initialize
     *
     * Create a TimeBarWidget and populate it with the given timeBar model data
     *****************************************************************/
    void initializeTimeBar(timeBarsModel::TimeBar* timeBar);

    /*!***************************************************************
     * Method : createEmptyTimeBar
     *
     * /param Name of the timebar to create
     *
     * /return Pointer to the timebar to create
     *
     * Create an empty TimeBar of specified name and return it
     *****************************************************************/
    timeBarsModel::TimeBar* createEmptyTimeBar(const QString name);

    /*!***************************************************************
     * Method : initTimeBarsModel
     *
     * Initialize the data model of timebars
     *****************************************************************/
    void initTimeBarsModel();

private slots:

	/*!***************************************************************
	 * Method : initNextTimeBar
	 *
	 * Action triggered when the populate of a TimeBarWidget is finished
	 *****************************************************************/
	void initNextTimeBar();

	/*!***************************************************************
	 * Method : timeBarAdded
	 *
	 * \param timeBar The added time bar
	 *
	 * Action triggered when a time bar is added to the data model
	 *****************************************************************/
	void timeBarAdded(timeBarsModel::TimeBar* timeBar);

    /*!***************************************************************
     * Method : removeTimeBar
     *
     * \param index               Index of the removed timeBar
     * \param timeBar The removed time bar
     *
     * Action triggered when a time bar is removed from the data model
     *****************************************************************/
    void timeBarRemoved(int index, timeBarsModel::TimeBar* timeBar);

    // End of user code

};

} // namespace standaloneTimeBarActivator

} // namespace standaloneTimeBar

#endif // STANDALONETIMEBARMMIBUNDLE_H_
