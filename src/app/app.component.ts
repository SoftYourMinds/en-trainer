import { Component } from '@angular/core';
import { SnackBarComponent } from './shared/components/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'en-trainer';

  constructor(public snackBar: MatSnackBar) {}

  public openSnackbar(message: string, error: boolean) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {message, error},
      duration: 5000,
    })
  }

  
}
