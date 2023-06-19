import { Component, OnInit } from '@angular/core';
import { CollectionService, IPagerParams } from 'src/app/services/collection.service';
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
