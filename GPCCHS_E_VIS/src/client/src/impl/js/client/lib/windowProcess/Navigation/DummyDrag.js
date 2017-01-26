import React, { PureComponent, PropTypes } from 'react';
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
    filepath: '/views/text.json',
    mime: 'text/plain',
  },
  {
    name: 'page',
    mimeType: 'PageDoc',
    filepath: '/pages/dev.page1.json',
    mime: 'text/plain',
  },
  {
    name: 'workspace',
    mimeType: 'WorkspaceDoc',
    filepath: '/dev.workspace.json',
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

export default class DummyDrag extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func,
    viewId: PropTypes.string,
  }

  // eslint-disable-next-line
  dragStart(items, e) {
    e.dataTransfer.setData(
      items.mime,
      _.pipe(
        _.dissoc('mime'),
        JSON.stringify,
      )(items)
    );
  }

  render() {
    return (
      <div style={s.container} >
        <span style={{ marginRight: '1em' }}>Drag-moi</span>
        {items.map((item, i) =>
          <div
            key={i}
            style={{ ...s.box, backgroundColor: getRandomColor() }}
            draggable
            onDragStart={this.dragStart.bind(this, items[i])}
          >
            {item.name}
          </div>
        )}
      </div>
    );
  }
}
