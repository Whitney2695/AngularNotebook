"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.getOneNote = exports.getAllNotes = exports.createNote = void 0;
const notes_service_1 = __importDefault(require("../services/notes.service"));
const noteService = new notes_service_1.default();
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("...creating note endpoint...");
        let { title, content } = req.body;
        yield noteService.createNote(title, content);
        res.status(201).json({ message: "NEW note created" });
    }
    catch (error) {
        console.error(error);
    }
});
exports.createNote = createNote;
const getAllNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("getting all notes...");
        const allnotes = yield noteService.getAllNotes();
        res.send(JSON.stringify(allnotes));
        // console.log(JSON.stringify(allnotes))
    }
    catch (error) {
        console.error(error);
    }
});
exports.getAllNotes = getAllNotes;
const getOneNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noteId = req.params.id;
        const oneNote = yield noteService.getOneNote(noteId);
        if (oneNote) {
            res.json(oneNote);
        }
        else {
            res.status(404).json({ message: 'Note not found' });
        }
    }
    catch (error) {
        console.error(`Error fetching note ${error}`);
    }
});
exports.getOneNote = getOneNote;
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { title, content } = req.body;
        const updatenote = yield noteService.updateNote(id, title, content);
        if (updatenote) {
            res.json({ message: 'Note updated succesfuly' });
        }
        else {
            res.status(404).json({ message: 'Not found' });
        }
    }
    catch (error) {
        console.error(`Error updating note ${error}`);
    }
});
exports.updateNote = updateNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noteId = req.params.id;
        const deletenote = yield noteService.deleteNote(noteId);
        if (deletenote) {
            res.json({ message: "Note deleted successfuly" });
        }
        else {
            res.status(400).json({ message: "Error deleting note" });
        }
    }
    catch (error) {
        console.error(`Error deleting note ${error}`);
    }
});
exports.deleteNote = deleteNote;
