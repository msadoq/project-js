import React from 'react';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

const ApidsList = apids => (
  <ErrorBoundary>
    <div className="header col-sm-12">
      Application Process(es) :&nbsp;
      {apids.map(({ apidName, apidRawValue }) => (
        <span>{apidName}[{apidRawValue}],&nbsp;</span>
      ))}
    </div>
  </ErrorBoundary>
);

export default ApidsList;
