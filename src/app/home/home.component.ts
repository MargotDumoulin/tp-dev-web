import { FormulaireComponent } from './../formulaire/formulaire.component';
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
      this.musics = res || [];
      this.loading = false;
    });
  }

  openDialog(music?: Music) {
    this.dialog
      .open(FormulaireComponent, {
        data: {
          musicModel: music || { styles: [], date: new Date() },
        },
      })
      .afterClosed()
      .subscribe((data) => {
        if (!data) return; // Means the action was cancelled
        if (music) {
          // Means the user is updating an existing music
          this.musicsService.update(data).subscribe({
            next: (_res) => {
              this.loading = true;
              this.fetchMusics();
            },
          });
        } else {
          // Means the user is creating a new music
          this.musicsService.create(data).subscribe({
            next: (_res) => {
              this.loading = true;
              this.fetchMusics();
            },
          });
        }
      });
  }

  deleteMusic(id = -1) {
    if (id != -1) {
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
  }

  reloadMusics() {
    this.loading = true;
    this.fetchMusics();
  }
}
