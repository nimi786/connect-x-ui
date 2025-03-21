import { Component } from '@angular/core';
import { Post } from '../../../../model/addPostResponse';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})
export class HomeComponent {
  effect = 'scrollx';
  searchText = '';
  postData: Post[] = [];
  subCategories = [
    'electronics',
    'vehicle',
    'fashion & beauty',
    'property',
    'pets',
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

  elcectonicsList: Post[] = [];
  vehiclesList: Post[] = [];
  fashionList: Post[] = [];
  propertiesList: Post[] = [];
  petsList: Post[] = [];
  othersList: Post[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loadItems();
    }, 500);
  }

  loadItems() {
    this.dataService.getItemsByCategory('0').then((electronics) => {
      this.elcectonicsList = electronics.reverse().slice(0, 4);
    });

    this.dataService.getItemsByCategory('1').then((vehicles) => {
      this.vehiclesList = vehicles.reverse().slice(0, 4);
    });

    this.dataService.getItemsByCategory('2').then((properties) => {
      this.propertiesList = properties.reverse().slice(0, 4);
    });

    this.dataService.getItemsByCategory('3').then((pets) => {
      this.petsList = pets.reverse().slice(0, 4);
    });

    this.dataService.getItemsByCategory('4').then((fashion) => {
      this.fashionList = fashion.reverse().slice(0, 4);
    });
  }
}
