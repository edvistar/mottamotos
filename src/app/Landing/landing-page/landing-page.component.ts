import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/feactures/navbar/navbar.component";
import { FooterComponent } from '../../shared/feactures/footer/footer.component';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, MatCardModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
