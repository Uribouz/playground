import { Component } from '@angular/core';
import { Player } from '../player/player';
import { CommonModule, KeyValue } from '@angular/common';
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
    // console.log(
    //   'save local storage:' +
    //     JSON.stringify(Array.from(this.playersMap.entries()))
    // );
    localStorage.setItem(
      'player-list',
      JSON.stringify(Array.from(this.playersMap.entries()))
    );
  }
  loadLocalStorage() {
    let oldData = localStorage.getItem('player-list');
    if (!oldData) {
      return;
    }
    this.playersMap = new Map(JSON.parse(oldData));
    // console.log(
    //   'load local storage' + JSON.stringify(Array.from(this.playersMap))
    // );
  }
  originalOrder = (
    a: KeyValue<string, Player>,
    b: KeyValue<string, Player>
  ): number => {
    return 0;
  };
  addPlayerList(newPlayers: string) {
    newPlayers.split(',').forEach((player) => {
      if (!this.playersMap.has(player)) {
        console.log('New player: ' + player);
        this.playersMap.set(player, new Player(player));
      }
    });
    this.saveLocalStorage();
  }
  deletePlayer(playerName: string) {
    console.log('deletePlayer: ' + playerName);
    this.playersMap.delete(playerName);
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
