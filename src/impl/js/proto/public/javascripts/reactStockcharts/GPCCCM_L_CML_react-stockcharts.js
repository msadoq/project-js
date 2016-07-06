(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("d3"), require("ReactDOM"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "d3", "ReactDOM"], factory);
	else if(typeof exports === 'object')
		exports["ReStock"] = factory(require("React"), require("d3"), require("ReactDOM"));
	else
		root["ReStock"] = factory(root["React"], root["d3"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_116__) {
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
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _libChartCanvas = __webpack_require__(1);
	
	var _libChartCanvas2 = _interopRequireDefault(_libChartCanvas);
	
	var _libChart = __webpack_require__(45);
	
	var _libChart2 = _interopRequireDefault(_libChart);
	
	var _libDataSeries = __webpack_require__(46);
	
	var _libDataSeries2 = _interopRequireDefault(_libDataSeries);
	
	var _libBackgroundText = __webpack_require__(47);
	
	var _libBackgroundText2 = _interopRequireDefault(_libBackgroundText);
	
	// interaction components
	
	var _libEventCapture = __webpack_require__(48);
	
	var _libEventCapture2 = _interopRequireDefault(_libEventCapture);
	
	// chart types & Series
	
	var _libSeries = __webpack_require__(49);
	
	var series = _interopRequireWildcard(_libSeries);
	
	var _libCoordinates = __webpack_require__(73);
	
	var coordinates = _interopRequireWildcard(_libCoordinates);
	
	var _libIndicator = __webpack_require__(80);
	
	var indicator = _interopRequireWildcard(_libIndicator);
	
	var _libTransforms = __webpack_require__(35);
	
	var transforms = _interopRequireWildcard(_libTransforms);
	
	var _libAxes = __webpack_require__(92);
	
	var axes = _interopRequireWildcard(_libAxes);
	
	var _libTooltip = __webpack_require__(98);
	
	var tooltip = _interopRequireWildcard(_libTooltip);
	
	var _libHelper = __webpack_require__(110);
	
	var helper = _interopRequireWildcard(_libHelper);
	
	var _libInteractive = __webpack_require__(117);
	
	var interactive = _interopRequireWildcard(_libInteractive);
	
	var _libUtilsUtils = __webpack_require__(7);
	
	var Utils = _interopRequireWildcard(_libUtilsUtils);
	
	var version = "0.3.1";
	
	exports.ChartCanvas = _libChartCanvas2["default"];
	exports.Chart = _libChart2["default"];
	exports.DataSeries = _libDataSeries2["default"];
	exports.EventCapture = _libEventCapture2["default"];
	exports.BackgroundText = _libBackgroundText2["default"];
	exports.series = series;
	exports.coordinates = coordinates;
	exports.indicator = indicator;
	exports.transforms = transforms;
	exports.axes = axes;
	exports.tooltip = tooltip;
	exports.helper = helper;
	exports.interactive = interactive;
	exports.version = version;
	exports.Utils = Utils;

/***/ },
/* 1 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _EventHandler = __webpack_require__(3);
	
	var _EventHandler2 = _interopRequireDefault(_EventHandler);
	
	var _CanvasContainer = __webpack_require__(44);
	
	var _CanvasContainer2 = _interopRequireDefault(_CanvasContainer);
	
	var ChartCanvas = (function (_React$Component) {
		_inherits(ChartCanvas, _React$Component);
	
		function ChartCanvas() {
			_classCallCheck(this, ChartCanvas);
	
			_get(Object.getPrototypeOf(ChartCanvas.prototype), "constructor", this).call(this);
			this.getCanvases = this.getCanvases.bind(this);
		}
	
		_createClass(ChartCanvas, [{
			key: "getDimensions",
			value: function getDimensions(props) {
				return {
					height: props.height - props.margin.top - props.margin.bottom,
					width: props.width - props.margin.left - props.margin.right
				};
			}
		}, {
			key: "pushData",
			value: function pushData(array) {
				this.refs.chartContainer.pushData(array);
			}
		}, {
			key: "alterData",
			value: function alterData(array) {
				this.refs.chartContainer.alterData(array);
			}
		}, {
			key: "getDataInfo",
			value: function getDataInfo() {
				return this.refs.chartContainer.getDataInfo();
			}
		}, {
			key: "setViewRange",
			value: function setViewRange(start, end) {
				this.refs.chartContainer.setViewRange(start, end);
			}
		}, {
			key: "getCanvases",
			value: function getCanvases() {
				if (this.refs && this.refs.canvases) {
					return this.refs.canvases.getCanvasContexts();
				}
			}
		}, {
			key: "render",
			value: function render() {
				var dimensions = this.getDimensions(this.props);
				var style = "<![CDATA[\n\t\t\t\t\t\t.react-stockcharts-grabbing-cursor {\n\t\t\t\t\t\t\tcursor: grabbing;\n\t\t\t\t\t\t\tcursor: -moz-grabbing;\n\t\t\t\t\t\t\tcursor: -webkit-grabbing;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t.react-stockcharts-crosshair-cursor {\n\t\t\t\t\t\t\tcursor: crosshair;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t.react-stockcharts-toottip-hover {\n\t\t\t\t\t\t\tpointer-events: all;\n\t\t\t\t\t\t\tcursor: pointer;\n\t\t\t\t\t\t}\n\t\t\t\t\t]]>";
				var _props = this.props;
				var data = _props.data;
				var dataTransform = _props.dataTransform;
				var interval = _props.interval;
				var initialDisplay = _props.initialDisplay;
				var type = _props.type;
				var height = _props.height;
				var width = _props.width;
				var margin = _props.margin;
				var className = _props.className;
				var zIndex = _props.zIndex;
	
				return _react2["default"].createElement(
					"div",
					{ style: { position: "relative", height: height, width: width }, className: className },
					_react2["default"].createElement(_CanvasContainer2["default"], { ref: "canvases", width: width, height: height, type: this.props.type, zIndex: zIndex }),
					_react2["default"].createElement(
						"svg",
						{ width: width, height: height, style: { position: "absolute", zIndex: zIndex + 5 } },
						_react2["default"].createElement("style", { type: "text/css", dangerouslySetInnerHTML: { __html: style } }),
						_react2["default"].createElement(
							"defs",
							null,
							_react2["default"].createElement(
								"clipPath",
								{ id: "chart-area-clip" },
								_react2["default"].createElement("rect", { x: "0", y: "0", width: dimensions.width, height: dimensions.height })
							)
						),
						_react2["default"].createElement(
							"g",
							{ transform: "translate(" + (margin.left + 0.5) + ", " + (margin.top + 0.5) + ")" },
							_react2["default"].createElement(
								_EventHandler2["default"],
								{ ref: "chartContainer",
									rawData: data, dataTransform: dataTransform, interval: interval,
									initialDisplay: initialDisplay,
									dimensions: dimensions, type: type, margin: margin, canvasContexts: this.getCanvases },
								this.props.children
							)
						)
					)
				);
			}
		}]);
	
		return ChartCanvas;
	})(_react2["default"].Component);
	
	ChartCanvas.propTypes = {
		width: _react2["default"].PropTypes.number.isRequired,
		height: _react2["default"].PropTypes.number.isRequired,
		margin: _react2["default"].PropTypes.object,
		interval: _react2["default"].PropTypes.oneOf(["D", "W", "M"]).isRequired, // ,"m1", "m5", "m15", "W", "M"
		type: _react2["default"].PropTypes.oneOf(["svg", "hybrid"]).isRequired,
		data: _react2["default"].PropTypes.array.isRequired,
		initialDisplay: _react2["default"].PropTypes.number,
		dataTransform: _react2["default"].PropTypes.array.isRequired,
		className: _react2["default"].PropTypes.string,
		zIndex: _react2["default"].PropTypes.number,
		children: _react2["default"].PropTypes.node.isRequired
	};
	
	ChartCanvas.defaultProps = {
		margin: { top: 20, right: 30, bottom: 30, left: 80 },
		interval: "D",
		type: "hybrid",
		dataTransform: [],
		className: "react-stockchart",
		zIndex: 1
	};
	
	// initialDisplay: 30
	exports["default"] = ChartCanvas;
	module.exports = exports["default"];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _objectAssign = __webpack_require__(4);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _utilsPureComponent = __webpack_require__(5);
	
	var _utilsPureComponent2 = _interopRequireDefault(_utilsPureComponent);
	
	var _utilsUtils = __webpack_require__(7);
	
	var _utilsChartDataUtil = __webpack_require__(13);
	
	var _transforms = __webpack_require__(35);
	
	var subscriptionCount = 0;
	
	function getLongValue(value) {
		if (value instanceof Date) {
			return value.getTime();
		}
		return value;
	}
	function deepEquals(arr1, arr2) {
		if (arr1.length === arr2.length) {
			var result = true;
			arr1.forEach(function (each, i) {
				result = result && each.transform === arr2[i].transform && each.options === arr2[i].options;
			});
			return result;
		}
		return false;
	}
	
	var EventHandler = (function (_PureComponent) {
		_inherits(EventHandler, _PureComponent);
	
		function EventHandler(props, context) {
			_classCallCheck(this, EventHandler);
	
			_get(Object.getPrototypeOf(EventHandler.prototype), "constructor", this).call(this, props, context);
			this.handleMouseMove = this.handleMouseMove.bind(this);
			this.handleMouseEnter = this.handleMouseEnter.bind(this);
			this.handleMouseLeave = this.handleMouseLeave.bind(this);
			this.handleZoom = this.handleZoom.bind(this);
			this.handlePinchZoom = this.handlePinchZoom.bind(this);
			this.handlePanStart = this.handlePanStart.bind(this);
			this.handlePan = this.handlePan.bind(this);
			this.handlePanEnd = this.handlePanEnd.bind(this);
			this.handleFocus = this.handleFocus.bind(this);
			this.getCanvasContexts = this.getCanvasContexts.bind(this);
			this.pushCallbackForCanvasDraw = this.pushCallbackForCanvasDraw.bind(this);
			this.getAllCanvasDrawCallback = this.getAllCanvasDrawCallback.bind(this);
			this.subscribe = this.subscribe.bind(this);
			this.unsubscribe = this.unsubscribe.bind(this);
			this.pinchCoordinates = this.pinchCoordinates.bind(this);
	
			this.subscriptions = [];
			this.canvasDrawCallbackList = [];
			this.panHappened = false;
			this.state = {
				focus: false,
				currentItems: [],
				show: false,
				mouseXY: [0, 0],
				panInProgress: false,
				interactiveState: []
			};
		}
	
		_createClass(EventHandler, [{
			key: "getTransformedData",
			value: function getTransformedData(rawData, defaultDataTransform, dataTransform, interval) {
				var i = 0,
				    eachTransform,
				    options = {},
				    data = rawData;
				var transforms = defaultDataTransform.concat(dataTransform);
	
				for (i = 0; i < transforms.length; i++) {
					eachTransform = transforms[i].transform();
					options = (0, _objectAssign2["default"])({}, options, transforms[i].options);
					options = eachTransform.options(options);
					data = eachTransform(data, interval);
				}
				return {
					data: data,
					options: options
				};
			}
		}, {
			key: "componentWillMount",
			value: function componentWillMount() {
				// console.log("EventHandler.componentWillMount");
				var props = this.props;
				var initialDisplay = props.initialDisplay;
				var rawData = props.rawData;
				var defaultDataTransform = props.defaultDataTransform;
				var dataTransform = props.dataTransform;
				var interval = props.interval;
				var dimensions = props.dimensions;
	
				var transformedData = this.getTransformedData(rawData, defaultDataTransform, dataTransform, interval);
	
				var data = transformedData.data;
				var options = transformedData.options;
	
				var dataForInterval = data[interval];
				var mainChart = (0, _utilsChartDataUtil.getMainChart)(props.children);
				var beginIndex = Math.max(dataForInterval.length - initialDisplay, 0);
				var plotData = dataForInterval.slice(beginIndex);
				var chartConfig = (0, _utilsChartDataUtil.getChartDataConfig)(props, dimensions, options);
	
				var chart = chartConfig.filter(function (eachChart) {
					return eachChart.id === mainChart;
				})[0];
	
				var domainL = getLongValue(chart.config.xAccessor(plotData[0]));
				var domainR = getLongValue(chart.config.xAccessor(plotData[plotData.length - 1]));
	
				var dataToPlot = (0, _utilsChartDataUtil.getDataToPlotForDomain)(domainL, domainR, data, chart.config.width, chart.config.xAccessor);
				var updatePlotData = dataToPlot.data;
	
				var chartData = (0, _utilsChartDataUtil.getChartData)(props, dimensions, plotData, data, options);
	
				// if (dataToPlot.data.length < 10) return;
	
				// console.log("componentWillMount", chartData);
				this.setState({
					data: data,
					rawData: rawData,
					options: options,
					plotData: updatePlotData,
					chartData: chartData,
					interval: this.props.interval,
					mainChart: mainChart,
					currentCharts: [mainChart],
					initialRender: true
				});
			}
		}, {
			key: "componentWillReceiveProps",
			value: function componentWillReceiveProps(nextProps) {
				var _props = this.props;
				var prevData = _props.rawData;
				var prevDataTransform = _props.dataTransform;
				var nextData = nextProps.rawData;
				var nextDataTransform = nextProps.dataTransform;
				var dimensions = nextProps.dimensions;
				var initialDisplay = nextProps.initialDisplay;
				var defaultDataTransform = nextProps.defaultDataTransform;
				var intervalProp = nextProps.interval;
				var _state = this.state;
				var data = _state.data;
				var options = _state.options;
				var interval = _state.interval;
				var chartData = _state.chartData;
				var plotData = _state.plotData;
				var rawData = _state.rawData;
	
				var dataChanged = false;
				if (prevData !== nextData || !deepEquals(prevDataTransform, nextDataTransform)) {
					var transformedData = this.getTransformedData(nextData, defaultDataTransform, nextDataTransform, intervalProp);
					data = transformedData.data;
					options = transformedData.options;
	
					dataChanged = true;
					rawData = nextData;
				}
	
				var dataForInterval = data[interval];
	
				var mainChart = (0, _utilsChartDataUtil.getMainChart)(nextProps.children);
				var mainChartData = chartData.filter(function (each) {
					return each.id === mainChart;
				})[0];
				var xScale = mainChartData.plot.scales.xScale;
	
				var domainL,
				    domainR,
				    startDomain = xScale.domain();
				// console.log(dataPushed, lastItemVisible);
	
				if (dataChanged) {
					var beginIndex = Math.max(dataForInterval.length - initialDisplay, 0);
					var endIndex = dataForInterval.length;
	
					plotData = dataForInterval.slice(beginIndex, endIndex);
				} else {
					domainL = startDomain[0];
					domainR = startDomain[1];
				}
	
				// console.log(plotData[0], plotData[plotData.length - 1]);
				var newChartData = (0, _utilsChartDataUtil.getChartData)(nextProps, dimensions, plotData, data, options);
				var chart = newChartData.filter(function (eachChart) {
					return eachChart.id === mainChart;
				})[0];
				var _chart$config = chart.config;
				var xAccessor = _chart$config.xAccessor;
				var width = _chart$config.width;
	
				if (!domainL) {
					domainL = getLongValue(xAccessor(plotData[0]));
					domainR = getLongValue(xAccessor(plotData[plotData.length - 1]));
				}
	
				var dataToPlot = (0, _utilsChartDataUtil.getDataToPlotForDomain)(domainL, domainR, data, width, xAccessor);
				plotData = dataToPlot.data;
	
				newChartData = newChartData.map(function (eachChart) {
					var plot = (0, _utilsChartDataUtil.getChartPlotFor)(eachChart.config, eachChart.scaleType, plotData, domainL, domainR);
					return {
						id: eachChart.id,
						config: eachChart.config,
						scaleType: eachChart.scaleType,
						plot: plot
					};
				});
	
				var newCurrentItems = (0, _utilsChartDataUtil.getCurrentItems)(newChartData, this.state.mouseXY, plotData);
	
				this.clearBothCanvas(nextProps);
				this.clearInteractiveCanvas(nextProps);
	
				// console.log("componentWillReceiveProps");
	
				this.clearCanvasDrawCallbackList();
	
				this.setState({
					rawData: rawData,
					data: data,
					options: options,
					chartData: newChartData,
					plotData: plotData,
					currentItems: newCurrentItems,
					mainChart: mainChart,
					initialRender: false,
					canvases: null
				});
			}
		}, {
			key: "pushData",
			value: function pushData(array) {
				var _this = this;
	
				if (array === undefined || array === null || array.length === 0) return;
	
				var _props2 = this.props;
				var dataTransform = _props2.dataTransform;
				var defaultDataTransform = _props2.defaultDataTransform;
				var dimensions = _props2.dimensions;
				var _state2 = this.state;
				var rawData = _state2.rawData;
				var data = _state2.data;
				var interval = _state2.interval;
				var chartData = _state2.chartData;
				var plotData = _state2.plotData;
				var mainChart = _state2.mainChart;
	
				var newRawData = rawData.concat(array);
				var transformedData = this.getTransformedData(newRawData, defaultDataTransform, dataTransform, interval);
	
				var prevDataForInterval = data[interval];
				var dataForInterval = transformedData.data[interval];
	
				var mainChartData = chartData.filter(function (each) {
					return each.id === mainChart;
				})[0];
				var xAccessor = mainChartData.config.xAccessor;
				var xScale = mainChartData.plot.scales.xScale;
	
				var startDomain = xScale.domain();
				var domainL, domainR;
	
				var lastItemVisible = plotData[plotData.length - 1] === prevDataForInterval[prevDataForInterval.length - 1];
	
				var beginIndex, endIndex;
				if (lastItemVisible) {
					endIndex = dataForInterval.length;
					beginIndex = dataForInterval.length - plotData.length;
				} else {
					domainL = startDomain[0];
					domainR = startDomain[1];
					beginIndex = (0, _utilsUtils.getClosestItemIndexes)(dataForInterval, domainL, xAccessor).left;
					endIndex = beginIndex + plotData.length;
				}
	
				var newPlotData = dataForInterval.slice(beginIndex, endIndex);
				// console.log(newPlotData[newPlotData.length - 1]);
	
				if (lastItemVisible && domainL === undefined) {
					if (startDomain[1] > xAccessor(plotData[plotData.length - 1])) {
						domainL = startDomain[0] + (xAccessor(newPlotData[newPlotData.length - 1]) - xAccessor(plotData[plotData.length - 1]));
						domainR = startDomain[1] + (xAccessor(newPlotData[newPlotData.length - 1]) - xAccessor(plotData[plotData.length - 1]));
					}
				}
	
				var newChartData = (0, _utilsChartDataUtil.getChartData)(this.props, dimensions, newPlotData, transformedData.data, transformedData.options);
	
				if (domainL === undefined) {
					domainL = xAccessor(newPlotData[0]);
					domainR = xAccessor(newPlotData[newPlotData.length - 1]);
				}
	
				var l = 2,
				    i = 0,
				    speed = 16;
	
				var updateState = function updateState(L, R) {
					newChartData = newChartData.map(function (eachChart) {
						var plot = (0, _utilsChartDataUtil.getChartPlotFor)(eachChart.config, eachChart.scaleType, newPlotData, L, R);
						return {
							id: eachChart.id,
							config: eachChart.config,
							scaleType: eachChart.scaleType,
							plot: plot
						};
					});
	
					var newCurrentItems = (0, _utilsChartDataUtil.getCurrentItems)(newChartData, _this.state.mouseXY, newPlotData);
	
					_this.clearBothCanvas();
					_this.clearInteractiveCanvas();
	
					_this.clearCanvasDrawCallbackList();
					_this.setState({
						rawData: newRawData,
						data: transformedData.data,
						options: transformedData.options,
						chartData: newChartData,
						plotData: newPlotData,
						currentItems: newCurrentItems,
						canvases: null
					});
				};
				if (lastItemVisible) {
	
					var timeout = setInterval(function () {
						var dxL = (startDomain[0] - domainL) / l;
						var dxR = (startDomain[1] - domainR) / l;
	
						i++;
	
						var L = i === l ? domainL : startDomain[0] - dxL * i;
						var R = i === l ? domainR : startDomain[1] - dxR * i;
						updateState(L, R);
						if (i === l) clearInterval(timeout);
					}, speed);
				} else {
					this.setState({
						rawData: newRawData,
						data: transformedData.data,
						options: transformedData.options
					});
				}
			}
		}, {
			key: "alterData",
			value: function alterData(newRawData) {
				if (newRawData === undefined || newRawData === null || newRawData.length === 0) return;
	
				var _props3 = this.props;
				var dataTransform = _props3.dataTransform;
				var defaultDataTransform = _props3.defaultDataTransform;
				var dimensions = _props3.dimensions;
				var _state3 = this.state;
				var rawData = _state3.rawData;
				var interval = _state3.interval;
				var chartData = _state3.chartData;
				var plotData = _state3.plotData;
				var mainChart = _state3.mainChart;
	
				if (rawData.length !== newRawData.length) {
					console.log(rawData.length, newRawData.length);
					throw Error("Have to update data of same length");
				}
	
				var transformedData = this.getTransformedData(newRawData, defaultDataTransform, dataTransform, interval);
	
				var dataForInterval = transformedData.data[interval];
	
				var mainChartData = chartData.filter(function (each) {
					return each.id === mainChart;
				})[0];
				var xAccessor = mainChartData.config.xAccessor;
				var xScale = mainChartData.plot.scales.xScale;
	
				var startDomain = xScale.domain();
	
				var left = xAccessor(plotData[0]);
				var beginIndex = (0, _utilsUtils.getClosestItemIndexes)(dataForInterval, left, xAccessor).left;
				var endIndex = beginIndex + plotData.length;
	
				var newPlotData = dataForInterval.slice(beginIndex, endIndex);
	
				var newChartData = (0, _utilsChartDataUtil.getChartData)(this.props, dimensions, newPlotData, transformedData.data, transformedData.options);
	
				newChartData = newChartData.map(function (eachChart) {
					var plot = (0, _utilsChartDataUtil.getChartPlotFor)(eachChart.config, eachChart.scaleType, newPlotData, startDomain[0], startDomain[1]);
					return {
						id: eachChart.id,
						config: eachChart.config,
						scaleType: eachChart.scaleType,
						plot: plot
					};
				});
	
				var newCurrentItems = (0, _utilsChartDataUtil.getCurrentItems)(newChartData, this.state.mouseXY, newPlotData);
	
				this.clearBothCanvas();
				this.clearInteractiveCanvas();
	
				this.clearCanvasDrawCallbackList();
	
				this.setState({
					rawData: newRawData,
					data: transformedData.data,
					options: transformedData.options,
					chartData: newChartData,
					plotData: newPlotData,
					currentItems: newCurrentItems,
					canvases: null
				});
			}
		}, {
			key: "getDataInfo",
			value: function getDataInfo() {
				var interval = "D";
				var _state4 = this.state;
				var data = _state4.data;
				var plotData = _state4.plotData;
				var chartData = _state4.chartData;
				var mainChart = _state4.mainChart;
	
				var dataForInterval = data[interval];
				var mainChartData = chartData.filter(function (each) {
					return each.id === mainChart;
				})[0];
				var xAccessor = mainChartData.config.xAccessor;
	
				return {
					xAccessor: xAccessor,
					data: dataForInterval,
					fullData: {
						start: dataForInterval[0],
						end: dataForInterval[dataForInterval.length - 1]
					},
					viewData: {
						start: plotData[0],
						end: plotData[plotData.length - 1]
					}
				};
			}
		}, {
			key: "setViewRange",
			value: function setViewRange(domainL, domainR) {
				var _state5 = this.state;
				var data = _state5.data;
				var mainChart = _state5.mainChart;
				var chartData = _state5.chartData;
				var mouseXY = _state5.mouseXY;
	
				var chart = chartData.filter(function (eachChart) {
					return eachChart.id === mainChart;
				})[0];
				var dataToPlot = (0, _utilsChartDataUtil.getDataToPlotForDomain)(domainL, domainR, data, chart.config.width, chart.config.xAccessor);
	
				if (dataToPlot.data.length < 10) {
					console.warn("Ouch... too much zoom");
					return;
				}
	
				var newChartData = chartData.map(function (eachChart) {
					var plot = (0, _utilsChartDataUtil.getChartPlotFor)(eachChart.config, eachChart.scaleType, dataToPlot.data, domainL, domainR);
					return {
						id: eachChart.id,
						config: eachChart.config,
						scaleType: eachChart.scaleType,
						plot: plot
					};
				});
	
				var currentItems = (0, _utilsChartDataUtil.getCurrentItems)(newChartData, mouseXY, dataToPlot.data);
	
				this.clearBothCanvas();
				this.clearInteractiveCanvas();
	
				this.clearCanvasDrawCallbackList();
				this.setState({
					chartData: newChartData,
					plotData: dataToPlot.data,
					interval: dataToPlot.interval,
					currentItems: currentItems
				});
			}
		}, {
			key: "clearBothCanvas",
			value: function clearBothCanvas(props) {
				props = props || this.props;
				var canvases = props.canvasContexts();
				if (canvases && canvases.axes) {
					// console.log("CLEAR");
					this.clearCanvas([canvases.axes, canvases.mouseCoord]);
				}
			}
		}, {
			key: "clearInteractiveCanvas",
			value: function clearInteractiveCanvas(props) {
				props = props || this.props;
				var canvases = props.canvasContexts();
				if (canvases && canvases.interactive) {
					// console.error("CLEAR");
					this.clearCanvas([canvases.interactive]);
				}
			}
		}, {
			key: "clearCanvas",
			value: function clearCanvas(canvasList) {
				// console.log("CLEARING...", canvasList.length)
				canvasList.forEach(function (each) {
					// console.log(each.canvas.id);
					each.setTransform(1, 0, 0, 1, 0, 0);
					each.clearRect(-1, -1, each.canvas.width + 2, each.canvas.height + 2);
				});
			}
		}, {
			key: "getChildContext",
			value: function getChildContext() {
				return {
					plotData: this.state.plotData,
					chartData: this.state.chartData,
					currentItems: this.state.currentItems,
					mainChart: this.state.mainChart,
					show: this.state.show,
					mouseXY: this.state.mouseXY,
					interval: this.state.interval,
					currentCharts: this.state.currentCharts,
					width: this.props.dimensions.width,
					height: this.props.dimensions.height,
					chartCanvasType: this.props.type,
					dateAccessor: this.state.options.dateAccessor,
	
					margin: this.props.margin,
					dataTransform: this.props.dataTransform,
					interactiveState: this.state.interactiveState,
	
					callbackForCanvasDraw: this.pushCallbackForCanvasDraw,
					getAllCanvasDrawCallback: this.getAllCanvasDrawCallback,
					subscribe: this.subscribe,
					unsubscribe: this.unsubscribe,
					getCanvasContexts: this.getCanvasContexts,
					onMouseMove: this.handleMouseMove,
					onMouseEnter: this.handleMouseEnter,
					onMouseLeave: this.handleMouseLeave,
					onZoom: this.handleZoom,
					onPinchZoom: this.handlePinchZoom,
					onPanStart: this.handlePanStart,
					onPan: this.handlePan,
					onPanEnd: this.handlePanEnd,
					onFocus: this.handleFocus,
					deltaXY: this.state.deltaXY,
					panInProgress: this.state.panInProgress,
					focus: this.state.focus
				};
			}
		}, {
			key: "pushCallbackForCanvasDraw",
			value: function pushCallbackForCanvasDraw(findThis, replaceWith) {
				var canvasDrawCallbackList = this.canvasDrawCallbackList;
	
				// console.log(findThis, canvasDrawCallbackList.length);
				if (replaceWith) {
					canvasDrawCallbackList.forEach(function (each, idx) {
						if (each === findThis) {
							canvasDrawCallbackList[idx] = replaceWith;
						}
					});
				} else {
					// console.log(findThis);
					canvasDrawCallbackList.push(findThis);
				}
			}
		}, {
			key: "getAllCanvasDrawCallback",
			value: function getAllCanvasDrawCallback() {
				return this.canvasDrawCallbackList;
			}
		}, {
			key: "subscribe",
			value: function subscribe(forChart, eventType, callback) {
				subscriptionCount++;
	
				this.subscriptions.push({
					forChart: forChart,
					subscriptionId: subscriptionCount,
					eventType: eventType,
					callback: callback
				});
				return subscriptionCount;
			}
		}, {
			key: "unsubscribe",
			value: function unsubscribe(subscriptionId) {
				// console.log(subscriptionId);
				this.subscriptions = this.subscriptions.filter(function (each) {
					return each.subscriptionId === subscriptionId;
				});
			}
		}, {
			key: "handleMouseMove",
			value: function handleMouseMove(mouseXY, inputType, e) {
				var currentCharts = this.state.chartData.filter(function (chartData) {
					var top = chartData.config.origin[1];
					var bottom = top + chartData.config.height;
					return mouseXY[1] > top && mouseXY[1] < bottom;
				}).map(function (chartData) {
					return chartData.id;
				});
				var currentItems = (0, _utilsChartDataUtil.getCurrentItems)(this.state.chartData, mouseXY, this.state.plotData);
	
				var interactiveState = inputType === "mouse" ? this.triggerCallback("mousemove", (0, _objectAssign2["default"])({}, this.state, { currentItems: currentItems, currentCharts: currentCharts }), this.state.interactiveState, e) : this.triggerCallback("touch", (0, _objectAssign2["default"])({}, this.state, { currentItems: currentItems, currentCharts: currentCharts }), this.state.interactiveState, e);
	
				var contexts = this.getCanvasContexts();
	
				if (contexts && contexts.mouseCoord) {
					this.clearCanvas([contexts.mouseCoord]);
				}
				// console.log(interactiveState === this.state.interactiveState);
				if (interactiveState !== this.state.interactiveState) this.clearInteractiveCanvas();
	
				this.setState({
					mouseXY: mouseXY,
					currentItems: currentItems,
					show: true,
					currentCharts: currentCharts,
					interactiveState: interactiveState
				});
			}
		}, {
			key: "getCanvasContexts",
			value: function getCanvasContexts() {
				// console.log(this.state.canvases, this.props.canvasContexts())
				return this.state.canvases || this.props.canvasContexts();
			}
		}, {
			key: "handleMouseEnter",
			value: function handleMouseEnter() {
				// if type === svg remove state.canvases
				// if type !== svg get canvases and set in state if state.canvases is not present already
				var _props4 = this.props;
				var type = _props4.type;
				var canvasContexts = _props4.canvasContexts;
				var canvases = this.state.canvases;
	
				if (type === "svg") {
					canvases = null;
				} else {
					canvases = canvasContexts();
				}
				this.setState({
					show: true,
					canvases: canvases
				});
			}
		}, {
			key: "handleMouseLeave",
			value: function handleMouseLeave() {
				var contexts = this.getCanvasContexts();
	
				if (contexts && contexts.mouseCoord) {
					this.clearCanvas([contexts.mouseCoord]);
				}
	
				this.setState({
					show: false
				});
			}
		}, {
			key: "pinchCoordinates",
			value: function pinchCoordinates(pinch) {
				var plotData = this.state.plotData;
				var mainChartData = pinch.mainChartData;
				var touch1Pos = pinch.touch1Pos;
				var touch2Pos = pinch.touch2Pos;
	
				var firstX = getLongValue(mainChartData.config.xAccessor((0, _utilsChartDataUtil.getClosest)(plotData, touch1Pos, mainChartData)));
				var secondX = getLongValue(mainChartData.config.xAccessor((0, _utilsChartDataUtil.getClosest)(plotData, touch2Pos, mainChartData)));
				var pinchCoordinate = firstX < secondX ? {
					left: firstX,
					right: secondX,
					leftxy: touch1Pos,
					rightxy: touch2Pos
				} : {
					left: secondX,
					right: firstX,
					leftxy: touch2Pos,
					rightxy: touch1Pos
				};
				return pinchCoordinate;
			}
		}, {
			key: "handlePinchZoom",
			value: function handlePinchZoom(initialPinch, finalPinch) {
				var _this2 = this;
	
				var _state6 = this.state;
				var data = _state6.data;
				var chartData = _state6.chartData;
				var range = initialPinch.range;
				var mainChartData = finalPinch.mainChartData;
	
				var initial = this.pinchCoordinates(initialPinch);
				var final = this.pinchCoordinates(finalPinch);
	
				var left = (final.leftxy[0] - range[0]) / (final.rightxy[0] - final.leftxy[0]) * (initial.right - initial.left);
				var right = (range[1] - final.rightxy[0]) / (final.rightxy[0] - final.leftxy[0]) * (initial.right - initial.left);
	
				var domainL = initial.left - left;
				var domainR = initial.right + right;
	
				var _mainChartData$config = mainChartData.config;
				var width = _mainChartData$config.width;
				var xAccessor = _mainChartData$config.xAccessor;
	
				var dataToPlot = (0, _utilsChartDataUtil.getDataToPlotForDomain)(domainL, domainR, data, width, xAccessor);
	
				if (dataToPlot.data.length < 10) return;
	
				var newChartData = chartData.map(function (eachChart) {
					var plot = (0, _utilsChartDataUtil.getChartPlotFor)(eachChart.config, eachChart.scaleType, dataToPlot.data, domainL, domainR);
					return {
						id: eachChart.id,
						config: eachChart.config,
						scaleType: eachChart.scaleType,
						plot: plot
					};
				});
	
				requestAnimationFrame(function () {
					_this2.clearBothCanvas();
					_this2.clearInteractiveCanvas();
	
					_this2.clearCanvasDrawCallbackList();
					_this2.setState({
						chartData: newChartData,
						plotData: dataToPlot.data,
						interval: dataToPlot.interval
					});
				});
	
				// document.getElementById("debug_here").innerHTML = `${panInProgress}`;
	
				// document.getElementById("debug_here").innerHTML = `${final.rightxy[0] - final.leftxy[0]} -> ${initial.right - initial.left}`;
				// document.getElementById("debug_here").innerHTML = `${initial.left} - ${initial.right} to ${final.left} - ${final.right}`;
				// document.getElementById("debug_here").innerHTML = `${id[1] - id[0]} = ${initial.left - id[0]} + ${initial.right - initial.left} + ${id[1] - initial.right}`;
				// document.getElementById("debug_here").innerHTML = `${range[1] - range[0]}, ${i1[0]}, ${i2[0]}`;
			}
		}, {
			key: "handleZoom",
			value: function handleZoom(zoomDirection, mouseXY) {
				// console.log("zoomDirection ", zoomDirection, " mouseXY ", mouseXY);
				var _state7 = this.state;
				var data = _state7.data;
				var mainChart = _state7.mainChart;
				var chartData = _state7.chartData;
				var plotData = _state7.plotData;
				var interval = _state7.interval;
	
				var chart = chartData.filter(function (eachChart) {
					return eachChart.id === mainChart;
				})[0],
				    item = (0, _utilsChartDataUtil.getClosest)(plotData, mouseXY, chart),
				    xScale = chart.plot.scales.xScale,
				    domain = xScale.domain(),
				    centerX = chart.config.xAccessor(item),
				    leftX = centerX - domain[0],
				    rightX = domain[1] - centerX,
				    zoom = Math.pow(1 + Math.abs(zoomDirection) / 2, zoomDirection),
				    domainL = getLongValue(centerX) - leftX * zoom,
				    domainR = getLongValue(centerX) + rightX * zoom,
				    domainRange = Math.abs(domain[1] - domain[0]),
				    fullData = data[interval],
				    last = fullData[fullData.length - 1],
				    first = fullData[0];
	
				domainL = Math.max(getLongValue(chart.config.xAccessor(first)) - Math.floor(domainRange / 3), domainL);
				domainR = Math.min(getLongValue(chart.config.xAccessor(last)) + Math.floor(domainRange / 3), domainR);
	
				var dataToPlot = (0, _utilsChartDataUtil.getDataToPlotForDomain)(domainL, domainR, data, chart.config.width, chart.config.xAccessor);
				if (dataToPlot.data.length < 10) return;
				var newChartData = chartData.map(function (eachChart) {
					var plot = (0, _utilsChartDataUtil.getChartPlotFor)(eachChart.config, eachChart.scaleType, dataToPlot.data, domainL, domainR);
					return {
						id: eachChart.id,
						config: eachChart.config,
						scaleType: eachChart.scaleType,
						plot: plot
					};
				});
	
				var currentItems = (0, _utilsChartDataUtil.getCurrentItems)(newChartData, mouseXY, dataToPlot.data);
	
				this.clearBothCanvas();
				this.clearInteractiveCanvas();
	
				this.clearCanvasDrawCallbackList();
				this.setState({
					chartData: newChartData,
					plotData: dataToPlot.data,
					interval: dataToPlot.interval,
					currentItems: currentItems
				});
			}
		}, {
			key: "handlePanStart",
			value: function handlePanStart(panStartDomain, panOrigin, dxy) {
				// console.log("panStartDomain - ", panStartDomain, ", panOrigin - ", panOrigin);
				this.setState({
					panInProgress: true,
					panStartDomain: panStartDomain,
					panOrigin: panOrigin,
					focus: true,
					deltaXY: dxy
				});
				this.panHappened = false;
			}
		}, {
			key: "panHelper",
			value: function panHelper(mousePosition) {
				var _state8 = this.state;
				var data = _state8.data;
				var mainChart = _state8.mainChart;
				var chartData = _state8.chartData;
				var interval = _state8.interval;
				var panStartDomain = _state8.panStartDomain;
				var panOrigin = _state8.panOrigin;
	
				var chart = chartData.filter(function (eachChart) {
					return eachChart.id === mainChart;
				})[0],
				    domainRange = panStartDomain[1] - panStartDomain[0],
				    dataForInterval = data[interval],
				    last = dataForInterval[dataForInterval.length - 1],
				    first = dataForInterval[0],
				    dx = mousePosition[0] - panOrigin[0],
				    xAccessor = chart.config.xAccessor;
	
				// console.log("pan -- mouse move - ", mousePosition, " dragged by ", dx, " pixels");
	
				var domainStart = getLongValue(panStartDomain[0]) - dx / chart.config.width * domainRange;
				if (domainStart < getLongValue(xAccessor(first)) - Math.floor(domainRange / 3)) {
					domainStart = getLongValue(xAccessor(first)) - Math.floor(domainRange / 3);
				} else {
					domainStart = Math.min(getLongValue(xAccessor(last)) + Math.ceil(domainRange / 3), domainStart + domainRange) - domainRange;
				}
				var domainL = domainStart,
				    domainR = domainStart + domainRange;
				if (panStartDomain[0] instanceof Date) {
					domainL = new Date(domainL);
					domainR = new Date(domainR);
				}
	
				var beginIndex = (0, _utilsUtils.getClosestItemIndexes)(dataForInterval, domainL, xAccessor).left;
				var endIndex = (0, _utilsUtils.getClosestItemIndexes)(dataForInterval, domainR, xAccessor).right;
	
				var filteredData = dataForInterval.slice(beginIndex, endIndex);
	
				var newChartData = chartData.map(function (eachChart) {
					var plot = (0, _utilsChartDataUtil.getChartPlotFor)(eachChart.config, eachChart.scaleType, filteredData, domainL, domainR);
					return {
						id: eachChart.id,
						config: eachChart.config,
						scaleType: eachChart.scaleType,
						plot: plot
					};
				});
				var currentItems = (0, _utilsChartDataUtil.getCurrentItems)(newChartData, mousePosition, filteredData);
	
				var currentCharts = newChartData.filter(function (eachChartData) {
					var top = eachChartData.config.origin[1];
					var bottom = top + eachChartData.config.height;
					return mousePosition[1] > top && mousePosition[1] < bottom;
				}).map(function (eachChartData) {
					return eachChartData.id;
				});
				return {
					plotData: filteredData,
					// show: true,
					mouseXY: mousePosition,
					currentCharts: currentCharts,
					chartData: newChartData,
					currentItems: currentItems
				};
			}
		}, {
			key: "getCurrentCanvasContext",
			value: function getCurrentCanvasContext(canvasList, chartId) {
				var canvasContextList = canvasList.filter(function (each) {
					return parseInt(each.id, 10) === chartId;
				});
				var canvasContext = canvasContextList.length > 0 ? canvasContextList[0].context : undefined;
				return canvasContext;
			}
		}, {
			key: "handlePan",
			value: function handlePan(mousePosition, startDomain) {
				var _this3 = this;
	
				/* can also use plotData, use this if you want to pan and show only within that data set*/
				if (this.state.panStartDomain === null) {
					this.handlePanStart(startDomain, mousePosition);
				} else {
	
					this.panHappened = true;
					var state = this.panHelper(mousePosition);
	
					if (this.props.type !== "svg") {
						var _getCanvasContexts = this.getCanvasContexts();
	
						var axesCanvasContext = _getCanvasContexts.axes;
						var mouseContext = _getCanvasContexts.mouseCoord;
						var chartData = state.chartData;
						var plotData = state.plotData;
						var show = this.state.show;
						var canvasDrawCallbackList = this.canvasDrawCallbackList;
	
						requestAnimationFrame(function () {
							// this.clearCanvas([axesCanvasContext, mouseContext]);
							// this.clearCanvas([axesCanvasContext, mouseContext]);
							_this3.clearBothCanvas();
							_this3.clearInteractiveCanvas();
	
							// console.log(canvasDrawCallbackList.length)
	
							chartData.forEach(function (eachChart) {
								canvasDrawCallbackList.filter(function (each) {
									return eachChart.id === each.chartId;
								}).forEach(function (each) {
									var _eachChart$plot$scales = eachChart.plot.scales;
									var xScale = _eachChart$plot$scales.xScale;
									var yScale = _eachChart$plot$scales.yScale;
	
									var overlayPresent = eachChart.config.overlays.filter(function (eachOverlay) {
										return eachOverlay.id === each.seriesId;
									}).length > 0;
									// console.log(each);
									if (overlayPresent) {
										each.draw(axesCanvasContext, xScale, yScale, plotData);
									}
	
									if (each.type === "axis") {
										each.draw(axesCanvasContext, eachChart, xScale, yScale);
									}
								});
							});
							_this3.drawInteractive(state);
							canvasDrawCallbackList.filter(function (each) {
								return each.chartId === undefined;
							}).filter(function (each) {
								return each.type === "axis";
							}).forEach(function (each) {
								return each.draw(axesCanvasContext, chartData);
							});
	
							canvasDrawCallbackList.filter(function (each) {
								return each.type === "mouse";
							}).forEach(function (each) {
								return each.draw(mouseContext, show, state.mouseXY, state.currentCharts, state.chartData, state.currentItems);
							});
	
							canvasDrawCallbackList.filter(function (each) {
								return each.type === "currentcoordinate";
							}).forEach(function (each) {
								return each.draw(mouseContext, show, state.mouseXY, state.currentCharts, state.chartData, state.currentItems);
							});
						});
					} else {
						this.setState(state);
					}
				}
			}
		}, {
			key: "drawInteractive",
			value: function drawInteractive(_ref) {
				var plotData = _ref.plotData;
				var chartData = _ref.chartData;
	
				var _getCanvasContexts2 = this.getCanvasContexts();
	
				var interactive = _getCanvasContexts2.interactive;
	
				// console.log(interactive);
				this.canvasDrawCallbackList.filter(function (each) {
					return each.type === "interactive";
				}).forEach(function (each) {
					chartData.filter(function (eachChart) {
						return eachChart.id === each.chartId;
					}).forEach(function (eachChart) {
						each.draw(interactive, { plotData: plotData, chartData: eachChart });
						// console.log("DRAW");
					});
				});
			}
		}, {
			key: "clearCanvasDrawCallbackList",
			value: function clearCanvasDrawCallbackList() {
				this.canvasDrawCallbackList = [];
			}
		}, {
			key: "handlePanEnd",
			value: function handlePanEnd(mousePosition, e) {
				var state = this.panHelper(mousePosition);
	
				this.clearCanvasDrawCallbackList();
	
				var interactiveState = this.panHappened ? this.triggerCallback("panend", state, this.state.interactiveState, e) : this.triggerCallback("click", state, this.state.interactiveState, e);
	
				this.clearBothCanvas();
				if (interactiveState !== this.state.interactive) this.clearInteractiveCanvas();
	
				// console.log(interactiveState[0].interactive);
				this.setState((0, _objectAssign2["default"])({}, state, {
					show: this.state.show,
					panInProgress: false,
					panStartDomain: null,
					interactiveState: interactiveState
				}));
			}
		}, {
			key: "triggerCallback",
			value: function triggerCallback(eventType, state, interactiveState, event) {
				var plotData = state.plotData;
				var mouseXY = state.mouseXY;
				var currentCharts = state.currentCharts;
				var chartData = state.chartData;
				var currentItems = state.currentItems;
	
				var callbackList = this.subscriptions.filter(function (each) {
					return each.eventType === eventType;
				});
				var delta = callbackList.map(function (each) {
					// console.log(each);
					var singleChartData = chartData.filter(function (eachItem) {
						return eachItem.id === each.forChart;
					})[0];
					var singleCurrentItem = currentItems.filter(function (eachItem) {
						return eachItem.id === each.forChart;
					})[0];
					return {
						callback: each.callback,
						forChart: each.forChart,
						plotData: plotData,
						mouseXY: mouseXY,
						currentCharts: currentCharts,
						currentItem: singleCurrentItem.data,
						chartData: singleChartData
					};
				}).filter(function (each) {
					return each.currentCharts.indexOf(each.forChart) >= -1;
				}).map(function (each) {
					return each.callback({
						plotData: each.plotData,
						mouseXY: each.mouseXY,
						chartData: each.chartData,
						currentItem: each.currentItem
					}, event);
				});
	
				// console.log(delta.length);
				if (delta.length === 0) return interactiveState;
	
				var i = 0,
				    j = 0,
				    added = false;
				var newInteractiveState = interactiveState.slice(0);
				for (i = 0; i < delta.length; i++) {
					var each = delta[i];
					for (j = 0; j < newInteractiveState.length; j++) {
						if (each.id === newInteractiveState[j].id) {
							newInteractiveState[j] = each;
							added = true;
						}
					}
					if (!added) newInteractiveState.push(each);
					added = false;
				}
				return newInteractiveState;
			}
		}, {
			key: "handleFocus",
			value: function handleFocus(focus) {
				// console.log(focus);interactive
				this.setState({
					focus: focus
				});
			}
		}, {
			key: "render",
			value: function render() {
				var _this4 = this;
	
				var children = _react2["default"].Children.map(this.props.children, function (child) {
					var newChild = (0, _utilsUtils.isReactVersion13)() ? _react2["default"].withContext(_this4.getChildContext(), function () {
						return _react2["default"].createElement(child.type, (0, _objectAssign2["default"])({ key: child.key, ref: child.ref }, child.props));
					}) : child;
	
					return newChild;
				});
				return _react2["default"].createElement(
					"g",
					null,
					children
				);
			}
		}]);
	
		return EventHandler;
	})(_utilsPureComponent2["default"]);
	
	EventHandler.defaultProps = {
		defaultDataTransform: [{ transform: _transforms.DummyTransformer }]
	};
	
	EventHandler.childContextTypes = {
		plotData: _react2["default"].PropTypes.array,
		chartData: _react2["default"].PropTypes.array,
		currentItems: _react2["default"].PropTypes.array,
		show: _react2["default"].PropTypes.bool,
		mouseXY: _react2["default"].PropTypes.array,
		interval: _react2["default"].PropTypes.string,
		currentCharts: _react2["default"].PropTypes.array,
		mainChart: _react2["default"].PropTypes.number,
		width: _react2["default"].PropTypes.number.isRequired,
		height: _react2["default"].PropTypes.number.isRequired,
		chartCanvasType: _react2["default"].PropTypes.oneOf(["svg", "hybrid"]).isRequired,
		dateAccessor: _react2["default"].PropTypes.func,
	
		margin: _react2["default"].PropTypes.object.isRequired,
		dataTransform: _react2["default"].PropTypes.array,
		interactiveState: _react2["default"].PropTypes.array.isRequired,
	
		subscribe: _react2["default"].PropTypes.func,
		unsubscribe: _react2["default"].PropTypes.func,
		callbackForCanvasDraw: _react2["default"].PropTypes.func,
		getAllCanvasDrawCallback: _react2["default"].PropTypes.func,
		getCanvasContexts: _react2["default"].PropTypes.func,
		onMouseMove: _react2["default"].PropTypes.func,
		onMouseEnter: _react2["default"].PropTypes.func,
		onMouseLeave: _react2["default"].PropTypes.func,
		onZoom: _react2["default"].PropTypes.func,
		onPinchZoom: _react2["default"].PropTypes.func,
		onPanStart: _react2["default"].PropTypes.func,
		onPan: _react2["default"].PropTypes.func,
		onPanEnd: _react2["default"].PropTypes.func,
		panInProgress: _react2["default"].PropTypes.bool.isRequired,
		focus: _react2["default"].PropTypes.bool.isRequired,
		onFocus: _react2["default"].PropTypes.func,
		deltaXY: _react2["default"].PropTypes.arrayOf(Number)
	};
	
	exports["default"] = EventHandler;
	module.exports = exports["default"];

/***/ },
/* 4 */
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
/* 5 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _shallowEqual = __webpack_require__(6);
	
	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
	
	var PureComponent = (function (_React$Component) {
		_inherits(PureComponent, _React$Component);
	
		function PureComponent() {
			_classCallCheck(this, PureComponent);
	
			_get(Object.getPrototypeOf(PureComponent.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(PureComponent, [{
			key: "shouldComponentUpdate",
			value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
				return !(0, _shallowEqual2["default"])(this.props, nextProps) || !(0, _shallowEqual2["default"])(this.state, nextState) || !(0, _shallowEqual2["default"])(this.context, nextContext);
			}
		}]);
	
		return PureComponent;
	})(_react2["default"].Component);
	
	exports["default"] = PureComponent;
	module.exports = exports["default"];

/***/ },
/* 6 */
/***/ function(module, exports) {

	// https://github.com/jonschlinkert/is-equal-shallow/
	
	/*
	The MIT License (MIT)
	
	Copyright (c) 2015, Jon Schlinkert.
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
	*/
	
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	function shallowEqual(a, b) {
		if (!a && !b) {
			return true;
		}
		if (!a && b || a && !b) {
			return false;
		}
	
		var numKeysA = 0,
		    numKeysB = 0,
		    key;
		for (key in b) {
			numKeysB++;
			if ( /* !isPrimitive(b[key]) || */!a.hasOwnProperty(key) || a[key] !== b[key]) {
				// console.log(key, a, b);
				return false;
			}
		}
		for (key in a) {
			numKeysA++;
		}
		return numKeysA === numKeysB;
	};
	
	exports["default"] = shallowEqual;
	module.exports = exports["default"];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.isReactVersion13 = isReactVersion13;
	exports.isReactVersion14 = isReactVersion14;
	exports.isDefined = isDefined;
	exports.isNotDefined = isNotDefined;
	exports.sourceFunctor = sourceFunctor;
	exports.cloneMe = cloneMe;
	exports.displayNumberFormat = displayNumberFormat;
	exports.numberWithCommas = numberWithCommas;
	exports.isNumeric = isNumeric;
	exports.mergeRecursive = mergeRecursive;
	exports.touchPosition = touchPosition;
	exports.mousePosition = mousePosition;
	exports.getValue = getValue;
	exports.getClosestItem = getClosestItem;
	exports.getClosestItemIndex = getClosestItemIndex;
	exports.getClosestItemIndexes = getClosestItemIndexes;
	exports.pluck = pluck;
	exports.keysAsArray = keysAsArray;
	exports.sum = sum;
	exports.setter = setter;
	exports.getter = getter;
	exports.hexToRGBA = hexToRGBA;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _d3 = __webpack_require__(8);
	
	var _d32 = _interopRequireDefault(_d3);
	
	var _lodashGet = __webpack_require__(9);
	
	var _lodashGet2 = _interopRequireDefault(_lodashGet);
	
	var overlayColors = _d32["default"].scale.category10();
	
	exports.overlayColors = overlayColors;
	
	function isReactVersion13() {
		var version = _react2["default"].version.split(".")[1];
		return version === "13";
	}
	
	;
	
	function isReactVersion14() {
		return _react2["default"].version.split(".")[1] === "14";
	}
	
	;
	
	function isDefined(d) {
		return d !== null && typeof d != "undefined";
	}
	
	function isNotDefined(d) {
		return !isDefined(d);
	}
	
	function sourceFunctor(v) {
		var type = typeof v;
		if (type === "string" || type === "object" && Array.isArray(v)) return function (d) {
			return (0, _lodashGet2["default"])(d, v);
		};
		return _d32["default"].functor(v);
	}
	
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
	
	var displayDateFormat = _d32["default"].time.format("%Y-%m-%d");
	
	exports.displayDateFormat = displayDateFormat;
	
	function displayNumberFormat(x) {
		return numberWithCommas(x.toFixed(2));
	}
	
	;
	
	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
	;
	
	function isNumeric(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}
	
	;
	
	function mergeRecursive(obj1, obj2) {
		for (var p in obj2) {
			try {
				// Property in destination object set; update its value.
				if (obj2[p].constructor === Object) {
					obj1[p] = mergeRecursive(obj1[p], obj2[p]);
				} else {
					obj1[p] = obj2[p];
				}
			} catch (e) {
				// Property in destination object not set; create it and set its value.
				obj1[p] = obj2[p];
			}
		}
	
		return obj1;
	}
	
	;
	
	function touchPosition(touch, e) {
		var container = e.target,
		    rect = container.getBoundingClientRect(),
		    x = touch.clientX - rect.left - container.clientLeft,
		    y = touch.clientY - rect.top - container.clientTop,
		    xy = [Math.round(x), Math.round(y)];
		return xy;
	}
	
	;
	
	function mousePosition(e) {
		var container = e.currentTarget,
		    rect = container.getBoundingClientRect(),
		    x = e.clientX - rect.left - container.clientLeft,
		    y = e.clientY - rect.top - container.clientTop,
		    xy = [Math.round(x), Math.round(y)];
		return xy;
	}
	
	;
	
	function getValue(d) {
		if (d instanceof Date) {
			return d.getTime();
		}
		return d;
	}
	
	function getClosestItem(array, value, accessor) {
		var lo = 0,
		    hi = array.length - 1;
		while (hi - lo > 1) {
			var mid = Math.round((lo + hi) / 2);
			if (accessor(array[mid]) <= value) {
				lo = mid;
			} else {
				hi = mid;
			}
		}
		if (accessor(array[lo]) === value) hi = lo;
		var closest = Math.abs(accessor(array[lo]) - value) < Math.abs(accessor(array[hi]) - value) ? array[lo] : array[hi];
		// console.log(array[lo], array[hi], closest, lo, hi);
		return cloneMe(closest);
	}
	
	;
	
	function getClosestItemIndex(array, value, accessor) {
		var lo = 0,
		    hi = array.length - 1;
		while (hi - lo > 1) {
			var mid = Math.round((lo + hi) / 2);
			if (accessor(array[mid]) <= value) {
				lo = mid;
			} else {
				hi = mid;
			}
		}
		if (accessor(array[lo]) === value) hi = lo;
		var closestIndex = Math.abs(accessor(array[lo]) - value) < Math.abs(accessor(array[hi]) - value) ? lo : hi;
	
		return closestIndex;
	}
	
	;
	
	function getClosestItemIndexes(array, value, accessor) {
		var lo = 0,
		    hi = array.length - 1;
		while (hi - lo > 1) {
			var mid = Math.round((lo + hi) / 2);
			if (accessor(array[mid]) <= value) {
				lo = mid;
			} else {
				hi = mid;
			}
		}
		if (accessor(array[lo]) === value) hi = lo;
		// console.log(array[lo], array[hi], closestIndex, lo, hi);
		return {
			left: value > accessor(array[lo]) ? hi : lo,
			right: value >= accessor(array[hi]) ? hi + 1 : hi
		};
	}
	
	;
	
	function pluck(array, key) {
		return array.map(function (each) {
			return getter(each, key);
		});
	}
	
	function keysAsArray(obj) {
		return Object.keys(obj).filter(function (key) {
			return obj[key] !== null;
		}).map(function (key) {
			return obj[key];
		});
	}
	
	;
	
	function sum(array) {
		return array.reduce(function (d1, d2) {
			return d1 + d2;
		});
	}
	
	function setter(obj, subObjectKey, key, value) {
		if (subObjectKey) {
			if (obj[subObjectKey] === undefined) obj[subObjectKey] = {};
			obj[subObjectKey][key] = value;
		} else {
			obj[key] = value;
		}
	}
	
	;
	
	function getter(obj, pluckKey) {
		var keys = pluckKey.split(".");
		var value;
		keys.forEach(function (key) {
			if (!value) value = obj[key];else value = value[key];
		});
		return value;
	}
	
	;
	
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
	}
	
	;
	
	// export default Utils;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.7.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseGet = __webpack_require__(10),
	    toPath = __webpack_require__(11);
	
	/**
	 * Gets the property value of `path` on `object`. If the resolved value is
	 * `undefined` the `defaultValue` is used in its place.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, toPath(path), path + '');
	  return result === undefined ? defaultValue : result;
	}
	
	module.exports = get;


/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * lodash 3.7.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/**
	 * The base implementation of `get` without support for string paths
	 * and default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path of the property to get.
	 * @param {string} [pathKey] The key representation of path.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path, pathKey) {
	  if (object == null) {
	    return;
	  }
	  if (pathKey !== undefined && pathKey in toObject(object)) {
	    path = [pathKey];
	  }
	  var index = 0,
	      length = path.length;
	
	  while (object != null && index < length) {
	    object = object[path[index++]];
	  }
	  return (index && index == length) ? object : undefined;
	}
	
	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = baseGet;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.8.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var isArray = __webpack_require__(12);
	
	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;
	
	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;
	
	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` or `undefined` values.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  return value == null ? '' : (value + '');
	}
	
	/**
	 * Converts `value` to property path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Array} Returns the property path array.
	 */
	function toPath(value) {
	  if (isArray(value)) {
	    return value;
	  }
	  var result = [];
	  baseToString(value).replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	}
	
	module.exports = toPath;


/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/** `Object#toString` result references. */
	var arrayTag = '[object Array]',
	    funcTag = '[object Function]';
	
	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');
	
	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}
	
	module.exports = isArray;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();
	
	exports.containsChart = containsChart;
	exports.getCharts = getCharts;
	exports.getChartDataForChart = getChartDataForChart;
	exports.getCurrentItemForChart = getCurrentItemForChart;
	exports.getChartDataForChartNew = getChartDataForChartNew;
	exports.getCurrentItemForChartNew = getCurrentItemForChartNew;
	exports.getChartOrigin = getChartOrigin;
	exports.getChartDataConfig = getChartDataConfig;
	exports.getChartData = getChartData;
	exports.getChildren = getChildren;
	exports.getMainChart = getMainChart;
	exports.getClosest = getClosest;
	exports.getDimensions = getDimensions;
	exports.getChartConfigFor = getChartConfigFor;
	exports.getChartPlotFor = getChartPlotFor;
	exports.getCompareYAccessors = getCompareYAccessors;
	exports.updateComparisonData = updateComparisonData;
	exports.defineScales = defineScales;
	exports.getIndicator = getIndicator;
	exports.getXAccessor = getXAccessor;
	exports.getXYAccessors = getXYAccessors;
	exports.identifyOverlaysToAdd = identifyOverlaysToAdd;
	exports.identifyCompareBase = identifyCompareBase;
	exports.identifyCompareSeries = identifyCompareSeries;
	exports.calculateOverlays = calculateOverlays;
	exports.calculateIndicator = calculateIndicator;
	exports.updateOverlayFirstLast = updateOverlayFirstLast;
	exports.updateXScale = updateXScale;
	exports.updateYScale = updateYScale;
	exports.getCurrentItems = getCurrentItems;
	exports.getDataToPlotForDomain = getDataToPlotForDomain;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _d3 = __webpack_require__(8);
	
	var _d32 = _interopRequireDefault(_d3);
	
	var _utilsScaleUtils = __webpack_require__(14);
	
	var _utilsOverlayUtils = __webpack_require__(15);
	
	var _utils = __webpack_require__(7);
	
	var _indicatorCalculator = __webpack_require__(16);
	
	function containsChart(props) {
		return getCharts(props).length > 0;
	}
	
	;
	
	function getCharts(props) {
		return getChildren(props.children, /Chart$/);
	}
	
	;
	
	function getChartDataForChart(props, context) {
		return getChartDataForChartNew(context.chartData, props.forChart);
	}
	
	;
	
	function getCurrentItemForChart(props, context) {
		return getCurrentItemForChartNew(context.currentItems, props.forChart);
	}
	
	;
	
	function getChartDataForChartNew(chartData, chartId) {
		return chartData.filter(function (each) {
			return each.id === chartId;
		})[0];
	}
	
	;
	
	function getCurrentItemForChartNew(currentItems, chartId) {
		var currentItem = currentItems.filter(function (each) {
			return each.id === chartId;
		})[0];
		var item = currentItem !== undefined ? currentItem.data : {};
		return item;
	}
	
	;
	
	function getChartOrigin(origin, contextWidth, contextHeight) {
		var originCoordinates = typeof origin === "function" ? origin(contextWidth, contextHeight) : origin;
		return originCoordinates;
	}
	
	;
	
	function getChartDataConfig(props, innerDimensions, other) {
		var charts = getCharts(props);
		return charts.map(function (each) {
			return {
				id: each.props.id,
				config: getChartConfigFor(innerDimensions, each.props, other)
			};
		});
	}
	
	;
	
	function getChartData(props, innerDimensions, partialData, fullData, other, domainL, domainR) {
		var charts = getCharts(props);
		calculateChange(fullData);
		return charts.map(function (each) {
			var chartProps = each.props;
	
			var config = getChartConfigFor(innerDimensions, chartProps, other);
			calculateOverlays(fullData, config.overlays);
			var scaleType = defineScales(chartProps, partialData, other);
	
			// console.log(config.compareSeries);
	
			var plot = getChartPlotFor(config, scaleType, partialData, domainL, domainR);
	
			return {
				id: each.props.id,
				config: config,
				scaleType: scaleType,
				plot: plot
			};
		});
	}
	
	;
	
	function getChildren(children, regex) {
		var matchingChildren = [];
		_react2["default"].Children.forEach(children, function (child) {
			if (_react2["default"].isValidElement(child) && regex.test(child.props.namespace)) matchingChildren.push(child);
		});
		return matchingChildren;
	}
	
	;
	
	function getMainChart(children) {
		var eventCapture = getChildren(children, /EventCapture$/);
		if (eventCapture.length > 1) throw new Error("only one EventCapture allowed");
		if (eventCapture.length > 0) return eventCapture[0].props.mainChart;
		if (eventCapture.length === 0) return getChildren(children, /Chart$/)[0].props.id;
	}
	
	;
	
	function getClosest(plotData, mouseXY, chartData) {
		// console.log(chartData);
		var xValue = chartData.plot.scales.xScale.invert(mouseXY[0]);
		var item = (0, _utils.getClosestItem)(plotData, xValue, chartData.config.xAccessor);
		return item;
	}
	
	;
	
	function getDimensions(innerDimension, chartProps) {
	
		var availableWidth = innerDimension.width;
		var availableHeight = innerDimension.height;
	
		var fullWidth = chartProps.width || availableWidth;
		var fullHeight = chartProps.height || availableHeight;
	
		return {
			availableWidth: availableWidth,
			availableHeight: availableHeight,
			width: fullWidth,
			height: fullHeight
		};
	}
	
	;
	
	function getChartConfigFor(innerDimension, chartProps, other) {
		var padding = chartProps.padding;
		var yDomainUpdate = chartProps.yDomainUpdate;
		var xDomainUpdate = chartProps.xDomainUpdate;
	
		var dimensions = getDimensions(innerDimension, chartProps);
		var xAccessor = getXAccessor(chartProps, other);
		var overlaysToAdd = identifyOverlaysToAdd(chartProps);
		var compareBase = identifyCompareBase(chartProps);
		var compareSeries = identifyCompareSeries(chartProps);
	
		var origin = typeof chartProps.origin === "function" ? chartProps.origin(dimensions.availableWidth, dimensions.availableHeight) : chartProps.origin;
	
		var indicatorsWithTicks = overlaysToAdd.filter(function (overlay) {
			return overlay.indicator !== undefined;
		}).filter(function (overlay) {
			return overlay.indicator.yTicks !== undefined;
		});
	
		var yTicks;
		if (indicatorsWithTicks.length > 0) {
			yTicks = indicatorsWithTicks.map(function (overlay) {
				return overlay.indicator.yTicks();
			}).reduce(function (ticks1, ticks2) {
				return ticks1.concat(ticks2);
			});
		}
	
		var config = {
			width: dimensions.width,
			height: dimensions.height,
			mouseCoordinates: {
				at: chartProps.yMousePointerDisplayLocation,
				format: chartProps.yMousePointerDisplayFormat
			},
			yDomainUpdate: yDomainUpdate,
			xDomainUpdate: xDomainUpdate,
			origin: origin,
			padding: padding,
			xAccessor: xAccessor,
			overlays: overlaysToAdd,
			compareBase: compareBase,
			compareSeries: compareSeries,
			yTicks: yTicks
		};
		return config;
	}
	
	;
	
	function getChartPlotFor(config, scaleType, partialData, domainL, domainR) {
		var yaccessors = (0, _utils.pluck)((0, _utils.keysAsArray)(config.overlays), "yAccessor");
		// console.log(yaccessors);
		if (config.compareSeries.length > 0) {
			updateComparisonData(partialData, config.compareBase, config.compareSeries);
			yaccessors = [function (d) {
				return d.compare;
			}];
		}
		var xyValues = (0, _utilsScaleUtils.flattenData)(partialData, [config.xAccessor], yaccessors);
	
		var overlayValues = updateOverlayFirstLast(partialData, config.overlays);
		var indicators = (0, _utils.pluck)((0, _utils.keysAsArray)(config.overlays), "indicator");
		var domains = indicators.filter(function (indicator) {
			return indicator !== undefined;
		}).filter(function (indicator) {
			return indicator.domain !== undefined;
		}).map(function (indicator) {
			return indicator.domain();
		});
	
		//MINDOMAIN GET
		var minDomains = indicators.filter(function (indicator) {
			return indicator !== undefined;
		}).filter(function (indicator) {
			return indicator.minDomain !== undefined;
		}).map(function (indicator) {
			return indicator.minDomain();
		});
		//END
	
		var domain;
		if (domains.length > 0) {
			domain = domains.reduce(function (a, b) {
				return [Math.min(a[0], b[0]), Math.max(a[1], b[1])];
			});
		}
	
		//MINDOMAIN GET
		var minDomain;
		if (minDomains.length > 0) {
			minDomain = minDomains.reduce(function (a, b) {
				return [Math.min(a[0], b[0]), Math.max(a[1], b[1])];
			});
		}
		//END
	
		if (!config.yDomainUpdate) {
			domain = scaleType.yScale.domain();
		}
	
		var scales = {
			xScale: updateXScale(xyValues.xValues, scaleType.xScale, partialData, config.width, config.padding),
			yScale: updateYScale(xyValues.yValues, scaleType.yScale, partialData, config.height, config.padding, domain, minDomain)
		};
	
		if (domainL !== undefined && domainR !== undefined) {
			scales.xScale.domain([domainL, domainR]);
		}
	
		var plot = {
			overlayValues: overlayValues,
			scales: scales
		};
		return plot;
	}
	
	;
	
	function getCompareYAccessors(compareWith) {
		var yAccessors = compareWith.map(function (eachCompare) {
			return function (d) {
				return d["compare_" + eachCompare.id + "_percent"];
			};
		});
		yAccessors.push(function (d) {
			return d.compare_base_percent;
		});
		return yAccessors;
	}
	
	;
	
	function updateComparisonData(partialData, compareBase, compareSeries) {
		var first = partialData[0];
		var base = compareBase(first);
	
		partialData.forEach(function (d) {
			d.compare = {};
	
			d.compare.open = (d.open - base) / base;
			d.compare.high = (d.high - base) / base;
			d.compare.low = (d.low - base) / base;
			d.compare.close = (d.close - base) / base;
	
			compareSeries.forEach(function (eachSeries) {
				var key = "compare_" + eachSeries.id;
				d.compare[key] = (eachSeries.yAccessor(d) - eachSeries.yAccessor(first)) / eachSeries.yAccessor(first);
			});
		});
	}
	
	;
	
	function defineScales(props, data, passThroughProps) {
		var xScale = props.xScale,
		    yScale = props.yScale;
	
		if (xScale === undefined && passThroughProps) xScale = passThroughProps.xScale;
	
		if (xScale === undefined) {
			var each = data[0];
			if (typeof each === "object") {
				Object.keys(each).forEach(function (key) {
					if (Object.prototype.toString.call(each[key]) === "[object Date]") {
						xScale = _d32["default"].time.scale();
					}
				});
			}
			if (xScale === undefined) xScale = _d32["default"].scale.linear();
			// xScale = polyLinearTimeScale();
		}
	
		return { xScale: xScale, yScale: yScale };
	}
	
	;
	
	function getIndicator(props) {
		var indicator; // = new Array();
		_react2["default"].Children.forEach(props.children, function (child) {
			if (["ReStock.DataSeries"].indexOf(child.props.namespace) > -1) {
	
				if (child.props && child.props.indicator) {
					var indicatorProp = child.props.indicator;
					indicator = indicatorProp(child.props.options, props, child.props);
				}
			}
		});
		return indicator;
	}
	
	;
	
	function getXAccessor(props, passThroughProps) {
		var xAccessor = passThroughProps !== undefined && passThroughProps.xAccessor || props.xAccessor !== undefined && props.xAccessor;
		return xAccessor;
	}
	
	;
	
	function getXYAccessors(props, passThroughProps, indicator) {
		var accessor = { xAccessor: null, yAccessor: null };
	
		_react2["default"].Children.forEach(props.children, function (child) {
			if (["ReStock.DataSeries"].indexOf(child.props.namespace) > -1) {
				if (child.props) {
	
					var xAccessor = passThroughProps !== undefined && passThroughProps.xAccessor ? passThroughProps.xAccessor : child.props.xAccessor;
					accessor.xAccessor = xAccessor;
					accessor.yAccessor = child.props.yAccessor;
				}
			}
		});
		if (!accessor.yAccessor && indicator) {
			accessor.yAccessor = indicator.yAccessor();
		}
		// if (indicator) console.log(indicator.yAccessor());
	
		return accessor;
	}
	
	;
	
	function identifyOverlaysToAdd(chartProps) {
		var overlaysToAdd = [];
		_react2["default"].Children.forEach(chartProps.children, function (child) {
			if (_react2["default"].isValidElement(child) && /DataSeries$/.test(child.props.namespace)) {
				var yAccessor = child.props.yAccessor;
	
				var indicatorProp = child.props.indicator;
				if (yAccessor === undefined && indicatorProp === undefined) {
					console.error("Either have yAccessor or indicator which provides a yAccessor for Chart " + chartProps.id + " DataSeries " + child.props.id);
				}
				var indicator = indicatorProp !== undefined ? indicatorProp(child.props.options, chartProps, child.props) : undefined;
				var _child$props = child.props;
				var stroke = _child$props.stroke;
				var fill = _child$props.fill;
	
				if (stroke === undefined && indicator !== undefined && indicator.stroke !== undefined) stroke = indicator.stroke();
				if (fill === undefined && indicator !== undefined && indicator.fill !== undefined) fill = indicator.fill();
				var overlay = {
					id: child.props.id,
					chartId: chartProps.id,
					yAccessor: yAccessor || indicator.yAccessor(),
					indicator: indicator,
					stroke: stroke,
					fill: fill
				};
				// console.error(overlay.id, overlay.chartId, overlay.stroke, indicator);
				// stroke: indicator.options().stroke || overlayColors(child.props.id)
				overlaysToAdd.push(overlay);
			}
		});
		return overlaysToAdd;
	}
	
	;
	
	function identifyCompareBase(props) {
		var compareBase;
		_react2["default"].Children.forEach(props.children, function (child) {
			if (_react2["default"].isValidElement(child) && /DataSeries$/.test(child.props.namespace)) {
				compareBase = child.props.compareBase;
			}
		});
		return compareBase;
	}
	
	;
	
	function identifyCompareSeries(props) {
		var overlaysToAdd = [];
		_react2["default"].Children.forEach(props.children, function (child) {
			if (_react2["default"].isValidElement(child) && /DataSeries$/.test(child.props.namespace)) {
				_react2["default"].Children.forEach(child.props.children, function (grandChild) {
					if (_react2["default"].isValidElement(grandChild) && /CompareSeries$/.test(grandChild.props.namespace)) {
						overlaysToAdd.push({
							yAccessor: grandChild.props.yAccessor,
							id: grandChild.props.id,
							stroke: grandChild.props.stroke || (0, _utils.overlayColors)(grandChild.props.id),
							displayLabel: grandChild.props.displayLabel,
							percentYAccessor: function percentYAccessor(d) {
								return d.compare["compare_" + grandChild.props.id];
							}
						});
					}
				});
			}
		});
		return overlaysToAdd;
	}
	
	;
	
	function calculateOverlays(fullData, overlays) {
		if (Array.isArray(fullData)) {
			overlays.filter(function (eachOverlay) {
				return eachOverlay.id !== undefined;
			}).forEach(function (overlay) {
				overlay.indicator.calculate(fullData);
			});
		} else {
			Object.keys(fullData).filter(function (key) {
				return ["D", "W", "M"].indexOf(key) > -1;
			}).forEach(function (key) {
				overlays.filter(function (eachOverlay) {
					return eachOverlay.indicator !== undefined;
				}).forEach(function (overlay) {
					overlay.indicator.calculate(fullData[key]);
				});
			});
		}
		// console.table(fullData.M);
		// console.log(overlays);
	}
	
	;
	
	function calculateChange(fullData) {
		Object.keys(fullData).filter(function (key) {
			return ["D", "W", "M"].indexOf(key) > -1;
		}).forEach(function (key) {
			var changeAlgorithm = (0, _indicatorCalculator.slidingWindow)().windowSize(2).accumulator(function (_ref) {
				var _ref2 = _slicedToArray(_ref, 2);
	
				var prev = _ref2[0];
				var now = _ref2[1];
				return {
					absolute: now.close - prev.close,
					percent: (now.close - prev.close) / prev.close * 100
				};
			});
	
			var changeCalculator = (0, _indicatorCalculator.merge)().algorithm(changeAlgorithm).mergePath("change");
	
			changeCalculator(fullData[key]);
			// console.log(fullData[key][20]);
		});
	}
	
	function calculateIndicator(fullData, indicator) {
		Object.keys(fullData).filter(function (key) {
			return ["D", "W", "M"].indexOf(key) > -1;
		}).forEach(function (key) {
			if (indicator) indicator.calculate(fullData[key]);
		});
	}
	
	;
	
	function updateOverlayFirstLast(data, overlays) {
		// console.log("updateOverlayFirstLast");
		var overlayValues = [];
	
		overlays.forEach(function (eachOverlay) {
			// console.log(JSON.stringify(first), Object.keys(first), yAccessor(first));
			overlayValues.push({
				id: eachOverlay.id,
				first: (0, _utilsOverlayUtils.firstDefined)(data, eachOverlay.yAccessor),
				last: (0, _utilsOverlayUtils.lastDefined)(data, eachOverlay.yAccessor)
			});
		});
		return overlayValues;
	}
	
	;
	
	function updateXScale(xValues, xScale, data, width, padding, overrideXDomain) {
		// overrideXDomain is currently ignored
		var copy = xScale.copy();
		copy.range([padding.left, width - padding.right]);
		// if polylinear scale then set data
		if (copy.isPolyLinear && copy.isPolyLinear()) {
			copy.data(data);
		} else {
			// else set the domain
			copy.domain(_d32["default"].extent(xValues));
		}
		return copy;
	}
	
	;
	
	function updateYScale(yValues, yScale, data, height, padding, overrideYDomain, minDomain) {
		var copy = yScale.copy();
	
		copy.range([height - padding.top, padding.bottom]);
	
		if ((0, _utils.isDefined)(overrideYDomain)) {
	
			copy.domain(overrideYDomain);
		} else if ((0, _utils.isDefined)(minDomain)) {
			var _domain = _d32["default"].extent(yValues);
			if (_domain[0] < minDomain[0]) {
				minDomain[0] = _domain[0];
			}
			if (_domain[1] > minDomain[1]) {
				minDomain[1] = _domain[1];
			}
			copy.domain(minDomain);
		} else {
			var domain = _d32["default"].extent(yValues);
			copy.domain(domain);
		}
	
		return copy;
	}
	
	;
	
	function getCurrentItems(chartData, mouseXY, plotData) {
		return chartData.map(function (eachChartData) {
			var xValue = eachChartData.plot.scales.xScale.invert(mouseXY[0]);
			var item = (0, _utils.getClosestItem)(plotData, xValue, eachChartData.config.xAccessor);
			return { id: eachChartData.id, data: item };
		});
	}
	
	;
	
	function getDataToPlotForDomain(domainL, domainR, data, width, xAccessor) {
		var threshold = 0.5; // number of datapoints per 1 px
		var allowedIntervals = ["D", "W", "M"];
		// console.log(domainL, domainR, data, width);
	
		var dataForInterval, filteredData, interval, leftIndex, rightIndex;
	
		for (var i = 0; i < allowedIntervals.length; i++) {
			if (!data[allowedIntervals[i]]) continue;
			interval = allowedIntervals[i];
			dataForInterval = data[interval];
	
			leftIndex = (0, _utils.getClosestItemIndexes)(dataForInterval, domainL, xAccessor).left;
			rightIndex = (0, _utils.getClosestItemIndexes)(dataForInterval, domainR, xAccessor).right;
	
			// leftIndex = leftX.left;
			// rightIndex = rightX.right;
	
			filteredData = dataForInterval.slice(leftIndex, rightIndex);
	
			// console.log(filteredData.length, width * threshold);
			if (filteredData.length < width * threshold) break;
		}
	
		// console.log(leftX, rightX,  (dd[leftX.left]), xAccessor(dd[rightX.right]));
	
		return {
			interval: interval,
			data: filteredData,
			leftIndex: leftIndex,
			rightIndex: rightIndex
		};
	}
	
	;

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.flattenData = flattenData;
	function pushToValues(values, eachValue) {
		if (typeof eachValue === "object" && Object.keys(eachValue).length > 0) {
			Object.keys(eachValue).forEach(function (key) {
				if (!isNaN(eachValue[key])) {
					values.push(eachValue[key]);
				}
			});
		} else {
			if (!isNaN(eachValue)) {
				values.push(eachValue);
			}
		}
	}
	
	function flattenData(data, xAccessors, yAccessors) {
		// console.log(xAccessors, yAccessors);
		var xValues = [];
		var yValues = [];
		data.forEach(function (row) {
			xAccessors.forEach(function (xAccessor) {
				var x = xAccessor(row);
				if (x !== undefined) {
					pushToValues(xValues, x);
				}
			});
			yAccessors.forEach(function (yAccessor) {
				var y = yAccessor(row);
				if (y !== undefined) {
					pushToValues(yValues, y);
				}
			});
		});
		return {
			xValues: xValues,
			yValues: yValues
		};
	}
	
	;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.getToolTipLabel = getToolTipLabel;
	exports.getYAccessorKey = getYAccessorKey;
	exports.firstDefined = firstDefined;
	exports.lastDefined = lastDefined;
	
	var _utils = __webpack_require__(7);
	
	function getToolTipLabel(props) {
		if (props.type === "sma" || props.type === "ema") {
			var tooltip = props.type.toUpperCase() + "(" + props.options.period + ")";
			return tooltip;
		}
		return "N/A";
	}
	
	;
	
	function getYAccessorKey(chartId, props) {
		if (props.type === "sma" || props.type === "ema") {
			var key = props.type + props.options.period + "_chart_" + chartId;
			return key;
		}
		return false;
	}
	
	;
	
	function firstDefined(data, accessor) {
		var each;
		for (var i = 0; i < data.length; i++) {
			if (accessor(data[i]) === undefined) continue;
			each = data[i];
			// console.log(i, each, accessor(each));
			break;
		}
		return (0, _utils.cloneMe)(each);
	}
	
	;
	
	function lastDefined(data, accessor) {
		var each;
		for (var i = data.length - 1; i >= 0; i--) {
			if (accessor(data[i]) === undefined) continue;
			each = data[i];
			// console.log(i, each, accessor(each));
			break;
		}
		return (0, _utils.cloneMe)(each);
	}
	
	;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _slidingWindow = __webpack_require__(17);
	
	var _slidingWindow2 = _interopRequireDefault(_slidingWindow);
	
	var _merge = __webpack_require__(20);
	
	var _merge2 = _interopRequireDefault(_merge);
	
	var _ema = __webpack_require__(25);
	
	var _ema2 = _interopRequireDefault(_ema);
	
	var _macd = __webpack_require__(26);
	
	var _macd2 = _interopRequireDefault(_macd);
	
	var _bollingerband = __webpack_require__(28);
	
	var _bollingerband2 = _interopRequireDefault(_bollingerband);
	
	var _rsi = __webpack_require__(30);
	
	var _rsi2 = _interopRequireDefault(_rsi);
	
	var _sto = __webpack_require__(31);
	
	var _sto2 = _interopRequireDefault(_sto);
	
	var _atr = __webpack_require__(32);
	
	var _atr2 = _interopRequireDefault(_atr);
	
	var _forceIndex = __webpack_require__(33);
	
	var _forceIndex2 = _interopRequireDefault(_forceIndex);
	
	var _elderRay = __webpack_require__(34);
	
	var _elderRay2 = _interopRequireDefault(_elderRay);
	
	var _zipper = __webpack_require__(24);
	
	var _zipper2 = _interopRequireDefault(_zipper);
	
	exports.slidingWindow = _slidingWindow2["default"];
	exports.merge = _merge2["default"];
	exports.ema = _ema2["default"];
	exports.macd = _macd2["default"];
	exports.bollingerband = _bollingerband2["default"];
	exports.rsi = _rsi2["default"];
	exports.sto = _sto2["default"];
	exports.atr = _atr2["default"];
	exports.forceIndex = _forceIndex2["default"];
	exports.elderRay = _elderRay2["default"];
	exports.zipper = _zipper2["default"];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	/*
	
	Taken from https://github.com/ScottLogic/d3fc/blob/master/src/indicator/algorithm/calculator/slidingWindow.js
	
	The MIT License (MIT)
	
	Copyright (c) 2014-2015 Scott Logic Ltd.
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
	
	*/
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _d3 = __webpack_require__(8);
	
	var _d32 = _interopRequireDefault(_d3);
	
	var _noop = __webpack_require__(18);
	
	var _noop2 = _interopRequireDefault(_noop);
	
	var _identity = __webpack_require__(19);
	
	var _identity2 = _interopRequireDefault(_identity);
	
	exports["default"] = function () {
	
		var undefinedValue = _d32["default"].functor(undefined),
		    windowSize = _d32["default"].functor(10),
		    accumulator = _noop2["default"],
		    value = _identity2["default"],
		    skipInitial = 0;
	
		var slidingWindow = function slidingWindow(data) {
			var size = windowSize.apply(this, arguments);
			var windowData = data.slice(skipInitial, size + skipInitial).map(value);
			// console.log(skipInitial, size, data.length, windowData.length);
			return data.map(function (d, i) {
				if (i < skipInitial + size - 1) {
					return undefinedValue(d, i);
				}
				if (i >= skipInitial + size) {
					// Treat windowData as FIFO rolling buffer
					windowData.shift();
					windowData.push(value(d, i));
				}
				return accumulator(windowData);
			});
		};
	
		slidingWindow.undefinedValue = function (x) {
			if (!arguments.length) {
				return undefinedValue;
			}
			undefinedValue = _d32["default"].functor(x);
			return slidingWindow;
		};
		slidingWindow.windowSize = function (x) {
			if (!arguments.length) {
				return windowSize;
			}
			windowSize = _d32["default"].functor(x);
			return slidingWindow;
		};
		slidingWindow.accumulator = function (x) {
			if (!arguments.length) {
				return accumulator;
			}
			accumulator = x;
			return slidingWindow;
		};
		slidingWindow.skipInitial = function (x) {
			if (!arguments.length) {
				return skipInitial;
			}
			skipInitial = x;
			return slidingWindow;
		};
		slidingWindow.value = function (x) {
			if (!arguments.length) {
				return value;
			}
			value = x;
			return slidingWindow;
		};
	
		return slidingWindow;
	};
	
	module.exports = exports["default"];

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports["default"] = function (d) {};
	
	module.exports = exports["default"];

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports["default"] = function (d) {
	  return d;
	};
	
	module.exports = exports["default"];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/*
	https://github.com/ScottLogic/d3fc/blob/master/src/indicator/algorithm/merge.js
	
	The MIT License (MIT)
	
	Copyright (c) 2014-2015 Scott Logic Ltd.
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
	*/
	
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _d3 = __webpack_require__(8);
	
	var _d32 = _interopRequireDefault(_d3);
	
	var _lodashSet = __webpack_require__(21);
	
	var _lodashSet2 = _interopRequireDefault(_lodashSet);
	
	var _slidingWindow = __webpack_require__(17);
	
	var _slidingWindow2 = _interopRequireDefault(_slidingWindow);
	
	var _identity = __webpack_require__(19);
	
	var _identity2 = _interopRequireDefault(_identity);
	
	var _zipper = __webpack_require__(24);
	
	var _zipper2 = _interopRequireDefault(_zipper);
	
	var _utilsUtils = __webpack_require__(7);
	
	// applies an algorithm to an array, merging the result back into
	// the source array using the given merge function.
	
	exports["default"] = function () {
	
		var algorithm = (0, _slidingWindow2["default"])(),
		    mergePath = [],
		    clean = _identity2["default"];
	
		function merge(datum, indicator) {
			if ((0, _utilsUtils.isDefined)(indicator) && (0, _utilsUtils.isDefined)(clean(indicator))) {
				return (0, _lodashSet2["default"])(datum, mergePath, indicator);
			}
			return datum;
		};
	
		function mergeCompute(data) {
			var zip = (0, _zipper2["default"])().combine(merge);
	
			return zip(data, algorithm(data));
		};
	
		mergeCompute.algorithm = function (x) {
			if (!arguments.length) {
				return algorithm;
			}
			algorithm = x;
			return mergeCompute;
		};
	
		mergeCompute.merge = function (x) {
			if (!arguments.length) {
				return merge;
			}
			merge = x;
			return mergeCompute;
		};
	
		mergeCompute.clean = function (x) {
			if (!arguments.length) {
				return clean;
			}
			clean = x;
			return mergeCompute;
		};
	
		mergeCompute.mergePath = function (x) {
			if (!arguments.length) {
				return mergePath;
			}
			mergePath = x;
			return mergeCompute;
		};
	
		return mergeCompute;
	};
	
	module.exports = exports["default"];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.7.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var toPath = __webpack_require__(22),
	    isArray = __webpack_require__(23);
	
	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;
	
	/**
	 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}
	
	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  var type = typeof value;
	  if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
	    return true;
	  }
	  if (isArray(value)) {
	    return false;
	  }
	  var result = !reIsDeepProp.test(value);
	  return result || (object != null && value in toObject(object));
	}
	
	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Sets the property value of `path` on `object`. If a portion of `path`
	 * does not exist it is created.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to augment.
	 * @param {Array|string} path The path of the property to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.set(object, 'a[0].b.c', 4);
	 * console.log(object.a[0].b.c);
	 * // => 4
	 *
	 * _.set(object, 'x[0].y.z', 5);
	 * console.log(object.x[0].y.z);
	 * // => 5
	 */
	function set(object, path, value) {
	  if (object == null) {
	    return object;
	  }
	  var pathKey = (path + '');
	  path = (object[pathKey] != null || isKey(path, object)) ? [pathKey] : toPath(path);
	
	  var index = -1,
	      length = path.length,
	      lastIndex = length - 1,
	      nested = object;
	
	  while (nested != null && ++index < length) {
	    var key = path[index];
	    if (isObject(nested)) {
	      if (index == lastIndex) {
	        nested[key] = value;
	      } else if (nested[key] == null) {
	        nested[key] = isIndex(path[index + 1]) ? [] : {};
	      }
	    }
	    nested = nested[key];
	  }
	  return object;
	}
	
	module.exports = set;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.8.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var isArray = __webpack_require__(23);
	
	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;
	
	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;
	
	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` or `undefined` values.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  return value == null ? '' : (value + '');
	}
	
	/**
	 * Converts `value` to property path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Array} Returns the property path array.
	 */
	function toPath(value) {
	  if (isArray(value)) {
	    return value;
	  }
	  var result = [];
	  baseToString(value).replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	}
	
	module.exports = toPath;


/***/ },
/* 23 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/** `Object#toString` result references. */
	var arrayTag = '[object Array]',
	    funcTag = '[object Function]';
	
	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');
	
	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}
	
	module.exports = isArray;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	/* an extension to d3.zip so we call a function instead of an array */
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports["default"] = zipper;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _d3 = __webpack_require__(8);
	
	var _d32 = _interopRequireDefault(_d3);
	
	var _identity = __webpack_require__(19);
	
	var _identity2 = _interopRequireDefault(_identity);
	
	function zipper() {
		var combine = _identity2["default"];
	
		function zip() {
			if (!(n = arguments.length)) return [];
			for (var i = -1, m = _d32["default"].min(arguments, d3_zipLength), zips = new Array(m); ++i < m;) {
				for (var j = -1, n, zip = zips[i] = new Array(n); ++j < n;) {
					zip[j] = arguments[j][i];
				}
				zips[i] = combine.apply(this, zips[i]);
			}
			return zips;
		};
		function d3_zipLength(d) {
			return d.length;
		}
		zip.combine = function (x) {
			if (!arguments.length) {
				return combine;
			}
			combine = x;
			return zip;
		};
		return zip;
	}
	
	;
	module.exports = exports["default"];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	/*
	https://github.com/ScottLogic/d3fc/blob/master/src/indicator/algorithm/calculator/exponentialMovingAverage.js
	
	The MIT License (MIT)
	
	Copyright (c) 2014-2015 Scott Logic Ltd.
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
	*/
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _identity = __webpack_require__(19);
	
	var _identity2 = _interopRequireDefault(_identity);
	
	var _utilsUtils = __webpack_require__(7);
	
	exports["default"] = function () {
	
		var windowSize = 9,
		    value = _identity2["default"];
	
		function calculator(data) {
	
			var alpha = 2 / (windowSize + 1);
			var previous;
			var initialAccumulator = 0;
			var skip = 0;
	
			return data.map(function (d, i) {
				var v = value(d, i);
				if ((0, _utilsUtils.isNotDefined)(previous) && (0, _utilsUtils.isNotDefined)(v)) {
					skip++;
					return undefined;
				} else if (i < windowSize + skip - 1) {
					initialAccumulator += v;
					return undefined;
				} else if (i === windowSize + skip - 1) {
					initialAccumulator += v;
					var initialValue = initialAccumulator / windowSize;
					previous = initialValue;
					return initialValue;
				} else {
					var nextValue = v * alpha + (1 - alpha) * previous;
					previous = nextValue;
					return nextValue;
				}
			});
		};
	
		calculator.windowSize = function (x) {
			if (!arguments.length) {
				return windowSize;
			}
			windowSize = x;
			return calculator;
		};
	
		calculator.value = function (x) {
			if (!arguments.length) {
				return value;
			}
			value = x;
			return calculator;
		};
	
		return calculator;
	};
	
	module.exports = exports["default"];

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	/*
	https://github.com/ScottLogic/d3fc/blob/master/src/indicator/algorithm/calculator/macd.js
	
	The MIT License (MIT)
	
	Copyright (c) 2014-2015 Scott Logic Ltd.
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
	*/
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _identity = __webpack_require__(19);
	
	var _identity2 = _interopRequireDefault(_identity);
	
	var _ema = __webpack_require__(25);
	
	var _ema2 = _interopRequireDefault(_ema);
	
	var _zipper = __webpack_require__(24);
	
	var _zipper2 = _interopRequireDefault(_zipper);
	
	var _utilsUtils = __webpack_require__(7);
	
	var _defaultOptions = __webpack_require__(27);
	
	exports["default"] = function () {
		var fast = _defaultOptions.MACD.fast;
		var slow = _defaultOptions.MACD.slow;
		var signal = _defaultOptions.MACD.signal;
	
		var value = _identity2["default"];
	
		function calculator(data) {
	
			var fastEMA = (0, _ema2["default"])().windowSize(fast).value(value);
			var slowEMA = (0, _ema2["default"])().windowSize(slow).value(value);
			var signalEMA = (0, _ema2["default"])().windowSize(signal);
	
			var macdLineCalculator = (0, _zipper2["default"])().combine(function (fastEMA, slowEMA) {
				return (0, _utilsUtils.isDefined)(fastEMA) && (0, _utilsUtils.isDefined)(slowEMA) ? fastEMA - slowEMA : undefined;
			});
	
			var macdLine = macdLineCalculator(fastEMA(data), slowEMA(data));
	
			var undefinedArray = new Array(slow);
			var signalLine = undefinedArray.concat(signalEMA(macdLine.slice(slow)));
	
			var zip = (0, _zipper2["default"])().combine(function (macd, signal) {
				return {
					MACDLine: macd,
					signalLine: signal,
					histogram: (0, _utilsUtils.isDefined)(macd) && (0, _utilsUtils.isDefined)(signal) ? macd - signal : undefined
				};
			});
	
			var macd = zip(macdLine, signalLine);
	
			return macd;
		};
	
		calculator.windowSize = function (x) {
			if (!arguments.length) {
				return windowSize;
			}
			windowSize = x;
			return calculator;
		};
	
		calculator.fast = function (x) {
			if (!arguments.length) {
				return fast;
			}
			fast = x;
			return calculator;
		};
	
		calculator.slow = function (x) {
			if (!arguments.length) {
				return slow;
			}
			slow = x;
			return calculator;
		};
	
		calculator.signal = function (x) {
			if (!arguments.length) {
				return signal;
			}
			signal = x;
			return calculator;
		};
	
		calculator.value = function (x) {
			if (!arguments.length) {
				return value;
			}
			value = x;
			return calculator;
		};
	
		return calculator;
	};
	
	module.exports = exports["default"];

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var BollingerBand = {
		period: 20,
		source: "close", // "high", "low", "open", "close"
		multiplier: 2,
		movingAverageType: "sma"
	};
	
	exports.BollingerBand = BollingerBand;
	var ATR = {
		period: 14
	};
	
	exports.ATR = ATR;
	var ForceIndex = {
		source: "close", // "high", "low", "open", "close"
		volume: function volume(d) {
			return d.volume;
		}
	};
	
	exports.ForceIndex = ForceIndex;
	var ElderRay = {
		period: 13,
		source: "close", // "high", "low", "open", "close"
		movingAverageType: "ema",
		ohlc: function ohlc(d) {
			return { open: d.open, high: d.high, low: d.low, close: d.close };
		}
	};
	
	exports.ElderRay = ElderRay;
	var ElderImpulse = {
		stroke: {
			up: "#6BA583",
			down: "#FF0000",
			neutral: "#0000FF"
		}
	};
	
	exports.ElderImpulse = ElderImpulse;
	var MACD = {
		fast: 12,
		slow: 26,
		signal: 9,
		source: "close", // "high", "low", "open", "close"
		fill: {
			histogram: "#4682B4"
		},
		stroke: {
			MACDLine: "#FF0000",
			signalLine: "#00F300"
		}
	};
	
	exports.MACD = MACD;
	var FullStochasticOscillator = {
		period: 12,
		K: 3,
		D: 3,
		ohlc: function ohlc(d) {
			return { open: d.open, high: d.high, low: d.low, close: d.close };
		},
		stroke: {
			D: "#17becf",
			K: "#ff7f0e"
		},
		overSold: 80,
		overBought: 20
	};
	
	exports.FullStochasticOscillator = FullStochasticOscillator;
	var RSI = {
		period: 14,
		source: "close", // "high", "low", "open", "close"
		overSold: 70,
		overBought: 30
	};
	
	exports.RSI = RSI;
	var EMA = {
		source: "close", // "high", "low", "open", "close"
		period: 10
	};
	
	exports.EMA = EMA;
	var SMA = {
		source: "close", // "high", "low", "open", "close"
		period: 10
	};
	exports.SMA = SMA;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	/*
	https://github.com/ScottLogic/d3fc/blob/master/src/indicator/algorithm/calculator/bollingerBands.js
	
	The MIT License (MIT)
	
	Copyright (c) 2014-2015 Scott Logic Ltd.
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
	*/
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _lodashLast = __webpack_require__(29);
	
	var _lodashLast2 = _interopRequireDefault(_lodashLast);
	
	var _d3 = __webpack_require__(8);
	
	var _d32 = _interopRequireDefault(_d3);
	
	var _identity = __webpack_require__(19);
	
	var _identity2 = _interopRequireDefault(_identity);
	
	var _slidingWindow = __webpack_require__(17);
	
	var _slidingWindow2 = _interopRequireDefault(_slidingWindow);
	
	var _ema = __webpack_require__(25);
	
	var _ema2 = _interopRequireDefault(_ema);
	
	var _zipper = __webpack_require__(24);
	
	var _zipper2 = _interopRequireDefault(_zipper);
	
	var _defaultOptions = __webpack_require__(27);
	
	exports["default"] = function () {
		var windowSize = _defaultOptions.BollingerBand.period;
		var multiplier = _defaultOptions.BollingerBand.multiplier;
		var movingAverageType = _defaultOptions.BollingerBand.movingAverageType;
	
		var value = _identity2["default"];
	
		function calculator(data) {
	
			var meanAlgorithm = movingAverageType === "ema" ? (0, _ema2["default"])().windowSize(windowSize).value(value) : (0, _slidingWindow2["default"])().windowSize(windowSize).accumulator(_d32["default"].mean).value(value);
	
			var bollingerBandAlgorithm = (0, _slidingWindow2["default"])().windowSize(windowSize).accumulator(function (values) {
				var avg = (0, _lodashLast2["default"])(values).mean;
				var stdDev = _d32["default"].deviation(values, function (each) {
					return value(each.datum);
				});
				return {
					top: avg + multiplier * stdDev,
					middle: avg,
					bottom: avg - multiplier * stdDev
				};
			});
	
			var zip = (0, _zipper2["default"])().combine(function (datum, mean) {
				return { datum: datum, mean: mean };
			});
	
			var tuples = zip(data, meanAlgorithm(data));
			return bollingerBandAlgorithm(tuples);
		};
	
		calculator.windowSize = function (x) {
			if (!arguments.length) {
				return windowSize;
			}
			windowSize = x;
			return calculator;
		};
	
		calculator.multiplier = function (x) {
			if (!arguments.length) {
				return multiplier;
			}
			multiplier = x;
			return calculator;
		};
	
		calculator.movingAverageType = function (x) {
			if (!arguments.length) {
				return movingAverageType;
			}
			movingAverageType = x;
			return calculator;
		};
	
		calculator.value = function (x) {
			if (!arguments.length) {
				return value;
			}
			value = x;
			return calculator;
		};
	
		return calculator;
	};
	
	module.exports = exports["default"];

/***/ },
/* 29 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the last element of `array`.
	 * @example
	 *
	 * _.last([1, 2, 3]);
	 * // => 3
	 */
	function last(array) {
	  var length = array ? array.length : 0;
	  return length ? array[length - 1] : undefined;
	}
	
	module.exports = last;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	/*
	https://github.com/ScottLogic/d3fc/blob/master/src/indicator/algorithm/calculator/relativeStrengthIndex.js
	
	The MIT License (MIT)
	
	Copyright (c) 2014-2015 Scott Logic Ltd.
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
	*/
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _d3 = __webpack_require__(8);
	
	var _d32 = _interopRequireDefault(_d3);
	
	var _lodashLast = __webpack_require__(29);
	
	var _lodashLast2 = _interopRequireDefault(_lodashLast);
	
	var _identity = __webpack_require__(19);
	
	var _identity2 = _interopRequireDefault(_identity);
	
	var _slidingWindow = __webpack_require__(17);
	
	var _slidingWindow2 = _interopRequireDefault(_slidingWindow);
	
	var _utilsUtils = __webpack_require__(7);
	
	var _defaultOptions = __webpack_require__(27);
	
	exports["default"] = function () {
		var windowSize = _defaultOptions.RSI.period;
	
		var value = _identity2["default"];
	
		function calculator(data) {
	
			var prevAvgGain, prevAvgLoss;
			var rsiAlgorithm = (0, _slidingWindow2["default"])().windowSize(windowSize).accumulator(function (values) {
	
				var avgGain = (0, _utilsUtils.isDefined)(prevAvgGain) ? (prevAvgGain * (windowSize - 1) + (0, _lodashLast2["default"])(values).gain) / windowSize : _d32["default"].mean(values, function (each) {
					return each.gain;
				});
	
				var avgLoss = (0, _utilsUtils.isDefined)(prevAvgLoss) ? (prevAvgLoss * (windowSize - 1) + (0, _lodashLast2["default"])(values).loss) / windowSize : _d32["default"].mean(values, function (each) {
					return each.loss;
				});
	
				var relativeStrength = avgGain / avgLoss;
				var rsi = 100 - 100 / (1 + relativeStrength);
	
				prevAvgGain = avgGain;
				prevAvgLoss = avgLoss;
	
				return rsi;
			});
	
			var gainsAndLossesCalculator = (0, _slidingWindow2["default"])().windowSize(2).undefinedValue(function (x) {
				return [0, 0];
			}).accumulator(function (tuple) {
				var prev = tuple[0];
				var now = tuple[1];
				var change = value(now) - value(prev);
				return {
					gain: Math.max(change, 0),
					loss: Math.abs(Math.min(change, 0))
				};
			});
	
			var gainsAndLosses = gainsAndLossesCalculator(data);
	
			var rsiData = rsiAlgorithm(gainsAndLosses);
	
			return rsiData;
		};
	
		calculator.windowSize = function (x) {
			if (!arguments.length) {
				return windowSize;
			}
			windowSize = x;
			return calculator;
		};
		calculator.value = function (x) {
			if (!arguments.length) {
				return value;
			}
			value = x;
			return calculator;
		};
	
		return calculator;
	};
	
	module.exports = exports["default"];

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	/*
	https://github.com/ScottLogic/d3fc/blob/master/src/indicator/algorithm/calculator/stochasticOscillator.js
	
	The MIT License (MIT)
	
	Copyright (c) 2014-2015 Scott Logic Ltd.
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
	*/
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _d3 = __webpack_require__(8);
	
	var _d32 = _interopRequireDefault(_d3);
	
	var _lodashLast = __webpack_require__(29);
	
	var _lodashLast2 = _interopRequireDefault(_lodashLast);
	
	var _identity = __webpack_require__(19);
	
	var _identity2 = _interopRequireDefault(_identity);
	
	var _slidingWindow = __webpack_require__(17);
	
	var _slidingWindow2 = _interopRequireDefault(_slidingWindow);
	
	var _zipper = __webpack_require__(24);
	
	var _zipper2 = _interopRequireDefault(_zipper);
	
	var _utilsUtils = __webpack_require__(7);
	
	var _defaultOptions = __webpack_require__(27);
	
	exports["default"] = function () {
		var windowSize = _defaultOptions.FullStochasticOscillator.period;
		var kWindowSize = _defaultOptions.FullStochasticOscillator.K;
		var dWindowSize = _defaultOptions.FullStochasticOscillator.D;
		var value = _defaultOptions.FullStochasticOscillator.ohlc;
	
		var high = function high(d) {
			return value(d).high;
		},
		    low = function low(d) {
			return value(d).low;
		},
		    close = function close(d) {
			return value(d).close;
		};
	
		function calculator(data) {
			var kWindow = (0, _slidingWindow2["default"])().windowSize(windowSize).accumulator(function (values) {
	
				var highestHigh = _d32["default"].max(values, high);
				var lowestLow = _d32["default"].min(values, low);
	
				var currentClose = close((0, _lodashLast2["default"])(values));
				var k = (currentClose - lowestLow) / (highestHigh - lowestLow) * 100;
	
				return k;
			});
	
			var kSmoothed = (0, _slidingWindow2["default"])().skipInitial(windowSize - 1).windowSize(kWindowSize).accumulator(_d32["default"].mean);
	
			var dWindow = (0, _slidingWindow2["default"])().skipInitial(windowSize - 1 + kWindowSize - 1).windowSize(dWindowSize).accumulator(_d32["default"].mean);
	
			var stoAlgorithm = (0, _zipper2["default"])().combine(function (K, D) {
				return { K: K, D: D };
			});
	
			var kData = kSmoothed(kWindow(data));
			var dData = dWindow(kData);
	
			var newData = stoAlgorithm(kData, dData);
	
			return newData;
		};
	
		calculator.windowSize = function (x) {
			if (!arguments.length) {
				return windowSize;
			}
			windowSize = x;
			return calculator;
		};
		calculator.kWindowSize = function (x) {
			if (!arguments.length) {
				return kWindowSize;
			}
			kWindowSize = x;
			return calculator;
		};
		calculator.dWindowSize = function (x) {
			if (!arguments.length) {
				return dWindowSize;
			}
			dWindowSize = x;
			return calculator;
		};
		calculator.value = function (x) {
			if (!arguments.length) {
				return value;
			}
			value = x;
			return calculator;
		};
	
		return calculator;
	};
	
	module.exports = exports["default"];

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _d3 = __webpack_require__(8);
	
	var _d32 = _interopRequireDefault(_d3);
	
	var _lodashLast = __webpack_require__(29);
	
	var _lodashLast2 = _interopRequireDefault(_lodashLast);
	
	var _slidingWindow = __webpack_require__(17);
	
	var _slidingWindow2 = _interopRequireDefault(_slidingWindow);
	
	var _utilsUtils = __webpack_require__(7);
	
	exports["default"] = function () {
	
		var windowSize = 9,
		    value = function value(d) {
			return { open: d.open, high: d.high, low: d.low, close: d.close };
		};
	
		function atr(data) {
	
			var trueRangeAlgorithm = (0, _slidingWindow2["default"])().windowSize(2).value(value).undefinedValue(function (d) {
				return d.high - d.low;
			}) // the first TR value is simply the High minus the Low
			.accumulator(function (values) {
				var prev = values[0];
				var d = values[1];
				return Math.max(d.high - d.low, d.high - prev.close, d.low - prev.close);
			});
	
			var prevATR;
	
			var atrAlgorithm = (0, _slidingWindow2["default"])().skipInitial(1) // trueRange starts from index 1 so ATR starts from 1
			.windowSize(windowSize).accumulator(function (values) {
				var tr = (0, _lodashLast2["default"])(values);
				var atr = (0, _utilsUtils.isDefined)(prevATR) ? (prevATR * (windowSize - 1) + tr) / windowSize : _d32["default"].sum(values) / windowSize;
	
				prevATR = atr;
				return atr;
			});
	
			var newData = atrAlgorithm(trueRangeAlgorithm(data));
	
			return newData;
		};
	
		atr.windowSize = function (x) {
			if (!arguments.length) {
				return windowSize;
			}
			windowSize = x;
			return atr;
		};
	
		atr.value = function (x) {
			if (!arguments.length) {
				return value;
			}
			value = x;
			return atr;
		};
	
		return atr;
	};
	
	module.exports = exports["default"];

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _identity = __webpack_require__(19);
	
	var _identity2 = _interopRequireDefault(_identity);
	
	var _slidingWindow = __webpack_require__(17);
	
	var _slidingWindow2 = _interopRequireDefault(_slidingWindow);
	
	var _zipper = __webpack_require__(24);
	
	var _zipper2 = _interopRequireDefault(_zipper);
	
	var _utilsUtils = __webpack_require__(7);
	
	var _defaultOptions = __webpack_require__(27);
	
	exports["default"] = function () {
		var volume = _defaultOptions.ForceIndex.volume;
	
		var close = function close(d) {
			return d.close;
		};
	
		function calculator(data) {
	
			var forceIndexCalulator = (0, _slidingWindow2["default"])().windowSize(2).accumulator(function (_ref) {
				var _ref2 = _slicedToArray(_ref, 2);
	
				var prev = _ref2[0];
				var curr = _ref2[1];
				return (close(curr) - close(prev)) * volume(curr);
			});
	
			var forceIndex = forceIndexCalulator(data);
	
			return forceIndex;
		};
	
		calculator.close = function (x) {
			if (!arguments.length) {
				return close;
			}
			close = x;
			return calculator;
		};
	
		calculator.volume = function (x) {
			if (!arguments.length) {
				return volume;
			}
			volume = x;
			return calculator;
		};
	
		return calculator;
	};
	
	module.exports = exports["default"];

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	/*
	https://github.com/ScottLogic/d3fc/blob/master/src/indicator/algorithm/calculator/elderRay.js
	
	The MIT License (MIT)
	
	Copyright (c) 2014-2015 Scott Logic Ltd.
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
	*/
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _d3 = __webpack_require__(8);
	
	var _d32 = _interopRequireDefault(_d3);
	
	var _slidingWindow = __webpack_require__(17);
	
	var _slidingWindow2 = _interopRequireDefault(_slidingWindow);
	
	var _ema = __webpack_require__(25);
	
	var _ema2 = _interopRequireDefault(_ema);
	
	var _zipper = __webpack_require__(24);
	
	var _zipper2 = _interopRequireDefault(_zipper);
	
	var _defaultOptions = __webpack_require__(27);
	
	var _utilsUtils = __webpack_require__(7);
	
	exports["default"] = function () {
		var windowSize = _defaultOptions.ElderRay.period;
		var source = _defaultOptions.ElderRay.source;
		var movingAverageType = _defaultOptions.ElderRay.movingAverageType;
		var ohlc = _defaultOptions.ElderRay.ohlc;
	
		var value = (0, _utilsUtils.sourceFunctor)(source);
	
		function calculator(data) {
	
			var meanAlgorithm = movingAverageType === "ema" ? (0, _ema2["default"])().windowSize(windowSize).value(value) : (0, _slidingWindow2["default"])().windowSize(windowSize).accumulator(_d32["default"].mean).value(value);
	
			var zip = (0, _zipper2["default"])().combine(function (datum, mean) {
				var bullPower = isDefined(mean) ? ohlc(datum).high - mean : undefined;
				var bearPower = isDefined(mean) ? ohlc(datum).low - mean : undefined;
				return { bullPower: bullPower, bearPower: bearPower };
			});
	
			var newData = zip(data, meanAlgorithm(data));
			return newData;
		};
	
		calculator.windowSize = function (x) {
			if (!arguments.length) {
				return windowSize;
			}
			windowSize = x;
			return calculator;
		};
	
		calculator.ohlc = function (x) {
			if (!arguments.length) {
				return ohlc;
			}
			ohlc = x;
			return calculator;
		};
	
		calculator.movingAverageType = function (x) {
			if (!arguments.length) {
				return movingAverageType;
			}
			movingAverageType = x;
			return calculator;
		};
	
		calculator.value = function (x) {
			if (!arguments.length) {
				return value;
			}
			value = x;
			return calculator;
		};
	
		return calculator;
	};
	
	module.exports = exports["default"];

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _DummyTransformer = __webpack_require__(36);
	
	var _DummyTransformer2 = _interopRequireDefault(_DummyTransformer);
	
	var _StockscaleTransformer = __webpack_require__(37);
	
	var _StockscaleTransformer2 = _interopRequireDefault(_StockscaleTransformer);
	
	var _HeikinAshiTransformer = __webpack_require__(39);
	
	var _HeikinAshiTransformer2 = _interopRequireDefault(_HeikinAshiTransformer);
	
	var _KagiTransformer = __webpack_require__(40);
	
	var _KagiTransformer2 = _interopRequireDefault(_KagiTransformer);
	
	var _RenkoTransformer = __webpack_require__(42);
	
	var _RenkoTransformer2 = _interopRequireDefault(_RenkoTransformer);
	
	var _PointAndFigureTransformer = __webpack_require__(43);
	
	var _PointAndFigureTransformer2 = _interopRequireDefault(_PointAndFigureTransformer);
	
	var _defaultOptions = __webpack_require__(41);
	
	var defaultOptions = _interopRequireWildcard(_defaultOptions);
	
	exports.DummyTransformer = _DummyTransformer2["default"];
	exports.StockscaleTransformer = _StockscaleTransformer2["default"];
	exports.HeikinAshiTransformer = _HeikinAshiTransformer2["default"];
	exports.KagiTransformer = _KagiTransformer2["default"];
	exports.RenkoTransformer = _RenkoTransformer2["default"];
	exports.PointAndFigureTransformer = _PointAndFigureTransformer2["default"];
	exports.defaultOptions = defaultOptions;

/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	function DummyTransformer() {
		function transform(data, interval) {
			var responseData = {};
			responseData[interval] = data;
	
			return responseData;
		};
	
		transform.options = function (opt) {
			return opt;
		};
		return transform;
	}
	
	exports["default"] = DummyTransformer;
	module.exports = exports["default"];

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _scalePolylineartimescale = __webpack_require__(38);
	
	var _scalePolylineartimescale2 = _interopRequireDefault(_scalePolylineartimescale);
	
	var _objectAssign = __webpack_require__(4);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var defaultOptions = {
		dateAccessor: function dateAccessor(d) {
			return d.date;
		},
		indexAccessor: function indexAccessor(d) {
			return d.idx;
		},
		dateMutator: function dateMutator(d, date) {
			d.date = date;
		},
		indexMutator: function indexMutator(d, i) {
			d.idx = i;
		}
	};
	
	function buildWeeklyData(daily, indexMutator, dateAccesor, dateMutator) {
		var weekly = [],
		    prevWeek,
		    eachWeek = {};
	
		for (var i = 0; i < daily.length; i++) {
	
			var d = daily[i];
	
			if (dateAccesor(eachWeek)) indexMutator(eachWeek, i);
	
			dateMutator(eachWeek, dateAccesor(d));
	
			eachWeek.startOfWeek = eachWeek.startOfWeek || d.startOfWeek;
			eachWeek.startOfMonth = eachWeek.startOfMonth || d.startOfMonth;
			eachWeek.startOfQuarter = eachWeek.startOfQuarter || d.startOfQuarter;
			eachWeek.startOfYear = eachWeek.startOfYear || d.startOfYear;
	
			if (!eachWeek.open) eachWeek.open = d.open;
			if (!eachWeek.high) eachWeek.high = d.high;
			if (!eachWeek.low) eachWeek.low = d.low;
	
			eachWeek.close = d.close;
	
			eachWeek.high = Math.max(eachWeek.high, d.high);
			eachWeek.low = Math.min(eachWeek.low, d.low);
	
			if (!eachWeek.volume) eachWeek.volume = 0;
			eachWeek.volume += d.volume;
	
			eachWeek = (0, _objectAssign2["default"])({}, d, eachWeek);
	
			if (d.startOfWeek) {
				if (prevWeek) {
					eachWeek.trueRange = Math.max(eachWeek.high - eachWeek.low, eachWeek.high - prevWeek.close, eachWeek.low - prevWeek.close);
				}
				prevWeek = eachWeek;
				weekly.push(eachWeek);
				eachWeek = {};
			}
		}
		return weekly;
	}
	
	function buildMonthlyData(daily, indexMutator, dateAccesor, dateMutator) {
		var monthly = [],
		    prevMonth,
		    eachMonth = {};
		for (var i = 0; i < daily.length; i++) {
			var d = daily[i];
	
			if (dateAccesor(eachMonth)) indexMutator(eachMonth, i);
	
			dateMutator(eachMonth, dateAccesor(d));
	
			eachMonth.startOfMonth = eachMonth.startOfMonth || d.startOfMonth;
			eachMonth.startOfQuarter = eachMonth.startOfQuarter || d.startOfQuarter;
			eachMonth.startOfYear = eachMonth.startOfYear || d.startOfYear;
	
			if (!eachMonth.open) eachMonth.open = d.open;
			if (!eachMonth.high) eachMonth.high = d.high;
			if (!eachMonth.low) eachMonth.low = d.low;
	
			eachMonth.close = d.close;
	
			eachMonth.high = Math.max(eachMonth.high, d.high);
			eachMonth.low = Math.min(eachMonth.low, d.low);
	
			if (!eachMonth.volume) eachMonth.volume = 0;
			eachMonth.volume += d.volume;
	
			eachMonth = (0, _objectAssign2["default"])({}, d, eachMonth);
	
			if (d.startOfMonth) {
				eachMonth.startOfWeek = d.startOfWeek;
				if (prevMonth) {
					eachMonth.trueRange = Math.max(eachMonth.high - eachMonth.low, eachMonth.high - prevMonth.close, eachMonth.low - prevMonth.close);
				}
				prevMonth = eachMonth;
				monthly.push(eachMonth);
				eachMonth = {};
			}
		}
		return monthly;
	}
	
	function StockscaleTransformer() {
		var newOptions;
		function transform(data, interval) {
			var _newOptions = newOptions;
			var dateAccessor = _newOptions.dateAccessor;
			var dateMutator = _newOptions.dateMutator;
			var indexMutator = _newOptions.indexMutator;
	
			var prevDate;
			var responseData = {};
			var dd = data[interval];
			responseData.D = dd.map(function (each, i) {
				var row = {};
				Object.keys(each).forEach(function (key) {
					row[key] = each[key];
				});
				indexMutator(row, i);
	
				row.startOfWeek = false;
				row.startOfMonth = false;
				row.startOfQuarter = false;
				row.startOfYear = false;
				var date = dateAccessor(row);
	
				if (prevDate !== undefined) {
					// According to ISO calendar
					// Sunday = 0, Monday = 1, ... Saturday = 6
					// day of week of today < day of week of yesterday then today is start of week
					row.startOfWeek = date.getDay() < prevDate.getDay();
					// month of today != month of yesterday then today is start of month
					row.startOfMonth = date.getMonth() !== prevDate.getMonth();
					// if start of month and month % 3 === 0 then it is start of quarter
					row.startOfQuarter = row.startOfMonth && date.getMonth() % 3 === 0;
					// year of today != year of yesterday then today is start of year
					row.startOfYear = date.getYear() !== prevDate.getYear();
				}
				prevDate = date;
				return row;
			});
			// console.table(responseData);
			responseData.W = buildWeeklyData(responseData.D, indexMutator, dateAccessor, dateMutator);
			responseData.M = buildMonthlyData(responseData.D, indexMutator, dateAccessor, dateMutator);
			return responseData;
		};
	
		transform.options = function (opt) {
			newOptions = (0, _objectAssign2["default"])({}, defaultOptions, opt);
			newOptions.xAccessor = newOptions.indexAccessor;
			newOptions.xScale = (0, _scalePolylineartimescale2["default"])(newOptions.xAccessor);
			return newOptions;
		};
		return transform;
	}
	
	exports["default"] = StockscaleTransformer;
	module.exports = exports["default"];

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _d3 = __webpack_require__(8);
	
	var _d32 = _interopRequireDefault(_d3);
	
	function financeTimeScale(drawableData, indexAccessor, backingLinearScale) {
		var dateAccessor = arguments.length <= 3 || arguments[3] === undefined ? function (d) {
			return d.date;
		} : arguments[3];
	
		var timeScaleSteps = [{ step: 864e5, f: function f(d) {
				return dateAccessor(d) !== undefined && true;
			} }, // 1-day
		{ step: 1728e5, f: function f(d, i) {
				return dateAccessor(d) !== undefined && i % 2 === 0;
			} }, // 2-day
		{ step: 8380e5, f: function f(d, i, arr) {
				if (d.startOfMonth) return true;
				var list = [];
				if (i - 2 >= 0) list.push(arr[i - 2]);
				if (i - 1 >= 0) list.push(arr[i - 1]);
				list.push(arr[i]);
				if (i + 1 <= arr.length - 1) list.push(arr[i + 1]);
				if (i + 2 <= arr.length - 1) list.push(arr[i + 2]);
				var sm = list.map(function (each) {
					return each.startOfMonth;
				}).reduce(function (prev, curr) {
					return prev || curr;
				});
				return sm ? false : d.startOfWeek;
			} }, // 1-week
		{ step: 3525e6, f: function f(d) {
				return d.startOfMonth;
			} }, // 1-month
		{ step: 7776e6, f: function f(d) {
				return d.startOfQuarter;
			} }, // 3-month
		{ step: 31536e6, f: function f(d) {
				return d.startOfYear;
			} }, // 1-year
		{ step: 91536e15, f: function f(d) {
				return dateAccessor(d) !== undefined && d.startOfYear && dateAccessor(d).getFullYear() % 2 === 0;
			} } // 2-year
		];
		var timeScaleStepsBisector = _d32["default"].bisector(function (d) {
			return d.step;
		}).left;
		var bisectByIndex = _d32["default"].bisector(function (d) {
			return indexAccessor(d);
		}).left;
		var tickFormat = [[_d32["default"].time.format("%Y"), function (d) {
			return d.startOfYear;
		}], [_d32["default"].time.format("%b %Y"), function (d) {
			return d.startOfQuarter;
		}], [_d32["default"].time.format("%b"), function (d) {
			return d.startOfMonth;
		}], [_d32["default"].time.format("%d %b"), function (d) {
			return d.startOfWeek;
		}], [_d32["default"].time.format("%a %d "), function () /* d */{
			return true;
		}]];
		function formater(d) {
			var i = 0,
			    format = tickFormat[i];
			while (!format[1](d)) format = tickFormat[++i];
			var tickDisplay = format[0](dateAccessor(d));
			// console.log(tickDisplay);
			return tickDisplay;
		}
	
		function scale(x) {
			return backingLinearScale(x);
		}
		scale.isPolyLinear = function () {
			return true;
		};
		scale.invert = function (x) {
			return backingLinearScale.invert(x);
		};
		scale.data = function (x) {
			if (!arguments.length) {
				return drawableData;
			} else {
				drawableData = x;
				// this.domain([drawableData.first().index, drawableData.last().index]);
				this.domain([indexAccessor(drawableData[0]), indexAccessor(drawableData[drawableData.length - 1])]);
				return scale;
			}
		};
		scale.domain = function (x) {
			if (!arguments.length) return backingLinearScale.domain();
			// console.log("before = %s, after = %s", JSON.stringify(backingLinearScale.domain()), JSON.stringify(x))
	
			var d = [x[0], x[1]];
			// console.log(d);
			backingLinearScale.domain(d);
			return scale;
		};
		scale.range = function (x) {
			if (!arguments.length) return backingLinearScale.range();
			backingLinearScale.range(x);
			return scale;
		};
		scale.rangeRound = function (x) {
			return backingLinearScale.range(x);
		};
		scale.clamp = function (x) {
			if (!arguments.length) return backingLinearScale.clamp();
			backingLinearScale.clamp(x);
			return scale;
		};
		scale.interpolate = function (x) {
			if (!arguments.length) return backingLinearScale.interpolate();
			backingLinearScale.interpolate(x);
			return scale;
		};
		scale.ticks = function (m) {
			var start,
			    end,
			    count = 0;
			drawableData.forEach(function (d) {
				if (dateAccessor(d) !== undefined) {
					if (start === undefined) start = d;
					end = d;
					count++;
				}
			});
			m = count / drawableData.length * m;
			var span = dateAccessor(end).getTime() - dateAccessor(start).getTime();
			var target = span / m;
			/*
	  console.log(dateAccessor(drawableData[drawableData.length - 1])
	  	, drawableData[0]
	  	, span
	  	, m
	  	, target
	  	, timeScaleStepsBisector(d3_time_scaleSteps, target)
	  	);
	  */
			var ticks = drawableData.filter(timeScaleSteps[timeScaleStepsBisector(timeScaleSteps, target)].f).map(function (d) {
				return indexAccessor(d);
			});
			// return the index of all the ticks to be displayed,
			// console.log(target, span, m, ticks);
			return ticks;
		};
		scale.tickFormat = function () /* ticks */{
			return function (d) {
				// for each index received from ticks() function derive the formatted output
				var tickIndex = bisectByIndex(drawableData, d);
				return formater(drawableData[tickIndex]);
			};
		};
		scale.nice = function (m) {
			backingLinearScale.nice(m);
			return scale;
		};
		scale.copy = function () {
			return financeTimeScale(drawableData, indexAccessor, backingLinearScale.copy());
		};
		return scale;
	}
	
	var defaultFinanceDateTimeScale = function defaultFinanceDateTimeScale(indexAccessor) {
		return financeTimeScale([0, 1], indexAccessor, _d32["default"].scale.linear());
	};
	
	exports["default"] = defaultFinanceDateTimeScale;
	module.exports = exports["default"];

/***/ },
/* 39 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	function buildHA(data, indexAccessor, indexMutator, dateAccessor, dateMutator) {
		var prevEach;
	
		var haData = data.map(function (d) {
			var each = {};
			indexMutator(each, indexAccessor(d));
			each.close = (d.open + d.high + d.low + d.close) / 4;
	
			dateMutator(each, dateAccessor(d));
	
			if (!prevEach) {
				each.open = d.open;
				each.high = d.high;
				each.low = d.low;
			} else {
				each.open = (prevEach.open + prevEach.close) / 2;
				each.high = Math.max(each.open, d.high, each.close);
				each.low = Math.min(each.open, d.low, each.close);
				each.trueRange = Math.max(d.high - d.low, d.high - prevEach.close, d.low - prevEach.close);
			}
			each.volume = d.volume;
	
			each.startOfWeek = d.startOfWeek;
			each.startOfMonth = d.startOfMonth;
			each.startOfQuarter = d.startOfQuarter;
			each.startOfYear = d.startOfYear;
	
			prevEach = each;
			return each;
		});
		// console.table(haData);
		return haData;
	}
	
	function HeikinAshiTransformer() {
		var newOptions;
		function transform(data) {
			var _newOptions = newOptions;
			var dateAccessor = _newOptions.dateAccessor;
			var dateMutator = _newOptions.dateMutator;
			var indexAccessor = _newOptions.indexAccessor;
			var indexMutator = _newOptions.indexMutator;
	
			// console.log(data, options);
	
			var haData = {};
			Object.keys(data).forEach(function (key) {
				return haData[key] = buildHA(data[key], indexAccessor, indexMutator, dateAccessor, dateMutator);
			});
	
			return haData;
		};
	
		transform.options = function (opt) {
			newOptions = opt;
			return opt;
		};
		return transform;
	}
	
	exports["default"] = HeikinAshiTransformer;
	module.exports = exports["default"];

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _d3 = __webpack_require__(8);
	
	var _d32 = _interopRequireDefault(_d3);
	
	var _objectAssign = __webpack_require__(4);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _indicatorCalculator = __webpack_require__(16);
	
	var _defaultOptions = __webpack_require__(41);
	
	function KagiTransformer() {
		var newOptions;
		function transform(data) {
			var _newOptions = newOptions;
			var reversalType = _newOptions.reversalType;
			var period = _newOptions.period;
			var reversal = _newOptions.reversal;
			var source = _newOptions.source;
			var _newOptions2 = newOptions;
			var dateAccessor = _newOptions2.dateAccessor;
			var dateMutator = _newOptions2.dateMutator;
			var indexMutator = _newOptions2.indexMutator;
	
			var reversalThreshold, pricingMethod;
	
			if (reversalType === "ATR") {
				// calculateATR(rawData.D, period);
				var atrAlgorithm = (0, _indicatorCalculator.atr)().windowSize(period);
	
				var atrCalculator = (0, _indicatorCalculator.merge)().algorithm(atrAlgorithm).mergePath("atr" + period);
	
				atrCalculator(data.D);
				reversalThreshold = function (d) {
					return d["atr" + period];
				};
			} else {
				reversalThreshold = _d32["default"].functor(reversal);
			}
			pricingMethod = function (d) {
				return d[source];
			};
	
			var kagiData = [];
	
			var index = 0,
			    prevPeak,
			    prevTrough,
			    direction;
			var line = {};
	
			data.D.forEach(function (d) {
				if (line.from === undefined) {
					indexMutator(line, index++);
					dateMutator(line, dateAccessor(d));
					line.from = dateAccessor(d);
	
					if (!line.open) line.open = d.open;
					line.high = d.high;
					line.low = d.low;
					if (!line.close) line.close = pricingMethod(d);
					line.startOfYear = d.startOfYear;
					line.startOfQuarter = d.startOfQuarter;
					line.startOfMonth = d.startOfMonth;
					line.startOfWeek = d.startOfWeek;
				}
	
				if (!line.startOfYear) {
					line.startOfYear = d.startOfYear;
					if (line.startOfYear) {
						line.date = d.date;
						// line.displayDate = d.displayDate;
					}
				}
	
				if (!line.startOfQuarter) {
					line.startOfQuarter = d.startOfQuarter;
					if (line.startOfQuarter && !line.startOfYear) {
						line.date = d.date;
						// line.displayDate = d.displayDate;
					}
				}
	
				if (!line.startOfMonth) {
					line.startOfMonth = d.startOfMonth;
					if (line.startOfMonth && !line.startOfQuarter) {
						line.date = d.date;
						// line.displayDate = d.displayDate;
					}
				}
				if (!line.startOfWeek) {
					line.startOfWeek = d.startOfWeek;
					if (line.startOfWeek && !line.startOfMonth) {
						line.date = d.date;
						// line.displayDate = d.displayDate;
					}
				}
				line.volume = (line.volume || 0) + d.volume;
				line.high = Math.max(line.high, d.high);
				line.low = Math.min(line.low, d.low);
				line.to = dateAccessor(d);
	
				var priceMovement = pricingMethod(d) - line.close;
	
				if (line.close > line.open /* going up */ && priceMovement > 0 /* and moving in same direction */ || line.close < line.open /* going down */ && priceMovement < 0 /* and moving in same direction */) {
						line.close = pricingMethod(d);
						if (prevTrough && line.close < prevTrough) {
							// going below the prevTrough, so change from yang to yin
							// A yin line forms when a Kagi line breaks below the prior trough.
							line.changePoint = prevTrough;
							if (line.startAs !== "yin") {
								line.changeTo = "yin";
								// line.startAs = "yang";
							}
						}
						if (prevPeak && line.close > prevPeak) {
							// going above the prevPeak, so change from yin to yang
							// A yang line forms when a Kagi line breaks above the prior peak
							line.changePoint = prevPeak;
							if (line.startAs !== "yang") {
								line.changeTo = "yang";
								// line.startAs = "yin";
							}
						}
					} else if (line.close > line.open /* going up */
					 && priceMovement < 0 /* and moving in other direction */
					 && Math.abs(priceMovement) > reversalThreshold(d) /* and the movement is big enough for reversal */ || line.close < line.open /* going down */
					 && priceMovement > 0 /* and moving in other direction */
					 && Math.abs(priceMovement) > reversalThreshold(d) /* and the movement is big enough for reversal */) {
							// reverse direction
							var nextLineOpen = line.close;
	
							direction = (line.close - line.open) / Math.abs(line.close - line.open);
	
							var nextChangePoint, nextChangeTo;
							if (direction < 0 /* if direction so far has been -ve*/) {
									// compare with line.close becomes prevTrough
									if (prevPeak === undefined) prevPeak = line.open;
									prevTrough = line.close;
									if (pricingMethod(d) > prevPeak) {
										nextChangePoint = prevPeak;
										nextChangeTo = "yang";
									}
								} else {
								if (prevTrough === undefined) prevTrough = line.open;
								prevPeak = line.close;
								if (pricingMethod(d) < prevTrough) {
									nextChangePoint = prevTrough;
									nextChangeTo = "yin";
								}
							}
							if (line.startAs === undefined) {
								line.startAs = direction > 0 ? "yang" : "yin";
							}
	
							var startAs = line.changeTo || line.startAs;
							line.added = true;
							kagiData.push(line);
							direction = -1 * direction; // direction is reversed
	
							line = (0, _objectAssign2["default"])({}, line);
							line.open = nextLineOpen;
							line.close = pricingMethod(d);
							line.startAs = startAs;
							line.changePoint = nextChangePoint;
							line.changeTo = nextChangeTo;
							line.added = false;
							line.from = undefined;
							line.volume = 0;
							indexMutator(line, index);
						} else {
						// console.log("MOVING IN REV DIR BUT..", line.open, line.close, pricingMethod(d));
					}
				line.current = pricingMethod(d);
				var dir = line.close - line.open;
				dir = dir / Math.abs(dir);
				line.reverseAt = dir > 0 ? line.close - reversalThreshold(d) : line.open - reversalThreshold(d);
			});
			if (!line.added) kagiData.push(line);
	
			return { "D": kagiData };
		};
	
		transform.options = function (opt) {
			newOptions = (0, _objectAssign2["default"])({}, _defaultOptions.Kagi, opt);
			// console.log(newOptions);
			return newOptions;
		};
		return transform;
	}
	
	exports["default"] = KagiTransformer;
	module.exports = exports["default"];

/***/ },
/* 41 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Kagi = {
		reversalType: "ATR", // "ATR", "FIXED"
		period: 14,
		reversal: 2,
		source: "close" };
	
	exports.Kagi = Kagi;
	// "high", "low", "open", "close"
	var Renko = {
		reversalType: "ATR", // "ATR", "FIXED"
		period: 14,
		fixedBrickSize: 2,
		source: "hi/lo" };
	
	exports.Renko = Renko;
	// "close", "hi/lo"
	var PointAndFigure = {
		boxSize: 0.5,
		reversal: 3,
		source: "hi/lo" };
	exports.PointAndFigure = PointAndFigure;
	// "close", "hi/lo"

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _d3 = __webpack_require__(8);
	
	var _d32 = _interopRequireDefault(_d3);
	
	var _objectAssign = __webpack_require__(4);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _indicatorCalculator = __webpack_require__(16);
	
	var _defaultOptions = __webpack_require__(41);
	
	function RenkoTransformer() {
		var newOptions;
		function transform(rawData /* , interval */) {
			var _newOptions = newOptions;
			var reversalType = _newOptions.reversalType;
			var fixedBrickSize = _newOptions.fixedBrickSize;
			var dateAccessor = _newOptions.dateAccessor;
			var dateMutator = _newOptions.dateMutator;
			var indexAccessor = _newOptions.indexAccessor;
			var indexMutator = _newOptions.indexMutator;
			var period = _newOptions.period;
			var source = _newOptions.source;
	
			var brickSize, pricingMethod;
			if (reversalType === "ATR") {
				// calculateATR(rawData.D, period);
				var atrAlgorithm = (0, _indicatorCalculator.atr)().windowSize(period);
	
				var atrCalculator = (0, _indicatorCalculator.merge)().algorithm(atrAlgorithm).mergePath("atr" + period);
	
				atrCalculator(rawData.D);
				brickSize = function (d) {
					return d["atr" + period];
				};
			} else {
				brickSize = _d32["default"].functor(fixedBrickSize);
			}
			if (source === "hi/lo") {
				pricingMethod = function (d) {
					return { high: d.high, low: d.low };
				};
			} else {
				pricingMethod = function (d) {
					return { high: d.close, low: d.close };
				};
			}
	
			var renkoData = [];
	
			var index = 0,
			    prevBrickClose = rawData.D[index].open,
			    prevBrickOpen = rawData.D[index].open;
			var brick = {},
			    direction = 0;
	
			rawData.D.forEach(function (d) {
				if (brick.from === undefined) {
					brick.high = d.high;
					brick.low = d.low;
					brick.startOfYear = d.startOfYear;
					brick.startOfQuarter = d.startOfQuarter;
					brick.startOfMonth = d.startOfMonth;
					brick.startOfWeek = d.startOfWeek;
	
					brick.from = indexAccessor(d);
					brick.fromDate = dateAccessor(d);
					indexMutator(brick, index++);
					dateMutator(brick, dateAccessor(d));
				}
				brick.volume = (brick.volume || 0) + d.volume;
	
				var prevCloseToHigh = prevBrickClose - pricingMethod(d).high,
				    prevCloseToLow = prevBrickClose - pricingMethod(d).low,
				    prevOpenToHigh = prevBrickOpen - pricingMethod(d).high,
				    prevOpenToLow = prevBrickOpen - pricingMethod(d).low,
				    priceMovement = Math.min(Math.abs(prevCloseToHigh), Math.abs(prevCloseToLow), Math.abs(prevOpenToHigh), Math.abs(prevOpenToLow));
	
				brick.high = Math.max(brick.high, d.high);
				brick.low = Math.min(brick.low, d.low);
	
				if (!brick.startOfYear) {
					brick.startOfYear = d.startOfYear;
					if (brick.startOfYear) {
						dateMutator(brick, dateAccessor(d));
						// brick.displayDate = d.displayDate;
					}
				}
	
				if (!brick.startOfQuarter) {
					brick.startOfQuarter = d.startOfQuarter;
					if (brick.startOfQuarter && !brick.startOfYear) {
						dateMutator(brick, dateAccessor(d));
						// brick.displayDate = d.displayDate;
					}
				}
	
				if (!brick.startOfMonth) {
					brick.startOfMonth = d.startOfMonth;
					if (brick.startOfMonth && !brick.startOfQuarter) {
						dateMutator(brick, dateAccessor(d));
						// brick.displayDate = d.displayDate;
					}
				}
				if (!brick.startOfWeek) {
					brick.startOfWeek = d.startOfWeek;
					if (brick.startOfWeek && !brick.startOfMonth) {
						dateMutator(brick, dateAccessor(d));
						// brick.displayDate = d.displayDate;
					}
				}
	
				// d.brick = JSON.stringify(brick);
				if (brickSize(d)) {
					var noOfBricks = Math.floor(priceMovement / brickSize(d));
	
					brick.open = Math.abs(prevCloseToHigh) < Math.abs(prevOpenToHigh) || Math.abs(prevCloseToLow) < Math.abs(prevOpenToLow) ? prevBrickClose : prevBrickOpen;
	
					if (noOfBricks >= 1) {
						var j = 0;
						for (j = 0; j < noOfBricks; j++) {
							brick.close = brick.open < pricingMethod(d).high ?
							// if brick open is less than current price it means it is green/hollow brick
							brick.open + brickSize(d) : brick.open - brickSize(d);
							direction = brick.close > brick.open ? 1 : -1;
							brick.direction = direction;
							brick.to = indexAccessor(d);
							brick.toDate = dateAccessor(d);
							// brick.diff = brick.open - brick.close;
							// brick.atr = d.atr;
							brick.fullyFormed = true;
							renkoData.push(brick);
	
							prevBrickClose = brick.close;
							prevBrickOpen = brick.open;
	
							var newBrick = {
								high: brick.high,
								low: brick.low,
								open: brick.close,
								startOfYear: false,
								startOfMonth: false,
								startOfQuarter: false,
								startOfWeek: false
							};
							brick = newBrick;
							brick.from = indexAccessor(d);
							brick.fromDate = dateAccessor(d);
							indexMutator(brick, index + j);
							dateMutator(brick, dateAccessor(d));
							brick.volume = (brick.volume || 0) + d.volume;
						}
						index = index + j - 1;
						brick = {};
					} else {
						if (indexAccessor(d) === rawData.D.length - 1) {
							brick.close = direction > 0 ? pricingMethod(d).high : pricingMethod(d).low;
							brick.to = indexAccessor(d);
							brick.toDate = dateAccessor(d);
							dateMutator(brick, dateAccessor(d));
	
							brick.fullyFormed = false;
							renkoData.push(brick);
						}
					}
				}
			});
			return { "D": renkoData };
		};
	
		transform.options = function (opt) {
			newOptions = (0, _objectAssign2["default"])({}, _defaultOptions.Renko, opt);
			return newOptions;
		};
		return transform;
	}
	
	exports["default"] = RenkoTransformer;
	module.exports = exports["default"];

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _objectAssign = __webpack_require__(4);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _defaultOptions = __webpack_require__(41);
	
	function createBox(d, dateAccessor, dateMutator) {
		var box = {
			open: d.open,
			fromDate: dateAccessor(d),
			toDate: dateAccessor(d),
			startOfYear: d.startOfYear,
			startOfQuarter: d.startOfQuarter,
			startOfMonth: d.startOfMonth,
			startOfWeek: d.startOfWeek
		};
		dateMutator(box, dateAccessor(d));
		return box;
	}
	
	function updateColumns(columnData, dateAccessor, dateMutator) {
		columnData.forEach(function (d) {
			// var lastBox = d.boxes[d.boxes.length - 1];
	
			d.startOfYear = false;
			d.startOfQuarter = false;
			d.startOfMonth = false;
			d.startOfWeek = false;
	
			d.boxes.forEach(function (eachBox) {
				if (d.open === undefined) d.open = eachBox.open;
				d.close = eachBox.close;
				d.high = Math.max(d.open, d.close);
				d.low = Math.min(d.open, d.close);
	
				if (d.fromDate === undefined) d.fromDate = eachBox.fromDate;
				if (d.date === undefined) d.date = eachBox.date;
				// if (d.displayDate === undefined) d.displayDate = eachBox.displayDate;
				d.toDate = eachBox.toDate;
	
				if (eachBox.startOfYear) {
					d.startOfYear = d.startOfYear || eachBox.startOfYear;
					d.startOfQuarter = eachBox.startOfQuarter;
					d.startOfMonth = eachBox.startOfMonth;
					d.startOfWeek = eachBox.startOfWeek;
	
					dateMutator(d, dateAccessor(eachBox));
				}
				if (d.startOfQuarter !== true && eachBox.startOfQuarter) {
					d.startOfQuarter = eachBox.startOfQuarter;
					d.startOfMonth = eachBox.startOfMonth;
					d.startOfWeek = eachBox.startOfWeek;
					// d.displayDate = eachBox.displayDate;
					dateMutator(d, dateAccessor(eachBox));
				}
				if (d.startOfMonth !== true && eachBox.startOfMonth) {
					d.startOfMonth = eachBox.startOfMonth;
					d.startOfWeek = eachBox.startOfWeek;
					// d.displayDate = eachBox.displayDate;
					dateMutator(d, dateAccessor(eachBox));
				}
				if (d.startOfWeek !== true && eachBox.startOfWeek) {
					d.startOfWeek = eachBox.startOfWeek;
					// d.displayDate = eachBox.displayDate;
					dateMutator(d, dateAccessor(eachBox));
				}
			});
		});
	
		// console.table(columnData);
		// console.table(rawData);
		return columnData;
	}
	
	function PointAndFigureTransformer() {
		var newOptions;
		function transform(rawData /* , interval */) {
			var _newOptions = newOptions;
			var dateAccessor = _newOptions.dateAccessor;
			var dateMutator = _newOptions.dateMutator;
			var indexAccessor = _newOptions.indexAccessor;
			var indexMutator = _newOptions.indexMutator;
			var reversal = _newOptions.reversal;
			var boxSize = _newOptions.boxSize;
			var source = _newOptions.source;
	
			var pricingMethod;
			if (source === "hi/lo") {
				pricingMethod = function (d) {
					return { high: d.high, low: d.low };
				};
			} else {
				pricingMethod = function (d) {
					return { high: d.close, low: d.close };
				};
			}
	
			var columnData = [];
	
			var column = {
				boxes: [],
				open: rawData.D[0].open
			},
			    box = createBox(rawData.D[0], dateAccessor, dateMutator);
	
			indexMutator(column, 0);
			columnData.push(column);
	
			rawData.D.forEach(function (d) {
				column.volume = (column.volume || 0) + d.volume;
	
				if (!box.startOfYear) {
					box.startOfYear = d.startOfYear;
					if (box.startOfYear) {
						dateMutator(box, dateAccessor(d));
						// box.displayDate = d.displayDate;
					}
				}
	
				if (!box.startOfYear && !box.startOfQuarter) {
					box.startOfQuarter = d.startOfQuarter;
					if (box.startOfQuarter && !box.startOfYear) {
						dateMutator(box, dateAccessor(d));
						// box.displayDate = d.displayDate;
					}
				}
	
				if (!box.startOfQuarter && !box.startOfMonth) {
					box.startOfMonth = d.startOfMonth;
					if (box.startOfMonth && !box.startOfQuarter) {
						dateMutator(box, dateAccessor(d));
						// box.displayDate = d.displayDate;
					}
				}
				if (!box.startOfMonth && !box.startOfWeek) {
					box.startOfWeek = d.startOfWeek;
					if (box.startOfWeek && !box.startOfMonth) {
						dateMutator(box, dateAccessor(d));
						// box.displayDate = d.displayDate;
					}
				}
	
				if (columnData.length === 1 && column.boxes.length === 0) {
					var upwardMovement = Math.max(pricingMethod(d).high - column.open, 0); // upward movement
					var downwardMovement = Math.abs(Math.min(column.open - pricingMethod(d).low, 0)); // downward movement
					column.direction = upwardMovement > downwardMovement ? 1 : -1;
					if (boxSize * reversal < upwardMovement || boxSize * reversal < downwardMovement) {
						// enough movement to trigger a reversal
						box.toDate = dateAccessor(d);
						box.open = column.open;
						var noOfBoxes = column.direction > 0 ? Math.floor(upwardMovement / boxSize) : Math.floor(downwardMovement / boxSize);
						for (var i = 0; i < noOfBoxes; i++) {
							box.close = box.open + column.direction * boxSize;
							var _prevBoxClose = box.close;
							column.boxes.push(box);
							box = createBox(box, dateAccessor, dateMutator);
							// box = cloneMe(box);
							box.open = _prevBoxClose;
						}
						box.fromDate = dateAccessor(d);
						box.date = dateAccessor(d);
					}
				} else {
					// one or more boxes already formed in the current column
					var upwardMovement = Math.max(pricingMethod(d).high - box.open, 0); // upward movement
					var downwardMovement = Math.abs(Math.min(pricingMethod(d).low - box.open, 0)); // downward movement
	
					if (column.direction > 0 && upwardMovement > boxSize || /* rising column AND box can be formed */
					column.direction < 0 && downwardMovement > boxSize /* falling column AND box can be formed */) {
							// form another box
							box.close = box.open + column.direction * boxSize;
							box.toDate = dateAccessor(d);
							var _prevBoxClose2 = box.close;
							column.boxes.push(box);
							box = createBox(d, dateAccessor, dateMutator);
							box.open = _prevBoxClose2;
							box.fromDate = dateAccessor(d);
							dateMutator(box, dateAccessor(d));
						} else if (column.direction > 0 && downwardMovement > boxSize * reversal || /* rising column and there is downward movement to trigger a reversal */
					column.direction < 0 && upwardMovement > boxSize * reversal /* falling column and there is downward movement to trigger a reversal */) {
							// reversal
	
							box.open = box.open + -1 * column.direction * boxSize;
							box.toDate = dateAccessor(d);
							// box.displayDate = d.displayDate;
							dateMutator(box, dateAccessor(d));
							// box.startOfYear = d.startOfYear;
							// box.startOfQuarter = d.startOfQuarter;
							// box.startOfMonth = d.startOfMonth;
							// box.startOfWeek = d.startOfWeek;
							// console.table(column.boxes);
							var idx = indexAccessor(column) + 1;
							column = {
								boxes: [],
								volume: 0,
								direction: -1 * column.direction
							};
							indexMutator(column, idx);
							var noOfBoxes = column.direction > 0 ? Math.floor(upwardMovement / boxSize) : Math.floor(downwardMovement / boxSize);
							for (var i = 0; i < noOfBoxes; i++) {
								box.close = box.open + column.direction * boxSize;
								var prevBoxClose = box.close;
								column.boxes.push(box);
								box = createBox(d, dateAccessor, dateMutator);
								box.open = prevBoxClose;
							}
	
							columnData.push(column);
						}
				}
			});
			updateColumns(columnData, dateAccessor, dateMutator);
	
			return { "D": columnData };
		};
	
		transform.options = function (opt) {
			newOptions = (0, _objectAssign2["default"])({}, _defaultOptions.PointAndFigure, opt);
			return newOptions;
		};
		return transform;
	}
	
	exports["default"] = PointAndFigureTransformer;
	module.exports = exports["default"];

/***/ },
/* 44 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsUtils = __webpack_require__(7);
	
	var CanvasContainer = (function (_React$Component) {
		_inherits(CanvasContainer, _React$Component);
	
		function CanvasContainer() {
			_classCallCheck(this, CanvasContainer);
	
			_get(Object.getPrototypeOf(CanvasContainer.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(CanvasContainer, [{
			key: "getCanvasContexts",
			value: function getCanvasContexts() {
				var axesCanvasDOM = (0, _utilsUtils.isReactVersion14)() ? this.refs.canvas_axes : _react2["default"].findDOMNode(this.refs.canvas_axes);
	
				var mouseCoordDOM = (0, _utilsUtils.isReactVersion14)() ? this.refs.canvas_mouse_coordinates : _react2["default"].findDOMNode(this.refs.canvas_mouse_coordinates);
	
				var interactiveDOM = (0, _utilsUtils.isReactVersion14)() ? this.refs.canvas_interactive : _react2["default"].findDOMNode(this.refs.canvas_interactive);
	
				var bgDOM = (0, _utilsUtils.isReactVersion14)() ? this.refs.bg : _react2["default"].findDOMNode(this.refs.bg);
	
				if (this.refs.canvas_axes) {
					return {
						axes: axesCanvasDOM.getContext("2d"),
						mouseCoord: mouseCoordDOM.getContext("2d"),
						interactive: interactiveDOM.getContext("2d"),
						bg: bgDOM.getContext("2d")
					};
				}
			}
		}, {
			key: "render",
			value: function render() {
				var _props = this.props;
				var height = _props.height;
				var width = _props.width;
				var type = _props.type;
				var zIndex = _props.zIndex;
	
				if (type === "svg") return null;
				return _react2["default"].createElement(
					"div",
					{ style: { zIndex: zIndex } },
					_react2["default"].createElement("canvas", { ref: "bg", width: width, height: height,
						style: { position: "absolute", left: 0, top: 0 } }),
					_react2["default"].createElement("canvas", { ref: "canvas_axes", width: width, height: height,
						style: { position: "absolute", left: 0, top: 0 } }),
					_react2["default"].createElement("canvas", { ref: "canvas_mouse_coordinates", width: width, height: height,
						style: { position: "absolute", left: 0, top: 0 } }),
					_react2["default"].createElement("canvas", { ref: "canvas_interactive", width: width, height: height,
						style: { position: "absolute", left: 0, top: 0 } })
				);
			}
		}]);
	
		return CanvasContainer;
	})(_react2["default"].Component);
	
	CanvasContainer.propTypes = {
		width: _react2["default"].PropTypes.number.isRequired,
		height: _react2["default"].PropTypes.number.isRequired,
		type: _react2["default"].PropTypes.string.isRequired,
		zIndex: _react2["default"].PropTypes.number
	};
	
	exports["default"] = CanvasContainer;
	module.exports = exports["default"];

/***/ },
/* 45 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _d3 = __webpack_require__(8);
	
	var _d32 = _interopRequireDefault(_d3);
	
	var _objectAssign = __webpack_require__(4);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _utilsPureComponent = __webpack_require__(5);
	
	var _utilsPureComponent2 = _interopRequireDefault(_utilsPureComponent);
	
	var _utilsUtils = __webpack_require__(7);
	
	var _utilsChartDataUtil = __webpack_require__(13);
	
	var Chart = (function (_PureComponent) {
		_inherits(Chart, _PureComponent);
	
		function Chart() {
			_classCallCheck(this, Chart);
	
			_get(Object.getPrototypeOf(Chart.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(Chart, [{
			key: "constuctor",
			value: function constuctor(props) {
				// super(props);
				this.yScale = this.yScale.bind(this);
			}
		}, {
			key: "yScale",
			value: function yScale() {
				var _this = this;
	
				var chartData = this.context.chartData.filter(function (each) {
					return each.id === _this.props.id;
				})[0];
				return chartData.plot.scales.yScale.copy();
			}
		}, {
			key: "getChildContext",
			value: function getChildContext() {
				var _this2 = this;
	
				var chartData = this.context.chartData.filter(function (each) {
					return each.id === _this2.props.id;
				})[0];
	
				var originX = 0.5 + chartData.config.origin[0] + this.context.margin.left;
				var originY = 0.5 + chartData.config.origin[1] + this.context.margin.top;
	
				// console.log(chartData.config.compareSeries);
				return {
					chartId: this.props.id,
					xScale: chartData.plot.scales.xScale,
					yScale: chartData.plot.scales.yScale,
					xAccessor: chartData.config.xAccessor,
					overlays: chartData.config.overlays,
					compareSeries: chartData.config.compareSeries,
					chartData: chartData,
					width: chartData.config.width,
					height: chartData.config.height,
					canvasOriginX: originX,
					canvasOriginY: originY
				};
			}
		}, {
			key: "render",
			value: function render() {
				var _this3 = this;
	
				var origin = (0, _utilsChartDataUtil.getChartOrigin)(this.props.origin, this.context.width, this.context.height);
				var children = _react2["default"].Children.map(this.props.children, function (child) {
					if (child === undefined || child === null) return child;
					var newChild = (0, _utilsUtils.isReactVersion13)() ? _react2["default"].withContext(_this3.getChildContext(), function () {
						return _react2["default"].createElement(child.type, (0, _objectAssign2["default"])({ key: child.key, ref: child.ref }, child.props));
					}) : child;
					return newChild;
				});
				var x = origin[0]; // + 0.5; // refer to http://www.rgraph.net/docs/howto-get-crisp-lines-with-no-antialias.html - similar fix for svg here
				var y = origin[1]; // + 0.5; // refer to http://www.rgraph.net/docs/howto-get-crisp-lines-with-no-antialias.html - similar fix for svg here
				return _react2["default"].createElement(
					"g",
					{ transform: "translate(" + x + ", " + y + ")" },
					children
				);
			}
		}]);
	
		return Chart;
	})(_utilsPureComponent2["default"]);
	
	Chart.propTypes = {
		height: _react2["default"].PropTypes.number,
		width: _react2["default"].PropTypes.number,
		origin: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.array, _react2["default"].PropTypes.func]).isRequired,
		id: _react2["default"].PropTypes.number.isRequired,
		xScale: _react2["default"].PropTypes.func,
		yScale: _react2["default"].PropTypes.func.isRequired,
		xDomainUpdate: _react2["default"].PropTypes.bool,
		yDomainUpdate: _react2["default"].PropTypes.bool,
		yMousePointerDisplayLocation: _react2["default"].PropTypes.oneOf(["left", "right"]),
		yMousePointerDisplayFormat: _react2["default"].PropTypes.func,
		padding: _react2["default"].PropTypes.object.isRequired
	};
	
	Chart.defaultProps = {
		id: 0,
		namespace: "ReStock.Chart",
		transformDataAs: "none",
		xDomainUpdate: true,
		yDomainUpdate: true,
		origin: [0, 0],
		padding: { top: 0, right: 0, bottom: 0, left: 0 },
		yScale: _d32["default"].scale.linear()
	};
	
	Chart.contextTypes = {
		width: _react2["default"].PropTypes.number.isRequired,
		height: _react2["default"].PropTypes.number.isRequired,
		chartData: _react2["default"].PropTypes.array,
		margin: _react2["default"].PropTypes.object.isRequired,
		interactiveState: _react2["default"].PropTypes.array.isRequired
	};
	
	// adding here even when this is not used by Chart, refer to https://github.com/facebook/react/issues/2517
	Chart.childContextTypes = {
		xScale: _react2["default"].PropTypes.func.isRequired,
		yScale: _react2["default"].PropTypes.func.isRequired,
		xAccessor: _react2["default"].PropTypes.func.isRequired,
		chartData: _react2["default"].PropTypes.object.isRequired,
		overlays: _react2["default"].PropTypes.array.isRequired,
		compareSeries: _react2["default"].PropTypes.array.isRequired,
		width: _react2["default"].PropTypes.number.isRequired,
		height: _react2["default"].PropTypes.number.isRequired,
		canvasOriginX: _react2["default"].PropTypes.number,
		canvasOriginY: _react2["default"].PropTypes.number,
		chartId: _react2["default"].PropTypes.number.isRequired
	};
	
	exports["default"] = Chart;
	module.exports = exports["default"];

/***/ },
/* 46 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _objectAssign = __webpack_require__(4);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _utilsUtils = __webpack_require__(7);
	
	// Cannot make this PureComponent because its children use some things from context
	// and making this pure would stop its children from updating on state changes of EventHandler
	// refer to https://github.com/facebook/react/issues/2517
	
	var DataSeries = (function (_React$Component) {
		_inherits(DataSeries, _React$Component);
	
		function DataSeries() {
			_classCallCheck(this, DataSeries);
	
			_get(Object.getPrototypeOf(DataSeries.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(DataSeries, [{
			key: "getChildContext",
			value: function getChildContext() {
				var _this = this;
	
				var overlay = this.context.overlays.filter(function (each) {
					return each.id === _this.props.id;
				})[0];
	
				return {
					seriesId: this.props.id,
					yAccessor: overlay.yAccessor,
					indicator: overlay.indicator,
					stroke: overlay.stroke,
					fill: overlay.fill
				};
			}
		}, {
			key: "render",
			value: function render() {
				var _this2 = this;
	
				var children = _react2["default"].Children.map(this.props.children, function (child) {
					var newChild = (0, _utilsUtils.isReactVersion13)() ? _react2["default"].withContext(_this2.getChildContext(), function () {
						return _react2["default"].createElement(child.type, (0, _objectAssign2["default"])({ key: child.key, ref: child.ref }, child.props));
					}) : child;
					return newChild;
				});
				return _react2["default"].createElement(
					"g",
					{ style: { "clipPath": "url(#chart-area-clip)" } },
					children
				);
			}
		}]);
	
		return DataSeries;
	})(_react2["default"].Component);
	
	DataSeries.propTypes = {
		// type: React.PropTypes.oneOf(["sma", "ema"]),
		id: _react2["default"].PropTypes.number.isRequired,
		// stroke: React.PropTypes.string
		// xAccessor: React.PropTypes.func,
		yAccessor: _react2["default"].PropTypes.func,
		indicator: _react2["default"].PropTypes.func,
		options: _react2["default"].PropTypes.object,
		children: _react2["default"].PropTypes.node
	};
	DataSeries.defaultProps = {
		namespace: "ReStock.DataSeries",
		compareBase: function compareBase(d) {
			return d.close;
		}
	};
	DataSeries.contextTypes = {
		overlays: _react2["default"].PropTypes.array.isRequired
	};
	DataSeries.childContextTypes = {
		seriesId: _react2["default"].PropTypes.number.isRequired,
		yAccessor: _react2["default"].PropTypes.func.isRequired,
		indicator: _react2["default"].PropTypes.func,
		stroke: _react2["default"].PropTypes.string,
		fill: _react2["default"].PropTypes.string
	};
	
	exports["default"] = DataSeries;
	module.exports = exports["default"];

/***/ },
/* 47 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsPureComponent = __webpack_require__(5);
	
	var _utilsPureComponent2 = _interopRequireDefault(_utilsPureComponent);
	
	var _utilsUtils = __webpack_require__(7);
	
	var BackgroundText = (function (_PureComponent) {
		_inherits(BackgroundText, _PureComponent);
	
		function BackgroundText() {
			_classCallCheck(this, BackgroundText);
	
			_get(Object.getPrototypeOf(BackgroundText.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(BackgroundText, [{
			key: "componentDidMount",
			value: function componentDidMount() {
				if (this.context.chartCanvasType !== "svg" && this.context.getCanvasContexts !== undefined) {
					var contexts = this.context.getCanvasContexts();
					if (contexts) BackgroundText.drawOnCanvas(contexts.bg, this.props, this.context, this.props.children);
				}
			}
		}, {
			key: "componentDidUpdate",
			value: function componentDidUpdate() {
				this.componentDidMount();
			}
		}, {
			key: "render",
			value: function render() {
				var chartCanvasType = this.context.chartCanvasType;
	
				if (chartCanvasType !== "svg") return null;
	
				var _props = this.props;
				var x = _props.x;
				var y = _props.y;
				var fill = _props.fill;
				var opacity = _props.opacity;
				var stroke = _props.stroke;
				var strokeOpacity = _props.strokeOpacity;
				var fontFamily = _props.fontFamily;
				var fontSize = _props.fontSize;
				var textAnchor = _props.textAnchor;
	
				var props = { x: x, y: y, fill: fill, opacity: opacity, stroke: stroke, strokeOpacity: strokeOpacity, fontFamily: fontFamily, fontSize: fontSize, textAnchor: textAnchor };
				return _react2["default"].createElement(
					"text",
					props,
					"this.props.children(interval)"
				);
			}
		}]);
	
		return BackgroundText;
	})(_utilsPureComponent2["default"]);
	
	BackgroundText.drawOnCanvas = function (ctx, props, _ref, getText) {
		var interval = _ref.interval;
	
		ctx.clearRect(-1, -1, ctx.canvas.width + 2, ctx.canvas.height + 2);
		ctx.save();
	
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.translate(0.5, 0.5);
	
		var x = props.x;
		var y = props.y;
		var fill = props.fill;
		var opacity = props.opacity;
		var stroke = props.stroke;
		var strokeOpacity = props.strokeOpacity;
		var fontFamily = props.fontFamily;
		var fontSize = props.fontSize;
		var textAnchor = props.textAnchor;
	
		var text = getText(interval);
	
		ctx.strokeStyle = (0, _utilsUtils.hexToRGBA)(stroke, strokeOpacity);
	
		ctx.font = fontSize + "px " + fontFamily;
		ctx.fillStyle = (0, _utilsUtils.hexToRGBA)(fill, opacity);
		ctx.textAlign = textAnchor === "middle" ? "center" : textAnchor;
	
		if (stroke !== "none") ctx.strokeText(text, x, y);
		ctx.fillText(text, x, y);
	
		ctx.restore();
	};
	
	BackgroundText.propTypes = {
		x: _react2["default"].PropTypes.number.isRequired,
		y: _react2["default"].PropTypes.number.isRequired,
		fontFamily: _react2["default"].PropTypes.string,
		fontSize: _react2["default"].PropTypes.number.isRequired
	};
	
	BackgroundText.defaultProps = {
		opacity: 0.3,
		fill: "#9E7523",
		stroke: "#9E7523",
		strokeOpacity: 1,
		fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
		fontSize: 12,
		textAnchor: "middle"
	};
	
	BackgroundText.contextTypes = {
		interval: _react2["default"].PropTypes.string.isRequired,
		getCanvasContexts: _react2["default"].PropTypes.func,
		chartCanvasType: _react2["default"].PropTypes.string
	};
	
	exports["default"] = BackgroundText;
	module.exports = exports["default"];

/***/ },
/* 48 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _d3 = __webpack_require__(8);
	
	var _d32 = _interopRequireDefault(_d3);
	
	var _utilsUtils = __webpack_require__(7);
	
	var mousemove = "mousemove.pan",
	    mouseup = "mouseup.pan";
	
	function d3Window(node) {
		var d3win = node && (node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView);
		return d3win;
	}
	
	function getTouchProps(touch) {
		if (!touch) return {};
		return {
			pageX: touch.pageX,
			pageY: touch.pageY,
			clientX: touch.clientX,
			clientY: touch.clientY
		};
	}
	
	var EventCapture = (function (_React$Component) {
		_inherits(EventCapture, _React$Component);
	
		function EventCapture(props) {
			_classCallCheck(this, EventCapture);
	
			_get(Object.getPrototypeOf(EventCapture.prototype), "constructor", this).call(this, props);
			this.handleEnter = this.handleEnter.bind(this);
			this.handleLeave = this.handleLeave.bind(this);
			this.handleWheel = this.handleWheel.bind(this);
			this.handleMouseMove = this.handleMouseMove.bind(this);
			this.handleMouseDown = this.handleMouseDown.bind(this);
			this.handlePanEnd = this.handlePanEnd.bind(this);
			this.handlePan = this.handlePan.bind(this);
			this.handleTouchStart = this.handleTouchStart.bind(this);
			this.handleTouchMove = this.handleTouchMove.bind(this);
			this.handleTouchEnd = this.handleTouchEnd.bind(this);
			this.lastTouch = {};
			this.initialPinch = {};
			this.mouseInteraction = true;
		}
	
		_createClass(EventCapture, [{
			key: "componentWillMount",
			value: function componentWillMount() {
				if (this.context.onFocus) this.context.onFocus(this.props.defaultFocus);
			}
		}, {
			key: "handleEnter",
			value: function handleEnter() {
				if (this.context.onMouseEnter) {
					this.context.onMouseEnter();
				}
			}
		}, {
			key: "handleLeave",
			value: function handleLeave() {
				if (this.context.onMouseLeave) {
					this.context.onMouseLeave();
				}
			}
		}, {
			key: "handleWheel",
			value: function handleWheel(e) {
				if (this.props.zoom && this.context.onZoom && this.context.focus) {
					e.stopPropagation();
					e.preventDefault();
					var zoomDir = e.deltaY > 0 ? this.props.zoomMultiplier : -this.props.zoomMultiplier;
					var newPos = (0, _utilsUtils.mousePosition)(e);
					this.context.onZoom(zoomDir, newPos);
					if (this.props.onZoom) {
						this.props.onZoom(e);
					}
				}
			}
		}, {
			key: "handleMouseMove",
			value: function handleMouseMove(e) {
				if (this.mouseInteraction && this.context.onMouseMove && this.props.mouseMove) {
					if (!this.context.panInProgress) {
						var newPos = (0, _utilsUtils.mousePosition)(e);
						this.context.onMouseMove(newPos, "mouse", e);
					}
				}
			}
		}, {
			key: "handleMouseDown",
			value: function handleMouseDown(e) {
				var mouseEvent = e || _d32["default"].event;
				var _props = this.props;
				var mainChart = _props.mainChart;
				var pan = _props.pan;
				var _context = this.context;
				var onPanStart = _context.onPanStart;
				var focus = _context.focus;
				var onFocus = _context.onFocus;
				var chartData = _context.chartData;
	
				var mainChartData = chartData.filter(function (each) {
					return each.id === mainChart;
				})[0];
				if (this.mouseInteraction && pan && onPanStart) {
					var mouseXY = (0, _utilsUtils.mousePosition)(mouseEvent);
	
					var dx = mouseEvent.pageX - mouseXY[0],
					    dy = mouseEvent.pageY - mouseXY[1];
	
					var captureDOM = this.refs.capture;
	
					var win = d3Window(captureDOM);
					_d32["default"].select(win).on(mousemove, this.handlePan).on(mouseup, this.handlePanEnd);
	
					onPanStart(mainChartData.plot.scales.xScale.domain(), mouseXY, [dx, dy]);
				} else {
					if (!focus && onFocus) onFocus(true);
				}
				mouseEvent.preventDefault();
			}
		}, {
			key: "handleRightClick",
			value: function handleRightClick(e) {
				e.preventDefault();
				// console.log("RIGHT CLICK");
			}
		}, {
			key: "handlePan",
			value: function handlePan() {
				// console.log("handlePan")
				var _props2 = this.props;
				var mainChart = _props2.mainChart;
				var panEnabled = _props2.pan;
				var panListener = _props2.onPan;
				var _context2 = this.context;
				var dxdy = _context2.deltaXY;
				var chartData = _context2.chartData;
				var onPan = _context2.onPan;
	
				var e = _d32["default"].event;
				var newPos = [e.pageX - dxdy[0], e.pageY - dxdy[1]];
				// console.log("moved from- ", startXY, " to ", newPos);
				if (this.mouseInteraction && panEnabled && onPan) {
					var mainChartData = chartData.filter(function (each) {
						return each.id === mainChart;
					})[0];
					onPan(newPos, mainChartData.plot.scales.xScale.domain());
					if (panListener) {
						panListener(e);
					}
				}
			}
		}, {
			key: "handlePanEnd",
			value: function handlePanEnd() {
				var e = _d32["default"].event;
	
				var panEnabled = this.props.pan;
				var _context3 = this.context;
				var dxdy = _context3.deltaXY;
				var onPanEnd = _context3.onPanEnd;
	
				var newPos = [e.pageX - dxdy[0], e.pageY - dxdy[1]];
	
				var captureDOM = this.refs.capture;
	
				var win = d3Window(captureDOM);
	
				if (this.mouseInteraction && panEnabled && onPanEnd) {
					_d32["default"].select(win).on(mousemove, null).on(mouseup, null);
					onPanEnd(newPos, e);
				}
				// e.preventDefault();
			}
		}, {
			key: "handleTouchStart",
			value: function handleTouchStart(e) {
				this.mouseInteraction = false;
	
				var _props3 = this.props;
				var mainChart = _props3.mainChart;
				var panEnabled = _props3.pan;
				var dxdy = this.context.deltaXY;
				var _context4 = this.context;
				var onPanStart = _context4.onPanStart;
				var onMouseMove = _context4.onMouseMove;
				var chartData = _context4.chartData;
				var onPanEnd = _context4.onPanEnd;
				var panInProgress = _context4.panInProgress;
	
				var mainChartData = chartData.filter(function (each) {
					return each.id === mainChart;
				})[0];
	
				if (e.touches.length === 1) {
					var touch = getTouchProps(e.touches[0]);
					this.lastTouch = touch;
					var touchXY = (0, _utilsUtils.touchPosition)(touch, e);
					onMouseMove(touchXY, "touch", e);
					if (panEnabled && onPanStart) {
						var dx = touch.pageX - touchXY[0],
						    dy = touch.pageY - touchXY[1];
	
						onPanStart(mainChartData.plot.scales.xScale.domain(), touchXY, [dx, dy]);
					}
				} else if (e.touches.length === 2) {
					// pinch zoom begin
					// do nothing pinch zoom is handled in handleTouchMove
					var touch1 = getTouchProps(e.touches[0]);
	
					if (panInProgress && panEnabled && onPanEnd) {
						// end pan first
						var newPos = [touch1.pageX - dxdy[0], touch1.pageY - dxdy[1]];
						onPanEnd(newPos, e);
						this.lastTouch = null;
					}
				}
	
				if (e.touches.length !== 2) this.initialPinch = null;
				// var newPos = mousePosition(e);
				// console.log("handleTouchStart", e);
				e.preventDefault();
				// e.stopPropagation();
				// this.context.onMouseMove(newPos, e);
			}
		}, {
			key: "handleTouchMove",
			value: function handleTouchMove(e) {
				var _props4 = this.props;
				var mainChart = _props4.mainChart;
				var panEnabled = _props4.pan;
				var panListener = _props4.onPan;
				var zoomEnabled = _props4.zoom;
				var _context5 = this.context;
				var dxdy = _context5.deltaXY;
				var chartData = _context5.chartData;
				var onPan = _context5.onPan;
				var onPinchZoom = _context5.onPinchZoom;
				var focus = _context5.focus;
				var panInProgress = _context5.panInProgress;
	
				var mainChartData = chartData.filter(function (each) {
					return each.id === mainChart;
				})[0];
				if (e.touches.length === 1) {
					// pan
					var touch = this.lastTouch = getTouchProps(e.touches[0]);
	
					var newPos = [touch.pageX - dxdy[0], touch.pageY - dxdy[1]];
					if (panInProgress && panEnabled && onPan) {
						onPan(newPos, mainChartData.plot.scales.xScale.domain());
						if (panListener) {
							panListener(e);
						}
					}
				} else if (e.touches.length === 2) {
					// pinch zoom
					if (zoomEnabled && onPinchZoom && focus) {
						var touch1 = getTouchProps(e.touches[0]);
						var touch2 = getTouchProps(e.touches[1]);
	
						var touch1Pos = (0, _utilsUtils.touchPosition)(touch1, e);
						var touch2Pos = (0, _utilsUtils.touchPosition)(touch2, e);
	
						if (this.initialPinch === null) {
							this.initialPinch = {
								touch1Pos: touch1Pos,
								touch2Pos: touch2Pos,
								range: mainChartData.plot.scales.xScale.range(),
								mainChartData: mainChartData
							};
						} else if (this.initialPinch && !panInProgress) {
							onPinchZoom(this.initialPinch, {
								touch1Pos: touch1Pos,
								touch2Pos: touch2Pos,
								mainChartData: mainChartData
							});
						}
					}
				}
				e.preventDefault();
	
				// console.log("handleTouchMove", e);
			}
		}, {
			key: "handleTouchEnd",
			value: function handleTouchEnd(e) {
				// TODO enableMouseInteraction
				var panEnabled = this.props.pan;
				var _context6 = this.context;
				var dxdy = _context6.deltaXY;
				var onPanEnd = _context6.onPanEnd;
				var panInProgress = _context6.panInProgress;
	
				if (this.lastTouch) {
					var newPos = [this.lastTouch.pageX - dxdy[0], this.lastTouch.pageY - dxdy[1]];
	
					this.initialPinch = null;
					if (panInProgress && panEnabled && onPanEnd) {
						onPanEnd(newPos, e);
					}
				}
				// console.log("handleTouchEnd", dxdy, newPos, e);
				this.mouseInteraction = true;
				e.preventDefault();
			}
		}, {
			key: "render",
			value: function render() {
				var className = this.context.panInProgress ? "react-stockcharts-grabbing-cursor" : "react-stockcharts-crosshair-cursor";
	
				return _react2["default"].createElement("rect", { ref: "capture",
					className: className,
					width: this.context.width, height: this.context.height, style: { opacity: 0 },
					onMouseEnter: this.handleEnter,
					onMouseLeave: this.handleLeave,
					onMouseMove: this.handleMouseMove,
					onWheel: this.handleWheel,
					onMouseDown: this.handleMouseDown,
					onContextMenu: this.handleRightClick,
					onTouchStart: this.handleTouchStart,
					onTouchEnd: this.handleTouchEnd,
					onTouchMove: this.handleTouchMove
				});
			}
		}]);
	
		return EventCapture;
	})(_react2["default"].Component);
	
	EventCapture.propTypes = {
		mainChart: _react2["default"].PropTypes.number.isRequired,
		mouseMove: _react2["default"].PropTypes.bool.isRequired,
		zoom: _react2["default"].PropTypes.bool.isRequired,
		zoomMultiplier: _react2["default"].PropTypes.number.isRequired,
		pan: _react2["default"].PropTypes.bool.isRequired,
		panSpeedMultiplier: _react2["default"].PropTypes.number.isRequired,
		defaultFocus: _react2["default"].PropTypes.bool.isRequired,
	
		onZoom: _react2["default"].PropTypes.func,
		onPan: _react2["default"].PropTypes.func
	};
	
	EventCapture.defaultProps = {
		namespace: "ReStock.EventCapture",
		mouseMove: false,
		zoom: false,
		zoomMultiplier: 1,
		pan: false,
		panSpeedMultiplier: 1,
		defaultFocus: false
	};
	
	EventCapture.contextTypes = {
		width: _react2["default"].PropTypes.number.isRequired,
		height: _react2["default"].PropTypes.number.isRequired,
		chartData: _react2["default"].PropTypes.array,
		onMouseMove: _react2["default"].PropTypes.func,
		onMouseEnter: _react2["default"].PropTypes.func,
		onMouseLeave: _react2["default"].PropTypes.func,
		onZoom: _react2["default"].PropTypes.func,
		onPinchZoom: _react2["default"].PropTypes.func,
		onPanStart: _react2["default"].PropTypes.func,
		onPan: _react2["default"].PropTypes.func,
		onPanEnd: _react2["default"].PropTypes.func,
		panInProgress: _react2["default"].PropTypes.bool,
		focus: _react2["default"].PropTypes.bool.isRequired,
		onFocus: _react2["default"].PropTypes.func,
		deltaXY: _react2["default"].PropTypes.arrayOf(Number)
	};
	
	exports["default"] = EventCapture;
	module.exports = exports["default"];

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _AreaSeries = __webpack_require__(50);
	
	var _AreaSeries2 = _interopRequireDefault(_AreaSeries);
	
	var _ScatterSeries = __webpack_require__(55);
	
	var _ScatterSeries2 = _interopRequireDefault(_ScatterSeries);
	
	var _CircleMarker = __webpack_require__(56);
	
	var _CircleMarker2 = _interopRequireDefault(_CircleMarker);
	
	var _LineSeries = __webpack_require__(57);
	
	var _LineSeries2 = _interopRequireDefault(_LineSeries);
	
	var _CompareSeries = __webpack_require__(58);
	
	var _CompareSeries2 = _interopRequireDefault(_CompareSeries);
	
	var _CandlestickSeries = __webpack_require__(59);
	
	var _CandlestickSeries2 = _interopRequireDefault(_CandlestickSeries);
	
	var _OHLCSeries = __webpack_require__(60);
	
	var _OHLCSeries2 = _interopRequireDefault(_OHLCSeries);
	
	var _HistogramSeries = __webpack_require__(61);
	
	var _HistogramSeries2 = _interopRequireDefault(_HistogramSeries);
	
	var _KagiSeries = __webpack_require__(63);
	
	var _KagiSeries2 = _interopRequireDefault(_KagiSeries);
	
	var _PointAndFigureSeries = __webpack_require__(64);
	
	var _PointAndFigureSeries2 = _interopRequireDefault(_PointAndFigureSeries);
	
	var _RenkoSeries = __webpack_require__(65);
	
	var _RenkoSeries2 = _interopRequireDefault(_RenkoSeries);
	
	var _MACDSeries = __webpack_require__(66);
	
	var _MACDSeries2 = _interopRequireDefault(_MACDSeries);
	
	var _BollingerSeries = __webpack_require__(68);
	
	var _BollingerSeries2 = _interopRequireDefault(_BollingerSeries);
	
	var _RSISeries = __webpack_require__(69);
	
	var _RSISeries2 = _interopRequireDefault(_RSISeries);
	
	var _StochasticSeries = __webpack_require__(70);
	
	var _StochasticSeries2 = _interopRequireDefault(_StochasticSeries);
	
	var _ElderRaySeries = __webpack_require__(71);
	
	var _ElderRaySeries2 = _interopRequireDefault(_ElderRaySeries);
	
	var _ElderImpulseBackground = __webpack_require__(72);
	
	var _ElderImpulseBackground2 = _interopRequireDefault(_ElderImpulseBackground);
	
	var _Area = __webpack_require__(54);
	
	var _Area2 = _interopRequireDefault(_Area);
	
	var _Line = __webpack_require__(51);
	
	var _Line2 = _interopRequireDefault(_Line);
	
	var _StraightLine = __webpack_require__(67);
	
	var _StraightLine2 = _interopRequireDefault(_StraightLine);
	
	var _wrap = __webpack_require__(52);
	
	var _wrap2 = _interopRequireDefault(_wrap);
	
	exports.ScatterSeries = _ScatterSeries2["default"];
	exports.CircleMarker = _CircleMarker2["default"];
	exports.AreaSeries = _AreaSeries2["default"];
	exports.LineSeries = _LineSeries2["default"];
	exports.CompareSeries = _CompareSeries2["default"];
	exports.CandlestickSeries = _CandlestickSeries2["default"];
	exports.OHLCSeries = _OHLCSeries2["default"];
	exports.HistogramSeries = _HistogramSeries2["default"];
	exports.KagiSeries = _KagiSeries2["default"];
	exports.PointAndFigureSeries = _PointAndFigureSeries2["default"];
	exports.RenkoSeries = _RenkoSeries2["default"];
	exports.MACDSeries = _MACDSeries2["default"];
	exports.BollingerSeries = _BollingerSeries2["default"];
	exports.RSISeries = _RSISeries2["default"];
	exports.StochasticSeries = _StochasticSeries2["default"];
	exports.ElderRaySeries = _ElderRaySeries2["default"];
	exports.ElderImpulseBackground = _ElderImpulseBackground2["default"];
	exports.Area = _Area2["default"];
	exports.Line = _Line2["default"];
	exports.StraightLine = _StraightLine2["default"];
	exports.wrap = _wrap2["default"];

/***/ },
/* 50 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Line = __webpack_require__(51);
	
	var _Line2 = _interopRequireDefault(_Line);
	
	var _Area = __webpack_require__(54);
	
	var _Area2 = _interopRequireDefault(_Area);
	
	var _wrap = __webpack_require__(52);
	
	var _wrap2 = _interopRequireDefault(_wrap);
	
	var AreaSeries = (function (_React$Component) {
		_inherits(AreaSeries, _React$Component);
	
		function AreaSeries() {
			_classCallCheck(this, AreaSeries);
	
			_get(Object.getPrototypeOf(AreaSeries.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(AreaSeries, [{
			key: "render",
			value: function render() {
				var props = this.props;
				var className = props.className;
				var xScale = props.xScale;
				var yScale = props.yScale;
				var xAccessor = props.xAccessor;
				var yAccessor = props.yAccessor;
				var plotData = props.plotData;
				var type = props.type;
				var stroke = props.stroke;
				var fill = props.fill;
				var baseAt = props.baseAt;
				var opacity = props.opacity;
	
				return _react2["default"].createElement(
					"g",
					{ className: className },
					_react2["default"].createElement(_Line2["default"], {
						xScale: xScale, yScale: yScale,
						xAccessor: xAccessor, yAccessor: yAccessor,
						plotData: plotData,
						stroke: stroke, fill: "none",
						type: type }),
					_react2["default"].createElement(_Area2["default"], {
						xScale: xScale, yScale: yScale,
						xAccessor: xAccessor, yAccessor: yAccessor,
						plotData: plotData,
						base: baseAt,
						stroke: "none", fill: fill, opacity: opacity,
						type: type })
				);
			}
		}]);
	
		return AreaSeries;
	})(_react2["default"].Component);
	
	AreaSeries.propTypes = {
		stroke: _react2["default"].PropTypes.string,
		fill: _react2["default"].PropTypes.string.isRequired,
		opacity: _react2["default"].PropTypes.number.isRequired,
		className: _react2["default"].PropTypes.string
	};
	
	AreaSeries.defaultProps = {
		stroke: "#4682B4",
		opacity: 0.5,
		fill: "#4682B4",
		className: "react-stockcharts-area"
	};
	
	AreaSeries.yAccessor = function (d) {
		return d.close;
	};
	
	exports["default"] = (0, _wrap2["default"])(AreaSeries);
	module.exports = exports["default"];

/***/ },
/* 51 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _d3 = __webpack_require__(8);
	
	var _d32 = _interopRequireDefault(_d3);
	
	var _wrap = __webpack_require__(52);
	
	var _wrap2 = _interopRequireDefault(_wrap);
	
	var Line = (function (_React$Component) {
		_inherits(Line, _React$Component);
	
		function Line() {
			_classCallCheck(this, Line);
	
			_get(Object.getPrototypeOf(Line.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(Line, [{
			key: "render",
			value: function render() {
				var _props = this.props;
				var stroke = _props.stroke;
				var fill = _props.fill;
				var className = _props.className;
	
				className = className.concat(stroke ? "" : " line-stroke");
				return _react2["default"].createElement("path", { d: Line.getPath(this.props), stroke: stroke, fill: fill, className: className });
			}
		}]);
	
		return Line;
	})(_react2["default"].Component);
	
	Line.propTypes = {
		className: _react2["default"].PropTypes.string,
		xScale: _react2["default"].PropTypes.func.isRequired,
		yScale: _react2["default"].PropTypes.func.isRequired,
		xAccessor: _react2["default"].PropTypes.func.isRequired,
		yAccessor: _react2["default"].PropTypes.func.isRequired,
		plotData: _react2["default"].PropTypes.array.isRequired,
		stroke: _react2["default"].PropTypes.string,
		fill: _react2["default"].PropTypes.string
	};
	
	Line.defaultProps = {
		className: "line ",
		fill: "none",
		stroke: "black"
	};
	
	Line.getPath = function (props) {
		var plotData = props.plotData;
		var xScale = props.xScale;
		var yScale = props.yScale;
		var xAccessor = props.xAccessor;
		var yAccessor = props.yAccessor;
	
		var dataSeries = _d32["default"].svg.line().defined(function (d) {
			return yAccessor(d) !== undefined;
		}).x(function (d) {
			return xScale(xAccessor(d));
		}).y(function (d) {
			return yScale(yAccessor(d));
		});
		return dataSeries(plotData);
	};
	
	Line.drawOnCanvas = function (props, ctx, xScale, yScale, plotData) {
		var xAccessor = props.xAccessor;
		var yAccessor = props.yAccessor;
		var stroke = props.stroke;
	
		ctx.strokeStyle = stroke;
		ctx.beginPath();
	
		var begin = true;
		plotData.forEach(function (d) {
			if (yAccessor(d) === undefined) {
				ctx.stroke();
				ctx.beginPath();
				begin = true;
			} else {
				if (begin) {
					begin = false;
					var x = ~ ~(0.5 + xScale(xAccessor(d)));
					var y = ~ ~(0.5 + yScale(yAccessor(d)));
	
					ctx.moveTo(x, y);
				}
				ctx.lineTo(xScale(xAccessor(d)), yScale(yAccessor(d)));
			}
		});
		ctx.stroke();
	};
	
	exports["default"] = (0, _wrap2["default"])(Line);
	module.exports = exports["default"];

/***/ },
/* 52 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _objectAssign = __webpack_require__(4);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _pure = __webpack_require__(53);
	
	var _pure2 = _interopRequireDefault(_pure);
	
	function getDisplayName(Series) {
		var name = Series.displayName || Series.name || "Series";
		return name;
	}
	
	function wrap(WrappedSeries) {
		var BaseCanvasSeries = (function (_React$Component) {
			_inherits(BaseCanvasSeries, _React$Component);
	
			function BaseCanvasSeries() {
				_classCallCheck(this, BaseCanvasSeries);
	
				_get(Object.getPrototypeOf(BaseCanvasSeries.prototype), "constructor", this).apply(this, arguments);
			}
	
			_createClass(BaseCanvasSeries, [{
				key: "componentDidMount",
				value: function componentDidMount() {
					var callback = WrappedSeries.drawOnCanvas;
					if (callback) {
						var chartCanvasType = this.context.chartCanvasType;
						var getCanvasContexts = this.props.getCanvasContexts;
	
						if (chartCanvasType !== "svg" && getCanvasContexts !== undefined) {
							var contexts = getCanvasContexts();
							var defaultProps = WrappedSeries.defaultProps;
	
							var props = (0, _objectAssign2["default"])({}, defaultProps, this.props);
							if (contexts) BaseCanvasSeries.baseReStockDrawOnCanvasHelper(contexts.axes, props, callback);
						}
					}
				}
			}, {
				key: "componentDidUpdate",
				value: function componentDidUpdate() {
					this.componentDidMount();
				}
			}, {
				key: "componentWillMount",
				value: function componentWillMount() {
					this.componentWillReceiveProps(this.props);
				}
			}, {
				key: "componentWillReceiveProps",
				value: function componentWillReceiveProps(nextProps) {
					var callback = WrappedSeries.drawOnCanvas;
					if (callback) {
						var canvasOriginX = nextProps.canvasOriginX;
						var canvasOriginY = nextProps.canvasOriginY;
						var height = nextProps.height;
						var width = nextProps.width;
						var compareSeries = nextProps.compareSeries;
						var indicator = nextProps.indicator;
						var xAccessor = nextProps.xAccessor;
						var yAccessor = nextProps.yAccessor;
						var seriesId = nextProps.seriesId;
						var chartId = nextProps.chartId;
	
						var canvasOrigin = [canvasOriginX, canvasOriginY];
	
						var defaultProps = WrappedSeries.defaultProps;
	
						var props = (0, _objectAssign2["default"])({}, defaultProps, nextProps);
	
						var draw = BaseCanvasSeries.baseReStockDrawOnCanvas.bind(null, props, callback, canvasOrigin, height, width, compareSeries, indicator, xAccessor, yAccessor);
	
						nextProps.callbackForCanvasDraw({
							chartId: chartId,
							seriesId: seriesId,
							draw: draw
						});
					}
				}
			}, {
				key: "render",
				value: function render() {
					var callback = WrappedSeries.drawOnCanvas;
					var chartCanvasType = this.props.chartCanvasType;
	
					if (chartCanvasType !== "svg" && callback !== undefined) return null;
	
					return _react2["default"].createElement(WrappedSeries, _extends({ ref: "wrappedSeries"
					}, this.props));
				}
			}]);
	
			return BaseCanvasSeries;
		})(_react2["default"].Component);
	
		;
	
		BaseCanvasSeries.displayName = "wrap(" + getDisplayName(WrappedSeries) + ")";
	
		BaseCanvasSeries.baseReStockDrawOnCanvasHelper = function (canvasContext, props, callback) {
			var height = props.height;
			var width = props.width;
			var compareSeries = props.compareSeries;
			var indicator = props.indicator;
			var xAccessor = props.xAccessor;
			var yAccessor = props.yAccessor;
			var xScale = props.xScale;
			var yScale = props.yScale;
			var plotData = props.plotData;
			var canvasOriginX = props.canvasOriginX;
			var canvasOriginY = props.canvasOriginY;
	
			var canvasOrigin = [canvasOriginX, canvasOriginY];
	
			BaseCanvasSeries.baseReStockDrawOnCanvas(props, callback, canvasOrigin, height, width, compareSeries, indicator, xAccessor, yAccessor, canvasContext, xScale, yScale, plotData);
		};
	
		BaseCanvasSeries.baseReStockDrawOnCanvas = function (props, callback, canvasOrigin, height, width, compareSeries, indicator, xAccessor, yAccessor, ctx, xScale, yScale, plotData) {
	
			ctx.save();
	
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.translate(canvasOrigin[0], canvasOrigin[1]);
	
			ctx.beginPath();
			ctx.rect(-1, -1, width + 1, height + 1);
			ctx.clip();
	
			// console.log(canvasOrigin, width, height);
	
			// console.log("HERE");
			if (callback) {
				var newProps = (0, _objectAssign2["default"])({}, { height: height, width: width, compareSeries: compareSeries, indicator: indicator, xAccessor: xAccessor, yAccessor: yAccessor }, props);
				callback(newProps, ctx, xScale, yScale, plotData);
			}
	
			ctx.restore();
		};
	
		/* Object.keys(WrappedSeries)
	 	.filter((key) => key !== "propTypes")
	 	.filter(key => key !== "defaultProps")
	 	.filter(key => key !== "displayName")
	 	.filter(key => key !== "contextTypes")
	 	.filter(key => key !== "childContextTypes")
	 	.forEach(key => BaseCanvasSeries[key] = WrappedSeries[key]);*/
	
		BaseCanvasSeries.yAccessor = WrappedSeries.yAccessor;
		BaseCanvasSeries.defaultProps = WrappedSeries.defaultProps;
	
		BaseCanvasSeries.propTypes = {
			getCanvasContexts: _react2["default"].PropTypes.func,
			chartCanvasType: _react2["default"].PropTypes.string
		};
	
		// console.log(Object.keys(BaseCanvasSeries))
		return (0, _pure2["default"])(BaseCanvasSeries, {
			getCanvasContexts: _react2["default"].PropTypes.func,
			canvasOriginX: _react2["default"].PropTypes.number,
			canvasOriginY: _react2["default"].PropTypes.number,
			height: _react2["default"].PropTypes.number.isRequired,
			width: _react2["default"].PropTypes.number.isRequired,
			callbackForCanvasDraw: _react2["default"].PropTypes.func.isRequired,
			chartId: _react2["default"].PropTypes.number.isRequired,
			seriesId: _react2["default"].PropTypes.number.isRequired,
			stroke: _react2["default"].PropTypes.string,
			fill: _react2["default"].PropTypes.string,
	
			chartCanvasType: _react2["default"].PropTypes.string,
			indicator: _react2["default"].PropTypes.func,
			xScale: _react2["default"].PropTypes.func.isRequired,
			yScale: _react2["default"].PropTypes.func.isRequired,
			xAccessor: _react2["default"].PropTypes.func.isRequired,
			yAccessor: _react2["default"].PropTypes.func.isRequired,
			compareSeries: _react2["default"].PropTypes.array.isRequired,
			plotData: _react2["default"].PropTypes.array.isRequired
		});
	}
	
	exports["default"] = wrap;
	module.exports = exports["default"];

/***/ },
/* 53 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsShallowEqual = __webpack_require__(6);
	
	var _utilsShallowEqual2 = _interopRequireDefault(_utilsShallowEqual);
	
	function getDisplayName(Series) {
		var name = Series.displayName || Series.name || "Series";
		return name;
	}
	
	function pure(PureSeries, contextShape) {
		var PureCanvasSeries = (function (_React$Component) {
			_inherits(PureCanvasSeries, _React$Component);
	
			function PureCanvasSeries() {
				_classCallCheck(this, PureCanvasSeries);
	
				_get(Object.getPrototypeOf(PureCanvasSeries.prototype), "constructor", this).apply(this, arguments);
			}
	
			_createClass(PureCanvasSeries, [{
				key: "shouldComponentUpdate",
				value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
					return !(0, _utilsShallowEqual2["default"])(this.props, nextProps) || !(0, _utilsShallowEqual2["default"])(this.state, nextState) || !(0, _utilsShallowEqual2["default"])(this.context, nextContext);
				}
			}, {
				key: "getWrappedPureComponent",
				value: function getWrappedPureComponent() {
					return this.refs.pureSeries;
				}
			}, {
				key: "render",
				value: function render() {
					// console.log(PureSeries.defaultProps);
					return _react2["default"].createElement(PureSeries, _extends({ ref: "pureSeries"
					}, this.context, this.props));
				}
			}]);
	
			return PureCanvasSeries;
		})(_react2["default"].Component);
	
		;
	
		PureCanvasSeries.displayName = "pure(" + getDisplayName(PureSeries) + ")";
	
		PureCanvasSeries.contextTypes = contextShape;
		PureCanvasSeries.yAccessor = PureSeries.yAccessor;
	
		var defaultProps = {};
	
		if (PureSeries.defaultProps) {
			Object.keys(PureSeries.defaultProps).filter(function (key) {
				return key === "namespace";
			}).forEach(function (key) {
				defaultProps[key] = PureSeries.defaultProps[key];
			});
			PureCanvasSeries.defaultProps = defaultProps;
		}
	
		/* Object.keys(PureSeries)
	 	.filter((key) => key !== "propTypes")
	 	.filter(key => key !== "defaultProps")
	 	.filter(key => key !== "displayName")
	 	.filter(key => key !== "contextTypes")
	 	.filter(key => key !== "childContextTypes")
	 	.forEach(key => PureCanvasSeries[key] = PureSeries[key]);*/
	
		// console.log(Object.keys(PureCanvasSeries))
		return PureCanvasSeries;
	}
	
	exports["default"] = pure;
	module.exports = exports["default"];

/***/ },
/* 54 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _d3 = __webpack_require__(8);
	
	var _d32 = _interopRequireDefault(_d3);
	
	var _wrap = __webpack_require__(52);
	
	var _wrap2 = _interopRequireDefault(_wrap);
	
	var _utilsUtils = __webpack_require__(7);
	
	var Area = (function (_React$Component) {
		_inherits(Area, _React$Component);
	
		function Area() {
			_classCallCheck(this, Area);
	
			_get(Object.getPrototypeOf(Area.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(Area, [{
			key: "render",
			value: function render() {
				var props = this.props;
				var stroke = props.stroke;
				var fill = props.fill;
				var className = props.className;
				var opacity = props.opacity;
	
				className = className.concat(stroke !== undefined ? "" : " line-stroke");
				return _react2["default"].createElement("path", { d: Area.getArea(props), stroke: stroke, fill: fill, className: className, opacity: opacity });
			}
		}]);
	
		return Area;
	})(_react2["default"].Component);
	
	;
	
	Area.propTypes = {
		className: _react2["default"].PropTypes.string,
		xScale: _react2["default"].PropTypes.func.isRequired,
		yScale: _react2["default"].PropTypes.func.isRequired,
		xAccessor: _react2["default"].PropTypes.func.isRequired,
		yAccessor: _react2["default"].PropTypes.func.isRequired,
		plotData: _react2["default"].PropTypes.array.isRequired,
		stroke: _react2["default"].PropTypes.string,
		fill: _react2["default"].PropTypes.string,
		opacity: _react2["default"].PropTypes.number,
		base: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.func, _react2["default"].PropTypes.number])
	};
	
	Area.defaultProps = {
		className: "line ",
		fill: "none",
		opacity: 1
	};
	Area.getArea = function (props) {
		var plotData = props.plotData;
		var xScale = props.xScale;
		var yScale = props.yScale;
		var xAccessor = props.xAccessor;
		var yAccessor = props.yAccessor;
		var base = props.base;
	
		var height = yScale.range()[0];
		var newBase = _d32["default"].functor(base === undefined ? height - 1 : base);
	
		var areaSeries = _d32["default"].svg.area().defined(function (d) {
			return yAccessor(d) !== undefined;
		}).x(function (d) {
			return xScale(xAccessor(d));
		}).y0(newBase.bind(null, yScale)).y1(function (d) {
			return yScale(yAccessor(d));
		});
	
		// console.log("HERE", yAccessor(plotData[0]));
		return areaSeries(plotData);
	};
	
	Area.drawOnCanvas = function (props, ctx, xScale, yScale, plotData) {
		var xAccessor = props.xAccessor;
		var yAccessor = props.yAccessor;
		var fill = props.fill;
		var stroke = props.stroke;
		var opacity = props.opacity;
		var base = props.base;
	
		var begin = true;
		var height = yScale.range()[0];
		var newBase = _d32["default"].functor(base === undefined ? height - 1 : base);
	
		ctx.fillStyle = (0, _utilsUtils.hexToRGBA)(fill, opacity);
		ctx.strokeStyle = stroke;
		// ctx.globalAlpha = opacity;
	
		plotData.forEach(function (d) {
			if (yAccessor(d) !== undefined) {
				if (begin) {
					ctx.beginPath();
					begin = false;
					var x = ~ ~(0.5 + xScale(xAccessor(d)));
					var y = ~ ~(0.5 + yScale(yAccessor(d)));
	
					ctx.moveTo(x, newBase(yScale, d));
					ctx.lineTo(x, y);
				}
				ctx.lineTo(xScale(xAccessor(d)), yScale(yAccessor(d)));
			}
		});
	
		var last = plotData[plotData.length - 1];
		ctx.lineTo(xScale(xAccessor(last)), newBase(yScale, last));
	
		if (base !== undefined) {
			plotData.slice().reverse().forEach(function (d) {
				if (yAccessor(d) !== undefined) {
					ctx.lineTo(xScale(xAccessor(d)), newBase(yScale, d));
				}
			});
		}
		ctx.closePath();
		ctx.fill();
	};
	
	exports["default"] = (0, _wrap2["default"])(Area);
	module.exports = exports["default"];

/***/ },
/* 55 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _d3 = __webpack_require__(8);
	
	var _d32 = _interopRequireDefault(_d3);
	
	var _wrap = __webpack_require__(52);
	
	var _wrap2 = _interopRequireDefault(_wrap);
	
	var _utilsUtils = __webpack_require__(7);
	
	var ScatterSeries = (function (_React$Component) {
		_inherits(ScatterSeries, _React$Component);
	
		function ScatterSeries() {
			_classCallCheck(this, ScatterSeries);
	
			_get(Object.getPrototypeOf(ScatterSeries.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(ScatterSeries, [{
			key: "render",
			value: function render() {
				var _props = this.props;
				var className = _props.className;
				var fill = _props.fill;
				var stroke = _props.stroke;
				var marker = _props.marker;
				var markerProps = _props.markerProps;
				var xScale = _props.xScale;
				var yScale = _props.yScale;
				var plotData = _props.plotData;
	
				var m = _d32["default"].functor(marker);
	
				var points = ScatterSeries.helper(this.props, xScale, yScale, plotData);
	
				return _react2["default"].createElement(
					"g",
					{ className: className },
					points.map(function (point, idx) {
						var Marker = m(point.datum);
						return _react2["default"].createElement(Marker, _extends({ key: idx }, markerProps, { point: point }));
					})
				);
			}
		}]);
	
		return ScatterSeries;
	})(_react2["default"].Component);
	
	ScatterSeries.propTypes = {
		className: _react2["default"].PropTypes.string,
		xAccessor: _react2["default"].PropTypes.func,
		yAccessor: _react2["default"].PropTypes.func,
		xScale: _react2["default"].PropTypes.func,
		yScale: _react2["default"].PropTypes.func,
		compareSeries: _react2["default"].PropTypes.array,
		plotData: _react2["default"].PropTypes.array,
		marker: _react2["default"].PropTypes.func
	};
	
	ScatterSeries.defaultProps = {
		className: "react-stockcharts-scatter"
	};
	
	ScatterSeries.yAccessor = function (d) {
		return d.close;
	};
	
	ScatterSeries.helper = function (props, xScale, yScale, plotData) {
		var xAccessor = props.xAccessor;
		var yAccessor = props.yAccessor;
		var compareSeries = props.compareSeries;
		var Marker = props.marker;
		var markerProps = props.markerProps;
	
		var isCompareSeries = compareSeries.length > 0;
		var mProps = _extends({}, Marker.defaultProps, { markerProps: markerProps });
	
		var fill = _d32["default"].functor(mProps.fill);
		var stroke = _d32["default"].functor(mProps.stroke);
	
		return plotData.map(function (d) {
			return {
				x: xScale(xAccessor(d)),
				y: yScale(isCompareSeries ? yAccessor(d.compare) : yAccessor(d)),
				fill: (0, _utilsUtils.hexToRGBA)(fill(d), mProps.opacity),
				stroke: stroke(d),
				datum: d
			};
		});
	};
	
	ScatterSeries.drawOnCanvas = function (props, ctx, xScale, yScale, plotData) {
		var stroke = props.stroke;
		var fill = props.fill;
		var opacity = props.opacity;
		var marker = props.marker;
		var markerProps = props.markerProps;
	
		var points = ScatterSeries.helper(props, xScale, yScale, plotData);
	
		var nest = _d32["default"].nest().key(function (d) {
			return d.fill;
		}).key(function (d) {
			return d.stroke;
		}).entries(points);
	
		nest.forEach(function (fillGroup) {
			var fillKey = fillGroup.key;
			var fillValues = fillGroup.values;
	
			if (fillKey !== "none") {
				ctx.fillStyle = fillKey;
			}
	
			fillValues.forEach(function (strokeGroup) {
				var strokeKey = strokeGroup.key;
				var strokeValues = strokeGroup.values;
	
				ctx.strokeStyle = strokeKey;
	
				strokeValues.forEach(function (point) {
					marker.drawOnCanvasWithNoStateChange(_extends({}, marker.defaultProps, markerProps), point, ctx);
				});
			});
		});
	};
	
	exports["default"] = (0, _wrap2["default"])(ScatterSeries);
	module.exports = exports["default"];

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _d3 = __webpack_require__(8);
	
	var _d32 = _interopRequireDefault(_d3);
	
	var _utilsUtils = __webpack_require__(7);
	
	function Circle(props) {
		var className = props.className;
		var stroke = props.stroke;
		var opacity = props.opacity;
		var fill = props.fill;
		var point = props.point;
		var r = props.r;
	
		var radius = _d32["default"].functor(r)(point.datum);
		return _react2["default"].createElement("circle", { className: className, cx: point.x, cy: point.y, stroke: stroke, fillOpacity: opacity, fill: fill, r: radius });
	}
	
	Circle.propTypes = {
		stroke: _react2["default"].PropTypes.string,
		fill: _react2["default"].PropTypes.string.isRequired,
		opacity: _react2["default"].PropTypes.number.isRequired,
		className: _react2["default"].PropTypes.string,
		r: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.number, _react2["default"].PropTypes.func]).isRequired
	};
	
	Circle.defaultProps = {
		stroke: "#4682B4",
		opacity: 0.5,
		fill: "#4682B4",
		className: "react-stockcharts-marker-circle"
	};
	
	Circle.drawOnCanvas = function (props, point, ctx) {
		var stroke = props.stroke;
		var fill = props.fill;
		var opacity = props.opacity;
	
		ctx.strokeStyle = stroke;
	
		if (fill !== "none") {
			ctx.fillStyle = (0, _utilsUtils.hexToRGBA)(fill, opacity);
		}
	
		Circle.drawOnCanvasWithNoStateChange(props, point, ctx);
	};
	
	Circle.drawOnCanvasWithNoStateChange = function (props, point, ctx) {
		var r = props.r;
	
		var radius = _d32["default"].functor(r)(point.datum);
	
		ctx.beginPath();
		ctx.moveTo(point.x, point.y);
		ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI, false);
		ctx.stroke();
		ctx.fill();
	};
	
	exports["default"] = Circle;
	module.exports = exports["default"];

/***/ },
/* 57 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Line = __webpack_require__(51);
	
	var _Line2 = _interopRequireDefault(_Line);
	
	var _wrap = __webpack_require__(52);
	
	var _wrap2 = _interopRequireDefault(_wrap);
	
	var LineSeries = (function (_React$Component) {
		_inherits(LineSeries, _React$Component);
	
		function LineSeries() {
			_classCallCheck(this, LineSeries);
	
			_get(Object.getPrototypeOf(LineSeries.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(LineSeries, [{
			key: "render",
			value: function render() {
				var props = this.props;
				var className = props.className;
				var xScale = props.xScale;
				var yScale = props.yScale;
				var xAccessor = props.xAccessor;
				var yAccessor = props.yAccessor;
				var plotData = props.plotData;
				var stroke = props.stroke;
				var type = props.type;
	
				return _react2["default"].createElement(_Line2["default"], {
					className: className,
					xScale: xScale, yScale: yScale,
					xAccessor: xAccessor, yAccessor: yAccessor,
					plotData: plotData,
					stroke: stroke, fill: "none",
					type: type });
			}
		}]);
	
		return LineSeries;
	})(_react2["default"].Component);
	
	LineSeries.propTypes = {
		className: _react2["default"].PropTypes.string
	};
	
	LineSeries.defaultProps = {
		stroke: "#4682B4",
		className: "line "
	};
	
	LineSeries.yAccessor = function (d) {
		return d.close;
	};
	
	exports["default"] = (0, _wrap2["default"])(LineSeries);
	module.exports = exports["default"];

/***/ },
/* 58 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Line = __webpack_require__(51);
	
	var _Line2 = _interopRequireDefault(_Line);
	
	var _wrap = __webpack_require__(52);
	
	var _wrap2 = _interopRequireDefault(_wrap);
	
	var CompareSeries = (function (_React$Component) {
		_inherits(CompareSeries, _React$Component);
	
		function CompareSeries() {
			_classCallCheck(this, CompareSeries);
	
			_get(Object.getPrototypeOf(CompareSeries.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(CompareSeries, [{
			key: "render",
			value: function render() {
				var props = this.props;
				var className = props.className;
				var compareSeries = props.compareSeries;
				var xScale = props.xScale;
				var yScale = props.yScale;
				var xAccessor = props.xAccessor;
				var plotData = props.plotData;
				var type = props.type;
				var id = props.id;
	
				var thisSeries = compareSeries.filter(function (each) {
					return each.id === id;
				})[0];
				return _react2["default"].createElement(_Line2["default"], {
					className: className,
					xScale: xScale, yScale: yScale,
					xAccessor: xAccessor, yAccessor: thisSeries.percentYAccessor,
					plotData: plotData,
					stroke: thisSeries.stroke, fill: "none",
					type: type });
			}
		}]);
	
		return CompareSeries;
	})(_react2["default"].Component);
	
	CompareSeries.propTypes = {
		className: _react2["default"].PropTypes.string,
		stroke: _react2["default"].PropTypes.string,
		displayLabel: _react2["default"].PropTypes.string.isRequired,
		id: _react2["default"].PropTypes.number.isRequired
	};
	
	CompareSeries.defaultProps = {
		className: "line ",
		namespace: "ReStock.CompareSeries"
	};
	
	exports["default"] = (0, _wrap2["default"])(CompareSeries);
	module.exports = exports["default"];

/***/ },
/* 59 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _wrap = __webpack_require__(52);
	
	var _wrap2 = _interopRequireDefault(_wrap);
	
	var _utilsUtils = __webpack_require__(7);
	
	var CandlestickSeries = (function (_React$Component) {
		_inherits(CandlestickSeries, _React$Component);
	
		function CandlestickSeries() {
			_classCallCheck(this, CandlestickSeries);
	
			_get(Object.getPrototypeOf(CandlestickSeries.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(CandlestickSeries, [{
			key: "render",
			value: function render() {
				var _props = this.props;
				var className = _props.className;
				var wickClassName = _props.wickClassName;
				var candleClassName = _props.candleClassName;
	
				return _react2["default"].createElement(
					"g",
					{ className: className },
					_react2["default"].createElement(
						"g",
						{ className: wickClassName, key: "wicks" },
						CandlestickSeries.getWicksSVG(this.props)
					),
					_react2["default"].createElement(
						"g",
						{ className: candleClassName, key: "candles" },
						CandlestickSeries.getCandlesSVG(this.props)
					)
				);
			}
		}]);
	
		return CandlestickSeries;
	})(_react2["default"].Component);
	
	CandlestickSeries.propTypes = {
		className: _react2["default"].PropTypes.string,
		wickClassName: _react2["default"].PropTypes.string,
		candleClassName: _react2["default"].PropTypes.string,
		classNames: _react2["default"].PropTypes.shape({
			up: _react2["default"].PropTypes.string,
			down: _react2["default"].PropTypes.string
		}),
		widthRatio: _react2["default"].PropTypes.number.isRequired,
		stroke: _react2["default"].PropTypes.shape({
			up: _react2["default"].PropTypes.string,
			down: _react2["default"].PropTypes.string
		}),
		fill: _react2["default"].PropTypes.shape({
			up: _react2["default"].PropTypes.string,
			down: _react2["default"].PropTypes.string
		}),
		xAccessor: _react2["default"].PropTypes.func,
		yAccessor: _react2["default"].PropTypes.func,
		xScale: _react2["default"].PropTypes.func,
		yScale: _react2["default"].PropTypes.func,
		compareSeries: _react2["default"].PropTypes.array,
		plotData: _react2["default"].PropTypes.array
	};
	
	CandlestickSeries.defaultProps = {
		className: "react-stockcharts-candlestick",
		wickClassName: "react-stockcharts-candlestick-wick",
		candleClassName: "react-stockcharts-candlestick-candle",
		classNames: {
			up: "up",
			down: "down"
		},
		widthRatio: 0.5,
		stroke: {
			up: "none",
			down: "none"
		},
		wickStroke: {
			up: "#000000", // "#6BA583"
			down: "#000000" // "red"
		},
		fill: {
			up: "#6BA583",
			down: "#FF0000"
		},
		opacity: 1
	};
	
	CandlestickSeries.getWicksSVG = function (props) {
	
		/* eslint-disable react/prop-types */
		var xAccessor = props.xAccessor;
		var yAccessor = props.yAccessor;
		var xScale = props.xScale;
		var yScale = props.yScale;
		var compareSeries = props.compareSeries;
		var plotData = props.plotData;
	
		/* eslint-disable react/prop-types */
	
		var wickData = CandlestickSeries.getWickData(props, xAccessor, yAccessor, xScale, yScale, compareSeries, plotData);
		var wicks = wickData.map(function (d, idx) {
			return _react2["default"].createElement("line", { key: idx,
				className: d.className, stroke: d.stroke, style: { shapeRendering: "crispEdges" },
				x1: d.x1, y1: d.y1,
				x2: d.x2, y2: d.y2 });
		});
		return wicks;
	};
	CandlestickSeries.getCandlesSVG = function (props) {
		var xAccessor = props.xAccessor;
		var yAccessor = props.yAccessor;
		var xScale = props.xScale;
		var yScale = props.yScale;
		var compareSeries = props.compareSeries;
		var plotData = props.plotData;
	
		var candleData = CandlestickSeries.getCandleData(props, xAccessor, yAccessor, xScale, yScale, compareSeries, plotData);
		var candles = candleData.map(function (d, idx) {
			if (d.width < 0) return _react2["default"].createElement("line", { className: d.className, key: idx, x1: d.x, y1: d.y, x2: d.x, y2: d.y + d.height, stroke: d.fill });else if (d.height === 0) return _react2["default"].createElement("line", { key: idx, x1: d.x, y1: d.y, x2: d.x + d.width, y2: d.y + d.height, stroke: d.fill });
			return _react2["default"].createElement("rect", { className: d.className, key: idx, x: d.x, y: d.y, width: d.width, height: d.height, fill: d.fill, stroke: d.stroke });
		});
		return candles;
	};
	
	CandlestickSeries.yAccessor = function (d) {
		return { open: d.open, high: d.high, low: d.low, close: d.close };
	};
	
	CandlestickSeries.drawOnCanvas = function (props, ctx, xScale, yScale, plotData) {
		var compareSeries = props.compareSeries;
		var xAccessor = props.xAccessor;
		var yAccessor = props.yAccessor;
		var wickStroke = props.wickStroke;
		var fill = props.fill;
		var opacity = props.opacity;
	
		var wickData = CandlestickSeries.getWickData(props, xAccessor, yAccessor, xScale, yScale, compareSeries, plotData);
	
		var wickNest = d3.nest().key(function (d) {
			return d.stroke;
		}).entries(wickData);
	
		wickNest.forEach(function (outer) {
			var key = outer.key;
			var values = outer.values;
	
			ctx.strokeStyle = key;
			values.forEach(function (d) {
				ctx.beginPath();
				ctx.moveTo(d.x1, d.y1);
				ctx.lineTo(d.x2, d.y2);
				ctx.stroke();
			});
		});
	
		var candleData = CandlestickSeries.getCandleData(props, xAccessor, yAccessor, xScale, yScale, compareSeries, plotData);
	
		var candleNest = d3.nest().key(function (d) {
			return d.fill;
		}).entries(candleData);
	
		candleNest.forEach(function (outer) {
			var key = outer.key;
			var values = outer.values;
	
			ctx.fillStyle = (0, _utilsUtils.hexToRGBA)(key, opacity);
	
			values.forEach(function (d) {
				if (d.width < 0) {
					// <line className={d.className} key={idx} x1={d.x} y1={d.y} x2={d.x} y2={d.y + d.height}/>
					ctx.beginPath();
					ctx.moveTo(d.x, d.y);
					ctx.lineTo(d.x, d.y + d.height);
					ctx.stroke();
				} else if (d.height === 0) {
					// <line key={idx} x1={d.x} y1={d.y} x2={d.x + d.width} y2={d.y + d.height} />
					ctx.beginPath();
					ctx.moveTo(d.x, d.y);
					ctx.lineTo(d.x + d.width, d.y + d.height);
					ctx.stroke();
				} else {
					ctx.beginPath();
					ctx.rect(d.x, d.y, d.width, d.height);
					ctx.closePath();
					ctx.fill();
				}
			});
		});
	};
	
	CandlestickSeries.getWickData = function (props, xAccessor, yAccessor, xScale, yScale, compareSeries, plotData) {
		var isCompareSeries = compareSeries.length > 0;
	
		var classNames = props.classNames;
		var wickStroke = props.wickStroke;
	
		var wickData = plotData.filter(function (d) {
			return d.close !== undefined;
		}).map(function (d) {
			// console.log(yAccessor);
			var ohlc = isCompareSeries ? yAccessor(d.compare) : yAccessor(d);
	
			var x1 = Math.round(xScale(xAccessor(d))),
			    y1 = yScale(ohlc.high),
			    x2 = x1,
			    y2 = yScale(ohlc.low),
			    className = ohlc.open <= ohlc.close ? classNames.up : classNames.down;
	
			return {
				x1: x1,
				y1: y1,
				x2: x2,
				y2: y2,
				className: className,
				direction: ohlc.close - ohlc.open,
				stroke: ohlc.open <= ohlc.close ? wickStroke.up : wickStroke.down
			};
		});
		return wickData;
	};
	
	CandlestickSeries.getCandleData = function (props, xAccessor, yAccessor, xScale, yScale, compareSeries, plotData) {
		var isCompareSeries = compareSeries.length > 0;
	
		var classNames = props.classNames;
		var fill = props.fill;
		var stroke = props.stroke;
		var widthRatio = props.widthRatio;
	
		var width = xScale(xAccessor(plotData[plotData.length - 1])) - xScale(xAccessor(plotData[0]));
		var cw = width / (plotData.length - 1) * widthRatio;
		var candleWidth = Math.round(cw); // Math.floor(cw) % 2 === 0 ? Math.floor(cw) : Math.round(cw);
		var candles = plotData.filter(function (d) {
			return d.close !== undefined;
		}).map(function (d) {
			var ohlc = isCompareSeries ? yAccessor(d.compare) : yAccessor(d);
			var x = Math.round(xScale(xAccessor(d))) - (candleWidth === 1 ? 0 : 0.5 * candleWidth),
			    y = yScale(Math.max(ohlc.open, ohlc.close)),
			    height = Math.abs(yScale(ohlc.open) - yScale(ohlc.close)),
			    className = ohlc.open <= ohlc.close ? classNames.up : classNames.down;
			return {
				// type: "line"
				x: x,
				y: y,
				height: height,
				width: candleWidth,
				className: className,
				fill: ohlc.open <= ohlc.close ? fill.up : fill.down,
				stroke: ohlc.open <= ohlc.close ? stroke.up : stroke.down,
				direction: ohlc.close - ohlc.open
			};
		});
		return candles;
	};
	
	exports["default"] = (0, _wrap2["default"])(CandlestickSeries);
	module.exports = exports["default"];

/***/ },
/* 60 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _wrap = __webpack_require__(52);
	
	var _wrap2 = _interopRequireDefault(_wrap);
	
	var _utilsUtils = __webpack_require__(7);
	
	var OHLCSeries = (function (_React$Component) {
		_inherits(OHLCSeries, _React$Component);
	
		function OHLCSeries() {
			_classCallCheck(this, OHLCSeries);
	
			_get(Object.getPrototypeOf(OHLCSeries.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(OHLCSeries, [{
			key: "render",
			value: function render() {
				var _props = this.props;
				var className = _props.className;
				var wickClassName = _props.wickClassName;
				var candleClassName = _props.candleClassName;
				var _props2 = this.props;
				var xAccessor = _props2.xAccessor;
				var yAccessor = _props2.yAccessor;
				var xScale = _props2.xScale;
				var yScale = _props2.yScale;
				var compareSeries = _props2.compareSeries;
				var plotData = _props2.plotData;
	
				var barData = OHLCSeries.getOHLCBars(this.props, xAccessor, yAccessor, xScale, yScale, compareSeries, plotData);
	
				var barWidth = barData.barWidth;
				var strokeWidth = barData.strokeWidth;
				var bars = barData.bars;
	
				return _react2["default"].createElement(
					"g",
					{ className: className },
					bars.map(function (d, idx) {
						return _react2["default"].createElement("path", { key: idx,
							className: d.className, stroke: d.stroke, strokeWidth: strokeWidth,
							d: "M" + d.openX1 + " " + d.openY + " L" + d.openX2 + " " + d.openY + " M" + d.x + " " + d.y1 + " L" + d.x + " " + d.y2 + " M" + d.closeX1 + " " + d.closeY + " L" + d.closeX2 + " " + d.closeY });
					})
				);
			}
		}]);
	
		return OHLCSeries;
	})(_react2["default"].Component);
	
	OHLCSeries.propTypes = {
		className: _react2["default"].PropTypes.string,
		classNames: _react2["default"].PropTypes.shape({
			up: _react2["default"].PropTypes.string,
			down: _react2["default"].PropTypes.string
		}),
		stroke: _react2["default"].PropTypes.shape({
			up: _react2["default"].PropTypes.string,
			down: _react2["default"].PropTypes.string
		}),
		firstBarstroke: _react2["default"].PropTypes.string,
		xAccessor: _react2["default"].PropTypes.func,
		yAccessor: _react2["default"].PropTypes.func,
		xScale: _react2["default"].PropTypes.func,
		yScale: _react2["default"].PropTypes.func,
		changeAccessor: _react2["default"].PropTypes.func,
		compareSeries: _react2["default"].PropTypes.array,
		plotData: _react2["default"].PropTypes.array
	};
	
	OHLCSeries.defaultProps = {
		className: "react-stockcharts-ohlc",
		classNames: {
			up: "up",
			down: "down"
		},
		stroke: {
			up: "#6BA583",
			down: "#FF0000"
		},
		firstBarClassName: "firstbar",
		firstBarstroke: "#000000",
		changeAccessor: function changeAccessor(d) {
			return d.change;
		},
		opacity: 1
	};
	
	OHLCSeries.yAccessor = function (d) {
		return { open: d.open, high: d.high, low: d.low, close: d.close };
	};
	
	OHLCSeries.drawOnCanvas = function (props, ctx, xScale, yScale, plotData) {
		var compareSeries = props.compareSeries;
		var xAccessor = props.xAccessor;
		var yAccessor = props.yAccessor;
		var indicator = props.indicator;
	
		var barData = OHLCSeries.getOHLCBars(props, xAccessor, yAccessor, xScale, yScale, compareSeries, plotData);
	
		var barWidth = barData.barWidth;
		var strokeWidth = barData.strokeWidth;
		var bars = barData.bars;
	
		var wickNest = d3.nest().key(function (d) {
			return d.stroke;
		}).entries(bars);
	
		ctx.lineWidth = strokeWidth;
	
		wickNest.forEach(function (outer) {
			var key = outer.key;
			var values = outer.values;
	
			ctx.strokeStyle = key;
			values.forEach(function (d) {
				ctx.beginPath();
				ctx.moveTo(d.x, d.y1);
				ctx.lineTo(d.x, d.y2);
	
				ctx.moveTo(d.openX1, d.openY);
				ctx.lineTo(d.openX2, d.openY);
	
				ctx.moveTo(d.closeX1, d.closeY);
				ctx.lineTo(d.closeX2, d.closeY);
	
				ctx.stroke();
			});
		});
	};
	
	OHLCSeries.getOHLCBars = function (props, xAccessor, yAccessor, xScale, yScale, compareSeries, plotData) {
		var isCompareSeries = compareSeries.length > 0;
	
		var indicator = props.indicator;
		var changeAccessor = props.changeAccessor;
		var classNames = props.classNames;
		var barStroke = props.stroke;
		var firstBarClassName = props.firstBarClassName;
		var firstBarStroke = props.firstBarStroke;
		var upStroke = barStroke.up;
		var downStroke = barStroke.down;
	
		if ((0, _utilsUtils.isDefined)(indicator) && (0, _utilsUtils.isDefined)(indicator.strokeProvider)) {
			upStroke = downStroke = indicator.strokeProvider();
		}
		upStroke = d3.functor(upStroke);
		downStroke = d3.functor(downStroke);
	
		var width = xScale(xAccessor(plotData[plotData.length - 1])) - xScale(xAccessor(plotData[0]));
	
		var barWidth = Math.max(1, Math.round(width / (plotData.length - 1) / 2) - 1.5);
		var strokeWidth = Math.min(barWidth, 6);
	
		var bars = plotData.filter(function (d) {
			return d.close !== undefined;
		}).map(function (d) {
			var ohlc = isCompareSeries ? yAccessor(d.compare) : yAccessor(d),
			    change = changeAccessor(d),
			    first = (0, _utilsUtils.isNotDefined)(change),
			    up = !first && change.absolute >= 0,
			    x = Math.round(xScale(xAccessor(d))),
			    y1 = yScale(ohlc.high),
			    y2 = yScale(ohlc.low),
			    openX1 = x - barWidth,
			    openX2 = x + strokeWidth / 2,
			    openY = yScale(ohlc.open),
			    closeX1 = x - strokeWidth / 2,
			    closeX2 = x + barWidth,
			    closeY = yScale(ohlc.close),
			    className = up ? classNames.up : classNames.down,
			    stroke = up ? upStroke(d) : downStroke(d);
	
			className = first ? firstBarClassName : className;
			stroke = first ? firstBarStroke : stroke;
			return { x: x, y1: y1, y2: y2, openX1: openX1, openX2: openX2, openY: openY, closeX1: closeX1, closeX2: closeX2, closeY: closeY, stroke: stroke, className: className };
		});
		return { barWidth: barWidth, strokeWidth: strokeWidth, bars: bars };
	};
	
	exports["default"] = (0, _wrap2["default"])(OHLCSeries);
	module.exports = exports["default"];

/***/ },
/* 61 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _StackedHistogramSeries = __webpack_require__(62);
	
	var _StackedHistogramSeries2 = _interopRequireDefault(_StackedHistogramSeries);
	
	var _wrap = __webpack_require__(52);
	
	var _wrap2 = _interopRequireDefault(_wrap);
	
	var _indicatorCalculatorIdentity = __webpack_require__(19);
	
	var _indicatorCalculatorIdentity2 = _interopRequireDefault(_indicatorCalculatorIdentity);
	
	var _utilsUtils = __webpack_require__(7);
	
	var HistogramSeries = (function (_React$Component) {
		_inherits(HistogramSeries, _React$Component);
	
		function HistogramSeries() {
			_classCallCheck(this, HistogramSeries);
	
			_get(Object.getPrototypeOf(HistogramSeries.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(HistogramSeries, [{
			key: "render",
			value: function render() {
				var _props = this.props;
				var yAccessor = _props.yAccessor;
				var yAccessorNarrow = _props.yAccessorNarrow;
	
				return _react2["default"].createElement(_StackedHistogramSeries2["default"], _extends({}, this.props, { yAccessor: [yAccessor], yAccessorNarrow: [yAccessorNarrow] }));
			}
		}]);
	
		return HistogramSeries;
	})(_react2["default"].Component);
	
	HistogramSeries.propTypes = {
		baseAt: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.oneOf(["top", "bottom", "middle"]), _react2["default"].PropTypes.number, _react2["default"].PropTypes.func]).isRequired,
		direction: _react2["default"].PropTypes.oneOf(["up", "down"]).isRequired,
		stroke: _react2["default"].PropTypes.bool.isRequired,
		widthRatio: _react2["default"].PropTypes.number.isRequired,
		opacity: _react2["default"].PropTypes.number.isRequired,
		fill: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.func, _react2["default"].PropTypes.string]).isRequired,
		className: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.func, _react2["default"].PropTypes.string]).isRequired,
		xAccessor: _react2["default"].PropTypes.func,
		yAccessor: _react2["default"].PropTypes.func,
		yAccessorNarrow: _react2["default"].PropTypes.func,
		xScale: _react2["default"].PropTypes.func,
		yScale: _react2["default"].PropTypes.func,
		plotData: _react2["default"].PropTypes.array
	};
	
	HistogramSeries.defaultProps = {
		baseAt: "bottom",
		direction: "up",
		className: "bar",
		stroke: false,
		fill: "#4682B4",
		opacity: 1,
		widthRatio: 0.5,
		yAccessorNarrow: _indicatorCalculatorIdentity2["default"]
	};
	
	exports["default"] = (0, _wrap2["default"])(HistogramSeries);
	module.exports = exports["default"];

/***/ },
/* 62 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _wrap = __webpack_require__(52);
	
	var _wrap2 = _interopRequireDefault(_wrap);
	
	var _indicatorCalculatorIdentity = __webpack_require__(19);
	
	var _indicatorCalculatorIdentity2 = _interopRequireDefault(_indicatorCalculatorIdentity);
	
	var _utilsUtils = __webpack_require__(7);
	
	var StackedHistogramSeries = (function (_React$Component) {
		_inherits(StackedHistogramSeries, _React$Component);
	
		function StackedHistogramSeries() {
			_classCallCheck(this, StackedHistogramSeries);
	
			_get(Object.getPrototypeOf(StackedHistogramSeries.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(StackedHistogramSeries, [{
			key: "render",
			value: function render() {
				var props = this.props;
	
				return _react2["default"].createElement(
					"g",
					{ className: "histogram" },
					StackedHistogramSeries.getBarsSVG(props)
				);
			}
		}]);
	
		return StackedHistogramSeries;
	})(_react2["default"].Component);
	
	StackedHistogramSeries.propTypes = {
		baseAt: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.oneOf(["top", "bottom", "middle"]), _react2["default"].PropTypes.number, _react2["default"].PropTypes.func]).isRequired,
		direction: _react2["default"].PropTypes.oneOf(["up", "down"]).isRequired,
		stroke: _react2["default"].PropTypes.bool.isRequired,
		widthRatio: _react2["default"].PropTypes.number.isRequired,
		opacity: _react2["default"].PropTypes.number.isRequired,
		fill: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.func, _react2["default"].PropTypes.string]).isRequired,
		className: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.func, _react2["default"].PropTypes.string]).isRequired,
		xAccessor: _react2["default"].PropTypes.func,
		yAccessor: _react2["default"].PropTypes.arrayOf(_react2["default"].PropTypes.func),
		yAccessorNarrow: _react2["default"].PropTypes.arrayOf(_react2["default"].PropTypes.func),
		xScale: _react2["default"].PropTypes.func,
		yScale: _react2["default"].PropTypes.func,
		plotData: _react2["default"].PropTypes.array
	};
	
	StackedHistogramSeries.defaultProps = {
		baseAt: "bottom",
		direction: "up",
		className: "bar",
		stroke: false,
		fill: "#4682B4",
		opacity: 1,
		widthRatio: 0.5
	};
	
	StackedHistogramSeries.drawOnCanvas = function (props, ctx, xScale, yScale, plotData) {
		var xAccessor = props.xAccessor;
		var yAccessor = props.yAccessor;
		var stroke = props.stroke;
	
		var bars = StackedHistogramSeries.getBars(props, xAccessor, yAccessor, xScale, yScale, plotData);
	
		var nest = d3.nest().key(function (d) {
			return d.fill;
		}).entries(bars);
	
		nest.forEach(function (outer) {
			var key = outer.key;
			var values = outer.values;
	
			if (values[0].barWidth < 1) {
				ctx.strokeStyle = key;
			} else {
				ctx.strokeStyle = key;
				ctx.fillStyle = (0, _utilsUtils.hexToRGBA)(key, props.opacity);
			}
			values.forEach(function (d) {
				if (d.barWidth < 1) {
					/* <line key={idx} className={d.className}
	    			stroke={stroke}
	    			fill={fill}
	    			x1={d.x} y1={d.y}
	    			x2={d.x} y2={d.y + d.height} />*/
					ctx.beginPath();
					ctx.moveTo(d.x, d.y);
					ctx.lineTo(d.x, d.y + d.height);
					ctx.stroke();
				} else {
					/* <rect key={idx} className={d.className}
	    		stroke={stroke}
	    		fill={fill}
	    		x={d.x}
	    		y={d.y}
	    		width={d.barWidth}
	    		height={d.height} /> */
					ctx.beginPath();
					ctx.rect(d.x, d.y, d.barWidth, d.height);
					ctx.fill();
					if (stroke) ctx.stroke();
				}
			});
		});
	};
	
	StackedHistogramSeries.getBarsSVG = function (props) {
	
		/* eslint-disable react/prop-types */
		var xAccessor = props.xAccessor;
		var yAccessor = props.yAccessor;
		var xScale = props.xScale;
		var yScale = props.yScale;
		var plotData = props.plotData;
	
		/* eslint-disable react/prop-types */
	
		var bars = StackedHistogramSeries.getBars(props, xAccessor, yAccessor, xScale, yScale, plotData);
	
		return bars.map(function (d, idx) {
			if (d.barWidth <= 1) {
				return _react2["default"].createElement("line", { key: idx, className: d.className,
					stroke: d.fill,
					x1: d.x, y1: d.y,
					x2: d.x, y2: d.y + d.height });
			}
			return _react2["default"].createElement("rect", { key: idx, className: d.className,
				stroke: d.stroke,
				fill: d.fill,
				x: d.x,
				y: d.y,
				width: d.barWidth,
				fillOpacity: props.opacity,
				height: d.height });
		});
	};
	
	StackedHistogramSeries.getBars = function (props, xAccessor, yAccessor, xScale, yScale, plotData) {
		var baseAt = props.baseAt;
		var className = props.className;
		var fill = props.fill;
		var stroke = props.stroke;
		var widthRatio = props.widthRatio;
		var yAccessorNarrow = props.yAccessorNarrow;
	
		var base = baseAt === "top" ? 0 : baseAt === "bottom" ? yScale.range()[0] : baseAt === "middle" ? (yScale.range()[0] + yScale.range()[1]) / 2 : baseAt;
	
		var getClassName = d3.functor(className);
		var getFill = d3.functor(fill);
		var getBase = d3.functor(base);
	
		var width = xScale(xAccessor(plotData[plotData.length - 1])) - xScale(xAccessor(plotData[0]));
		var barWidth = width / (plotData.length - 1) * widthRatio;
	
		var bars = plotData.map(function (d) {
			var innerBars = yAccessor.map(function (eachYAccessor, i) {
				var yValue = eachYAccessor(d);
				if ((0, _utilsUtils.isDefined)(yAccessorNarrow) && (0, _utilsUtils.isDefined)(yAccessorNarrow[i])) {
					yValue = yAccessorNarrow[i](eachYAccessor(d));
				}
				if ((0, _utilsUtils.isNotDefined)(yValue)) return undefined;
	
				var x = Math.round(xScale(xAccessor(d)) - (Math.round(barWidth) === 1 ? 0 : 0.5 * barWidth));
				return {
					barWidth: barWidth,
					x: x,
					y: yScale(yValue),
					className: getClassName(d, i),
					stroke: stroke ? getFill(d, i) : "none",
					fill: getFill(d, i),
					i: i
				};
			}).filter(function (yValue) {
				return yValue !== undefined;
			});
	
			var b = getBase(xScale, yScale, d);
			var h;
			for (var i = innerBars.length - 1; i >= 0; i--) {
				h = b - innerBars[i].y;
				if (h < 0) {
					innerBars[i].y = b;
					h = -1 * h;
				}
				innerBars[i].height = h;
				b = innerBars[i].y;
			};
			return innerBars;
		});
	
		return d3.merge(bars);
	};
	
	exports["default"] = (0, _wrap2["default"])(StackedHistogramSeries);
	module.exports = exports["default"];

/***/ },
/* 63 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _d3 = __webpack_require__(8);
	
	var _d32 = _interopRequireDefault(_d3);
	
	var _wrap = __webpack_require__(52);
	
	var _wrap2 = _interopRequireDefault(_wrap);
	
	var KagiSeries = (function (_React$Component) {
		_inherits(KagiSeries, _React$Component);
	
		function KagiSeries() {
			_classCallCheck(this, KagiSeries);
	
			_get(Object.getPrototypeOf(KagiSeries.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(KagiSeries, [{
			key: "render",
			value: function render() {
				var props = this.props;
				var className = props.className;
				var stroke = props.stroke;
				var fill = props.fill;
				var strokeWidth = props.strokeWidth;
				var xAccessor = props.xAccessor;
				var xScale = props.xScale;
				var yScale = props.yScale;
				var plotData = props.plotData;
	
				var paths = KagiSeries.helper(plotData, xAccessor).map(function (each, i) {
					var dataSeries = _d32["default"].svg.line().x(function (item) {
						return xScale(item[0]);
					}).y(function (item) {
						return yScale(item[1]);
					}).interpolate("step-before");
					return _react2["default"].createElement("path", { key: i, d: dataSeries(each.plot), className: each.type,
						stroke: stroke[each.type], fill: fill[each.type], strokeWidth: strokeWidth });
				});
				return _react2["default"].createElement(
					"g",
					{ className: className },
					paths
				);
			}
		}]);
	
		return KagiSeries;
	})(_react2["default"].Component);
	
	KagiSeries.defaultProps = {
		className: "react-stockcharts-kagi",
		strokeWidth: 2,
		stroke: {
			yang: "#6BA583",
			yin: "#E60000"
		},
		fill: {
			yang: "none",
			yin: "none"
		},
		currentValueStroke: "#000000"
	};
	
	KagiSeries.yAccessor = function (d) {
		return { open: d.open, high: d.high, low: d.low, close: d.close };
	};
	
	KagiSeries.drawOnCanvas = function (props, ctx, xScale, yScale, plotData) {
		var xAccessor = props.xAccessor;
		var stroke = props.stroke;
		var strokeWidth = props.strokeWidth;
		var currentValueStroke = props.currentValueStroke;
	
		var begin = true;
	
		var paths = KagiSeries.helper(plotData, xAccessor);
	
		paths.forEach(function (each) {
			ctx.strokeStyle = stroke[each.type];
			ctx.lineWidth = strokeWidth;
	
			ctx.beginPath();
			var prevX;
			each.plot.forEach(function (d) {
				var x = xScale(d[0]);
				var y = yScale(d[1]);
	
				if (begin) {
					ctx.moveTo(x, y);
					begin = false;
				} else {
					if (prevX !== undefined) {
						ctx.lineTo(prevX, y);
					}
					ctx.lineTo(x, y);
				}
				prevX = x;
				// console.log(d);
			});
			ctx.stroke();
		});
		var lastPlot = paths[paths.length - 1].plot;
		var last = lastPlot[lastPlot.length - 1];
		ctx.beginPath();
		// ctx.strokeStyle = "black";
		ctx.lineWidth = 1;
	
		var x = xScale(last[0]);
		var y1 = yScale(last[2]);
		var y2 = yScale(last[3]);
	
		// console.log(last, x, y);
		ctx.moveTo(x, y1);
		ctx.lineTo(x + 10, y1);
		ctx.stroke();
	
		ctx.beginPath();
		ctx.strokeStyle = currentValueStroke;
		ctx.moveTo(x - 10, y2);
		ctx.lineTo(x, y2);
		ctx.stroke();
	};
	
	KagiSeries.helper = function (plotData, xAccessor) {
		var kagiLine = [];
		var kagi = {};
		var d = plotData[0];
		var idx = xAccessor(d);
	
		for (var i = 0; i < plotData.length; i++) {
			d = plotData[i];
	
			if (d.close === undefined) continue;
			if (kagi.type === undefined) kagi.type = d.startAs;
			if (kagi.plot === undefined) kagi.plot = [];
	
			idx = xAccessor(d);
			kagi.plot.push([idx, d.open]);
	
			if (d.changeTo !== undefined) {
				kagi.plot.push([idx, d.changePoint]);
				kagi.added = true;
				kagiLine.push(kagi);
	
				kagi = {
					type: d.changeTo,
					plot: [],
					added: false
				};
				kagi.plot.push([idx, d.changePoint]);
			}
		}
	
		if (!kagi.added) {
			kagi.plot.push([idx, d.close, d.current, d.reverseAt]);
			kagiLine.push(kagi);
		}
	
		// console.log(d.reverseAt);
	
		return kagiLine;
	};
	
	exports["default"] = (0, _wrap2["default"])(KagiSeries);
	module.exports = exports["default"];

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _wrap = __webpack_require__(52);
	
	var _wrap2 = _interopRequireDefault(_wrap);
	
	var PointAndFigureSeries = (function (_React$Component) {
		_inherits(PointAndFigureSeries, _React$Component);
	
		function PointAndFigureSeries() {
			_classCallCheck(this, PointAndFigureSeries);
	
			_get(Object.getPrototypeOf(PointAndFigureSeries.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(PointAndFigureSeries, [{
			key: "render",
			value: function render() {
				var props = this.props;
				var xScale = props.xScale;
				var xAccessor = props.xAccessor;
				var yScale = props.yScale;
				var yAccessor = props.yAccessor;
				var plotData = props.plotData;
	
				var columns = PointAndFigureSeries.getColumns(xScale, xAccessor, yScale, yAccessor, plotData);
				var stroke = props.stroke;
				var fill = props.fill;
				var strokeWidth = props.strokeWidth;
				var className = props.className;
	
				return _react2["default"].createElement(
					"g",
					{ className: className },
					columns.map(function (col, idx) {
						return _react2["default"].createElement(
							"g",
							{ key: idx, className: col.className, transform: "translate(" + col.offset[0] + ", " + col.offset[1] + ")" },
							col.boxes.map(function (box, i) {
								if (col.direction > 0) {
									return _react2["default"].createElement(
										"g",
										{ key: idx + "-" + i },
										_react2["default"].createElement("line", { className: "up", strokeWidth: strokeWidth, stroke: stroke.up, fill: fill.up,
											x1: 0, y1: box.open, x2: box.columnWidth, y2: box.close }),
										_react2["default"].createElement("line", { className: "up", strokeWidth: strokeWidth, stroke: stroke.up, fill: fill.up,
											x1: 0, y1: box.close, x2: box.columnWidth, y2: box.open })
									);
								}
								return _react2["default"].createElement("ellipse", { key: idx + "-" + i,
									className: "down", strokeWidth: strokeWidth, stroke: stroke.down, fill: fill.down,
									cx: box.columnWidth / 2, cy: (box.open + box.close) / 2,
									rx: box.columnWidth / 2, ry: box.boxHeight / 2 });
							})
						);
					})
				);
			}
		}]);
	
		return PointAndFigureSeries;
	})(_react2["default"].Component);
	
	PointAndFigureSeries.defaultProps = {
		className: "react-stockcharts-point-and-figure",
		strokeWidth: 1,
		stroke: {
			up: "#6BA583",
			down: "#FF0000"
		},
		fill: {
			up: "none",
			down: "none"
		}
	};
	
	PointAndFigureSeries.yAccessor = function (d) {
		return { open: d.open, high: d.high, low: d.low, close: d.close };
	};
	
	PointAndFigureSeries.drawOnCanvas = function (props, ctx, xScale, yScale, plotData) {
		var xAccessor = props.xAccessor;
		var yAccessor = props.yAccessor;
	
		var columns = PointAndFigureSeries.getColumns(xScale, xAccessor, yScale, yAccessor, plotData);
		var stroke = props.stroke;
		var fill = props.fill;
		var strokeWidth = props.strokeWidth;
	
		ctx.lineWidth = strokeWidth;
	
		columns.forEach(function (col) {
			var _col$offset = _slicedToArray(col.offset, 2);
	
			var offsetX = _col$offset[0];
			var offsetY = _col$offset[1];
	
			col.boxes.forEach(function (box) {
				if (col.direction > 0) {
					ctx.fillStyle = fill.up;
					ctx.strokeStyle = stroke.up;
	
					ctx.beginPath();
	
					ctx.moveTo(offsetX, offsetY + box.open);
					ctx.lineTo(offsetX + box.columnWidth, offsetY + box.close);
					ctx.moveTo(offsetX, offsetY + box.close);
					ctx.lineTo(offsetX + box.columnWidth, offsetY + box.open);
	
					ctx.stroke();
				} else {
					ctx.fillStyle = fill.down;
					ctx.strokeStyle = stroke.down;
	
					ctx.beginPath();
	
					var x = offsetX + box.columnWidth / 2;
					var y = offsetY + box.open + box.boxHeight / 2;
					var rx = box.columnWidth / 2;
					var ry = box.boxHeight / 2;
	
					ctx.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
					ctx.stroke();
				}
			});
		});
	
		ctx.stroke();
	};
	
	PointAndFigureSeries.getColumns = function (xScale, xAccessor, yScale, yAccessor, plotData) {
	
		var width = xScale(xAccessor(plotData[plotData.length - 1])) - xScale(xAccessor(plotData[0]));
	
		var columnWidth = width / (plotData.length - 1);
	
		var anyBox,
		    j = 0;
		while (anyBox === undefined) {
			if (plotData[j].close !== undefined) {
				anyBox = plotData[j].boxes[0];
			}
			j++;
		}
	
		var boxHeight = Math.abs(yScale(anyBox.open) - yScale(anyBox.close));
	
		var columns = plotData.filter(function (d) {
			return d.close !== undefined;
		}).map(function (d) {
			var boxes = d.boxes.map(function (box) {
				return {
					columnWidth: columnWidth,
					boxHeight: boxHeight,
					open: yScale(box.open),
					close: yScale(box.close)
				};
			});
	
			var xOffset = xScale(xAccessor(d)) - columnWidth / 2;
			return {
				boxes: boxes,
				direction: d.direction,
				offset: [xOffset, 0]
			};
		});
		return columns;
	};
	
	exports["default"] = (0, _wrap2["default"])(PointAndFigureSeries);
	module.exports = exports["default"];

/***/ },
/* 65 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _wrap = __webpack_require__(52);
	
	var _wrap2 = _interopRequireDefault(_wrap);
	
	var RenkoSeries = (function (_React$Component) {
		_inherits(RenkoSeries, _React$Component);
	
		function RenkoSeries() {
			_classCallCheck(this, RenkoSeries);
	
			_get(Object.getPrototypeOf(RenkoSeries.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(RenkoSeries, [{
			key: "render",
			value: function render() {
				var props = this.props;
				var plotData = props.plotData;
				var xScale = props.xScale;
				var xAccessor = props.xAccessor;
				var yScale = props.yScale;
				var yAccessor = props.yAccessor;
	
				var candles = RenkoSeries.getRenko(props, plotData, xScale, xAccessor, yScale, yAccessor).map(function (each, idx) {
					return _react2["default"].createElement("rect", { key: idx, className: each.className,
						fill: each.fill,
						x: each.x,
						y: each.y,
						width: each.width,
						height: each.height });
				});
	
				return _react2["default"].createElement(
					"g",
					null,
					_react2["default"].createElement(
						"g",
						{ className: "candle" },
						candles
					)
				);
			}
		}]);
	
		return RenkoSeries;
	})(_react2["default"].Component);
	
	RenkoSeries.propTypes = {
		classNames: _react2["default"].PropTypes.shape({
			up: _react2["default"].PropTypes.string,
			down: _react2["default"].PropTypes.string
		}),
		stroke: _react2["default"].PropTypes.shape({
			up: _react2["default"].PropTypes.string,
			down: _react2["default"].PropTypes.string
		}),
		fill: _react2["default"].PropTypes.shape({
			up: _react2["default"].PropTypes.string,
			down: _react2["default"].PropTypes.string
		})
	};
	
	RenkoSeries.defaultProps = {
		classNames: {
			up: "up",
			down: "down"
		},
		stroke: {
			up: "none",
			down: "none"
		},
		fill: {
			up: "#6BA583",
			down: "#E60000",
			partial: "#4682B4"
		}
	};
	
	RenkoSeries.yAccessor = function (d) {
		return { open: d.open, high: d.high, low: d.low, close: d.close };
	};
	
	RenkoSeries.drawOnCanvas = function (props, ctx, xScale, yScale, plotData) {
		var xAccessor = props.xAccessor;
		var yAccessor = props.yAccessor;
	
		var renko = RenkoSeries.getRenko(props, plotData, xScale, xAccessor, yScale, yAccessor);
		renko.forEach(function (d) {
			ctx.beginPath();
	
			ctx.strokeStyle = d.stroke;
			ctx.fillStyle = d.fill;
	
			ctx.rect(d.x, d.y, d.width, d.height);
			ctx.closePath();
			ctx.fill();
		});
	};
	
	RenkoSeries.getRenko = function (props, plotData, xScale, xAccessor, yScale, yAccessor) {
		var classNames = props.classNames;
		var fill = props.fill;
	
		var width = xScale(xAccessor(plotData[plotData.length - 1])) - xScale(xAccessor(plotData[0]));
	
		var candleWidth = width / (plotData.length - 1);
		var candles = plotData.filter(function (d) {
			return d.close !== undefined;
		}).map(function (d) {
			var ohlc = yAccessor(d);
			var x = xScale(xAccessor(d)) - 0.5 * candleWidth,
			    y = yScale(Math.max(ohlc.open, ohlc.close)),
			    height = Math.abs(yScale(ohlc.open) - yScale(ohlc.close)),
			    className = ohlc.open <= ohlc.close ? classNames.up : classNames.down,
			    svgfill = ohlc.open <= ohlc.close ? fill.up : fill.down;
	
			if (!d.fullyFormed) {
				svgfill = fill.partial;
			}
			return {
				className: className,
				fill: svgfill,
				x: x,
				y: y,
				height: height,
				width: candleWidth
			};
		});
		return candles;
	};
	
	exports["default"] = (0, _wrap2["default"])(RenkoSeries);
	module.exports = exports["default"];

/***/ },
/* 66 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _HistogramSeries = __webpack_require__(61);
	
	var _HistogramSeries2 = _interopRequireDefault(_HistogramSeries);
	
	var _Line = __webpack_require__(51);
	
	var _Line2 = _interopRequireDefault(_Line);
	
	var _StraightLine = __webpack_require__(67);
	
	var _StraightLine2 = _interopRequireDefault(_StraightLine);
	
	var _wrap = __webpack_require__(52);
	
	var _wrap2 = _interopRequireDefault(_wrap);
	
	var MACDSeries = (function (_React$Component) {
		_inherits(MACDSeries, _React$Component);
	
		function MACDSeries(props) {
			_classCallCheck(this, MACDSeries);
	
			_get(Object.getPrototypeOf(MACDSeries.prototype), "constructor", this).call(this, props);
			this.yAccessorForMACDLine = this.yAccessorForMACDLine.bind(this);
			this.yAccessorForSignalLine = this.yAccessorForSignalLine.bind(this);
			this.yAccessorForHistogram = this.yAccessorForHistogram.bind(this);
			this.yAccessorForHistogramBase = this.yAccessorForHistogramBase.bind(this);
		}
	
		_createClass(MACDSeries, [{
			key: "yAccessorForMACDLine",
			value: function yAccessorForMACDLine(d) {
				var yAccessor = this.props.yAccessor;
	
				return yAccessor(d) && yAccessor(d).MACDLine;
			}
		}, {
			key: "yAccessorForSignalLine",
			value: function yAccessorForSignalLine(d) {
				var yAccessor = this.props.yAccessor;
	
				return yAccessor(d) && yAccessor(d).signalLine;
			}
		}, {
			key: "yAccessorForHistogram",
			value: function yAccessorForHistogram(d) {
				var yAccessor = this.props.yAccessor;
	
				return yAccessor(d) && yAccessor(d).histogram;
			}
		}, {
			key: "yAccessorForHistogramBase",
			value: function yAccessorForHistogramBase(xScale, yScale /* , d */) {
				return yScale(0);
			}
		}, {
			key: "render",
			value: function render() {
				var _props = this.props;
				var className = _props.className;
				var indicator = _props.indicator;
				var xScale = _props.xScale;
				var yScale = _props.yScale;
				var xAccessor = _props.xAccessor;
				var plotData = _props.plotData;
				var type = _props.type;
				var opacity = _props.opacity;
				var histogramStroke = _props.histogramStroke;
	
				var options = indicator.options();
	
				return _react2["default"].createElement(
					"g",
					{ className: className },
					_react2["default"].createElement(_Line2["default"], {
						xScale: xScale, yScale: yScale,
						xAccessor: xAccessor, yAccessor: this.yAccessorForMACDLine,
						plotData: plotData,
						stroke: options.stroke.MACDLine, fill: "none",
						type: type }),
					_react2["default"].createElement(_Line2["default"], {
						xScale: xScale, yScale: yScale,
						xAccessor: xAccessor, yAccessor: this.yAccessorForSignalLine,
						plotData: plotData,
						stroke: options.stroke.signalLine, fill: "none",
						type: type }),
					_react2["default"].createElement(_HistogramSeries2["default"], {
						baseAt: this.yAccessorForHistogramBase,
						className: "macd-histogram",
						stroke: histogramStroke, fill: options.fill.histogram, opacity: opacity,
						yAccessor: this.yAccessorForHistogram }),
					MACDSeries.getHorizontalLine(this.props)
				);
			}
		}]);
	
		return MACDSeries;
	})(_react2["default"].Component);
	
	MACDSeries.getHorizontalLine = function (props) {
	
		/* eslint-disable react/prop-types */
		var xScale = props.xScale;
		var yScale = props.yScale;
		var xAccessor = props.xAccessor;
		var yAccessor = props.yAccessor;
		var plotData = props.plotData;
		var type = props.type;
		var zeroLineStroke = props.zeroLineStroke;
		var zeroLineOpacity = props.zeroLineOpacity;
	
		/* eslint-enable react/prop-types */
	
		return _react2["default"].createElement(_StraightLine2["default"], {
			stroke: zeroLineStroke, opacity: zeroLineOpacity, type: type,
			xScale: xScale, yScale: yScale,
			xAccessor: xAccessor, yAccessor: yAccessor,
			plotData: plotData,
			yValue: 0 });
	};
	
	/*MACDSeries.childContextTypes = {
		yAccessor: React.PropTypes.func.isRequired,
	};
	*/
	MACDSeries.propTypes = {
		className: _react2["default"].PropTypes.string,
		xScale: _react2["default"].PropTypes.func,
		yScale: _react2["default"].PropTypes.func,
		xAccessor: _react2["default"].PropTypes.func,
		yAccessor: _react2["default"].PropTypes.func,
		plotData: _react2["default"].PropTypes.array,
		type: _react2["default"].PropTypes.string,
		opacity: _react2["default"].PropTypes.number,
		histogramStroke: _react2["default"].PropTypes.bool,
		indicator: _react2["default"].PropTypes.func.isRequired
	};
	
	MACDSeries.defaultProps = {
		className: "react-stockcharts-macd-series",
		zeroLineStroke: "#000000",
		zeroLineOpacity: 0.3,
		opacity: 0.6,
		histogramStroke: false
	};
	
	exports["default"] = (0, _wrap2["default"])(MACDSeries);
	module.exports = exports["default"];

/***/ },
/* 67 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _wrap = __webpack_require__(52);
	
	var _wrap2 = _interopRequireDefault(_wrap);
	
	var _utilsUtils = __webpack_require__(7);
	
	var StraightLine = (function (_React$Component) {
		_inherits(StraightLine, _React$Component);
	
		function StraightLine() {
			_classCallCheck(this, StraightLine);
	
			_get(Object.getPrototypeOf(StraightLine.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(StraightLine, [{
			key: "render",
			value: function render() {
				var props = this.props;
				var stroke = props.stroke;
				var className = props.className;
				var opacity = props.opacity;
				var xScale = props.xScale;
				var yScale = props.yScale;
				var xAccessor = props.xAccessor;
				var plotData = props.plotData;
				var yValue = props.yValue;
	
				var first = xAccessor(plotData[0]);
				var last = xAccessor(plotData[plotData.length - 1]);
	
				return _react2["default"].createElement("line", { className: className,
					stroke: stroke, opacity: opacity,
					x1: xScale(first), y1: yScale(yValue),
					x2: xScale(last), y2: yScale(yValue) });
			}
		}]);
	
		return StraightLine;
	})(_react2["default"].Component);
	
	StraightLine.propTypes = {
		className: _react2["default"].PropTypes.string,
		xScale: _react2["default"].PropTypes.func.isRequired,
		yScale: _react2["default"].PropTypes.func.isRequired,
		xAccessor: _react2["default"].PropTypes.func.isRequired,
		stroke: _react2["default"].PropTypes.string,
		opacity: _react2["default"].PropTypes.number.isRequired,
		yValue: _react2["default"].PropTypes.number.isRequired
	};
	
	StraightLine.defaultProps = {
		className: "line ",
		stroke: "#000000",
		opacity: 0.5
	};
	
	StraightLine.drawOnCanvas = function (props, ctx, xScale, yScale, plotData) {
		var stroke = props.stroke;
		var opacity = props.opacity;
		var xAccessor = props.xAccessor;
		var yValue = props.yValue;
	
		var first = xAccessor(plotData[0]);
		var last = xAccessor(plotData[plotData.length - 1]);
	
		ctx.beginPath();
	
		ctx.strokeStyle = (0, _utilsUtils.hexToRGBA)(stroke, opacity);
	
		ctx.moveTo(xScale(first), yScale(yValue));
		ctx.lineTo(xScale(last), yScale(yValue));
		ctx.stroke();
	};
	
	exports["default"] = (0, _wrap2["default"])(StraightLine);
	module.exports = exports["default"];

/***/ },
/* 68 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Line = __webpack_require__(51);
	
	var _Line2 = _interopRequireDefault(_Line);
	
	var _Area = __webpack_require__(54);
	
	var _Area2 = _interopRequireDefault(_Area);
	
	var _wrap = __webpack_require__(52);
	
	var _wrap2 = _interopRequireDefault(_wrap);
	
	var BollingerSeries = (function (_React$Component) {
		_inherits(BollingerSeries, _React$Component);
	
		function BollingerSeries(props) {
			_classCallCheck(this, BollingerSeries);
	
			_get(Object.getPrototypeOf(BollingerSeries.prototype), "constructor", this).call(this, props);
			this.yAccessorForTop = this.yAccessorForTop.bind(this);
			this.yAccessorForMiddle = this.yAccessorForMiddle.bind(this);
			this.yAccessorForBottom = this.yAccessorForBottom.bind(this);
			this.yAccessorForScalledBottom = this.yAccessorForScalledBottom.bind(this);
		}
	
		_createClass(BollingerSeries, [{
			key: "yAccessorForTop",
			value: function yAccessorForTop(d) {
				var yAccessor = this.props.yAccessor;
	
				return yAccessor(d) && yAccessor(d).top;
			}
		}, {
			key: "yAccessorForMiddle",
			value: function yAccessorForMiddle(d) {
				var yAccessor = this.props.yAccessor;
	
				return yAccessor(d) && yAccessor(d).middle;
			}
		}, {
			key: "yAccessorForBottom",
			value: function yAccessorForBottom(d) {
				var yAccessor = this.props.yAccessor;
	
				return yAccessor(d) && yAccessor(d).bottom;
			}
		}, {
			key: "yAccessorForScalledBottom",
			value: function yAccessorForScalledBottom(scale, d) {
				var yAccessor = this.props.yAccessor;
	
				return scale(yAccessor(d) && yAccessor(d).bottom);
			}
		}, {
			key: "render",
			value: function render() {
				var _props = this.props;
				var xScale = _props.xScale;
				var yScale = _props.yScale;
				var xAccessor = _props.xAccessor;
				var plotData = _props.plotData;
				var type = _props.type;
				var _props2 = this.props;
				var stroke = _props2.stroke;
				var areaClassName = _props2.areaClassName;
				var className = _props2.className;
				var fill = _props2.fill;
				var opacity = _props2.opacity;
	
				return _react2["default"].createElement(
					"g",
					{ className: className },
					_react2["default"].createElement(_Line2["default"], {
						xScale: xScale, yScale: yScale,
						xAccessor: xAccessor, yAccessor: this.yAccessorForTop,
						plotData: plotData,
						stroke: stroke.top, fill: "none",
						type: type }),
					_react2["default"].createElement(_Line2["default"], {
						xScale: xScale, yScale: yScale,
						xAccessor: xAccessor, yAccessor: this.yAccessorForMiddle,
						plotData: plotData,
						stroke: stroke.middle, fill: "none",
						type: type }),
					_react2["default"].createElement(_Line2["default"], {
						xScale: xScale, yScale: yScale,
						xAccessor: xAccessor, yAccessor: this.yAccessorForBottom,
						plotData: plotData,
						stroke: stroke.bottom, fill: "none",
						type: type }),
					_react2["default"].createElement(_Area2["default"], {
						className: areaClassName,
						xScale: xScale, yScale: yScale,
						xAccessor: xAccessor, yAccessor: this.yAccessorForTop,
						base: this.yAccessorForScalledBottom,
						plotData: plotData,
						stroke: "none", fill: fill, opacity: opacity,
						type: type })
				);
			}
		}]);
	
		return BollingerSeries;
	})(_react2["default"].Component);
	
	BollingerSeries.propTypes = {
		xAccessor: _react2["default"].PropTypes.func,
		yAccessor: _react2["default"].PropTypes.func,
		xScale: _react2["default"].PropTypes.func,
		yScale: _react2["default"].PropTypes.func,
		plotData: _react2["default"].PropTypes.array,
		stroke: _react2["default"].PropTypes.object,
		className: _react2["default"].PropTypes.string,
		areaClassName: _react2["default"].PropTypes.string,
		fill: _react2["default"].PropTypes.string,
		opacity: _react2["default"].PropTypes.number,
		type: _react2["default"].PropTypes.string
	};
	
	BollingerSeries.defaultProps = {
		className: "react-stockcharts-bollinger-band-series",
		areaClassName: "react-stockcharts-bollinger-band-series-area",
		stroke: {
			top: "brown",
			middle: "black",
			bottom: "brown"
		},
		fill: "#4682B4",
		opacity: 0.2
	};
	
	exports["default"] = (0, _wrap2["default"])(BollingerSeries);
	module.exports = exports["default"];

/***/ },
/* 69 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Line = __webpack_require__(51);
	
	var _Line2 = _interopRequireDefault(_Line);
	
	var _StraightLine = __webpack_require__(67);
	
	var _StraightLine2 = _interopRequireDefault(_StraightLine);
	
	var _wrap = __webpack_require__(52);
	
	var _wrap2 = _interopRequireDefault(_wrap);
	
	var RSISeries = (function (_React$Component) {
		_inherits(RSISeries, _React$Component);
	
		function RSISeries() {
			_classCallCheck(this, RSISeries);
	
			_get(Object.getPrototypeOf(RSISeries.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(RSISeries, [{
			key: "render",
			value: function render() {
				var _props = this.props;
				var className = _props.className;
				var indicator = _props.indicator;
				var xScale = _props.xScale;
				var yScale = _props.yScale;
				var xAccessor = _props.xAccessor;
				var yAccessor = _props.yAccessor;
				var plotData = _props.plotData;
				var stroke = _props.stroke;
				var type = _props.type;
	
				var options = indicator.options();
				return _react2["default"].createElement(
					"g",
					{ className: className },
					_react2["default"].createElement(_Line2["default"], {
						className: className,
						xScale: xScale, yScale: yScale,
						xAccessor: xAccessor, yAccessor: yAccessor,
						plotData: plotData,
						stroke: stroke.line, fill: "none",
						type: type }),
					RSISeries.getHorizontalLine(this.props, options.overSold, stroke.top),
					RSISeries.getHorizontalLine(this.props, 50, stroke.middle),
					RSISeries.getHorizontalLine(this.props, options.overBought, stroke.bottom)
				);
			}
		}]);
	
		return RSISeries;
	})(_react2["default"].Component);
	
	RSISeries.getHorizontalLine = function (props, yValue, stroke) {
		/* eslint-disable react/prop-types */
		var xScale = props.xScale;
		var yScale = props.yScale;
		var xAccessor = props.xAccessor;
		var yAccessor = props.yAccessor;
		var plotData = props.plotData;
		var type = props.type;
	
		/* eslint-enable react/prop-types */
	
		return _react2["default"].createElement(_StraightLine2["default"], {
			stroke: stroke, opacity: 0.3, type: type,
			xScale: xScale, yScale: yScale,
			xAccessor: xAccessor, yAccessor: yAccessor,
			plotData: plotData,
			yValue: yValue });
	};
	
	RSISeries.propTypes = {
		className: _react2["default"].PropTypes.string,
	
		indicator: _react2["default"].PropTypes.func,
		xScale: _react2["default"].PropTypes.func,
		yScale: _react2["default"].PropTypes.func,
		xAccessor: _react2["default"].PropTypes.func,
		yAccessor: _react2["default"].PropTypes.func,
		plotData: _react2["default"].PropTypes.array,
		stroke: _react2["default"].PropTypes.object,
		type: _react2["default"].PropTypes.string
	};
	
	RSISeries.defaultProps = {
		className: "react-stockcharts-rsi-series",
		stroke: {
			line: "#000000",
			top: "brown",
			middle: "black",
			bottom: "brown"
		}
	};
	
	exports["default"] = (0, _wrap2["default"])(RSISeries);
	module.exports = exports["default"];

/***/ },
/* 70 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _wrap = __webpack_require__(52);
	
	var _wrap2 = _interopRequireDefault(_wrap);
	
	var _Line = __webpack_require__(51);
	
	var _Line2 = _interopRequireDefault(_Line);
	
	var _StraightLine = __webpack_require__(67);
	
	var _StraightLine2 = _interopRequireDefault(_StraightLine);
	
	var StochasticSeries = (function (_React$Component) {
		_inherits(StochasticSeries, _React$Component);
	
		function StochasticSeries(props) {
			_classCallCheck(this, StochasticSeries);
	
			_get(Object.getPrototypeOf(StochasticSeries.prototype), "constructor", this).call(this, props);
			this.yAccessorForD = this.yAccessorForD.bind(this);
			this.yAccessorForK = this.yAccessorForK.bind(this);
		}
	
		_createClass(StochasticSeries, [{
			key: "yAccessorForD",
			value: function yAccessorForD(d) {
				var yAccessor = this.props.yAccessor;
	
				return yAccessor(d) && yAccessor(d).D;
			}
		}, {
			key: "yAccessorForK",
			value: function yAccessorForK(d) {
				var yAccessor = this.props.yAccessor;
	
				return yAccessor(d) && yAccessor(d).K;
			}
		}, {
			key: "render",
			value: function render() {
				var props = this.props;
				var className = props.className;
				var indicator = props.indicator;
				var xScale = props.xScale;
				var yScale = props.yScale;
				var xAccessor = props.xAccessor;
				var plotData = props.plotData;
				var stroke = props.stroke;
				var type = props.type;
	
				var options = indicator.options();
	
				return _react2["default"].createElement(
					"g",
					{ className: className },
					_react2["default"].createElement(_Line2["default"], {
						xScale: xScale, yScale: yScale,
						xAccessor: xAccessor, yAccessor: this.yAccessorForD,
						plotData: plotData,
						stroke: options.stroke.D, fill: "none",
						type: type }),
					_react2["default"].createElement(_Line2["default"], {
						xScale: xScale, yScale: yScale,
						xAccessor: xAccessor, yAccessor: this.yAccessorForK,
						plotData: plotData,
						stroke: options.stroke.K, fill: "none",
						type: type }),
					StochasticSeries.getHorizontalLine(props, options.overSold, stroke.top),
					StochasticSeries.getHorizontalLine(props, 50, stroke.middle),
					StochasticSeries.getHorizontalLine(props, options.overBought, stroke.bottom)
				);
			}
		}]);
	
		return StochasticSeries;
	})(_react2["default"].Component);
	
	StochasticSeries.getHorizontalLine = function (props, yValue, stroke) {
	
		/* eslint-disable react/prop-types */
		var xScale = props.xScale;
		var yScale = props.yScale;
		var xAccessor = props.xAccessor;
		var yAccessor = props.yAccessor;
		var plotData = props.plotData;
		var type = props.type;
	
		/* eslint-enable react/prop-types */
	
		return _react2["default"].createElement(_StraightLine2["default"], {
			stroke: stroke, opacity: 0.3, type: type,
			xScale: xScale, yScale: yScale,
			xAccessor: xAccessor, yAccessor: yAccessor,
			plotData: plotData,
			yValue: yValue });
	};
	
	StochasticSeries.propTypes = {
		className: _react2["default"].PropTypes.string,
		xScale: _react2["default"].PropTypes.func,
		yScale: _react2["default"].PropTypes.func,
		xAccessor: _react2["default"].PropTypes.func,
		yAccessor: _react2["default"].PropTypes.func,
		plotData: _react2["default"].PropTypes.array,
		stroke: _react2["default"].PropTypes.object,
		type: _react2["default"].PropTypes.string
	};
	
	StochasticSeries.defaultProps = {
		className: "react-stockcharts-stochastic-series",
		stroke: {
			top: "brown",
			middle: "black",
			bottom: "brown"
		}
	};
	
	exports["default"] = (0, _wrap2["default"])(StochasticSeries);
	module.exports = exports["default"];

/***/ },
/* 71 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _HistogramSeries = __webpack_require__(61);
	
	var _HistogramSeries2 = _interopRequireDefault(_HistogramSeries);
	
	var _StackedHistogramSeries = __webpack_require__(62);
	
	var _StackedHistogramSeries2 = _interopRequireDefault(_StackedHistogramSeries);
	
	var _StraightLine = __webpack_require__(67);
	
	var _StraightLine2 = _interopRequireDefault(_StraightLine);
	
	var _wrap = __webpack_require__(52);
	
	var _wrap2 = _interopRequireDefault(_wrap);
	
	var ElderRaySeries = (function (_React$Component) {
		_inherits(ElderRaySeries, _React$Component);
	
		function ElderRaySeries(props) {
			_classCallCheck(this, ElderRaySeries);
	
			_get(Object.getPrototypeOf(ElderRaySeries.prototype), "constructor", this).call(this, props);
			this.yAccessorTop = this.yAccessorTop.bind(this);
			this.yAccessorBullTop = this.yAccessorBullTop.bind(this);
			this.yAccessorBearTop = this.yAccessorBearTop.bind(this);
			this.yAccessorBullBottom = this.yAccessorBullBottom.bind(this);
			this.yAccessorBearBottom = this.yAccessorBearBottom.bind(this);
			this.yAccessorForHistogramBase = this.yAccessorForHistogramBase.bind(this);
		}
	
		/*
	 */
	
		_createClass(ElderRaySeries, [{
			key: "yAccessorTop",
			value: function yAccessorTop(d) {
				var yAccessor = this.props.yAccessor;
	
				return yAccessor(d) && Math.max(yAccessor(d).bullPower, 0);
			}
		}, {
			key: "yAccessorBullTop",
			value: function yAccessorBullTop(d) {
				var yAccessor = this.props.yAccessor;
	
				return yAccessor(d) && (yAccessor(d).bullPower > 0 ? yAccessor(d).bullPower : undefined);
			}
		}, {
			key: "yAccessorBearTop",
			value: function yAccessorBearTop(d) {
				var yAccessor = this.props.yAccessor;
	
				return yAccessor(d) && (yAccessor(d).bearPower > 0 ? yAccessor(d).bearPower : undefined);
			}
		}, {
			key: "yAccessorBullBottom",
			value: function yAccessorBullBottom(d) {
				var yAccessor = this.props.yAccessor;
	
				return yAccessor(d) && (yAccessor(d).bullPower < 0 ? 0 : undefined);
			}
		}, {
			key: "yAccessorBearBottom",
			value: function yAccessorBearBottom(d) {
				var yAccessor = this.props.yAccessor;
	
				return yAccessor(d) && (yAccessor(d).bullPower < 0 || yAccessor(d).bullPower * yAccessor(d).bearPower < 0 ? Math.min(0, yAccessor(d).bullPower) : undefined);
			}
		}, {
			key: "yAccessorForHistogramBase",
			value: function yAccessorForHistogramBase(xScale, yScale, d) {
				var yAccessor = this.props.yAccessor;
	
				var y = yAccessor(d) ? yAccessor(d).bearPower : 0;
				return yScale(Math.min(y, 0));
			}
		}, {
			key: "fillForEachBar",
			value: function fillForEachBar(d, yAccessorNumber) {
				return yAccessorNumber % 2 === 0 ? "#6BA583" : "#FF0000";
			}
		}, {
			key: "render",
			value: function render() {
				var _props = this.props;
				var className = _props.className;
				var indicator = _props.indicator;
				var xScale = _props.xScale;
				var yScale = _props.yScale;
				var xAccessor = _props.xAccessor;
				var plotData = _props.plotData;
				var type = _props.type;
				var opacity = _props.opacity;
				var histogramStroke = _props.histogramStroke;
	
				var options = indicator.options();
	
				return _react2["default"].createElement(
					"g",
					{ className: className },
					_react2["default"].createElement(_StackedHistogramSeries2["default"], {
						xScale: xScale, yScale: yScale,
						baseAt: this.yAccessorForHistogramBase,
						className: "elderray-histogram",
						stroke: false, fill: this.fillForEachBar,
						opacity: opacity,
						plotData: plotData,
						yAccessor: [this.yAccessorBullTop, this.yAccessorBearTop, this.yAccessorBullBottom, this.yAccessorBearBottom] }),
					_react2["default"].createElement(_StraightLine2["default"], { yValue: 0 })
				);
			}
		}]);
	
		return ElderRaySeries;
	})(_react2["default"].Component);
	
	ElderRaySeries.propTypes = {
		className: _react2["default"].PropTypes.string,
		xScale: _react2["default"].PropTypes.func,
		yScale: _react2["default"].PropTypes.func,
		xAccessor: _react2["default"].PropTypes.func,
		yAccessor: _react2["default"].PropTypes.func,
		plotData: _react2["default"].PropTypes.array,
		type: _react2["default"].PropTypes.string,
		opacity: _react2["default"].PropTypes.number,
		histogramStroke: _react2["default"].PropTypes.bool,
		indicator: _react2["default"].PropTypes.func.isRequired
	};
	
	ElderRaySeries.defaultProps = {
		className: "react-stockcharts-elderray-series",
		zeroLineStroke: "#000000",
		zeroLineOpacity: 0.3,
		opacity: 1,
		histogramStroke: false
	};
	
	exports["default"] = (0, _wrap2["default"])(ElderRaySeries);
	module.exports = exports["default"];

/***/ },
/* 72 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _lodashGet = __webpack_require__(9);
	
	var _lodashGet2 = _interopRequireDefault(_lodashGet);
	
	var _wrap = __webpack_require__(52);
	
	var _wrap2 = _interopRequireDefault(_wrap);
	
	var ElderImpulseBackground = (function (_React$Component) {
		_inherits(ElderImpulseBackground, _React$Component);
	
		function ElderImpulseBackground() {
			_classCallCheck(this, ElderImpulseBackground);
	
			_get(Object.getPrototypeOf(ElderImpulseBackground.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(ElderImpulseBackground, [{
			key: "render",
			value: function render() {
				var _props = this.props;
				var className = _props.className;
				var indicator = _props.indicator;
				var xScale = _props.xScale;
				var yScale = _props.yScale;
				var xAccessor = _props.xAccessor;
				var plotData = _props.plotData;
				var type = _props.type;
				var opacity = _props.opacity;
				var histogramStroke = _props.histogramStroke;
	
				var options = indicator.options();
				console.log(options);
				return _react2["default"].createElement("g", { className: className });
			}
		}]);
	
		return ElderImpulseBackground;
	})(_react2["default"].Component);
	
	ElderImpulseBackground.propTypes = {
		className: _react2["default"].PropTypes.string,
		xScale: _react2["default"].PropTypes.func,
		yScale: _react2["default"].PropTypes.func,
		xAccessor: _react2["default"].PropTypes.func,
		yAccessor: _react2["default"].PropTypes.func,
		plotData: _react2["default"].PropTypes.array,
		type: _react2["default"].PropTypes.string,
		opacity: _react2["default"].PropTypes.number,
		histogramStroke: _react2["default"].PropTypes.bool,
		indicator: _react2["default"].PropTypes.func.isRequired
	};
	
	ElderImpulseBackground.defaultProps = {
		className: "react-stockcharts-elderimpulse-series",
		zeroLineStroke: "#000000",
		zeroLineOpacity: 0.3,
		opacity: 1,
		histogramStroke: false
	};
	
	exports["default"] = (0, _wrap2["default"])(ElderImpulseBackground);
	module.exports = exports["default"];

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _EdgeContainer = __webpack_require__(74);
	
	var _EdgeContainer2 = _interopRequireDefault(_EdgeContainer);
	
	var _EdgeIndicator = __webpack_require__(75);
	
	var _EdgeIndicator2 = _interopRequireDefault(_EdgeIndicator);
	
	var _MouseCoordinates = __webpack_require__(77);
	
	var _MouseCoordinates2 = _interopRequireDefault(_MouseCoordinates);
	
	var _CurrentCoordinate = __webpack_require__(79);
	
	var _CurrentCoordinate2 = _interopRequireDefault(_CurrentCoordinate);
	
	exports.EdgeContainer = _EdgeContainer2["default"];
	exports.EdgeIndicator = _EdgeIndicator2["default"];
	exports.MouseCoordinates = _MouseCoordinates2["default"];
	exports.CurrentCoordinate = _CurrentCoordinate2["default"];

/***/ },
/* 74 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsUtils = __webpack_require__(7);
	
	var _objectAssign = __webpack_require__(4);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _utilsPureComponent = __webpack_require__(5);
	
	var _utilsPureComponent2 = _interopRequireDefault(_utilsPureComponent);
	
	var EdgeContainer = (function (_PureComponent) {
		_inherits(EdgeContainer, _PureComponent);
	
		function EdgeContainer() {
			_classCallCheck(this, EdgeContainer);
	
			_get(Object.getPrototypeOf(EdgeContainer.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(EdgeContainer, [{
			key: "render",
			value: function render() {
				var _this = this;
	
				var children = _react2["default"].Children.map(this.props.children, function (child) {
					var newChild = (0, _utilsUtils.isReactVersion13)() ? _react2["default"].withContext(_this.context, function () {
						return _react2["default"].createElement(child.type, (0, _objectAssign2["default"])({ key: child.key, ref: child.ref }, child.props));
					}) : child;
					// React.createElement(child.type, objectAssign({ key: child.key, ref: child.ref}, child.props));
					return newChild;
				});
				return _react2["default"].createElement(
					"g",
					null,
					children
				);
			}
		}]);
	
		return EdgeContainer;
	})(_utilsPureComponent2["default"]);
	
	EdgeContainer.contextTypes = {
		width: _react2["default"].PropTypes.number.isRequired,
		chartData: _react2["default"].PropTypes.array.isRequired,
		// currentItems: React.PropTypes.array.isRequired,
		axesCanvasContext: _react2["default"].PropTypes.object,
		type: _react2["default"].PropTypes.string,
		margin: _react2["default"].PropTypes.object.isRequired
	};
	
	// secretToSuperFastCanvasDraw: React.PropTypes.array.isRequired,
	exports["default"] = EdgeContainer;
	module.exports = exports["default"];

/***/ },
/* 75 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _d3 = __webpack_require__(8);
	
	var _d32 = _interopRequireDefault(_d3);
	
	var _EdgeCoordinate = __webpack_require__(76);
	
	var _EdgeCoordinate2 = _interopRequireDefault(_EdgeCoordinate);
	
	var _utilsPureComponent = __webpack_require__(5);
	
	var _utilsPureComponent2 = _interopRequireDefault(_utilsPureComponent);
	
	var _utilsUtils = __webpack_require__(7);
	
	var _utilsChartDataUtil = __webpack_require__(13);
	
	var EdgeIndicator = (function (_PureComponent) {
		_inherits(EdgeIndicator, _PureComponent);
	
		function EdgeIndicator(props, context) {
			_classCallCheck(this, EdgeIndicator);
	
			_get(Object.getPrototypeOf(EdgeIndicator.prototype), "constructor", this).call(this, props, context);
			this.drawOnCanvas = this.drawOnCanvas.bind(this);
		}
	
		_createClass(EdgeIndicator, [{
			key: "componentDidMount",
			value: function componentDidMount() {
				var _context = this.context;
				var chartCanvasType = _context.chartCanvasType;
				var getCanvasContexts = _context.getCanvasContexts;
	
				if (chartCanvasType !== "svg" && getCanvasContexts !== undefined) {
					var contexts = getCanvasContexts();
					if (contexts) this.drawOnCanvas(contexts.axes);
				}
			}
		}, {
			key: "componentDidUpdate",
			value: function componentDidUpdate() {
				this.componentDidMount();
			}
		}, {
			key: "componentWillMount",
			value: function componentWillMount() {
				this.componentWillReceiveProps(this.props, this.context);
			}
		}, {
			key: "componentWillReceiveProps",
			value: function componentWillReceiveProps(nextProps, nextContext) {
				var margin = nextContext.margin;
				var width = nextContext.width;
	
				var draw = EdgeIndicator.drawOnCanvasStatic.bind(null, margin, nextProps, width);
	
				nextContext.callbackForCanvasDraw({
					type: "axis",
					draw: draw
				});
			}
		}, {
			key: "drawOnCanvas",
			value: function drawOnCanvas(ctx) {
				var _context2 = this.context;
				var chartData = _context2.chartData;
				var margin = _context2.margin;
				var width = _context2.width;
	
				EdgeIndicator.drawOnCanvasStatic(margin, this.props, width, ctx, chartData);
			}
		}, {
			key: "render",
			value: function render() {
				if (this.context.chartCanvasType !== "svg") return null;
	
				var _context3 = this.context;
				var width = _context3.width;
				var chartData = _context3.chartData;
	
				var edge = EdgeIndicator.helper(this.props, width, chartData);
	
				if (edge === undefined) return null;
				return _react2["default"].createElement(_EdgeCoordinate2["default"], {
					type: edge.type,
					className: "react-stockcharts-edge-coordinate",
					fill: edge.fill,
					show: edge.show,
					x1: edge.x1,
					y1: edge.y1,
					x2: edge.x2,
					y2: edge.y2,
					coordinate: edge.coordinate,
					edgeAt: edge.edgeAt,
					orient: edge.orient });
			}
		}]);
	
		return EdgeIndicator;
	})(_utilsPureComponent2["default"]);
	
	EdgeIndicator.contextTypes = {
		width: _react2["default"].PropTypes.number.isRequired,
		chartData: _react2["default"].PropTypes.array.isRequired,
		getCanvasContexts: _react2["default"].PropTypes.func,
		chartCanvasType: _react2["default"].PropTypes.string,
		margin: _react2["default"].PropTypes.object.isRequired,
		// secretToSuperFastCanvasDraw: React.PropTypes.array.isRequired,
		callbackForCanvasDraw: _react2["default"].PropTypes.func.isRequired
	};
	
	EdgeIndicator.propTypes = {
		type: _react2["default"].PropTypes.oneOf(["horizontal"]).isRequired,
		className: _react2["default"].PropTypes.string,
		fill: _react2["default"].PropTypes.string,
		defaultFill: _react2["default"].PropTypes.string,
		itemType: _react2["default"].PropTypes.oneOf(["first", "last", "current"]).isRequired,
		orient: _react2["default"].PropTypes.oneOf(["left", "right"]),
		edgeAt: _react2["default"].PropTypes.oneOf(["left", "right"]),
		forChart: _react2["default"].PropTypes.number.isRequired,
		forDataSeries: _react2["default"].PropTypes.number.isRequired,
		displayFormat: _react2["default"].PropTypes.func.isRequired
	
	};
	
	EdgeIndicator.defaultProps = {
		type: "horizontal",
		orient: "left",
		edgeAt: "left",
		displayFormat: _utilsUtils.displayNumberFormat,
		yAxisPad: 5,
		namespace: "ReStock.EdgeIndicator",
		defaultFill: "#0f0f0f"
	};
	
	EdgeIndicator.drawOnCanvasStatic = function (margin, props, width, ctx, chartDataArray) {
		var edge = EdgeIndicator.helper(props, width, chartDataArray);
	
		if (edge === undefined) return null;
	
		var originX = margin.left;
		var originY = margin.top;
		ctx.save();
	
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.translate(originX, originY);
	
		_EdgeCoordinate2["default"].drawOnCanvasStatic(ctx, edge);
		ctx.restore();
	};
	
	EdgeIndicator.helper = function (props, width, chartData) {
		var edgeType = props.type;
		var displayFormat = props.displayFormat;
		var forChart = props.forChart;
		var forDataSeries = props.forDataSeries;
		var itemType = props.itemType;
		var edgeAt = props.edgeAt;
		var yAxisPad = props.yAxisPad;
		var orient = props.orient;
		var fill = props.fill;
		var defaultFill = props.defaultFill;
	
		var currentChartData = (0, _utilsChartDataUtil.getChartDataForChartNew)(chartData, forChart);
		// var currentItem = ChartDataUtil.getCurrentItemForChartNew(currentItems, forChart);
		var edge = null,
		    item,
		    yAccessor;
		// console.log(chartData.config.compareSeries.length);
		var displayFormat = currentChartData.config.compareSeries.length > 0 ? _d32["default"].format(".0%") : displayFormat;
	
		if (forDataSeries !== undefined && currentChartData.config.overlays.length > 0 && currentChartData.plot.overlayValues.length > 0) {
	
			var overlay = currentChartData.config.overlays.filter(function (eachOverlay) {
				return eachOverlay.id === forDataSeries;
			});
			var overlayValue = currentChartData.plot.overlayValues.filter(function (eachOverlayValue) {
				return eachOverlayValue.id === forDataSeries;
			});
	
			item = itemType === "first" ? overlayValue[0].first : overlayValue[0].last;
	
			yAccessor = overlay[0].yAccessor;
	
			if (item !== undefined) {
				var yValue = yAccessor(item),
				    xValue = currentChartData.config.xAccessor(item);
				var x1 = Math.round(currentChartData.plot.scales.xScale(xValue)),
				    y1 = Math.round(currentChartData.plot.scales.yScale(yValue));
	
				var stroke = overlay[0].stroke || fill;
				// console.log(forChart, forDataSeries, stroke, fill, defaultFill);
				if (!stroke) console.error("EdgeIndicator forChart=" + forChart + " forDataSeries=" + forDataSeries + " " + "is not a derived indicator, so a fill color is not auto assigned. Add a fill attribute to specify the color");
	
				stroke = stroke || defaultFill;
	
				var edgeX = edgeAt === "left" ? 0 - yAxisPad : width + yAxisPad;
	
				edge = {
					type: edgeType,
					fill: stroke,
					show: true,
					x1: x1 + currentChartData.config.origin[0],
					y1: y1 + currentChartData.config.origin[1],
					x2: edgeX + currentChartData.config.origin[0],
					y2: y1 + currentChartData.config.origin[1],
					coordinate: displayFormat(yValue),
					edgeAt: edgeX,
					orient: orient,
					chartOrigin: currentChartData.config.origin
				};
			}
		}
		return edge;
	};
	
	exports["default"] = EdgeIndicator;
	module.exports = exports["default"];

/***/ },
/* 76 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _objectAssign = __webpack_require__(4);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _utilsUtils = __webpack_require__(7);
	
	var EdgeCoordinate = (function (_React$Component) {
		_inherits(EdgeCoordinate, _React$Component);
	
		function EdgeCoordinate() {
			_classCallCheck(this, EdgeCoordinate);
	
			_get(Object.getPrototypeOf(EdgeCoordinate.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(EdgeCoordinate, [{
			key: "render",
			value: function render() {
				var className = this.props.className;
	
				var edge = EdgeCoordinate.helper(this.props);
				if (edge === null) return null;
				var line, coordinateBase, coordinate;
	
				if (edge.line !== undefined) {
					line = _react2["default"].createElement("line", {
						className: "react-stockcharts-cross-hair", opacity: edge.line.opacity, stroke: edge.line.stroke,
						x1: edge.line.x1, y1: edge.line.y1,
						x2: edge.line.x2, y2: edge.line.y2 });
				}
				if (edge.coordinateBase !== undefined) {
					coordinateBase = _react2["default"].createElement("rect", { key: 1, className: "react-stockchart-text-background",
						x: edge.coordinateBase.edgeXRect,
						y: edge.coordinateBase.edgeYRect,
						height: edge.coordinateBase.rectHeight, width: edge.coordinateBase.rectWidth,
						fill: edge.coordinateBase.fill, opacity: edge.coordinateBase.opacity });
	
					coordinate = _react2["default"].createElement(
						"text",
						{ key: 2, x: edge.coordinate.edgeXText,
							y: edge.coordinate.edgeYText,
							textAnchor: edge.coordinate.textAnchor,
							fontFamily: edge.coordinate.fontFamily,
							fontSize: edge.coordinate.fontSize,
							dy: ".32em", fill: edge.coordinate.textFill },
						edge.coordinate.displayCoordinate
					);
				}
				return _react2["default"].createElement(
					"g",
					{ className: className },
					line,
					coordinateBase,
					coordinate
				);
			}
		}]);
	
		return EdgeCoordinate;
	})(_react2["default"].Component);
	
	EdgeCoordinate.propTypes = {
		className: _react2["default"].PropTypes.string,
		type: _react2["default"].PropTypes.oneOf(["vertical", "horizontal"]).isRequired,
		coordinate: _react2["default"].PropTypes.any.isRequired,
		x1: _react2["default"].PropTypes.number.isRequired,
		y1: _react2["default"].PropTypes.number.isRequired,
		x2: _react2["default"].PropTypes.number.isRequired,
		y2: _react2["default"].PropTypes.number.isRequired,
		orient: _react2["default"].PropTypes.oneOf(["bottom", "top", "left", "right"]),
		rectWidth: _react2["default"].PropTypes.number,
		hideLine: _react2["default"].PropTypes.bool,
		fill: _react2["default"].PropTypes.string,
		opacity: _react2["default"].PropTypes.number,
		fontFamily: _react2["default"].PropTypes.string.isRequired,
		fontSize: _react2["default"].PropTypes.number.isRequired
	};
	
	EdgeCoordinate.defaultProps = {
		namespace: "ReStock.EdgeCoordinate",
		className: "react-stockcharts-edgecoordinate",
		orient: "left",
		hideLine: false,
		fill: "#8a8a8a",
		opacity: 1,
		textFill: "#FFFFFF",
		fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
		fontSize: 13,
		lineStroke: "#000000",
		lineOpacity: 0.3
	};
	
	EdgeCoordinate.helper = function (props) {
		var displayCoordinate = props.coordinate;
		var show = props.show;
		var rectWidth = props.rectWidth;
		var type = props.type;
		var orient = props.orient;
		var edgeAt = props.edgeAt;
		var hideLine = props.hideLine;
		var fill = props.fill;
		var opacity = props.opacity;
		var fontFamily = props.fontFamily;
		var fontSize = props.fontSize;
		var textFill = props.textFill;
		var lineStroke = props.lineStroke;
		var lineOpacity = props.lineOpacity;
		var x1 = props.x1;
		var y1 = props.y1;
		var x2 = props.x2;
		var y2 = props.y2;
	
		if (!show) return null;
	
		rectWidth = rectWidth ? rectWidth : type === "horizontal" ? 60 : 100;
		var rectHeight = 20;
	
		var edgeXRect, edgeYRect, edgeXText, edgeYText;
	
		if (type === "horizontal") {
	
			edgeXRect = orient === "right" ? edgeAt + 1 : edgeAt - rectWidth - 1;
			edgeYRect = y1 - rectHeight / 2;
			edgeXText = orient === "right" ? edgeAt + rectWidth / 2 : edgeAt - rectWidth / 2;
			edgeYText = y1;
		} else {
			edgeXRect = x1 - rectWidth / 2;
			edgeYRect = orient === "bottom" ? edgeAt : edgeAt - rectHeight;
			edgeXText = x1;
			edgeYText = orient === "bottom" ? edgeAt + rectHeight / 2 : edgeAt - rectHeight / 2;
		}
		var coordinateBase,
		    coordinate,
		    textAnchor = "middle";
		if (displayCoordinate !== undefined) {
			coordinateBase = {
				edgeXRect: edgeXRect, edgeYRect: edgeYRect, rectHeight: rectHeight, rectWidth: rectWidth, fill: fill, opacity: opacity
			};
			coordinate = {
				edgeXText: edgeXText, edgeYText: edgeYText, textAnchor: textAnchor, fontFamily: fontFamily, fontSize: fontSize, textFill: textFill, displayCoordinate: displayCoordinate
			};
		}
		var line = hideLine ? undefined : {
			opacity: lineOpacity, stroke: lineStroke, x1: x1, y1: y1, x2: x2, y2: y2
		};
		return {
			coordinateBase: coordinateBase, coordinate: coordinate, line: line
		};
	};
	
	EdgeCoordinate.drawOnCanvasStatic = function (ctx, props) {
		props = (0, _objectAssign2["default"])({}, EdgeCoordinate.defaultProps, props);
	
		var edge = EdgeCoordinate.helper(props);
	
		if (edge === null) return;
	
		if (edge.coordinateBase !== undefined) {
			ctx.fillStyle = (0, _utilsUtils.hexToRGBA)(edge.coordinateBase.fill, edge.coordinateBase.opacity);
	
			ctx.beginPath();
			ctx.rect(edge.coordinateBase.edgeXRect, edge.coordinateBase.edgeYRect, edge.coordinateBase.rectWidth, edge.coordinateBase.rectHeight);
			ctx.fill();
	
			ctx.font = edge.coordinate.fontSize + "px " + edge.coordinate.fontFamily;
			ctx.fillStyle = edge.coordinate.textFill;
			ctx.textAlign = edge.coordinate.textAnchor === "middle" ? "center" : edge.coordinate.textAnchor;
			ctx.textBaseline = "middle";
	
			ctx.fillText(edge.coordinate.displayCoordinate, edge.coordinate.edgeXText, edge.coordinate.edgeYText);
		}
		if (edge.line !== undefined) {
			ctx.strokeStyle = (0, _utilsUtils.hexToRGBA)(edge.line.stroke, edge.line.opacity);
	
			ctx.beginPath();
			ctx.moveTo(edge.line.x1, edge.line.y1);
			ctx.lineTo(edge.line.x2, edge.line.y2);
			ctx.stroke();
		}
	};
	
	exports["default"] = EdgeCoordinate;
	module.exports = exports["default"];

/***/ },
/* 77 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _pure = __webpack_require__(53);
	
	var _pure2 = _interopRequireDefault(_pure);
	
	var _CrossHair = __webpack_require__(78);
	
	var _CrossHair2 = _interopRequireDefault(_CrossHair);
	
	var _objectAssign = __webpack_require__(4);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _utilsUtils = __webpack_require__(7);
	
	var MouseCoordinates = (function (_React$Component) {
		_inherits(MouseCoordinates, _React$Component);
	
		function MouseCoordinates() {
			_classCallCheck(this, MouseCoordinates);
	
			_get(Object.getPrototypeOf(MouseCoordinates.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(MouseCoordinates, [{
			key: "componentDidMount",
			value: function componentDidMount() {
				var _props = this.props;
				var chartCanvasType = _props.chartCanvasType;
				var getCanvasContexts = _props.getCanvasContexts;
	
				if (chartCanvasType !== "svg" && getCanvasContexts !== undefined) {
					var contexts = getCanvasContexts();
					if (contexts) MouseCoordinates.drawOnCanvas(contexts.mouseCoord, this.props);
				}
			}
		}, {
			key: "componentDidUpdate",
			value: function componentDidUpdate() {
				this.componentDidMount();
			}
		}, {
			key: "componentWillMount",
			value: function componentWillMount() {
				this.componentWillReceiveProps(this.props, this.props);
			}
		}, {
			key: "componentWillReceiveProps",
			value: function componentWillReceiveProps(nextProps) {
				var draw = MouseCoordinates.drawOnCanvasStatic.bind(null, nextProps);
	
				var temp = nextProps.getAllCanvasDrawCallback().filter(function (each) {
					return each.type === "mouse";
				});
				if (temp.length === 0) {
					nextProps.callbackForCanvasDraw({
						type: "mouse",
						draw: draw
					});
				} else {
					nextProps.callbackForCanvasDraw(temp[0], {
						type: "mouse",
						draw: draw
					});
				}
			}
		}, {
			key: "render",
			value: function render() {
				var _props2 = this.props;
				var chartCanvasType = _props2.chartCanvasType;
				var mouseXY = _props2.mouseXY;
				var currentCharts = _props2.currentCharts;
				var chartData = _props2.chartData;
				var currentItems = _props2.currentItems;
				var show = _props2.show;
				var _props3 = this.props;
				var stroke = _props3.stroke;
				var opacity = _props3.opacity;
				var textStroke = _props3.textStroke;
				var textBGFill = _props3.textBGFill;
				var textBGopacity = _props3.textBGopacity;
				var fontFamily = _props3.fontFamily;
				var fontSize = _props3.fontSize;
	
				if (chartCanvasType !== "svg") return null;
	
				var pointer = MouseCoordinates.helper(this.props, show, mouseXY, currentCharts, chartData, currentItems);
	
				if (!pointer) return null;
	
				return _react2["default"].createElement(_CrossHair2["default"], { height: pointer.height, width: pointer.width, mouseXY: pointer.mouseXY,
					xDisplayValue: pointer.xDisplayValue, edges: pointer.edges,
					stroke: stroke, opacity: opacity, textStroke: textStroke,
					textBGFill: textBGFill, textBGopacity: textBGopacity,
					fontFamily: fontFamily, fontSize: fontSize });
			}
		}]);
	
		return MouseCoordinates;
	})(_react2["default"].Component);
	
	MouseCoordinates.propTypes = {
		xDisplayFormat: _react2["default"].PropTypes.func.isRequired,
		yDisplayFormat: _react2["default"].PropTypes.func.isRequired,
		type: _react2["default"].PropTypes.oneOf(["crosshair"]).isRequired,
	
		chartCanvasType: _react2["default"].PropTypes.string,
		getCanvasContexts: _react2["default"].PropTypes.func,
		mouseXY: _react2["default"].PropTypes.array,
		currentCharts: _react2["default"].PropTypes.array,
		chartData: _react2["default"].PropTypes.array,
		currentItems: _react2["default"].PropTypes.array,
		show: _react2["default"].PropTypes.bool,
		stroke: _react2["default"].PropTypes.string,
		opacity: _react2["default"].PropTypes.number,
		textStroke: _react2["default"].PropTypes.string,
		textBGFill: _react2["default"].PropTypes.string,
		textBGopacity: _react2["default"].PropTypes.number,
		fontFamily: _react2["default"].PropTypes.string,
		fontSize: _react2["default"].PropTypes.number
	};
	
	MouseCoordinates.defaultProps = {
		// show: false,
		snapX: true,
		type: "crosshair",
		xDisplayFormat: _utilsUtils.displayDateFormat,
		yDisplayFormat: _utilsUtils.displayNumberFormat,
		stroke: "#000000",
		opacity: 0.2,
		textStroke: "#ffffff",
		textBGFill: "#8a8a8a",
		textBGopacity: 1,
		fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
		fontSize: 13
	
	};
	
	// fill: "",
	// opacity: 1,
	// textFill: "white",
	// var { fill, opacity, fontFamily, fontSize, textFill } = props;
	
	MouseCoordinates.drawOnCanvas = function (canvasContext, props) {
		var mouseXY = props.mouseXY;
		var currentCharts = props.currentCharts;
		var chartData = props.chartData;
		var currentItems = props.currentItems;
		var show = props.show;
	
		MouseCoordinates.drawOnCanvasStatic(props, canvasContext, show, mouseXY, currentCharts, chartData, currentItems);
	};
	MouseCoordinates.drawOnCanvasStatic = function (props, ctx, show, mouseXY, currentCharts, chartData, currentItems) {
		var margin = props.margin;
	
		var pointer = MouseCoordinates.helper(props, show, mouseXY, currentCharts, chartData, currentItems);
	
		// console.log("HERE", show);
		if (!pointer) return null;
	
		var originX = 0.5 + margin.left;
		var originY = 0.5 + margin.top;
	
		ctx.save();
	
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.translate(originX, originY);
	
		_CrossHair2["default"].drawOnCanvasStatic(ctx, pointer);
		ctx.restore();
	};
	
	MouseCoordinates.helper = function (props, show, mouseXY, currentCharts, chartData, currentItems) {
		if (!show) return;
		var mainChart = props.mainChart;
		var dateAccessor = props.dateAccessor;
		var height = props.height;
		var width = props.width;
		var snapX = props.snapX;
		var xDisplayFormat = props.xDisplayFormat;
	
		var edges = chartData.filter(function (eachChartData) {
			return currentCharts.indexOf(eachChartData.id) > -1;
		}).map(function (each) {
			var yDisplayFormat = each.config.compareSeries.length > 0 ? function (d) {
				return (Math.round(d * 10000) / 100).toFixed(2) + "%";
			} : each.config.mouseCoordinates.format;
			var mouseY = mouseXY[1] - each.config.origin[1];
			var yValue = each.plot.scales.yScale.invert(mouseY);
			return {
				id: each.id,
				at: each.config.mouseCoordinates.at,
				yValue: yValue,
				yDisplayFormat: yDisplayFormat
			};
		}).filter(function (each) {
			return each.at !== undefined;
		}).filter(function (each) {
			return each.yDisplayFormat !== undefined;
		}).map(function (each) {
			each.yDisplayValue = each.yDisplayFormat(each.yValue);
			return each;
		});
	
		var singleChartData = chartData.filter(function (eachChartData) {
			return eachChartData.id === mainChart;
		})[0];
	
		// console.log(props, show, mouseXY, currentCharts, chartData, currentItems);
	
		// var yDisplayFormat = singleChartData.config.compareSeries.length > 0 ? (d) => (Math.round(d * 10000) / 100).toFixed(2) + "%" : this.props.yDisplayFormat;
	
		var item = currentItems.filter(function (eachItem) {
			return eachItem.id === mainChart;
		})[0]; // ChartDataUtil.getCurrentItemForChart(this.props, this.context);
		if (item === undefined) return null;
		item = item.data;
		//  console.log(singleChartData, item);
		//	console.log("currentItems",currentItems);
		var xValue = singleChartData.config.xAccessor(item);
	
		var xDisplayValue = dateAccessor === undefined ? xValue : dateAccessor(item);
	
		//	chartData.map( (chart) => console.log(chart.config.overlays));
	
		//	console.log("chartData",chartData);
	
		//yAccessor associated with scale.
		var yAccessors = chartData.map(function (chart) {
			return chart.config.overlays.map(function (over) {
				return {
					yAccessor: over.yAccessor,
					yScale: chart.plot.scales.yScale
				};
			});
		});
	
		//flatten
		yAccessors = [].concat.apply([], yAccessors);
	
		//	console.log(yAccessors);
	
		//add currentItems to each yAccessor, try to get yValues from each yAccessor
		var yValAccessors = yAccessors.map(function (accessor, i) {
			return (0, _objectAssign2["default"])({}, accessor, { yValues: currentItems.map(function (curItem) {
					return accessor.yAccessor(curItem.data);
				}) });
		});
	
		//	console.log("yValAccessors",yValAccessors);
	
		//Some yValues might fail to be produced from items with the yAccessors, filter them.
		yValAccessors = yValAccessors.filter(function (yValA) {
			yValA.yValues = yValA.yValues.filter(function (yValue) {
				return yValue != undefined;
			});
			return yValA.yValues.length != 0;
		});
	
		//	console.log("yValAccessor after filter", yValAccessors);
	
		//translate the each yValue to its mouseY coordinate
		var mouseYValues = yValAccessors.map(function (yValA) {
			var mouseYValues = yValA.yValues.map(function (yValue) {
				return { mouseY: yValA.yScale(yValue), yValue: yValue };
			});
			return mouseYValues;
		});
	
		//	console.log("mouseYValues",mouseYValues);
	
		//flatten
		mouseYValues = [].concat.apply([], mouseYValues);
	
		//remove yValue -
		mouseYValues = mouseYValues.filter(function (cur) {
			return cur.yValue != undefined;
		});
		var mouseYValue = mouseYValues.reduce(function (res, cur) {
			return Math.abs(res.mouseY - mouseXY[1]) < Math.abs(cur.mouseY - mouseXY[1]) ? res : cur;
		});
	
		//	
		//
	
		//	console.log("mouseYValue : ",mouseYValue);
	
		edges.map(function (edge) {
			edge.yDisplayValue = edge.yDisplayFormat(mouseYValue.yValue);return edge;
		});
	
		if (mouseYValue == undefined || xValue === undefined) return null;
		var x = snapX ? Math.round(singleChartData.plot.scales.xScale(xValue)) : mouseXY[0];
		var y = mouseYValue.mouseY;
		//	console.log("XY ",x, " ",y);
		var stroke = props.stroke;
		var opacity = props.opacity;
		var textStroke = props.textStroke;
		var textBGFill = props.textBGFill;
		var textBGopacity = props.textBGopacity;
		var fontFamily = props.fontFamily;
		var fontSize = props.fontSize;
	
		return { height: height, width: width, mouseXY: [x, y], xDisplayValue: xDisplayFormat(xDisplayValue), edges: edges,
			stroke: stroke, opacity: opacity, textStroke: textStroke, textBGFill: textBGFill, textBGopacity: textBGopacity, fontFamily: fontFamily, fontSize: fontSize };
	};
	
	// export default MouseCoordinates;
	exports["default"] = (0, _pure2["default"])(MouseCoordinates, {
		width: _react2["default"].PropTypes.number.isRequired,
		height: _react2["default"].PropTypes.number.isRequired,
		mainChart: _react2["default"].PropTypes.number.isRequired,
		show: _react2["default"].PropTypes.bool,
		mouseXY: _react2["default"].PropTypes.array,
		dateAccessor: _react2["default"].PropTypes.func,
		chartData: _react2["default"].PropTypes.array.isRequired,
		currentItems: _react2["default"].PropTypes.array.isRequired,
		currentCharts: _react2["default"].PropTypes.array.isRequired,
		getCanvasContexts: _react2["default"].PropTypes.func,
		margin: _react2["default"].PropTypes.object.isRequired,
		// secretToSuperFastCanvasDraw: React.PropTypes.array.isRequired,
		callbackForCanvasDraw: _react2["default"].PropTypes.func.isRequired,
		getAllCanvasDrawCallback: _react2["default"].PropTypes.func,
		chartCanvasType: _react2["default"].PropTypes.string.isRequired
	});
	module.exports = exports["default"];

/***/ },
/* 78 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _objectAssign = __webpack_require__(4);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _EdgeCoordinate = __webpack_require__(76);
	
	var _EdgeCoordinate2 = _interopRequireDefault(_EdgeCoordinate);
	
	var _utilsUtils = __webpack_require__(7);
	
	var CrossHair = (function (_React$Component) {
		_inherits(CrossHair, _React$Component);
	
		function CrossHair() {
			_classCallCheck(this, CrossHair);
	
			_get(Object.getPrototypeOf(CrossHair.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(CrossHair, [{
			key: "shouldComponentUpdate",
			value: function shouldComponentUpdate(nextProps) {
				return nextProps.mouseXY !== this.props.mouseXY;
			}
		}, {
			key: "render",
			value: function render() {
				var result = CrossHair.helper(this.props);
				var line = result.line;
				var edges = result.edges;
	
				var svgLine = line !== undefined ? _react2["default"].createElement("line", { className: "react-stockcharts-cross-hair", opacity: line.opacity, stroke: line.stroke,
					x1: line.x1, y1: line.y1,
					x2: line.x2, y2: line.y2 }) : null;
	
				return _react2["default"].createElement(
					"g",
					{ className: "crosshair " },
					svgLine,
					edges.map(function (edge, idx) {
						return _react2["default"].createElement(_EdgeCoordinate2["default"], _extends({
							key: idx,
							className: "horizontal"
						}, edge));
					})
				);
			}
		}]);
	
		return CrossHair;
	})(_react2["default"].Component);
	
	CrossHair.propTypes = {
		yAxisPad: _react2["default"].PropTypes.number.isRequired,
		height: _react2["default"].PropTypes.number.isRequired,
		width: _react2["default"].PropTypes.number.isRequired,
		mouseXY: _react2["default"].PropTypes.array.isRequired,
		xDisplayValue: _react2["default"].PropTypes.string.isRequired,
		edges: _react2["default"].PropTypes.array.isRequired
	};
	
	CrossHair.defaultProps = {
		namespace: "ReStock.CrossHair",
		yAxisPad: 5
	};
	
	CrossHair.helper = function (props) {
		var width = props.width;
		var edges = props.edges;
		var yAxisPad = props.yAxisPad;
		var mouseXY = props.mouseXY;
		var xDisplayValue = props.xDisplayValue;
		var height = props.height;
		var stroke = props.stroke;
		var opacity = props.opacity;
		var textStroke = props.textStroke;
		var textBGFill = props.textBGFill;
		var textBGopacity = props.textBGopacity;
		var fontFamily = props.fontFamily;
		var fontSize = props.fontSize;
	
		var x1 = 0,
		    x2 = width;
	
		var edges = edges.map(function (edge) {
			if (edge.at === "left") {
				x1 = -yAxisPad;
			}
			if (edge.at === "right") {
				x2 = width + yAxisPad;
			}
			return {
				type: "horizontal",
				show: true,
				x1: 0,
				y1: mouseXY[1],
				x2: 0,
				y2: mouseXY[1],
				coordinate: edge.yDisplayValue,
				edgeAt: edge.at === "left" ? x1 : x2,
				orient: edge.at,
				hideLine: true,
				lineStroke: stroke,
				lineOpacity: opacity,
				textFill: textStroke,
				fill: textBGFill,
				opacity: textBGopacity,
				fontFamily: fontFamily, fontSize: fontSize
			};
		});
		edges.push({
			type: "vertical",
			show: true,
			x1: mouseXY[0],
			y1: 0,
			x2: mouseXY[0],
			y2: height,
			coordinate: xDisplayValue,
			edgeAt: height,
			orient: "bottom",
			lineStroke: stroke,
			lineOpacity: opacity,
			textFill: textStroke,
			fill: textBGFill,
			opacity: textBGopacity,
			fontFamily: fontFamily, fontSize: fontSize
		});
	
		var line;
		if (edges.length > 1) {
			line = {
				opacity: opacity,
				stroke: stroke,
				x1: x1,
				y1: mouseXY[1],
				x2: x2,
				y2: mouseXY[1]
			};
		}
		return { edges: edges, line: line };
	};
	
	CrossHair.drawOnCanvasStatic = function (ctx, props) {
		// console.log(props);
		props = (0, _objectAssign2["default"])({}, CrossHair.defaultProps, props);
		var result = CrossHair.helper(props);
		var line = result.line;
		var edges = result.edges;
	
		edges.forEach(function (edge) {
			return _EdgeCoordinate2["default"].drawOnCanvasStatic(ctx, edge);
		});
	
		if (line) {
			ctx.strokeStyle = (0, _utilsUtils.hexToRGBA)(line.stroke, line.opacity);
	
			ctx.beginPath();
			ctx.moveTo(line.x1, line.y1);
			ctx.lineTo(line.x2, line.y2);
			ctx.stroke();
		}
	};
	
	exports["default"] = CrossHair;
	module.exports = exports["default"];

/***/ },
/* 79 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _pure = __webpack_require__(53);
	
	var _pure2 = _interopRequireDefault(_pure);
	
	var CurrentCoordinate = (function (_React$Component) {
		_inherits(CurrentCoordinate, _React$Component);
	
		function CurrentCoordinate() {
			_classCallCheck(this, CurrentCoordinate);
	
			_get(Object.getPrototypeOf(CurrentCoordinate.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(CurrentCoordinate, [{
			key: "componentDidMount",
			value: function componentDidMount() {
				var _props = this.props;
				var chartCanvasType = _props.chartCanvasType;
				var getCanvasContexts = _props.getCanvasContexts;
	
				if (chartCanvasType !== "svg" && getCanvasContexts !== undefined) {
					var contexts = getCanvasContexts();
					if (contexts) CurrentCoordinate.drawOnCanvas(contexts.mouseCoord, this.props);
				}
			}
		}, {
			key: "componentDidUpdate",
			value: function componentDidUpdate() {
				this.componentDidMount();
			}
		}, {
			key: "componentWillMount",
			value: function componentWillMount() {
				this.componentWillReceiveProps(this.props);
			}
		}, {
			key: "componentWillReceiveProps",
			value: function componentWillReceiveProps(nextProps) {
				var draw = CurrentCoordinate.drawOnCanvasStatic.bind(null, nextProps);
	
				var forChart = nextProps.forChart;
				var forCompareSeries = nextProps.forCompareSeries;
				var forDataSeries = nextProps.forDataSeries;
	
				var temp = nextProps.getAllCanvasDrawCallback().filter(function (each) {
					return each.type === "currentcoordinate" && each.forChart === forChart && each.forDataSeries === forDataSeries;
				}).filter(function (each) {
					return each.forCompareSeries === forCompareSeries;
				});
	
				if (temp.length === 0) {
					nextProps.callbackForCanvasDraw({
						type: "currentcoordinate",
						forChart: forChart,
						forDataSeries: forDataSeries,
						forCompareSeries: forCompareSeries,
						draw: draw
					});
				} else {
					nextProps.callbackForCanvasDraw(temp[0], {
						type: "currentcoordinate",
						forChart: forChart,
						forDataSeries: forDataSeries,
						forCompareSeries: forCompareSeries,
						draw: draw
					});
				}
			}
		}, {
			key: "render",
			value: function render() {
				var className = this.props.className;
				var _props2 = this.props;
				var chartCanvasType = _props2.chartCanvasType;
				var show = _props2.show;
				var chartData = _props2.chartData;
				var currentItems = _props2.currentItems;
	
				if (chartCanvasType !== "svg") return null;
	
				var circle = CurrentCoordinate.helper(this.props, show, chartData, currentItems);
	
				if (!circle) return null;
	
				return _react2["default"].createElement("circle", { className: className, cx: circle.x, cy: circle.y, r: circle.r, fill: circle.fill });
			}
		}]);
	
		return CurrentCoordinate;
	})(_react2["default"].Component);
	
	CurrentCoordinate.propTypes = {
		forChart: _react2["default"].PropTypes.number.isRequired,
		forDataSeries: _react2["default"].PropTypes.number.isRequired,
		forCompareSeries: _react2["default"].PropTypes.number,
		yAccessor: _react2["default"].PropTypes.func,
		r: _react2["default"].PropTypes.number.isRequired,
		className: _react2["default"].PropTypes.string,
	
		chartCanvasType: _react2["default"].PropTypes.string,
		getCanvasContexts: _react2["default"].PropTypes.func,
		show: _react2["default"].PropTypes.bool,
		chartData: _react2["default"].PropTypes.array,
		currentItems: _react2["default"].PropTypes.array
	};
	
	CurrentCoordinate.defaultProps = {
		r: 3,
		className: "react-stockcharts-current-coordinate"
	};
	
	CurrentCoordinate.drawOnCanvas = function (canvasContext, props) {
		var mouseXY = props.mouseXY;
		var currentCharts = props.currentCharts;
		var chartData = props.chartData;
		var currentItems = props.currentItems;
		var show = props.show;
	
		CurrentCoordinate.drawOnCanvasStatic(props, canvasContext, show, mouseXY, currentCharts, chartData, currentItems);
	};
	
	CurrentCoordinate.drawOnCanvasStatic = function (props, ctx, show, mouseXY, currentCharts, chartData, currentItems) {
		var margin = props.margin;
	
		var circle = CurrentCoordinate.helper(props, show, chartData, currentItems);
	
		if (!circle) return null;
	
		var originX = 0.5 + margin.left;
		var originY = 0.5 + margin.top;
	
		ctx.save();
	
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.translate(originX, originY);
	
		ctx.fillStyle = circle.fill;
		ctx.beginPath();
		ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI, false);
		ctx.fill();
		// CurrentCoordinate.drawOnCanvasStatic(ctx, pointer);
		ctx.restore();
	};
	
	CurrentCoordinate.helper = function (props, show, chartData, currentItems) {
		var forChart = props.forChart;
		var forCompareSeries = props.forCompareSeries;
		var forDataSeries = props.forDataSeries;
		var r = props.r;
	
		var chartData = chartData.filter(function (each) {
			return each.id === forChart;
		})[0];
		var currentItem = currentItems.filter(function (each) {
			return each.id === forChart;
		})[0];
		var item = currentItem ? currentItem.data : undefined;
		var fill = "black";
	
		if (!show || item === undefined) return null;
		var yAccessor;
	
		if (forCompareSeries !== undefined) {
			var compSeries = chartData.config.compareSeries.filter(function (each) {
				return each.id === forCompareSeries;
			});
	
			if (compSeries.length !== 1) {
				console.warn("Unique compareSeries with id={%s} not found", forCompareSeries);
				throw new Error("Unique compareSeries not found");
			}
			fill = compSeries[0].stroke;
			yAccessor = compSeries[0].percentYAccessor;
		} else if (forDataSeries !== undefined) {
			var overlays = chartData.config.overlays.filter(function (each) {
				return each.id === forDataSeries;
			});
	
			if (overlays.length !== 1) {
				console.warn("Unique DataSeries with id={%s} not found", forDataSeries);
				throw new Error("Unique DataSeries not found");
			}
	
			fill = overlays[0].stroke;
	
			yAccessor = overlays[0].yAccessor;
		}
	
		var xValue = chartData.config.xAccessor(item);
		var yValue = yAccessor(item);
	
		if (yValue === undefined) return null;
	
		var x = Math.round(chartData.plot.scales.xScale(xValue)) + chartData.config.origin[0];
		var y = Math.round(chartData.plot.scales.yScale(yValue)) + chartData.config.origin[1];
	
		return { x: x, y: y, r: r, fill: fill };
	};
	
	exports["default"] = (0, _pure2["default"])(CurrentCoordinate, {
		show: _react2["default"].PropTypes.bool.isRequired,
		currentItems: _react2["default"].PropTypes.array.isRequired,
		chartData: _react2["default"].PropTypes.array.isRequired,
	
		getCanvasContexts: _react2["default"].PropTypes.func,
		margin: _react2["default"].PropTypes.object.isRequired,
		callbackForCanvasDraw: _react2["default"].PropTypes.func.isRequired,
		getAllCanvasDrawCallback: _react2["default"].PropTypes.func,
		chartCanvasType: _react2["default"].PropTypes.string.isRequired
	});
	module.exports = exports["default"];

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _MACDIndicator = __webpack_require__(81);
	
	var _MACDIndicator2 = _interopRequireDefault(_MACDIndicator);
	
	var _ATRIndicator = __webpack_require__(82);
	
	var _ATRIndicator2 = _interopRequireDefault(_ATRIndicator);
	
	var _EMAIndicator = __webpack_require__(83);
	
	var _EMAIndicator2 = _interopRequireDefault(_EMAIndicator);
	
	var _SMAIndicator = __webpack_require__(84);
	
	var _SMAIndicator2 = _interopRequireDefault(_SMAIndicator);
	
	var _BollingerBandIndicator = __webpack_require__(85);
	
	var _BollingerBandIndicator2 = _interopRequireDefault(_BollingerBandIndicator);
	
	var _RSIIndicator = __webpack_require__(86);
	
	var _RSIIndicator2 = _interopRequireDefault(_RSIIndicator);
	
	var _FullStochasticOscillator = __webpack_require__(87);
	
	var _FullStochasticOscillator2 = _interopRequireDefault(_FullStochasticOscillator);
	
	var _ForceIndexIndicator = __webpack_require__(88);
	
	var _ForceIndexIndicator2 = _interopRequireDefault(_ForceIndexIndicator);
	
	var _ElderRayIndicator = __webpack_require__(89);
	
	var _ElderRayIndicator2 = _interopRequireDefault(_ElderRayIndicator);
	
	var _ElderImpulseIndicator = __webpack_require__(90);
	
	var _ElderImpulseIndicator2 = _interopRequireDefault(_ElderImpulseIndicator);
	
	var _CopyIndicator = __webpack_require__(91);
	
	var _CopyIndicator2 = _interopRequireDefault(_CopyIndicator);
	
	var _defaultOptions = __webpack_require__(27);
	
	var defaultOptions = _interopRequireWildcard(_defaultOptions);
	
	exports.MACD = _MACDIndicator2["default"];
	exports.ATR = _ATRIndicator2["default"];
	exports.EMA = _EMAIndicator2["default"];
	exports.SMA = _SMAIndicator2["default"];
	exports.BollingerBand = _BollingerBandIndicator2["default"];
	exports.RSI = _RSIIndicator2["default"];
	exports.FullStochasticOscillator = _FullStochasticOscillator2["default"];
	exports.ForceIndex = _ForceIndexIndicator2["default"];
	exports.ElderRay = _ElderRayIndicator2["default"];
	exports.ElderImpulse = _ElderImpulseIndicator2["default"];
	exports.Copy = _CopyIndicator2["default"];
	exports.defaultOptions = defaultOptions;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _d3 = __webpack_require__(8);
	
	var _d32 = _interopRequireDefault(_d3);
	
	var _objectAssign = __webpack_require__(4);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _defaultOptions = __webpack_require__(27);
	
	var _calculator = __webpack_require__(16);
	
	function MACDIndicator(options, chartProps, dataSeriesProps) {
	
		var prefix = "chart_" + chartProps.id;
		var key = "overlay_" + dataSeriesProps.id;
	
		var settings = (0, _objectAssign2["default"])({}, _defaultOptions.MACD, options);
	
		function indicator(data) {
			var fast = settings.fast;
			var slow = settings.slow;
			var signal = settings.signal;
			var source = settings.source;
	
			var getter = function getter(d) {
				return d[source];
			};
	
			var macdAlgorithm = (0, _calculator.macd)().fast(fast).slow(slow).signal(signal).value(getter);
	
			var calculateMACDFor = (0, _calculator.merge)().algorithm(macdAlgorithm).mergePath([prefix, key]);
	
			calculateMACDFor(data);
			return data;
		}
		indicator.options = function () {
			return settings;
		};
		indicator.calculate = function (data) {
			return indicator(data);
		};
		indicator.yAccessor = function () {
			return function (d) {
				if (d && d[prefix] && d[prefix][key]) {
					return { MACDLine: d[prefix][key].MACDLine, signalLine: d[prefix][key].signalLine, histogram: d[prefix][key].histogram };
				}
			};
		};
		indicator.isMACD = function () {
			return true;
		};
		return indicator;
	}
	
	exports["default"] = MACDIndicator;
	module.exports = exports["default"];

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports["default"] = ATRIndicator;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _objectAssign = __webpack_require__(4);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _calculator = __webpack_require__(16);
	
	var _defaultOptions = __webpack_require__(27);
	
	function ATRIndicator(options, chartProps, dataSeriesProps) {
	
		var prefix = "chart_" + chartProps.id;
		var key = "overlay_" + dataSeriesProps.id;
	
		var settings = (0, _objectAssign2["default"])({}, _defaultOptions.ATR, options);
	
		function indicator(data) {
			var atrAlgorithm = (0, _calculator.atr)().windowSize(settings.period);
	
			var atrCalculator = (0, _calculator.merge)().algorithm(atrAlgorithm).mergePath([prefix, key]);
			var newData = atrCalculator(data);
	
			// console.log(newData[20]);
			return newData;
		}
		indicator.options = function () {
			return settings;
		};
		indicator.calculate = function (data) {
			return indicator(data);
		};
		indicator.yAccessor = function () {
			return function (d) {
				if (d && d[prefix]) return d[prefix][key];
			};
		};
		return indicator;
	}
	
	;
	module.exports = exports["default"];

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _objectAssign = __webpack_require__(4);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _lodashGet = __webpack_require__(9);
	
	var _lodashGet2 = _interopRequireDefault(_lodashGet);
	
	var _utilsUtils = __webpack_require__(7);
	
	var _defaultOptions = __webpack_require__(27);
	
	var _calculator = __webpack_require__(16);
	
	function EMAIndicator(options, chartProps, dataSeriesProps) {
	
		var prefix = "chart_" + chartProps.id;
		var key = "overlay_" + dataSeriesProps.id;
	
		if (options.pluck) options.source = options.pluck;
	
		var settings = (0, _objectAssign2["default"])({}, _defaultOptions.EMA, options);
		if (!settings.stroke) settings.stroke = (0, _utilsUtils.overlayColors)(dataSeriesProps.id);
	
		function indicator(data) {
			var period = settings.period;
			var source = settings.source;
	
			var value = typeof source === "function" ? source : function (d) {
				return (0, _lodashGet2["default"])(d, source);
			};
	
			// console.log(data[20], period, getter(data[20], source));
			var emaAlgorithm = (0, _calculator.ema)().windowSize(period).value(value);
	
			var calculateEMAFor = (0, _calculator.merge)().algorithm(emaAlgorithm).mergePath([prefix, key]);
	
			var newData = calculateEMAFor(data);
	
			return newData;
		}
		indicator.options = function () {
			return settings;
		};
		indicator.stroke = function () {
			return settings.stroke;
		};
		indicator.calculate = function (data) {
	
			return indicator(data);
		};
		indicator.yAccessor = function () {
			return function (d) {
				return d && d[prefix] ? d[prefix][key] : undefined;
			};
		};
		indicator.tooltipLabel = function () {
			return "EMA (" + settings.period + ")";
		};
		indicator.isMovingAverage = function () {
			return true;
		};
		return indicator;
	}
	
	exports["default"] = EMAIndicator;
	module.exports = exports["default"];

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _objectAssign = __webpack_require__(4);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _d3 = __webpack_require__(8);
	
	var _d32 = _interopRequireDefault(_d3);
	
	var _lodashGet = __webpack_require__(9);
	
	var _lodashGet2 = _interopRequireDefault(_lodashGet);
	
	var _utilsUtils = __webpack_require__(7);
	
	var _defaultOptions = __webpack_require__(27);
	
	var _calculator = __webpack_require__(16);
	
	function SMAIndicator(options, chartProps, dataSeriesProps) {
	
		var prefix = "chart_" + chartProps.id;
		var key = "overlay_" + dataSeriesProps.id;
	
		if (options.pluck) options.source = options.pluck;
	
		var settings = (0, _objectAssign2["default"])({}, _defaultOptions.SMA, options);
		if (!settings.stroke) settings.stroke = (0, _utilsUtils.overlayColors)(dataSeriesProps.id);
	
		function indicator(data) {
			var period = settings.period;
			var source = settings.source;
	
			var value = typeof source === "function" ? source : function (d) {
				return (0, _lodashGet2["default"])(d, source);
			};
	
			var smaAlgorithm = (0, _calculator.slidingWindow)().windowSize(period).accumulator(_d32["default"].mean).value(value);
	
			var evaluator = (0, _calculator.merge)().algorithm(smaAlgorithm).mergePath([prefix, key]);
	
			return evaluator(data);
		}
	
		indicator.options = function () {
			return settings;
		};
		indicator.stroke = function () {
			return settings.stroke;
		};
		indicator.calculate = function (data) {
	
			return indicator(data);
		};
		indicator.yAccessor = function () {
			return function (d) {
				return d && d[prefix] ? d[prefix][key] : undefined;
			};
		};
		indicator.tooltipLabel = function () {
			return "SMA (" + settings.period + ")";
		};
		indicator.isMovingAverage = function () {
			return true;
		};
		return indicator;
	}
	
	exports["default"] = SMAIndicator;
	module.exports = exports["default"];

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _objectAssign = __webpack_require__(4);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _defaultOptions = __webpack_require__(27);
	
	var _calculator = __webpack_require__(16);
	
	function BollingerBandIndicator(options, chartProps, dataSeriesProps) {
	
		var prefix = "chart_" + chartProps.id;
		var key = "overlay_" + dataSeriesProps.id;
	
		var settings = (0, _objectAssign2["default"])({}, _defaultOptions.BollingerBand, options);
	
		function indicator(data) {
			var period = settings.period;
			var source = settings.source;
			var movingAverageType = settings.movingAverageType;
			var multiplier = settings.multiplier;
	
			var getter = function getter(d) {
				return d[source];
			};
	
			var bollingerBandAlgorithm = (0, _calculator.bollingerband)().windowSize(period).movingAverageType(movingAverageType).multiplier(multiplier).value(getter);
	
			var calculateBBFor = (0, _calculator.merge)().algorithm(bollingerBandAlgorithm).mergePath([prefix, key]);
	
			// console.log(period, data.slice(0, 20));
	
			// console.log(newData[newData.length - 1]);
			return calculateBBFor(data);
		}
		indicator.options = function () {
			return settings;
		};
		indicator.calculate = function (data) {
			return indicator(data);
		};
		indicator.yAccessor = function () {
			return function (d) {
				return d && d[prefix] ? d[prefix][key] : undefined;
			};
		};
		indicator.isBollingerBand = function () {
			return true;
		};
		return indicator;
	}
	
	exports["default"] = BollingerBandIndicator;
	module.exports = exports["default"];

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _objectAssign = __webpack_require__(4);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _defaultOptions = __webpack_require__(27);
	
	var _calculator = __webpack_require__(16);
	
	function RSIIndicator(options, chartProps, dataSeriesProps) {
	
		var prefix = "chart_" + chartProps.id;
		var key = "overlay_" + dataSeriesProps.id;
	
		var settings = (0, _objectAssign2["default"])({}, _defaultOptions.RSI, options);
		function indicator(data) {
			var period = settings.period;
			var source = settings.source;
	
			var getter = function getter(d) {
				return d[source];
			};
			var rsiAlgorithm = (0, _calculator.rsi)().windowSize(period).value(getter);
	
			var calculateRSIFor = (0, _calculator.merge)().algorithm(rsiAlgorithm).mergePath([prefix, key, "rsi"]);
	
			var newData = calculateRSIFor(data);
	
			return newData;
		}
		indicator.options = function () {
			return settings;
		};
		indicator.calculate = function (data) {
			return indicator(data);
		};
		indicator.yAccessor = function () {
			return function (d) {
				// console.log(d[prefix][key]);
				if (d && d[prefix]) return d[prefix][key].rsi;
			};
		};
		indicator.domain = function () {
			return [0, 100];
		};
		indicator.yTicks = function () {
			return [settings.overSold, 50, settings.overBought];
		};
		indicator.isRSI = function () {
			return true;
		};
		return indicator;
	}
	
	exports["default"] = RSIIndicator;
	module.exports = exports["default"];

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _objectAssign = __webpack_require__(4);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _defaultOptions = __webpack_require__(27);
	
	var _calculator = __webpack_require__(16);
	
	function FullStochasticOscillator(options, chartProps, dataSeriesProps) {
	
		var prefix = "chart_" + chartProps.id;
		var key = "overlay_" + dataSeriesProps.id;
	
		var settings = (0, _objectAssign2["default"])({}, _defaultOptions.FullStochasticOscillator, options);
	
		function indicator(data) {
			var K = settings.K;
			var D = settings.D;
			var ohlc = settings.ohlc;
			var period = settings.period;
	
			var stoAlgorithm = (0, _calculator.sto)().windowSize(period).kWindowSize(K).dWindowSize(D).value(ohlc);
	
			var calculateSTOFor = (0, _calculator.merge)().algorithm(stoAlgorithm).mergePath([prefix, key]);
	
			var newData = calculateSTOFor(data);
	
			return newData;
		}
		indicator.options = function () {
			return settings;
		};
		indicator.calculate = function (data) {
			return indicator(data);
		};
		indicator.yAccessor = function () {
			return function (d) {
				if (d && d[prefix] && d[prefix][key]) {
					return { K: d[prefix][key].K, D: d[prefix][key].D };
					// return d[prefix][key].K;
				}
			};
		};
		indicator.domain = function () {
			return [0, 100];
		};
		indicator.yTicks = function () {
			return [settings.overSold, 50, settings.overBought];
		};
		indicator.isStochastic = function () {
			return true;
		};
		return indicator;
	}
	
	exports["default"] = FullStochasticOscillator;
	module.exports = exports["default"];

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _d3 = __webpack_require__(8);
	
	var _d32 = _interopRequireDefault(_d3);
	
	var _objectAssign = __webpack_require__(4);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _defaultOptions = __webpack_require__(27);
	
	var _calculator = __webpack_require__(16);
	
	function ForceIndexIndicator(options, chartProps, dataSeriesProps) {
	
		var prefix = "chart_" + chartProps.id;
		var key = "overlay_" + dataSeriesProps.id;
	
		var settings = (0, _objectAssign2["default"])({}, _defaultOptions.ForceIndex, options);
	
		function indicator(data) {
			var volume = settings.volume;
			var source = settings.source;
	
			var getter = function getter(d) {
				return d[source];
			};
	
			var forceIndexAlgorithm = (0, _calculator.forceIndex)().volume(volume).close(getter);
	
			var calculateForceIndexFor = (0, _calculator.merge)().algorithm(forceIndexAlgorithm).mergePath([prefix, key]);
	
			var newData = calculateForceIndexFor(data);
			return newData;
		}
		indicator.options = function () {
			return settings;
		};
		indicator.calculate = function (data) {
			return indicator(data);
		};
		indicator.yAccessor = function () {
			return function (d) {
				return d && d[prefix] ? d[prefix][key] : undefined;
			};
		};
		return indicator;
	}
	
	exports["default"] = ForceIndexIndicator;
	module.exports = exports["default"];

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _objectAssign = __webpack_require__(4);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _defaultOptions = __webpack_require__(27);
	
	var _calculator = __webpack_require__(16);
	
	function ElderRayIndicator(options, chartProps, dataSeriesProps) {
	
		var prefix = "chart_" + chartProps.id;
		var key = "overlay_" + dataSeriesProps.id;
	
		var settings = (0, _objectAssign2["default"])({}, _defaultOptions.ElderRay, options);
	
		function indicator(data) {
			var period = settings.period;
			var source = settings.source;
			var movingAverageType = settings.movingAverageType;
			var ohlc = settings.ohlc;
	
			var getter = function getter(d) {
				return d[source];
			};
	
			var elderRayAlgorithm = (0, _calculator.elderRay)().windowSize(period).ohlc(ohlc).movingAverageType(movingAverageType).value(getter);
	
			var calculateElderRayFor = (0, _calculator.merge)().algorithm(elderRayAlgorithm).mergePath([prefix, key]);
	
			var newData = calculateElderRayFor(data);
			// console.log(newData[20]);
			return newData;
		}
		indicator.options = function () {
			return settings;
		};
		indicator.calculate = function (data) {
			return indicator(data);
		};
		indicator.yAccessor = function () {
			return function (d) {
				return d && d[prefix] ? d[prefix][key] : undefined;
			};
		};
		return indicator;
	}
	
	exports["default"] = ElderRayIndicator;
	module.exports = exports["default"];

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _d3 = __webpack_require__(8);
	
	var _d32 = _interopRequireDefault(_d3);
	
	var _objectAssign = __webpack_require__(4);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _lodashSet = __webpack_require__(21);
	
	var _lodashSet2 = _interopRequireDefault(_lodashSet);
	
	var _lodashGet = __webpack_require__(9);
	
	var _lodashGet2 = _interopRequireDefault(_lodashGet);
	
	var _calculator = __webpack_require__(16);
	
	var _defaultOptions = __webpack_require__(27);
	
	var _utilsUtils = __webpack_require__(7);
	
	function ElderImpulseIndicator(options, chartProps, dataSeriesProps) {
	
		var prefix = "chart_" + chartProps.id;
		var key = "overlay_" + dataSeriesProps.id;
	
		var settings = (0, _objectAssign2["default"])({}, _defaultOptions.ElderImpulse, options);
	
		function indicator(data) {
			var allSources = settings.source.map(_utilsUtils.sourceFunctor);
			var algorithm = (0, _calculator.slidingWindow)().windowSize(2).undefinedValue(function (d) {
				return (0, _lodashSet2["default"])(d, [prefix, key], "neutral");
			}).accumulator(function (_ref) {
				var _ref2 = _slicedToArray(_ref, 2);
	
				var prev = _ref2[0];
				var curr = _ref2[1];
	
				var prevValue = allSources.map(function (eachSource) {
					return eachSource(prev);
				});
				var currValue = allSources.map(function (eachSource) {
					return eachSource(curr);
				});
	
				var zip = (0, _calculator.zipper)().combine(function (prev, curr) {
					return curr >= prev ? "up" : "down";
				});
	
				return zip(prevValue, currValue).reduce(function (a, b) {
					return a === b ? a : "neutral";
				});
			});
	
			var calculator = (0, _calculator.merge)().algorithm(algorithm).mergePath([prefix, key]);
	
			var newData = calculator(data);
	
			// console.log(newData[20]);
	
			return newData;
		}
		indicator.options = function () {
			return settings;
		};
		indicator.strokeProvider = function () {
			return function (d) {
				return settings.stroke[(0, _lodashGet2["default"])(d, [prefix, key])];
			};
		};
		indicator.calculate = function (data) {
			return indicator(data);
		};
		indicator.yAccessor = function () {
			return function (d) {
				return { open: d.open, high: d.high, low: d.low, close: d.close };
			};
		};
		return indicator;
	}
	
	exports["default"] = ElderImpulseIndicator;
	module.exports = exports["default"];

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _objectAssign = __webpack_require__(4);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _lodashGet = __webpack_require__(9);
	
	var _lodashGet2 = _interopRequireDefault(_lodashGet);
	
	var _utilsUtils = __webpack_require__(7);
	
	var _calculator = __webpack_require__(16);
	
	function CopyIndicator(settings, chartProps, dataSeriesProps) {
	
		var prefix = "chart_" + chartProps.id;
		var key = "overlay_" + dataSeriesProps.id;
	
		function indicator(data) {
			var period = settings.period;
			var source = settings.source;
	
			var value = (0, _utilsUtils.sourceFunctor)(source);
	
			var extract = data.map(value);
	
			var copy = (0, _calculator.merge)().algorithm(d3.functor(extract)).mergePath([prefix, key]);
	
			var newData = copy(data);
	
			return newData;
		}
		indicator.options = function () {
			return settings;
		};
		indicator.calculate = function (data) {
			return indicator(data);
		};
		indicator.yAccessor = function () {
			return function (d) {
				return d && d[prefix] ? d[prefix][key] : undefined;
			};
		};
		return indicator;
	}
	
	exports["default"] = CopyIndicator;
	module.exports = exports["default"];

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _XAxis = __webpack_require__(93);
	
	var _XAxis2 = _interopRequireDefault(_XAxis);
	
	var _YAxis = __webpack_require__(97);
	
	var _YAxis2 = _interopRequireDefault(_YAxis);
	
	exports.XAxis = _XAxis2["default"];
	exports.YAxis = _YAxis2["default"];

/***/ },
/* 93 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Axis = __webpack_require__(94);
	
	var _Axis2 = _interopRequireDefault(_Axis);
	
	var _utilsPureComponent = __webpack_require__(5);
	
	var _utilsPureComponent2 = _interopRequireDefault(_utilsPureComponent);
	
	var XAxis = (function (_PureComponent) {
		_inherits(XAxis, _PureComponent);
	
		function XAxis() {
			_classCallCheck(this, XAxis);
	
			_get(Object.getPrototypeOf(XAxis.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(XAxis, [{
			key: "render",
			value: function render() {
				var _props = this.props;
				var axisAt = _props.axisAt;
				var showTicks = _props.showTicks;
				var tickFormat = _props.tickFormat;
				var ticks = _props.ticks;
	
				var axisLocation;
				if (axisAt === "top") axisLocation = 0;else if (axisAt === "bottom") axisLocation = this.context.height;else if (axisAt === "middle") axisLocation = this.context.height / 2;else axisLocation = axisAt;
	
				if (tickFormat && this.context.xScale.isPolyLinear && this.context.xScale.isPolyLinear()) {
					console.warn("Cannot set tickFormat on a poly linear scale, ignoring tickFormat on XAxis");
					tickFormat = undefined;
				}
	
				if (ticks) ticks = [ticks];
				return _react2["default"].createElement(_Axis2["default"], _extends({}, this.props, {
					transform: [0, axisLocation],
					showTicks: showTicks, tickFormat: tickFormat, ticks: ticks,
					scale: this.context.xScale }));
			}
		}]);
	
		return XAxis;
	})(_utilsPureComponent2["default"]);
	
	XAxis.propTypes = {
		axisAt: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.oneOf(["top", "bottom", "middle"]), _react2["default"].PropTypes.number]).isRequired,
		orient: _react2["default"].PropTypes.oneOf(["top", "bottom"]).isRequired,
		innerTickSize: _react2["default"].PropTypes.number,
		outerTickSize: _react2["default"].PropTypes.number,
		tickFormat: _react2["default"].PropTypes.func,
		tickPadding: _react2["default"].PropTypes.number,
		tickSize: _react2["default"].PropTypes.number,
		ticks: _react2["default"].PropTypes.number,
		tickValues: _react2["default"].PropTypes.array,
		showTicks: _react2["default"].PropTypes.bool,
		className: _react2["default"].PropTypes.string
	};
	XAxis.defaultProps = {
		namespace: "ReStock.XAxis",
		showGrid: false,
		showTicks: true,
		className: "react-stockcharts-x-axis",
		ticks: 10
	};
	
	XAxis.contextTypes = {
		xScale: _react2["default"].PropTypes.func.isRequired,
		yScale: _react2["default"].PropTypes.func.isRequired,
		height: _react2["default"].PropTypes.number.isRequired,
		width: _react2["default"].PropTypes.number.isRequired
	};
	
	exports["default"] = XAxis;
	module.exports = exports["default"];

/***/ },
/* 94 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _AxisTicks = __webpack_require__(95);
	
	var _AxisTicks2 = _interopRequireDefault(_AxisTicks);
	
	var _AxisLine = __webpack_require__(96);
	
	var _AxisLine2 = _interopRequireDefault(_AxisLine);
	
	//TODO REFACTOR
	function d3_scaleExtent(domain) {
		var start = domain[0],
		    stop = domain[domain.length - 1];
		return start < stop ? [start, stop] : [stop, start];
	}
	
	function d3_scaleRange(scale) {
		return scale.rangeExtent ? scale.rangeExtent() : d3_scaleExtent(scale.range());
	}
	
	var Axis = (function (_React$Component) {
		_inherits(Axis, _React$Component);
	
		function Axis(props) {
			_classCallCheck(this, Axis);
	
			_get(Object.getPrototypeOf(Axis.prototype), "constructor", this).call(this, props);
			this.drawOnCanvas = this.drawOnCanvas.bind(this);
		}
	
		_createClass(Axis, [{
			key: "componentWillMount",
			value: function componentWillMount() {
				this.componentWillReceiveProps(this.props, this.context);
			}
		}, {
			key: "componentWillReceiveProps",
			value: function componentWillReceiveProps(nextProps, nextContext) {
				var margin = nextContext.margin;
				var chartId = nextContext.chartId;
				var canvasOriginX = nextContext.canvasOriginX;
				var canvasOriginY = nextContext.canvasOriginY;
	
				var draw = Axis.drawOnCanvasStatic.bind(null, margin, nextProps, [canvasOriginX, canvasOriginY]);
	
				nextContext.callbackForCanvasDraw({
					chartId: chartId,
					type: "axis",
					draw: draw
				});
			}
		}, {
			key: "componentDidMount",
			value: function componentDidMount() {
				if (this.context.chartCanvasType !== "svg" && this.context.getCanvasContexts !== undefined) {
					var contexts = this.context.getCanvasContexts();
					if (contexts) this.drawOnCanvas(contexts.axes);
				}
			}
		}, {
			key: "componentDidUpdate",
			value: function componentDidUpdate() {
				this.componentDidMount();
			}
		}, {
			key: "drawOnCanvas",
			value: function drawOnCanvas(ctx) {
				var _context = this.context;
				var chartData = _context.chartData;
				var margin = _context.margin;
				var canvasOriginX = _context.canvasOriginX;
				var canvasOriginY = _context.canvasOriginY;
				var scale = this.props.scale;
	
				Axis.drawOnCanvasStatic(margin, this.props, [canvasOriginX, canvasOriginY], ctx, chartData, scale, scale);
			}
		}, {
			key: "render",
			value: function render() {
				if (this.context.chartCanvasType !== "svg") return null;
	
				var domain = this.props.showDomain ? _react2["default"].createElement(_AxisLine2["default"], this.props) : null;
				var ticks = this.props.showTicks ? _react2["default"].createElement(_AxisTicks2["default"], this.props) : null;
				var className = "";
				if (this.props.className) className = this.props.defaultClassName.concat(this.props.className);
				return _react2["default"].createElement(
					"g",
					{ className: className,
						transform: "translate(" + this.props.transform[0] + ", " + this.props.transform[1] + ")" },
					ticks,
					domain
				);
			}
		}]);
	
		return Axis;
	})(_react2["default"].Component);
	
	Axis.propTypes = {
		className: _react2["default"].PropTypes.string.isRequired,
		defaultClassName: _react2["default"].PropTypes.string.isRequired,
		transform: _react2["default"].PropTypes.arrayOf(Number).isRequired,
		orient: _react2["default"].PropTypes.oneOf(["top", "bottom", "left", "right"]).isRequired,
		innerTickSize: _react2["default"].PropTypes.number,
		outerTickSize: _react2["default"].PropTypes.number,
		tickFormat: _react2["default"].PropTypes.func,
		tickPadding: _react2["default"].PropTypes.number,
		tickSize: _react2["default"].PropTypes.number,
		ticks: _react2["default"].PropTypes.array,
		tickValues: _react2["default"].PropTypes.array,
		scale: _react2["default"].PropTypes.func.isRequired,
		showDomain: _react2["default"].PropTypes.bool.isRequired,
		showTicks: _react2["default"].PropTypes.bool.isRequired,
		fontFamily: _react2["default"].PropTypes.string,
		fontSize: _react2["default"].PropTypes.number.isRequired,
		axisName: _react2["default"].PropTypes.string,
		axisNameOffset: _react2["default"].PropTypes.number,
		axisNameFontFamily: _react2["default"].PropTypes.string,
		axisNameFontSize: _react2["default"].PropTypes.number,
		axisNameMaxSize: _react2["default"].PropTypes.number
	};
	
	Axis.defaultProps = {
		defaultClassName: "react-stockcharts-axis ",
		showDomain: true,
		showTicks: true,
		fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
		fontSize: 12,
		axisNameFontSize: 10,
		axisNameOffset: 20,
		axisNameFontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
		axisNameMaxSize: 1000
	};
	
	Axis.contextTypes = {
		getCanvasContexts: _react2["default"].PropTypes.func,
		chartCanvasType: _react2["default"].PropTypes.string,
		chartData: _react2["default"].PropTypes.object.isRequired,
		chartId: _react2["default"].PropTypes.number.isRequired,
		margin: _react2["default"].PropTypes.object.isRequired,
		canvasOriginX: _react2["default"].PropTypes.number,
		canvasOriginY: _react2["default"].PropTypes.number,
		// secretToSuperFastCanvasDraw: React.PropTypes.array.isRequired,
		callbackForCanvasDraw: _react2["default"].PropTypes.func.isRequired
	};
	
	Axis.drawOnCanvasStatic = function (margin, props, canvasOrigin, ctx, chartData, xScale, yScale) {
		var transform = props.transform;
		var showDomain = props.showDomain;
		var showTicks = props.showTicks;
		var axisName = props.axisName;
		var fontFamily = props.fontFamily;
		var orient = props.orient;
		var axisNameFontSize = props.axisNameFontSize;
		var axisNameOffset = props.axisNameOffset;
		var axisNameFontFamily = props.axisNameFontFamily;
		var axisNameMaxSize = props.axisNameMaxSize;
	
		var xOffsetMult = orient === "top" || orient === "bottom" ? 1 : 0;
		var yOffsetMult = orient === "right" || orient === "left" ? -1 : 0;
		ctx.save();
	
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.translate(canvasOrigin[0] + transform[0], canvasOrigin[1] + transform[1]);
	
		var xAxis = orient === "bottom" || orient === "top";
	
		var range = d3_scaleRange(xAxis ? xScale : yScale);
		var rangeOffset = xAxis ? range[1] : 0;
	
		ctx.textAlign = "center";
		ctx.font = axisNameFontSize + "px " + axisNameFontFamily;
		ctx.fillText(axisName, rangeOffset + xOffsetMult * axisNameOffset, yOffsetMult * axisNameOffset, axisNameMaxSize);
		if (showDomain) _AxisLine2["default"].drawOnCanvasStatic(props, ctx, chartData, xScale, yScale);
		if (showTicks) _AxisTicks2["default"].drawOnCanvasStatic(props, ctx, chartData, xScale, yScale);
		ctx.restore();
	};
	
	exports["default"] = Axis;
	module.exports = exports["default"];

/***/ },
/* 95 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _objectAssign = __webpack_require__(4);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _utilsUtils = __webpack_require__(7);
	
	function d3_identity(d) {
		return d;
	}
	
	function tickTransform_svg_axisX(scale, tick) {
		return [~ ~(0.5 + scale(tick)), 0];
	}
	
	function tickTransform_svg_axisY(scale, tick) {
		return [0, ~ ~(0.5 + scale(tick))];
	}
	
	var Tick = (function (_React$Component) {
		_inherits(Tick, _React$Component);
	
		function Tick() {
			_classCallCheck(this, Tick);
	
			_get(Object.getPrototypeOf(Tick.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(Tick, [{
			key: "render",
			value: function render() {
				var _props = this.props;
				var transform = _props.transform;
				var tickStroke = _props.tickStroke;
				var tickStrokeOpacity = _props.tickStrokeOpacity;
				var textAnchor = _props.textAnchor;
				var fontSize = _props.fontSize;
				var fontFamily = _props.fontFamily;
				var _props2 = this.props;
				var x = _props2.x;
				var y = _props2.y;
				var x2 = _props2.x2;
				var y2 = _props2.y2;
				var dy = _props2.dy;
	
				return _react2["default"].createElement(
					"g",
					{ className: "tick", transform: "translate(" + transform[0] + ", " + transform[1] + ")" },
					_react2["default"].createElement("line", { shapeRendering: "crispEdges", opacity: tickStrokeOpacity, stroke: tickStroke, x2: x2, y2: y2 }),
					_react2["default"].createElement(
						"text",
						{
							dy: dy, x: x, y: y,
							fill: tickStroke,
							fontSize: fontSize,
							fontFamily: fontFamily,
							textAnchor: textAnchor },
						this.props.children
					)
				);
			}
		}]);
	
		return Tick;
	})(_react2["default"].Component);
	
	Tick.propTypes = {
		transform: _react2["default"].PropTypes.arrayOf(Number),
		tickStroke: _react2["default"].PropTypes.string,
		tickStrokeOpacity: _react2["default"].PropTypes.number,
		textAnchor: _react2["default"].PropTypes.string,
		fontSize: _react2["default"].PropTypes.number,
		fontFamily: _react2["default"].PropTypes.string,
		x: _react2["default"].PropTypes.number,
		y: _react2["default"].PropTypes.number,
		x2: _react2["default"].PropTypes.number,
		y2: _react2["default"].PropTypes.number,
		dy: _react2["default"].PropTypes.string,
		children: _react2["default"].PropTypes.node.isRequired
	};
	
	Tick.drawOnCanvasStatic = function (tick, ctx, chartData, result) {
		var scale = result.scale;
		var tickTransform = result.tickTransform;
		var canvas_dy = result.canvas_dy;
		var x = result.x;
		var y = result.y;
		var x2 = result.x2;
		var y2 = result.y2;
		var format = result.format;
	
		var origin = tickTransform(scale, tick);
	
		ctx.beginPath();
	
		ctx.moveTo(origin[0], origin[1]);
		ctx.lineTo(origin[0] + x2, origin[1] + y2);
		ctx.stroke();
	
		ctx.fillText(format(tick), origin[0] + x, origin[1] + y + canvas_dy);
	};
	
	var AxisTicks = (function (_React$Component2) {
		_inherits(AxisTicks, _React$Component2);
	
		function AxisTicks() {
			_classCallCheck(this, AxisTicks);
	
			_get(Object.getPrototypeOf(AxisTicks.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(AxisTicks, [{
			key: "render",
			value: function render() {
				var result = AxisTicks.helper(this.props, this.props.scale);
				var ticks = result.ticks;
				var scale = result.scale;
				var tickTransform = result.tickTransform;
				var tickStroke = result.tickStroke;
				var tickStrokeOpacity = result.tickStrokeOpacity;
				var dy = result.dy;
				var x = result.x;
				var y = result.y;
				var x2 = result.x2;
				var y2 = result.y2;
				var textAnchor = result.textAnchor;
				var fontSize = result.fontSize;
				var fontFamily = result.fontFamily;
				var format = result.format;
	
				return _react2["default"].createElement(
					"g",
					null,
					ticks.map(function (tick, idx) {
						return _react2["default"].createElement(
							Tick,
							{ key: idx, transform: tickTransform(scale, tick),
								tickStroke: tickStroke, tickStrokeOpacity: tickStrokeOpacity,
								dy: dy, x: x, y: y,
								x2: x2, y2: y2, textAnchor: textAnchor,
								fontSize: fontSize, fontFamily: fontFamily },
							format(tick)
						);
					})
				);
			}
		}]);
	
		return AxisTicks;
	})(_react2["default"].Component);
	
	AxisTicks.propTypes = {
		orient: _react2["default"].PropTypes.oneOf(["top", "bottom", "left", "right"]).isRequired,
		innerTickSize: _react2["default"].PropTypes.number,
		tickFormat: _react2["default"].PropTypes.func,
		tickPadding: _react2["default"].PropTypes.number,
		ticks: _react2["default"].PropTypes.array,
		tickValues: _react2["default"].PropTypes.array,
		scale: _react2["default"].PropTypes.func.isRequired,
		tickStroke: _react2["default"].PropTypes.string,
		tickStrokeOpacity: _react2["default"].PropTypes.number
	};
	
	AxisTicks.defaultProps = {
		innerTickSize: 5,
		tickPadding: 6,
		ticks: [10],
		tickStroke: "#000",
		tickStrokeOpacity: 1
	};
	
	AxisTicks.helper = function (props, scale) {
		var orient = props.orient;
		var innerTickSize = props.innerTickSize;
		var tickFormat = props.tickFormat;
		var tickPadding = props.tickPadding;
		var fontSize = props.fontSize;
		var fontFamily = props.fontFamily;
		var tickArguments = props.ticks;
		var tickValues = props.tickValues;
		var tickStroke = props.tickStroke;
		var tickStrokeOpacity = props.tickStrokeOpacity;
	
		var ticks = tickValues === undefined ? scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain() : tickValues;
	
		var format = tickFormat === undefined ? scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : d3_identity : tickFormat;
	
		var sign = orient === "top" || orient === "left" ? -1 : 1;
		var tickSpacing = Math.max(innerTickSize, 0) + tickPadding;
	
		var tickTransform, x, y, x2, y2, dy, canvas_dy, textAnchor;
	
		if (orient === "bottom" || orient === "top") {
			tickTransform = tickTransform_svg_axisX;
			x2 = 0;
			y2 = sign * innerTickSize;
			x = 0;
			y = sign * tickSpacing;
			dy = sign < 0 ? "0em" : ".71em";
			canvas_dy = sign < 0 ? 0 : fontSize * .71;
			textAnchor = "middle";
		} else {
			tickTransform = tickTransform_svg_axisY;
			x2 = sign * innerTickSize;
			y2 = 0;
			x = sign * tickSpacing;
			y = 0;
			dy = ".32em";
			canvas_dy = fontSize * .32;
			textAnchor = sign < 0 ? "end" : "start";
		}
		return { ticks: ticks, scale: scale, tickTransform: tickTransform, tickStroke: tickStroke, tickStrokeOpacity: tickStrokeOpacity, dy: dy, canvas_dy: canvas_dy, x: x, y: y, x2: x2, y2: y2, textAnchor: textAnchor, fontSize: fontSize, fontFamily: fontFamily, format: format };
	};
	
	AxisTicks.drawOnCanvasStatic = function (props, ctx, chartData, xScale, yScale) {
		props = (0, _objectAssign2["default"])({}, AxisTicks.defaultProps, props);
	
		var _props3 = props;
		var orient = _props3.orient;
	
		var xAxis = orient === "bottom" || orient === "top";
	
		var result = AxisTicks.helper(props, xAxis ? xScale : yScale);
	
		var tickStroke = result.tickStroke;
		var tickStrokeOpacity = result.tickStrokeOpacity;
		var textAnchor = result.textAnchor;
		var fontSize = result.fontSize;
		var fontFamily = result.fontFamily;
	
		ctx.strokeStyle = (0, _utilsUtils.hexToRGBA)(tickStroke, tickStrokeOpacity);
	
		ctx.font = fontSize + "px " + fontFamily;
		ctx.fillStyle = tickStroke;
		ctx.textAlign = textAnchor === "middle" ? "center" : textAnchor;
		// ctx.textBaseline = 'middle';
	
		result.ticks.forEach(function (tick) {
			Tick.drawOnCanvasStatic(tick, ctx, chartData, result);
		});
	};
	
	exports["default"] = AxisTicks;
	module.exports = exports["default"];

/***/ },
/* 96 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _objectAssign = __webpack_require__(4);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _utilsUtils = __webpack_require__(7);
	
	function d3_scaleExtent(domain) {
		var start = domain[0],
		    stop = domain[domain.length - 1];
		return start < stop ? [start, stop] : [stop, start];
	}
	
	function d3_scaleRange(scale) {
		return scale.rangeExtent ? scale.rangeExtent() : d3_scaleExtent(scale.range());
	}
	
	var AxisLine = (function (_React$Component) {
		_inherits(AxisLine, _React$Component);
	
		function AxisLine() {
			_classCallCheck(this, AxisLine);
	
			_get(Object.getPrototypeOf(AxisLine.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(AxisLine, [{
			key: "render",
			value: function render() {
				var _props = this.props;
				var orient = _props.orient;
				var scale = _props.scale;
				var outerTickSize = _props.outerTickSize;
				var fill = _props.fill;
				var stroke = _props.stroke;
				var strokeWidth = _props.strokeWidth;
				var className = _props.className;
				var shapeRendering = _props.shapeRendering;
				var opacity = _props.opacity;
	
				var sign = orient === "top" || orient === "left" ? -1 : 1;
	
				var range = d3_scaleRange(scale);
	
				var d;
	
				if (orient === "bottom" || orient === "top") {
					d = "M" + range[0] + "," + sign * outerTickSize + "V0H" + range[1] + "V" + sign * outerTickSize;
				} else {
					d = "M" + sign * outerTickSize + "," + range[0] + "H0V" + range[1] + "H" + sign * outerTickSize;
				}
	
				return _react2["default"].createElement("path", {
					className: className,
					shapeRendering: shapeRendering,
					d: d,
					fill: fill,
					opacity: opacity,
					stroke: stroke,
					strokeWidth: strokeWidth });
			}
		}]);
	
		return AxisLine;
	})(_react2["default"].Component);
	
	AxisLine.propTypes = {
		className: _react2["default"].PropTypes.string,
		shapeRendering: _react2["default"].PropTypes.string,
		orient: _react2["default"].PropTypes.string.isRequired,
		scale: _react2["default"].PropTypes.func.isRequired,
		outerTickSize: _react2["default"].PropTypes.number,
		fill: _react2["default"].PropTypes.string,
		stroke: _react2["default"].PropTypes.string,
		strokeWidth: _react2["default"].PropTypes.number,
		opacity: _react2["default"].PropTypes.number
	};
	
	AxisLine.defaultProps = {
		className: "react-stockcharts-axis-line",
		shapeRendering: "crispEdges",
		outerTickSize: 6,
		fill: "none",
		stroke: "#000000",
		strokeWidth: 1,
		opacity: 1
	};
	
	AxisLine.drawOnCanvasStatic = function (props, ctx, chartData, xScale, yScale) {
		props = (0, _objectAssign2["default"])({}, AxisLine.defaultProps, props);
	
		var _props2 = props;
		var orient = _props2.orient;
		var outerTickSize = _props2.outerTickSize;
		var stroke = _props2.stroke;
		var strokeWidth = _props2.strokeWidth;
		var opacity = _props2.opacity;
	
		var sign = orient === "top" || orient === "left" ? -1 : 1;
		var xAxis = orient === "bottom" || orient === "top";
	
		var range = d3_scaleRange(xAxis ? xScale : yScale);
	
		ctx.lineWidth = strokeWidth;
		ctx.strokeStyle = (0, _utilsUtils.hexToRGBA)(stroke, opacity);
	
		ctx.beginPath();
	
		if (xAxis) {
			ctx.moveTo(range[0], sign * outerTickSize);
			ctx.lineTo(range[0], 0);
			ctx.lineTo(range[1], 0);
			ctx.lineTo(range[1], sign * outerTickSize);
		} else {
			ctx.moveTo(sign * outerTickSize, range[0]);
			ctx.lineTo(0, range[0]);
			ctx.lineTo(0, range[1]);
			ctx.lineTo(sign * outerTickSize, range[1]);
		}
		ctx.stroke();
	
		// ctx.strokeStyle = strokeStyle;
	};
	
	exports["default"] = AxisLine;
	module.exports = exports["default"];

/***/ },
/* 97 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _d3 = __webpack_require__(8);
	
	var _d32 = _interopRequireDefault(_d3);
	
	var _Axis = __webpack_require__(94);
	
	var _Axis2 = _interopRequireDefault(_Axis);
	
	var _utilsPureComponent = __webpack_require__(5);
	
	var _utilsPureComponent2 = _interopRequireDefault(_utilsPureComponent);
	
	var YAxis = (function (_PureComponent) {
		_inherits(YAxis, _PureComponent);
	
		function YAxis() {
			_classCallCheck(this, YAxis);
	
			_get(Object.getPrototypeOf(YAxis.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(YAxis, [{
			key: "render",
			value: function render() {
				var _props = this.props;
				var axisAt = _props.axisAt;
				var tickFormat = _props.tickFormat;
				var ticks = _props.ticks;
				var percentScale = _props.percentScale;
				var tickValues = _props.tickValues;
				var _context = this.context;
				var yScale = _context.yScale;
				var chartData = _context.chartData;
	
				if (percentScale) yScale = yScale.copy().domain([0, 1]);
	
				tickValues = tickValues || chartData.config.yTicks;
	
				var axisLocation;
	
				if (axisAt === "left") axisLocation = 0;else if (axisAt === "right") axisLocation = this.context.width;else if (axisAt === "middle") axisLocation = this.context.width / 2;else axisLocation = axisAt;
	
				if (this.context.compareSeries.length > 0) {
					tickFormat = _d32["default"].format(".0%");
				}
	
				return _react2["default"].createElement(_Axis2["default"], _extends({}, this.props, {
					transform: [axisLocation, 0],
					tickFormat: tickFormat, ticks: [ticks], tickValues: tickValues,
					scale: yScale }));
			}
		}]);
	
		return YAxis;
	})(_utilsPureComponent2["default"]);
	
	YAxis.propTypes = {
		axisAt: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.oneOf(["left", "right", "middle"]), _react2["default"].PropTypes.number]).isRequired,
		orient: _react2["default"].PropTypes.oneOf(["left", "right"]).isRequired,
		innerTickSize: _react2["default"].PropTypes.number,
		outerTickSize: _react2["default"].PropTypes.number,
		tickFormat: _react2["default"].PropTypes.func,
		tickPadding: _react2["default"].PropTypes.number,
		tickSize: _react2["default"].PropTypes.number,
		ticks: _react2["default"].PropTypes.number,
		tickValues: _react2["default"].PropTypes.array,
		percentScale: _react2["default"].PropTypes.bool,
		showTicks: _react2["default"].PropTypes.bool,
		showDomain: _react2["default"].PropTypes.bool,
		className: _react2["default"].PropTypes.string
	};
	YAxis.defaultProps = {
		namespace: "ReStock.YAxis",
		showGrid: false,
		showDomain: false,
		className: "react-stockcharts-y-axis",
		ticks: 10
	};
	YAxis.contextTypes = {
		chartData: _react2["default"].PropTypes.object.isRequired,
		xScale: _react2["default"].PropTypes.func.isRequired,
		yScale: _react2["default"].PropTypes.func.isRequired,
		width: _react2["default"].PropTypes.number.isRequired,
		compareSeries: _react2["default"].PropTypes.array.isRequired
	};
	
	exports["default"] = YAxis;
	module.exports = exports["default"];

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _MACDTooltip = __webpack_require__(99);
	
	var _MACDTooltip2 = _interopRequireDefault(_MACDTooltip);
	
	var _TooltipContainer = __webpack_require__(102);
	
	var _TooltipContainer2 = _interopRequireDefault(_TooltipContainer);
	
	var _OHLCTooltip = __webpack_require__(103);
	
	var _OHLCTooltip2 = _interopRequireDefault(_OHLCTooltip);
	
	var _SingleValueTooltip = __webpack_require__(104);
	
	var _SingleValueTooltip2 = _interopRequireDefault(_SingleValueTooltip);
	
	var _CompareTooltip = __webpack_require__(105);
	
	var _CompareTooltip2 = _interopRequireDefault(_CompareTooltip);
	
	var _MovingAverageTooltip = __webpack_require__(106);
	
	var _MovingAverageTooltip2 = _interopRequireDefault(_MovingAverageTooltip);
	
	var _BollingerBandTooltip = __webpack_require__(107);
	
	var _BollingerBandTooltip2 = _interopRequireDefault(_BollingerBandTooltip);
	
	var _RSITooltip = __webpack_require__(108);
	
	var _RSITooltip2 = _interopRequireDefault(_RSITooltip);
	
	var _StochasticTooltip = __webpack_require__(109);
	
	var _StochasticTooltip2 = _interopRequireDefault(_StochasticTooltip);
	
	exports.MACDTooltip = _MACDTooltip2["default"];
	exports.TooltipContainer = _TooltipContainer2["default"];
	exports.OHLCTooltip = _OHLCTooltip2["default"];
	exports.SingleValueTooltip = _SingleValueTooltip2["default"];
	exports.CompareTooltip = _CompareTooltip2["default"];
	exports.MovingAverageTooltip = _MovingAverageTooltip2["default"];
	exports.BollingerBandTooltip = _BollingerBandTooltip2["default"];
	exports.RSITooltip = _RSITooltip2["default"];
	exports.StochasticTooltip = _StochasticTooltip2["default"];

/***/ },
/* 99 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _ToolTipText = __webpack_require__(100);
	
	var _ToolTipText2 = _interopRequireDefault(_ToolTipText);
	
	var _ToolTipTSpanLabel = __webpack_require__(101);
	
	var _ToolTipTSpanLabel2 = _interopRequireDefault(_ToolTipTSpanLabel);
	
	var _utilsUtils = __webpack_require__(7);
	
	var _utilsChartDataUtil = __webpack_require__(13);
	
	var MACDTooltip = (function (_React$Component) {
		_inherits(MACDTooltip, _React$Component);
	
		function MACDTooltip() {
			_classCallCheck(this, MACDTooltip);
	
			_get(Object.getPrototypeOf(MACDTooltip.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(MACDTooltip, [{
			key: "render",
			value: function render() {
				var _props = this.props;
				var onClick = _props.onClick;
				var forChart = _props.forChart;
				var forDataSeries = _props.forDataSeries;
	
				var chartData = (0, _utilsChartDataUtil.getChartDataForChart)(this.props, this.context);
				var overlays = chartData.config.overlays.filter(function (eachOverlay) {
					return forDataSeries === undefined ? true : forDataSeries === eachOverlay.id;
				}).filter(function (eachOverlay) {
					return eachOverlay.indicator !== undefined;
				}).filter(function (eachOverlay) {
					return eachOverlay.indicator.isMACD && eachOverlay.indicator.isMACD();
				});
	
				if (overlays.length > 1 || overlays.length === 0) {
					console.error("Could not find Exactly one DataSeries with MACD indicator for Chart id=" + forChart + ", either use\n\t\t\t\tsingle MACD indicator per chart\n\t\t\t\tor use forDataSeries property to narrow down to single Series");
				}
				var overlay = overlays[0];
				var options = overlay.indicator.options();
	
				var item = (0, _utilsChartDataUtil.getCurrentItemForChart)(this.props, this.context);
				var macd = overlay.yAccessor(item);
				var format = chartData.config.mouseCoordinates.format;
	
				var MACDLine = macd && macd.MACDLine && format(macd.MACDLine) || "n/a";
				var signalLine = macd && macd.signalLine && format(macd.signalLine) || "n/a";
				var histogram = macd && macd.histogram && format(macd.histogram) || "n/a";
	
				var origin = chartData.config.origin;
	
				var relativeOrigin = typeof this.props.origin === "function" ? this.props.origin(this.context.width, this.context.height) : this.props.origin;
				var absoluteOrigin = [origin[0] + relativeOrigin[0], origin[1] + relativeOrigin[1]];
	
				return _react2["default"].createElement(
					"g",
					{ transform: "translate(" + absoluteOrigin[0] + ", " + absoluteOrigin[1] + ")",
						onClick: onClick },
					_react2["default"].createElement(
						_ToolTipText2["default"],
						{ x: 0, y: 0,
							fontFamily: this.props.fontFamily, fontSize: this.props.fontSize },
						_react2["default"].createElement(
							_ToolTipTSpanLabel2["default"],
							null,
							"MACD ("
						),
						_react2["default"].createElement(
							"tspan",
							{ fill: options.stroke.MACDLine },
							options.slow
						),
						_react2["default"].createElement(
							_ToolTipTSpanLabel2["default"],
							null,
							", "
						),
						_react2["default"].createElement(
							"tspan",
							{ fill: options.stroke.MACDLine },
							options.fast
						),
						_react2["default"].createElement(
							_ToolTipTSpanLabel2["default"],
							null,
							"): "
						),
						_react2["default"].createElement(
							"tspan",
							{ fill: options.stroke.MACDLine },
							MACDLine
						),
						_react2["default"].createElement(
							_ToolTipTSpanLabel2["default"],
							null,
							" Signal ("
						),
						_react2["default"].createElement(
							"tspan",
							{ fill: options.stroke.signalLine },
							options.signal
						),
						_react2["default"].createElement(
							_ToolTipTSpanLabel2["default"],
							null,
							"): "
						),
						_react2["default"].createElement(
							"tspan",
							{ fill: options.stroke.signalLine },
							signalLine
						),
						_react2["default"].createElement(
							_ToolTipTSpanLabel2["default"],
							null,
							" Histogram: "
						),
						_react2["default"].createElement(
							"tspan",
							{ fill: options.fill.histogram },
							histogram
						)
					)
				);
			}
		}]);
	
		return MACDTooltip;
	})(_react2["default"].Component);
	
	MACDTooltip.contextTypes = {
		chartData: _react2["default"].PropTypes.array.isRequired,
		currentItems: _react2["default"].PropTypes.array.isRequired,
		width: _react2["default"].PropTypes.number.isRequired,
		height: _react2["default"].PropTypes.number.isRequired
	};
	
	MACDTooltip.propTypes = {
		forChart: _react2["default"].PropTypes.number.isRequired,
		xDisplayFormat: _react2["default"].PropTypes.func.isRequired,
		origin: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.array, _react2["default"].PropTypes.func]).isRequired,
		fontFamily: _react2["default"].PropTypes.string,
		fontSize: _react2["default"].PropTypes.number,
		forDataSeries: _react2["default"].PropTypes.number,
		onClick: _react2["default"].PropTypes.func
	};
	
	MACDTooltip.defaultProps = {
		namespace: "ReStock.MACDTooltip",
		xDisplayFormat: _utilsUtils.displayDateFormat,
		origin: [0, 0]
	};
	
	exports["default"] = MACDTooltip;
	
	// export default MACDTooltip;
	module.exports = exports["default"];

/***/ },
/* 100 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var ToolTipText = (function (_React$Component) {
		_inherits(ToolTipText, _React$Component);
	
		function ToolTipText() {
			_classCallCheck(this, ToolTipText);
	
			_get(Object.getPrototypeOf(ToolTipText.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(ToolTipText, [{
			key: "render",
			value: function render() {
				return _react2["default"].createElement(
					"text",
					_extends({
						fontFamily: this.props.fontFamily,
						fontSize: this.props.fontSize
					}, this.props, {
						className: "react-stockcharts-tooltip" }),
					this.props.children
				);
			}
		}]);
	
		return ToolTipText;
	})(_react2["default"].Component);
	
	ToolTipText.propTypes = {
		fontFamily: _react2["default"].PropTypes.string.isRequired,
		fontSize: _react2["default"].PropTypes.number.isRequired,
		children: _react2["default"].PropTypes.node.isRequired
	};
	
	ToolTipText.defaultProps = {
		fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
		fontSize: 11
	};
	
	exports["default"] = ToolTipText;
	module.exports = exports["default"];

/***/ },
/* 101 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var ToolTipTSpanLabel = (function (_React$Component) {
		_inherits(ToolTipTSpanLabel, _React$Component);
	
		function ToolTipTSpanLabel() {
			_classCallCheck(this, ToolTipTSpanLabel);
	
			_get(Object.getPrototypeOf(ToolTipTSpanLabel.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(ToolTipTSpanLabel, [{
			key: "render",
			value: function render() {
				return _react2["default"].createElement(
					"tspan",
					_extends({ className: "react-stockcharts-tooltip-label", fill: "#4682B4" }, this.props),
					this.props.children
				);
			}
		}]);
	
		return ToolTipTSpanLabel;
	})(_react2["default"].Component);
	
	ToolTipTSpanLabel.propTypes = {
		children: _react2["default"].PropTypes.node.isRequired
	};
	
	exports["default"] = ToolTipTSpanLabel;
	module.exports = exports["default"];

/***/ },
/* 102 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsUtils = __webpack_require__(7);
	
	var _utilsPureComponent = __webpack_require__(5);
	
	var _utilsPureComponent2 = _interopRequireDefault(_utilsPureComponent);
	
	var _objectAssign = __webpack_require__(4);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var TooltipContainer = (function (_PureComponent) {
		_inherits(TooltipContainer, _PureComponent);
	
		function TooltipContainer() {
			_classCallCheck(this, TooltipContainer);
	
			_get(Object.getPrototypeOf(TooltipContainer.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(TooltipContainer, [{
			key: "render",
			value: function render() {
				var _this = this;
	
				var children = _react2["default"].Children.map(this.props.children, function (child) {
					var newChild = (0, _utilsUtils.isReactVersion13)() ? _react2["default"].withContext(_this.context, function () {
						return _react2["default"].createElement(child.type, (0, _objectAssign2["default"])({ key: child.key, ref: child.ref }, child.props));
					}) : child;
					// React.createElement(child.type, objectAssign({ key: child.key, ref: child.ref}, child.props));
					return newChild;
				});
				return _react2["default"].createElement(
					"g",
					{ className: "react-stockcharts-toottip-hover" },
					children
				);
			}
		}]);
	
		return TooltipContainer;
	})(_utilsPureComponent2["default"]);
	
	TooltipContainer.contextTypes = {
		chartData: _react2["default"].PropTypes.array.isRequired,
		currentItems: _react2["default"].PropTypes.array.isRequired
	};
	
	TooltipContainer.defaultProps = { namespace: "ReStock.TooltipContainer" };
	
	exports["default"] = TooltipContainer;
	module.exports = exports["default"];

/***/ },
/* 103 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _d3 = __webpack_require__(8);
	
	var _d32 = _interopRequireDefault(_d3);
	
	var _utilsUtils = __webpack_require__(7);
	
	var _utilsChartDataUtil = __webpack_require__(13);
	
	var _ToolTipText = __webpack_require__(100);
	
	var _ToolTipText2 = _interopRequireDefault(_ToolTipText);
	
	var _ToolTipTSpanLabel = __webpack_require__(101);
	
	var _ToolTipTSpanLabel2 = _interopRequireDefault(_ToolTipTSpanLabel);
	
	/*
	var billion = 1 * 1000 * 1000 * 1000;
	var million = 1 * 1000 * 1000;
	var thousand = 1 * 1000;
	*/
	
	var OHLCTooltip = (function (_React$Component) {
		_inherits(OHLCTooltip, _React$Component);
	
		function OHLCTooltip() {
			_classCallCheck(this, OHLCTooltip);
	
			_get(Object.getPrototypeOf(OHLCTooltip.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(OHLCTooltip, [{
			key: "render",
			value: function render() {
				var _props = this.props;
				var onClick = _props.onClick;
				var xDisplayFormat = _props.xDisplayFormat;
				var fontFamily = _props.fontFamily;
				var fontSize = _props.fontSize;
				var accessor = _props.accessor;
				var volumeFormat = _props.volumeFormat;
	
				var displayDate, open, high, low, close, volume;
	
				displayDate = open = high = low = close = volume = "n/a";
	
				var item = (0, _utilsChartDataUtil.getCurrentItemForChart)(this.props, this.context);
				var chartData = (0, _utilsChartDataUtil.getChartDataForChart)(this.props, this.context);
	
				if (item !== undefined && accessor(item).close !== undefined) {
					item = accessor(item);
					volume = volumeFormat(item.volume);
					/* volume = (item.volume / billion > 1)
	    	? (item.volume / billion).toFixed(2) + "b"
	    	: (item.volume / million > 1)
	    		? (item.volume / million).toFixed(2) + "m"
	    		: (item.volume / thousand > 1)
	    			? (item.volume / thousand).toFixed(2) + "k"
	    			: item.volume; */
	
					displayDate = xDisplayFormat(item.date);
					open = (0, _utilsUtils.displayNumberFormat)(item.open);
					high = (0, _utilsUtils.displayNumberFormat)(item.high);
					low = (0, _utilsUtils.displayNumberFormat)(item.low);
					close = (0, _utilsUtils.displayNumberFormat)(item.close);
				}
	
				var origin = chartData.config.origin;
	
				var relativeOrigin = typeof this.props.origin === "function" ? this.props.origin(this.context.width, this.context.height) : this.props.origin;
				var absoluteOrigin = [origin[0] + relativeOrigin[0], origin[1] + relativeOrigin[1]];
	
				return _react2["default"].createElement(
					"g",
					{ transform: "translate(" + absoluteOrigin[0] + ", " + absoluteOrigin[1] + ")",
						onClick: onClick },
					_react2["default"].createElement(
						_ToolTipText2["default"],
						{ x: 0, y: 0,
							fontFamily: fontFamily, fontSize: fontSize },
						_react2["default"].createElement(
							_ToolTipTSpanLabel2["default"],
							{ key: "label", x: 0, dy: "5" },
							"Date: "
						),
						_react2["default"].createElement(
							"tspan",
							{ key: "value" },
							displayDate
						),
						_react2["default"].createElement(
							_ToolTipTSpanLabel2["default"],
							{ key: "label_O" },
							" O: "
						),
						_react2["default"].createElement(
							"tspan",
							{ key: "value_O" },
							open
						),
						_react2["default"].createElement(
							_ToolTipTSpanLabel2["default"],
							{ key: "label_H" },
							" H: "
						),
						_react2["default"].createElement(
							"tspan",
							{ key: "value_H" },
							high
						),
						_react2["default"].createElement(
							_ToolTipTSpanLabel2["default"],
							{ key: "label_L" },
							" L: "
						),
						_react2["default"].createElement(
							"tspan",
							{ key: "value_L" },
							low
						),
						_react2["default"].createElement(
							_ToolTipTSpanLabel2["default"],
							{ key: "label_C" },
							" C: "
						),
						_react2["default"].createElement(
							"tspan",
							{ key: "value_C" },
							close
						),
						_react2["default"].createElement(
							_ToolTipTSpanLabel2["default"],
							{ key: "label_Vol" },
							" Vol: "
						),
						_react2["default"].createElement(
							"tspan",
							{ key: "value_Vol" },
							volume
						)
					)
				);
			}
		}]);
	
		return OHLCTooltip;
	})(_react2["default"].Component);
	
	OHLCTooltip.contextTypes = {
		chartData: _react2["default"].PropTypes.array.isRequired,
		currentItems: _react2["default"].PropTypes.array.isRequired,
		width: _react2["default"].PropTypes.number.isRequired,
		height: _react2["default"].PropTypes.number.isRequired
	};
	
	OHLCTooltip.propTypes = {
		forChart: _react2["default"].PropTypes.number.isRequired,
		accessor: _react2["default"].PropTypes.func.isRequired,
		xDisplayFormat: _react2["default"].PropTypes.func.isRequired,
		origin: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.array, _react2["default"].PropTypes.func]).isRequired,
		fontFamily: _react2["default"].PropTypes.string,
		fontSize: _react2["default"].PropTypes.number,
		onClick: _react2["default"].PropTypes.func,
		volumeFormat: _react2["default"].PropTypes.func
	};
	
	OHLCTooltip.defaultProps = {
		namespace: "ReStock.OHLCTooltip",
		accessor: function accessor(d) {
			return { date: d.date, open: d.open, high: d.high, low: d.low, close: d.close, volume: d.volume };
		},
		xDisplayFormat: _utilsUtils.displayDateFormat,
		volumeFormat: _d32["default"].format(".4s"),
		origin: [0, 0]
	};
	
	exports["default"] = OHLCTooltip;
	module.exports = exports["default"];

/***/ },
/* 104 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsChartDataUtil = __webpack_require__(13);
	
	var _ToolTipText = __webpack_require__(100);
	
	var _ToolTipText2 = _interopRequireDefault(_ToolTipText);
	
	var _ToolTipTSpanLabel = __webpack_require__(101);
	
	var _ToolTipTSpanLabel2 = _interopRequireDefault(_ToolTipTSpanLabel);
	
	var SingleValueTooltip = (function (_React$Component) {
		_inherits(SingleValueTooltip, _React$Component);
	
		function SingleValueTooltip() {
			_classCallCheck(this, SingleValueTooltip);
	
			_get(Object.getPrototypeOf(SingleValueTooltip.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(SingleValueTooltip, [{
			key: "render",
			value: function render() {
				var _props = this.props;
				var fontFamily = _props.fontFamily;
				var fontSize = _props.fontSize;
				var forSeries = _props.forSeries;
				var _props2 = this.props;
				var xDisplayFormat = _props2.xDisplayFormat;
				var yDisplayFormat = _props2.yDisplayFormat;
				var xLabel = _props2.xLabel;
				var yLabel = _props2.yLabel;
				var labelStroke = _props2.labelStroke;
				var valueStroke = _props2.valueStroke;
	
				var xDisplayValue = "n/a";
				var yDisplayValue = "n/a";
	
				var chartData = (0, _utilsChartDataUtil.getChartDataForChart)(this.props, this.context);
				var item = (0, _utilsChartDataUtil.getCurrentItemForChart)(this.props, this.context);
	
				/* var xAccessor;
	   if (chartData.plot.scales.xScale.isPolyLinear()) {
	   	xAccessor = stockScaleXAccessr;
	   } */
	
				var overlays = chartData.config.overlays;
				var _overlays$filter$0 = overlays.filter(function (each) {
					return each.id === forSeries;
				})[0];
				var yAccessor = _overlays$filter$0.yAccessor;
				var stroke = _overlays$filter$0.stroke;
				var indicator = _overlays$filter$0.indicator;
	
				var yl = typeof yLabel === "function" ? yLabel(indicator) : yLabel;
	
				var xAccessor = this.props.xAccessor; /* || xAccessor || chartData.config.xAccessor */
				var finalyAccessor = this.props.yAccessor || yAccessor;
	
				if (item !== undefined && finalyAccessor(item) !== undefined) {
					xDisplayValue = xDisplayFormat ? xDisplayFormat(xAccessor(item)) : xDisplayValue;
					yDisplayValue = yDisplayFormat(finalyAccessor(item));
				}
	
				var origin = chartData.config.origin;
	
				var relativeOrigin = typeof this.props.origin === "function" ? this.props.origin(this.context.width, this.context.height) : this.props.origin;
				var absoluteOrigin = [origin[0] + relativeOrigin[0], origin[1] + relativeOrigin[1]];
	
				return _react2["default"].createElement(
					"g",
					{ transform: "translate(" + absoluteOrigin[0] + ", " + absoluteOrigin[1] + ")" },
					_react2["default"].createElement(
						_ToolTipText2["default"],
						{ x: 0, y: 0,
							fontFamily: fontFamily, fontSize: fontSize },
						xLabel ? _react2["default"].createElement(
							_ToolTipTSpanLabel2["default"],
							{ x: 0, dy: "5", fill: labelStroke },
							xLabel + ": "
						) : null,
						xLabel ? _react2["default"].createElement(
							"tspan",
							{ fill: valueStroke || stroke },
							xDisplayValue
						) : null,
						_react2["default"].createElement(
							_ToolTipTSpanLabel2["default"],
							{ fill: labelStroke },
							" " + yl + ": "
						),
						_react2["default"].createElement(
							"tspan",
							{ fill: valueStroke || stroke },
							yDisplayValue
						)
					)
				);
			}
		}]);
	
		return SingleValueTooltip;
	})(_react2["default"].Component);
	
	SingleValueTooltip.contextTypes = {
		chartData: _react2["default"].PropTypes.array.isRequired,
		currentItems: _react2["default"].PropTypes.array.isRequired,
		width: _react2["default"].PropTypes.number.isRequired,
		height: _react2["default"].PropTypes.number.isRequired,
		dataTransform: _react2["default"].PropTypes.array
	};
	
	SingleValueTooltip.propTypes = {
		forChart: _react2["default"].PropTypes.number.isRequired,
		forSeries: _react2["default"].PropTypes.number.isRequired,
		xDisplayFormat: _react2["default"].PropTypes.func,
		yDisplayFormat: _react2["default"].PropTypes.func.isRequired,
		xLabel: _react2["default"].PropTypes.string,
		yLabel: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.string, _react2["default"].PropTypes.func]).isRequired,
		labelStroke: _react2["default"].PropTypes.string.isRequired,
		valueStroke: _react2["default"].PropTypes.string,
		origin: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.array, _react2["default"].PropTypes.func]).isRequired,
		fontFamily: _react2["default"].PropTypes.string,
		fontSize: _react2["default"].PropTypes.number,
		onClick: _react2["default"].PropTypes.func,
		xAccessor: _react2["default"].PropTypes.func,
		yAccessor: _react2["default"].PropTypes.func
	};
	
	SingleValueTooltip.defaultProps = {
		origin: [0, 0],
		labelStroke: "#4682B4",
		yDisplayFormat: function yDisplayFormat(d) {
			return d;
		},
		xAccessor: function xAccessor(d) {
			return d.date;
		}
	};
	
	exports["default"] = SingleValueTooltip;
	module.exports = exports["default"];

/***/ },
/* 105 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsUtils = __webpack_require__(7);
	
	var _utilsChartDataUtil = __webpack_require__(13);
	
	var _ToolTipText = __webpack_require__(100);
	
	var _ToolTipText2 = _interopRequireDefault(_ToolTipText);
	
	var _ToolTipTSpanLabel = __webpack_require__(101);
	
	var _ToolTipTSpanLabel2 = _interopRequireDefault(_ToolTipTSpanLabel);
	
	var CompareTooltip = (function (_React$Component) {
		_inherits(CompareTooltip, _React$Component);
	
		function CompareTooltip() {
			_classCallCheck(this, CompareTooltip);
	
			_get(Object.getPrototypeOf(CompareTooltip.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(CompareTooltip, [{
			key: "render",
			value: function render() {
				var _this = this;
	
				var displayValue = "n/a";
	
				var chartData = (0, _utilsChartDataUtil.getChartDataForChart)(this.props, this.context);
				var item = (0, _utilsChartDataUtil.getCurrentItemForChart)(this.props, this.context);
	
				var thisSeries = chartData.config.compareSeries.filter(function (each) {
					return each.id === _this.props.forCompareSeries;
				})[0];
	
				if (item !== undefined && thisSeries.yAccessor(item) !== undefined) {
					displayValue = thisSeries.yAccessor(item);
				}
	
				var origin = chartData.config.origin;
	
				var relativeOrigin = typeof this.props.origin === "function" ? this.props.origin(this.context.width, this.context.height) : this.props.origin;
				var absoluteOrigin = [origin[0] + relativeOrigin[0], origin[1] + relativeOrigin[1]];
	
				return _react2["default"].createElement(
					"g",
					{ transform: "translate(" + absoluteOrigin[0] + ", " + absoluteOrigin[1] + ")" },
					_react2["default"].createElement(
						_ToolTipText2["default"],
						{ x: 0, y: 0,
							fontFamily: this.props.fontFamily, fontSize: this.props.fontSize },
						_react2["default"].createElement(
							_ToolTipTSpanLabel2["default"],
							{ key: "label", x: 0, dy: "5", fill: thisSeries.stroke },
							thisSeries.displayLabel + ": "
						),
						_react2["default"].createElement(
							"tspan",
							{ key: "value", fill: thisSeries.stroke },
							displayValue
						)
					)
				);
			}
		}]);
	
		return CompareTooltip;
	})(_react2["default"].Component);
	
	CompareTooltip.contextTypes = {
		chartData: _react2["default"].PropTypes.array.isRequired,
		currentItems: _react2["default"].PropTypes.array.isRequired
	};
	
	CompareTooltip.propTypes = {
		forChart: _react2["default"].PropTypes.number.isRequired,
		forCompareSeries: _react2["default"].PropTypes.number.isRequired,
		xDisplayFormat: _react2["default"].PropTypes.func.isRequired,
		origin: _react2["default"].PropTypes.array.isRequired,
		fontFamily: _react2["default"].PropTypes.string,
		fontSize: _react2["default"].PropTypes.number
	};
	
	CompareTooltip.defaultProps = {
		namespace: "ReStock.CompareTooltip",
		xDisplayFormat: _utilsUtils.displayDateFormat,
		origin: [0, 0]
	};
	
	exports["default"] = CompareTooltip;
	module.exports = exports["default"];

/***/ },
/* 106 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _objectAssign = __webpack_require__(4);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _ToolTipText = __webpack_require__(100);
	
	var _ToolTipText2 = _interopRequireDefault(_ToolTipText);
	
	var _ToolTipTSpanLabel = __webpack_require__(101);
	
	var _ToolTipTSpanLabel2 = _interopRequireDefault(_ToolTipTSpanLabel);
	
	var _utilsUtils = __webpack_require__(7);
	
	var _utilsChartDataUtil = __webpack_require__(13);
	
	var SingleMAToolTip = (function (_React$Component) {
		_inherits(SingleMAToolTip, _React$Component);
	
		function SingleMAToolTip(props) {
			_classCallCheck(this, SingleMAToolTip);
	
			_get(Object.getPrototypeOf(SingleMAToolTip.prototype), "constructor", this).call(this, props);
			this.handleClick = this.handleClick.bind(this);
		}
	
		_createClass(SingleMAToolTip, [{
			key: "handleClick",
			value: function handleClick(e) {
				var _props = this.props;
				var onClick = _props.onClick;
				var forChart = _props.forChart;
				var forDataSeries = _props.forDataSeries;
				var options = _props.options;
	
				onClick((0, _objectAssign2["default"])({ chartId: forChart, dataSeriesId: forDataSeries }, options), e);
			}
		}, {
			key: "render",
			value: function render() {
				var translate = "translate(" + this.props.origin[0] + ", " + this.props.origin[1] + ")";
				return _react2["default"].createElement(
					"g",
					{ transform: translate },
					_react2["default"].createElement("line", { x1: 0, y1: 2, x2: 0, y2: 28, stroke: this.props.color, strokeWidth: "4px" }),
					_react2["default"].createElement(
						_ToolTipText2["default"],
						{ x: 5, y: 11,
							fontFamily: this.props.fontFamily, fontSize: this.props.fontSize },
						_react2["default"].createElement(
							_ToolTipTSpanLabel2["default"],
							null,
							this.props.displayName
						),
						_react2["default"].createElement(
							"tspan",
							{ x: "5", dy: "15" },
							this.props.value
						)
					),
					_react2["default"].createElement("rect", { x: 0, y: 0, width: 55, height: 30,
						onClick: this.handleClick,
						fill: "none", stroke: "none" })
				);
			}
		}]);
	
		return SingleMAToolTip;
	})(_react2["default"].Component);
	
	SingleMAToolTip.propTypes = {
		origin: _react2["default"].PropTypes.array.isRequired,
		color: _react2["default"].PropTypes.string.isRequired,
		displayName: _react2["default"].PropTypes.string.isRequired,
		value: _react2["default"].PropTypes.string.isRequired,
		onClick: _react2["default"].PropTypes.func,
		fontFamily: _react2["default"].PropTypes.string,
		fontSize: _react2["default"].PropTypes.number,
		forChart: _react2["default"].PropTypes.number.isRequired,
		forDataSeries: _react2["default"].PropTypes.number.isRequired,
		options: _react2["default"].PropTypes.object.isRequired
	};
	
	var MovingAverageTooltip = (function (_React$Component2) {
		_inherits(MovingAverageTooltip, _React$Component2);
	
		function MovingAverageTooltip() {
			_classCallCheck(this, MovingAverageTooltip);
	
			_get(Object.getPrototypeOf(MovingAverageTooltip.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(MovingAverageTooltip, [{
			key: "render",
			value: function render() {
				var _this = this;
	
				var chartData = (0, _utilsChartDataUtil.getChartDataForChart)(this.props, this.context);
				var item = (0, _utilsChartDataUtil.getCurrentItemForChart)(this.props, this.context);
				var _props2 = this.props;
				var className = _props2.className;
				var onClick = _props2.onClick;
				var forChart = _props2.forChart;
				var forDataSeries = _props2.forDataSeries;
				var width = _props2.width;
				var fontFamily = _props2.fontFamily;
				var fontSize = _props2.fontSize;
				var origin = chartData.config.origin;
	
				var relativeOrigin = typeof this.props.origin === "function" ? this.props.origin(this.context.width, this.context.height) : this.props.origin;
				var absoluteOrigin = [origin[0] + relativeOrigin[0], origin[1] + relativeOrigin[1]];
	
				return _react2["default"].createElement(
					"g",
					{ transform: "translate(" + absoluteOrigin[0] + ", " + absoluteOrigin[1] + ")", className: className },
					chartData.config.overlays.filter(function (eachOverlay) {
						return eachOverlay.indicator !== undefined;
					}).filter(function (eachOverlay) {
						return eachOverlay.indicator.isMovingAverage && eachOverlay.indicator.isMovingAverage();
					}).filter(function (eachOverlay) {
						return forDataSeries === undefined ? true : forDataSeries.indexOf(eachOverlay.id) > -1;
					}).map(function (eachOverlay, idx) {
						var yValue = eachOverlay.yAccessor(item);
						var yDisplayValue = yValue ? _this.props.displayFormat(yValue) : "n/a";
						return _react2["default"].createElement(SingleMAToolTip, {
							key: idx,
							origin: [width * idx, 0],
							color: eachOverlay.stroke,
							displayName: eachOverlay.indicator.tooltipLabel(),
							value: yDisplayValue,
							options: eachOverlay.indicator.options(),
							forChart: forChart, forDataSeries: eachOverlay.id, onClick: onClick,
							fontFamily: fontFamily, fontSize: fontSize });
					})
				);
			}
		}]);
	
		return MovingAverageTooltip;
	})(_react2["default"].Component);
	
	MovingAverageTooltip.contextTypes = {
		chartData: _react2["default"].PropTypes.array.isRequired,
		currentItems: _react2["default"].PropTypes.array.isRequired
	};
	
	MovingAverageTooltip.propTypes = {
		className: _react2["default"].PropTypes.string,
		forChart: _react2["default"].PropTypes.number.isRequired,
		displayFormat: _react2["default"].PropTypes.func.isRequired,
		origin: _react2["default"].PropTypes.array.isRequired,
		onClick: _react2["default"].PropTypes.func,
		fontFamily: _react2["default"].PropTypes.string,
		fontSize: _react2["default"].PropTypes.number,
		width: _react2["default"].PropTypes.number,
		forDataSeries: _react2["default"].PropTypes.arrayOf(_react2["default"].PropTypes.number)
	};
	
	MovingAverageTooltip.defaultProps = {
		namespace: "ReStock.MovingAverageTooltip",
		className: "react-stockcharts-moving-average-tooltip",
		displayFormat: _utilsUtils.displayNumberFormat,
		origin: [0, 10],
		width: 65
	};
	
	exports["default"] = MovingAverageTooltip;
	module.exports = exports["default"];

/***/ },
/* 107 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsUtils = __webpack_require__(7);
	
	var _utilsChartDataUtil = __webpack_require__(13);
	
	var _ToolTipText = __webpack_require__(100);
	
	var _ToolTipText2 = _interopRequireDefault(_ToolTipText);
	
	var _ToolTipTSpanLabel = __webpack_require__(101);
	
	var _ToolTipTSpanLabel2 = _interopRequireDefault(_ToolTipTSpanLabel);
	
	var BollingerBandTooltip = (function (_React$Component) {
		_inherits(BollingerBandTooltip, _React$Component);
	
		function BollingerBandTooltip() {
			_classCallCheck(this, BollingerBandTooltip);
	
			_get(Object.getPrototypeOf(BollingerBandTooltip.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(BollingerBandTooltip, [{
			key: "render",
			value: function render() {
				var _props = this.props;
				var onClick = _props.onClick;
				var forChart = _props.forChart;
				var forDataSeries = _props.forDataSeries;
	
				var chartData = (0, _utilsChartDataUtil.getChartDataForChart)(this.props, this.context);
				var item = (0, _utilsChartDataUtil.getCurrentItemForChart)(this.props, this.context);
				var top, middle, bottom;
				top = middle = bottom = "n/a";
	
				var overlays = chartData.config.overlays.filter(function (eachOverlay) {
					return forDataSeries === undefined ? true : forDataSeries === eachOverlay.id;
				}).filter(function (eachOverlay) {
					return eachOverlay.indicator !== undefined;
				}).filter(function (eachOverlay) {
					return eachOverlay.indicator.isBollingerBand && eachOverlay.indicator.isBollingerBand();
				});
	
				if (overlays.length > 1 || overlays.length === 0) {
					console.error("Could not find Exactly one DataSeries with BollingerBand indicator for Chart id=" + forChart + ", either use\n\t\t\t\tsingle BollingerBand indicator per chart\n\t\t\t\tor use forDataSeries property to narrow down to single Series");
				}
				var overlay = overlays[0];
				var options = overlay.indicator.options();
	
				var yAccessor = overlay.indicator.yAccessor();
				var value = yAccessor(item);
				var format = _utilsUtils.displayNumberFormat;
	
				if (value !== undefined) {
					top = format(value.top);
					middle = format(value.middle);
					bottom = format(value.bottom);
				}
	
				var origin = chartData.config.origin;
	
				var relativeOrigin = typeof this.props.origin === "function" ? this.props.origin(this.context.width, this.context.height) : this.props.origin;
				var absoluteOrigin = [origin[0] + relativeOrigin[0], origin[1] + relativeOrigin[1]];
	
				return _react2["default"].createElement(
					"g",
					{ transform: "translate(" + absoluteOrigin[0] + ", " + absoluteOrigin[1] + ")",
						className: this.props.className,
						onClick: onClick },
					_react2["default"].createElement(
						_ToolTipText2["default"],
						{ x: 0, y: 0,
							fontFamily: this.props.fontFamily, fontSize: this.props.fontSize },
						_react2["default"].createElement(
							_ToolTipTSpanLabel2["default"],
							null,
							"BB (" + options.period + ", " + options.source + ", " + options.multiplier + ", " + options.movingAverageType + "): "
						),
						_react2["default"].createElement(
							"tspan",
							null,
							top + ", " + middle + ", " + bottom
						)
					)
				);
			}
		}]);
	
		return BollingerBandTooltip;
	})(_react2["default"].Component);
	
	BollingerBandTooltip.contextTypes = {
		chartData: _react2["default"].PropTypes.array.isRequired,
		currentItems: _react2["default"].PropTypes.array.isRequired
	};
	
	BollingerBandTooltip.propTypes = {
		className: _react2["default"].PropTypes.string,
		forChart: _react2["default"].PropTypes.number.isRequired,
		displayFormat: _react2["default"].PropTypes.func.isRequired,
		origin: _react2["default"].PropTypes.array.isRequired,
		onClick: _react2["default"].PropTypes.func,
		fontFamily: _react2["default"].PropTypes.string,
		fontSize: _react2["default"].PropTypes.number,
		forDataSeries: _react2["default"].PropTypes.number
	};
	
	BollingerBandTooltip.defaultProps = {
		namespace: "ReStock.BollingerBandTooltip",
		className: "react-stockcharts-moving-average-tooltip",
		displayFormat: _utilsUtils.displayNumberFormat,
		origin: [0, 10],
		width: 65
	};
	
	exports["default"] = BollingerBandTooltip;
	module.exports = exports["default"];

/***/ },
/* 108 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsUtils = __webpack_require__(7);
	
	var _utilsChartDataUtil = __webpack_require__(13);
	
	var _ToolTipText = __webpack_require__(100);
	
	var _ToolTipText2 = _interopRequireDefault(_ToolTipText);
	
	var _ToolTipTSpanLabel = __webpack_require__(101);
	
	var _ToolTipTSpanLabel2 = _interopRequireDefault(_ToolTipTSpanLabel);
	
	var RSITooltip = (function (_React$Component) {
		_inherits(RSITooltip, _React$Component);
	
		function RSITooltip() {
			_classCallCheck(this, RSITooltip);
	
			_get(Object.getPrototypeOf(RSITooltip.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(RSITooltip, [{
			key: "render",
			value: function render() {
				var _props = this.props;
				var onClick = _props.onClick;
				var forChart = _props.forChart;
				var forDataSeries = _props.forDataSeries;
				var fontSize = _props.fontSize;
				var fontFamily = _props.fontFamily;
	
				var chartData = (0, _utilsChartDataUtil.getChartDataForChart)(this.props, this.context);
	
				var overlays = chartData.config.overlays.filter(function (eachOverlay) {
					return forDataSeries === undefined ? true : forDataSeries === eachOverlay.id;
				}).filter(function (eachOverlay) {
					return eachOverlay.indicator !== undefined;
				}).filter(function (eachOverlay) {
					return eachOverlay.indicator.isRSI && eachOverlay.indicator.isRSI();
				});
	
				if (overlays.length > 1 || overlays.length === 0) {
					console.error("Could not find Exactly one DataSeries with RSI indicator for Chart id=" + forChart + ", either use\n\t\t\t\tsingle RSI indicator per chart\n\t\t\t\tor use forDataSeries property to narrow down to single Series");
				}
	
				var overlay = overlays[0];
				var options = overlay.indicator.options();
	
				var item = (0, _utilsChartDataUtil.getCurrentItemForChart)(this.props, this.context);
				var rsi = overlay.yAccessor(item);
				var format = chartData.config.mouseCoordinates.format;
	
				var value = rsi !== undefined && format(rsi) || "n/a";
	
				var origin = chartData.config.origin;
	
				var relativeOrigin = typeof this.props.origin === "function" ? this.props.origin(this.context.width, this.context.height) : this.props.origin;
				var absoluteOrigin = [origin[0] + relativeOrigin[0], origin[1] + relativeOrigin[1]];
	
				return _react2["default"].createElement(
					"g",
					{ transform: "translate(" + absoluteOrigin[0] + ", " + absoluteOrigin[1] + ")",
						onClick: onClick },
					_react2["default"].createElement(
						_ToolTipText2["default"],
						{ x: 0, y: 0,
							fontFamily: fontFamily, fontSize: fontSize },
						_react2["default"].createElement(
							_ToolTipTSpanLabel2["default"],
							null,
							"RSI (" + options.period + ", " + options.source + ", " + options.overSold + ", " + options.overBought + "): "
						),
						_react2["default"].createElement(
							"tspan",
							null,
							value
						)
					)
				);
			}
		}]);
	
		return RSITooltip;
	})(_react2["default"].Component);
	
	RSITooltip.contextTypes = {
		chartData: _react2["default"].PropTypes.array.isRequired,
		currentItems: _react2["default"].PropTypes.array.isRequired,
		width: _react2["default"].PropTypes.number.isRequired,
		height: _react2["default"].PropTypes.number.isRequired
	};
	
	RSITooltip.propTypes = {
		forChart: _react2["default"].PropTypes.number.isRequired,
		xDisplayFormat: _react2["default"].PropTypes.func.isRequired,
		origin: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.array, _react2["default"].PropTypes.func]).isRequired,
		fontFamily: _react2["default"].PropTypes.string,
		fontSize: _react2["default"].PropTypes.number,
		forDataSeries: _react2["default"].PropTypes.number,
		onClick: _react2["default"].PropTypes.func
	};
	
	RSITooltip.defaultProps = {
		namespace: "ReStock.RSITooltip",
		xDisplayFormat: _utilsUtils.displayDateFormat,
		origin: [0, 0]
	};
	
	exports["default"] = RSITooltip;
	module.exports = exports["default"];

/***/ },
/* 109 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsUtils = __webpack_require__(7);
	
	var _utilsChartDataUtil = __webpack_require__(13);
	
	var _ToolTipText = __webpack_require__(100);
	
	var _ToolTipText2 = _interopRequireDefault(_ToolTipText);
	
	var _ToolTipTSpanLabel = __webpack_require__(101);
	
	var _ToolTipTSpanLabel2 = _interopRequireDefault(_ToolTipTSpanLabel);
	
	var StochasticTooltip = (function (_React$Component) {
		_inherits(StochasticTooltip, _React$Component);
	
		function StochasticTooltip() {
			_classCallCheck(this, StochasticTooltip);
	
			_get(Object.getPrototypeOf(StochasticTooltip.prototype), "constructor", this).apply(this, arguments);
		}
	
		_createClass(StochasticTooltip, [{
			key: "render",
			value: function render() {
				var _props = this.props;
				var onClick = _props.onClick;
				var forChart = _props.forChart;
				var forDataSeries = _props.forDataSeries;
	
				var chartData = (0, _utilsChartDataUtil.getChartDataForChart)(this.props, this.context);
				var overlays = chartData.config.overlays.filter(function (eachOverlay) {
					return forDataSeries === undefined ? true : forDataSeries === eachOverlay.id;
				}).filter(function (eachOverlay) {
					return eachOverlay.indicator !== undefined;
				}).filter(function (eachOverlay) {
					return eachOverlay.indicator.isStochastic && eachOverlay.indicator.isStochastic();
				});
	
				if (overlays.length > 1 || overlays.length === 0) {
					console.error("Could not find Exactly one DataSeries with Stochastic indicator for Chart id=" + forChart + ", either use\n\t\t\t\tsingle Stochastic indicator per chart\n\t\t\t\tor use forDataSeries property to narrow down to single Series");
				}
				var overlay = overlays[0];
				var options = overlay.indicator.options();
	
				var item = (0, _utilsChartDataUtil.getCurrentItemForChart)(this.props, this.context);
				var stochastic = overlay.yAccessor(item);
				var format = chartData.config.mouseCoordinates.format;
	
				var K = stochastic && stochastic.K && format(stochastic.K) || "n/a";
				var D = stochastic && stochastic.D && format(stochastic.D) || "n/a";
	
				var origin = chartData.config.origin;
	
				var relativeOrigin = typeof this.props.origin === "function" ? this.props.origin(this.context.width, this.context.height) : this.props.origin;
				var absoluteOrigin = [origin[0] + relativeOrigin[0], origin[1] + relativeOrigin[1]];
				var label = this.props.children || "Stochastic";
	
				return _react2["default"].createElement(
					"g",
					{ transform: "translate(" + absoluteOrigin[0] + ", " + absoluteOrigin[1] + ")",
						onClick: onClick },
					_react2["default"].createElement(
						_ToolTipText2["default"],
						{ x: 0, y: 0, fontFamily: this.props.fontFamily, fontSize: this.props.fontSize },
						_react2["default"].createElement(
							_ToolTipTSpanLabel2["default"],
							null,
							label + " %K("
						),
						_react2["default"].createElement(
							"tspan",
							{ fill: options.stroke.K },
							options.period + ", " + options.K
						),
						_react2["default"].createElement(
							_ToolTipTSpanLabel2["default"],
							null,
							"): "
						),
						_react2["default"].createElement(
							"tspan",
							{ fill: options.stroke.K },
							K
						),
						_react2["default"].createElement(
							_ToolTipTSpanLabel2["default"],
							null,
							" %D ("
						),
						_react2["default"].createElement(
							"tspan",
							{ fill: options.stroke.D },
							options.D
						),
						_react2["default"].createElement(
							_ToolTipTSpanLabel2["default"],
							null,
							"): "
						),
						_react2["default"].createElement(
							"tspan",
							{ fill: options.stroke.D },
							D
						)
					)
				);
			}
		}]);
	
		return StochasticTooltip;
	})(_react2["default"].Component);
	
	StochasticTooltip.contextTypes = {
		chartData: _react2["default"].PropTypes.array.isRequired,
		currentItems: _react2["default"].PropTypes.array.isRequired,
		width: _react2["default"].PropTypes.number.isRequired,
		height: _react2["default"].PropTypes.number.isRequired
	};
	
	StochasticTooltip.propTypes = {
		forChart: _react2["default"].PropTypes.number.isRequired,
		xDisplayFormat: _react2["default"].PropTypes.func.isRequired,
		origin: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.array, _react2["default"].PropTypes.func]).isRequired,
		fontFamily: _react2["default"].PropTypes.string,
		fontSize: _react2["default"].PropTypes.number,
		forDataSeries: _react2["default"].PropTypes.number,
		onClick: _react2["default"].PropTypes.func,
		children: _react2["default"].PropTypes.node.isRequired
	};
	
	StochasticTooltip.defaultProps = {
		namespace: "ReStock.StochasticTooltip",
		xDisplayFormat: _utilsUtils.displayDateFormat,
		origin: [0, 0]
	};
	
	exports["default"] = StochasticTooltip;
	module.exports = exports["default"];

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _TypeChooser = __webpack_require__(111);
	
	var _TypeChooser2 = _interopRequireDefault(_TypeChooser);
	
	var _ChartWidthMixin = __webpack_require__(112);
	
	var _ChartWidthMixin2 = _interopRequireDefault(_ChartWidthMixin);
	
	var _SaveChartAsImage = __webpack_require__(113);
	
	var _SaveChartAsImage2 = _interopRequireDefault(_SaveChartAsImage);
	
	var _fitWidth = __webpack_require__(115);
	
	var _fitWidth2 = _interopRequireDefault(_fitWidth);
	
	exports.TypeChooser = _TypeChooser2["default"];
	exports.ChartWidthMixin = _ChartWidthMixin2["default"];
	exports.SaveChartAsImage = _SaveChartAsImage2["default"];
	exports.fitWidth = _fitWidth2["default"];

/***/ },
/* 111 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var TypeChooser = (function (_React$Component) {
		_inherits(TypeChooser, _React$Component);
	
		function TypeChooser(props) {
			_classCallCheck(this, TypeChooser);
	
			_get(Object.getPrototypeOf(TypeChooser.prototype), "constructor", this).call(this, props);
			this.state = {
				type: this.props.type
			};
			this.handleTypeChange = this.handleTypeChange.bind(this);
		}
	
		_createClass(TypeChooser, [{
			key: "handleTypeChange",
			value: function handleTypeChange(e) {
				// console.log(e.target.value);
				this.setState({
					type: e.target.value
				});
			}
		}, {
			key: "render",
			value: function render() {
				return _react2["default"].createElement(
					"div",
					null,
					_react2["default"].createElement(
						"label",
						{ forHtml: "type" },
						"Type: "
					),
					_react2["default"].createElement(
						"select",
						{ name: "type", id: "type", onChange: this.handleTypeChange, value: this.state.type },
						_react2["default"].createElement(
							"option",
							{ value: "svg" },
							"svg"
						),
						_react2["default"].createElement(
							"option",
							{ value: "hybrid" },
							"canvas + svg"
						)
					),
					this.props.children(this.state.type)
				);
			}
		}]);
	
		return TypeChooser;
	})(_react2["default"].Component);
	
	TypeChooser.propTypes = {
		type: _react2["default"].PropTypes.oneOf(["svg", "hybrid"]),
		children: _react2["default"].PropTypes.func.isRequired
	};
	
	TypeChooser.defaultProps = {
		type: "hybrid"
	};
	
	exports["default"] = TypeChooser;
	module.exports = exports["default"];

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	// import ReactDOM from "react-dom";
	
	var ChartWidthMixin = {
		handleWindowResize: function handleWindowResize() {
			var el = _react2["default"].findDOMNode(this);
			// console.log(this.refs, el, this);
	
			var w = el.parentNode.clientWidth;
			// console.log("width = ", w);
			this.setState({
				width: w
			});
		},
		componentWillUnmount: function componentWillUnmount() {
			// console.log("unmounting...")
			window.removeEventListener("resize", this.handleWindowResize);
		},
		componentDidMount: function componentDidMount() {
			window.addEventListener("resize", this.handleWindowResize);
			var el = _react2["default"].findDOMNode(this);
			// console.log(this.refs, el);
			var w = el.parentNode.clientWidth;
			this.setState({
				width: w
			});
		}
	};
	
	exports["default"] = ChartWidthMixin;
	module.exports = exports["default"];

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var saveAsPng = __webpack_require__(114);
	
	var SaveChartAsImage = {
		save: function save(doc, container, background, cb) {
			if (saveAsPng === undefined) {
				throw new Error("dependency save-svg-as-png is not installed, execute npm install -S save-svg-as-png");
			}
			saveAsPng.svgAsDataUri(container.getElementsByTagName("svg")[0], {}, function (uri) {
				var image = new Image();
				image.onload = function () {
					var canvas = doc.createElement("canvas");
					canvas.width = image.width;
					canvas.height = image.height;
					var context = canvas.getContext("2d");
	
					if (background !== undefined) {
						context.fillStyle = background;
						context.fillRect(0, 0, canvas.width, canvas.height);
					}
					var canvasList = container.getElementsByTagName("canvas");
					for (var i = 0; i < canvasList.length; i++) {
						var each = canvasList[i];
						if (each !== undefined) {
							var parent = each.parentNode.parentNode.getBoundingClientRect();
							var rect = each.getBoundingClientRect();
							context.drawImage(each, rect.left - parent.left, rect.top - parent.top);
						}
					};
	
					context.drawImage(image, 0, 0);
					cb(canvas.toDataURL("image/png"));
				};
				image.src = uri;
			});
		},
		saveWithWhiteBG: function saveWithWhiteBG(doc, container, cb) {
			return this.saveWithBG(doc, container, "white", cb);
		},
		saveWithDarkBG: function saveWithDarkBG(doc, container, cb) {
			return this.saveWithBG(doc, container, "#303030", cb);
		},
		saveWithBG: function saveWithBG(doc, container, background, cb) {
			return this.save(doc, container, background, cb);
		},
		saveChartAsImage: function saveChartAsImage(container) {
			this.saveWithWhiteBG(document, container, function (src) {
				var a = document.createElement("a");
				a.setAttribute("href", src);
				a.setAttribute("download", "Chart.png");
	
				document.body.appendChild(a);
				a.addEventListener("click", function () /* e */{
					a.parentNode.removeChild(a);
				});
	
				a.click();
			});
		}
	};
	
	exports["default"] = SaveChartAsImage;
	module.exports = exports["default"];

/***/ },
/* 114 */
/***/ function(module, exports) {

	(function() {
	  var out$ = typeof exports != 'undefined' && exports || this;
	
	  var doctype = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
	
	  function isExternal(url) {
	    return url && url.lastIndexOf('http',0) == 0 && url.lastIndexOf(window.location.host) == -1;
	  }
	
	  function inlineImages(el, callback) {
	    var images = el.querySelectorAll('image');
	    var left = images.length;
	    if (left == 0) {
	      callback();
	    }
	    for (var i = 0; i < images.length; i++) {
	      (function(image) {
	        var href = image.getAttributeNS("http://www.w3.org/1999/xlink", "href");
	        if (href) {
	          if (isExternal(href.value)) {
	            console.warn("Cannot render embedded images linking to external hosts: "+href.value);
	            return;
	          }
	        }
	        var canvas = document.createElement('canvas');
	        var ctx = canvas.getContext('2d');
	        var img = new Image();
	        href = href || image.getAttribute('href');
	        img.src = href;
	        img.onload = function() {
	          canvas.width = img.width;
	          canvas.height = img.height;
	          ctx.drawImage(img, 0, 0);
	          image.setAttributeNS("http://www.w3.org/1999/xlink", "href", canvas.toDataURL('image/png'));
	          left--;
	          if (left == 0) {
	            callback();
	          }
	        }
	        img.onerror = function() {
	          console.log("Could not load "+href);
	          left--;
	          if (left == 0) {
	            callback();
	          }
	        }
	      })(images[i]);
	    }
	  }
	
	  function styles(el, selectorRemap) {
	    var css = "";
	    var sheets = document.styleSheets;
	    for (var i = 0; i < sheets.length; i++) {
	      if (isExternal(sheets[i].href)) {
	        console.warn("Cannot include styles from other hosts: "+sheets[i].href);
	        continue;
	      }
	      var rules = sheets[i].cssRules;
	      if (rules != null) {
	        for (var j = 0; j < rules.length; j++) {
	          var rule = rules[j];
	          if (typeof(rule.style) != "undefined") {
	            var match = null;
	            try {
	              match = el.querySelector(rule.selectorText);
	            } catch(err) {
	              console.warn('Invalid CSS selector "' + rule.selectorText + '"', err);
	            }
	            if (match) {
	              var selector = selectorRemap ? selectorRemap(rule.selectorText) : rule.selectorText;
	              css += selector + " { " + rule.style.cssText + " }\n";
	            } else if(rule.cssText.match(/^@font-face/)) {
	              css += rule.cssText + '\n';
	            }
	          }
	        }
	      }
	    }
	    return css;
	  }
	
	  function getDimension(el, clone, dim) {
	    return (clone.getAttribute(dim) !== null && !clone.getAttribute(dim).match(/%$/) && parseInt(clone.getAttribute(dim))) ||
	      el.getBoundingClientRect()[dim] ||
	      parseInt(clone.style[dim]) ||
	      parseInt(window.getComputedStyle(el).getPropertyValue(dim));
	  }
	
	  out$.svgAsDataUri = function(el, options, cb) {
	    options = options || {};
	    options.scale = options.scale || 1;
	    var xmlns = "http://www.w3.org/2000/xmlns/";
	
	    inlineImages(el, function() {
	      var outer = document.createElement("div");
	      var clone = el.cloneNode(true);
	      var width, height, viewBoxWidth, viewBoxHeight;
	      if(el.tagName == 'svg') {
	        width = getDimension(el, clone, 'width');
	        height = getDimension(el, clone, 'height');
	        if (typeof width === "undefined" || width === null || isNaN(parseFloat(width))) {
	          width = 0;
	        }
	        if (typeof height === "undefined" || height === null || isNaN(parseFloat(height))) {
	          height = 0;
	        }
	        viewBoxWidth = el.viewBox.baseVal && el.viewBox.baseVal.width !== 0 ? el.viewBox.baseVal.width : width;
	        viewBoxHeight = el.viewBox.baseVal && el.viewBox.baseVal.height !== 0 ? el.viewBox.baseVal.height : height;
	      } else {
	        var box = el.getBBox();
	        width = box.x + box.width;
	        height = box.y + box.height;
	        clone.setAttribute('transform', clone.getAttribute('transform').replace(/translate\(.*?\)/, ''));
	        viewBoxWidth = width;
	        viewBoxHeight =  height;
	
	        var svg = document.createElementNS('http://www.w3.org/2000/svg','svg')
	        svg.appendChild(clone)
	        clone = svg;
	      }
	
	      clone.setAttribute("version", "1.1");
	      clone.setAttributeNS(xmlns, "xmlns", "http://www.w3.org/2000/svg");
	      clone.setAttributeNS(xmlns, "xmlns:xlink", "http://www.w3.org/1999/xlink");
	      clone.setAttribute("width", width * options.scale);
	      clone.setAttribute("height", height * options.scale);
	      clone.setAttribute("viewBox", "0 0 " + viewBoxWidth + " " + viewBoxHeight);
	
	      outer.appendChild(clone);
	
	      var css = styles(el, options.selectorRemap);
	      var s = document.createElement('style');
	      s.setAttribute('type', 'text/css');
	      s.innerHTML = "<![CDATA[\n" + css + "\n]]>";
	      var defs = document.createElement('defs');
	      defs.appendChild(s);
	      clone.insertBefore(defs, clone.firstChild);
	
	      var svg = doctype + outer.innerHTML;
	      // encode then decode to handle `btoa` on Unicode; see MDN for `btoa`.
	      var uri = 'data:image/svg+xml;base64,' + window.btoa(decodeURIComponent(encodeURIComponent(svg)));
	      if (cb) {
	        cb(uri);
	      }
	    });
	  }
	
	  out$.saveSvgAsPng = function(el, name, options) {
	    options = options || {};
	    out$.svgAsDataUri(el, options, function(uri) {
	      var image = new Image();
	      image.onload = function() {
	        var canvas = document.createElement('canvas');
	        canvas.width = image.width;
	        canvas.height = image.height;
	        var context = canvas.getContext('2d');
	        context.drawImage(image, 0, 0);
	
	        var a = document.createElement('a');
	        a.download = name;
	        a.href = canvas.toDataURL('image/png');
	        document.body.appendChild(a);
	        a.addEventListener("click", function(e) {
	          a.parentNode.removeChild(a);
	        });
	        a.click();
	      }
	      image.src = uri;
	    });
	  }
	})();


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	exports["default"] = fitWidth;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(116);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function getDisplayName(Series) {
		var name = Series.displayName || Series.name || "Series";
		return name;
	}
	
	function fitWidth(Component) {
		var withRef = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
		var ResponsiveComponent = (function (_React$Component) {
			_inherits(ResponsiveComponent, _React$Component);
	
			function ResponsiveComponent(props) {
				_classCallCheck(this, ResponsiveComponent);
	
				_get(Object.getPrototypeOf(ResponsiveComponent.prototype), "constructor", this).call(this, props);
				this.handleWindowResize = this.handleWindowResize.bind(this);
				this.getWrappedInstance = this.getWrappedInstance.bind(this);
			}
	
			_createClass(ResponsiveComponent, [{
				key: "componentDidMount",
				value: function componentDidMount() {
					window.addEventListener("resize", this.handleWindowResize);
					var el = _reactDom2["default"].findDOMNode(this);
					var w = el.parentNode.clientWidth;
					this.setState({
						width: w
					});
				}
			}, {
				key: "componentWillUnmount",
				value: function componentWillUnmount() {
					window.removeEventListener("resize", this.handleWindowResize);
				}
			}, {
				key: "handleWindowResize",
				value: function handleWindowResize() {
					var el = _reactDom2["default"].findDOMNode(this);
					var w = el.parentNode.clientWidth;
					this.setState({
						width: w
					});
				}
			}, {
				key: "getWrappedInstance",
				value: function getWrappedInstance() {
					return this.refs.component;
				}
			}, {
				key: "render",
				value: function render() {
					var ref = withRef ? { ref: "component" } : {};
	
					if (this.state && this.state.width) {
						return _react2["default"].createElement(Component, _extends({ width: this.state.width }, this.props, ref));
					} else {
						return _react2["default"].createElement("div", null);
					}
				}
			}]);
	
			return ResponsiveComponent;
		})(_react2["default"].Component);
	
		ResponsiveComponent.displayName = "fitWidth(" + getDisplayName(Component) + ")";
	
		return ResponsiveComponent;
	}
	
	module.exports = exports["default"];

/***/ },
/* 116 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_116__;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _TrendLine = __webpack_require__(118);
	
	var _TrendLine2 = _interopRequireDefault(_TrendLine);
	
	var _FibonacciRetracement = __webpack_require__(120);
	
	var _FibonacciRetracement2 = _interopRequireDefault(_FibonacciRetracement);
	
	var _ClickCallback = __webpack_require__(121);
	
	var _ClickCallback2 = _interopRequireDefault(_ClickCallback);
	
	var _Brush = __webpack_require__(122);
	
	var _Brush2 = _interopRequireDefault(_Brush);
	
	var _makeInteractive = __webpack_require__(119);
	
	var _makeInteractive2 = _interopRequireDefault(_makeInteractive);
	
	exports.TrendLine = _TrendLine2["default"];
	exports.FibonacciRetracement = _FibonacciRetracement2["default"];
	exports.ClickCallback = _ClickCallback2["default"];
	exports.Brush = _Brush2["default"];
	exports.makeInteractive = _makeInteractive2["default"];

/***/ },
/* 118 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _objectAssign = __webpack_require__(4);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _makeInteractive = __webpack_require__(119);
	
	var _makeInteractive2 = _interopRequireDefault(_makeInteractive);
	
	var _utilsUtilsJs = __webpack_require__(7);
	
	function getYValue(values, currentValue) {
		var diff = values.map(function (each) {
			return each - currentValue;
		}).reduce(function (diff1, diff2) {
			return Math.abs(diff1) < Math.abs(diff2) ? diff1 : diff2;
		});
		return currentValue + diff;
	}
	
	var TrendLine = (function (_React$Component) {
		_inherits(TrendLine, _React$Component);
	
		function TrendLine(props) {
			_classCallCheck(this, TrendLine);
	
			_get(Object.getPrototypeOf(TrendLine.prototype), "constructor", this).call(this, props);
			this.onMousemove = this.onMousemove.bind(this);
			this.onClick = this.onClick.bind(this);
		}
	
		_createClass(TrendLine, [{
			key: "removeIndicator",
			value: function removeIndicator(chartId, xAccessor, interactive) {
				var trends = interactive.trends;
				var start = interactive.start;
	
				if (start) {
					return (0, _objectAssign2["default"])({}, interactive, { start: null });
				} else {
					return (0, _objectAssign2["default"])({}, interactive, { trends: trends.slice(0, trends.length - 1) });
				}
			}
		}, {
			key: "onMousemove",
			value: function onMousemove(chartId, xAccessor, interactive, _ref, e) {
				var mouseXY = _ref.mouseXY;
				var currentItem = _ref.currentItem;
				var currentCharts = _ref.currentCharts;
				var chartData = _ref.chartData;
				var _props = this.props;
				var enabled = _props.enabled;
				var snapTo = _props.snapTo;
				var snap = _props.snap;
				var shouldDisableSnap = _props.shouldDisableSnap;
	
				if (enabled) {
					var yScale = chartData.plot.scales.yScale;
	
					var yValue = snap && !shouldDisableSnap(e) ? getYValue(snapTo(currentItem), yScale.invert(mouseXY[1])) : yScale.invert(mouseXY[1]);
					var xValue = xAccessor(currentItem);
	
					if (interactive.start) {
						return (0, _objectAssign2["default"])({}, interactive, {
							tempEnd: [xValue, yValue],
							currentPos: [xValue, yValue]
						});
					} else {
						return (0, _objectAssign2["default"])({}, interactive, {
							currentPos: [xValue, yValue]
						});
					}
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
				var _props2 = this.props;
				var enabled = _props2.enabled;
				var snapTo = _props2.snapTo;
				var snap = _props2.snap;
				var shouldDisableSnap = _props2.shouldDisableSnap;
	
				if (enabled) {
					var start = interactive.start;
					var trends = interactive.trends;
					var yScale = chartData.plot.scales.yScale;
	
					var yValue = snap && !shouldDisableSnap(e) ? getYValue(snapTo(currentItem), yScale.invert(mouseXY[1])) : yScale.invert(mouseXY[1]);
					var xValue = xAccessor(currentItem);
					if (start) {
						return (0, _objectAssign2["default"])({}, interactive, {
							start: null,
							trends: trends.concat({ start: start, end: [xValue, yValue] })
						});
					} else if (e.button === 0) {
						return (0, _objectAssign2["default"])({}, interactive, {
							start: [xValue, yValue]
						});
					}
				}
				return interactive;
			}
		}, {
			key: "render",
			value: function render() {
				var _props3 = this.props;
				var chartCanvasType = _props3.chartCanvasType;
				var chartData = _props3.chartData;
				var plotData = _props3.plotData;
				var xAccessor = _props3.xAccessor;
				var interactive = _props3.interactive;
				var enabled = _props3.enabled;
	
				if (chartCanvasType !== "svg") return null;
	
				var _chartData$plot$scales = chartData.plot.scales;
				var xScale = _chartData$plot$scales.xScale;
				var yScale = _chartData$plot$scales.yScale;
				var currentPos = interactive.currentPos;
				var _props4 = this.props;
				var currentPositionStroke = _props4.currentPositionStroke;
				var currentPositionStrokeWidth = _props4.currentPositionStrokeWidth;
				var currentPositionOpacity = _props4.currentPositionOpacity;
				var currentPositionRadius = _props4.currentPositionRadius;
				var _props5 = this.props;
				var stroke = _props5.stroke;
				var opacity = _props5.opacity;
	
				var circle = currentPos && enabled ? _react2["default"].createElement("circle", { cx: xScale(currentPos[0]), cy: yScale(currentPos[1]),
					stroke: currentPositionStroke,
					opacity: currentPositionOpacity,
					fill: "none",
					strokeWidth: currentPositionStrokeWidth,
					r: currentPositionRadius }) : null;
	
				var lines = TrendLine.helper(plotData, xAccessor, interactive, chartData);
				return _react2["default"].createElement(
					"g",
					null,
					circle,
					lines.map(function (coords, idx) {
						return _react2["default"].createElement("line", { key: idx, stroke: stroke, opacity: opacity, x1: xScale(coords.x1), y1: yScale(coords.y1),
							x2: xScale(coords.x2), y2: yScale(coords.y2) });
					})
				);
			}
		}]);
	
		return TrendLine;
	})(_react2["default"].Component);
	
	TrendLine.drawOnCanvas = function (context, props, interactive, ctx, _ref3) {
		var plotData = _ref3.plotData;
		var chartData = _ref3.chartData;
		var currentPos = interactive.currentPos;
		var xAccessor = context.xAccessor;
	
		var lines = TrendLine.helper(plotData, xAccessor, interactive, chartData);
	
		var _chartData$plot$scales2 = chartData.plot.scales;
		var xScale = _chartData$plot$scales2.xScale;
		var yScale = _chartData$plot$scales2.yScale;
		var enabled = props.enabled;
		var currentPositionStroke = props.currentPositionStroke;
		var currentPositionStrokeWidth = props.currentPositionStrokeWidth;
		var currentPositionOpacity = props.currentPositionOpacity;
		var currentPositionRadius = props.currentPositionRadius;
	
		if (currentPos && enabled) {
			ctx.strokeStyle = (0, _utilsUtilsJs.hexToRGBA)(currentPositionStroke, currentPositionOpacity);
			ctx.lineWidth = currentPositionStrokeWidth;
			ctx.beginPath();
			ctx.arc(xScale(currentPos[0]), yScale(currentPos[1]), currentPositionRadius, 0, 2 * Math.PI, false);
			ctx.stroke();
		}
		ctx.lineWidth = 1;
		ctx.strokeStyle = (0, _utilsUtilsJs.hexToRGBA)(props.stroke, props.opacity);
	
		lines.forEach(function (each) {
			ctx.beginPath();
			ctx.moveTo(xScale(each.x1), yScale(each.y1));
			ctx.lineTo(xScale(each.x2), yScale(each.y2));
			// console.log(each);
			ctx.stroke();
		});
	};
	
	TrendLine.helper = function (plotData, xAccessor, interactive /* , chartData */) {
		var currentPos = interactive.currentPos;
		var start = interactive.start;
		var trends = interactive.trends;
	
		var temp = trends;
		if (start && currentPos) {
			temp = temp.concat({ start: start, end: currentPos });
		}
		var lines = temp.filter(function (each) {
			return each.start[0] !== each.end[0];
		}).map(function (each) {
			return generateLine(each.start, each.end, xAccessor, plotData);
		});
	
		return lines;
	};
	
	function generateLine(start, end, xAccessor, plotData) {
		/* if (end[0] - start[0] === 0) {
	 	// vertical line
	 	throw new Error("Trendline cannot be a vertical line")
	 } */
		var m /* slope */ = (end[1] - start[1]) / (end[0] - start[0]);
		var b /* y intercept */ = -1 * m * end[0] + end[1];
		// y = m * x + b
		var x1 = xAccessor(plotData[0]);
		var y1 = m * x1 + b;
	
		var x2 = xAccessor(plotData[plotData.length - 1]);
		var y2 = m * x2 + b;
		return { x1: x1, y1: y1, x2: x2, y2: y2 };
	}
	
	TrendLine.propTypes = {
		snap: _react2["default"].PropTypes.bool.isRequired,
		enabled: _react2["default"].PropTypes.bool.isRequired,
		snapTo: _react2["default"].PropTypes.func,
		shouldDisableSnap: _react2["default"].PropTypes.func.isRequired,
		chartCanvasType: _react2["default"].PropTypes.string,
		chartData: _react2["default"].PropTypes.object,
		plotData: _react2["default"].PropTypes.array,
		xAccessor: _react2["default"].PropTypes.func,
		interactive: _react2["default"].PropTypes.object,
		currentPositionStroke: _react2["default"].PropTypes.string,
		currentPositionStrokeWidth: _react2["default"].PropTypes.number,
		currentPositionOpacity: _react2["default"].PropTypes.number,
		currentPositionRadius: _react2["default"].PropTypes.number,
		stroke: _react2["default"].PropTypes.string,
		opacity: _react2["default"].PropTypes.number
	};
	
	TrendLine.defaultProps = {
		stroke: "#000000",
		opacity: 0.7,
		shouldDisableSnap: function shouldDisableSnap(e) {
			return e.button === 2 || e.shiftKey;
		},
		currentPositionStroke: "#000000",
		currentPositionOpacity: 1,
		currentPositionStrokeWidth: 3,
		currentPositionRadius: 4
	};
	
	exports["default"] = (0, _makeInteractive2["default"])(TrendLine, ["click", "mousemove"], { trends: [] });
	module.exports = exports["default"];

/***/ },
/* 119 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _objectAssign = __webpack_require__(4);
	
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
/* 120 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _objectAssign = __webpack_require__(4);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _makeInteractive = __webpack_require__(119);
	
	var _makeInteractive2 = _interopRequireDefault(_makeInteractive);
	
	var _utilsUtilsJs = __webpack_require__(7);
	
	var FibonacciRetracement = (function (_React$Component) {
		_inherits(FibonacciRetracement, _React$Component);
	
		function FibonacciRetracement(props) {
			_classCallCheck(this, FibonacciRetracement);
	
			_get(Object.getPrototypeOf(FibonacciRetracement.prototype), "constructor", this).call(this, props);
			this.onMousemove = this.onMousemove.bind(this);
			this.onClick = this.onClick.bind(this);
		}
	
		_createClass(FibonacciRetracement, [{
			key: "removeIndicator",
			value: function removeIndicator(chartId, xAccessor, interactive) {
				var start = interactive.start;
				var retracements = interactive.retracements;
	
				if (start) {
					return (0, _objectAssign2["default"])({}, interactive, { start: null, tempEnd: null });
				} else {
					return (0, _objectAssign2["default"])({}, interactive, { retracements: retracements.slice(0, retracements.length - 1) });
				}
			}
		}, {
			key: "onMousemove",
			value: function onMousemove(chartId, xAccessor, interactive, _ref /* , e */) {
				var mouseXY = _ref.mouseXY;
				var currentItem = _ref.currentItem;
				var /* currentCharts, */chartData = _ref.chartData;
				var enabled = this.props.enabled;
	
				if (enabled) {
					var yScale = chartData.plot.scales.yScale;
	
					var yValue = yScale.invert(mouseXY[1]);
					var xValue = xAccessor(currentItem);
	
					if (interactive.start) {
						return (0, _objectAssign2["default"])({}, interactive, {
							tempEnd: [xValue, yValue]
						});
					}
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
				var enabled = this.props.enabled;
	
				if (enabled) {
					var start = interactive.start;
					var retracements = interactive.retracements;
					var yScale = chartData.plot.scales.yScale;
	
					var yValue = yScale.invert(mouseXY[1]);
					var xValue = xAccessor(currentItem);
	
					if (start) {
						return (0, _objectAssign2["default"])({}, interactive, {
							start: null,
							tempEnd: null,
							retracements: retracements.concat({ start: start, end: [xValue, yValue] })
						});
					} else if (e.button === 0) {
						return (0, _objectAssign2["default"])({}, interactive, {
							start: [xValue, yValue],
							tempEnd: null
						});
					}
				}
				return interactive;
			}
		}, {
			key: "render",
			value: function render() {
				var _props = this.props;
				var chartCanvasType = _props.chartCanvasType;
				var chartData = _props.chartData;
				var plotData = _props.plotData;
				var xAccessor = _props.xAccessor;
				var interactive = _props.interactive;
				var width = _props.width;
				var _props2 = this.props;
				var stroke = _props2.stroke;
				var opacity = _props2.opacity;
				var fontFamily = _props2.fontFamily;
				var fontSize = _props2.fontSize;
				var fontStroke = _props2.fontStroke;
	
				if (chartCanvasType !== "svg") return null;
	
				var yScale = chartData.plot.scales.yScale;
	
				var retracements = FibonacciRetracement.helper(plotData, xAccessor, interactive, chartData);
	
				return _react2["default"].createElement(
					"g",
					null,
					retracements.map(function (eachRetracement, idx) {
						var dir = eachRetracement[0].y1 > eachRetracement[eachRetracement.length - 1].y1 ? 3 : -1.3;
						return _react2["default"].createElement(
							"g",
							{ key: idx },
							eachRetracement.map(function (line, i) {
								var text = line.y.toFixed(2) + " (" + line.percent.toFixed(2) + "%)";
	
								return _react2["default"].createElement(
									"g",
									{ key: i },
									_react2["default"].createElement("line", {
										x1: 0, y1: yScale(line.y), x2: width, y2: yScale(line.y),
										stroke: stroke, opacity: opacity }),
									_react2["default"].createElement(
										"text",
										{ x: 10, y: yScale(line.y) + dir * 4,
											fontFamily: fontFamily, fontSize: fontSize, fill: fontStroke },
										text
									)
								);
							})
						);
					})
				);
			}
		}]);
	
		return FibonacciRetracement;
	})(_react2["default"].Component);
	
	FibonacciRetracement.drawOnCanvas = function (context, props, interactive, ctx, _ref3) {
		var plotData = _ref3.plotData;
		var chartData = _ref3.chartData;
		var xAccessor = context.xAccessor;
		var width = context.width;
		var yScale = chartData.plot.scales.yScale;
		var fontSize = props.fontSize;
		var fontFamily = props.fontFamily;
		var fontStroke = props.fontStroke;
	
		var lines = FibonacciRetracement.helper(plotData, xAccessor, interactive, chartData);
	
		ctx.strokeStyle = (0, _utilsUtilsJs.hexToRGBA)(props.stroke, props.opacity);
		ctx.font = fontSize + "px " + fontFamily;
		ctx.fillStyle = fontStroke;
	
		lines.forEach(function (retracements) {
			var dir = retracements[0].y1 > retracements[retracements.length - 1].y1 ? 3 : -1.3;
	
			retracements.forEach(function (each) {
				ctx.beginPath();
				ctx.moveTo(0, yScale(each.y));
				ctx.lineTo(width, yScale(each.y));
	
				var text = each.y.toFixed(2) + " (" + each.percent.toFixed(2) + "%)";
				ctx.fillText(text, 10, yScale(each.y) + dir * 4);
	
				ctx.stroke();
			});
		});
	};
	
	FibonacciRetracement.helper = function (plotData, xAccessor, interactive /* , chartData */) {
		var retracements = interactive.retracements;
		var start = interactive.start;
		var tempEnd = interactive.tempEnd;
	
		var temp = retracements;
	
		if (start && tempEnd) {
			temp = temp.concat({ start: start, end: tempEnd });
		}
		var lines = temp.map(function (each) {
			return generateLine(each.start, each.end, xAccessor, plotData);
		});
	
		return lines;
	};
	
	function generateLine(start, end /* , xAccessor, plotData */) {
		var dy = end[1] - start[1];
		return [100, 61.8, 50, 38.2, 23.6, 0].map(function (each) {
			return { percent: each, y: end[1] - each / 100 * dy };
		});
	}
	
	FibonacciRetracement.propTypes = {
		snap: _react2["default"].PropTypes.bool.isRequired,
		enabled: _react2["default"].PropTypes.bool.isRequired,
		snapTo: _react2["default"].PropTypes.func,
		fontFamily: _react2["default"].PropTypes.string.isRequired,
		fontSize: _react2["default"].PropTypes.number.isRequired,
		chartCanvasType: _react2["default"].PropTypes.string,
		chartData: _react2["default"].PropTypes.object,
		plotData: _react2["default"].PropTypes.array,
		xAccessor: _react2["default"].PropTypes.func,
		interactive: _react2["default"].PropTypes.object,
		width: _react2["default"].PropTypes.number,
		stroke: _react2["default"].PropTypes.string,
		opacity: _react2["default"].PropTypes.number,
		fontStroke: _react2["default"].PropTypes.string
	};
	
	FibonacciRetracement.defaultProps = {
		snap: true,
		enabled: true,
		stroke: "#000000",
		opacity: 0.4,
		fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
		fontSize: 10,
		fontStroke: "#000000"
	};
	
	exports["default"] = (0, _makeInteractive2["default"])(FibonacciRetracement, ["click", "mousemove"], { retracements: [] });
	module.exports = exports["default"];

/***/ },
/* 121 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _makeInteractive = __webpack_require__(119);
	
	var _makeInteractive2 = _interopRequireDefault(_makeInteractive);
	
	var ClickCallback = (function (_React$Component) {
		_inherits(ClickCallback, _React$Component);
	
		function ClickCallback(props) {
			_classCallCheck(this, ClickCallback);
	
			_get(Object.getPrototypeOf(ClickCallback.prototype), "constructor", this).call(this, props);
			this.onClick = this.onClick.bind(this);
		}
	
		_createClass(ClickCallback, [{
			key: "onClick",
			value: function onClick(chartId, xAccessor, interactive, _ref /* , e */) {
				var mouseXY = _ref.mouseXY;
				var currentItem = _ref.currentItem;
				var chartData = _ref.chartData;
				var onClick = this.props.onClick;
				var yScale = chartData.plot.scales.yScale;
	
				var yValue = yScale.invert(mouseXY[1]);
				var xValue = xAccessor(currentItem);
				onClick({
					xy: [xValue, yValue],
					mouseXY: mouseXY,
					currentItem: currentItem
				});
				return interactive; // returning the same input to indicate that the state of the chart is not changing
			}
		}, {
			key: "render",
			value: function render() {
				return null;
			}
		}]);
	
		return ClickCallback;
	})(_react2["default"].Component);
	
	ClickCallback.drawOnCanvas = function () {};
	
	ClickCallback.propTypes = {
		onClick: _react2["default"].PropTypes.func.isRequired
	};
	
	ClickCallback.defaultProps = {
		onClick: function onClick(e) {
			console.log(e);
		}
	};
	
	exports["default"] = (0, _makeInteractive2["default"])(ClickCallback, ["click"], {});
	module.exports = exports["default"];

/***/ },
/* 122 */
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
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _objectAssign = __webpack_require__(4);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _makeInteractive = __webpack_require__(119);
	
	var _makeInteractive2 = _interopRequireDefault(_makeInteractive);
	
	var _utilsUtilsJs = __webpack_require__(7);
	
	var Brush = (function (_React$Component) {
		_inherits(Brush, _React$Component);
	
		function Brush(props) {
			_classCallCheck(this, Brush);
	
			_get(Object.getPrototypeOf(Brush.prototype), "constructor", this).call(this, props);
			this.onMousemove = this.onMousemove.bind(this);
			this.onClick = this.onClick.bind(this);
		}
	
		_createClass(Brush, [{
			key: "onMousemove",
			value: function onMousemove(chartId, xAccessor, interactive, _ref /* , e */) {
				var currentItem = _ref.currentItem;
				var chartData = _ref.chartData;
				var mouseXY = _ref.mouseXY;
				var enabled = this.props.enabled;
				var x1 = interactive.x1;
				var y1 = interactive.y1;
	
				if (enabled && (0, _utilsUtilsJs.isDefined)(x1) && (0, _utilsUtilsJs.isDefined)(y1)) {
					var yScale = chartData.plot.scales.yScale;
	
					var x2 = xAccessor(currentItem);
					var y2 = yScale.invert(mouseXY[1]);
	
					return _extends({}, interactive, { x2: x2, y2: y2 });
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
				var type = _props.type;
	
				if (enabled) {
					var x1 = interactive.x1;
					var y1 = interactive.y1;
					var startItem = interactive.startItem;
					var startClick = interactive.startClick;
	
					var yScale = chartData.plot.scales.yScale;
	
					var xValue = xAccessor(currentItem);
					var yValue = yScale.invert(mouseXY[1]);
	
					if (x1) {
						setTimeout(function () {
							if (type === "1D") onBrush([x1, xValue], [startItem, currentItem]);else onBrush({ x1: x1, y1: y1, x2: xValue, y2: yValue }, [interactive.startItem, currentItem], [startClick, mouseXY]);
						}, 20);
						var brushCoords = (0, _objectAssign2["default"])({}, interactive, {
							x1: null, y1: null,
							x2: null, y2: null,
							startItem: null,
							startClick: null
						});
						return brushCoords;
					} else if (e.button === 0) {
						return (0, _objectAssign2["default"])({}, interactive, {
							x1: xValue,
							y1: yValue,
							startItem: currentItem,
							startClick: mouseXY,
							x2: null,
							y2: null
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
				var type = _props3.type;
				var fill = _props3.fill;
				var stroke = _props3.stroke;
				var opacity = _props3.opacity;
	
				if (chartCanvasType !== "svg") return null;
	
				var startX = interactive.startX;
				var tempEndX = interactive.tempEndX;
	
				if (enabled && startX && tempEndX) {
					var brush = [startX, tempEndX];
					var brush = Brush.helper(type, plotData, xAccessor, chartData, brush);
					return _react2["default"].createElement("rect", _extends({}, brush, { fill: fill, stroke: stroke, fillOpacity: opacity }));
				}
				return null;
			}
		}]);
	
		return Brush;
	})(_react2["default"].Component);
	
	Brush.drawOnCanvas = function (context, props, interactive, ctx, _ref3) {
		var plotData = _ref3.plotData;
		var chartData = _ref3.chartData;
		var x1 = interactive.x1;
		var y1 = interactive.y1;
		var x2 = interactive.x2;
		var y2 = interactive.y2;
		var enabled = props.enabled;
		var stroke = props.stroke;
		var opacity = props.opacity;
		var fill = props.fill;
		var type = props.type;
	
		// console.log("DRAWING", enabled, interactive);
		if (enabled && x1 && x2) {
			var xAccessor = context.xAccessor;
	
			var rect = Brush.helper(type, plotData, xAccessor, chartData, { x1: x1, y1: y1, x2: x2, y2: y2 });
	
			ctx.strokeStyle = stroke;
			ctx.fillStyle = (0, _utilsUtilsJs.hexToRGBA)(fill, opacity);
			ctx.beginPath();
			ctx.rect(rect.x, rect.y, rect.width, rect.height);
			ctx.stroke();
			ctx.fill();
		}
	};
	
	Brush.helper = function (type, plotData, xAccessor, chartData, _ref4) {
		var x1 = _ref4.x1;
		var y1 = _ref4.y1;
		var x2 = _ref4.x2;
		var y2 = _ref4.y2;
		var _chartData$plot$scales = chartData.plot.scales;
		var xScale = _chartData$plot$scales.xScale;
		var yScale = _chartData$plot$scales.yScale;
	
		var left = Math.min(x1, x2);
		var right = Math.max(x1, x2);
	
		var top = Math.min(y1, y2);
		var bottom = Math.max(y1, y2);
	
		var x = xScale(left);
		var width = xScale(right) - xScale(left);
	
		var y = type === "1D" ? 0 : yScale(top);
		var height = type === "1D" ? chartData.config.height : yScale(bottom) - yScale(top);
	
		// console.log(chartData);
		return {
			x: x,
			y: y,
			width: width,
			height: height
		};
	};
	
	Brush.propTypes = {
		enabled: _react2["default"].PropTypes.bool.isRequired,
		onBrush: _react2["default"].PropTypes.func.isRequired,
	
		type: _react2["default"].PropTypes.oneOf(["1D", "2D"]),
		chartCanvasType: _react2["default"].PropTypes.string,
		chartData: _react2["default"].PropTypes.object,
		plotData: _react2["default"].PropTypes.array,
		xAccessor: _react2["default"].PropTypes.func,
		interactive: _react2["default"].PropTypes.object,
		stroke: _react2["default"].PropTypes.string,
		fill: _react2["default"].PropTypes.string,
		opacity: _react2["default"].PropTypes.number
	};
	
	Brush.defaultProps = {
		type: "2D",
		stroke: "#000000",
		opacity: 0.3,
		fill: "#3h3h3h",
		onBrush: function onBrush(e) {
			console.log(e);
		}
	};
	
	exports["default"] = (0, _makeInteractive2["default"])(Brush, ["click", "mousemove"], {});
	module.exports = exports["default"];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=GPCCCM_L_CML_react-stockcharts.js.map