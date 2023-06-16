import { Component } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { ViewCollectionsService } from 'src/app/shared/services/view-collections.service';

@Component({
  selector: 'app-collection-control-panel',
  templateUrl: './collection-control-panel.component.html',
  styleUrls: ['./collection-control-panel.component.scss']
})

export class CollectionControlPanelComponent {

  constructor(private ViewCollectionsService: ViewCollectionsService) {
  
  }

  onToggleChange(event: MatButtonToggleChange) {
    const selectedValue = event.value;
    this.ViewCollectionsService.setCollectionViewStyle(selectedValue);
  }

}
