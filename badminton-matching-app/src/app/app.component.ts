import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayerListComponent } from './player-list/player-list.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PlayerListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'badminton-matching-app';
}
