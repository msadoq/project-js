import { formValueSelector } from 'redux-form';


function connectedDataSelector(form, state, fieldPath) {
  return formValueSelector(form)(state, fieldPath);
}

export function getSelectedDomainInForm(form, state) {
  return connectedDataSelector(form, state, 'connectedData.domain');
}

export function getSelectedTimelineId(form, state) {
  return connectedDataSelector(form, state, 'connectedData.timeline');
}

export function getSelectedCatalogName(form, state) {
  return connectedDataSelector(form, state, 'connectedData.catalog');
}

export function getSelectedItemName(form, state) {
  return connectedDataSelector(form, state, 'connectedData.catalogItem');
}

export function getSelectedComObjectName(form, state) {
  return connectedDataSelector(form, state, 'connectedData.comObject');
}

