import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Music } from '../services/musics/musics.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.less'],
})
export class FormulaireComponent {
  form: FormGroup;
  musicModel: Music;
  @ViewChild('fileInput') fileInput!: ElementRef;

  @Output('cancel') cancelEvent$: EventEmitter<any>;
  @Output('submit') submitEvent$: EventEmitter<any>;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FormulaireComponent>
  ) {
    this.submitEvent$ = new EventEmitter();
    this.cancelEvent$ = new EventEmitter();
    this.form = FormulaireComponent.buildForm();
    this.musicModel = data.musicModel;
  }

  ngOnInit() {
    console.log({ date: this.musicModel.date });
    this.form.patchValue({
      id: this.musicModel.id,
      title: this.musicModel.title,
      description: this.musicModel.description,
      album: this.musicModel.album,
      artist: this.musicModel.artist,
      duration: this.musicModel.duration,
      date: this.formatDate(this.musicModel.date),
      styles: this.musicModel.styles,
      picture: this.musicModel.picture,
    });
  }

  formatDate(date: Date | string): string {
    date = new Date(date);
    const day = `${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;
    const month = `${date.getMonth() + 1 < 10 ? '0' : ''}${
      date.getMonth() + 1
    }`;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  cancel() {
    this.dialogRef.close();
  }

  submit(music: Music) {
    this.dialogRef.close(music);
  }

  addChipset(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.musicModel.styles!.push(value);
    }
    event.chipInput!.clear();
  }

  removeChipset(titre: any): void {
    const index = this.musicModel.styles!.indexOf(titre);
    this.musicModel.styles!.splice(index, 1);
  }

  onFileSelected(event: Event | null) {
    const files = (<HTMLInputElement>event?.currentTarget).files;
    const file: File | null = files!.item(0);

    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.musicModel.picture = reader.result as any;
      };
    }
  }

  /**
   * Fonction pour construire notre formulaire
   * @returns {FormGroup}
   *
   * @private
   */
  private static buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      title: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
      album: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
      description: new FormControl(''),
      artist: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
      duration: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
    });
  }
}
