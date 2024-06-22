"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notes_controller_1 = require("../controllers/notes.controller");
const body_parser_1 = __importDefault(require("body-parser"));
const route = (0, express_1.Router)();
route.use(body_parser_1.default.json());
route.post('/new', notes_controller_1.createNote);
route.get('/all', notes_controller_1.getAllNotes);
route.get('/one/:id', notes_controller_1.getOneNote);
route.put('/update/:id', notes_controller_1.updateNote);
route.delete('/delete/:id', notes_controller_1.deleteNote);
exports.default = route;
