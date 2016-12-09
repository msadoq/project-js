// last

export default function addTimelineId(viewConf, timelineIds, timelines) {
  if (!viewConf.entryPoints || !viewConf.entryPoints.length) {
    return viewConf;
  }

  const entryPoints = [];
  viewConf.entryPoints.forEach((ep) => {
    const tlName = ep.connectedData.timeline;
    const tlId = timelineIds.find(id => timelines[id].id === tlName);
    entryPoints.push({
      ...ep,
      connectedData: {
        ...ep.connectedData,
        timelineId: tlId,
      },
    });
  });
  return { ...viewConf, entryPoints };
}
