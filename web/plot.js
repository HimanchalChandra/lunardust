const numData = 100;

function randDust(){return Math.random()};
function randTemp(){return (Math.random() * 20) + 20};
function randHumid(){return Math.random() * 100};

$("#g1").empty();
$("#g2").empty();
$("#g3").empty();
$("#g4").empty();

function setRand(type, mode, num){
	if(mode == "p"){
		var d, l;
		var x = [];
		var y = [];
		var label;
		for(var i=0; i<num; i++){
			if(type == "dust"){
				y.push(randDust());
			}else if(type =="temp"){
				y.push(randTemp());
			}else if(type =="humid"){
				y.push(randHumid());
			}else{
				y.push(0);
			}
			x.push(i);
		}
		d = [{
			x: x,
			y: y,
			type: "scatter",
			fill: "tozeroy",
			fillcolor: "#ffb73b",
			line: {
				color: "#ffb73b"
			}
		}];
		if(type == "dust"){
			label = "Dust Concentration (mg/cm^3)";
		}else if(type == "temp"){
			label = "Temperature (degrees Celsius)";
		}else if(type == "humid"){
			label = "Humidity (percentage)";
		}else{
			label = "Unknown metric";
		}
		l = {
			autosize: true,
			height: 325,
			margin: {
				l: 50,
				r: 25,
				t: 25,
				b: 25
			},
			xaxis: {
				title: "Time"
			},
			yaxis: {
				title: label
			}
		};
	}else if(mode == "a"){
		var d, l;
		var x = [];
		var y = [];
		var label;
		var a = false;
		for(var i=0; i<num; i++){
			if(i % 15 == 0){
				a = !a;
			}
			if(a){
				if(type == "dust"){
					y.push(randDust());
				}else if(type =="temp"){
					y.push(randTemp());
				}else if(type == "humid"){
					y.push(randHumid());
				}else{
					y.push(0);
				}
			}else{
				y.push(0);	
			}	
			x.push(i); 
		}
		d = [{
			x: x,
			y: y,
			type: "scatter",
			fill: "tozeroy",
			fillcolor: "#ff443b",
			line: {
				color: "#ff443b"
			}
		}];
		if(type == "dust"){
			label = "Dust Concentration (mg/cm^3)";
		}else if(type == "temp"){
			label = "Temperature (degrees Celsius)";
		}else if(type == "humid"){
			label = "Humidity (percentage)";
		}else{
			label = "Unknown metric";
		}
		l = {
			autosize: true,
			height: 325,
			margin: {
				l: 50,
				r: 25,
				t: 25,
				b: 25
			},
			xaxis: {
				title: "Time"
			},
			yaxis: {
				title: label
			}
		};
	}else{
		console.log("Unknown mode! Use 'p' or 'a'");
	}
	return {
		d: d,
		l: l
	};
}
g1dust = setRand("dust", "a", numData);
g2dust = setRand("dust", "p", numData);
g3dust = setRand("dust", "a", numData);
g4dust = setRand("dust", "p", numData);
g1temp = setRand("temp", "a", numData);
g2temp = setRand("temp", "p", numData);
g3temp = setRand("temp", "a", numData);
g4temp = setRand("temp", "p", numData);
g1humid = setRand("humid", "a", numData);
g2humid = setRand("humid", "p", numData);
g3humid = setRand("humid", "a", numData);
g4humid = setRand("humid", "p", numData);

var p1 = Plotly.newPlot("g1", g1dust["d"], g1dust["l"], {staticPlot: true});
var p2 = Plotly.newPlot("g2", g2dust["d"], g2dust["l"], {staticPlot: true});
var p3 = Plotly.newPlot("g3", g3dust["d"], g3dust["l"], {staticPlot: true});
var p4 = Plotly.newPlot("g4", g4dust["d"], g4dust["l"], {staticPlot: true});

$("#g1-h").click(function(){
	Plotly.react("g1", g1humid["d"], g1humid["l"], {staticPlot: true});
});
$("#g1-t").click(function(){
	Plotly.react("g1", g1temp["d"], g1temp["l"], {staticPlot: true});
});
$("#g1-d").click(function(){
	Plotly.react("g1", g1dust["d"], g1dust["l"], {staticPlot: true});
});
$("#g2-h").click(function(){
	Plotly.react("g2", g2humid["d"], g2humid["l"], {staticPlot: true});
});
$("#g2-t").click(function(){
	Plotly.react("g2", g2temp["d"], g2temp["l"], {staticPlot: true});
});
$("#g2-d").click(function(){
	Plotly.react("g2", g2dust["d"], g2dust["l"], {staticPlot: true});
});
$("#g3-h").click(function(){
	Plotly.react("g3", g3humid["d"], g3humid["l"], {staticPlot: true});
});
$("#g3-t").click(function(){
	Plotly.react("g3", g3temp["d"], g3temp["l"], {staticPlot: true});
});
$("#g3-d").click(function(){
	Plotly.react("g3", g3dust["d"], g3dust["l"], {staticPlot: true});
});
$("#g4-h").click(function(){
	Plotly.react("g4", g4humid["d"], g4humid["l"], {staticPlot: true});
});
$("#g4-t").click(function(){
	Plotly.react("g4", g4temp["d"], g4temp["l"], {staticPlot: true});
});
$("#g4-d").click(function(){
	Plotly.react("g4", g4dust["d"], g4dust["l"], {staticPlot: true});
});
