const { URL } = require('./env');
const mongoose = require('mongoose');
async function connectDB() {
    try {
       await mongoose.connect(URL,{dbName:'hospitalManagement'})
        console.log('connection to DB successfull');
    } catch (error) {
        console.log('Error connection to DB');
        process.exit(); // global objet is created whenever any node project is going to start if any error occure it will stop the server
    }
}
mongoose.set('strictQuery', false);

module.exports = connectDB; //above function can we use anywhere by exporting 
