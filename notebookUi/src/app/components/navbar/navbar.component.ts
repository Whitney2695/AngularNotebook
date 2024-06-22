import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NotesHomeComponent } from '../notes-home/notes-home.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
