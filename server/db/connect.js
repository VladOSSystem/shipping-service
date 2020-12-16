const mongoose = require('mongoose');
const keys = require('../config/keys');
const dbConnection = () => {
    const db = keys.mongoURI;
    mongoose
        .connect(
            db,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true, 
                useCreateIndex: true
            }
        )
        .then(() => console.log("Mongo connected"))
        .catch((err) => console.log(err));

}
module.exports = dbConnection;