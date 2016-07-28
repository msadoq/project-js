(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["ReStock"] = factory(require("React"));
	else
		root["ReStock"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_9__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// common components
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	
	var _libArrayUtils = __webpack_require__(1);
	
	var _libArrayUtils2 = _interopRequireDefault(_libArrayUtils);
	
	var _libChart = __webpack_require__(2);
	
	var _libChart2 = _interopRequireDefault(_libChart);
	
	var _libDataSeries = __webpack_require__(3);
	
	var _libDataSeries2 = _interopRequireDefault(_libDataSeries);
	
	// interaction components
	
	var _libEventCapture = __webpack_require__(4);
	
	var _libEventCapture2 = _interopRequireDefault(_libEventCapture);
	
	var _libChartCanvas = __webpack_require__(5);
	
	var _libChartCanvas2 = _interopRequireDefault(_libChartCanvas);
	
	var _libZoomIndicator = __webpack_require__(6);
	
	var _libZoomIndicator2 = _interopRequireDefault(_libZoomIndicator);
	
	var _libZoomReset = __webpack_require__(10);
	
	var _libZoomReset2 = _interopRequireDefault(_libZoomReset);
	
	var version = "0.2.9";
	
	exports["default"] = {
		PlotChart: _libChartCanvas2["default"],
		JsClient: _libChart2["default"],
		MinMaxIndicator: _libDataSeries2["default"],
		ScatterLineSeries: _libEventCapture2["default"],
		ZoomIndicator: _libZoomIndicator2["default"],
		ZoomReset: _libZoomReset2["default"],
		ArrayUtils: _libArrayUtils2["default"],
		version: version
	};
	module.exports = exports["default"];

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.cloneMe = cloneMe;
	exports.cloneArray = cloneArray;
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }
	
	var log = function log(m) {
		//	console.log(m, rest);
		;
	};
	var warn = function warn(m) {
		for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			rest[_key - 1] = arguments[_key];
		}
	
		console.warn.apply(console, [m].concat(rest));
		;
	};
	var error = function error(m) {
		for (var _len2 = arguments.length, rest = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
			rest[_key2 - 1] = arguments[_key2];
		}
	
		console.error(m, rest);
		;
	};
	
	// element : t
	// array : array<t>
	// compare : t -> t -> { 0, 1, 2} (0 -> equal, 1 -> sup , 2 -> inf)
	// start : int
	// end : int
	//return the index where the element is supposed to be inserted, else
	//return the index of element in array
	Array.prototype.locationOf = function (element, compare, start, end) {
		start = start || 0;
		end = end || this.length;
		if (this.length == 0) {
			return 0;
		}
	
		var pivot = parseInt(start + (end - start) / 2, 10);
	
		if (end - start <= 1 || compare(this[pivot], element) == 0) {
			return pivot;
		}
	
		if (compare(this[pivot], element) == -1) {
			return this.locationOf(element, compare, pivot, end); //tail call
		} else {
				return this.locationOf(element, compare, start, pivot); //tail call
			}
	};
	
	//FROM UTILS OF RESTOCK : CLONE AN OBJECT (RECURSIVE)
	
	function cloneMe(obj) {
		if (obj == null || typeof obj !== "object") {
			return obj;
		}
		if (obj instanceof Date) {
			return new Date(obj.getTime());
		}
		var temp = {}; // obj.constructor(); // changed
	
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				temp[key] = cloneMe(obj[key]);
			}
		}
		return temp;
	}
	
	;
	
	//CLONE ON ARRAY OF OBJECT / PRIMITIVES (MUST NOT CONTAIN ARRAYS)
	
	function cloneArray(arr) {
		//	console.log(cloneMe);
		return arr.reduce(function (acc, cur) {
			acc.push(cloneMe(cur));return acc;
		}, []);
	}
	
	//return -1 when element is not inside the array, else
	//return the index of element in array
	//element : t
	//compare : t -> t -> bool
	//start : int
	//end : int
	Array.prototype.indexOfSorted = function (element, compare, start, end) {
		start = start || 0;
		end = end || this.length;
	
		if (this.length == 0) {
			return -1;
		}
	
		var pivot = parseInt(start + (end - start) / 2, 10);
	
		if (compare(this[pivot], element) == 0) {
			return pivot;
		}
		if (end - start <= 1) {
			return -1;
		}
		if (compare(this[pivot], element) == -1) {
			return this.indexOfSorted(element, compare, pivot, end); //tail call
		} else {
				return this.indexOfSorted(element, compare, start, pivot); //tail call
			}
	};
	
	//return insert element in sorted list using compare
	//element : t
	//compare : t -> t -> {-1,0,1}
	Array.prototype.insert = function (element, compare) {
		var indexOfElem = this.indexOfSorted(element, compare);
		//there is already an inside array
		if (indexOfElem !== -1) {
			for (var key in element) {
				//copy the object inside the array
				//TODO DEEP COPY
				this[indexOfElem][key] = element[key];
			}
		} else {
			var insertIndex = this.locationOf(element, compare);
	
			//array element greater than current element
			if (compare(this[insertIndex], element) == -1) {
				insertIndex = insertIndex + 1;
			}
	
			this.splice(insertIndex, 0, element);
		}
	};
	
	//TODO GENERALIZE THIS.
	// remove element from sorted array using compare (O(log(n)))
	//element : t
	//compare : t -> t -> {-1,0,1}
	//shouldDelete
	Array.prototype.remove = function (element, compare, shouldDelete) {
		var indexOfElem = this.indexOfSorted(element, compare);
		if (indexOfElem !== -1) {
			if (shouldDelete(this[indexOfElem], element)) {
				this.splice(indexOfElem, 1);
			}
		} else {
			console.warn("Unexpected removal of element, element doesn't exist : ", element, this);
		}
	};
	
	//sorted insert of array inside this. uses compare function
	//array : array<t>
	//compare t -> t -> {-1,0,1}
	Array.prototype.insertAll = function (array, compare) {
		var cpy = [].concat(_toConsumableArray(this));
		if (this.length == 0) {
			cpy = cpy.concat(array);
		} else {
			array.map(function (val) {
				cpy.insert(val, compare);
			});
		}
		return cpy;
	};
	
	//return remove of array inside this. uses compare function
	//array : array<t>
	//compare t -> t -> {-1,0,1}
	Array.prototype.removeAll = function (array, compare, shouldDelete) {
		var cpy = [].concat(_toConsumableArray(this));
		array.map(function (val) {
			cpy.remove(val, compare, shouldDelete);
		});
		return cpy;
	};
	
	//insert element at index of array.
	//element : t
	//index : int
	Array.prototype.insertAt = function (element, index) {
		this.splice(index + 1, 0, element);
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	function JsClient() {
		var _this = this;
		console.log('call JsClient');
        var adress = typeof webUri != 'undefined' ? webUri : ''
        var socket = io.connect('http://localhost:1337');
		
		let batPoints = {};
		let localIndex = 0;
		let index = 0;
		
		const util = require('util');
		
		const sendToView = setInterval( () => {
		  for (const subId of Object.keys(batPoints)) {
			const end = batPoints[subId].index;
			if (batPoints[subId].localIndex < end) {
				const localPoints = batPoints[subId].data.slice(batPoints[subId].localIndex,end);
				const plotJson = {
					type: 'addPoints',
					id: subId,
					points: localPoints.sort(),
				};	      
				
				if (_this.messageReceived && localPoints.length > 0) _this.messageReceived(plotJson);
				// console.log(`id: ${subId} - start: ${batPoints[subId].localIndex} - end: ${end} - current: ${batPoints[subId].index} - points: ${util.inspect(plotJson.points)}`);	
				batPoints[subId].localIndex = end;
			}
		  }
		}, 40);
		
        socket.on('message', (message) => {
			//console.log(`PLOT ${message}`);
            document.getElementById("ui").innerHTML = "<h1>"+message+"</h1>";
        });
        socket.on('plot', (message) => {
			if (message.parameter === paramName) {
		      if (!batPoints[message.subscriptionId]){
				batPoints[message.subscriptionId] = {
					data: [],
					index: 0,
				    localIndex: 0,
				};
			  }
			  
			  batPoints[message.subscriptionId].data = batPoints[message.subscriptionId].data.concat(message.points);
			  batPoints[message.subscriptionId].index+=message.points.length;
			}
        });
		socket.on('timeline', (message) => {
		  console.log('timeline');
		  if (_this.messageReceived) {
			_this.messageReceived(message);
		  }	
        });
		socket.on('style', (message) => {
		  console.log('style');
		  if (_this.messageReceived) {
			_this.messageReceived(message);
		  }	
		});
        socket.on('open', (message) => {
			//console.log('hello');
            if (_this.onOpen) _this.onOpen(message);
        });
	}
	
	// example : client = new JsClient; client.messageReceived = (m) => { doStuffWithMessage  };
	//
	//
	
	window.JsClient = JsClient;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	function MinMaxIndicator(options, chartProps, dataSeriesProps) {
		// options - The options provided in DataSeries
		// chartProps - the props object of the Chart surrounding this element
		// dataSeriesProps - the props object of the DataSeries where this
		// indicator is used
	
		var prefix = "chart_" + chartProps.id;
		var key = "overlay_" + dataSeriesProps.id;
	
		function indicator() {}
	
		indicator.options = function () {
			return settings;
		};
	
		indicator.calculate = function (data) {
			// calculate the new values for the data provided
			// use prefix & key above to create any new fields under
			// data[i][prefix][key] = ...;
			// This is so indicators do not override each other and it is easy
			// to troubleshoot the source of the problem
	
			return data;
		};
	
		indicator.stroke = function () {
			// optional method to return the stroke color
			return stroke;
		};
		//	    indicator.domain = function() {
		//	        // optional method if you want to over ride the domain which
		//			// react-stockcharts calculates, used in RSI
		////	        return [dataSeriesProps.minValue, dataSeriesProps.maxValue];
		//	    };
	
		indicator.minDomain = function () {
			// optional method if you want to over ride the domain which
			// react-stockcharts calculates, used in RSI
			return [dataSeriesProps.minValue, dataSeriesProps.maxValue];
		};
		//	    indicator.yTicks = function() {
		//	        // optinoal method if you want only certain values to be displayed
		//			// as yTicks, used inRSI
		//	        return [settings.overSold, 50, settings.overBought];
		//	    };
	
		indicator.isMinMaxIndicator = function () {
			// it is also advisable to create this function returning true
			// this can be used by your custom Tooltip to format the values
			// appropriately
			return true;
		};
		return indicator;
	}
	
	window.MinMaxIndicator = MinMaxIndicator;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var rs = ReStock["default"];
	var wrap = rs.series.wrap;
	
	var ScatterLineSeries = (function (_React$Component) {
		_inherits(ScatterLineSeries, _React$Component);
	
		function ScatterLineSeries() {
			_classCallCheck(this, ScatterLineSeries);
	
			_get(Object.getPrototypeOf(ScatterLineSeries.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(ScatterLineSeries, [{
			key: "render",
			value: function render() {
				var props = this.props;
	
				// The following are available from props
	
				// plotData is an array containing the points to be displayed on the screen. This is not the same as the data
				//      you provided as input. It is most likely smaller in size since it contains a filtered list of items
				//      which are to be displayed for the domain of xScale
	
				// The x & y Accessor are used to get the x & y value for each element in the plotData
	
				// The x & y Scale can be used to get the value in pixels for a x, y value
	
				var xAccessor = props.xAccessor;
				var yAccessor = props.yAccessor;
				var xScale = props.xScale;
				var yScale = props.yScale;
				var plotData = props.plotData;
	
				// In the event there is a CompareSeries in that Chart this is available
				// TODO explain more about compare series and why it is special
	
				var compareSeries = props.compareSeries;
	
				// indicator is available if you have used one on the DataSeries surrounding this Series
				// Read more on how to write an indicator in the "Custom - Create indicator" section
	
				var indicator = props.indicator;
	
				// this is available if there is a stroke / fill defined in the DataSeries surrounding this Series
				//      or the stroke / fill defined in the indicator above
	
				var stroke = props.stroke;
				var fill = props.fill;
	
				// type is the value you have provided at the ChartCanvas, it can be "svg" or "hybrid"
				// height and width of this Chart
	
				var type = props.type;
				var height = props.height;
				var width = props.width;
	
				// In addition to the above, any props you define when using this component are also available.
				// If say you create a prop called xAccessor, this will override the xAccessor provided by react-stockcharts
	
				return svg; /* return an svg element */
			}
		}]);
	
		return ScatterLineSeries;
	})(React.Component);
	
	var getDrawDotFunction = function getDrawDotFunction(shape) {
	
		var drawFunction = function drawFunction(ctx, x, y) {
			return undefined;
		};
	
		if (shape == "circle") {
			drawFunction = function (ctx, x, y) {
				ctx.moveTo(x, y);
				ctx.arc(x, y, 1, 0, 2 * Math.PI, false);
			};
			//ctx.fill();//FILL = HUGE PERF DROP
		} else if (shape == "triangle") {
				drawFunction = function (ctx, x, y) {
					ctx.moveTo(x, y);
					ctx.lineTo(x + 3, y + 3);
					ctx.lineTo(x + 3, y - 3);
					ctx.lineTo(x, y);
				};
			} else if (shape == "square") {
				drawFunction = function (ctx, x, y) {
					ctx.moveTo(x + 2, y + 2);
					ctx.lineTo(x + 2, y - 2);
					ctx.lineTo(x - 2, y - 2);
					ctx.lineTo(x - 2, y + 2);
					ctx.lineTo(x + 2, y + 2);
					ctx.moveTo(x, y);
				};
			}
		return drawFunction;
	};
	ScatterLineSeries.drawOnCanvas = function (props, ctx, xScale, yScale, plotData) {
		// This is an optional method
		// having this static method on your component will make
		// this method to be called on pan action
	
		// If you are creating a series based on only the building blocks listed above this method is not needed
		var xAccessor = props.xAccessor;
		var yAccessor = props.yAccessor;
		var stroke = props.stroke;
		var lineStyle = props.lineStyle;
		var pointsStyle = props.pointsStyle;
		var localColorAccessor = props.localColorAccessor;
		var currentColor = stroke; //Used for comparison, because ctx.strokeStyle is transformed in RGB.
	
		var begin = true;
	
		var drawDotFunction = getDrawDotFunction(pointsStyle);
	
		//init
		ctx.strokeStyle = stroke;
		ctx.lineWidth = props.lineWidth;
		ctx.beginPath();
	
		if (lineStyle == "dashed") {
			ctx.setLineDash([5]);
		}
		plotData.forEach(function (d, i) {
			//MODIFICATION : IF Y UNDEFINED , DONT "LIFT THE PENCIL"
	
			if (yAccessor(d) === undefined) {
				return;
			} else {
				var x = xScale(xAccessor(d));
				var y = yScale(props.toNumber(yAccessor(d)));
	
				//MODIFICATION : IF Y UNDEFINED , DONT "LIFT THE PENCIL"	     
	
				var localColor = localColorAccessor(xAccessor(d));
	
				if (lineStyle == "continuous" || lineStyle == "dashed") {
					ctx.lineTo(xScale(xAccessor(d)), yScale(yAccessor(d)));
				}
	
				//LOCAL COLOR STUFF
				if (localColor != undefined && currentColor != localColor) {
					ctx.stroke();
					ctx.strokeStyle = localColor;
					currentColor = localColor;
					ctx.beginPath();
					begin = true;
				} else if (localColor == undefined && currentColor != stroke) {
					ctx.stroke();
					ctx.strokeStyle = stroke;
					currentColor = stroke;
					ctx.beginPath();
					begin = true;
				}
				//END OF LOCAL COLOR
	
				if (lineStyle == "continuous" || lineStyle == "dashed") {
	
					if (begin) {
						var tx = ~ ~(0.5 + x);
						var ty = ~ ~(0.5 + y);
						ctx.moveTo(tx, ty);
						begin = false;
					}
				}
	
				drawDotFunction(ctx, x, y);
				//		    ctx.moveTo(x,y);
			}
		});
		ctx.stroke();
	};
	
	//clip: React.PropTypes.bool.isRequired,
	ScatterLineSeries.defaultProps = {
		lineStyle: "continuous",
		pointsStyle: undefined,
		lineWidth: 1,
		toNumber: function toNumber(id) {
			return id;
		}, //by default, identity function.
		localColorAccessor: function localColorAccessor(x) {
			return undefined;
		}
	};
	
	// This is very important. You need to wrap your series, so ReStock knows to provide these props
	window.ScatterLineSeries = wrap(ScatterLineSeries);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }
	
	var _ZoomIndicator = __webpack_require__(6);
	
	var _ZoomIndicator2 = _interopRequireDefault(_ZoomIndicator);
	
	var _ZoomReset = __webpack_require__(10);
	
	var _ZoomReset2 = _interopRequireDefault(_ZoomReset);
	
	var _ArrayUtils = __webpack_require__(1);
	
	var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);
	
	var rs = ReStock["default"];
	var ChartCanvas = rs.ChartCanvas;
	var Chart = rs.Chart;
	var DataSeries = rs.DataSeries;
	var EventCapture = rs.EventCapture;
	var _rs$axes = rs.axes;
	var XAxis = _rs$axes.XAxis;
	var YAxis = _rs$axes.YAxis;
	var _rs$series = rs.series;
	var LineSeries = _rs$series.LineSeries;
	var PointAndFigureSeries = _rs$series.PointAndFigureSeries;
	var RenkoSeries = _rs$series.RenkoSeries;
	var Line = _rs$series.Line;
	var _rs$helper = rs.helper;
	var ChartWidthMixin = _rs$helper.ChartWidthMixin;
	var TypeChooser = _rs$helper.TypeChooser;
	var _rs$coordinates = rs.coordinates;
	var MouseCoordinates = _rs$coordinates.MouseCoordinates;
	var CurrentCoordinate = _rs$coordinates.CurrentCoordinate;
	var MouseCoordinates = rs.coordinates.MouseCoordinates;
	var _rs$helper2 = rs.helper;
	var fitWidth = _rs$helper2.fitWidth;
	var TypeChooser = _rs$helper2.TypeChooser;
	var _rs$tooltip = rs.tooltip;
	var TooltipContainer = _rs$tooltip.TooltipContainer;
	var OHLCTooltip = _rs$tooltip.OHLCTooltip;
	var SingleValueTooltip = _rs$tooltip.SingleValueTooltip;
	var RSITooltip = _rs$tooltip.RSITooltip;
	var MovingAverageTooltip = _rs$tooltip.MovingAverageTooltip;
	var _rs$interactive = rs.interactive;
	var TrendLine = _rs$interactive.TrendLine;
	var Brush = _rs$interactive.Brush;
	var financeEODDiscontinuousScale = rs.scale.financeEODDiscontinuousScale;
	var JsClient = window.JsClient;
	var MinMaxIndicator = window.MinMaxIndicator;
	var ScatterLineSeries = window.ScatterLineSeries;
	var _rs$indicator = rs.indicator;
	var MACD = _rs$indicator.MACD;
	var EMA = _rs$indicator.EMA;
	var SMA = _rs$indicator.SMA;
	
	var client = new JsClient();
	//Method to re-implement : client.messageReceived, client.onOpen
	var rawData = [];
	var xScale = d3.time.scale();
	var log = function log(m) {
		//	console.log(m, rest);
		;
	};
	var warn = function warn(m) {
		for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			rest[_key - 1] = arguments[_key];
		}
	
		console.warn.apply(console, [m].concat(rest));
		;
	};
	var error = function error(m) {
		for (var _len2 = arguments.length, rest = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
			rest[_key2 - 1] = arguments[_key2];
		}
	
		console.error(m, rest);
		;
	};
	
	var cachedMessages = [];
	
	// SORTING
	
	// INSERT IN SORTED POINTS LIST
	
	var addPoints = 0;
	var removePoints = 1;
	var removePointsFromTo = 2;
	var plotConfiguration = 3;
	var axisConfiguration = 4;
	var plotChartConfiguration = 5;
	var vLineMarker = 6;
	var selectPlot = 7;
	var exportSvg = 8;
	var removeConfiguration = 9;
	var dataAxisConfiguration = 10;
	var TimeAxisConfiguration = 11;
	var gridConfiguration = 12;
	var setViewRange = 13;
	var xExtents = 14;
	
	var length = 0;
	
	//CONFIG-WORTHY VARIABLES
	
	var SPACE_BETWEEN_AXES = 40;
	
	//END CONFIG WORTHY VARIABLES
	
	//INTERNAL VARIABLES
	var VMARKER_PREFIX = "vLineMarker";
	var HMARKER_PREFIX = "hLineMarker";
	var XVALUE_KEY = "date";
	var YVALUE_SUFFIX = "valueY";
	
	//
	//var data2=[]
	
	var initDone = false;
	client.onOpen = function (e) {};
	
	var warnedConfs = [];
	
	var parseType = function parseType(type) {
		if (type == "addPoints") {
			return addPoints;
		}
		if (type == "removePoints") {
			return removePoints;
		}
		if (type == "removePointsFromTo") {
			return removePointsFromTo;
		}
		if (type == "plotConfiguration") {
			return plotConfiguration;
		}
		if (type == "axisConfiguration" || type == "timeAxisConfiguration" || type == "dataAxisConfiguration") {
			return axisConfiguration;
		}
		if (type == "plotChartConfiguration") {
			return plotChartConfiguration;
		}
		if (type == "vLineMarkerConfiguration" || type == "VLineMarkerConfiguration") {
			return vLineMarker;
		}
		if (type == "exportSvg") {
			return exportSvg;
		}
		if (type == "removeConfiguration") {
			return removeConfiguration;
		}
		if (type == "gridConfiguration") {
			return gridConfiguration;
		}
		if (type == "setViewRange") {
			return setViewRange;
		}
	
		if (type == "xExtents") {
			return xExtents;
		}
	
		if (warnedConfs.indexOf(type) < 0) {
			//Avoid putting pop up each time we receive a conf of an unknown type (only the first time).
			warnedConfs.insertAt(type, 0);
			console.error(warnedConfs);
			alert("type unknown : " + type); //pop up when receiving an unknown type
			return undefined;
		}
	};
	
	//FROM utils/utils.js
	function mousePosition(e) {
		var container = e.currentTarget,
		    rect = container.getBoundingClientRect(),
		    x = e.clientX - rect.left - container.clientLeft,
		    y = e.clientY - rect.top - container.clientTop,
		    xy = [Math.round(x), Math.round(y)];
		return xy;
	};
	
	var axisConfFromPlotId = function axisConfFromPlotId(config, plotId) {
		var axisIdX = config[plotId].plotConfiguration.axisIdX;
		var axisIdY = config[plotId].plotConfiguration.axisIdY;
	
		var xAxisConf = config.axisConfiguration[axisIdX];
		var yAxisConf = config.axisConfiguration[axisIdY];
		return { xAxisConf: xAxisConf, yAxisConf: yAxisConf };
	};
	
	var onMessage = function onMessage(state, data) {
		var typeId = parseType(data.type);
		if (data.plotId != undefined) {
			data.id = data.plotId;
		}
	
		if (typeId == undefined) {
			console.error("unknown message", data);
		}
		if (data.id != "" && !(data.id in state.config)) {
			state.config[data.id] = {};
			state.config[data.id].plotConfiguration = {};
		}
	
		switch (typeId) {
			case plotChartConfiguration:
				console.log("plotChartConfiguration received", data);
				state.config.plotChartConfiguration = data;
				document.body.style.background = state.config.plotChartConfiguration.backgroundColor;
				break;
			case plotConfiguration:
				console.log("plotConfiguration received for ", data);
				state.config[data.id].plotConfiguration = data;
				log(data);
				break;
			case axisConfiguration:
				console.log("axisConfiguration received for ", data);
				console.log(data);
				state.config.axisConfiguration[data.id] = data;
				break;
			//deprecated
			case removePointsFromTo:
				if (state.data.length > data.indexTo) {
					state.data.splice(data.indexFrom, data.indexTo - data.indexFrom);
				}
				break;
	
			case gridConfiguration:
				console.log("gridConfiguration received for ", data);
				state.config.gridConfiguration = data;
				break;
			case removePoints:
				//done in onmessage
				break;
			case addPoints:
				//done in onmessage
				break;
			case vLineMarker:
				//done in onmessage
				break;
			case exportSvg:
				//TODO Test this...
				var s = new XMLSerializer();
				var d = document.getElementsByTagName("svg")[0];
				var str = s.serializeToString(d);
				var exportMsg = { type: "exportSvg", svg: str };
				client.sendMessage(exportMsg);
			case removeConfiguration:
				//done in onmessage
				delete state.config[data.confID];
		}
	
		return state;
	};
	
	var getColorConf = function getColorConf(config, plotId) {
		return config[plotId] && config[plotId].plotConfiguration && config[plotId].plotConfiguration.color ? config[plotId].plotConfiguration.color : "purple";
	};
	
	//get points to have a vertical line (vertical marker)
	var getMarkersPoints = function getMarkersPoints(marker) {
		var point = { markerId: marker.id };
		point[XVALUE_KEY] = new Date(+marker.coord);
		point[VMARKER_PREFIX + marker.id] = 0;
		var point2 = { markerId: marker.id };
		point2[XVALUE_KEY] = new Date(+marker.coord);
	
		point2[VMARKER_PREFIX + marker.id] = 1;
		var points = [point, point2];
		return points;
	};
	
	var shouldDeletePoint = function shouldDeletePoint(element, elementToDelete) {
		Object.keys(elementToDelete).map(function (key) {
			if (key.indexOf(YVALUE_SUFFIX) > -1 || key.indexOf(VMARKER_PREFIX) > -1) delete element[key];
		});
		var res = !Object.keys(element).reduce(function (isNotDeletable, key) {
			return isNotDeletable || key.indexOf(VMARKER_PREFIX) > -1 || key.indexOf(YVALUE_SUFFIX) > -1;
		}, false);
		return res;
	};
	
	var PlotChart = React.createClass({
		displayName: "PlotChart",
	
		mixins: [ChartWidthMixin],
		propTypes: {
			data: React.PropTypes.array.isRequired,
			type: React.PropTypes.oneOf(["svg", "hybrid"]).isRequired
		},
	
		getDefaultProps: function getDefaultProps() {
			return {
				type: "svg"
			};
		},
		getInitialState: function getInitialState() {
	
			var defaultConfig = { plotIds: [], plotChartConfiguration: {}, axisConfiguration: {}, gridConfiguration: {} };
	
			this.chartPlots = {};
			return {
				data: this.props.data,
				config: defaultConfig,
				isZoomed: false,
				dataCache: [],
				yAxisInfoMap: {},
				unzoomedPoints: [],
				yAxisTicks: {}
			};
		},
	
		//parse json data, setting the state with callback.
		parseJson: function parseJson(data, callback) {
			var _this = this;
	
			var self = this;
			var newState = onMessage(this.state, data);
			var typeId = parseType(data.type);
			var addedPoints = [];
			var removedPoints = [];
			//		console.log("parseJson ", data);
	
			var callbacks = function callbacks() {
				return 0;
			};
	
			if (data.plotId != undefined) {
				data.id = data.plotId;
			}
	
			if (typeId == addPoints || typeId == removePoints) {
				data.points = data.points.map(function (p) {
					var point = {};
					point[XVALUE_KEY] = new Date(+p[0]);
					point[data.id + YVALUE_SUFFIX] = +p[1];
					return point;
				});
				//			console.log("parseJson ", data.points );
				typeId == addPoints ? addedPoints = data.points : removedPoints = data.points;
			}
	
			var dataPoints = [];
			if (typeId == vLineMarker) {
				(function () {
	
					if (typeof _this.state.config.vLineMarkers == 'undefined') {
						_this.state.config.vLineMarkers = {};
					}
	
					if (typeof _this.state.config.vLineMarkers[data.id] != 'undefined') {
						removedPoints = getMarkersPoints(_this.state.config.vLineMarkers[data.id]);
					}
	
					newState.config.vLineMarkers[data.id] = data;
	
					addedPoints = getMarkersPoints(data);
	
					log(addedPoints);
	
					//comparison for deletion : dichotomy search on time, markerId equality check.
					var comparison = function comparison(e1, e2) {
						return +e1[XVALUE_KEY] < +e2[XVALUE_KEY] ? -1 : +e1[XVALUE_KEY] > +e2[XVALUE_KEY] ? 1 : e1.markerId == data.id ? 0 : -1;
					};
	
					//Comparison for insertion : force new elements inside array, instead of replacing existing ones.
					var comparisonMarker = function comparisonMarker(e1, e2) {
						var comp = comparison(e1, e2);return comp ? comp : 1;
					};
	
					dataPoints = [].concat(_toConsumableArray(_this.state.unzoomedPoints)).removeAll(removedPoints, comparison, shouldDeletePoint).insertAll(addedPoints, comparisonMarker);
				})();
			}
	
			//on removeConfiguration, set up the list of points that should be removed (removedPoints)
			if (typeId == removeConfiguration) {
				(function () {
					console.log("removeConfiguration");
	
					//the key for "id" for removeConfiguration
					var idKey = "confId";
	
					removedPoints = [].concat(_toConsumableArray(_this.state.unzoomedPoints)).reduce(function (res, point, index) {
						if (Object.keys(point).indexOf(data[idKey] + "valueY") > -1) {
							var plotIdPoint = {};
							plotIdPoint.valueX = point.valueX;
							plotIdPoint[data[idKey] + "valueY"] = point[data[idKey] + "valueY"];
							res.push(plotIdPoint);
						}
						return res;
					}, []);
	
					var indexOfPlotId = newState.config["plotIds"].indexOf(data[idKey]);
	
					if (indexOfPlotId > -1) {
						newState.config["plotIds"].splice(indexOfPlotId, 1);
						console.log("Deleteing " + data[idKey]);
					}
				})();
			}
	
			if (typeId == plotConfiguration) {
				if (this.state.unzoomedPoints.length > 0 && newState.config["plotIds"].indexOf(data.id) == -1) {
					newState.config["plotIds"].push(data.id);
				}
			}
			//remove / add the points that were removed / added
			if (typeId == addPoints || typeId == removePoints || typeId == removeConfiguration) {
				if (addedPoints.length) {
					//let containsMarker = pt => Object.keys(pt).reduce((res, key) => res || key.indexOf("vLineMarker" > -1), false);
	
					var comparison = function comparison(e1, e2) {
						return +e1[XVALUE_KEY] < +e2[XVALUE_KEY] ? -1 : +e1[XVALUE_KEY] > +e2[XVALUE_KEY] ? 1 : 0;
					};
	
					if (newState.config["plotIds"].indexOf(data.id) == -1) {
						newState.config["plotIds"].push(data.id);
					}
	
					dataPoints = [].concat(_toConsumableArray(this.state.unzoomedPoints)).insertAll(addedPoints, comparison);
				}
				if (removedPoints.length) {
					//Equality between 2 dates : == doesn't work, compare references.
					var comparison = function comparison(e1, e2) {
						return +e1[XVALUE_KEY] < +e2[XVALUE_KEY] ? -1 : +e1[XVALUE_KEY] > +e2[XVALUE_KEY] ? 1 : 0;
					};
					dataPoints = [].concat(_toConsumableArray(this.state.unzoomedPoints)).removeAll(removedPoints, comparison, shouldDeletePoint);
				}
			}
			//		
			if (typeId == xExtents) {
				newState.config.xExtents = [new Date(+data.begin), new Date(+data.end)];
			}
			//		var viewRangeCallback = () => {}
			//		if (typeId == setViewRange){
			//			//TODO chain callbacks.
			//			viewRangeCallback = () => {setViewRange(data.left, data.right)}
			//		}
	
			//TODO update only Y axis affected by Data, instead of every Y axis.
			//		let updateAllTicks = () => {if (callback) callback(); Object.keys(this.chartPlots).map((chartId) => this.updateYTicks(chartId))};
	
			//		let updateAllTicks = () => {Object.keys(this.chartPlots).map((chartId) => this.updateYTicks(chartId))};
			//		callbacks = () => { updateAllTicks()};
	
			if (dataPoints.length > 0) {
				//			if (! this.state.isZoomed){
				this.setState({
					config: newState.config,
					data: dataPoints,
					unzoomedPoints: dataPoints
				});
			}
			//			else {
			//				this.setState({
			//					config : newState.config,
			//					unzoomedPoints : dataPoints
			//				}, callbacks);
			//			}
			//		}
			//Just the config was modified, keep the same data.
			else {
					this.setState({
						config: newState.config
					});
				}
		},
		//Used to test points injection without reception from socket.
		loadJsonFile: function loadJsonFile() {
			var _this2 = this;
	
			var xmlhttp = new XMLHttpRequest();
			var url = "msg.json";
	
			xmlhttp.onreadystatechange = function () {
				if (xmlhttp.readyState == 4) {
					var data = JSON.parse(xmlhttp.responseText);
					_this2.parseJson(data);
				}
			};
			xmlhttp.open("GET", url, true);
			xmlhttp.send();
		},
		//STUB Used to test points injection without reception from socket. simply call this function once the component is mounted.
		testPointLoad: function testPointLoad() {
			var _this3 = this;
	
			var DIRTY_TIME = 54854864646;
	
			var func = function func() {
				DIRTY_TIME += 1;
				var DIRTY_VALUE = DIRTY_TIME % 100;
				var ep3point = "{ \"plotId\": \"ep3\",\"type\": \"addPoints\",\"points\": [[" + DIRTY_TIME + "," + DIRTY_VALUE + "]]}";
				var ep1point = "{ \"plotId\": \"ep1\",\"type\": \"addPoints\", \"points\": [[" + DIRTY_TIME + "," + DIRTY_VALUE + 100 + "]]}";
				var data = JSON.parse(ep3point);
				_this3.parseJson(data);
				data = JSON.parse(ep1point);
				_this3.parseJson(data);
			};
	
			//do func() every ms
			setInterval(func, 1);
		},
	
		//this is called when component is mounted. setState can now be called,
		//so we can handle messages that are received via socket.
		componentDidMount: function componentDidMount() {
			var self = this;
	
			//handle socket message when component is mounted.
			client.messageReceived = function (e) {
				var data = e//JSON.parse(e);
				self.parseJson(data);
			};
	
			//ONCE MOUNTED, LOAD JSON TO SIMULATE ADDING POINTS
			//		this.loadJsonFile();
	
			//Comment this to avoid automatic injection
			//		this.testPointLoad();
		},
	
		makeHandleBrush: function makeHandleBrush(chartId) {
			var self = this;
			return function (coords, items) {
				var left = Math.min(coords.x1, coords.x2);
				var right = Math.max(coords.x1, coords.x2);
				var top = Math.min(coords.y1, coords.y2);
				var bottom = Math.max(coords.y1, coords.y2);
				var yScale = self.refs[chartId].yScale().nice();
				yScale.domain([top, bottom]);
				var yAxisInfoMap = self.state.yAxisInfoMap;
				yAxisInfoMap[chartId] = { yScale: yScale, yDomainUpdate: false };
	
				//			let dataInfo = this.refs.chartCanvas.getDataInfo();
				//			let start = dataInfo.viewData.start;
				//			let end = dataInfo.viewData.end;
				//			let	startXValue = dataInfo.xAccessor(start);
				//			let	endXValue = dataInfo.xAccessor(end);
				//			let width = this.state.width;
				//			let height = this.state.height;
				//			let pixelXWidth = (endXValue - startXValue) / width;
				//			
				//			var left = Math.min(xRange[0], xRange[1]);
				//			var right = Math.max(xRange[0], xRange[1]);
				//			log(xRange, items);
				//			
				//			this.state.config.plotIds.map( function(plotId){
				//				let {xAxisConf, yAxisConf} = axisConfFromPlotId(this.state.config, plotId);
				//			}
				//			//TODO CONTINUE
				//			
				//			);
				//			var zoomInfos = {type : "samplingRequest", width : width, height: height, valueX : left, valueY : bottom, axisIdX :  }
				//			client.sendMessage(zoomInfos);
	
				self.onZoomTampered();
				//TODO OPTIM : avoid array cloning when not necessary
				self.setState({
					//			unzoomedPoints : cloneArray(self.state.unzoomedPoints),
					//			yAxisInfoMap,
					xExtents: [left, right]
				});
			};
		},
	
		setViewRange: function setViewRange(left, right) {
			this.refs.chartCanvas.setViewRange(left, right);
		},
	
		//get the chart including the marker
		//			<DataSeries id={i}  yAccessor={(d) => d[VMARKER_PREFIX+marker.id]}  stroke={config.vLineMarkers[marker.id].color}   >
		//<ScatterSeries shape="continuous" lineWidth={2}/>
		//</DataSeries>
		getMarker: function getMarker(marker, i) {
			var config = this.state.config;
			return React.createElement(
				Chart,
				{ id: i, yExtents: function (d) {
						return [d[VMARKER_PREFIX + marker.id], d[VMARKER_PREFIX + marker.id]];
					} },
				React.createElement(ScatterLineSeries, { stroke: config.vLineMarkers[marker.id].color, shape: "continuous", lineWidth: 2, yAccessor: function (d) {
						return d[VMARKER_PREFIX + marker.id];
					} })
			);
		},
	
		//Get ReStock-friendly configuration from received configuration for a given curve (plotId).
		getChartConf: function getChartConf(plotId) {
			var config = this.state.config;
	
			var xAxisId = config[plotId].plotConfiguration.xAxisId;
			var yAxisId = config[plotId].plotConfiguration.yAxisId;
	
			var xAxisConfKey = config.axisConfiguration[xAxisId];
			var yAxisConfKey = config.axisConfiguration[yAxisId];
	
			var getAxisConf = function getAxisConf(axisConf) {
				var res = {};
	
				if (axisConf) {
					res.minValue = axisConf.minValue;
					res.maxValue = axisConf.maxValue;
					res.isAuto = axisConf.isAuto;
					res.isLocked = axisConf.isLocked;
					res.axisName = axisConf.name;
					res.state = axisConf.state; //show / hide
					res.type = axisConf.type; // logarithmic or default
					res.isHidden = axisConf.isHidden;
					res.width = axisConf.width;
					res.unit = axisConf.unit;
					res.grid = axisConf.grid;
					res.isAutoTick = axisConf.isAutoTick;
					res.varIndicator = !axisConf.isAuto && axisConf.minValue && axisConf.maxValue ? { indicator: MinMaxIndicator, minValue: axisConf.minValue, maxValue: axisConf.maxValue } : {};
					res.minorTick = axisConf.minorTick;
				}
				return _extends({}, res);
			};
	
			var yAxisConf = getAxisConf(yAxisConfKey);
			var xAxisConf = getAxisConf(xAxisConfKey);
	
			var isSelected = config[plotId].plotConfiguration.isSelected;
			var lineWidth = isSelected ? 2 : 1;
			var lineStyle = config[plotId].plotConfiguration.lineStyle;
			var pointsStyle = config[plotId].plotConfiguration.pointsStyle;
			var isHidden = config[plotId].plotConfiguration.isHidden;
			//		minValue : minValue, maxValue : maxValue, varIndicator : varIndicator, minorTick : minorTick, tickNumber : tickNumber,axisName : axisName,
			var res = { xAxisConf: xAxisConf, yAxisConf: yAxisConf, isSelected: isSelected,
				gridX: yAxisConf.gridX, gridY: yAxisConf.gridY, lineWith: lineWidth, lineStyle: lineStyle, pointsStyle: pointsStyle, isHidden: isHidden };
			return res;
		},
	
		updateYTicks: function updateYTicks(chartId) {
			console.log("updateYTicks");
			var self = this;
			//		console.log(self.refs[chartId]);
	
			//TODO UGLY get first curve of chartId
			var plotId = this.chartPlots[chartId][0];
	
			//get X,Y of this curve
			var Y = self.getChartConf(plotId).yAxisConf;
	
			//ERROR CASE : no Y axis or gap between 2 ticks is null
			if (!Y || Y.minorTick == undefined || Y.minorTick == 0) {
				console.error("minorTick too low or undefined");
				return;
			}
			var yTickValues = {};
			if (self.refs[chartId] != undefined && self.refs[chartId].yScale() != undefined && self.refs[chartId].yScale().nice().domain() != undefined) {
				(function () {
					var yScale = self.refs[chartId].yScale().nice();
					var top = yScale.domain()[1];
					var bottom = yScale.domain()[0];
	
					//this is the first tick
					var bottomValue = Math.ceil(bottom / Y.minorTick) * Y.minorTick;
					var lastValue = Math.floor(top / Y.minorTick) * Y.minorTick;
					var rec = function rec(_x, _x2, _x3, _x4) {
						var _again = true;
	
						_function: while (_again) {
							var current = _x,
							    last = _x2,
							    gap = _x3,
							    acc = _x4;
							_again = false;
	
							if (current + gap > last || gap == 0) return acc;
							current = current + gap;
							acc = acc.concat(current);
							_x = current;
							_x2 = last;
							_x3 = gap;
							_x4 = acc;
							_again = true;
							continue _function;
						}
					};
	
					var arrayValues = rec(bottomValue, lastValue, Y.minorTick, []);
					yTickValues = { tickValues: arrayValues };
				})();
			}
	
			self.state.yAxisTicks[chartId] = yTickValues;
			self.setState({ yAxisTicks: self.state.yAxisTicks });
		},
		//Chart for multiple curves for one couple of axis
		getMultiPlots: function getMultiPlots(plotIds, i) {
			var config = this.state.config;
			var self = this;
	
			//All plotIds have the same couple X / Y. Get the Axis Conf corresponding to the first plotId.
			var Y = self.getChartConf(plotIds[0]).yAxisConf;
			var X = self.getChartConf(plotIds[0]).xAxisConf;
	
			var gridHeight = config.plotChartConfiguration.gridHeight;
			var gridWidth = config.plotChartConfiguration.gridWidth;
	
			var showGridX = false;
			var showGridY = false;
	
			var xAxisId = config[plotIds[0]].plotConfiguration.xAxisId;
			var yAxisId = config[plotIds[0]].plotConfiguration.yAxisId;
	
			if (config.gridConfiguration) {
				showGridX = !config.gridConfiguration.isHidden && config.gridConfiguration.xAxisId == xAxisId;
				showGridY = !config.gridConfiguration.isHidden && config.gridConfiguration.yAxisId == yAxisId;
			}
	
			//TODO : config.gridConfiguration.width
	
			var gridX = showGridX ? { innerTickSize: -1 * gridHeight, tickStrokeOpacity: 0.2 } : {};
			var gridY = showGridY ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.2 } : {};
	
			//TODO UGLY
			if (this.chartPlots == undefined) {
				this.chartPlots = {};
			}
			this.chartPlots[i] = plotIds;
	
			var series = plotIds.map(function (plotId, j) {
				var chartConf = self.getChartConf(plotId);
				var isSelected = chartConf.isSelected;
				var axisName = chartConf.axisName;
				var lineWidth = chartConf.lineWidth;
				var pointsStyle = chartConf.pointsStyle;
				var lineStyle = chartConf.lineStyle;
				var isHidden = chartConf.isHidden;
	
				var scatterSeries = isHidden ? [] : React.createElement(ScatterLineSeries, { pointsStyle: pointsStyle, lineStyle: lineStyle, lineWidth: lineWidth /*localColorAccessor={(x) => x%2==0?"red":undefined*/ });
				//			let scatterSeries = isHidden? [] : <LineSeries yAccessor={(d) => d[plotId+YVALUE_SUFFIX]} /*localColorAccessor={(x) => x%2==0?"red":undefined*//>;
				return React.createElement(ScatterLineSeries, _extends({ stroke: getColorConf(config, plotId) }, Y.varIndicator, { yAccessor: function (d) {
						return d[plotId + YVALUE_SUFFIX];
					}, pointsStyle: pointsStyle, lineStyle: lineStyle, lineWidth: lineWidth /*localColorAccessor={(x) => x%2==0?"red":undefined*/ }));
				//localColorAccessor={(x) => x%2==0?"red":undefined*//>
			});
	
			var xAxisNameConf = { axisName: X.axisName, axisNameOffset: i % 2 * 10 + 10, axisNameMaxSize: SPACE_BETWEEN_AXES * 2 - 10 };
			var yAxisNameConf = { axisName: Y.axisName, axisNameOffset: i % 2 * 10 + 10, axisNameMaxSize: SPACE_BETWEEN_AXES * 2 - 10 };
	
			var yTickValues = {};
			//Tick automatic : don't override yTickValues.
			if (Y.isAutoTick || self.state.yAxisTicks[i] == undefined) {} else {
				yTickValues = self.state.yAxisTicks[i];
			}
	
			//only one X axis (first plot)
			var xAxis = !X.isHidden && i == 0 ? React.createElement(XAxis, _extends({ axisAt: "bottom", orient: "bottom" }, gridX, xAxisNameConf)) : [];
			var yAxis = !Y.isHidden ? React.createElement(YAxis, _extends({ axisAt: -(i * SPACE_BETWEEN_AXES), orient: "left", showDomain: true }, yTickValues, gridY, yAxisNameConf)) : [];
	
			var brush = React.createElement(Brush, { ref: "brush" + i, id: i, enabled: true, onBrush: !Y.isLocked ? this.makeHandleBrush(i) : undefined });
	
			var scaleAndDomain = this.state.yAxisInfoMap[i];
			//		let theScale = d3.scale.linear();
			//		if (scaleAndDomain == undefined || scaleAndDomain.yScale == undefined){
			//			theScale = d3.scale.log();
			//		} else {
			//			theScale = scaleAndDomain.yScale.log();
			//		}
			//			
			//		scaleAndDomain = {yScale : 	theScale, yDomainUpdate : true};
	
			return React.createElement(
				Chart,
				{ id: i, yExtents: function (d) {
						return [d[plotIds[0] + YVALUE_SUFFIX], d[plotIds[0] + YVALUE_SUFFIX]];
					}, ref: i, yMousePointerDisplayLocation: "left", yMousePointerDisplayFormat: function (y) {
						return y.toFixed(2);
					}, xAccessor: function (d) {
						return d ? d[XVALUE_KEY] : undefined;
					} },
				xAxis,
				yAxis,
				series,
				brush
			);
		},
	
		onZoomTampered: function onZoomTampered() {
			//		let dataInfo = this.refs.chartCanvas.getDataInfo();
			//		let start = dataInfo.viewData.start;
			//		let end = dataInfo.viewData.end;
			//		let	startXValue = dataInfo.xAccessor(start);
			//		let	endXValue = dataInfo.xAccessor(end);
			//		let width = this.state.width;
			//		let height = this.state.height;
			//		let pixelXWidth = (endXValue - startXValue) / width;
			//		
			//		var left = Math.min(xRange[0], xRange[1]);
			//		var right = Math.max(xRange[0], xRange[1]);
			//		log(xRange, items);
			//		
			//		this.state.config.plotIds.map( function(plotId){
			//			let {xAxisConf, yAxisConf} = axisConfFromPlotId(this.state.config, plotId);
			//		}
			//		//TODO CONTINUE
			//		
			//		);
			//		var zoomInfos = {type : "samplingRequest", width : width, height: height, valueX : left, valueY : right}
			//		client.sendMessage(zoomInfos);
	
			this.setState({ isZoomed: true });
		},
		//callback done by EventCapture
		onZoom: function onZoom(e) {
			//		let self = this;
			////		console.log("onZoom",this.refs.chartCanvas.getDataInfo() );
			////		this.onZoomTampered();
			//
			//		var zoomDir = e.deltaY > 0 ? this.props.zoomMultiplier : -this.props.zoomMultiplier;
			//		var newPos = mousePosition(e);
			//		
			//		let sPrct = 10;
			//		
			//		
			//		let yAxisInfoMap = this.state.yAxisInfoMap;
			////		console.log(yAxisInfoMap);
			//		
			//		var yScale = self.refs[0].yScale().nice();
			//		
			//		yScale = yScale.nice();
			//		let top = yScale.domain()[0]*sPrct / 100;
			//		let bottom = yScale.domain()[1]*sPrct /100;
			//		yScale.domain([top, bottom]);
			////		console.log(yScale.domain());
			//		
			//		yAxisInfoMap[0] = {yScale : yScale, yDomainUpdate : false};
			//		
			//		
			//		var { mainChart, chartData } = this.state;
			//
			//		let chartCanvas = this.refs.chartCanvas;
			//		console.log("chartucanvasu",this.refs.chartCanvas);
			//		
			//		var chart = chartData.filter((eachChart) => eachChart.id === mainChart)[0],
			//			item = chartCanvas.getClosest(plotData, mouseXY, chart),
			//			xScale = chart.plot.scales.xScale;
			//		
			//		console.log(xScale);
			//		console.log(xScale.nice().domain());
			//		
			//		
			//		
			//		let dataInfo = this.refs.chartCanvas.getDataInfo();
			//		let start = dataInfo.viewData.start;
			//		let end = dataInfo.viewData.end;
			//		let	startXValue = dataInfo.xAccessor(start);
			//		let	endXValue = dataInfo.xAccessor(end);
			////		console.log(start, end);
			//		let startMs = startXValue.getTime();
			//		let endMs = endXValue.getTime();
			//		diffMs = endMs - startMs;
			//		var left = new Date(startMs + diffMs* 0.1);
			//		var right = new Date(endXValue.getTime() - diffMs* 0.1);
			//		
			//
			//		
			//		self.setState({
			//			yAxisInfoMap
			//			}, () => self.refs.chartCanvas.setViewRange(left, right));
		},
		//TODO call it when the user stops scrolling
		onZoomEnd: function onZoomEnd(e) {
			//		this.onZoomTampered();
	
		},
		//callback done by EventCapture
		onPan: function onPan(e) {
			this.onZoomTampered();
		},
		//callback done by EventCapture
		onPanEnd: function onPanEnd(e) {
			//		this.onZoomTampered();
		},
	
		render: function render() {
			var _this4 = this;
	
			var self = this;
	
			if (this.state === null || !this.state.width || !this.state.config || this.state.config.plotIds.length == 0) return React.createElement("div", null);
			var _props = this.props;
			var data = _props.data;
			var type = _props.type;
			var width = _props.width;
	
			var config = this.state.config;
			var plotIds = config.plotIds;
	
			//Get plotIds arranged by unit.
			var plotIdByAxis = config["plotIds"].reduce(function (res, plotId, index) {
				var yAxisId = self.state.config[plotId].plotConfiguration.yAxisId;
				if (yAxisId == undefined) {
					yAxisId = "NotDefined";
				}
				if (res[yAxisId] == undefined) {
					res[yAxisId] = [];
				}
				res[yAxisId].push(plotId);
	
				return res;
			}, {});
	
			//One Y axis  per different unit.
			var chartByAxis = Object.keys(plotIdByAxis).map(function (yAxisId, i) {
				return self.getMultiPlots(plotIdByAxis[yAxisId], i);
			});
	
			//Choose setting : one Y axis per curve or one Y axis per unit
			var charts = chartByAxis;
			//		var charts = multiChart;
	
			//GRID / MARGIN
			var margin = { left: chartByAxis.length * SPACE_BETWEEN_AXES, right: 30, top: 30, bottom: 40 };
			var gridHeight = window.innerHeight - margin.top - margin.bottom;
			var gridWidth = this.state.width - margin.left - margin.right;
			var showGrid = config.plotChartConfiguration.gridMode;
	
			//		
			//		config.plotChartConfiguration.xGrid = showGrid ? { innerTickSize: -1 * gridHeight, tickStrokeOpacity: 0.2 } : {};
			//		config.plotChartConfiguration.yGrid = showGrid ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.2 } : {};
	
			config.plotChartConfiguration.gridHeight = gridHeight;
			config.plotChartConfiguration.gridWidth = gridWidth;
	
			//		var CC = plotIds.map((plotId, i) =>
			//			<CurrentCoordinate forChart={i} forDataSeries={i} />
			//		);
	
			//		var CC = multiChartFuns.length >=2 ?<CurrentCoordinate forChart={1} forDataSeries={0} /> : <div/>
	
			var plotTitle = this.state.config.plotChartConfiguration.title;
			//		indicator={EMA} : conflict: add attributes to data points, difficulty to remove them (and it doesn't work here).
			var chartCanvas = React.createElement(
				ChartCanvas,
				{ xScale: xScale, seriesName: "JPP", xAccessor: function (d) {
						return d ? d[XVALUE_KEY] : undefined;
					}, discontinuous: true, ref: "chartCanvas", width: this.state.width, height: window.innerHeight, margin: margin,
					data: this.state.data, type: type, xExtents: config.xExtents },
				React.createElement(
					"text",
					{ x: this.state.width / 2, y: "-10", fill: "black" },
					plotTitle
				),
				charts,
				typeof config.vLineMarkers != 'undefined' ? Object.keys(config.vLineMarkers).map(function (key, i) {
					return _this4.getMarker(config.vLineMarkers[key], i + charts.length + 1);
				}) : [],
				React.createElement(MouseCoordinates, { xDisplayFormat: d3.time.format("%c") }),
				React.createElement(EventCapture, { mouseMove: true, pan: true, mainChart: 0, defaultFocus: true, zoom: true })
			);
	
			return React.createElement(
				"div",
				null,
				chartCanvas,
				React.createElement(_ZoomReset2["default"], { activated: self.state.isZoomed, handleEvent: function (e) {
						//					let updateAllTicks = () => {};
						//					if (self.chartPlots){
						//						updateAllTicks = () => {Object.keys(self.chartPlots).map((chartId) => self.updateYTicks(chartId))};
						//					}
						self.setState({
							isZoomed: false,
							yAxisInfoMap: {}
						});
					} })
			);
		}
	
	});
	
	ReactDOM.render(React.createElement(PlotChart, { data: rawData, type: "hybrid" }), document.getElementById("chart"));

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _objectAssign = __webpack_require__(7);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _makeInteractive = __webpack_require__(8);
	
	var _makeInteractive2 = _interopRequireDefault(_makeInteractive);
	
	function hexToRGBA(inputHex, opacity) {
		var hex = inputHex.replace("#", "");
		if (inputHex.indexOf("#") > -1 && (hex.length === 3 || hex.length === 6)) {
	
			var multiplier = hex.length === 3 ? 1 : 2;
	
			var r = parseInt(hex.substring(0, 1 * multiplier), 16);
			var g = parseInt(hex.substring(1 * multiplier, 2 * multiplier), 16);
			var b = parseInt(hex.substring(2 * multiplier, 3 * multiplier), 16);
	
			var result = "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";
	
			return result;
		}
		return inputHex;
	};
	
	var ZoomIndicator = (function (_React$Component) {
		_inherits(ZoomIndicator, _React$Component);
	
		function ZoomIndicator(props) {
			_classCallCheck(this, ZoomIndicator);
	
			_get(Object.getPrototypeOf(ZoomIndicator.prototype), "constructor", this).call(this, props);
			this.onMousemove = this.onMousemove.bind(this);
			this.onClick = this.onClick.bind(this);
		}
	
		_createClass(ZoomIndicator, [{
			key: "onMousemove",
			value: function onMousemove(chartId, xAccessor, interactive, _ref, e) {
				var mouseXY = _ref.mouseXY;
				var currentItem = _ref.currentItem;
				var currentChartstriggerCallback = _ref.currentChartstriggerCallback;
				var chartData = _ref.chartData;
				var enabled = this.props.enabled;
				var startX = interactive.startX;
	
				if (enabled && startX) {
					var xValue = xAccessor(currentItem);
					return (0, _objectAssign2["default"])({}, interactive, {
						tempEndX: xValue,
						mouseY: mouseXY[1]
					});
				}
				return interactive;
			}
		}, {
			key: "onClick",
			value: function onClick(chartId, xAccessor, interactive, _ref2, e) {
				var mouseXY = _ref2.mouseXY;
				var currentItem = _ref2.currentItem;
				var currentChartstriggerCallback = _ref2.currentChartstriggerCallback;
				var chartData = _ref2.chartData;
				var _props = this.props;
				var enabled = _props.enabled;
				var onBrush = _props.onBrush;
				var yScale = _props.yScale;
	
				console.log(chartData);
				if (enabled) {
					var startX = interactive.startX;
	
					var xValue = xAccessor(currentItem);
	
					if (startX) {
						var brushCoords = (0, _objectAssign2["default"])({}, interactive, {
							startX: null,
							tempEndX: null,
							startItem: null
						});
						setTimeout(function () {
							onBrush([interactive.startX, xValue], [interactive.startItem, currentItem]);
						}, 20);
	
						return brushCoords;
					} else if (e.button === 0) {
						return (0, _objectAssign2["default"])({}, interactive, {
							startX: xValue,
							startItem: currentItem,
							tempEndX: null,
							startY: mouseXY[1]
							// brush: null,
						});
					}
				}
				return interactive;
			}
		}, {
			key: "render",
			value: function render() {
				var _props2 = this.props;
				var chartCanvasType = _props2.chartCanvasType;
				var chartData = _props2.chartData;
				var plotData = _props2.plotData;
				var xAccessor = _props2.xAccessor;
				var interactive = _props2.interactive;
				var enabled = _props2.enabled;
				var _props3 = this.props;
				var fill = _props3.fill;
				var stroke = _props3.stroke;
				var opacity = _props3.opacity;
	
				if (chartCanvasType !== "svg") return null;
	
				var startX = interactive.startX;
				var tempEndX = interactive.tempEndX;
	
				if (enabled && startX && tempEndX) {
					var brush = [startX, tempEndX];
					var brush = ZoomIndicator.helper(plotData, xAccessor, chartData, brush);
					return React.createElement("rect", _extends({}, brush, { fill: fill, stroke: stroke, fillOpacity: opacity }));
				}
				return null;
			}
		}]);
	
		return ZoomIndicator;
	})(React.Component);
	
	ZoomIndicator.drawOnCanvas = function (context, props, interactive, ctx, _ref3) {
		var plotData = _ref3.plotData;
		var chartData = _ref3.chartData;
		var startX = interactive.startX;
		var tempEndX = interactive.tempEndX;
		var mouseY = interactive.mouseY;
		var startY = interactive.startY;
		var enabled = props.enabled;
		var stroke = props.stroke;
		var opacity = props.opacity;
		var fill = props.fill;
	
		if (enabled && startX && tempEndX) {
			var brush = [startX, tempEndX];
	
			var xAccessor = context.xAccessor;
	
			var rect = ZoomIndicator.helper(plotData, xAccessor, chartData, brush);
	
			// console.log("DRAWING", enabled, rect);
			ctx.strokeStyle = stroke;
			ctx.fillStyle = hexToRGBA(fill, opacity);
			ctx.beginPath();
			ctx.rect(rect.x, startY, rect.width, mouseY - startY);
			ctx.stroke();
		}
	};
	
	ZoomIndicator.helper = function (plotData, xAccessor, chartData, brush) {
		var xScale = chartData.plot.scales.xScale;
	
		var left = Math.min(brush[0], brush[1]);
		var right = Math.max(brush[0], brush[1]);
	
		var x = xScale(left);
		var width = xScale(right) - xScale(left);
	
		// console.log(chartData);
		return {
			x: x,
			y: 0,
			width: width,
			height: chartData.config.height
		};
	};
	
	ZoomIndicator.propTypes = {
		enabled: React.PropTypes.bool.isRequired,
		onBrush: React.PropTypes.func.isRequired,
	
		chartCanvasType: React.PropTypes.string,
		chartData: React.PropTypes.object,
		plotData: React.PropTypes.array,
		xAccessor: React.PropTypes.func,
		interactive: React.PropTypes.object,
		stroke: React.PropTypes.string,
		fill: React.PropTypes.string,
		opacity: React.PropTypes.number
	};
	
	ZoomIndicator.defaultProps = {
		stroke: "#000000",
		opacity: 0.3,
		fill: "#3h3h3h",
		onBrush: function onBrush(e) {
			console.log(e);
		}
	};
	
	exports["default"] = (0, _makeInteractive2["default"])(ZoomIndicator, ["click", "mousemove"], {});
	module.exports = exports["default"];

/***/ },
/* 7 */
/***/ function(module, exports) {

	/* eslint-disable no-unused-vars */
	'use strict';
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	module.exports = Object.assign || function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;
	
		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);
	
			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}
	
			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}
	
		return to;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	exports["default"] = makeInteractive;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _objectAssign = __webpack_require__(7);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	function getDisplayName(Series) {
		var name = Series.displayName || Series.name || "Series";
		return name;
	}
	
	function capitalizeFirst(str) {
		return str.charAt(0).toUpperCase() + str.substring(1);
	}
	
	function makeInteractive(InteractiveComponent, subscription, initialState) {
		if (subscription === undefined) subscription = [];
		var reDrawOnPan = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];
	
		var InteractiveComponentWrapper = (function (_React$Component) {
			_inherits(InteractiveComponentWrapper, _React$Component);
	
			function InteractiveComponentWrapper(props, context) {
				var _this = this;
	
				_classCallCheck(this, InteractiveComponentWrapper);
	
				_get(Object.getPrototypeOf(InteractiveComponentWrapper.prototype), "constructor", this).call(this, props, context);
				this.subscription = this.subscription.bind(this);
				var subscribe = context.subscribe;
				var chartId = context.chartId;
	
				this.subscriptionIds = subscription.map(function (each) {
					return subscribe(chartId, each, _this.subscription.bind(_this, each));
				});
			}
	
			_createClass(InteractiveComponentWrapper, [{
				key: "getInteractiveState",
				value: function getInteractiveState(props, context) {
					var interactiveState = context.interactiveState;
	
					var state = interactiveState.filter(function (each) {
						return each.id === props.id;
					});
					var response = { interactive: initialState };
					if (state.length > 0) {
						response = state[0];
					}
					// console.log(interactiveState, response.interactive, this.props.id);
					return response;
				}
			}, {
				key: "subscription",
				value: function subscription(event, arg, e) {
					// console.log("HIJOHJ");
					var _context = this.context;
					var chartId = _context.chartId;
					var xAccessor = _context.xAccessor;
					var _props = this.props;
					var shouldRemoveLastIndicator = _props.shouldRemoveLastIndicator;
					var enabled = _props.enabled;
	
					var _getInteractiveState = this.getInteractiveState(this.props, this.context);
	
					var interactive = _getInteractiveState.interactive;
	
					var interactiveState = interactive;
					if (event === "click" && shouldRemoveLastIndicator(e)) {
						if (enabled && this.refs.interactive.removeIndicator) {
							interactiveState = this.refs.interactive.removeIndicator(chartId, xAccessor, interactive, arg, e);
						}
						return {
							id: this.props.id,
							interactive: interactiveState
						};
					} else {
						var handler = this.refs.interactive["on" + capitalizeFirst(event)];
						if (enabled) {
							interactiveState = handler(chartId, xAccessor, interactive, arg, e);
						}
	
						if (interactiveState === interactive) return false;
						return {
							id: this.props.id,
							interactive: interactiveState
						};
					}
				}
			}, {
				key: "componentDidMount",
				value: function componentDidMount() {
					this.componentDidUpdate();
				}
			}, {
				key: "componentDidUpdate",
				value: function componentDidUpdate() {
					// console.log("Update");
					var callback = InteractiveComponent.drawOnCanvas;
	
					if (callback) {
						var _context2 = this.context;
						var getCanvasContexts = _context2.getCanvasContexts;
						var chartCanvasType = _context2.chartCanvasType;
						var plotData = _context2.plotData;
						var chartData = _context2.chartData;
	
						if (chartCanvasType !== "svg") {
	
							var contexts = getCanvasContexts();
							var defaultProps = InteractiveComponent.defaultProps;
	
							var props = (0, _objectAssign2["default"])({}, defaultProps, this.props);
	
							var _getInteractiveState2 = this.getInteractiveState(this.props, this.context);
	
							var interactive = _getInteractiveState2.interactive;
	
							// console.log(interactive);
							if (contexts) {
								InteractiveComponentWrapper.drawOnCanvas(callback, this.context, props, interactive, contexts.interactive, { plotData: plotData, chartData: chartData });
							}
						}
					}
				}
			}, {
				key: "componentWillMount",
				value: function componentWillMount() {
					this.componentWillReceiveProps(this.props, this.context);
				}
			}, {
				key: "componentWillReceiveProps",
				value: function componentWillReceiveProps(nextProps, nextContext) {
					// var nextContext = this.context;
					// var nextProps = this.props;
	
					var chartId = nextContext.chartId;
					var getAllCanvasDrawCallback = nextContext.getAllCanvasDrawCallback;
					var callbackForCanvasDraw = nextContext.callbackForCanvasDraw;
	
					var callback = InteractiveComponent.drawOnCanvas;
	
					if (reDrawOnPan && callback) {
						var defaultProps = InteractiveComponent.defaultProps;
	
						var props = (0, _objectAssign2["default"])({}, defaultProps, nextProps);
	
						var draw = InteractiveComponentWrapper.drawOnCanvas.bind(null, callback, nextContext, props, this.getInteractiveState(nextProps, nextContext).interactive);
	
						var temp = getAllCanvasDrawCallback().filter(function (each) {
							return each.type === "interactive";
						}).filter(function (each) {
							return each.id === nextProps.id;
						}).filter(function (each) {
							return each.chartId === chartId;
						});
						if (temp.length === 0) {
							callbackForCanvasDraw({
								type: "interactive",
								chartId: chartId,
								id: nextProps.id,
								draw: draw
							});
						} else {
							callbackForCanvasDraw(temp[0], {
								type: "interactive",
								chartId: chartId,
								id: nextProps.id,
								draw: draw
							});
						}
					}
				}
			}, {
				key: "componentWillUnmount",
				value: function componentWillUnmount() {
					var unsubscribe = this.context.unsubscribe;
	
					this.subscriptionIds.forEach(function (each) {
						unsubscribe(each);
					});
				}
			}, {
				key: "render",
				value: function render() {
					var _getInteractiveState3 = this.getInteractiveState(this.props, this.context);
	
					var interactive = _getInteractiveState3.interactive;
	
					return _react2["default"].createElement(InteractiveComponent, _extends({ ref: "interactive" }, this.context, this.props, { interactive: interactive }));
				}
			}]);
	
			return InteractiveComponentWrapper;
		})(_react2["default"].Component);
	
		InteractiveComponentWrapper.displayName = getDisplayName(InteractiveComponent);
	
		InteractiveComponentWrapper.drawOnCanvas = function (callback, context, props, interactiveState, ctx, chartContext) {
			// console.log(context, props, interactiveState);
			var canvasOriginX = context.canvasOriginX;
			var canvasOriginY = context.canvasOriginY;
			var width = context.width;
			var height = context.height;
	
			ctx.save();
	
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.translate(canvasOriginX, canvasOriginY);
	
			ctx.beginPath();
			ctx.rect(-1, -1, width + 1, height + 1);
			ctx.clip();
	
			if (callback) {
				callback(context, props, interactiveState, ctx, chartContext);
			}
	
			ctx.restore();
		};
	
		InteractiveComponentWrapper.propTypes = {
			id: _react2["default"].PropTypes.number.isRequired,
			shouldRemoveLastIndicator: _react2["default"].PropTypes.func.isRequired,
			enabled: _react2["default"].PropTypes.bool.isRequired
		};
	
		InteractiveComponentWrapper.defaultProps = {
			shouldRemoveLastIndicator: function shouldRemoveLastIndicator(e) {
				return e.button === 2 && e.ctrlKey;
			}
		};
		InteractiveComponentWrapper.contextTypes = {
			chartId: _react2["default"].PropTypes.number.isRequired,
			interactiveState: _react2["default"].PropTypes.array.isRequired,
			getCanvasContexts: _react2["default"].PropTypes.func,
			callbackForCanvasDraw: _react2["default"].PropTypes.func.isRequired,
			getAllCanvasDrawCallback: _react2["default"].PropTypes.func,
			chartCanvasType: _react2["default"].PropTypes.string.isRequired,
			subscribe: _react2["default"].PropTypes.func.isRequired,
			unsubscribe: _react2["default"].PropTypes.func.isRequired,
			plotData: _react2["default"].PropTypes.array.isRequired,
			xAccessor: _react2["default"].PropTypes.func.isRequired,
			chartData: _react2["default"].PropTypes.object.isRequired,
			canvasOriginX: _react2["default"].PropTypes.number,
			canvasOriginY: _react2["default"].PropTypes.number,
			height: _react2["default"].PropTypes.number.isRequired,
			width: _react2["default"].PropTypes.number.isRequired
		};
	
		return InteractiveComponentWrapper;
	}
	
	exports["default"] = makeInteractive;
	module.exports = exports["default"];

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var ZoomReset = (function (_React$Component) {
		_inherits(ZoomReset, _React$Component);
	
		function ZoomReset(props) {
			_classCallCheck(this, ZoomReset);
	
			_get(Object.getPrototypeOf(ZoomReset.prototype), "constructor", this).call(this, props);
			this.state = {};
		}
	
		_createClass(ZoomReset, [{
			key: "render",
			value: function render() {
				var style = this.props.activated ? undefined : "border-style:inset;";
				return _react2["default"].createElement(
					"div",
					null,
					_react2["default"].createElement("input", { onClick: this.props.handleEvent, type: "button", value: this.props.activated ? "Reset Zoom" : "Unzoomed" })
				);
			}
		}]);
	
		return ZoomReset;
	})(_react2["default"].Component);
	
	exports["default"] = ZoomReset;
	module.exports = exports["default"];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=GPCCCM_L_CML_plotLibrary.js.map
