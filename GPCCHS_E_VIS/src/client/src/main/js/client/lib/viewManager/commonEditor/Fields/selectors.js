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

export function getSelectedSessionName(form, state) {
  return connectedDataSelector(form, state, 'connectedData.session');
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

export function getSelectedDataType(form, state) {
  return connectedDataSelector(form, state, 'connectedData.dataType');
}

export function getSelectedPath(form, state) {
  return connectedDataSelector(form, state, 'connectedData.path');
}

export function getSelectedDisplayMode(form, state) {
  return connectedDataSelector(form, state, 'connectedData.displayMode');
}

export function getFormMetadata(form, state) {
  return connectedDataSelector(form, state, 'connectedData.metadata');
}

export function getParametricSelectedDomainInForm(form, state, axe) {
  return connectedDataSelector(form, state, `connectedDataParametric.domain${axe}`);
}

export function getParametricSelectedTimelineId(form, state, axe) {
  return connectedDataSelector(form, state, `connectedDataParametric.timeline${axe}`);
}

export function getParametricSelectedComObjectName(form, state, axe) {
  return connectedDataSelector(form, state, `connectedDataParametric.comObject${axe}`);
}

export function getParametricSelectedCatalogName(form, state, axe) {
  return connectedDataSelector(form, state, `connectedDataParametric.catalog${axe}`);
}

export function getParametricSelectedItemName(form, state, axe) {
  return connectedDataSelector(form, state, `connectedDataParametric.catalogItem${axe}`);
}
