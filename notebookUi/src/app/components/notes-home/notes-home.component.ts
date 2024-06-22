import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { Note } from '../../interfaces/formInterface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../../services/note.service';
import { ReversePipe } from '../../pipes/reverse.pipe';

@Component({
  selector: 'app-notes-home',
  standalone: true,
  imports: [NavbarComponent, RouterLink, CommonModule, FormsModule, ReversePipe],
  templateUrl: './notes-home.component.html',
  styleUrls: ['./notes-home.component.css']
})
export class NotesHomeComponent {
  notes: Note[] = [];
  isUpdateFormVisible = false;
  selectedNoteId: string | null = null;
  updateTitle = '';
  updateContent = '';

  isSingleNoteViewVisible = false;
  singleNote: Note | null = null;

  constructor(private noteService: NoteService) {
    this.noteService.getAllNotes().subscribe(res => {
      this.notes = res;
      console.log(res);
    });
  }

  getNotes() {
    this.noteService.getAllNotes().subscribe(res => {
      this.notes = res;
      console.log(res);
    });
  }

  deleteNote(index: number, id: string) {
    this.noteService.deleteNoteById(id).subscribe(
      () => {
        this.notes.splice(index, 1);
        console.log(`Note with ID ${id} deleted`);
      },
      error => {
        console.error(`Failed to delete note with ID ${id}: `, error);
      }
    );
  }

  updateNoteById(noteId: string, newTitle: string, newContent: string) {
    const selectedNote: Note | undefined = this.notes.find(note => note.id === noteId);
    if (selectedNote) {
      this.noteService.updateNoteById(selectedNote.id, {
        id: selectedNote.id,
        title: newTitle,
        content: newContent
      }).subscribe(
        response => {
          console.log('Note updated: ', response);
          this.hideUpdateForm();
          this.getNotes();
        },
        error => {
          console.error('Failed to update note: ', error);
        }
      );
    }
  }

  getId(id: string) {
    console.log(id);
    return id;
  }

  showUpdateForm(noteId: string, title: string, content: string) {
    this.selectedNoteId = noteId;
    this.updateTitle = title;
    this.updateContent = content;
    this.isUpdateFormVisible = true;
  }

  hideUpdateForm() {
    this.isUpdateFormVisible = false;
    this.selectedNoteId = null;
    this.updateTitle = '';
    this.updateContent = '';
  }

  onUpdateSubmit() {
    if (this.selectedNoteId) {
      this.updateNoteById(this.selectedNoteId, this.updateTitle, this.updateContent);
    }
  }

  showSingleNoteView(note: Note) {
    this.singleNote = note;
    this.isSingleNoteViewVisible = true;
  }

  hideSingleNoteView() {
    this.singleNote = null;
    this.isSingleNoteViewVisible = false;
  }
}
