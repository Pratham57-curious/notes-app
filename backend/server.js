const express = require('express');
const app = express();

const PORT = 5000;

app.get('/', (req, res) => {
    res.send('Soo this is the Backend!');
});

app.listen(PORT, () => {
    console.log('Server is there on http://localhost:${PORT}');
});