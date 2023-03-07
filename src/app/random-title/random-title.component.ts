import { Component } from '@angular/core';
import { Music, MusicsService } from '../services/musics/musics.service';

@Component({
  selector: 'app-random-title',
  templateUrl: './random-title.component.html',
  styleUrls: ['./random-title.component.less'],
})
export class RandomTitleComponent {
  music: Music;
  isCardView = false;
  loading: boolean = true;

  constructor(private readonly musicsService: MusicsService) {
    this.music = {} as any;
  }

  ngOnInit(): void {
    this.fetchMusic();
  }

  fetchMusic() {
    this.musicsService.fetchRandomMusic().subscribe((res) => {
      this.music = res as any;
      this.loading = false;
    });
  }

  reloadMusics() {
    this.loading = true;
    this.fetchMusic();
  }
}
