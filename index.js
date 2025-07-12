const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3000;
const { initDB } = require('./helpers/db')
const routes = require('./routes/index')

app.use(bodyParser.json());

initDB();

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})