import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotesHomeComponent } from './components/notes-home/notes-home.component';
import { LandingComponent } from './components/landing/landing.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotesHomeComponent, LandingComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'NotesApp';
}
