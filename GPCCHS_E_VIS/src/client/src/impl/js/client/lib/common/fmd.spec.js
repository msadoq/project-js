import { get } from 'common/parameters';
import {
  getRootDir, isInFmd, getRelativeFmdPath,
} from './fmd';
import { } from './test';

describe('common/fmd', () => {
  describe('getRootDir', () => {
    it('should return same thing than parameters.get', () => {
      getRootDir().should.eql(get('FMD_ROOT_DIR'));
    });
  });

  describe('isInFmd', () => {
    // isInFmd do not check fs for existing path,
    // it's just function that check if path start with fmd root dir.
    it('should be true', () => {
      isInFmd(`${getRootDir()}/missing`).should.be.eql(true);
      isInFmd(getRootDir()).should.be.eql(true);
    });
    it('should be false', () => {
      isInFmd('/').should.be.eql(false);
    });
  });

  describe('getRelativeFmdPath', () => {
    it('should return relative fmd path (starting with \'/\')', () => {
      getRelativeFmdPath(getRootDir()).should.be.eql('/');
      getRelativeFmdPath(`${getRootDir()}/..`).should.be.eql('/..');
      getRelativeFmdPath(`${getRootDir()}/yolo`).should.be.eql('/yolo');
      getRelativeFmdPath(`${getRootDir()}/../fixtures/yolo`).should.be.eql('/yolo');
    });
  });
});
