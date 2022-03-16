require('dotenv').config()

const express = require('express')
const app = express()
const mongo = require('mongoose')
const port = 4000 || process.env.PORT;


const db = mongo.connection
db.on('error', (error) => console.log(error))
db.once('open', () => {console.log("connected to database")})


app.use(express.json())


const subsRouter = require('./routes/subscribers')
app.use('/subscribers', subsRouter)


mongo.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
.then(() => {
    app.listen(port, (error) => {
        !error?
        console.log(`The server has started on port ${port}`)
        :
        null; 
    })
})
.catch(error => {throw new Error("Could not connect to database")})