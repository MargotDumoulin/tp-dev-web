import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'tp-note-angular-frontend';

  constructor(private router: Router) {}

  goToContact() {
    this.router.navigate(['/contact']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToRandomTitle() {
    this.router.navigate(['/random']);
  }

  goToStats() {
    this.router.navigate(['/stats']);
  }
}
