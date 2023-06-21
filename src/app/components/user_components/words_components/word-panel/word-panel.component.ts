import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-word-panel',
  templateUrl: './word-panel.component.html',
  styleUrls: ['./word-panel.component.scss']
})
export class WordPanelComponent {
  @Input() collection_id: string

}
