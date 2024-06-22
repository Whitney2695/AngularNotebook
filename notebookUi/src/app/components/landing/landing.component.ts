import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NotesHomeComponent } from '../notes-home/notes-home.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NavbarComponent, NotesHomeComponent, RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
