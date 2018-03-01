const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongo = require('./mongodb')
const router = require('./routes')

const port = 4040;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(router);

mongo.connect('mongodb://localhost:27017/project')
    .then(() => app.listen(port))
    .then(() => console.log(`I guess it works on ${port}`))
    .catch(err => {
        console.error(err);
        process.exit(1);
    })

