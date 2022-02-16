const express = require('express');
const app = express();

const mongoose = require('mongoose');
const {
	MONGO_USER,
	MONGO_PASSWORD,
	MONGO_IP,
	MONGO_PORT,
} = require('./config');

const postRouter = require('./routes/post.routes');
const userRouter = require('./routes/user.routes');

const connectionUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const connectionConfiguration = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

// Connect to database until works
const connectWithRetry = () =>
	mongoose
		.connect(connectionUrl, connectionConfiguration)
		.then(() => console.log('Successfully conected to Data Base'))
		.catch(error => {
			console.log(`Error connecting to database: ${error}`);
			setTimeout(() => connectWithRetry(), 5000);
		});

app.use(express.json());

connectWithRetry();

app.get('/', (req, res) => {
	res.send('<h1>Testing This thing<h1>');
});

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`App running on port ${port}`));
