import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-word-panel',
  templateUrl: './word-panel.component.html',
  styleUrls: ['./word-panel.component.scss']
})
export class WordPanelComponent {
  @Input() collection_id: string

  constructor(
    private router: Router
  ) {}

  openTrainingPage() {
    this.router.navigate(['/training', this.collection_id]);
  }

}
