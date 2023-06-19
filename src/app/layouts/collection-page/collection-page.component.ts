import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-collection-page',
  templateUrl: './collection-page.component.html',
  styleUrls: ['./collection-page.component.scss'],
})

export class CollectionPageComponent {
  collectionId: string;
  bradcrumbLabel: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.collectionId = params['id'];
      this.bradcrumbLabel = params['name'];
    });
  }
}
