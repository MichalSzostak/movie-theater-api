const express = require('express');
const app = express();
const router = require('./routes/router');
app.use('/', router);


const port = 3000;
app.listen(port, () => console.log(`Example app listening on  https://localhost/${port}/ !`))