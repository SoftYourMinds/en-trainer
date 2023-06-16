import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef,  } from '@angular/material/dialog';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-create-collection-dialog',
  templateUrl: './create-collection-dialog.component.html',
  styleUrls: ['./create-collection-dialog.component.scss']
})
export class CreateCollectionDialogComponent {
  
  
  constructor(
    public authorizationService: AuthorizationService,
    public dialogRef: MatDialogRef<CreateCollectionDialogComponent>
  ) {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
