const asyncHandler = require('express-async-handler')
const Tarea = require('../models/tareaModel')

const readTareas = asyncHandler(async (req, res) => {
    const tareas = await Tarea.find()
    res.status(200).json({  
        tareas
    })
})
const createTareas = asyncHandler(async (req, res) =>{
    if(!req.body.texto){
        res.status(400)
        throw new Error('No escribiste una descripcion')
    }
        const tarea = await Tarea.create({
            texto: req.body.texto,
            user: req.user._id
        })
        res.status(201).json({
            tarea
     })
})
const updateTareas = asyncHandler(async (req, res) =>{
    const tarea = await Tarea.findById(req.params.id)
    if(!tarea){
        res.status(400)
        throw new Error ('Tarea no encontrada')
    }

    if(tarea.user.toString() !== req.user.id){
        res.status(401)
        throw new Error ('Acceso no autorizada')
    } else{
        const updatedTarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.status(201).json(updatedTarea)
    }
})

const deleteTareas = asyncHandler(async (req,res) =>{
    const tarea = await Tarea.findById(req.params.id)
    if(!tarea){
        res.status(400)
        throw new Error ('Tarea no encontrada')
    }
    
    if(tarea.user.toString() !== req.user.id){
        res.status(401)
        throw new Error ('Acceso no autorizada')
    } else{
        const deletedTarea = await Tarea.findByIdAndDelete(req.params.id)
        res.status(204).json({id: req.params.id})
        
    }})
module.exports = {
    readTareas,
    createTareas,
    updateTareas,
    deleteTareas
}