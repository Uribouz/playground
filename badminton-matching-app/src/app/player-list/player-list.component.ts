import { Component } from '@angular/core';
import { Player } from '../player/player';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.css',
})
export class PlayerListComponent {
  playersMap = new Map();
  addPlayerList(newPlayers: string) {
    // const oldPlayers = Array.from(this.playersMap, ([value]) => value);
    // console.log('oldPlayers: ' + oldPlayers);
    // console.log('newPlayers: ' + newPlayers);
    newPlayers.split(',').forEach((player) => {
      if (!this.playersMap.has(player)) {
        console.log('New player: ' + player);
        this.playersMap.set(player, new Player(player));
      }
    });
  }
}
