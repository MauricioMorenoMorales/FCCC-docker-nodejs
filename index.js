const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send('<h1>Testing This thing<h1>');
});

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`App running on port ${port}`));
