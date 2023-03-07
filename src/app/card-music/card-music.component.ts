import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Music } from '../services/musics/musics.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-music',
  templateUrl: './card-music.component.html',
  styleUrls: ['./card-music.component.less'],
})
export class CardMusicComponent {
  @Input() music!: Music;

  @Input() hideActions: boolean = false;

  @Output() deleteMusicEvent = new EventEmitter<number>();

  @Output() updateMusicEvent = new EventEmitter();

  constructor() {}

  delete(id = -1) {
    if (id != -1) {
      this.deleteMusicEvent.emit(id);
    }
  }

  edit(music: Music) {
    this.updateMusicEvent.emit(music);
  }
}
