module.exports = require("protobufjs").newBuilder({})['import']({
    "package": null,
    "messages": [
        {
            "name": "ccsds_mal",
            "fields": [],
            "messages": [
                {
                    "name": "protobuf",
                    "fields": [],
                    "messages": [
                        {
                            "name": "ATTRIBUTE",
                            "fields": [
                                {
                                    "rule": "optional",
                                    "type": "BLOB",
                                    "name": "_blob",
                                    "id": 1
                                },
                                {
                                    "rule": "optional",
                                    "type": "BOOLEAN",
                                    "name": "_boolean",
                                    "id": 2
                                },
                                {
                                    "rule": "optional",
                                    "type": "DURATION",
                                    "name": "_duration",
                                    "id": 3
                                },
                                {
                                    "rule": "optional",
                                    "type": "FLOAT",
                                    "name": "_float",
                                    "id": 4
                                },
                                {
                                    "rule": "optional",
                                    "type": "DOUBLE",
                                    "name": "_double",
                                    "id": 5
                                },
                                {
                                    "rule": "optional",
                                    "type": "IDENTIFIER",
                                    "name": "_identifier",
                                    "id": 6
                                },
                                {
                                    "rule": "optional",
                                    "type": "OCTET",
                                    "name": "_octet",
                                    "id": 7
                                },
                                {
                                    "rule": "optional",
                                    "type": "UOCTET",
                                    "name": "_uoctet",
                                    "id": 8
                                },
                                {
                                    "rule": "optional",
                                    "type": "SHORT",
                                    "name": "_short",
                                    "id": 9
                                },
                                {
                                    "rule": "optional",
                                    "type": "USHORT",
                                    "name": "_ushort",
                                    "id": 10
                                },
                                {
                                    "rule": "optional",
                                    "type": "INTEGER",
                                    "name": "_integer",
                                    "id": 11
                                },
                                {
                                    "rule": "optional",
                                    "type": "UINTEGER",
                                    "name": "_uinteger",
                                    "id": 12
                                },
                                {
                                    "rule": "optional",
                                    "type": "LONG",
                                    "name": "_long",
                                    "id": 13
                                },
                                {
                                    "rule": "optional",
                                    "type": "ULONG",
                                    "name": "_ulong",
                                    "id": 14
                                },
                                {
                                    "rule": "optional",
                                    "type": "STRING",
                                    "name": "_string",
                                    "id": 15
                                },
                                {
                                    "rule": "optional",
                                    "type": "TIME",
                                    "name": "_time",
                                    "id": 16
                                },
                                {
                                    "rule": "optional",
                                    "type": "FINETIME",
                                    "name": "_finetime",
                                    "id": 17
                                },
                                {
                                    "rule": "optional",
                                    "type": "URI",
                                    "name": "_uri",
                                    "id": 18
                                }
                            ]
                        },
                        {
                            "name": "BLOB",
                            "fields": [
                                {
                                    "rule": "required",
                                    "type": "bytes",
                                    "name": "value",
                                    "id": 1
                                }
                            ]
                        },
                        {
                            "name": "BOOLEAN",
                            "fields": [
                                {
                                    "rule": "required",
                                    "type": "bool",
                                    "name": "value",
                                    "id": 1
                                }
                            ]
                        },
                        {
                            "name": "DURATION",
                            "fields": [
                                {
                                    "rule": "required",
                                    "type": "int32",
                                    "name": "value",
                                    "id": 1
                                }
                            ]
                        },
                        {
                            "name": "FLOAT",
                            "fields": [
                                {
                                    "rule": "required",
                                    "type": "float",
                                    "name": "value",
                                    "id": 1
                                }
                            ]
                        },
                        {
                            "name": "DOUBLE",
                            "fields": [
                                {
                                    "rule": "required",
                                    "type": "double",
                                    "name": "value",
                                    "id": 1
                                }
                            ]
                        },
                        {
                            "name": "IDENTIFIER",
                            "fields": [
                                {
                                    "rule": "required",
                                    "type": "bytes",
                                    "name": "value",
                                    "id": 1
                                }
                            ]
                        },
                        {
                            "name": "OCTET",
                            "fields": [
                                {
                                    "rule": "required",
                                    "type": "bytes",
                                    "name": "value",
                                    "id": 1
                                }
                            ]
                        },
                        {
                            "name": "UOCTET",
                            "fields": [
                                {
                                    "rule": "required",
                                    "type": "bytes",
                                    "name": "value",
                                    "id": 1
                                }
                            ]
                        },
                        {
                            "name": "SHORT",
                            "fields": [
                                {
                                    "rule": "required",
                                    "type": "bytes",
                                    "name": "value",
                                    "id": 1
                                }
                            ]
                        },
                        {
                            "name": "USHORT",
                            "fields": [
                                {
                                    "rule": "required",
                                    "type": "bytes",
                                    "name": "value",
                                    "id": 1
                                }
                            ]
                        },
                        {
                            "name": "INTEGER",
                            "fields": [
                                {
                                    "rule": "required",
                                    "type": "int32",
                                    "name": "value",
                                    "id": 1
                                }
                            ]
                        },
                        {
                            "name": "UINTEGER",
                            "fields": [
                                {
                                    "rule": "required",
                                    "type": "uint32",
                                    "name": "value",
                                    "id": 1
                                }
                            ]
                        },
                        {
                            "name": "LONG",
                            "fields": [
                                {
                                    "rule": "required",
                                    "type": "int64",
                                    "name": "value",
                                    "id": 1
                                }
                            ]
                        },
                        {
                            "name": "ULONG",
                            "fields": [
                                {
                                    "rule": "required",
                                    "type": "uint64",
                                    "name": "value",
                                    "id": 1
                                }
                            ]
                        },
                        {
                            "name": "STRING",
                            "fields": [
                                {
                                    "rule": "required",
                                    "type": "string",
                                    "name": "value",
                                    "id": 1
                                }
                            ]
                        },
                        {
                            "name": "TIME",
                            "fields": [
                                {
                                    "rule": "required",
                                    "type": "uint64",
                                    "name": "value",
                                    "id": 1
                                }
                            ]
                        },
                        {
                            "name": "FINETIME",
                            "fields": [
                                {
                                    "rule": "required",
                                    "type": "uint64",
                                    "name": "millisec",
                                    "id": 1
                                },
                                {
                                    "rule": "required",
                                    "type": "uint32",
                                    "name": "pico",
                                    "id": 2
                                }
                            ]
                        },
                        {
                            "name": "URI",
                            "fields": [
                                {
                                    "rule": "required",
                                    "type": "bytes",
                                    "name": "value",
                                    "id": 1
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "name": "ccsds_mc",
            "fields": [],
            "messages": [
                {
                    "name": "protobuf",
                    "fields": [],
                    "enums": [
                        {
                            "name": "ValidityState",
                            "values": [
                                {
                                    "name": "INVALID",
                                    "id": 0
                                },
                                {
                                    "name": "VALID",
                                    "id": 2
                                },
                                {
                                    "name": "VALID_RAW_ONLY",
                                    "id": 3
                                },
                                {
                                    "name": "UNVERIFIED",
                                    "id": 4
                                },
                                {
                                    "name": "EXPIRED",
                                    "id": 8
                                }
                            ]
                        },
                        {
                            "name": "MonitoringState",
                            "values": [
                                {
                                    "name": "INFORMATIONAL",
                                    "id": 0
                                },
                                {
                                    "name": "WARNING",
                                    "id": 1
                                },
                                {
                                    "name": "ALARM",
                                    "id": 2
                                },
                                {
                                    "name": "SEVERE",
                                    "id": 3
                                },
                                {
                                    "name": "CRITICAL",
                                    "id": 4
                                },
                                {
                                    "name": "OUT_OF_RANGE",
                                    "id": 5
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "name": "decommutedParameter",
            "fields": [],
            "messages": [
                {
                    "name": "protobuf",
                    "fields": [],
                    "messages": [
                        {
                            "name": "ReportingParameter",
                            "fields": [
                                {
                                    "rule": "optional",
                                    "type": "ccsds_mal.protobuf.TIME",
                                    "name": "onboardDate",
                                    "id": 1
                                },
                                {
                                    "rule": "optional",
                                    "type": "ccsds_mal.protobuf.TIME",
                                    "name": "groundDate",
                                    "id": 2
                                },
                                {
                                    "rule": "optional",
                                    "type": "ccsds_mal.protobuf.ATTRIBUTE",
                                    "name": "convertedValue",
                                    "id": 3
                                },
                                {
                                    "rule": "optional",
                                    "type": "ccsds_mal.protobuf.ATTRIBUTE",
                                    "name": "rawValue",
                                    "id": 4
                                },
                                {
                                    "rule": "optional",
                                    "type": "ccsds_mal.protobuf.ATTRIBUTE",
                                    "name": "extractedValue",
                                    "id": 5
                                },
                                {
                                    "rule": "optional",
                                    "type": "ccsds_mal.protobuf.USHORT",
                                    "name": "triggerOnCounter",
                                    "id": 6
                                },
                                {
                                    "rule": "optional",
                                    "type": "ccsds_mal.protobuf.USHORT",
                                    "name": "triggerOffCounter",
                                    "id": 7
                                },
                                {
                                    "rule": "optional",
                                    "type": "ccsds_mc.protobuf.MonitoringState",
                                    "name": "monitoringState",
                                    "id": 8
                                },
                                {
                                    "rule": "optional",
                                    "type": "ccsds_mc.protobuf.ValidityState",
                                    "name": "validityState",
                                    "id": 9
                                },
                                {
                                    "rule": "optional",
                                    "type": "ccsds_mal.protobuf.BOOLEAN",
                                    "name": "isObsolete",
                                    "id": 10
                                },
                                {
                                    "rule": "optional",
                                    "type": "ccsds_mal.protobuf.BOOLEAN",
                                    "name": "isNominal",
                                    "id": 11
                                }
                            ],
                            "extensions": [
                                [
                                    12,
                                    112
                                ]
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}).build(["decommutedParameter","protobuf"]);