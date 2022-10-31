const express = require('express')
const bodyparser = require('body-parser');

var routes = require('./routes');
const { pgClient } = require('./clients');


const app = express()

const port = 5005

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
app.use(bodyparser.json());
routes(app);
pgClient.initialize();

