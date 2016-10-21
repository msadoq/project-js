/*!*******************************************************************
 * Project : ISIS
 * Component : GPCC-timeBar
 * \file QuickViewsManager.h
 * \author Olivier HUYARD
 * \date 20th october 2016
 * \brief Declaration of QQuickView manager
 ********************************************************************/

/********************************************************************
 * HISTORY
 *
 * END-HISTORY
 ********************************************************************/

#include <QtCore/QList>
#include <QtCore/QObject>

#include <QtQuick/QQuickView>

namespace timeBar
{

class QuickViewsManager: public QObject
{
    Q_OBJECT

private:
    static QuickViewsManager* _instance;                  ///< The static instance of the singleton
    QList<QQuickView *> _usedQuickViews;                  ///< List of the QQuickView objects currently used by QWidgets
    QList<QQuickView *> _availableQuickViews;             ///< List of the available QQuickView objects

public:
    /*!***************************************************************
     * Method : get
     *
     * \return A pointer to the unique instance of the class
     *
     * Get the only one instance of this class
     *****************************************************************/
    static QuickViewsManager* get();

    /*!***************************************************************
     * Method : getAvailableQQuickView
     *
     * \return Reference to a free QQuickView
     *
     * Get a reference to a free QQuickView which can be used in a newly created QWidget
     *****************************************************************/
    QQuickView * getAvailableQQuickView();

    /*!***************************************************************
     * Method : freeQQuickView
     *
     * \param  Reference to the QQuickView to release
     *
     * Set a given QQuickView as available to be reused by another QWidget
     *****************************************************************/
    void freeQQuickView(QQuickView* view);


private:
    /*!***************************************************************
     * Method : QuickViewsManager
     *
     * Constructor
     *****************************************************************/
    QuickViewsManager();

    /*!***************************************************************
     * Method : ~QuickViewsManager
     *
     * Destructor
     *****************************************************************/
    virtual ~QuickViewsManager();
};

}
