// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 23/02/2017 : Refactor window management in main process in a viewManager
// VERSION : 1.1.2 : DM : #5828 : 04/05/2017 : Implement a new "isomorphic" createStore to centralize Redux configuration
// VERSION : 1.1.2 : DM : #5828 : 16/05/2017 : Cleanup Redux store configuration and introduce three distinct store enhancers for future store synchronisation implementation.
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : DM : #6700 : 21/06/2017 : Move windows observer from main orchestration in a pure store observer
// END-HISTORY
// ====================================================================

export * as splashScreen from './splashScreen';
export * as codeEditor from './codeEditor';
export * as windows from './windows';
