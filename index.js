const express = require('express');
const app = express();

const mongoose = require('mongoose');
const {
	MONGO_USER,
	MONGO_PASSWORD,
	MONGO_IP,
	MONGO_PORT,
} = require('./config');

const connectionUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const connectionConfiguration = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

// Connect to database until works
(() =>
	mongoose
		.connect(connectionUrl, connectionConfiguration)
		.then(() => console.log('Successfully conected to Data Base'))
		.catch(error => {
			console.log(`Error connecting to database: ${error}`);
			setTimeout(() => connectWithRetry(), 5000);
		}))();

app.get('/', (req, res) => {
	res.send('<h1>Testing This thing<h1>');
});

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`App running on port ${port}`));
