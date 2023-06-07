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


// Get Car by ID
// app.get('/car/:carId', cors(corsOptions), async (req, res) =>{
//     const carId = req.params.carId;
//     const SELECT_CAR = "select * from car where car_id = ?"
//     const results = await promisePool.query(SELECT_CAR , [carId]);
//     console.log(results[0])
//     res.send(results[0])
// })
   
// Get Car Make
// app.get('/car/:make', cors(corsOptions), async (req, res) =>{
//     const make   = req.params.make;
//     const SELECT_CAR_BY_MAKE = "SELECT * from car WHERE make = ?"
//     const results = await promisePool.query(SELECT_CAR_BY_MAKE, [make]);
//     console.log(results[0])
//     res.send(results[0])
// })

// Post Car
// app.post('/car', cors(corsOptions), async (req, res) =>{
//     const { make, model, color, price } = req.body;
//     const INSERT_CAR = 'INSERT INTO car (make, model, color, price) VALUES (?, ?, ?, ?)';
//     const results = await promisePool.query(INSERT_CAR, [make, model, color, price]);
//     console.log(results[0])
//     res.send(results[0])
// })

// Put Car
app.put('/car', cors(corsOptions), async (req, res) =>{
    const { make, model, color, price, carId } = req.body;
    const UPDATE_CAR = "update car set make = ?, model = ?, color = ?, price = ? where car_id = ?";
    const results = await promisePool.query(UPDATE_CAR, [make, model, color, price, carId]);
    console.log(results[0])
    res.send(results[0])
})


app.listen(PORT, () => {
    console.log(`Express web API running on port: ${PORT}.`)
})
