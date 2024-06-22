import { sqlConfig } from "../config/notes.config";
import sql from 'mssql'

export class NotesService {
    async createNote(title: string, content: string) {

        try {
            console.log('creating note')
            const pool = await sql.connect(sqlConfig);
            const result = await pool.request()
                .input('title', sql.VarChar, title)
                .input('content', sql.VarChar, content)
                .query('INSERT INTO notes (title, content) VALUES (@title, @content)');
            console.log(result);

        } catch (error) {
            console.error("error creating note", error);

        }

    }

    //getting al notes
    async getAllNotes() {
        try {
            const pool = await sql.connect(sqlConfig)
            const result = pool.request()
                .query('SELECT * FROM notes')
            console.log(result)

            return result
        } catch (error) {
            console.error('error getting notes', error)
            return [];
        }
    }

    async getOneNote(id: string) {
        try {
            const pool = await sql.connect(sqlConfig)
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM notes WHERE id = @id')
            console.log(result)
            return result
        } catch (error) {
            console.error('error getting note', error)
        }
    }

    async updateNote(id: string, title: string, content: string) {
        try {
            const pool = await sql.connect(sqlConfig)
            const result = await pool.request()
                .input('id', sql.Int, id)
                .input('title', sql.VarChar, title)
                .input('content', sql.VarChar, content)
                .query('UPDATE notes SET title = @title, content = @content WHERE id = @id')
            return result
        } catch (error) {
            console.error('error updating note', error)
        }
    }

    async deleteNote(id: string) {
        try {
            const pool = await sql.connect(sqlConfig)
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('DELETE FROM notes WHERE id = @id')
            return result
        }
        catch (error) {
            console.error('error deleting note', error)
            return []
        }
    }
}

export default NotesService