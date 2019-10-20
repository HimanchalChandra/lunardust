var d1 = {};
var l1 = {};
var d2 = {};
var l2 = {};
var d3 = {};
var l3 = {};
var d4 = {};
var l4 = {};


$("#g1").empty();
$("#g2").empty();
$("#g3").empty();
$("#g4").empty();

d1 = [{
	x: [1,2,3,4,5,6,7,8],
	y: [1,2,3,4,5,6,7,8],
	type: "scatter"
}];
l1 = {
    autosize: true,
    height: 325,
    margin: {
        l: 25,
        r: 25,
        t: 25,
        b: 25
    }
};

d2 = [{
	x: [1,2,3,4,5,6,7,8],
	y: [2,4,6,8,10,12,14,16],
	type: "scatter"
}];
l2 = {
    autosize: true,
    height: 325,
    margin: {
        l: 25,
        r: 25,
        t: 25,
        b: 25
    }
};
d3 = [{
	x: [1,2,3,4,5,6,7,8],
	y: [3,6,9,12,15,18,21,24],
	type: "scatter"	
}];
l3 = {
    autosize: true,
    height: 325,
    margin: {
        l: 25,
        r: 25,
        t: 25,
        b: 25
    }
};
d4 = [{
	x: [1,2,3,4,5,6,7,8],
	y: [4,8,12,16,20,24,28,32],
	type: "scatter"
}];
l4 = {
	autosize: true,
	height: 325,
	margin: {
		l: 25,
		r: 25,
		t: 25,
		b: 25
	}
};

// random data code
		
d1y = [];
d2y = [];
d3y = [];
d4y = [];
x = [];
a = false;

function randDust(){return Math.random()};
function randTemp(){return (Math.random() * 20) + 20};
function randHumid(){return Math.random() * 100};

for(var i = 0; i<100; i++){
	if(i % 15 == 0){
		a = !a;
	}
	d2y.push(randTemp());
	d4y.push(randTemp());
	if(a){
		d1y.push(randTemp());
		d3y.push(randTemp());		
	}else{
		d1y.push(0);
		d3y.push(0);
	}
	x.push(i);
}

d1 = [{
	x: x,
	y: d1y,
	type: "scatter" 
}];
d2 = [{
	x: x,
	y: d2y,
	type: "scatter"
}];
d3 = [{
	x: x,
	y: d3y,
	type: "scatter"
}];
d4 = [{
	x: x,
	y: d4y,
	type: "scatter"
}];
/*
l1.xaxis = {title: "}
l1.yaxis = {title: "Temp (deg C)"};
l2.yaxis
*/
//


var p1 = Plotly.newPlot("g1", d1, l1, {staticPlot: true});
var p2 = Plotly.newPlot("g2", d2, l2, {staticPlot: true});
var p3 = Plotly.newPlot("g3", d3, l3, {staticPlot: true});
var p4 = Plotly.newPlot("g4", d4, l4, {staticPlot: true});

window.onresize = function(){
	Plotly.Plots.resize(p1);
	Plotly.Plots.resize(p2);
	Plotly.Plots.resize(p3);
	Plotly.Plots.resize(p4);
};
