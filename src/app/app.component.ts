import { Component } from '@angular/core';
import { ScrollService } from './services/common/scroll-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  title = 'remax-customer-ui';
  constructor(private scrollService: ScrollService) {}

  ngOnInit() {
    this.scrollService.scrollToTopOnNavigation();
  }
}