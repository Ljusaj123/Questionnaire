import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
   imports: [RouterOutlet, Header, ToastModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'frontend';
}
