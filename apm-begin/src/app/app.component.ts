//import 'zone.js/dist/zone';  // Required for Stackblitz
import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'pm-root',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Just enough here for the template to compile
  pageTitle = 'Acme Product Management';

  cartCount = 0;

}
