import React from 'react';
import Editor from '../components/Editor';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeEditor } from '../actions/pages';

const dataPlotView = {
  "data":{
      "type":"PlotView",
      "id":"VIMA_Demos/PV/PV.example.vipv",
      "attributes":{
         "path":"",
         "links":[
            {
               "name":"Page01",
               "path":"../Page01.vipg"
            }
         ],
         "procedures":[

         ],
         "defaultRatio":{
            "length":50,
            "width":50
         },
         "plotViewEntryPoints":[
            {
               "name":"ATT_BC_STR1VOLTAGE",
               "connectedDataX":{
                  "fullName":"Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.groundDate",
                  "unit":"ms",
                  "digits":5,
                  "format":"decimal",
                  "domain":"",
                  "session":"Session 1",
                  "axisId":"time"
               },
               "connectedDataY":{
                  "fullName":"Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.extractedValue",
                  "unit":"ms",
                  "digits":5,
                  "format":"decimal",
                  "domain":"",
                  "session":"Session 1",
                  "axisId":"time"
               },
               "lineStyle":"Continuous",
               "pointsStyle":"None",
               "curveColour":"#222222",
               "stateColours":[
                 {
                   "colour": "#4A90E2",
                   "condition": "monitoringState!=4"
                 },
                 {
                   "colour": "#DD5262",
                   "condition": "monitoringState!=4"
                 },
                 {
                   "colour": "#54A798",
                   "condition": "monitoringState!=4"
                 }
               ]
            },
            {
               "name":"ATT_BC_STR2VOLTAGE",
               "connectedDataX":{
                  "fullName":"Reporting.ATT_BC_STR2VOLTAGE<ReportingParameter>.groundDate",
                  "unit":"ms",
                  "digits":5,
                  "format":"decimal",
                  "domain":"",
                  "session":"Session 1",
                  "axisId":"time"
               },
               "connectedDataY":{
                  "fullName":"Reporting.ATT_BC_STR2VOLTAGE<ReportingParameter>.extractedValue",
                  "unit":"ms",
                  "digits":5,
                  "format":"decimal",
                  "domain":"",
                  "session":"Session 1",
                  "axisId":"time"
               },
               "lineStyle":"Continuous",
               "pointsStyle":"None",
               "curveColour":"#222222",
               "stateColours":[
                 {
                   "colour": "#4A90E2",
                   "condition": "monitoringState!=4"
                 },
                 {
                   "colour": "#DD5262",
                   "condition": "monitoringState!=4"
                 },
                 {
                   "colour": "#54A798",
                   "condition": "monitoringState!=4"
                 }
               ]
            },
            {
               "name":"ATT_BC_STR3VOLTAGE",
               "connectedDataX":{
                  "fullName":"Reporting.ATT_BC_STR3VOLTAGE<ReportingParameter>.groundDate",
                  "unit":"ms",
                  "digits":5,
                  "format":"decimal",
                  "domain":"",
                  "session":"Session 1",
                  "axisId":"time"
               },
               "connectedDataY":{
                  "fullName":"Reporting.ATT_BC_STR3VOLTAGE<ReportingParameter>.extractedValue",
                  "unit":"ms",
                  "digits":5,
                  "format":"decimal",
                  "domain":"",
                  "session":"Session 1",
                  "axisId":"time"
               },
               "lineStyle":"Continuous",
               "pointsStyle":"None",
               "curveColour":"#222222",
               "stateColours":[
                 {
                   "colour": "#4A90E2",
                   "condition": "monitoringState!=4"
                 },
                 {
                   "colour": "#DD5262",
                   "condition": "monitoringState!=4"
                 },
                 {
                   "colour": "#54A798",
                   "condition": "monitoringState!=4"
                 }
               ]
            }
         ],
         "axes":[
            {
              "label":"Time",
              "unit":"ms",
              "style":{
                  "font":"Arial",
                  "size":12,
                  "bold":false,
                  "italic":false,
                  "underline":false,
                  "strikeOut":false,
                  "align":"left",
                  "colour":0
              },
              "min":0,
              "max":10,
              "autoLimits":true,
              "tickStep":0.5,
              "autoTick":true,
              "showTicks":true,
              "showTickLabels":true,
              "isLogarithmic":false,
              "showAxis":true
            },
            {
              "label":"Frequency",
              "unit":"ms",
              "style":{
                  "font":"Arial",
                  "size":12,
                  "bold":false,
                  "italic":false,
                  "underline":false,
                  "strikeOut":false,
                  "align":"left",
                  "colour":0
              },
              "min":0,
              "max":10,
              "autoLimits":true,
              "tickStep":0.5,
              "autoTick":true,
              "showTicks":true,
              "showTickLabels":true,
              "isLogarithmic":false,
              "showAxis":true
            },
            {
              "label":"Temperature",
              "unit":"ms",
              "style":{
                  "font":"Arial",
                  "size":12,
                  "bold":false,
                  "italic":false,
                  "underline":false,
                  "strikeOut":false,
                  "align":"left",
                  "colour":0
              },
              "min":0,
              "max":10,
              "autoLimits":true,
              "tickStep":0.5,
              "autoTick":true,
              "showTicks":true,
              "showTickLabels":true,
              "isLogarithmic":false,
              "showAxis":true
            }
         ],
         
         "grid":{
              "yAxisId":"time",
              "lineStyle":"Continuous",
              "width":1,
              "showGrid":true
          },
         "title":"VIMA Plot example",
         "titleStyle":{
            "font":"Arial",
            "size":12,
            "bold":false,
            "italic":true,
            "underline":false,
            "strikeOut":false,
            "align":"left",
            "colour":"#"
         },
         "plotBackgroundColour":4294967295,
         "legend":{
            "style":{
               "font":"Arial",
               "size":12,
               "bold":false,
               "italic":true,
               "underline":false,
               "strikeOut":false,
               "alignLeft":false,
               "colour":"#222222"
            },
            "location":"Top"
         },
         "markers":[
            {
               "kind":"Text",
               "label":"VBAT",
               "style":{
                  "font":"Arial",
                  "size":12,
                  "bold":false,
                  "italic":false,
                  "underline":true,
                  "strikeOut":false,
                  "alignLeft":false,
                  "colour":0
               },
               "relativePosX":5.6,
               "relativePosY":8.9
            }
         ]
      }
   }
};

const dataTextView = {
    "data": {
        "type": "TextView",
        "attributes": {
            "TextViewEntryPoints": [
                {
                    "name": "ATT_BC_STR1VOLTAGE_EV",
                    "connectedData": {
                    "fullName": "Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.extractedValue",
                    "unit": "ms",
                    "digits": 5,
                    "format": "decimal",
                    "filter": "TM1.field1 >= 4",
                    "domain": ".*",
                    "session": "Session 1"
                    }
                },
                {
                    "name": "ATT_BC_STR1VOLTAGE_MS",
                    "connectedData": {
                    "fullName": "Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.monitoringState",
                    "unit": "ms",
                    "digits": 5,
                    "format": "decimal",
                    "filter": "TM1.field1 >= 4",
                    "domain": ".*",
                    "session": "Session 1"
                    }
                },
                {
                    "name": "ATT_BC_STR1VOLTAGE_CV",
                    "connectedData": {
                    "fullName": "Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.convertedValue",
                    "unit": "ms",
                    "digits": 5,
                    "format": "decimal",
                    "filter": "TM1.field1 >= 4",
                    "domain": ".*",
                    "session": "Session 1"
                    }
                }
            ],
            "links": [
                {
                    "name": "Page01",
                    "path": "../Page01.vipg"
                }
            ],
            "defaultRatio": {
                "length": 5,
                "width": 3
            },
            "content": [
"<!DOCTYPE html>",
"<html>",
" <head>",
"  <title>TV example</title>",
" </head>",
" <body>",
"  <table border=\"2\">",
"   <tr><td>ATT_BC_STR1VOLTAGE_MS</td><td><span=\"ATT_BC_STR1VOLTAGE_MS\"/></td></tr>",
"   <tr><td>ATT_BC_STR1VOLTAGE_EV</td><td><span=\"ATT_BC_STR1VOLTAGE_EV\"/></td></tr>",
"   <tr><td>ATT_BC_STR1VOLTAGE_CV</td><td><span=\"ATT_BC_STR1VOLTAGE_CV\"/></td></tr>",
"  </table>",
" </body>",
"</html>"
            ]
        }
    }
}

const EditorContainer = props => <Editor {...props} />;

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps.editor,
    // configuration: state.views[ownProps.viewId],
    configuration: dataPlotView.data,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators({
    closeEditor: () => closeEditor(ownProps.pageId),
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);
