const mongoose = require('mongoose');
const mongooseTimeStamp = require('mongoose-timestamp');


const Schema = new mongoose.Schema({
    fname: { type: String, required: true},
    lname: { type: String, required: true},
    email: { type: String, required: true},
    country: { type: String, required: true},
    jobTitle: { type: String, required: true},
    birthDay: { type: Date, required: true},
    rigesterdSince: { type: Date, required: true},
    avatar: {type: String},
    salary: {type: Number, required: true},
});

// attach mongoose Time stamp
Schema.plugin(mongooseTimeStamp);
// create model 
export const Employe = mongoose.model('Employe', Schema);
