/*!*******************************************************************
 * Project : ISIS
 * Component : GPCC-timeBar
 * \file QuickViewsManager.cpp
 * \author Olivier HUYARD
 * \date 20th october 2016
 * \brief Declaration of QQuickView manager
 ********************************************************************/

/********************************************************************
 * HISTORY
 *
 * END-HISTORY
 ********************************************************************/

#include <QtCore/QDebug>
#include <QtCore/QString>

#include "core/INT32.h"

#include "commonMMIUtils/LogWrapper.h"

#include "timeBar/QuickViewsManager.h"


namespace timeBar
{

// Initialize instance pointer
QuickViewsManager* QuickViewsManager::_instance = 0;

/*!***************************************************************************
 * Method : QuickViewsManager::QuickViewsManager
 * Purpose : QuickViewsManager Constructor
 ****************************************************************************/
QuickViewsManager::QuickViewsManager() :
        QObject()
{
    // Nothing to do
}

/*!***************************************************************************
 * Method : QuickViewsManager::~QuickViewsManager
 * Purpose : QuickViewsManager Destructor
 ****************************************************************************/
QuickViewsManager::~QuickViewsManager()
{
    // Perform a try catch according to coding rule
    try {
    	// Delete all created QQuickViews
        while(!_availableQuickViews.isEmpty()) {
        	delete _availableQuickViews.takeLast();
        }
        while(!_usedQuickViews.isEmpty()) {
        	delete _usedQuickViews.takeLast();
        }
    } catch (...) {}
}

/*!***************************************************************************
 * Method : QuickViewsManager::get
 * Purpose : Get the only one instance of this class
 ****************************************************************************/
QuickViewsManager* QuickViewsManager::get()
{
    if (_instance == 0) {
        // Create object if not already existing
        _instance = new QuickViewsManager;
    }
    return _instance;
}

/*!***************************************************************************
 * Method : QuickViewsManager::getAvailableQQuickView
 * Purpose : Get a reference to a free QQuickView which can be used in a newly created QWidget
 ****************************************************************************/
QQuickView * QuickViewsManager::getAvailableQQuickView()
{
	QQuickView * ret_val = 0;

	// Check if created QQuickViews are available
    if (1) {//_availableQuickViews.isEmpty()) {
    	// The section above is commented because it appears that reuse of QQuickView is not possible
    	// If a QQuickView is deleted, a segmentation fault occurs upon QQuickView object recreation
    	// If a QQuickView is reused, a segmentation fault occurs upon rootContext()->setContextPropert() call
        // Create a new QQuickView
    	ret_val = new QQuickView();
    } else {
    	// Reuse an existing QQuickView
    	ret_val = _availableQuickViews.takeLast();
    }
    // Set the returned QQuickView as used
	_usedQuickViews.append(ret_val);

    return ret_val;
}

/*!***************************************************************************
 * Method : QuickViewsManager::freeQQuickView
 * Purpose : Set a given QQuickView as available to be reused by another QWidget
 ****************************************************************************/
void QuickViewsManager::freeQQuickView(QQuickView* view)
{
	core::INT32 viewIdx = _usedQuickViews.indexOf(view);

	// Check if the view reference is known
    if (viewIdx != -1) {
        // Free the QQuickView
    	_availableQuickViews.append(_usedQuickViews.takeAt(viewIdx));
    	// Break the parent relationship to prevent segmentation fault due to bug in QQuickView
    	_availableQuickViews.last()->setParent(0);
    } else {
    	LOF_ERROR(QString("Try to deleted unknown QQuickView object"));
    }
}

}
