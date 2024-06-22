import { Router } from "express";
import { createNote, getOneNote, getAllNotes, updateNote, deleteNote } from "../controllers/notes.controller";
import bodyParser from 'body-parser'

const route = Router();
route.use(bodyParser.json())

route.post('/new', createNote);
route.get('/all', getAllNotes)
route.get('/one/:id', getOneNote)
route.put('/update/:id', updateNote)
route.delete('/delete/:id', deleteNote)

export default route;