import { Component,ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { CollectionService } from 'src/app/services/collection.service';
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
  
  constructor(
    public ViewCollectionsService: ViewCollectionsService,
    public CollectionService: CollectionService
  ){
     
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

  ngOnInit(): void {
    this.ViewCollectionsService.collectionViewStyle$.subscribe((newStyle)=> {
      this.setCollectionsStyle(newStyle);
    });
 
  }
  
  // setCollections() {
  //    const NUM_ITEMS = 10; // Number of items in the array

  //   for (let i = 0; i < NUM_ITEMS; i++) {
  //     const item: ICollection = {
  //       user: `${i}`,
  //       name: `Collection ${i}`,
  //       currentImage: this.back,
  //       images: [
  //         "https://images.pexels.com/photos/185933/pexels-photo-185933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //         "https://images.pexels.com/photos/1008000/pexels-photo-1008000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //         "https://images.pexels.com/photos/3775553/pexels-photo-3775553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //       ],
  //       date: new Date(),
  //       fullLearned: i > 7 ? true : false
  //     };
  //     this.collections[i] = item;
  //   }
  // }
}
