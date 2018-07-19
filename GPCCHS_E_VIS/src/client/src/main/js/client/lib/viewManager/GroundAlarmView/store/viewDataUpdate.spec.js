import * as constants from 'constants';
import { shouldAlarmBeDisplayed } from './viewDataUpdate';

describe('shouldAlarmBeDisplayed', () => {
  const modeALL = constants.ALARM_MODE_ALL;
  const modeNN = constants.ALARM_MODE_NONNOMINAL;
  const modeTOACK = constants.ALARM_MODE_TOACKNOWLEDGE;
  const typeNOMINAL = 'nominal';
  const typeCRITICAL = 'critical';
  const typeSEVERE = 'severe';
  const stateREQUIRE = constants.ALARM_ACKSTATE_REQUIREACK;
  const stateACQUITED = constants.ALARM_ACKSTATE_ACQUITED;
  const stateNOACK = constants.ALARM_ACKSTATE_NOACK;
  test('mode ALL GMA view : displays the list of the on-ground alarms of the non-nominal mode completed with ' +
    'the list of all the on-ground alarms raised between lower limit and current time of the visualization window',
    () => {
      expect(shouldAlarmBeDisplayed(modeALL, false, false, false, typeNOMINAL, stateREQUIRE)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, false, false, true, typeNOMINAL, stateREQUIRE)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, true, false, false, typeNOMINAL, stateREQUIRE)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, true, false, true, typeNOMINAL, stateREQUIRE)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, false, false, false, typeNOMINAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, false, false, true, typeNOMINAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, true, false, false, typeNOMINAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, true, false, true, typeNOMINAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, false, false, false, typeNOMINAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, false, false, true, typeNOMINAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, true, false, false, typeNOMINAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, true, false, true, typeNOMINAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, false, true, false, typeNOMINAL, stateREQUIRE)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, false, true, true, typeNOMINAL, stateREQUIRE)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, true, true, false, typeNOMINAL, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeALL, true, true, true, typeNOMINAL, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeALL, false, true, false, typeNOMINAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, false, true, true, typeNOMINAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, true, true, false, typeNOMINAL, stateACQUITED)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeALL, true, true, true, typeNOMINAL, stateACQUITED)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeALL, false, true, false, typeNOMINAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, false, true, true, typeNOMINAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, true, true, false, typeNOMINAL, stateNOACK)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeALL, true, true, true, typeNOMINAL, stateNOACK)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeALL, false, false, false, typeCRITICAL, stateREQUIRE)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, false, false, true, typeCRITICAL, stateREQUIRE)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, true, false, false, typeCRITICAL, stateREQUIRE)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, true, false, true, typeCRITICAL, stateREQUIRE)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, false, false, false, typeCRITICAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, false, false, true, typeCRITICAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, true, false, false, typeCRITICAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, true, false, true, typeCRITICAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, false, false, false, typeCRITICAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, false, false, true, typeCRITICAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, true, false, false, typeCRITICAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, true, false, true, typeCRITICAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, false, true, false, typeCRITICAL, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeALL, false, true, true, typeCRITICAL, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeALL, true, true, false, typeCRITICAL, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeALL, true, true, true, typeCRITICAL, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeALL, false, true, false, typeCRITICAL, stateACQUITED)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeALL, false, true, true, typeCRITICAL, stateACQUITED)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeALL, true, true, false, typeCRITICAL, stateACQUITED)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeALL, true, true, true, typeCRITICAL, stateACQUITED)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeALL, false, true, false, typeCRITICAL, stateNOACK)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeALL, false, true, true, typeCRITICAL, stateNOACK)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeALL, true, true, false, typeCRITICAL, stateNOACK)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeALL, true, true, true, typeCRITICAL, stateNOACK)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeALL, false, false, false, typeSEVERE, stateREQUIRE)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, false, false, true, typeSEVERE, stateREQUIRE)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, true, false, false, typeSEVERE, stateREQUIRE)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, true, false, true, typeSEVERE, stateREQUIRE)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, false, false, false, typeSEVERE, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, false, false, true, typeSEVERE, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, true, false, false, typeSEVERE, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, true, false, true, typeSEVERE, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, false, false, false, typeSEVERE, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, false, false, true, typeSEVERE, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, true, false, false, typeSEVERE, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, true, false, true, typeSEVERE, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeALL, false, true, false, typeSEVERE, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeALL, false, true, true, typeSEVERE, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeALL, true, true, false, typeSEVERE, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeALL, true, true, true, typeSEVERE, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeALL, false, true, false, typeSEVERE, stateACQUITED)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeALL, false, true, true, typeSEVERE, stateACQUITED)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeALL, true, true, false, typeSEVERE, stateACQUITED)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeALL, true, true, true, typeSEVERE, stateACQUITED)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeALL, false, true, false, typeSEVERE, stateNOACK)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeALL, false, true, true, typeSEVERE, stateNOACK)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeALL, true, true, false, typeSEVERE, stateNOACK)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeALL, true, true, true, typeSEVERE, stateNOACK)).toBe(true);
    });
  test('mode NON-NOMINAL GMA view : displays only the list of all the on-ground alarms that are still in a ' +
    'non-nominal mode at the time indicated by the current time position (default behavior). The alarms ' +
    'shall be created and opened before the current time of the visualization Windows',
    () => {
      expect(shouldAlarmBeDisplayed(modeNN, false, false, false, typeNOMINAL, stateREQUIRE)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, false, false, true, typeNOMINAL, stateREQUIRE)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, true, false, false, typeNOMINAL, stateREQUIRE)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, true, false, true, typeNOMINAL, stateREQUIRE)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, false, false, false, typeNOMINAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, false, false, true, typeNOMINAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, true, false, false, typeNOMINAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, true, false, true, typeNOMINAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, false, false, false, typeNOMINAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, false, false, true, typeNOMINAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, true, false, false, typeNOMINAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, true, false, true, typeNOMINAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, false, true, false, typeNOMINAL, stateREQUIRE)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, false, true, true, typeNOMINAL, stateREQUIRE)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, true, true, false, typeNOMINAL, stateREQUIRE)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, true, true, true, typeNOMINAL, stateREQUIRE)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, false, true, false, typeNOMINAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, false, true, true, typeNOMINAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, true, true, false, typeNOMINAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, true, true, true, typeNOMINAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, false, true, false, typeNOMINAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, false, true, true, typeNOMINAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, true, true, false, typeNOMINAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, true, true, true, typeNOMINAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, false, false, false, typeCRITICAL, stateREQUIRE)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, false, false, true, typeCRITICAL, stateREQUIRE)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, true, false, false, typeCRITICAL, stateREQUIRE)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, true, false, true, typeCRITICAL, stateREQUIRE)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, false, false, false, typeCRITICAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, false, false, true, typeCRITICAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, true, false, false, typeCRITICAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, true, false, true, typeCRITICAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, false, false, false, typeCRITICAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, false, false, true, typeCRITICAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, true, false, false, typeCRITICAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, true, false, true, typeCRITICAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, false, true, false, typeCRITICAL, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeNN, false, true, true, typeCRITICAL, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeNN, true, true, false, typeCRITICAL, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeNN, true, true, true, typeCRITICAL, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeNN, false, true, false, typeCRITICAL, stateACQUITED)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeNN, false, true, true, typeCRITICAL, stateACQUITED)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeNN, true, true, false, typeCRITICAL, stateACQUITED)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeNN, true, true, true, typeCRITICAL, stateACQUITED)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeNN, false, true, false, typeCRITICAL, stateNOACK)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeNN, false, true, true, typeCRITICAL, stateNOACK)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeNN, true, true, false, typeCRITICAL, stateNOACK)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeNN, true, true, true, typeCRITICAL, stateNOACK)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeNN, false, false, false, typeSEVERE, stateREQUIRE)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, false, false, true, typeSEVERE, stateREQUIRE)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, true, false, false, typeSEVERE, stateREQUIRE)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, true, false, true, typeSEVERE, stateREQUIRE)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, false, false, false, typeSEVERE, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, false, false, true, typeSEVERE, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, true, false, false, typeSEVERE, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, true, false, true, typeSEVERE, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, false, false, false, typeSEVERE, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, false, false, true, typeSEVERE, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, true, false, false, typeSEVERE, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, true, false, true, typeSEVERE, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeNN, false, true, false, typeSEVERE, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeNN, false, true, true, typeSEVERE, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeNN, true, true, false, typeSEVERE, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeNN, true, true, true, typeSEVERE, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeNN, false, true, false, typeSEVERE, stateACQUITED)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeNN, false, true, true, typeSEVERE, stateACQUITED)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeNN, true, true, false, typeSEVERE, stateACQUITED)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeNN, true, true, true, typeSEVERE, stateACQUITED)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeNN, false, true, false, typeSEVERE, stateNOACK)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeNN, false, true, true, typeSEVERE, stateNOACK)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeNN, true, true, false, typeSEVERE, stateNOACK)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeNN, true, true, true, typeSEVERE, stateNOACK)).toBe(true);
    });
  test('ground alarm mode is TOACKNOWLEDGE : only alarms with state REQUIREACK should be displayed',
    () => {
      expect(shouldAlarmBeDisplayed(modeTOACK, false, false, false, typeNOMINAL, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, false, true, typeNOMINAL, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, true, false, typeNOMINAL, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, true, true, typeNOMINAL, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, false, false, typeNOMINAL, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, false, true, typeNOMINAL, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, true, false, typeNOMINAL, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, true, true, typeNOMINAL, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, false, false, typeCRITICAL, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, false, true, typeCRITICAL, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, true, false, typeCRITICAL, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, true, true, typeCRITICAL, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, false, false, typeCRITICAL, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, false, true, typeCRITICAL, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, true, false, typeCRITICAL, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, true, true, typeCRITICAL, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, false, false, typeSEVERE, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, false, true, typeSEVERE, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, true, false, typeSEVERE, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, true, true, typeSEVERE, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, false, false, typeSEVERE, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, false, true, typeSEVERE, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, true, false, typeSEVERE, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, true, true, typeSEVERE, stateREQUIRE)).toBe(true);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, false, false, typeNOMINAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, false, true, typeNOMINAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, true, false, typeNOMINAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, true, true, typeNOMINAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, false, false, typeNOMINAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, false, true, typeNOMINAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, true, false, typeNOMINAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, true, true, typeNOMINAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, false, false, typeCRITICAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, false, true, typeCRITICAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, true, false, typeCRITICAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, true, true, typeCRITICAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, false, false, typeCRITICAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, false, true, typeCRITICAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, true, false, typeCRITICAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, true, true, typeCRITICAL, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, false, false, typeSEVERE, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, false, true, typeSEVERE, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, true, false, typeSEVERE, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, true, true, typeSEVERE, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, false, false, typeSEVERE, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, false, true, typeSEVERE, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, true, false, typeSEVERE, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, true, true, typeSEVERE, stateACQUITED)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, false, false, typeNOMINAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, false, true, typeNOMINAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, true, false, typeNOMINAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, true, true, typeNOMINAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, false, false, typeNOMINAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, false, true, typeNOMINAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, true, false, typeNOMINAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, true, true, typeNOMINAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, false, false, typeCRITICAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, false, true, typeCRITICAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, true, false, typeCRITICAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, true, true, typeCRITICAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, false, false, typeCRITICAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, false, true, typeCRITICAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, true, false, typeCRITICAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, true, true, typeCRITICAL, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, false, false, typeSEVERE, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, false, true, typeSEVERE, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, true, false, typeSEVERE, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, false, true, true, typeSEVERE, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, false, false, typeSEVERE, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, false, true, typeSEVERE, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, true, false, typeSEVERE, stateNOACK)).toBe(false);
      expect(shouldAlarmBeDisplayed(modeTOACK, true, true, true, typeSEVERE, stateNOACK)).toBe(false);
    });
});