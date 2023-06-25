import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-collection-page',
  templateUrl: './collection-page.component.html',
  styleUrls: ['./collection-page.component.scss'],
})

export class CollectionPageComponent implements OnInit, AfterViewInit {
  collectionId: string;
  bradcrumbLabel: string;

  constructor(private route: ActivatedRoute,
    private renderer: Renderer2) {}

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.collectionId = params['id'];
      this.bradcrumbLabel = params['name'];
    });
  }

  ngAfterViewInit(): void {
    const element = document.querySelector('.mat-mdc-tab-body-content');
    if (element) {
      this.renderer.setStyle(element, 'min-height', '25rem');
    }
  }


}
