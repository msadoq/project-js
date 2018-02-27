import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { bindActionCreators } from 'redux';
import { getUnitByItemName, getTupleId } from 'store/reducers/catalogs';
import { getDomainByNameWithFallback } from 'store/reducers/domains';
import { getSessionByNameWithFallback } from 'store/reducers/sessions';
import { getTimelineById } from 'store/reducers/timelines';
import { askUnit } from 'store/actions/catalogs';
import { get } from 'common/configurationManager';

import EntryPointUnit from 'viewManager/common/Components/Editor/EntryPointUnit';

const wildcardCharacter = get('WILDCARD_CHARACTER');

const mapStateToProps = (state, props) => {
  const {
    viewId,
    pageId,
    connectedData,
  } = props;

  const {
    catalog,
    domain,
    timeline,
    catalogItem,
  } = connectedData;

  const domainSelected = getDomainByNameWithFallback(state, { domainName: domain, viewId, pageId });
  const domainId = domainSelected ? domainSelected.domainId : null;
  const timelineSelected = getTimelineById(state, { timelineId: timeline });
  let sessionName = null;
  if (timelineSelected && timelineSelected.sessionName) {
    sessionName = timelineSelected.sessionName;
  } else if (timeline === wildcardCharacter) {
    sessionName = wildcardCharacter;
  }
  const selectedSession = getSessionByNameWithFallback(state, { sessionName, viewId, pageId });
  const sessionId = selectedSession ? selectedSession.id : null;
  const tupleId = getTupleId(domainId, sessionId);
  const selected = getUnitByItemName(state.catalogs,
    {
      tupleId,
      name: catalog,
      itemName: catalogItem,
    }
  );
  return {
    convertFrom: formValueSelector(props.form)(state, 'convertFrom'),
    convertTo: formValueSelector(props.form)(state, 'convertTo'),
    unit: selected,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  askUnit,
}, dispatch);

const EntryPointUnitContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryPointUnit);

export default EntryPointUnitContainer;
