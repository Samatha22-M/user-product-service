const express = require('express')
const bodyparser = require('body-parser');
const errors = require('./errors');
var routes = require('./routes');
const { pgClient } = require('./clients');


const app = express()

const port = 5000


app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})

const handleError = function (err, req, res, next) {
    if (err instanceof SyntaxError) {
        err = new errors.ValidationError('Invalid JSON');
    }
    console.error("ERROR:", err.stack);
    return errorHandler(err, req, res, next);
};
app.use(bodyparser.json());
routes(app);
pgClient.initialize();
app.use('/', handleError);

