import { get } from 'common/parameters';
import {
  getRootDir, isFmd, getRelativeFmdPath,
} from './fmd';

describe('common/fmd', () => {
  describe('getRootDir', () => {
    it('should return same thing than parameters.get', () => {
      getRootDir().should.eql(get('FMD_ROOT_DIR'));
    });
  });

  describe('isFmd', () => {
    // isFmd do not check fs for existing path, it's just a pure function
    it('should be true', () => {
      isFmd(`${getRootDir()}/missing`).should.be.eql(true);
      isFmd(getRootDir()).should.be.eql(true);
    });
    it('should be false', () => {
      isFmd('/').should.be.eql(false);
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
