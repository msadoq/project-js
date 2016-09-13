

function addTimeline(connectedData, tlId) {
  connectedData.foreach((element, index, array) => {
    if (element.timeline.contains('*')) {
      // Add subscription
    }
  });
}

function removeTimeline(connectedData, tlId) {
  connectedData.foreach((element, index, array) => {
    if (element.timeline.contains('*')) {
      // remove subscription
    } else if (element.timeline === tlId) {
      // remove subscription
    }
  });
}

module.exports = { addTimeline, removeTimeline }
