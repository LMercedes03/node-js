const cors = require('cors')
const express = require('express')
const promisePool = require('./PromisePool.js').promisePool
const MySqlProxy = require('./mySqlProxy.js')
const { body, check, param, validationResult } = require('express-validator')

const PORT = 80
const app = express()
const corsOptions = { origin: ['http://localhost:3000'], optionsSuccessStatus: 200 }

// Middleware...
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Your endpoints here..

// Get Message
app.get('/message', cors(corsOptions), async (req, res) => {
    res.send({message: 'Hello World!!!'})
    })


// Get Car
app.get('/car/:carId', cors(corsOptions), async (req, res) =>{
    const { carId } = req.params;
    // const SELECT_CAR = "select * from car where car_id = ?"
    const results = await promisePool.query("select * from car where car_id = ?", [carId]);
    console.log(results[0])
    res.send(results[0])
})
   

app.listen(PORT, () => {
    console.log(`Express web API running on port: ${PORT}.`)
})
