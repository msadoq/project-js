import { getMainContextMenu } from './SvgSourceForm';

describe('SvgSourceForm :: getMainContextMenu', () => {
  test('SvgSourceForm :: getMainContextMenu :: empty entry points', () => {
    expect(getMainContextMenu(
      []
    )).toMatchSnapshot();
  });
  test('SvgSourceForm :: getMainContextMenu :: some entry points', () => {
    expect(getMainContextMenu([
      { name: 'TMMGT_BC_VIRTCHAN3' },
      { name: 'AGA_AM_PRIORITY' },
    ])).toMatchSnapshot();
  });
});
