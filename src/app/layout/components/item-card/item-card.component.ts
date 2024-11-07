import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.sass',
})
export class ItemCardComponent {
  constructor(private router: Router) {}
  ngOnInit(): void {}

  gotoProperty() {
    this.router.navigate(['property/2424242']);
  }
}
