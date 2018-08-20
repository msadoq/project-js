import _each from 'lodash/each';

const getPayload = require('./getPayload');

const timestamp = 1518791878584;
const comObjects = {
  Pus05: [
    {
      pusService: 5,
      serviceApid: 2,
      timestamp,
      forceModel: false,
      continuous: false,
      shouldBe: true,
    },
    {
      pusService: 5,
      serviceApid: [2, 4],
      timestamp,
      forceModel: false,
      continuous: true,
      shouldBe: true,
    },
    {
      pusService: 'test',
      serviceApid: [],
      timestamp,
      forceModel: false,
      continuous: true,
      shouldBe: 'undefined',
    },
  ],
  Pus11: [
    {
      pusService: 11,
      serviceApid: 2,
      timestamp,
      forceModel: false,
      continuous: false,
      shouldBe: true,
    },
    {
      pusService: 11,
      serviceApid: [2, 4],
      timestamp,
      forceModel: false,
      continuous: true,
      shouldBe: true,
    },
    {
      pusService: 'test',
      serviceApid: [],
      timestamp,
      forceModel: false,
      continuous: true,
      shouldBe: 'undefined',
    },
  ],
  Pus12: [
    {
      pusService: 12,
      serviceApid: 2,
      timestamp,
      forceModel: false,
      continuous: false,
      shouldBe: true,
    },
    {
      pusService: 12,
      serviceApid: [2, 4],
      timestamp,
      forceModel: false,
      continuous: true,
      shouldBe: true,
    },
    {
      pusService: 'test',
      serviceApid: [],
      timestamp,
      forceModel: false,
      continuous: true,
      shouldBe: 'undefined',
    },
  ],
  Pus13: [
    {
      pusService: 13,
      serviceApid: 2,
      timestamp,
      forceModel: false,
      continuous: false,
      shouldBe: true,
    },
    {
      pusService: 13,
      serviceApid: [2, 4],
      timestamp,
      forceModel: false,
      continuous: true,
      shouldBe: true,
    },
    {
      pusService: 'test',
      serviceApid: [],
      timestamp,
      forceModel: false,
      continuous: true,
      shouldBe: 'undefined',
    },
  ],
  Pus14: [
    {
      pusService: 14,
      serviceApid: 2,
      timestamp,
      forceModel: false,
      continuous: false,
      shouldBe: true,
    },
    {
      pusService: 14,
      serviceApid: [2, 4],
      timestamp,
      forceModel: false,
      continuous: true,
      shouldBe: true,
    },
    {
      pusService: 'test',
      serviceApid: [],
      timestamp,
      forceModel: false,
      continuous: true,
      shouldBe: 'undefined',
    },
  ],
  Pus15: [
    {
      pusService: 15,
      serviceApid: 2,
      timestamp,
      forceModel: false,
      continuous: false,
      shouldBe: true,
    },
    {
      pusService: 15,
      serviceApid: [2, 4],
      timestamp,
      forceModel: false,
      continuous: true,
      shouldBe: true,
    },
    {
      pusService: 'test',
      serviceApid: [],
      timestamp,
      forceModel: false,
      continuous: true,
      shouldBe: 'undefined',
    },
  ],
  Pus18: [
    {
      pusService: 18,
      serviceApid: 2,
      timestamp,
      forceModel: false,
      continuous: false,
      shouldBe: true,
    },
    {
      pusService: 18,
      serviceApid: [2, 4],
      timestamp,
      forceModel: false,
      continuous: true,
      shouldBe: true,
    },
    {
      pusService: 'test',
      serviceApid: [],
      timestamp,
      forceModel: false,
      continuous: true,
      shouldBe: 'undefined',
    },
  ],
  Pus19: [
    {
      pusService: 19,
      serviceApid: 2,
      timestamp,
      forceModel: false,
      continuous: false,
      shouldBe: true,
    },
    {
      pusService: 19,
      serviceApid: [2, 4],
      timestamp,
      forceModel: false,
      continuous: true,
      shouldBe: true,
    },
    {
      pusService: 'test',
      serviceApid: [],
      timestamp,
      forceModel: false,
      continuous: true,
      shouldBe: 'undefined',
    },
  ],
  Pus140: [
    {
      pusService: 140,
      serviceApid: 2,
      timestamp,
      forceModel: false,
      continuous: false,
      shouldBe: true,
    },
    {
      pusService: 140,
      serviceApid: [2, 4],
      timestamp,
      forceModel: false,
      continuous: true,
      shouldBe: true,
    },
    {
      pusService: 'test',
      serviceApid: [],
      timestamp,
      forceModel: false,
      continuous: true,
      shouldBe: 'undefined',
    },
  ],
  Pus142: [
    {
      pusService: 142,
      serviceApid: 2,
      timestamp,
      forceModel: false,
      continuous: false,
      shouldBe: true,
    },
    {
      pusService: 142,
      serviceApid: [2, 4],
      timestamp,
      forceModel: false,
      continuous: true,
      shouldBe: true,
    },
    {
      pusService: 'test',
      serviceApid: [],
      timestamp,
      forceModel: false,
      continuous: true,
      shouldBe: 'undefined',
    },
  ],
  Pus144: [
    {
      pusService: 144,
      serviceApid: 2,
      timestamp,
      forceModel: false,
      continuous: false,
      shouldBe: true,
    },
    {
      pusService: 144,
      serviceApid: [2, 4],
      timestamp,
      forceModel: false,
      continuous: true,
      shouldBe: true,
    },
    {
      pusService: 'test',
      serviceApid: [],
      timestamp,
      forceModel: false,
      continuous: true,
      shouldBe: 'undefined',
    },
  ],
  PusMme: [
    {
      pusService: 0,
      serviceApid: 2,
      timestamp,
      forceModel: false,
      continuous: false,
      shouldBe: true,
    },
    {
      pusService: 0,
      serviceApid: [2, 4],
      timestamp,
      forceModel: false,
      continuous: true,
      shouldBe: true,
    },
    {
      pusService: 'test',
      serviceApid: [],
      timestamp,
      forceModel: false,
      continuous: true,
      shouldBe: 'undefined',
    },
  ],
};

jest.mock('../../utils/stubs', () => ({
  getStubData: () => ({
    getPus005ModelProtobuf: obj => obj,
    getPus005OnBoardEvent: obj => obj,
    getPus005OnBoardEventProtobuf: obj => obj,
    getPus011ModelProtobuf: obj => obj,
    getPus011CommandProtobuf: obj => obj,
    getPus011CommandParameter: obj => obj,
    getPus011Command: obj => obj,
    getPus011TimeShift: obj => obj,
    getPus011SubScheduleProtobuf: obj => obj,
    getPus011SubSchedule: obj => obj,
    getPus011Apid: obj => obj,
    getPus012ModelProtobuf: obj => obj,
    getPus012ParameterMonitoringDefinitionProtobuf: obj => obj,
    getPus012ParameterMonitoringDefinition: obj => obj,
    getPus012MonitoringCheckProperties: obj => obj,
    getPus013ModelProtobuf: obj => obj,
    getPus013LdtProtobuf: obj => obj,
    getPus013LdtPart: obj => obj,
    getPus013Ldt: obj => obj,
    getPus014ModelProtobuf: obj => obj,
    getPus014ForwardedPacketProtobuf: obj => obj,
    getPus014ForwardedPacket: obj => obj,
    getPus015ModelProtobuf: obj => obj,
    getPus015PacketStoreProtobuf: obj => obj,
    getPus015PacketStore: obj => obj,
    getPus015Packet: obj => obj,
    getPus018ModelProtobuf: obj => obj,
    getPus018ObcpProtobuf: obj => obj,
    getPus018Obcp: obj => obj,
    getPus019ModelProtobuf: obj => obj,
    getPus019EventActionProtobuf: obj => obj,
    getPus019EventAction: obj => obj,
    getPus140ModelProtobuf: obj => obj,
    getPus140ParameterProtobuf: obj => obj,
    getPus140Parameter: obj => obj,
    getPus142ModelProtobuf: obj => obj,
    getPus142FunctionalMonitoringProtobuf: obj => obj,
    getPus142FunctionalMonitoring: obj => obj,
    getPus142ParameterMonitoringDefinition: obj => obj,
    getPus144ModelProtobuf: obj => obj,
    getPus144OnboardFileProtobuf: obj => obj,
    getPus144OnboardFile: obj => obj,
    getPusMmePacketStore: obj => obj,
    getPusMmeModelProtobuf: obj => obj,
    getPusMmePacketProtobuf: obj => obj,
    getPusMmePacket: obj => obj,
    getPusMmePacketParameter: obj => obj,
    getDataStructureProtobuf: obj => obj,
  }),
}));

describe('getPayload', () => {
  _each(comObjects, (comObject, key) => {
    describe(`getPayload :: ${key}`, () => {
      _each(comObject, (t) => {
        test(`pusService: ${t.pusService} serviceApid: ${t.serviceApid} should be ${t.shouldBe}`, () => {
          const payload = getPayload(
            t.pusService,
            t.serviceApid,
            t.timestamp,
            t.forceModel,
            t.continuous
          );
          expect(payload).toMatchSnapshot();
        });
      });
    });
  });
});
