import { Component, OnInit, Input} from '@angular/core';
import { CollectionService } from 'src/app/services/collection.service';
import { ActivatedRoute, Router, NavigationEnd, Params } from '@angular/router';

interface  IBradcramps {
  id: string,
  name: string
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'], 
})
export class BreadcrumbsComponent implements OnInit {
  @Input() collection_id: string;
  breadcrumbs: any[] = [];
  oldId: string;
  currentName: string;

  constructor(
    private router: Router,
    private collectionService: CollectionService,
    private route: ActivatedRoute,
  ) { }
  
  ngOnInit(): void { 
    this.route.params.subscribe((params: Params) => { 
      this.currentName = params['name']; 
    });
  }

  ngDoCheck(): void {
    if(this.collection_id === this.oldId) return;
    this.getAncsestors(); 
  }

  getAncsestors() {
    this.oldId = this.collection_id;
    this.collectionService.getAncestorsByCollectionId(this.collection_id).subscribe((result) => {
      this.breadcrumbs = this.processAncestors(result);
      console.log(this.breadcrumbs)
    });
  }

  processAncestors(ancestors: any[]): any[] {
    const breadcrumbs = [];

    for (let i = ancestors.length - 1; i >= 0; i--) {
      const ancestor = ancestors[i];
      breadcrumbs.push({
        id: ancestor._id,
        name: ancestor.name,
        url: `/collection/${ancestor._id}/${ancestor.name}`
      });
    }
    
    console.log(breadcrumbs);
    return breadcrumbs;
  }

}

