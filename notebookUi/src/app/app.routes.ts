import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { NotesHomeComponent } from './components/notes-home/notes-home.component';
import { NotesFormComponent } from './components/notes-form/notes-form.component';

export const routes: Routes = [
    { path: '', component: LandingComponent},
    {path: 'notes', component: NotesHomeComponent},
    {path: 'note', component: NotesHomeComponent},
    {path: 'newnote', component: NotesFormComponent }
];
