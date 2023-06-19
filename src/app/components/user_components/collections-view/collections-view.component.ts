import { Component,ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { CollectionService } from 'src/app/services/collection.service';
import { ProgressBarService } from 'src/app/shared/components/progress-bar/progress-bar.service';
import { SnackBarService } from 'src/app/shared/components/snack-bar/snack-bar.service';
import { ICollection } from 'src/app/shared/models/collection.model';
import { ViewCollectionsService } from 'src/app/shared/services/view-collections.service';
import { IPagerParams } from 'src/app/services/collection.service';

@Component({
  selector: 'app-collections-view',
  templateUrl: './collections-view.component.html',
  styleUrls: ['./collections-view.component.scss']
})
export class CollectionsViewComponent implements OnInit {
  @ViewChild('collectionsBlock', {static: true}) collectionsBlock: ElementRef;
  @Input() collections: ICollection[];
  @Input() parentId: string;
    
  pager: IPagerParams;
  isCollectionsLoadMore: boolean;
  isCollectionsFullLoad: boolean;
  isFirstPageInit: boolean;

  constructor(
    public ViewCollectionsService: ViewCollectionsService,
    public CollectionService: CollectionService,
    public ProgressBarService: ProgressBarService,
    public SnackBarService: SnackBarService,
  ){
    this.pager = { page: 2, pageSize: 5 };
    this.isCollectionsLoadMore= false;
    this.isCollectionsFullLoad = false;
    this.isFirstPageInit = false;
  }

  ngOnInit(): void {
    
    this.ProgressBarService.showProgressBar()

    this.ViewCollectionsService.collectionViewStyle$.subscribe((newStyle)=> {
      this.setCollectionsStyle(newStyle);
    });
    
    this.CollectionService.getCollectionsByParentId(this.parentId).subscribe({
      next: (result: ICollection[]) => {
        this.isFirstPageInit = true;
        this.CollectionService.ressetCollections(result);
        this.ProgressBarService.hideProgressBar();
      },
      error: (error) => {
        this.ProgressBarService.hideProgressBar()
        this.SnackBarService.openSnackbar(error, true);
      }
    })

    this.CollectionService.collections$.subscribe((collections) => {
        this.collections = collections;
        if(collections.length <=5) {
          if(this.isFirstPageInit) {
            this.isCollectionsFullLoad = false;
            this.pager.page = 2;
          }
        }
      })
  }
  
   
  loadMoreCollections(onPageEnd: boolean) {

    if (!this.isFirstPageInit) return;

    if (onPageEnd && this.isCollectionsFullLoad) return;

    this.isCollectionsLoadMore = true;
        
    this.CollectionService.loadMoreCollections(this.parentId, this.pager.page, this.pager.pageSize).subscribe((result) => {
        if (result.length > 0) {
          console.log(result)
          this.pager.page += 1;
          console.log(this.pager);
          this.isCollectionsLoadMore= false;
          this.CollectionService.pushCollections(result);
         } else {
          console.log('that s all')
          this.isCollectionsFullLoad = true;
          this.isCollectionsLoadMore = false;
        }
    });
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
