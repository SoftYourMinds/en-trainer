import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-collection-card',
  templateUrl: './add-collection-card.component.html',
  styleUrls: ['./add-collection-card.component.scss']
})
export class AddCollectionCardComponent {
  numberAllCollections: number = 0; 
}
