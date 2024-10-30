const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/school', {
    
}).then(() => {
    console.log("Connected to MongoDB...");
}).catch(err => {
    console.error("Error connecting to MongoDB: ", err);
});

const userSchema = new mongoose.Schema({
    name: String,
    last: String,
    email: String,
    phone: Number,
    date: Date,  
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    find: [{
        type: String,
        enum: ['a', 'b', 'c', 'd']
    }],
    club_type: [{
        type: String,
        enum: ['sports', 'arts', 'culture', 'music', 'literature']
    }]
});

module.exports = mongoose.model('User', userSchema);
