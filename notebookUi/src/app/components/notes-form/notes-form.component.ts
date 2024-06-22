import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule if needed
import { NavbarComponent } from '../navbar/navbar.component';
import { newNote } from '../../interfaces/formInterface';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-notes-form',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './notes-form.component.html',
  styleUrls: ['./notes-form.component.css']
})
export class NotesFormComponent {
  notesForm: FormGroup;
  showError: boolean = false;

  constructor(private fb: FormBuilder, private noteService: NoteService) {
    this.notesForm = this.fb.group({
      title: ['', Validators.required],
      note: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.notesForm.invalid) {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 3000);
      return;
    }
   
    console.log('Form Submitted', this.notesForm.value);
  }

  grabForm(): void {
    if (this.notesForm.invalid) {
      console.log('Form is invalid');
      return;
    }
  
    const formData = {
      title: this.notesForm.value.title,
      content: this.notesForm.value.note // Ensure this matches your backend expectation
    };
  
    this.noteService.createNote(formData).subscribe(
      response => {
        console.log('Note created successfully:', response);
        this.notesForm.reset();
      },
      error => {
        console.error('Error creating note:', error);
      }
    );
  }

}