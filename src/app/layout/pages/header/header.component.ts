import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/auth/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass',
})
export class HeaderComponent {
  constructor(public authService: AuthenticationService) {}

  ngOnInit(): void {}
}
