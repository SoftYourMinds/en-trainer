import { Injectable } from '@angular/core';
import { SnackBarComponent } from "./snack-bar.component"
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ISnackBarData } from './snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar){}

  openSnackbar(message: string, action: boolean):void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {message, action},
      duration: action ? 0 : 7000, 
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    })
  }
}
