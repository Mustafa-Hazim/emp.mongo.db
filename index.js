import express from 'express'
const app = express()







app.listen(4000, (err) => {
    if(err) console.log(err)
    else console.log('server running at: 192.168.178.22:4000')
})