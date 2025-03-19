import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})
export class HomeComponent {
  effect = 'scrollx';
  subCategories = [
    'electronics',
    'vehicle',
    'property',
    'pets',
    'toys',
    'others',
  ];
  carouselImage = [
    {
      img: './assets/images/carousel-img.png',
    },
    {
      img: './assets/images/carousel-img.png',
    },
    {
      img: './assets/images/carousel-img.png',
    },
    {
      img: './assets/images/carousel-img.png',
    },
  ];
}
