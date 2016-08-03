const timeBarSchema =
{
    "$schema": "http://json-schema.org/draft-04/schema#",
    "definitions": {
      "boundaries": {
        "type": "object",
        "properties": {
          "lower": {"type": "number"},
          "upper": {"type": "number"}
          },
        "required": ["lower", "upper"]
        },
        "timeLine": {
            "type": "object",
            "properties": {
                "id": {"type": "string"},
                "offset": {"type": "number", "default": 0}
            },
            "required": ["id", "offset"]
        },
        "sessionLine": {
            "allOf": [
                {"$ref": "#/definitions/timeLine"},
                {
                    "properties": {
                        "kind": {"type": "string", "enum": ["Session"]},
                        "sessionId": {"type": "number"}
                    },
                    "required": ["kind", "sessionId"]
                }
            ]
        },
        "datasetLine": {
            "allOf": [
                {"$ref": "#/definitions/timeLine"},
                {
                    "properties": {
                        "kind": {"type": "string", "enum": ["Dataset"]},
                        "dsPath": {"type": "string"}
                    },
                    "required": ["kind", "dsPath"]
                }
            ]
        },
        "recordsetLine": {
            "allOf": [
                {"$ref": "#/definitions/timeLine"},
                {
                    "properties": {
                        "kind": {"type": "string", "enum": ["Recordset"]},
                        "rsPath": {"type": "string"}
                    },
                    "required": ["kind", "rsPath"]
                }
            ]
        }
      },
      "timeBar": {
        "type": "object",
        "properties": {
            "id": {"type": "string"},
            "mode": {"type": "string", "default": "Normal", "enum": ["Normal", "Extended", "Sliding"]},
            "visuWindow": {
                "allOf" : [
                    {"$ref": "#/definitions/boundaries"},
                    {
                        "properties": {
                            "current": {"type": "number"},
                        },
                        "required": ["current"]
                    }
                ]
            },
            "state" : { "type" : "string", "enum" : ["play","pause"], "default":"pause" },
            "slideWindow": {"$ref": "#/definitions/boundaries"},
            "extUpperBound": {"type": "number"},
            "speed": {"type": "number", "default": 1.0},
            "realTime": {"type": "boolean", "default": false},
            "timeSpec": {"type": "string", "enum": ["LocalTime"]},
            "offsetFromUTC": {"type": "number", "default": 0},
            "masterId": {"type": "string"},
            "timeLines": {
                "type": "array",
                "items": {
                    "oneOf": [
                        {"$ref": "#/definitions/sessionLine"},
                        {"$ref": "#/definitions/datasetLine"},
                        {"$ref": "#/definitions/recordsetLine"}
                    ]
                }
            }
        },
        "required": ["id", "mode", "visuWindow", "slideWindow", "extUpperBound", "rulerStart", "rulerResolution", "timeLines"],
        "additionalProperties": false
    }
  };

module.exports = { timeBarSchema } ;
