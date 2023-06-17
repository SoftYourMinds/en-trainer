import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICollection } from 'src/app/shared/models/collection.model';
import { EditCollectionsDialogComponent } from '../collection-crud/edit-collections-dialog/edit-collections-dialog.component';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent {
  @Input() collection: ICollection;

  constructor(
    private dialog: MatDialog
  ) {
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(EditCollectionsDialogComponent, {
      data: this.collection
    })
  }
}
