import React, { PureComponent, PropTypes } from 'react';
import { getRandomColor } from '../Editor/Components/Colors';

const s = {
  container: {
    position: 'fixed',
    right: '4em',
    top: '0.5em',
  },
  box: {
    padding: '0.2em 0.5em',
    color: 'white',
    display: 'inline-block',
    marginRight: '1em',
  },
};

const EntryPoints = [
  {
    sessionName: '',
    catalogName: 'Reporting',
    nameSpace: '',
    item: 'ATT_BC_REVTCOUNT1<ReportingParameter>',
  },
  {
    sessionName: '',
    catalogName: 'Reporting',
    nameSpace: '',
    item: 'AGA_AM_QP1<ReportingParameter>',
  },
  {
    sessionName: '',
    catalogName: 'Reporting',
    nameSpace: '',
    item: 'MIS_BC_DALMVOLTAGE<ReportingParameter>',
  },
];

export default class DummyDrag extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func,
    viewId: PropTypes.string,
  }

  // eslint-disable-next-line
  dragStart(entryPoint, e) {
    console.log('DRAG START', entryPoint, e.type); // eslint-disable-line no-console
    e.dataTransfer.setData('application/json', JSON.stringify(entryPoint));
  }

  render() {
    return (
      <div style={s.container} >
        <span style={{ marginRight: '1em' }}>Drag-moi</span>
        {EntryPoints.map((ep, i) =>
          <div
            key={i}
            style={{ ...s.box, backgroundColor: getRandomColor() }}
            draggable
            onDragStart={this.dragStart.bind(this, EntryPoints[i])}
          >
            {ep.item.replace(/<.*/, '')}
          </div>
        )}
      </div>
    );
  }
}
