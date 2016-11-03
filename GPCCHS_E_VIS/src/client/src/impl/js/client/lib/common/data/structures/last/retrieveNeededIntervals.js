export default function retrieveNeededIntervals(knownInterval, interval) {
  return (!knownInterval || knownInterval[0] !== interval[0] || knownInterval[1] !== interval[1])
    ? [interval]
    : [];
}
