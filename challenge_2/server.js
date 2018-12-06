const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();


const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.listen(port, () => console.log(`Mini-app 2 listening on port ${port}`))
