import _ from 'lodash';

export default function samplingChanged(dataMapX, dataMapY, id) {
  if (
    (!(_.isUndefined(dataMapX))) &&
    (!(_.isUndefined(dataMapY)))) {
    if (
      (!(_.isUndefined(dataMapX.perView))) &&
      (!(_.isUndefined(dataMapY.perView)))) {
      if (
        (!(_.isUndefined(dataMapX.perView[id]))) &&
        (!(_.isUndefined(dataMapY.perView[id])))) {
        if (
          (!(_.isUndefined(dataMapX.perView[id].sampling))) &&
          (!(_.isUndefined(dataMapY.perView[id].sampling)))) {
          if (
            (!(_.isUndefined(dataMapX.perView[id].sampling.samplingStatus))) &&
            (!(_.isUndefined(dataMapY.perView[id].sampling.samplingStatus)))) {
            return (
              dataMapX.perView[id].sampling.samplingStatus !==
              dataMapY.perView[id].sampling.samplingStatus
            );
          }
          return false;
        }
        return false;
      }
      return false;
    }
    return false;
  }
  return false;
}
