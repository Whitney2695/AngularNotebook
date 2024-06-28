import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NoteService } from './note.service';
import { Note } from '../interfaces/formInterface';

describe('NoteService', () => {
  let service: NoteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NoteService]
    });
    service = TestBed.inject(NoteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all notes', () => {
    const dummyNotes: Note[] = [
      { id: '1', title: 'Note 1', content: 'Content 1' },
      { id: '2', title: 'Note 2', content: 'Content 2' }
    ];

    service.getAllNotes().subscribe(notes => {
      expect(notes.length).toBe(2);
      expect(notes).toEqual(dummyNotes);
    });

    const req = httpMock.expectOne(service['allUrl']);
    expect(req.request.method).toBe('GET');
    req.flush({ recordset: dummyNotes });
  });

  it('should delete a note by id', () => {
    const noteId = '1';

    service.deleteNoteById(noteId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['rootUrl']}/delete/${noteId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should create a new note', () => {
    const newNote = { title: 'New Note', content: 'New Content' };

    service.createNote(newNote).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['rootUrl']}/new`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newNote);
    req.flush({});
  });

  it('should update a note by id', () => {
    const noteId = '1';
    const updatedNote: Note = { id: '1', title: 'Updated Note', content: 'Updated Content' };

    service.updateNoteById(noteId, updatedNote).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['rootUrl']}/update/${noteId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedNote);
    req.flush({});
  });

  it('should handle errors gracefully', () => {
    const errorMessage = '404 Not Found';

    service.getAllNotes().subscribe(
      () => fail('expected an error, not notes'),
      error => expect(error.message).toContain(errorMessage)
    );

    const req = httpMock.expectOne(service['allUrl']);
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
