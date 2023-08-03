require('dotenv').config();
const mongoose = require('mongoose')
//const mongoURI = 'mongodb://localhost:27017/e-comm' 
 //const mongoURI = process.env.MongoURL
const mongoURI = process.env.DATABASE
module.exports = function (callback) {
    mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("---" + err)
        else {
            console.log("connected to mongo")
            const foodCollection = await mongoose.connection.db.collection("gap");
            foodCollection.find({}).toArray(async function (err, data) {
                    callback(err, data);
            });
        }
    })
};

// 1. using DB name for setting mongodb connection
// 2. For DB details which are static mention that collection here and it will be passed as "Data"