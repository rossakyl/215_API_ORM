const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./models');
app.use(express.json());
app.use(express.urlencoded({
     extended: false
}));

app.listen(PORT, () => {
    console.log('server started on port 3000');
});