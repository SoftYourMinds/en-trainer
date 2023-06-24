import { Component,Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCollectionDialogComponent } from '../create-collection-dialog/create-collection-dialog.component';
import { SnackBarService } from 'src/app/shared/components/snack-bar/snack-bar.service';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-add-collection-card',
  templateUrl: './add-collection-card.component.html',
  styleUrls: ['./add-collection-card.component.scss']
})
export class AddCollectionCardComponent implements OnInit {
  @Input() parent_id: string;
  numberAllCollections: number = 0; 
  
  constructor(
    public dialog: MatDialog,
    public snackBarSerive: SnackBarService,
    public CollectionService: CollectionService,
  ) {
    
  }
  
  
  ngOnInit(): void {
    this.CollectionService.collections$.subscribe((result) => {
      this.CollectionService.getNumberOfAllCollections(this.parent_id).subscribe((res) => {
        this.numberAllCollections = res;
      })
    })  
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateCollectionDialogComponent, {
      data: this.parent_id
    })
  }



}
