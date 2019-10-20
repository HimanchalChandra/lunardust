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
d1 = [{}];
d2 = [{}];
d3 = [{}];
d4 = [{}];

function randDust();

for(var i; i<100; i++){
	var a = false;
	var y = [];
	if(i % 15 == 0){
		a = !a;
	}
	d2.append();
	d4.append();
	if(a){
		d1.append();
		d3.append();		
	}
	y.append(i);
}

//

var p1 = Plotly.newPlot("g1", d1, l1, {staticPlot: true});
var p2 = Plotly.newPlot("g2", d2, l2, {staticPlot: true});
var p3 = Plotly.newPlot("g3", d3, l3, {staticPlot: true});
var p4 = Plotly.newPlot("g4", d4, l4, {staticPlot: true});

window.onresize = function(){
	Plotly.plots.resize(p1);
	Plotly.plots.resize(p2);
	Plotly.plots.resize(p3);
	Plotly.plots.resize(p4);
};
