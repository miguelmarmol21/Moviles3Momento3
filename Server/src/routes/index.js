const express = require("express");
const router = express.Router();
const userSchema = require('../models/user');
const carSchema = require('../models/car');
const rentSchema = require('../models/rent');

var cors = require('cors')

// Middleware
router.use(cors());

router.get('/',(req, res)=>{
    res.send("Hola, desde API REST")
})

 // Agregar user
 router.post('/users',cors(),(req, res)=>{
    const user = userSchema(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((error) =>res.json({message: error}))
})

// Recuperar todos los users
router.get('/users',cors(),(req, res)=>{
    userSchema
         .find()
         .then((data) => res.json(data))
         .catch((error) =>res.json({message: error}))
 })

 // Recuperar user por id
router.get('/users/:id',cors(),(req, res)=>{
    const { id } = req.params;
    userSchema
         .findById(id)
         .then((data) => res.json(data))
         .catch((error) =>res.json({message: error}))
 })

// Agregar carro
 router.post('/car',cors(),(req, res)=>{
    const car = carSchema(req.body);
    car
        .save()
        .then((data) => res.json(data))
        .catch((error) =>res.json({message: error}))
})

// Agregar renta
router.post('/rent',cors(),(req, res)=>{
    const rent = rentSchema(req.body);
    rent
        .save()
        .then((data) => res.json(data))
        .catch((error) =>res.json({message: error}))
})

// Buscar las rentas
router.get('/rent',cors(),(req, res)=>{
    rentSchema
         .find()
         .then((data) => res.json(data))
         .catch((error) =>res.json({message: error}))
 })

module.exports = router;
