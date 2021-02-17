const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.send('Hello Coy Jennings!');
})

app.listen(port, () => {
    console.log(`boiler-plate Running at ${port}`);
})