import CatalogFieldContainer from './CatalogFieldContainer';
import { shallowRenderSnapshotInReduxForm } from '../../../common/jest/utils';

const stubState = {
  domains: [
    {
      domainId: 13214,
    },
  ],
  sessions: [
    {
      name: 'master',
      id: 1321,
    },
  ],
  timelines: {
    'timeline-uuid': {
      sessionName: 'master',
      id: 'timeline-id',
    },
  },
  catalogs: {
    'domain-id-session-id': [
      {
        name: 'catalogName',
      },
    ],
  },
  pages: {
    'page-id': {
      domainName: 'pageDomainName',
    },
  },
  views: {
    'view-id': {
      domainName: 'viewDomainName',
    },
  },
  hsc: {
    domainName: 'viewDomainName',
  },
  comObjectMap: {
    fields: [],
  },
};

const propsStub = {
  timelineId: 'timeline-id',
  domainId: 'domain-id',
};
//
// // we can just pass through the component since we pass dispatch prop directly
// jest.mock('redux-form', () => ({
//   Field: 'Field',
//   reduxForm: options => (
//     Form => (props) => {
//       if (options.validate) {
//         options.validate({}, props);
//       }
//
//       return <Form {...props} />;
//     }
//   ),
// }));

describe('viewManager', () => {
  describe('viewManager :: commonEditor', () => {
    describe('viewManager :: commonEditor :: Fields', () => {
      describe('viewManager :: commonEditor :: Fields :: CatalogFieldContainer', () => {
        test('snapshot', () => {
          shallowRenderSnapshotInReduxForm(CatalogFieldContainer, propsStub, stubState);
        });
      });
    });
  });
});
