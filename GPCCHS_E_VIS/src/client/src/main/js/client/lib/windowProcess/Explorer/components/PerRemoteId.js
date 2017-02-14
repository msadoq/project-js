import React, { PureComponent, PropTypes } from 'react';
// import { Label } from 'react-bootstrap';
import _map from 'lodash/map';
import _split from 'lodash/split';
// import _get from 'lodash/get';
// import _find from 'lodash/find';
import _each from 'lodash/each';
// import classnames from 'classnames';

import styles from '../Explorer.css';
import DetailButtons from './DetailButtons';
import IdLabel from './IdLabel';
import { DataId, DataIdLabels } from './DataId';
import { DomainAndSession, DomainAndSessionLabels } from './DomainAndSession';


function LocalIdLabels() {
  return (
    <ul>
      <li key="{16}" className={styles.listLeft}><b>Field: </b></li>
      <li key="{17}" className={styles.listLeft}><b>Offset: </b></li>
      <li key="{18}" className={styles.listLeft}><b>TimeBar: </b></li>
    </ul>
  );
}
LocalId.propTypes = {
  localId: PropTypes.shape({
    timebarUuid: PropTypes.string,
    field: PropTypes.string,
    offset: PropTypes.number,
  }),
  timebars: PropTypes.objectOf(PropTypes.object),
};

function LocalId(props) {
  let tbName = '';
  if (props.localId.timebarUuid) {
    tbName = props.timebars[props.localId.timebarUuid].id;
  }
  return (
    <ul>
      <li key="{26}" className={styles.listRight}>{props.localId.field || '-'}</li>
      <li key="{27}" className={styles.listRight}>{props.localId.offset}</li>
      <li key="{28}" className={styles.listRight}>{tbName}</li>
    </ul>
  );
}

function UsingViewsLabels() {
  return (
    <ul>
      <li key="{19}" className={styles.listLeft}><b>Views: </b></li>
    </ul>
  );
}
UsingViews.propTypes = {
  usingViews: PropTypes.arrayOf(PropTypes.string),
  views: PropTypes.objectOf(PropTypes.object),
};
function UsingViews(props) {
  const viewNames = _map(props.usingViews, id => ''.concat(props.views[id].configuration.title)).join('\n');
  return (
    <ul>
      <li key="{29}" className={styles.listRight}>{viewNames}</li>
    </ul>
  );
}
function FiltersLabels() {
  return (
    <ul>
      <li key="{30}" className={styles.listLeft}><b>Filters: </b></li>
    </ul>
  );
}
function displayedFilters(filters) {
  if (!filters) {
    return '-';
  }

  let display = '';
  filters.forEach((filter) => {
    if (display !== '') {
      display = display.concat('\n');
    }
    display = display.concat(filter.field)
                     .concat(' ')
                     .concat(filter.operator)
                     .concat(' ')
                     .concat(filter.operand);
  });
  return display;
}

Filters.propTypes = {
  filters: PropTypes.arrayOf({
    field: PropTypes.string,
    operator: PropTypes.string,
    operand: PropTypes.string,
  }),
};
function Filters(props) {
  return (
    <ul>
      <li key="{31}" className={styles.listRight}>{displayedFilters(props.filters)}</li>
    </ul>
  );
}
export default class PerRemoteId extends PureComponent {
  static propTypes = {
    perRemoteId: PropTypes.objectOf(PropTypes.object).isRequired,
    timebars: PropTypes.objectOf(PropTypes.object).isRequired,
    sessions: PropTypes.arrayOf(PropTypes.object).isRequired,
    domains: PropTypes.arrayOf(PropTypes.object).isRequired,
    views: PropTypes.objectOf(PropTypes.object).isRequired,
    dataId: PropTypes.bool,
    domainAndSession: PropTypes.bool,
    localId: PropTypes.bool,
    usingViews: PropTypes.bool,
    filters: PropTypes.bool,
    updateExplorerFlag: PropTypes.func.isRequired,
    windowId: PropTypes.string.isRequired,
  }
  static defaultProps = {
    dataId: false,
    domainAndSession: true,
    localId: true,
    usingViews: true,
    filters: true,
  }

  updateShowDataId = state =>
    this.props.updateExplorerFlag(this.props.windowId, 'dataTabDataId', state === 'ON');
  updateShowDomainAndSession = state =>
    this.props.updateExplorerFlag(this.props.windowId, 'dataTabDomain', state === 'ON');
  updateShowLocalId = state =>
    this.props.updateExplorerFlag(this.props.windowId, 'dataTabLocalId', state === 'ON');
  updateShowUsingViews = state =>
    this.props.updateExplorerFlag(this.props.windowId, 'dataTabViews', state === 'ON');
  updateShowFilters = state =>
    this.props.updateExplorerFlag(this.props.windowId, 'dataTabFilters', state === 'ON');

  render() {
    const { perRemoteId, sessions, domains, timebars, views } = this.props;
    const { dataId, domainAndSession, localId, usingViews, filters } = this.props;
    let i = 0;
    const array = [];
    _each(perRemoteId, (p, rId) => {
      i += 1;
      let idToShow = rId;
      const remoteId = _split(rId, '@');
      if (remoteId.length === 2) {
        idToShow = _split(remoteId[1], ':')[0];
      }

      array.push((
        <div className={styles.block} key={'first'.concat(i)}>
          <IdLabel idLabel={idToShow} iKey={'r'.concat(i)} />
          <div className={styles.details}>
            <div>
              {dataId && <DataIdLabels iKey={'bl'.concat(i)} />}
              {domainAndSession && <DomainAndSessionLabels key={'cl'.concat(i)} />}
              {localId &&
                _map(p.localIds, () => (<LocalIdLabels key={'dl'.concat(i)} />))
              }
              {usingViews && <UsingViewsLabels key={'el'.concat(i)} />}
              {filters && <FiltersLabels key={'fi'.concat(i)} />}
            </div>
            <div>
              {dataId && <DataId key={'b'.concat(i)} dataId={p.dataId} iKey={'b'.concat(i)} />}
              {domainAndSession &&
                <DomainAndSession
                  key={'c'.concat(i)}
                  sessions={sessions}
                  domains={domains}
                  dataId={p.dataId}
                />}
              {localId &&
                _map(p.localIds, (lId, idx) =>
                  <LocalId
                    key={'d'.concat(i).concat(idx)}
                    localId={lId}
                    timebars={timebars}
                  />)
              }
              {usingViews && <UsingViews key={'e'.concat(i)} usingViews={p.views} views={views} />}
              {filters && <Filters key={'f'.concat(i)} filters={p.filters} />}
            </div>
          </div>
        </div>
      ));
    });

    const buttons = [{
      label: 'Data ID',
      onChange: this.updateShowDataId,
      flag: dataId,
    }, {
      label: 'Domain & Session',
      onChange: this.updateShowDomainAndSession,
      flag: domainAndSession,
    }, {
      label: 'Local ID',
      onChange: this.updateShowLocalId,
      flag: localId,
    }, {
      label: 'Views',
      onChange: this.updateShowUsingViews,
      flag: usingViews,
    }, {
      label: 'Filters',
      onChange: this.updateShowFilters,
      flag: filters,
    }];

    return (
      <div key="div1" >
        <DetailButtons buttons={buttons} />
        {array}
      </div>
    );
  }
}
