import { Component, Input, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { CollectionService } from 'src/app/services/collection.service';
import { ProgressBarService } from 'src/app/shared/components/progress-bar/progress-bar.service';
import { SnackBarService } from 'src/app/shared/components/snack-bar/snack-bar.service';
import { ICollection } from 'src/app/shared/models/collection.model';
import { Subject, Observable, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError, filter } from 'rxjs/operators';
import { ReversoService } from 'src/app/services/reverso.service';
import { SliderService } from 'src/app/shared/components/slider/slider.service';


@Component({
  selector: 'app-create-collection-dialog',
  templateUrl: './create-collection-dialog.component.html',
  styleUrls: ['./create-collection-dialog.component.scss']
})
export class CreateCollectionDialogComponent implements OnInit {
  currentImage: string;

  searchTerm: string = '';
  searchResults: string[] = [];
  isLoading: boolean = false;
  private searchTerms = new Subject<string>();

  constructor(
    public authorizationService: AuthorizationService,
    public CollectionService: CollectionService,
    public ProgresBarService: ProgressBarService, 
    public SnackBarService: SnackBarService,
    public ReversoService: ReversoService,
    public SliderService: SliderService,
    public dialogRef: MatDialogRef<CreateCollectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public parent_id: string,
  ) {}


  ngOnInit(): void {
    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((term: string) => term.trim() !== ''),
        switchMap((term: string) => {
          this.isLoading = true;
          return this.ReversoService.getImages(term).pipe(
            catchError((error) => of(["https://nikolab.com.ua/wp-content/themes/nikolab/images/template/backgrounds/placeholder.jpg"])) // Return an empty array if there's an error
          );
        })
      )
      .subscribe((res) => {
        this.searchResults = res;
        this.SliderService.setImages(res)
        this.isLoading = false;
      });
  }

  currentSlideChanged(currentSlide: string) {
    this.currentImage = currentSlide;
  }


// @Create User
  onCreateCollection() {
    this.dialogRef.close();
    this.ProgresBarService.showProgressBar();
        
    const user_id = this.authorizationService.getUser()._id;
    const collection: ICollection = {
      name: this.searchTerm,
      currentImage: this.currentImage,
      parent_id: this.parent_id,
      user_id: user_id,
      images: [],
      date: new Date(),
      fullLearned: [false]            
    }
    this.CollectionService.createCollection(collection).subscribe({
      next: () => {
        this.CollectionService.getCollectionsByParentId(this.parent_id).subscribe((result) => {
          this.CollectionService.ressetCollections(result);
          this.ProgresBarService.hideProgressBar();
          this.SnackBarService.openSnackbar('Ви створили нову колекцію', true)
        })
      },

      error: (error) => {
        this.ProgresBarService.hideProgressBar();
        this.SnackBarService.openSnackbar(error.status, true)
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onInput(): void {
    this.searchTerms.next(this.searchTerm);
  }
}
