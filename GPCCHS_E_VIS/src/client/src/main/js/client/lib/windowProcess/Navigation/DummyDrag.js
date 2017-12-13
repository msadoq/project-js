// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : FA : #5316 : 08/02/2017 : Remove some eslint-disable relaxations in Navigation/DummyDrag component
// VERSION : 1.1.2 : FA : #5443 : 15/02/2017 : Fix filepath prop and arrange page height for bigger drop zone
// VERSION : 1.1.2 : FA : #7256 : 20/07/2017 : Working on cleaning style, added variables to edit style easily.
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : ISIS-FT-2138 : 05/09/2017 : New extensions. Updated extensions of data files, updated config.sample.json.
// END-HISTORY
// ====================================================================

import React from 'react';
import _ from 'lodash/fp';

import { getRandomColor } from '../common/colors';

const s = {
  container: {
    float: 'right',
    right: '4em',
    margin: '0.5em',
  },
  box: {
    padding: '0.2em 0.5em',
    color: 'white',
    display: 'inline-block',
    marginRight: '1em',
  },
};

const items = [
  {
    name: 'Text view',
    mimeType: 'ViewDoc',
    filePath: '/views/text.vitv',
    mime: 'text/plain',
  },
  {
    name: 'page',
    mimeType: 'PageDoc',
    filePath: '/pages/dev.page1.vipg',
    mime: 'text/plain',
  },
  {
    name: 'workspace',
    mimeType: 'WorkspaceDoc',
    filePath: '/dev.workspace.viws',
    mime: 'text/plain',
  },
  {
    name: 'EntryPoint',
    sessionName: '',
    catalogName: 'Reporting',
    nameSpace: '',
    item: 'ATT_BC_REVTCOUNT1',
    comObjects: ['ReportingParameter'],
    mime: 'text/plain',
  },
];

const dragStart = (item, e) => {
  e.dataTransfer.setData(
    item.mime,
    _.pipe(
      _.dissoc('mime'),
      JSON.stringify
    )(item)
  );
};

const dragStartFactory = _.memoize(item => e => dragStart(item, e));

const DummyDrag = () => (
  <div style={s.container} >
    <span className="DragMe" style={{ marginRight: '1em' }}>Drag-moi</span>
    {items.map(item =>
      <div
        key={item.name}
        style={{ ...s.box, backgroundColor: getRandomColor() }}
        draggable
        onDragStart={dragStartFactory(item)}
      >
        {item.name}
      </div>
    )}
  </div>
);

export default DummyDrag;
