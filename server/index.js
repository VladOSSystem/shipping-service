const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// import routes
const Auth = require('./router/API/Auth');
const Listing = require('./router/API/Listing');
// DB connection
const dbConnection = require('./db/connect');
const port = process.env.PORT || 3000

dbConnection();
// middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('hello world');
});

app.use('/api/auth', Auth);
app.use('/api/users', Listing);
app.use('*', (req, res) => {
    res.status(404).send('Request error!')
});

app.listen(port, () => {
    console.log(`App listening on the port: ${port}`)
})