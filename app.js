require('dotenv').config()
require('express-async-errors')
const express = require('express')

const app = express()

const connectDB = require("./db/connect")
const productsRouter = require("./routes/products")
const noteFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

//middleware

app.use(express.json())

//rootes

app.get('/',(req,res)=>{
    res.send('<h1>Store Api</h1><a href="/api/v1/products">productes route</a>')
})

app.use('/api/v1/products',productsRouter)
//product route

app.use(noteFoundMiddleware)
app.use(errorMiddleware)

port = 3000
const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening to port ${port}`))
    }catch(err){

    }
}
start()