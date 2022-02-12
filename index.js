const express = require('express');
const app = express();

const mongoose = require('mongoose');

mongoose
	.connect('mongodb://sanjeev:mypassword@mongo:27017/?authSource=admin')
	.then(() => console.log('Successfully conected to Data Base'))
	.catch(error => console.log(error));

app.get('/', (req, res) => {
	res.send('<h1>Testing This thing<h1>');
});

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`App running on port ${port}`));
