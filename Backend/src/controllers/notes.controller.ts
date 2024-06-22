import { Request, Response } from "express";
import NotesService from "../services/notes.service";

const noteService = new NotesService();

export const createNote = async (req: Request, res: Response) => {
    try {
        console.log("...creating note endpoint...")
        let { title, content } = req.body
        await noteService.createNote(title, content)
        res.status(201).json({ message: "NEW note created" })
    } catch (error) {
        console.error(error)
    }
}

export const getAllNotes = async (req: Request, res: Response) => {
    try {
        console.log("getting all notes...")
        const allnotes = await noteService.getAllNotes();
        res.send(JSON.stringify(allnotes));
        // console.log(JSON.stringify(allnotes))
                


    } catch (error) {
        console.error(error)

    }
}

export const getOneNote = async (req: Request, res: Response) => {
    try {
        const noteId = req.params.id
        const oneNote = await noteService.getOneNote(noteId)
        if (oneNote) {
            res.json(oneNote)
        }
        else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        console.error(`Error fetching note ${error}`)
    }
}

export const updateNote = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const { title, content } = req.body
        const updatenote = await noteService.updateNote(id, title, content);

        if (updatenote) {
            res.json({ message: 'Note updated succesfuly' })
        }
        else {
            res.status(404).json({ message: 'Not found' })
        }
    } catch (error) {
        console.error(`Error updating note ${error}`)

    }
}

export const deleteNote = async (req: Request, res: Response) => {
    try {
        const noteId = req.params.id
        const deletenote = await noteService.deleteNote(noteId)

        if (deletenote) {
            res.json({ message: "Note deleted successfuly" })
        }
        else {
            res.status(400).json({ message: "Error deleting note" })
        }
    } catch (error) {
        console.error(`Error deleting note ${error}`)
    }
}
