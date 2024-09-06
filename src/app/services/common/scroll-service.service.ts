import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Location, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  public scrollToTop(): void {
    let isBrowser = isPlatformBrowser(this.platformId);
    if (isBrowser) {
      window.scrollTo(0, 0);
    }
  }

  public scrollToTopOnNavigation(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.scrollToTop();
      });
  }
}
