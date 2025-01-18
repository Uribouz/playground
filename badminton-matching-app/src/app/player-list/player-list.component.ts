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
  // playersMap = new Map();
  //! MockData
  playersMap = new Map([
    ['ball', new Player('ball')],
    ['ball2', new Player('ball')],
    ['ball3', new Player('ball')],
    ['ball4', new Player('ball')],
    ['ball5', new Player('ball')],
  ]);

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

  addRoundsPlayed(playerName: string) {
    console.log('addRoundsPlayed: ' + playerName);
    let player = this.playersMap.get(playerName);
    if (!player) {
      return;
    }
    player.totalRoundsPlayed++;
    this.playersMap.set(playerName, player);
  }

  subtractRoundsPlayed(playerName: string) {
    console.log('subtractRoundsPlayed: ' + playerName);
    let player = this.playersMap.get(playerName);
    if (!player) {
      return;
    }
    player.totalRoundsPlayed--;
    this.playersMap.set(playerName, player);
  }
}
