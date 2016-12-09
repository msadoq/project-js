// range


export default function addTimelineId(viewConf, timelineIds, timelines) {
  if (!viewConf.entryPoints || !viewConf.entryPoints.length) {
    return viewConf;
  }

  const entryPoints = [];
  viewConf.entryPoints.forEach((ep) => {
    const tlXName = ep.connectedDataX.timeline;
    const tlXId = timelineIds.find(id => timelines[id].id === tlXName);
    const tlYName = ep.connectedDataY.timeline;
    const tlYId = timelineIds.find(id => timelines[id].id === tlYName);
    entryPoints.push({
      ...ep,
      connectedDataX: {
        ...ep.connectedDataX,
        timelineId: tlXId,
      },
      connectedDataY: {
        ...ep.connectedDataY,
        timelineId: tlYId,
      }
    });
  });
  return { ...viewConf, entryPoints };
}
