import React, { PureComponent, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';
/* eslint-disable no-unused-vars*/
import _each from 'lodash/each';
import _split from 'lodash/split';
import _join from 'lodash/join';
import _slice from 'lodash/slice';
import _get from 'lodash/get';
import _find from 'lodash/find';


import parseFormula from '../../../dataManager/structures/common/formula';

import styles from '../Explorer.css';
import IdLabel from './IdLabel';
import DetailButtons from './DetailButtons';
import { DataIdLabels, DataId } from './DataId';
import { DomainAndSession, DomainAndSessionLabels } from './DomainAndSession';

function viewType(type) {
  return (
    <div className={styles.type}>
      <ul><li key="{10}" className={styles.listLeft}><b>Type: </b></li></ul>
      <ul><li key="{30}" className={styles.listRight}>{type}</li></ul>
    </div>
  );
}

function LocalIdLabels() {
  return (
    <ul>
      <li key="{16}" className={styles.listLeft}><b>Field: </b></li>
      <li key="{17}" className={styles.listLeft}><b>Offset: </b></li>
    </ul>
  );
}
LocalId.propTypes = {
  field: PropTypes.string,
  fieldX: PropTypes.string,
  fieldY: PropTypes.string,
  offset: PropTypes.number,
};

function LocalId(props) {
  return (
    <ul>
      <li key="{26}" className={styles.listRight}>
        {props.field || '-'}
      </li>
      <li key="{27}" className={styles.listRight}>{props.offset}</li>
    </ul>
  );
}
export default class PerView extends PureComponent {
  static propTypes = {
    perView: PropTypes.objectOf(PropTypes.object),
    views: PropTypes.objectOf(PropTypes.object),
    sessions: PropTypes.arrayOf(PropTypes.object).isRequired,
    domains: PropTypes.arrayOf(PropTypes.object).isRequired,
    count: PropTypes.number,
    windowId: PropTypes.string.isRequired,
    updateShowEp: PropTypes.func,
    updateExplorerFlag: PropTypes.func.isRequired,
    dataId: PropTypes.bool,
    domainAndSession: PropTypes.bool,
    localId: PropTypes.bool,
    remoteId: PropTypes.bool,
    filters: PropTypes.bool,
  }
  static defaultProps = {
    count: 0,
    perView: {},
    views: {},
    dataId: false,
    domainAndSession: true,
    localId: true,
    remoteId: true,
    filters: true,
  }

  viewTitle(viewId) {
    const { views } = this.props;
    return views[viewId].configuration.title;
  }

  updateShowDataId = state =>
    this.props.updateExplorerFlag(this.props.windowId, 'viewTabDataId', state === 'ON');
  updateShowDomainAndSession = state =>
    this.props.updateExplorerFlag(this.props.windowId, 'viewTabDomain', state === 'ON');
  updateShowLocalId = state =>
    this.props.updateExplorerFlag(this.props.windowId, 'viewTabLocalId', state === 'ON');
  updateShowRemoteId = state =>
    this.props.updateExplorerFlag(this.props.windowId, 'viewTabRemoteId', state === 'ON');
  updateShowFilters = state =>
    this.props.updateExplorerFlag(this.props.windowId, 'viewTabFilters', state === 'ON');

  render() {
    const { perView } = this.props;
    const buttons = [{
      label: 'Remote ID',
      onChange: this.updateShowRemoteId,
      flag: true,
    }, {
      label: 'Data ID',
      onChange: this.updateShowDataId,
      flag: false,
    }, {
      label: 'LocalId',
      onChange: this.updateShowLocalId,
      flag: true,
    }, {
      label: 'Domain & Session',
      onChange: this.updateShowDomainAndSession,
      flag: true,
    // }, {
    //   label: 'Filters',
    //   onChange: this.updateShowFilters,
    //   flag: true,
    }];

    const { dataId, domainAndSession, localId, remoteId, filters, sessions, domains } = this.props;
    const viewDetails = [];
    _each(perView, (view, viewId) => {
      // EP
      const EPnames = [];
      let i = 1;
      _each(view.entryPoints, (p, name) => {
        // Split remoteId
        let idToShow = p.remoteId;
        const rId = _split(idToShow, '@');
        let dId;
        let parsedFormula;
        if (rId.length >= 2) {
          const splitId = _split(rId[1], ':');
          idToShow = splitId[0];
          parsedFormula = parseFormula(idToShow);
          if (splitId.length === 3) {
            dId = {
              sessionId: Number(splitId[1]),
              domainId: Number(splitId[2]),
            };
          }
        }

        EPnames.push((
          <Panel key={viewId.concat(name)}>
            <header><b>{name}</b></header>
            <div className={styles.details}>
              <div>
                {p.error && <ul><li key="{11}" className={styles.listLeft}><b>Error</b></li></ul>}
                {!p.error && remoteId && <ul><li key="{11}" className={styles.listLeft}><b>RemoteID</b></li></ul>}
                {!p.error && dataId && <DataIdLabels iKey={'bl'.concat(i)} />}
                {!p.error && domainAndSession && <DomainAndSessionLabels key={'cl'.concat(i)} />}
                {!p.error && localId && <LocalIdLabels />}
              </div>
              <div>
                {p.error && <ul><li key="{11}" className={styles.listRight}>{p.error}</li></ul>}
                {!p.error && remoteId && <ul><li key="{11}" className={styles.listRight}>{idToShow}</li></ul>}
                {!p.error && dataId && <DataId key={'b'.concat(i)} dataId={parsedFormula} iKey={'b'.concat(i)} />}
                {!p.error && domainAndSession &&
                  <DomainAndSession
                    key={'c'.concat(i)}
                    sessions={sessions}
                    domains={domains}
                    dataId={dId}
                  />}
                {!p.error && localId && <LocalId field={parsedFormula.field} offset={p.offset} />}
              </div>
            </div>
          </Panel>
        ));
        i += 1;
      });

      viewDetails.push((
        <div className={styles.block} key={'div'.concat(viewId)}>
          <IdLabel idLabel={this.viewTitle(viewId)} iKey={viewId} />
          <div className={styles.panel}>
            {viewType(view.type)}
            <div>
              {EPnames}
            </div>
          </div>
        </div>
      ));
    });
    return (
      <div>
        <div className={styles.block}>values count: {this.props.count}</div>
        <DetailButtons buttons={buttons} />
        <div>
          {viewDetails}
        </div>
      </div>);
  }
}
