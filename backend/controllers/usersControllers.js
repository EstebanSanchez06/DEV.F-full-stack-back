const jwt  = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const registrarUser = asyncHandler(async(req, res) =>{
    const {name, email, password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error(`Faltan datos, favor de modificar`)
    }
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error('Ese usuario ya existe en la DB')
    }else{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        if(user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email:user.email,
                admin: user.esAdmin
            })
        } else{
            res.status(400)
            throw new Error('Usuario no creado')
        }
    }
})
const loginUser = asyncHandler(async(req, res) =>{
    const {email, password} = req.body

    if(!email || !password){
        res.status(400)
        throw new Error ('Faltan datos, favor de verificar')
    }

    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email:user.email,
            admin: user.esAdmin,
            token: generateToken(user.id)
        })
    } else{
        res.status(400)
        throw new Error('Credenciales incorrectas, favor de verificar')
    }
})
const datosUser = asyncHandler(async(req, res) =>{
    res.status(201).json(req.user)
})

//generamos el JWT
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}
module.exports = {
    registrarUser,
    loginUser,
    datosUser
}