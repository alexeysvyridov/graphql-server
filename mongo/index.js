const UserSchema = require('../model/User');
const mongoose = require('mongoose');
 mongoose.connect('mongodb+srv://alexey:Alexeysvyridov!@cluster0.sh58f9y.mongodb.net/graphql-proj' , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let db = mongoose.connection;
db.on('error', () => {
    console.error("Error while connecting to DB");
});

const Users = mongoose.model('User', UserSchema);

module.exports = Users