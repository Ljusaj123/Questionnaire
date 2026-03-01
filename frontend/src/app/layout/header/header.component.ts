import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, DrawerModule],
  templateUrl: './header.component.html',
})
export class Header {
  public headerText = '';
  visible: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let currentRoute = this.route.firstChild;

        while (currentRoute?.firstChild) {
          currentRoute = currentRoute.firstChild;
        }

        this.headerText = currentRoute?.snapshot.data['headerText'] ?? '';
      });
  }
}
