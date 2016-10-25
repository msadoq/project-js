import debug from 'debug/browser';
import { debug as debugHelper } from 'common';

// return debug helper with browser implementation
module.exports = debugHelper(debug);
