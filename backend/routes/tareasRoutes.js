const express = require('express')
const router= express.Router()
const {readTareas, createTareas, updateTareas, deleteTareas} = require('../controllers/tareasController')
const protect = require('../middlewares/authMiddleware')

router.get('/',protect, readTareas)

router.post('/',protect,createTareas)

router.put('/:id', protect,updateTareas)

router.delete('/:id',protect ,deleteTareas)

module.exports = router