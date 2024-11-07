import { Component } from '@angular/core';

@Component({
  selector: 'app-copy-right',
  templateUrl: './copy-right.component.html',
  styleUrl: './copy-right.component.sass',
})
export class CopyRightComponent {
  year = new Date().getFullYear();
}
