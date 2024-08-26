const mongoose  = require('mongoose')

const db = ()=>{
    mongoose.connect(process.env.DB);

    mongoose.connection.on('connected', () => {
        console.log('DB is running');
    });
}
module.exports = db