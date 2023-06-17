import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { CollectionService } from 'src/app/services/collection.service';
import { SnackBarService } from 'src/app/shared/components/snack-bar/snack-bar.service';
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
    private AuthorizationService: AuthorizationService,
    private CollectionService: CollectionService,
    private snackBarService: SnackBarService,
  ){ 
    
  } 
  
  ngOnInit(): void {
      
    this.parent_id = "null"
  }
  

}
