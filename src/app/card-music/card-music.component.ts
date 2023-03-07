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

  @Output() deleteMusicEvent = new EventEmitter<number>();

  @Output() updatedMusicEvent = new EventEmitter();

  constructor(private dialog: MatDialog, private router: Router) {}

  delete(id = -1) {
    if (id != -1) {
      this.deleteMusicEvent.emit(id);
    }
  }

  openDialog() {
    // this.dialog
    //   .open(AddMusicComponent, {
    //     data: {
    //       filmIdFromDB: this.id,
    //       filmIdFromTMBD: this.idFilmApi,
    //       title: this.title,
    //       image: this.img,
    //       avis: this.avis,
    //     },
    //   })
    //   .afterClosed()
    //   .subscribe(() => {
    //     this.updatedFilmEvent.emit();
    //   });
  }
}
