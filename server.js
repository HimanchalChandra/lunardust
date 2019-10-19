const express = require('express');
const app = express();
const broker = "mqtt://mqtt.eclipse.org";
const topic = "esp2866";
const mqtt = require('mqtt');
const client = mqtt.connect(broker);



client.on("connect", function() {
	client.subscribe(topic, function(err){
		if(!err){
			console.log("Subscribed to '" + topic + "' with broker '" 
						+ broker + "'.");
		}
	});
});



client.on("message", function (topic, message) {
	console.log("Received: " + message.toString());
});
app
	.use(express.static(__dirname + "/web"));

// listens to app engine specified port, or num port in field
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log("Server listening on port " + PORT + "...");
});
