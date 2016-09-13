

import ReStock from 'react-stockcharts';
import React, { Component, PropTypes } from 'react';
var { wrap } =  ReStock.series;

class ScatterLineSeries extends Component {
    render() {
        var { props } = this;

        // The following are available from props

        // plotData is an array containing the points to be displayed on the screen. This is not the same as the data
        //      you provided as input. It is most likely smaller in size since it contains a filtered list of items 
        //      which are to be displayed for the domain of xScale

        // The x & y Accessor are used to get the x & y value for each element in the plotData

        // The x & y Scale can be used to get the value in pixels for a x, y value

        var { xAccessor, yAccessor, xScale, yScale, plotData } = props;


        // In the event there is a CompareSeries in that Chart this is available
        // TODO explain more about compare series and why it is special

        var { compareSeries } = props;

        // indicator is available if you have used one on the DataSeries surrounding this Series
        // Read more on how to write an indicator in the "Custom - Create indicator" section

        var { indicator } = props;

        // this is available if there is a stroke / fill defined in the DataSeries surrounding this Series
        //      or the stroke / fill defined in the indicator above

        var { stroke, fill } = props;

        // type is the value you have provided at the ChartCanvas, it can be "svg" or "hybrid"
        // height and width of this Chart

        var { type, height, width } = props;

        // In addition to the above, any props you define when using this component are also available.
        // If say you create a prop called xAccessor, this will override the xAccessor provided by react-stockcharts

        return <div/>; /* return an svg element */
    }
}

var getDrawDotFunction = (shape) => {
	
	let drawFunction = (ctx , x, y) => undefined;
	
	if (shape == "circle"){
		drawFunction = (ctx , x, y) => {
	    ctx.moveTo(x,y);
		ctx.arc(x, y, 1, 0, 2 * Math.PI, false);
		}
		//ctx.fill();//FILL = HUGE PERF DROP
	}
	else if (shape == "triangle")  {
		drawFunction = (ctx , x, y) => {
	    ctx.moveTo(x,y);
	    ctx.lineTo(x+3,y+3);
	    ctx.lineTo(x+3,y-3);
	    ctx.lineTo(x,y);
		}
	}
	else if (shape == "square") {
		drawFunction = (ctx , x, y) =>{
			ctx.moveTo(x+2,y+2);
			ctx.lineTo(x+2,y-2);
			ctx.lineTo(x-2,y-2);
			ctx.lineTo(x-2,y+2);
			ctx.lineTo(x+2,y+2);
		    ctx.moveTo(x,y);
		}
	}
	return drawFunction;
}
ScatterLineSeries.drawOnCanvas = (props, ctx, xScale, yScale, plotData) => {
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
	
	let drawDotFunction = getDrawDotFunction(pointsStyle);
	

	//init
	ctx.strokeStyle = stroke;
	ctx.lineWidth = props.lineWidth;
	ctx.beginPath();
	
	if (lineStyle == "dashed"){
		ctx.setLineDash([5]);
	}
	plotData.forEach(function (d, i) {
        //MODIFICATION : IF Y UNDEFINED , DONT "LIFT THE PENCIL"

		if (yAccessor(d) === undefined) {
			return;
		} else {
			var x = (xScale(xAccessor(d)));
			var y = (yScale(props.toNumber(yAccessor(d))));

                //MODIFICATION : IF Y UNDEFINED , DONT "LIFT THE PENCIL"	      
			
			let localColor = localColorAccessor(xAccessor(d));
		
			if (lineStyle == "continuous" || lineStyle == "dashed"){
				ctx.lineTo(xScale(xAccessor(d)), yScale(yAccessor(d)));
			}
			
			
			//LOCAL COLOR STUFF
			if (localColor != undefined && currentColor != localColor){
				ctx.stroke();
				ctx.strokeStyle = localColor;
				currentColor = localColor;
				ctx.beginPath();
				begin = true;
			}
			else if (localColor == undefined && currentColor != stroke){
				ctx.stroke();
				ctx.strokeStyle = stroke;
				currentColor = stroke;
				ctx.beginPath();
				begin = true;
			}
			//END OF LOCAL COLOR
			
			
			if (lineStyle == "continuous" || lineStyle == "dashed"){
				
				if (begin){
					var tx = ~ ~(0.5 + x);
					var ty = ~ ~(0.5 + y);
					ctx.moveTo(tx, ty);
					begin = false;
				}
			}

			drawDotFunction(ctx,x,y);
//		    ctx.moveTo(x,y);
		}
	});
	ctx.stroke();
};

//clip: React.PropTypes.bool.isRequired,
ScatterLineSeries.defaultProps = {
		lineStyle : "continuous",
		pointsStyle : undefined,
		lineWidth : 1,
		toNumber : id => id, //by default, identity function.
		localColorAccessor : x => undefined
};



// This is very important. You need to wrap your series, so ReStock knows to provide these props
window.ScatterLineSeries = wrap(ScatterLineSeries);
