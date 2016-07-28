module.exports = require('protobufjs').newBuilder({})['import']({
    'package': null,
    'messages': [
        {
            'name': 'header',
            'fields': [
                {
                    'rule': 'required',
                    'type': 'string',
                    'name': 'catalog',
                    'id': 1
                }, {
                    'rule': 'required',
                    'type': 'string',
                    'name': 'fullDataId',
                    'id': 2
                }, {
                    'rule': 'required',
                    'type': 'string',
                    'name': 'oid',
                    'id': 3
                }, {
                    'rule': 'required',
                    'type': 'string',
                    'name': 'parameter',
                    'id': 4
                }, {
                    'rule': 'required',
                    'type': 'uint32',
                    'name': 'session',
                    'id': 5
                }, {
                    'rule': 'required',
                    'type': 'uint64',
                    'name': 'timestamp',
                    'id': 6
                }, {
                    'rule': 'required',
                    'type': 'string',
                    'name': 'type',
                    'id': 7
                },
            ]
        }
    ]
}
)
.build('header');
