import { Component } from '@angular/core';
import { Player } from '../player/player';
import { CommonModule, KeyValue } from '@angular/common';
import { max } from 'rxjs';
import { Status } from '../status/status';
@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.css',
})
export class PlayerListComponent {
  status = new Status();
  playersMap = new Map();
  constructor() {
    this.loadLocalStorage();
  }
  clearLocalStorage() {
    localStorage.removeItem('player-list');
    localStorage.removeItem('players-status');
  }
  saveLocalStorage() {
    this.savePlayerLlist();
    this.savePlayerStatus();
  }
  savePlayerStatus() {
    localStorage.setItem('players-status', JSON.stringify(this.status));
  }
  savePlayerLlist() {
    localStorage.setItem(
      'player-list',
      JSON.stringify(Array.from(this.playersMap.entries()))
    );
  }
  loadLocalStorage() {
    this.loadPlayerList();
    this.loadPlayerStatus();
  }
  loadPlayerList() {
    let playerList = localStorage.getItem('player-list');
    if (!playerList) {
      return;
    }
    this.playersMap = new Map(JSON.parse(playerList));
  }
  loadPlayerStatus() {
    let status = localStorage.getItem('players-status');
    if (!status) {
      return;
    }
    this.status = JSON.parse(status);
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
        let newPlayer = new Player(player);
        newPlayer.totalRoundsPlayed = this.status.leastPlayed;
        this.playersMap.set(player, newPlayer);
      }
    });
    this.saveLocalStorage();
  }
  deletePlayer(playerName: string) {
    console.log('deletePlayer: ' + playerName);
    this.playersMap.delete(playerName);
    this.revalidateStatus();
    this.saveLocalStorage();
  }

  updatePlayerRoundsPlayed(playerName: string, value: number) {
    console.log('updatePlayerRoundsPlayed: ' + playerName + ': ' + value);
    let player = this.playersMap.get(playerName);
    if (!player) {
      return;
    }
    player.totalRoundsPlayed += value;
    if (player.totalRoundsPlayed < 0) {
      player.totalRoundsPlayed = 0;
    }
    this.revalidateStatus();
    this.playersMap.set(playerName, player);
  }

  revalidateStatus() {
    if (this.playersMap.size <= 0) {
      this.status = new Status();
      return;
    }
    console.log('this.playersMap.values().next().value: ' + this.playersMap.values().next().value)
    this.status.leastPlayed = this.playersMap.values().next().value.totalRoundsPlayed;
    this.status.mostPlayed = this.playersMap.values().next().value.totalRoundsPlayed;
    this.playersMap.forEach((value, player) => {
      if (this.status.leastPlayed > value.totalRoundsPlayed) {
        this.status.leastPlayed = value.totalRoundsPlayed;
      }
      if (this.status.mostPlayed < value.totalRoundsPlayed) {
        this.status.mostPlayed = value.totalRoundsPlayed;
      }
      // console.log('player:' + player + ': ' + value.totalRoundsPlayed);
    });
    console.log(
      'validateStatus: ' +
        this.status.leastPlayed +
        ' - ' +
        this.status.mostPlayed
    );
  }
  addRoundsPlayed(playerName: string) {
    this.updatePlayerRoundsPlayed(playerName, 1);
    this.saveLocalStorage();
  }

  subtractRoundsPlayed(playerName: string) {
    this.updatePlayerRoundsPlayed(playerName, -1);
    this.saveLocalStorage();
  }
  getPlayerBodyClass(totalRoundsPlayed: number) {
    if (totalRoundsPlayed === this.status.leastPlayed)
      return 'leastPlayedPlayer';
    if (totalRoundsPlayed === this.status.mostPlayed) return 'mostPlayedPlayer';
    return 'Player';
  }
}
