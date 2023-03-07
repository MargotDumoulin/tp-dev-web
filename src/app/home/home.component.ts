import { Component } from '@angular/core';
import { Music, MusicsService } from '../services/musics/musics.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent {
  musics: Music[] = [];
  isCardView = false;
  loading: boolean = true;

  constructor(
    private readonly musicsService: MusicsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchMusics();
  }

  fetchMusics() {
    this.musicsService.fetch().subscribe((res) => {
      console.log({ res });
      this.musics = res || [];
      this.loading = false;
    });
  }

  deleteMusic(id: number) {
    this.dialog
      .open(ConfirmationDialogComponent)
      .afterClosed()
      .subscribe((wantsToDelete) => {
        if (wantsToDelete) {
          this.musicsService.delete(String(id)).subscribe({
            next: (_res) => {
              this.loading = true;
              this.fetchMusics();
            },
          });
        }
      });
  }

  reloadMusics() {
    this.loading = true;
    this.fetchMusics();
  }
}
