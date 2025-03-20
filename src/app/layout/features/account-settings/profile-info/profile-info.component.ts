import { Component } from '@angular/core';
import { AuthenticationService } from '../../../../services/auth/authentication.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.sass',
})
export class ProfileInfoComponent {
  userData: any;
  constructor(public authService: AuthenticationService) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.userData = this.authService.userData;
      console.log('++++++++++++++++++++++++++++++++++++++++', this.userData);
    }, 500);
  }
}
