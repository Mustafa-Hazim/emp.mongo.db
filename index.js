import env from 'dotenv'
env.config()

import express from 'express'
const app = express()

import bodyParser from 'body-parser'
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

import mongoose from 'mongoose'
const uri = 'mongodb+srv://mustafa:'+process.env.DB_PASSWORD+'@mongo.ywgqlip.mongodb.net/employees?retryWrites=true&w=majority'

import router from './routes/index.js'

try {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('connected to the database');
} catch (error) {
    console.log(error);
}

const arr = [1, 2, 3]
const arr2 = [5,6,7]

arr2.forEach(e => arr.push(e))

console.log(arr)

app.use('/users', router)

app.listen(4000, (err) => {
    if(err) console.log(err)
    else console.log('server running at: 192.168.178.22:4000')
})