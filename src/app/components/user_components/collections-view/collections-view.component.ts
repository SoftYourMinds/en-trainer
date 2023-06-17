import { Component,ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { CollectionService } from 'src/app/services/collection.service';
import { ProgressBarService } from 'src/app/shared/components/progress-bar/progress-bar.service';
import { SnackBarService } from 'src/app/shared/components/snack-bar/snack-bar.service';
import { ICollection } from 'src/app/shared/models/collection.model';
import { ViewCollectionsService } from 'src/app/shared/services/view-collections.service';

@Component({
  selector: 'app-collections-view',
  templateUrl: './collections-view.component.html',
  styleUrls: ['./collections-view.component.scss']
})
export class CollectionsViewComponent implements OnInit {
  @ViewChild('collectionsBlock', {static: true}) collectionsBlock: ElementRef;
  @Input() collections: ICollection[];
  @Input() parentId: string;

  constructor(
    public ViewCollectionsService: ViewCollectionsService,
    public CollectionService: CollectionService,
    public ProgressBarService: ProgressBarService,
    public SnackBarService: SnackBarService,
  ){
     
  }

  ngOnInit(): void {
    console.log(this.parentId);
    
    this.ProgressBarService.showProgressBar()

    this.ViewCollectionsService.collectionViewStyle$.subscribe((newStyle)=> {
      this.setCollectionsStyle(newStyle);
    });
    
    this.CollectionService.getCollectionsByParentId(this.parentId).subscribe({
      next: (result: ICollection[]) => {
        this.CollectionService.ressetCollections(result);
        this.ProgressBarService.hideProgressBar();
      },
      error: (error) => {
        this.ProgressBarService.hideProgressBar()
        this.SnackBarService.openSnackbar(error.error.meassage, true);
      }
    })

    this.CollectionService.collections$.subscribe((collections) => {
      this.collections = collections;
    })
  }
  

  setCollectionsStyle (newStyle: string) {
    console.log(newStyle)
    if (this.collectionsBlock) { // Add this check to ensure the element is defined
      const collections = this.collectionsBlock.nativeElement;
      console.log(newStyle); 
      collections.classList.forEach((className: any) => {
        collections.classList.remove(className);
      });
      
      collections.classList.add(newStyle);  
    }
  }
  
}
