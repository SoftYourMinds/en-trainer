import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

export interface ISnackBarData {
  message: string,
  action: boolean,
}

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent {
  message: string;
  action: boolean;

  constructor(
    public snackBarRef: MatSnackBarRef<SnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public snackBarData: ISnackBarData 
  ){
    this.message = snackBarData.message;
    this.action = snackBarData.action;    
  }

  onClose() {
    this.snackBarRef.dismissWithAction()
  }

}
