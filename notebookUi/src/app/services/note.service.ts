import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Note } from '../interfaces/formInterface';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private allUrl = 'http://localhost:3003/all';
  private rootUrl = 'http://localhost:3003';

 

  constructor(private http: HttpClient) { }

  getAllNotes(): Observable<Note[]> {
    return this.http.get<any>(this.allUrl).pipe(
      map(response => response.recordset) // Map to the recordset array
    );
  }

  deleteNoteById(id: string): Observable<any> {
    return this.http.delete(`${this.rootUrl}/delete/${id}`);
  }
  createNote(formData: any): Observable<any> {
    return this.http.post(`${this.rootUrl}/new`, formData);

  }

  updateNoteById(id: string, formData: Note): Observable<any> {
    return this.http.put(`${this.rootUrl}/update/${id}`, formData);
  }

}