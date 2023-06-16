import { Component, Input } from '@angular/core';
import { ICollection } from 'src/app/shared/models/collection.model';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent {
  @Input() collection: ICollection;
}
