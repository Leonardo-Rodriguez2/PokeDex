import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderNavComponent } from './components/header.nav/header.nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderNavComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public title = 'PokeDex';
}
