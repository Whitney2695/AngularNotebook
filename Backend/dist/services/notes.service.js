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
exports.NotesService = void 0;
const notes_config_1 = require("../config/notes.config");
const mssql_1 = __importDefault(require("mssql"));
class NotesService {
    createNote(title, content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('creating note');
                const pool = yield mssql_1.default.connect(notes_config_1.sqlConfig);
                const result = yield pool.request()
                    .input('title', mssql_1.default.VarChar, title)
                    .input('content', mssql_1.default.VarChar, content)
                    .query('INSERT INTO notes (title, content) VALUES (@title, @content)');
                console.log(result);
            }
            catch (error) {
                console.error("error creating note", error);
            }
        });
    }
    //getting al notes
    getAllNotes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield mssql_1.default.connect(notes_config_1.sqlConfig);
                const result = pool.request()
                    .query('SELECT * FROM notes');
                console.log(result);
                return result;
            }
            catch (error) {
                console.error('error getting notes', error);
                return [];
            }
        });
    }
    getOneNote(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield mssql_1.default.connect(notes_config_1.sqlConfig);
                const result = yield pool.request()
                    .input('id', mssql_1.default.Int, id)
                    .query('SELECT * FROM notes WHERE id = @id');
                console.log(result);
                return result;
            }
            catch (error) {
                console.error('error getting note', error);
            }
        });
    }
    updateNote(id, title, content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield mssql_1.default.connect(notes_config_1.sqlConfig);
                const result = yield pool.request()
                    .input('id', mssql_1.default.Int, id)
                    .input('title', mssql_1.default.VarChar, title)
                    .input('content', mssql_1.default.VarChar, content)
                    .query('UPDATE notes SET title = @title, content = @content WHERE id = @id');
                return result;
            }
            catch (error) {
                console.error('error updating note', error);
            }
        });
    }
    deleteNote(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield mssql_1.default.connect(notes_config_1.sqlConfig);
                const result = yield pool.request()
                    .input('id', mssql_1.default.Int, id)
                    .query('DELETE FROM notes WHERE id = @id');
                return result;
            }
            catch (error) {
                console.error('error deleting note', error);
                return [];
            }
        });
    }
}
exports.NotesService = NotesService;
exports.default = NotesService;
