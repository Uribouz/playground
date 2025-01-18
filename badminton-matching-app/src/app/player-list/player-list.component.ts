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
  constructor() {
    this.loadLocalStorage();
  }

  clearLocalStorage() {
    localStorage.removeItem('player-list');
  }
  saveLocalStorage() {
    console.log('save local storage');
    localStorage.setItem(
      'player-list',
      JSON.stringify(Array.from(this.playersMap.entries()))
    );
  }
  loadLocalStorage() {
    console.log('load local storage');
    let oldData = localStorage.getItem('player-list');
    if (!oldData) {
      return;
    }
    this.playersMap = new Map(JSON.parse(oldData));
  }

  addPlayerList(newPlayers: string) {
    newPlayers.split(',').forEach((player) => {
      if (!this.playersMap.has(player)) {
        console.log('New player: ' + player);
        this.playersMap.set(player, new Player(player));
      }
    });
    this.saveLocalStorage();
  }

  addRoundsPlayed(playerName: string) {
    console.log('addRoundsPlayed: ' + playerName);
    let player = this.playersMap.get(playerName);
    if (!player) {
      return;
    }
    player.totalRoundsPlayed++;
    this.playersMap.set(playerName, player);
    this.saveLocalStorage();
  }

  subtractRoundsPlayed(playerName: string) {
    console.log('subtractRoundsPlayed: ' + playerName);
    let player = this.playersMap.get(playerName);
    if (!player) {
      return;
    }
    player.totalRoundsPlayed--;
    this.playersMap.set(playerName, player);
    this.saveLocalStorage();
  }
}
