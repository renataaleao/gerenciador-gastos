const express = require('express')
const router = express.Router()

const gastosController = require('../controllers/gastoController')

gastosController(router)
module.exports = router