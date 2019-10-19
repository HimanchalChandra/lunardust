const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send("Test");
});



// listens to app engine specified port, or num port in field
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log("Server listening on port ${PORT}...");
});
