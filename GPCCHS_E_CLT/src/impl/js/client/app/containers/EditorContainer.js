import React from 'react';
import Editor from '../components/Editor';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeEditor } from '../actions/pages';

const data = {
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
                  "unit":"s",
                  "digits":5,
                  "format":"decimal",
                  "domain":"",
                  "session":"Session 1",
                  "axisId":"0"
               },
               "connectedDataY":{
                  "fullName":"Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.extractedValue",
                  "unit":"V",
                  "digits":5,
                  "format":"decimal",
                  "domain":"",
                  "session":"Session 1",
                  "axisId":"1"
               },
               "lineStyle":"Continuous",
               "pointsStyle":"None",
               "curveColour":"#222222",
               "stateColours":[

               ]
            }
         ],
         "xAxis":[
            {
               "id":0,
               "axis":{
                  "label":"Time",
                  "unit":"s",
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
            }
         ],
         "yAxis":[
            {
               "id":1,
               "axis":{
                  "label":"VBat",
                  "unit":"V",
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
                  "min":-300,
                  "max":300,
                  "autoLimits":false,
                  "tickStep":50,
                  "autoTick":false,
                  "showTicks":true,
                  "showTickLabels":true,
                  "isLogarithmic":false,
                  "showAxis":true
               }
            }
         ],
         "grid":[
            {
               "yAxisId":1,
               "lineStyle":"Continuous",
               "width":1,
               "showGrid":true
            }
         ],
         "title":"VIMA Plot example",
         "titleStyle":{
            "font":"Arial",
            "size":12,
            "bold":false,
            "italic":false,
            "underline":false,
            "strikeOut":false,
            "alignLeft":false,
            "colour":0
         },
         "plotBackgroundColour":4294967295,
         "legend":{
            "style":{
               "font":"Arial",
               "size":12,
               "bold":false,
               "italic":false,
               "underline":false,
               "strikeOut":false,
               "alignLeft":false,
               "colour":0
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

const EditorContainer = props => <Editor {...props} />;

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps.editor,
    // configuration: state.views[ownProps.viewId],
    configuration: data.data,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators({
    closeEditor: () => closeEditor(ownProps.pageId),
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);
