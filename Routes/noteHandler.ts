import express from "express";
import {noteSchema} from '../Helper/schemaValidation'
import noteModel from "../Model/noteModel";
import commentModel from "../Model/commentModel"
import createError from "http-errors"
import jwt from '../Helper/jwtHelper'
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const router = express.Router();



// add new note
router.post('/add', jwt.verifyAccessToken,  async(req, res, next) => {
    try {
        const result = await noteSchema.validateAsync(req.body)
        const userId = req.headers.userId

        // console.log({...result, userId})

        const note = new noteModel({...result, userId, public: true})
        const finalNotes = await note.save()
        res.status(201).json(finalNotes)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

// send all note with the userId
router.get('/all', jwt.verifyAccessToken,  async(req, res, next) => {
    try {
        const userId = req.headers.userId
        const userNotes = await noteModel.find({userId})
        res.status(200).json(userNotes)
    } catch (error) {
        next(error)
    }
})

// update the node
router.patch('/:id', jwt.verifyAccessToken,  async(req, res, next) => {
    try {
        console.log(req.body)
        const noteId = req.params.id
        const userNotes = await noteModel.findByIdAndUpdate({_id: noteId}, {$set: req.body})
        res.status(200).json(userNotes)
    } catch (error) {
        next(error)
    }
})

// delete the note
router.delete('/:id', jwt.verifyAccessToken,  async(req, res, next) => {
    try {
        const noteId = req.params.id
        if (!mongoose.isValidObjectId(noteId)) {
            console.log("invalid")
            return res.status(400).json({ error: 'Invalid noteId format' });
        }
        const userNotes = await noteModel.findByIdAndDelete(noteId)
        console.log(userNotes)
        console.log(userNotes)
        res.status(200).json(userNotes)
    } catch (error) {
        next(error)
    }
})


// 
router.get('/public/:id', async(req, res, next) => {
    try {
        // console.log(req.params.id) 
        const noteId = req.params.id   
        const notes = await noteModel.findById(noteId)
        console.log(notes)
        if(notes && notes.public){
            res.render('postCommentPage', {
                notes
            })
        }
        else{
            res.send('<h1>Unautherized to view the note</h1>')
        }
        
    } catch (error) {
        next(error)
    }
})


export = router;

