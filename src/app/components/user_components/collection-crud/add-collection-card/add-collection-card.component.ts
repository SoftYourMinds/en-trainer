import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCollectionDialogComponent } from '../create-collection-dialog/create-collection-dialog.component';
import { SnackBarService } from 'src/app/shared/components/snack-bar/snack-bar.service';

@Component({
  selector: 'app-add-collection-card',
  templateUrl: './add-collection-card.component.html',
  styleUrls: ['./add-collection-card.component.scss']
})
export class AddCollectionCardComponent {
  numberAllCollections: number = 0; 
  
  constructor(
    public dialog: MatDialog,
    public snackBarSerive: SnackBarService,
  ) {
    
  }
 
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateCollectionDialogComponent)

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.snackBarSerive.openSnackbar(result, true ) ;    
    });
  }




}
