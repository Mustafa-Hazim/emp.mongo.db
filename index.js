import env from 'dotenv'
env.config()

import express from 'express'
const app = express()
const uri = 'mongodb+srv://mustafa:'+process.env.DB_PASSWORD+'@mongo.ywgqlip.mongodb.net/employees?retryWrites=true&w=majority'

import mongoose from 'mongoose'

try {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('connected to the database');
} catch (error) {
    console.log(error);
}

app.listen(4000, (err) => {
    if(err) console.log(err)
    else console.log('server running at: 192.168.178.22:4000')
})