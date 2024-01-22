const express = require('express')
const router = express.Router()
const {registrarUser, loginUser, datosUser} = require('../controllers/usersControllers')
const protect = require('../middlewares/authMiddleware')
router.post('/', registrarUser)
router.post('/login', loginUser)
router.get('/datos',protect,  datosUser)


module.exports = router
