import { Component, OnInit } from '@angular/core';
import { elementAt, Observable, map, of} from 'rxjs';
import { CollectionService, IPagerParams } from 'src/app/services/collection.service';
import { LoadMoreService } from 'src/app/shared/components/load-more/load-more.service';
import { ICollection } from 'src/app/shared/models/collection.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  collections: ICollection[]
  parent_id: string;

  constructor(
    private CollectionService: CollectionService){ 
  } 
  
  ngOnInit(): void {
    this.parent_id = "null";
  }

}
