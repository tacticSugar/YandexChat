/* eslint-disable no-console */
import { _TFixTsAny } from '../typings';

const logger = {
  log: (...args: _TFixTsAny[]) => {
    console.log(...args);
  },
  warn: (...args: _TFixTsAny[]) => {
    console.warn(...args);
  },
  error: (...args: _TFixTsAny[]) => {
    console.error(...args);
  },
  info: (...args: _TFixTsAny[]) => {
    console.info(...args);
  },
};

export default logger;
