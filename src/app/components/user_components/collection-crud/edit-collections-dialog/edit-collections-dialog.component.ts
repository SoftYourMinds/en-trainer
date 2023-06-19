import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICollection } from 'src/app/shared/models/collection.model';

import { Subject, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError, filter } from 'rxjs/operators';
import { ReversoService } from 'src/app/services/reverso.service';
import { SliderService } from 'src/app/shared/components/slider/slider.service';
import { CollectionService } from 'src/app/services/collection.service';
import { ProgressBarService } from 'src/app/shared/components/progress-bar/progress-bar.service';
import { SnackBarService } from 'src/app/shared/components/snack-bar/snack-bar.service';


@Component({
  selector: 'app-edit-collections-dialog',
  templateUrl: './edit-collections-dialog.component.html',
  styleUrls: ['./edit-collections-dialog.component.scss']
})
export class EditCollectionsDialogComponent {
  isDisabled: boolean;

  currentCollection: ICollection;
  editCollection: ICollection;
  
  searchResults: string[] = [];
  isLoading: boolean = false;

  private searchTerms = new Subject<string>();

  constructor(
    private SnackBarService: SnackBarService,
    private ProgressBarService: ProgressBarService,
    private CollectionService: CollectionService,
    private SliderService: SliderService,
    private ReversoService: ReversoService, 
    public dialogRef: MatDialogRef<EditCollectionsDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: ICollection, 
  ) { 
    this.isDisabled = true;
    this.currentCollection = data;
    this.editCollection = Object.assign({}, data);
  }  
  
  ngOnInit() {
    this.searchTerms
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((term: string) => term.trim() !== ''),
      switchMap((term: string) => {
        this.isLoading = true;
        return this.ReversoService.getImages(term).pipe(
          catchError((error) => of(["https://nikolab.com.ua/wp-content/themes/nikolab/images/template/backgrounds/placeholder.jpg"])) 
        );
      })
    )
    .subscribe((respond) => {
      if(respond.includes(this.currentCollection.currentImage)) {
        const index = respond.indexOf(this.currentCollection.currentImage);
        const removed = respond.splice(index, 1);
        respond = [...removed, ...respond];
      }
      this.SliderService.setImages(respond)
      this.isLoading = false;
    });
    this.onInput();
  }

  onInput(): void {
    this.searchTerms.next(this.editCollection.name);
    if(this.currentCollection.name === this.editCollection.name) {
      this.isDisabled = true;
    } else {
      this.isDisabled = false; 
    }
  }

  currentSlideChanged(slideImage: string) {
    if(this.currentCollection.currentImage === slideImage) {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
      this.editCollection.currentImage = slideImage;
    }
  } 
 
  onConfirm(): void { 
    this.dialogRef.close();
    this.ProgressBarService.showProgressBar();
    this.CollectionService.editCollection(this.editCollection._id || '', this.editCollection) .subscribe({
      next: () => {
        this.SnackBarService.openSnackbar('Редагування успішне', true)
        this.CollectionService.getCollectionsByParentId(this.editCollection.parent_id).subscribe((result) => {
          this.CollectionService.ressetCollections(result)
          this.ProgressBarService.hideProgressBar();
        })
      },
      error: (error) => {
        this.ProgressBarService.hideProgressBar()
        this.SnackBarService.openSnackbar(error.error.message, false);
      }
    })
    this.dialogRef.close(); 
  } 
 
  onDelete(): void { 
    this.dialogRef.close();
    this.ProgressBarService.showProgressBar();
    this.CollectionService.deleteCollection(this.editCollection._id || '').subscribe({
      next: () => {
        this.SnackBarService.openSnackbar('Видалення успішне', true)
        this.CollectionService.getCollectionsByParentId(this.editCollection.parent_id).subscribe((result) => {
          this.CollectionService.ressetCollections(result)
          this.ProgressBarService.hideProgressBar();
        })
      },
      error: (error) => {
        this.ProgressBarService.hideProgressBar()
        this.SnackBarService.openSnackbar(error.error.message, false);
      }
    })
  } 

  onNoClick() { 
    this.dialogRef.close();
  } 
 
}


   
      

 

