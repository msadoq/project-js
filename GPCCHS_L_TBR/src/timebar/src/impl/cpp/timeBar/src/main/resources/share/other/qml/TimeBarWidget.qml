import QtQuick 2.0
import timeBarQml 1.0

// The visible area of the TimeBar
Rectangle {
    id: timebarFrame
 
    //List containing the property of open session/dataset/recordset
    //This list is the implementation of dynamic timebar content to be able to open and close timelines by adding and removing elements to this list
    ListModel {
        id: setsModel
        objectName: "QmlsetsModel" // For test purpose
        
        // First dummy element of the model, necessary in order to define its fields
        ListElement {
            name: ""                  // Name of the timeline to display in the timebar
            Xposition: 0              // X coords of the timeline in the dataContainer
            Xbase: 0                  // Base X coords position of the timeline used to draw the line representing the shift of the timeline
            Xwidth: 0                 // Width of the timeline in X coords
            setcolor: "transparent"   // Color of the timeline
            timeoffsettxt: ""         // Text display for the timeline shift on the left of its name
            isSession: false          // Set to true if the timeline is a session, which mean that the display width is infinite
            isMaster: false           // Set to true if the timeline is a master session, its name shall be bold in this case
        }
    }//End of timelinesModel

    property variant isFirstTimeLine: true 
    
    // Insert a session/dataset/recordset at a given position
    function insertSet(idx, name, position, basepos, width, color, ofstext,issession,ismaster) {
        // If still here, remove the first dummy element of the setsModel
        if( isFirstTimeLine ) {
            // Remove element at position 0
            setsModel.remove(0)
            isFirstTimeLine = false
        }
        setsModel.insert(idx, { "name": name, "Xposition": position, "Xbase": basepos, "Xwidth": width, "setcolor": color, "timeoffsettxt": ofstext, "isSession":  issession, "isMaster":  ismaster})
    }
    
    // Remove a session/dataset/recordset from a given position
    function removeSet(idx) {
        // Remove element from the position given by idx
        setsModel.remove(idx)
    }
    
    // Set the timeline of TlId as the master session
    function setSessionAsMaster(TlId) {
        var i
        for(i=0;i<setsModel.count;i++) {
            // Unset the master status of all timelines
            setsModel.get(i).isMaster =  false
            if(i == TlId) {
                // Set the master status of the timeline of TlId
                setsModel.get(i).isMaster = true
            }
        }
    }
    
    // Update the timelines position and width after an update of dataContainer time position and/or zoom value
    function updateTimelines(TlId,TlXpos,TlWidth, TlBase) {
        // Update both the children and the model entry because the drag of the timeline may have broken the parameter binding
        setsModel.get(TlId).Xposition = TlXpos
        timelinesBarsContainer.children[TlId].children[0].x = TlXpos         // We update the children of the children because the first children is the container of both timeline and offset indicator
        setsModel.get(TlId).Xwidth = TlWidth
        timelinesBarsContainer.children[TlId].children[0].width =  TlWidth  // We update the children of the children because the first children is the container of both timeline and offset indicator
        // Update both model and parameter binding because it seems this is not working otherwise
        setsModel.get(TlId).Xbase = TlBase
     }
    
    // Update the offset text label of a timeline
    function updateTimelineOfsTxtLbl(TlId,Label) {
        // Update the label in the model
        setsModel.get(TlId).timeoffsettxt = Label
    }
    
    // Update the name text label and color of a timeline
    function updateTimelineName(TlId,Label,Color) {
        // Update the label and color in the model
        setsModel.get(TlId).name = Label
        setsModel.get(TlId).setcolor = Color
    }
    
    // Recompute and redraw the time scale according to updated msSinceEpochDataContainer and nbMsInPixel
    function updateTimescale() {
        timelineLabels.updateLabels()
    }

    //MouseArea used to update the cursor position in the timebar text label named _currentTimeLabel
    MouseArea {
        id: timebarFrameMouseArea
        anchors.fill: parent
        hoverEnabled: true
      
        onPositionChanged: {
            if( configParams.dataContainerWidth != 0)
                configParams.mouseCurrentPosition =  configParams.fromXcoodstoMsSinceEpoch(mouse.x-mainContainer.x-dataContainer.x)
        }                        
    }

    // the container of everything inside the timebar border
    Rectangle {
        id: mainContainer
        x: configParams.borderWidth + legendsContainer.width
        y: configParams.borderWidth
        width: parent.width - (2*configParams.borderWidth) - legendsContainer.width
        height: parent.height - (2*configParams.borderWidth)
        objectName: "QmlMainContainer" // For test purpose
        
        MouseArea {
            anchors.fill: parent
            
            onWheel: {
                var newResol
                // Check if the time scale has been loaded
                if( configParams.timeScaleLoaded == true )
                    {
                    // Activate the zoom on mouse wheel only is no keyboard key is pressed
                    if (!wheel.modifiers) {                
                        if (wheel.angleDelta.y > 0) {
                            // Zoom In
                            newResol = dataModel.nbMsInPixel / configParams.zoomStepFactor
                            if( newResol > configParams.minNbMsInPixel ) {
                                dataModel.nbMsInPixel = dataModel.nbMsInPixel / configParams.zoomStepFactor
                                configParams.msSinceEpochDataContainer += ( configParams.mouseCurrentPosition - configParams.msSinceEpochDataContainer ) * ( configParams.zoomStepFactor - 1 ) / configParams.zoomStepFactor
                            }
                        } else {
                            // Zoom Out
                            newResol = dataModel.nbMsInPixel * configParams.zoomStepFactor
                            if( newResol < configParams.maxNbMsInPixel ) {
                                dataModel.nbMsInPixel = dataModel.nbMsInPixel * configParams.zoomStepFactor
                                configParams.msSinceEpochDataContainer -= ( configParams.mouseCurrentPosition - configParams.msSinceEpochDataContainer ) * ( configParams.zoomStepFactor - 1 )
                            }
                        }
                    }
                }
            }
         }

        // The container of all the data (which is wider than the mainContainer, in order to allow sliding)
        Rectangle {
            id: dataContainer
            width: configParams.dataContainerWidth
            height: mainContainer.height
            x: -configParams.dataContainerLeftMargin 
            y: 0
            objectName: "QmlDataContainer" // For test purpose
            
            // Area to allow right clic in all timebar in order to provide general context menu
            Rectangle {
                id: dataContainerArea
                anchors.fill: parent
                anchors.top: parent.top
                anchors.left: parent.left
                color: "transparent"
                
                MouseArea {
                    anchors.fill: parent
                    acceptedButtons: Qt.RightButton
                   
                    onClicked: {
                        if(mouse.button == Qt.RightButton) {
                            configParams.showVisuWindowMenu = true
                        }
                    }
                }
            }
            
            // the container for all the timelines
            Rectangle {
                id: timelinesContainer
                x: 0
                y: 0
                width: parent.width

                Grid {
                    columns: 1
                    id: timelinesBarsContainer
                
                    // Repeater to draw all the colored bars of the timelines
                    Repeater {
                        model:setsModel 
                        
                        delegate: Rectangle { // Container for the timeline and the offset indicator below it
                            height: configParams.timelinesHeight
                            
                            // Timeline rectangle for session/dataset/recordset
                            Rectangle {
                                id: timeline
                                x: Xposition
                                y: index * configParams.timelinesHeight
                                height: configParams.timelinesHeight - configParams.tlOfsIndicatorHeight
                                width: Xwidth
                                color: setcolor
                                z: 2
                                
                                MouseArea {
                                    anchors.fill: parent
                                    drag.target: parent
                                    drag.axis: Drag.XAxis
                                    cursorShape: isMaster ? Qt.ArrowCursor : Qt.SizeHorCursor  // This to avoid drag on a master timelines (no offset update possible)
                                    acceptedButtons: isMaster ? Qt.RightButton : (Qt.LeftButton | Qt.RightButton) // This to avoid drag and double click on a master timelines because no offset update shall be possible
                                    
                                    property real dragXposStart           // Parameter used to compute the lengh of a drag of the timeline

                                    onPositionChanged: {
                                        // Update the drag flag to record that a drag is ongoing
                                        if( dataModel.isDragOnGoing == false )  {
                                            dragXposStart = timeline.x
                                            dataModel.isDragOnGoing = true
                                            configParams.elementToDrag = index         // Update elementToDrag, to let C++ store the timeline index
                                        }
                                        configParams.movedEltXOfs = timeline.x - Xposition  // Second update the offset to trigger the C++ to copy take it into account
                                    }
                                    
                                    onReleased: {
                                        // Check if this mouse release event is related to a drag event
                                        if( dataModel.isDragOnGoing == true )
                                        {
                                            configParams.latchEltXOfs = timeline.x - dragXposStart  // When the drag ended, ask C++ to latch the final dragged element offset
                                            dataModel.isDragOnGoing = false
                                        }
                                    }
                                    
                                    onClicked: {
                                        if(mouse.button == Qt.RightButton) {
                                            configParams.timeLineIdxMenu = index
                                        }
                                    }
                                    
                                    onDoubleClicked: {
                                        if(mouse.button == Qt.LeftButton) {
                                            configParams.elementToMove = index
                                        }
                                    }
                                }
                            }// End of timeline rectangle
                            
                            // Timeline mouse move rectangle to be able to send cursor position to C++ without slowing the drag functionality on the timeline
                            Rectangle {
                                x: timeline.x
                                y: timeline.y
                                height: timeline.height
                                width: timeline.width
                                color: "transparent"
                                
                                MouseArea {
                                    anchors.fill: parent
                                    hoverEnabled: true
                                    
                                    onPositionChanged: {
                                        if( configParams.dataContainerWidth != 0) {
                                            // First update the timeline index for C++
                                            configParams.timelineUnderMouse = index
                                            // Second update the mouse position, which will have the effect of resetting the timeline index in order to not show mouse position when not above a timeline
                                            configParams.mouseCurrentPosition =  configParams.fromXcoodstoMsSinceEpoch(mouse.x+parent.x)
                                        }
                                                
                                    }
                                }
                            }
                            
                            // Time shift indicator as a thin line below the timeline
                            Rectangle {
                                x: (timeline.x > Xbase) ? Xbase : timeline.x // Negative width is not working, so the position shall be updated
                                y: (index * configParams.timelinesHeight) + timeline.height
                                height: configParams.tlOfsIndicatorHeight
                                width: Math.abs(timeline.x - Xbase) // Negative width is not working, so the position shall be updated
                                color: configParams.tlShiftBarColor
                                z: 2                            
                            }
                        }// End of the Container for the timeline and the offset indicator below it
                    }// End of Repeater to create all the timelines
                }// end of the container with all the timelines
            }//end of timelinesContainer
            
            // the dates at the bottom of all timelines
            Rectangle {
                id: timelineLabels
                height: configParams.timelinesHeight
                x: 0
                y: dataContainer.height - height
                z: 2
                width: configParams.dataContainerWidth
                color: "white"
                border.width: 1
                border.color: "black"
                objectName: "QmlTimescale" // For test purpose

                // Duration between time labels in milliseconds
                //10, 20, 50, 100, 200, 500 milliseconds
                //1, 2, 5, 10, 20, 30 seconds
                //1, 2, 5, 10, 20, 30 minutes
                //1, 2, 5, 10, 24 hours
                //2, 5, 10.1458333, 30.4375, 60.875, 121.75, 365.25 days (durations after 5 days are fractional parts of one year duration from 1/36 to 1 year)
                //The three last durations have been choosen to reduce the impact of irregular duration of months and leap years
                //The labelsFormats are defined according to durBtWLabels
                property variant durBtWLabels: [10,20,50,100,200,500,1000,2000,5000,10000,20000,30000,60000,120000,300000,600000,1200000,1800000,3600000,7200000,18000000,36000000,86400000,172800000,432000000,876600000,2629800000,5259600000,10519200000,31557600000]
                property variant labelsFormats:["ss.zzz","ss.zzz","ss.zzz","ss.zzz","ss.zzz","ss.z","ss.z","ss.z","HH:mm:ss","HH:mm:ss","HH:mm:ss","HH:mm:ss","HH:mm:ss","HH:mm:ss","HH:mm:ss","HH:mm:ss","HH:mm:ss","HH:mm:ss","HH:mm:ss","HH:mm:ss","dd/MM HH:mm","dd/MM HH:mm","dd/MM","dd/MM","dd/MM","dd/MM","MM/yyyy","MM/yyyy","MM/yyyy","yyyy"]
                property int durBtwLabelsIdx                
                
                // Container for the list of labels of the timelineLabels
                ListModel {
                    id: listOfTimeLineLabels
                }

                // Method to recalculate the listOfTimeLineLabels container according to zoom factor and dataContainer position
                function updateLabels() {
                    var minDurBtwLabels
                    var curDurBtwLabels
                    var labelValMs
                    var labelXpos
                    var labelXinc
                    var formatIdx=0
                    var timeLblidx
                    var earliestLblMs
                    var txtLabel
                    
                    // Compute the minimum millisecond duration between labels according to zoom
                    minDurBtwLabels = configParams.fromPxtoMs(configParams.minTimeScaleLabelsWidth)
                    // Look for the duration between labels and associated format immediately above the minimum computed duration
                    // Loop before reaching the end of durBtWLabels in order to use the last label in case of minimum zoom 
                    while( (formatIdx<(durBtWLabels.length-1)) && (durBtWLabels[formatIdx]<minDurBtwLabels) ) formatIdx++
                    // Read in configuration the duration between label to be used and convert it into pixels
                    curDurBtwLabels = durBtWLabels[formatIdx]
                    labelXinc = configParams.fromMsToPxSaturated(curDurBtwLabels)
                    // Compute the earliest possible position for the first label, in order to have enough space on the left of the label to center it, we add an half of label width
                    earliestLblMs = configParams.msSinceEpochDataContainer + (curDurBtwLabels/2)
                    // Compute the time position of the first label of the scale and translate it into pixels position
                    // Use a modulo operation to get a label set on a multiple of the distance between two labels
                    labelValMs = ( earliestLblMs + curDurBtwLabels ) - ( earliestLblMs % curDurBtwLabels)
                    // Correct if necessary the position of the first label
                    txtLabel = configParams.txtTimeLabelfromMsSinceEpoch(labelValMs,labelsFormats[formatIdx],curDurBtwLabels,false)
                    labelValMs = configParams.correctedLabelfromMsSinceEpoch()
                    // Convert in x coordinates the position of the first label
                    labelXpos=configParams.fromMsSinceEpochToXcoordsPx(labelValMs,configParams.msSinceEpochDataContainer)
                    
                    timeLblidx = 0
                    while( (labelXpos < configParams.dataContainerWidth) ){
                        // Rewrite or add text label in the list
                        if(listOfTimeLineLabels.count<=timeLblidx) listOfTimeLineLabels.append( {"label": txtLabel , "pos": labelXpos} )
                        else listOfTimeLineLabels.set(timeLblidx, {"label": txtLabel , "pos": labelXpos} )
                        // Increment the position of the label to its next position
                        labelValMs+=curDurBtwLabels
                        // Convert in text and correct if necessary the position of the next label
                        txtLabel = configParams.txtTimeLabelfromMsSinceEpoch(labelValMs,labelsFormats[formatIdx],curDurBtwLabels,true)
                        labelValMs = configParams.correctedLabelfromMsSinceEpoch()
                        // Convert in x coordinates the position of the next label
                        labelXpos=configParams.fromMsSinceEpochToXcoordsPx(labelValMs,configParams.msSinceEpochDataContainer)
                        // Increment label counter
                        timeLblidx++                        
                    }
                    // Remove useless labels from the list (when the list was longer in the previous time scale)
                    while( timeLblidx < listOfTimeLineLabels.count ){
                        listOfTimeLineLabels.remove(timeLblidx)
                    }
                    // Save the current time scale characteristics, number of pixels between label in C++ conf, and index in label format list locally in QML
                    configParams.timeScaleLabelsWidth = labelXinc
                    durBtwLabelsIdx = formatIdx
                }
                
                // The dates labels    
                Repeater {
                    model: listOfTimeLineLabels
                    Rectangle {
                        width: configParams.timeScaleLabelsWidth
                        height: timelineLabels.height
                        color: "transparent"
                        x: pos - (configParams.timeScaleLabelsWidth/2)
                        
                        // Small mark showing the position of the date related to the label below
                        Rectangle {
                            y : -5
                            width: 1
                            height: 5
                            color: "black"
                            anchors.horizontalCenter: parent.horizontalCenter
                        }
                        
                        // Text label of the date
                        Text {
                            horizontalAlignment : Text.AlignHCenter
                            width: parent.width
                            height: parent.height
                            text: label
                            font.pixelSize: configParams.timelinesHeight * configParams.textSizeRatio
                            anchors.horizontalCenter: parent.horizontalCenter
                        }
                    }
                }
             
                //Area to move the dataContainer (all loaded timelines and the visualization window)
                MouseArea {
                    id: timelineLabelsMouseArea
                    anchors.fill: parent
                    drag.target: dataContainer
                    drag.axis: Drag.XAxis
                    drag.minimumX: -configParams.dataContainerWidth + mainContainer.width
                    drag.maximumX: 0
                    cursorShape: Qt.SizeHorCursor
                    acceptedButtons: Qt.LeftButton
                    property variant isDragOnGoing: false // Parameter to detect if a MouseRelease event is related to drag or click

                    onPositionChanged: {
                        // Update the drag flag to record that a drag is ongoing
                        isDragOnGoing = true
                    }
                    
                    onReleased: {
                        // Check if this mouse release event is related to a drag event
                        if( isDragOnGoing == true )
                        {
                            if( configParams.timeScaleLoaded == true )
                            {
                                var offsetMs = configParams.fromPxtoMs(dataContainer.x+(configParams.dataContainerLeftMargin)) // Compute the span of the mouse drag in milliseconds
                                dataContainer.x = -(configParams.dataContainerLeftMargin)         // Set again the start of the dataContainer one screen width on the left of mainContainer left border
                                configParams.msSinceEpochDataContainer -= offsetMs
                            }
                            isDragOnGoing = false
                        }
                    }
                }                
            }//End of timelineLabels
           
            // The dashed line representing the lower currentTime limit in sliding mode
            Item {
                id: lowerSlideLimit
                x: configParams.fromMsSinceEpochToXcoordsPx(dataModel.lowerSlideLimit,configParams.msSinceEpochDataContainer)
                y : 0
                z: 3
                width: configParams.barsWidth
                height: parent.height
                visible: false
                objectName: "QmlLowSlideLimTime" // For test purpose

                Column {
                    spacing: lowerSlideLimit.height / 40 

                    Repeater {
                        model: 20
                            
                        Rectangle {
                            width: lowerSlideLimit.width
                            height: lowerSlideLimit.height / 40
                            color: configParams.visuWndBarsColor
                        }
                    }
                }

                MouseArea {
                    id: lowerSlideLimitMouseArea
                    anchors.fill: parent
                    drag.target: parent
                    drag.axis: Drag.XAxis
                    drag.minimumX: beforeTime.x
                    drag.maximumX: currentTime.x
                    cursorShape: Qt.SizeHorCursor
                    acceptedButtons: Qt.LeftButton

                    onPositionChanged: {
                        // Update the drag flag to record that a drag is ongoing
                        if( dataModel.isDragOnGoing == false ) dataModel.isDragOnGoing = true
                        // If the time scale is loaded, update the mouse current position label
                        if( configParams.dataContainerWidth != 0)
                            configParams.mouseCurrentPosition =  configParams.fromXcoodstoMsSinceEpoch(mouse.x+lowerSlideLimit.x)
                    }
                    
                    onReleased: {
                        // Check if this mouse release event is related to a drag event
                        if( dataModel.isDragOnGoing == true )
                        {
                            dataModel.lowerSlideLimit = configParams.fromXcoodstoMsSinceEpoch(lowerSlideLimit.x)
                            dataModel.isDragOnGoing = false
                        }
                    }
                    
                    onDoubleClicked: {
                        if(mouse.button == Qt.LeftButton) {
                            configParams.elementToMove = TBElt.TBElt_LowerSlideLimit
                        }
                    }
                    
                    // This function is used to update the upperSlideLimit position when entering the SlidingMode
                    function updateMode(visuMode) {
                        if( visuMode == QmlVisuMode.VISU_QML_MODE_SLIDING ) {
                            var lowerAreaWidthMs
                            lowerAreaWidthMs = dataModel.currentTime - dataModel.startTime
                            // When entering sliding mode, check if the lowerSlideLimit is not out of bounds and correct if necessary
                            if( dataModel.lowerSlideLimit > dataModel.currentTime)
                                // Try to not stick lowerSlideLimit to currentTime
                                if( lowerAreaWidthMs > configParams.fromPxtoMs(lowerSlideLimit.width) ) dataModel.lowerSlideLimit = dataModel.currentTime - configParams.fromPxtoMs(lowerSlideLimit.width)
                                else dataModel.lowerSlideLimit = dataModel.currentTime
                            if( dataModel.lowerSlideLimit < dataModel.startTime)
                                // Try to not stick lowerSlideLimit to beforeTime
                                if( lowerAreaWidthMs > configParams.fromPxtoMs(beforeTime.width) ) dataModel.lowerSlideLimit = dataModel.startTime + configParams.fromPxtoMs(beforeTime.width)
                                else dataModel.lowerSlideLimit = dataModel.startTime
                            lowerSlideLimit.visible = true
                        } else {
                            lowerSlideLimit.visible = false
                        }
                    } 

                    // This function is used to update the lowerSlideLimit according to old visuWindow.x when it has already been updated                
                    function updateXPosOnDrag(oldWindowXpos) {
                        lowerSlideLimit.x += visuWindow.x - oldWindowXpos
                    }
                }
            }
            
            // The dashed line representing the upper limit of currentTime for visuWindow slide in sliding mode
            Item {
                id: upperSlideLimit
                x: configParams.fromMsSinceEpochToXcoordsPx(dataModel.upperSlideLimit,configParams.msSinceEpochDataContainer)
                y : 0
                z: 3
                width: configParams.barsWidth
                height: parent.height
                visible: false
                objectName: "QmlUpSlideLimTime" // For test purpose

                // The vertical dashed line of extended mode limit
                Column {
                    spacing: upperSlideLimit.height / 40 

                    Repeater {
                        model: 20

                        Rectangle {
                            width: upperSlideLimit.width
                            height: upperSlideLimit.height / 40
                            color: configParams.visuWndBarsColor
                        }
                    }
                }

                MouseArea {
                    id: upperSlideLimitMouseArea
                    anchors.fill: parent
                    drag.target: parent
                    drag.axis: Drag.XAxis
                    drag.minimumX: currentTime.x
                    drag.maximumX: afterTime.x
                    cursorShape: Qt.SizeHorCursor
                    acceptedButtons: Qt.LeftButton

                    onPositionChanged: {
                        // Update the drag flag to record that a drag is ongoing
                        if( dataModel.isDragOnGoing == false ) dataModel.isDragOnGoing = true
                        // If the time scale is loaded, update the mouse current position label
                        if( configParams.dataContainerWidth != 0)
                            configParams.mouseCurrentPosition =  configParams.fromXcoodstoMsSinceEpoch(mouse.x+upperSlideLimit.x)
                    }
                    
                    onReleased: {
                        // Check if this mouse release event is related to a drag event
                        if( dataModel.isDragOnGoing == true )
                        {
                            dataModel.upperSlideLimit = configParams.fromXcoodstoMsSinceEpoch(upperSlideLimit.x)
                            dataModel.isDragOnGoing = false
                        }
                    }
                    
                    onDoubleClicked: {
                        if(mouse.button == Qt.LeftButton) {
                            configParams.elementToMove = TBElt.TBElt_UpperSlideLimit
                        }
                    }
                    
                    // This function is used to update the upperSlideLimit position when entering the SlidingMode
                    function updateMode(visuMode) {
                        if( visuMode == QmlVisuMode.VISU_QML_MODE_SLIDING ) {
                            var upperAreaWidthMs
                            upperAreaWidthMs = dataModel.endTime - dataModel.currentTime
                            // When entering sliding mode, check if the upperSlideLimit is not out of bounds and correct if necessary
                            if( dataModel.upperSlideLimit > dataModel.endTime)
                                // Try to not stick upperSlideLimit to visuWindowEnd
                                if( upperAreaWidthMs > configParams.fromPxtoMs(upperSlideLimit.width) ) dataModel.upperSlideLimit = dataModel.endTime - configParams.fromPxtoMs(upperSlideLimit.width)
                                else dataModel.upperSlideLimit = dataModel.endTime
                            if( dataModel.upperSlideLimit < dataModel.currentTime)
                                // Try to not stick upperSlideLimit to currentTime
                                if( upperAreaWidthMs > configParams.fromPxtoMs(currentTime.width) ) dataModel.upperSlideLimit = dataModel.currentTime + configParams.fromPxtoMs(currentTime.width)
                                else dataModel.upperSlideLimit = dataModel.currentTime
                                    
                            upperSlideLimit.visible = true
                        } else {
                            upperSlideLimit.visible = false
                        }
                    }

                    // This function is used to update the upperSlideLimit according to old visuWindow.x when it has already been updated                
                    function updateXPosOnDrag(oldWindowXpos) {
                        upperSlideLimit.x += visuWindow.x - oldWindowXpos
                    } 
                }
            }
           
            // The dashed line representing the upper limit of afterTime for visuWindow slide in extended mode
            Item {
                id: upperExtendedLimit
                x: configParams.fromMsSinceEpochToXcoordsPx(dataModel.upperExtendedLimit,configParams.msSinceEpochDataContainer)
                y : 0
                z: 3
                width: configParams.barsWidth
                height: parent.height
                visible: false
                objectName: "QmlUpExtLimTime" // For test purpose

                Column {
                    spacing: upperExtendedLimit.height / 40 

                    Repeater {
                        model: 20
                            
                        Rectangle {
                            width: upperExtendedLimit.width
                            height: upperExtendedLimit.height / 40
                            color: configParams.visuWndBarsColor
                        }
                    }
                }

                MouseArea {
                    id: upperExtendedLimitMouseArea
                    anchors.fill: parent
                    drag.target: parent
                    drag.axis: Drag.XAxis
                    drag.minimumX: afterTime.x
                    cursorShape: Qt.SizeHorCursor
                    acceptedButtons: Qt.LeftButton
                    
                    onPositionChanged: {
                        // Update the drag flag to record that a drag is ongoing
                        if( dataModel.isDragOnGoing == false ) dataModel.isDragOnGoing = true
                        // If the time scale is loaded, update the mouse current position label
                        if( configParams.dataContainerWidth != 0)
                            configParams.mouseCurrentPosition =  configParams.fromXcoodstoMsSinceEpoch(mouse.x+upperExtendedLimit.x)
                    }
                    
                    onReleased: {
                        // Check if this mouse release event is related to a drag event
                        if( dataModel.isDragOnGoing == true )
                        {
                            dataModel.upperExtendedLimit = configParams.fromXcoodstoMsSinceEpoch(upperExtendedLimit.x)
                            dataModel.isDragOnGoing = false
                        }
                    }
                    
                    onDoubleClicked: {
                        if(mouse.button == Qt.LeftButton) {
                            configParams.elementToMove = TBElt.TBElt_UpperExtendedLimit
                        }
                    }
                    
                    // This function is used to update the upperExtendedLimit position when entering the ExtendedMode
                    function updateMode(visuMode) {
                        if( visuMode == QmlVisuMode.VISU_QML_MODE_EXTENDED ) {
                            if( dataModel.upperExtendedLimit < dataModel.endTime) dataModel.upperExtendedLimit = dataModel.endTime + configParams.fromPxtoMs(afterTime.width)
                            upperExtendedLimit.visible = true
                        } else {
                            upperExtendedLimit.visible = false
                        }
                    }
                    
                    // This function is used to update the upperExtendedLimit according to old visuWindow.x when it has already been updated
                    function updateXPosOnDrag(oldWindowXpos) {
                        upperExtendedLimit.x += visuWindow.x - oldWindowXpos
                    }
                }
            }
            
            // The two additionnal lines from afterTime to upperExtendedLimit representing the limits of the extended mode
            Item {
                id: extendedModeArea
                x: afterTime.x + afterTime.width
                y: 0
                z: 3
                width: upperExtendedLimit.x - afterTime.x
                height: parent.height
                visible: upperExtendedLimit.visible
                property int dashlen: 7


                // Container for the list of dashs for upper and lower dashed lines
                ListModel {
                    id: extendedModeAreaList

                    Component.onCompleted: {
                        clear()
                        // We add 0.5 to count in order to not display an additional dash after the upperExtendedLimit
                        while( (extendedModeAreaList.count + 0.5 ) < (extendedModeArea.width / (2*extendedModeArea.dashlen)) )
                           extendedModeAreaList.append( {"dash": extendedModeAreaList.count} )
                    }
                }

                Row {
                    spacing: extendedModeArea.dashlen
                    // The upper horizontal dashed line from afterTime to upperExtendedLimit                
                    Repeater {
                        model: extendedModeAreaList
                        
                        Rectangle {
                            y: 0
                            width: extendedModeArea.dashlen
                            height: configParams.barsWidth
                            color: configParams.visuWndBarsColor
                        }
                    }
                }


                Row {
                    spacing: extendedModeArea.dashlen
                    // The lower horizontal dashed line from afterTime to upperExtendedLimit                
                    Repeater {
                        model: extendedModeAreaList            
                           
                        Rectangle {
                            y: extendedModeArea.height - height
                            width: extendedModeArea.dashlen
                            height: configParams.barsWidth
                            color: configParams.visuWndBarsColor
                        }
                    }
                }
                
                // Method to update the number of dash in dashed line
                onWidthChanged: {
                    extendedModeAreaList.clear()
                    // We add 0.5 to count in order to not display an additional dash after the upperExtendedLimit
                    while( (extendedModeAreaList.count + 0.5 ) < (extendedModeArea.width / (2*extendedModeArea.dashlen)) )
                        extendedModeAreaList.append( {"dash":extendedModeAreaList.count} )
                }            
            } 
            
            // The left boundary bar of the timeline, declared above the playing modes limits but below the currentTime bar
            Rectangle {
                id: beforeTime
                x: configParams.fromMsSinceEpochToXcoordsPx(dataModel.startTime,configParams.msSinceEpochDataContainer)
                y : 0
                z: 3
                width: configParams.barsWidth
                height: parent.height
                color: configParams.visuWndBarsColor
                objectName: "QmlBeforeTime" // For test purpose
                
                MouseArea {
                    id: beforeTimeMouseArea
                    anchors.fill: parent
                    drag.target: parent
                    drag.axis: Drag.XAxis
                    cursorShape: Qt.SizeHorCursor
                    acceptedButtons: Qt.LeftButton
                    property variant isDragVisuWindow: false // Parameter to detect if the drag of beforeTime led to the drag of visualization window.
                                                             // This is useful because if the visualization window has been dragged, this is up to the onRelease mouse
                                                             // even of it to update the beforeTime position in configParams
                    
                    onPositionChanged: {
                        // Update the drag flag to record that a drag is ongoing
                        if( dataModel.isDragOnGoing == false ) dataModel.isDragOnGoing = true
                        // If the time scale is loaded, update the mouse current position label
                        if( configParams.dataContainerWidth != 0)
                            configParams.mouseCurrentPosition =  configParams.fromXcoodstoMsSinceEpoch(mouse.x+beforeTime.x)
                        // Check if visuWindow shall be dragged
                        if( (beforeTime.x > lowerSlideLimit.x) && (configParams.visuModeFromName(dataModel.visualizationMode) == QmlVisuMode.VISU_QML_MODE_SLIDING ) ) {
                            visuWindowMouseArea.posUpdateOnDrag(TBElt.TBElt_BeforeTime, beforeTime.x-lowerSlideLimit.x)
                            isDragVisuWindow = true
                        }
                        if( (beforeTime.x > currentTime.x) && (configParams.visuModeFromName(dataModel.visualizationMode) != QmlVisuMode.VISU_QML_MODE_SLIDING ) ) {
                            visuWindowMouseArea.posUpdateOnDrag(TBElt.TBElt_BeforeTime, beforeTime.x-currentTime.x)
                            isDragVisuWindow = true
                        }
                    }
                    
                    onReleased: {
                        // Check if this mouse release event is related to a drag event
                        if( dataModel.isDragOnGoing == true )
                        {
                            // In case the visualization window hasn't been dragged, we need to update here the beforeTime position in configParams
                            if( isDragVisuWindow == false) dataModel.startTime = configParams.fromXcoodstoMsSinceEpoch(beforeTime.x)
                            // Otherwise, the update of beforeTime will be done by the visualisation window mouseRelease event manager
                            else visuWindowMouseArea.mouseReleaseOnDrag(TBElt.TBElt_BeforeTime)
                            // Reset the drag flags
                            isDragVisuWindow = false
                            dataModel.isDragOnGoing = false
                        }
                    }
                    
                    onDoubleClicked: {
                        if(mouse.button == Qt.LeftButton) {
                            configParams.elementToMove = TBElt.TBElt_BeforeTime
                        }
                    }
                    
                    // This function is used to update the beforeTimeMouseArea limits on entering the SlidingMode
                    function updateMode(visuMode) {
                        // No drag limit for beforeTime because the visuWindow shall be dragged, but the function still exist to has the same structure for all bars
                    }
                }
            } 
            
            // The upper right bar of the timeline, declared above the playing modes limits but below the currentTime bar
            Rectangle {
                id: afterTime
                x: configParams.fromMsSinceEpochToXcoordsPx(dataModel.endTime,configParams.msSinceEpochDataContainer)
                y : 0
                z: 3
                width: configParams.barsWidth
                height: parent.height
                color: configParams.visuWndBarsColor
                objectName: "QmlAfterTime" // For test purpose

                MouseArea {
                    id: afterTimeMouseArea
                    anchors.fill: parent
                    drag.target: parent
                    drag.axis: Drag.XAxis
                    cursorShape: Qt.SizeHorCursor
                    acceptedButtons: Qt.LeftButton
                    property variant isDragVisuWindow: false // Parameter to detect if the drag of afterTime led to the drag of visualization window.
                                                             // This is usefull because if the visualization window has been dragged, this is up to the onRelease mouse
                                                             // even of it to update the afterTime position in configParams
                    
                    onPositionChanged: {
                        // Update the drag flag to record that a drag is ongoing
                        if( dataModel.isDragOnGoing == false ) dataModel.isDragOnGoing = true
                        // If the time scale is loaded, update the mouse current position label
                        if( configParams.dataContainerWidth != 0)
                            configParams.mouseCurrentPosition =  configParams.fromXcoodstoMsSinceEpoch(mouse.x+afterTime.x)
                        // Check if visuWindow shall be dragged
                        if( (afterTime.x > upperExtendedLimit.x) && (configParams.visuModeFromName(dataModel.visualizationMode) == QmlVisuMode.VISU_QML_MODE_EXTENDED ) ) {
                            visuWindowMouseArea.posUpdateOnDrag(TBElt.TBElt_AfterTime, afterTime.x-upperExtendedLimit.x)
                            isDragVisuWindow = true
                        }
                        if( (afterTime.x < upperSlideLimit.x) && (configParams.visuModeFromName(dataModel.visualizationMode) == QmlVisuMode.VISU_QML_MODE_SLIDING ) ) {
                            visuWindowMouseArea.posUpdateOnDrag(TBElt.TBElt_AfterTime, afterTime.x-upperSlideLimit.x)
                            isDragVisuWindow = true
                        }
                        if( (afterTime.x < currentTime.x) && (configParams.visuModeFromName(dataModel.visualizationMode) != QmlVisuMode.VISU_QML_MODE_SLIDING ) ) {
                            visuWindowMouseArea.posUpdateOnDrag(TBElt.TBElt_AfterTime, afterTime.x-currentTime.x)
                            isDragVisuWindow = true
                        }
                    }
                    
                    onReleased: {
                        // Check if this mouse release event is related to a drag event
                        if( dataModel.isDragOnGoing == true )
                        {
                            // In case the visualization window hasn't been dragged, we need to update here the afterTime position in configParams
                            if( isDragVisuWindow == false) dataModel.endTime = configParams.fromXcoodstoMsSinceEpoch(afterTime.x)
                            // Otherwise, the update of afterTime will be done by the visualisation window mouseRelease event manager
                            else visuWindowMouseArea.mouseReleaseOnDrag(TBElt.TBElt_AfterTime)
                            // Reset the drag flags
                            isDragVisuWindow = false
                            dataModel.isDragOnGoing = false
                        }
                    }
                    
                    onDoubleClicked: {
                        if(mouse.button == Qt.LeftButton) {
                            configParams.elementToMove = TBElt.TBElt_AfterTime
                        }
                    }
                    
                    // This function is used to update the afterTimeMouseArea limits when changing mode
                    function updateMode(visuMode) {
                        // No drag limit for afterTime because the visuWindow shall be dragged, but the function still exist to has the same structure for all bars
                    }
                }
            }      

            // The current time bar, declared after the other bars in order to be in front of them
            Rectangle {
                id: currentTime
                x: configParams.fromMsSinceEpochToXcoordsPx(dataModel.currentTime,configParams.msSinceEpochDataContainer)
                y : 0
                z: 3
                width: configParams.barsWidth
                height: parent.height
                color: configParams.currTimeBarColor
                objectName: "QmlCurrentTime" // For test purpose

                MouseArea {
                    id: currentTimeMouseArea
                    anchors.fill: parent
                    drag.target: parent
                    drag.axis: Drag.XAxis
                    cursorShape: Qt.SizeHorCursor
                    acceptedButtons: Qt.LeftButton | Qt.RightButton
                    property variant isDragVisuWindow: false // Parameter to detect if the drag of currTime led to the drag of visualization window.
                                                             // This is usefull because if the visualization window has been dragged, this is up to the onRelease mouse
                                                             // even of it to update the currTime position in configParams
                    
                    onPositionChanged: {
                        // Update the drag flag to record that a drag is ongoing
                        if( dataModel.isDragOnGoing == false ) dataModel.isDragOnGoing = true
                        // If the time scale is loaded, update the mouse current position label
                        if( configParams.dataContainerWidth != 0)
                            configParams.mouseCurrentPosition =  configParams.fromXcoodstoMsSinceEpoch(mouse.x+currentTime.x)
                        // Check if visuWindow shall be dragged
                        if( (currentTime.x > afterTime.x) && (configParams.visuModeFromName(dataModel.visualizationMode) != QmlVisuMode.VISU_QML_MODE_SLIDING ) ) {
                            visuWindowMouseArea.posUpdateOnDrag(TBElt.TBElt_CurrentTime, currentTime.x-afterTime.x)
                            isDragVisuWindow = true
                        }
                        if( (currentTime.x < beforeTime.x) && (configParams.visuModeFromName(dataModel.visualizationMode) != QmlVisuMode.VISU_QML_MODE_SLIDING ) ) {
                            visuWindowMouseArea.posUpdateOnDrag(TBElt.TBElt_CurrentTime, currentTime.x-beforeTime.x)
                            isDragVisuWindow = true
                        }
                        if( (currentTime.x > upperSlideLimit.x) && (configParams.visuModeFromName(dataModel.visualizationMode) == QmlVisuMode.VISU_QML_MODE_SLIDING ) ) {
                            visuWindowMouseArea.posUpdateOnDrag(TBElt.TBElt_CurrentTime, currentTime.x-upperSlideLimit.x)
                            isDragVisuWindow = true
                        }
                        if( (currentTime.x < lowerSlideLimit.x) && (configParams.visuModeFromName(dataModel.visualizationMode) == QmlVisuMode.VISU_QML_MODE_SLIDING ) ) {
                            visuWindowMouseArea.posUpdateOnDrag(TBElt.TBElt_CurrentTime, currentTime.x-lowerSlideLimit.x)
                            isDragVisuWindow = true
                        }
                    }
                    
                    onReleased: {
                        // Check if this mouse release event is related to a drag event
                        if( dataModel.isDragOnGoing == true )
                        {   
                            // In case the visualization window hasn't been dragged, we need to update here the currTime position in configParams
                            if( isDragVisuWindow == false) dataModel.currentTime = configParams.fromXcoodstoMsSinceEpoch(currentTime.x)
                            // Otherwise, the update of currTime will be done by the visualisation window mouseRelease event manager
                            else visuWindowMouseArea.mouseReleaseOnDrag(TBElt.TBElt_CurrentTime)
                            // Reset the drag flags
                            isDragVisuWindow = false
                            dataModel.isDragOnGoing = false
                        }
                    }    
                    
                    onDoubleClicked: {
                        if(mouse.button == Qt.LeftButton) {
                            configParams.elementToMove = TBElt.TBElt_CurrentTime
                        }
                    }
                    
                    onClicked: {
                        if(mouse.button == Qt.RightButton) {
                            configParams.showVisuWindowMenu = true
                        }
                    }
                    
                    // This function is used to update the currentTimeMouseArea limits when changing mode
                    function updateMode(visuMode) {
                        // No drag limit for currentTime because the visuWindow shall be dragged, but the function still exists to have the same structure for all bars
                    }         
                }
            }
            
            //The visualization window mouse area rectangle
            Rectangle {
                id: visuWindow
                x: beforeTime.x
                y : 0
                z: -1
                width: afterTime.x - beforeTime.x
                height: parent.height
                objectName: "QmlVisuWindow" // For test purpose
                
                //Area to move the visualization window
                MouseArea {
                    id: visuWindowMouseArea
                    anchors.fill: parent
                    drag.target: parent
                    drag.axis: Drag.XAxis
                    z: 1
                    acceptedButtons: Qt.LeftButton | Qt.RightButton
                    property variant isDragOnGoing: false // Parameter to detect if a MouseRelease event is related to drag or click, visuWindow cannot share this parameter because its drag services are called by others
                    property real dragXposStart           // Parameter used to compute the lengh of a drag of the visualization window
                    
                    // These functions are used to allow the currentTime bar to drag the visuWindow
                    function posUpdateOnDrag(movedElt, deltaX) {
                        // Variables declaration
                        var old_cur_pos
                        var old_width
                        var oldWindowXpos
                        // Check if the start of drag position shall be latched by reading the local flag (this service can be call when a visuWindow bar is dragged)
                        if( isDragOnGoing == false ) {
                            // Update the drag flag to record that a drag is ongoing
                            isDragOnGoing = true
                            // Save the start position of the visualization window drag
                            dragXposStart = visuWindow.x
                        }
                        // onPositionChanged is a continous event, so we shall not trigger C++ of the visuWindow position update until it is finished with onReleased event
                        // The action taken here are breaking the paramter binding to make the visualization bar follow the dragged visualization window position
                        // Once the drag is finised, the parameter binding shall be set again and the C++ triggered
                        // First, save the position of the currentTime related to window start
                        if( movedElt != TBElt.TBElt_BeforeTime )  old_cur_pos = currentTime.x - beforeTime.x
                        else old_cur_pos = currentTime.x - beforeTime.x + deltaX
                        // Second, save the old window start position before dragging it
                        if( movedElt != TBElt.TBElt_BeforeTime )  oldWindowXpos = beforeTime.x
                        else oldWindowXpos = beforeTime.x - deltaX
                        // Third, save the window width before updating the window start position
                        if( (movedElt != TBElt.TBElt_BeforeTime) && (movedElt != TBElt.TBElt_AfterTime) ) old_width = visuWindow.width
                        else old_width = visuWindow.width + deltaX
                        // Fourth, we can update the window start, end positions, the current time and limits positions
                        if( movedElt != TBElt.TBElt_BeforeTime ) beforeTime.x += deltaX
                        if( movedElt != TBElt.TBElt_AfterTime ) afterTime.x = beforeTime.x + old_width
                        if( movedElt != TBElt.TBElt_CurrentTime ) currentTime.x = beforeTime.x + old_cur_pos
                        if( movedElt != TBElt.TBElt_LowerSlideLimit ) lowerSlideLimitMouseArea.updateXPosOnDrag(oldWindowXpos)
                        if( movedElt != TBElt.TBElt_UpperSlideLimit ) upperSlideLimitMouseArea.updateXPosOnDrag(oldWindowXpos)
                        if( movedElt != TBElt.TBElt_UpperExtendedLimit ) upperExtendedLimitMouseArea.updateXPosOnDrag(oldWindowXpos)
                    }
                    
                    function mouseReleaseOnDrag(movedElt) {
                        // Check if this mouse release event is related to a drag event with local flag
                        if( isDragOnGoing == true )
                        {
                            // Declare the required variables
                            var msDiff
                            var wndStart
                            var wndEnd
                            var currTime
                            var lowSlideLim
                            var upSlideLim
                            var upExtLim
                            // This is a mouse event, so the position of elements are based on X coordinates
                            msDiff = configParams.fromPxtoMs(visuWindow.x - dragXposStart)
                            if( movedElt != TBElt.TBElt_BeforeTime ) wndStart = dataModel.startTime + msDiff
                            else wndStart = configParams.fromXcoodstoMsSinceEpoch(beforeTime.x)
                            if( (movedElt != TBElt.TBElt_AfterTime) && (movedElt != TBElt.TBElt_BeforeTime) ) wndEnd = dataModel.endTime + msDiff
                            else wndEnd = configParams.fromXcoodstoMsSinceEpoch(afterTime.x)
                            if( (movedElt != TBElt.TBElt_CurrentTime) && (movedElt != TBElt.TBElt_BeforeTime) ) currTime = dataModel.currentTime + msDiff
                            else currTime = configParams.fromXcoodstoMsSinceEpoch(currentTime.x)
                            // Update the position of all modes limits
                            if( (movedElt != TBElt.TBElt_LowerSlideLimit) && (movedElt != TBElt.TBElt_BeforeTime) ) lowSlideLim = dataModel.lowerSlideLimit + msDiff
                            else lowSlideLim = configParams.fromXcoodstoMsSinceEpoch(lowerSlideLimit.x)
                            if( (movedElt != TBElt.TBElt_UpperSlideLimit) && (movedElt != TBElt.TBElt_BeforeTime) ) upSlideLim = dataModel.upperSlideLimit + msDiff
                            else upSlideLim = configParams.fromXcoodstoMsSinceEpoch(upperSlideLimit.x)
                            if( (movedElt != TBElt.TBElt_UpperExtendedLimit) && (movedElt != TBElt.TBElt_BeforeTime) ) upExtLim = dataModel.upperExtendedLimit + msDiff
                            else upExtLim = configParams.fromXcoodstoMsSinceEpoch(upperExtendedLimit.x)
                            // Trigger the window position update, this service will update the configParams values current time and visu window bars
                            configParams.setvisuWindowPos(wndStart,wndEnd,currTime,lowSlideLim,upSlideLim,upExtLim)
                            // Restore parameters binding in case they have been broken
                            if( movedElt != TBElt.TBElt_AfterTime ) afterTime.x =  Qt.binding( function() { return configParams.fromMsSinceEpochToXcoordsPx(dataModel.endTime,configParams.msSinceEpochDataContainer) } )
                            if( movedElt != TBElt.TBElt_BeforeTime ) beforeTime.x =  Qt.binding( function() { return configParams.fromMsSinceEpochToXcoordsPx(dataModel.startTime,configParams.msSinceEpochDataContainer) } )
                            if( movedElt != TBElt.TBElt_CurrentTime ) currentTime.x =  Qt.binding( function() { return configParams.fromMsSinceEpochToXcoordsPx(dataModel.currentTime,configParams.msSinceEpochDataContainer) } )
                            if( movedElt != TBElt.TBElt_LowerSlideLimit ) lowerSlideLimit.x = Qt.binding( function() { return configParams.fromMsSinceEpochToXcoordsPx(dataModel.lowerSlideLimit,configParams.msSinceEpochDataContainer) } )
                            if( movedElt != TBElt.TBElt_UpperSlideLimit ) upperSlideLimit.x = Qt.binding( function() { return configParams.fromMsSinceEpochToXcoordsPx(dataModel.upperSlideLimit,configParams.msSinceEpochDataContainer) } )
                            if( movedElt != TBElt.TBElt_UpperExtendedLimit ) upperExtendedLimit.x = Qt.binding( function() { return configParams.fromMsSinceEpochToXcoordsPx(dataModel.upperExtendedLimit,configParams.msSinceEpochDataContainer) } )
                            isDragOnGoing = false
                        }  
                    }
                    
                    onPositionChanged: {
                        if( dataModel.isDragOnGoing == false ) dataModel.isDragOnGoing = true
                        posUpdateOnDrag(TBElt.TBElt_VisuWindow, visuWindow.x-beforeTime.x)
                    }
                    
                    onReleased: {
                        if( dataModel.isDragOnGoing == true ) {
                            mouseReleaseOnDrag(TBElt.TBElt_VisuWindow)
                            dataModel.isDragOnGoing = false
                        }
                    }
                    
                    onClicked: {
                        if(mouse.button == Qt.RightButton) {
                            configParams.showVisuWindowMenu = true
                        }
                    }
                    
                    onDoubleClicked: {
                        if(mouse.button == Qt.LeftButton) {
                            configParams.elementToMove = TBElt.TBElt_VisuWindow
                        }
                    }
                }            
            }
            
            // The visuWindow painted area, it is different from its mouse area in order to have painted area above all but mouse area below all
            Rectangle {
                id: visuWindowArea
                x: visuWindow.x
                y: visuWindow.y
                z: 3
                width: visuWindow.width
                height: visuWindow.height
                color: configParams.visuWndColor
            }
        }//end of dataContainer
                        
    }// end of mainContainer

    // Change the visualization mode
    function setMode(selectedMode) {
        // Update the drag limits for all the visualization window elements
        lowerSlideLimitMouseArea.updateMode(selectedMode)
        upperSlideLimitMouseArea.updateMode(selectedMode)
        upperExtendedLimitMouseArea.updateMode(selectedMode)
        beforeTimeMouseArea.updateMode(selectedMode)
        afterTimeMouseArea.updateMode(selectedMode)
        currentTimeMouseArea.updateMode(selectedMode)
        return
    }//End of setMode function
  
    // the container for all the timelines names and offsets       
    Rectangle {
        id: legendsContainer
        x: configParams.borderWidth 
        y: configParams.borderWidth
        z: 4
        width: legendsContainerBorder.x - configParams.borderWidth
        height: mainContainer.height
        anchors.margins: 1
        border.color: "black"
        color: "white"
        
        Grid { 
            id: legendsContainerCol
            columns: 1

             Repeater {
                id: legendsContainerNamesRep
                model: setsModel
                objectName: "QmlLegendsContainer" // For test purpose
                
                delegate :Rectangle{
                    id: legendsContainerNamesRect
                    width: legendsContainer.width - configParams.smallLineWidth
                    height: configParams.timelinesHeight
                    color: "transparent"

                    // Line above the label to show the drag&drop destination of another label
                    Rectangle {
                        x: 0
                        y: 0
                        height: configParams.smallLineWidth
                        width: legendsContainerNamesRect.width
                        visible: false
                        color: "red"
                    }
                    
                    // White rectangle containing the name of the timeline
                    Rectangle {
                        id: legendsContainerNameLblRect
                        x: configParams.borderWidth
                        y: 1                                              // For an unknown reason, this rectangle overlap the timebar border by 1 pixel when y=0 
                        width: configParams.tlNamesContainerWidth
                        height: parent.height
                        color: "white"
                        
                        // Name of the timeline
                        Text {
                            text: name
                            font.bold: isMaster
                            font.pixelSize: configParams.timelinesHeight * configParams.textSizeRatio
                        }
                    }
                   
                    // White rectangle containing the time offset of the timeline
                    Rectangle {
                        id: legendsContainerOfsLblRect
                        x: legendsContainer.width - configParams.smallLineWidth - configParams.tlOffsetsContainerWidth + 1 // Same as below, 1 is added to correct overlap for unknow reason
                        y: 1                                              // For an unknown reason, this rectangle overlap the timebar border by 1 pixel when y=0 
                        width: configParams.tlOffsetsContainerWidth
                        height: parent.height
                        color: "white"
                        
                        // Offset of the timeline
                        Text {
                            text: timeoffsettxt
                            font.bold: isMaster
                            font.pixelSize: configParams.timelinesHeight * configParams.textSizeRatio
                        }
                    }
                    
                    // Line below the label to show the drag&drop destination of another label
                    Rectangle {
                        x: 0
                        y: configParams.timelinesHeight - configParams.smallLineWidth
                        height: configParams.smallLineWidth
                        width: legendsContainerNamesRect.width
                        visible: false
                        color: "red"
                    }
                    
                    MouseArea {
                        anchors.fill: parent
                        drag.target: parent
                        drag.axis: Drag.YAxis
                        drag.minimumY: 0
                        drag.maximumY: legendsContainerCol.height
                        cursorShape: Qt.SizeVerCursor
                        acceptedButtons: Qt.LeftButton | Qt.RightButton
                        property variant isDragOnGoing: false // Parameter to detect if a MouseRelease event is related to drag or click
                        property variant startYPos            // Backup of the start Y position at the begining of a drag
                        property variant lastLblIdx           // Index of the last label identified as drag&drop destination
                        
                        onPositionChanged: {
                            // Store the old position of the label, to restore it if necessary and initialize the lastLblIdx
                            if( isDragOnGoing == false )
                            {
                                startYPos = parent.y
                                lastLblIdx = index
                                // Update the drag flag to record that a drag is ongoing
                                isDragOnGoing = true
                            }

                            // Only perform drag&drop management when there is more than one timeline
                            if(legendsContainerNamesRep.count > 1) {
                                // Index to look for the drag target in timelines model
                                var i
                                // Upper Y coordinate limit to detect the drag of the current label across another one
                                var upperLim
                                // Y coordinates of the first and second labels used to compute the upperLimit to find the drag destination
                                var upperLimFirstLblY
                                var upperLimSecondLblY
                                // Index of the found destination label to be replaced by the current label
                                var foundIdx=legendsContainerNamesRep.count - 1

                                // Look for the destination of the dragged label
                                i = 0
                                while( (i<legendsContainerNamesRep.count-1) && (foundIdx==legendsContainerNamesRep.count - 1) ) {
                                    if( index != i ) upperLimFirstLblY = legendsContainerCol.children[i].y
                                    else upperLimFirstLblY = startYPos
                                    if( index != (i+1) ) upperLimSecondLblY = legendsContainerCol.children[i+1].y
                                    else upperLimSecondLblY = startYPos
                                    upperLim = upperLimFirstLblY + ( (upperLimSecondLblY - upperLimFirstLblY ) / 2 )
                                    if( parent.y < upperLim ) foundIdx = i
                                    i++
                                }
                            
                                // Update the line of the label to replace in order to show the drag&drop destination
                                if( foundIdx != lastLblIdx )
                                {
                                    legendsContainerCol.children[lastLblIdx].children[3].visible = false
                                    legendsContainerCol.children[lastLblIdx].children[0].visible = false
                                    if(foundIdx != index)
                                    {
                                        if(foundIdx < index)
                                            legendsContainerCol.children[foundIdx].children[0].visible = true
                                        else
                                            legendsContainerCol.children[foundIdx].children[3].visible = true
                                    }
                                    lastLblIdx = foundIdx
                                }
                            }// end of the if(legendsContainerNamesRep.count > 1) 
                        }
                        
                        onReleased: {
                            // Check if this mouse release event is related to a drag event
                            if( isDragOnGoing == true )
                            {   
                                // Restore the position of the label before the drag&drop
                                parent.y = startYPos
                                // Hide the lines showing the drag&drop destination
                                legendsContainerCol.children[lastLblIdx].children[3].visible = false
                                legendsContainerCol.children[lastLblIdx].children[0].visible = false

                                // If the drag&drop target is different from the actual label position, move the label at this destination position
                                if( index != lastLblIdx ) {
                                    // First call the C++ interface because the index parameter is linked to setsModel and will be updated by the move service
                                    configParams.moveTimeline(index,lastLblIdx)
                                    setsModel.move(index,lastLblIdx,1)
                                }
                                // Reset the flag recording the drag&drop starting, as it is now finished
                                isDragOnGoing = false
                            }
                        }
                        
                        onClicked: {
                            if(mouse.button == Qt.RightButton) {
                                configParams.timeLineIdxMenu = index
                            }
                        }
                        
                        onDoubleClicked: {
                            // Check if the double click is in Name label area (for renaming), or in the Offset label area (for offset keyboard entry)
                            if(mouse.x > legendsContainerOfsLblRect.x) {
                                // Move of master timeline is not allowed, so check if the double click is not performed on master timeline
                                if (isMaster == false ) {
                                    configParams.elementToMove = index
                                }
                            } else {
                                configParams.tlToRename = index
                            }
                        }
                    }
                }//End of legendsContainerNamesRect
            }// End of legendsContainerNamesRep Repeater
        }// End of legendsContainerCol with timeline names and offsets
      
        // Mask to avoid the overlap of legend with time scale when the timebar have its minimum height
        Rectangle {
            anchors.bottom: legendsContainer.bottom
            anchors.left: legendsContainer.left
            anchors.leftMargin: 1    // without these margins, there is a 1 pixel overlap of this white mask over the timebar border
            anchors.bottomMargin: 1
            z: 5
            width: legendsContainer.width - (2*legendsContainer.border.width) 
            height: configParams.timelinesHeight - legendsContainer.border.width
            color: "white"
        }
        
        MouseArea {
            id: legendsContainerMouseArea
            z: -1
            anchors.fill: parent
            acceptedButtons: Qt.RightButton
            
            onClicked: {
                if(mouse.button == Qt.RightButton) {
                    configParams.showVisuWindowMenu = true
                }
            }
        } 
    }//end of legendsContainer   
    
    // Left border of the legendsContainer used to allow mouse resize of it
    Rectangle {
        id: legendsContainerBorder
        x: configParams.tlNamesContainerInitWidth + configParams.tlOffsetsContainerWidth + configParams.borderWidth + configParams.smallLineWidth
        y: 0
        z: 4
        height: legendsContainer.height + configParams.borderWidth
        width: configParams.smallLineWidth
        color: "black"
        
        MouseArea {
            anchors.fill: parent
            drag.target: parent
            drag.axis: Drag.XAxis
            drag.minimumX: configParams.tlOffsetsContainerWidth + configParams.borderWidth + 2 // Two is added due to unkwon reason overlap with timebar border
            drag.maximumX: timebarFrame.width / 2
            cursorShape: Qt.SizeHorCursor
            acceptedButtons: Qt.LeftButton
            
            onPositionChanged: {
                configParams.tlNamesContainerWidth = parent.x - configParams.tlOffsetsContainerWidth - configParams.borderWidth - configParams.smallLineWidth
            }
        }
    }
    
    // timebarFrame border declared at the end to be in front of all the other elements
    Rectangle {
        id: tbFrameBorderUp
        x: 0
        y: 0
        z: 6
        height: configParams.borderWidth
        width: parent.width
        color: configParams.borderColor
        objectName: "QmlTopBorder" // For test purpose
    }
    Rectangle {
        id: tbFrameBorderDwn
        x: 0
        y: parent.height-height
        z: 6
        height: configParams.borderWidth
        width: parent.width
        color: configParams.borderColor
        objectName: "QmlBottomBorder" // For test purpose
    }
    Rectangle {
        id: tbFrameBorderLeft
        x: 0
        y: 0
        z: 6
        height: parent.height
        width: configParams.borderWidth
        color: configParams.borderColor
        objectName: "QmlLeftBorder" // For test purpose
    }
    Rectangle {
        id: tbFrameBorderRight
        x: parent.width-width
        y: 0
        z: 6
        height: parent.height
        width: configParams.borderWidth
        color: configParams.borderColor
        objectName: "QmlRightBorder" // For test purpose
    }
         
}// end of timebarFrame
