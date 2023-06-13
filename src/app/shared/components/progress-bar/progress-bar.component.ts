import { Component, OnInit } from '@angular/core';
import { ProgressBarService } from './progress-bar.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  isLoading = true;

  constructor(private ProgressBarService: ProgressBarService) {
  }

  ngOnInit  (): void {
     this.ProgressBarService.loader$.subscribe((isLoading) => {
        this.isLoading = isLoading;
     })
  }
}
