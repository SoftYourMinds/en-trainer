import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICollection } from 'src/app/shared/models/collection.model';
import { EditCollectionsDialogComponent } from '../collection-crud/edit-collections-dialog/edit-collections-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  @Input() collection: ICollection;
  
  id: string;
  name: string;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

  }

  openEditDialog() {
    const dialogRef = this.dialog.open(EditCollectionsDialogComponent, {
      data: this.collection
    })
  }

  openCollectionPage() {
    this.router.navigate(['/collection', this.collection._id, this.collection.name]);
  }

  getCollectionFullLearned() {
    const isLearned = this.collection.fullLearned.filter(el => el === false);
    return isLearned.length ? false : true;
  }
}
