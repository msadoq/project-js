import React, { PureComponent, PropTypes } from 'react';

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

s.red = {
  ...s.box,
  backgroundColor: 'red',
};

s.blue = {
  ...s.box,
  backgroundColor: 'blue',
};

s.green = {
  ...s.box,
  backgroundColor: 'green',
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
        <div
          style={s.red}
          draggable
          onDragStart={this.dragStart.bind(this, EntryPoints[0])}
        >
          Propriété 1
        </div>
        <div
          style={s.green}
          draggable
          onDragStart={this.dragStart.bind(this, EntryPoints[1])}
        >
          Propriété 2
        </div>
        <div
          style={s.blue}
          draggable
          onDragStart={this.dragStart.bind(this, EntryPoints[2])}
        >
          Propriété 3
        </div>
      </div>
    );
  }
}
