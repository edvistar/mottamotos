import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { Router } from '@angular/router';
import { StorageService } from '../../data-access/storage.service';
import { CookieService } from 'ngx-cookie-service';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatToolbarModule,
    MatIconModule, MatSidenavModule,
    MatListModule, MatButtonModule,
    RouterModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  ngAfterViewInit() {
    setTimeout(() => {
      console.log('Sidenav:', this.sidenav);
    }, 1000);
  }

  toggleSidenav() {
    console.log('Botón clickeado');
    console.log('Sidenav:', this.sidenav);
    if (this.sidenav) {
      this.sidenav.toggle();
    } else {
      console.error('El sidenav no está definido');
    }
  }
  username: string = '';

  constructor(private router: Router, private _storageService: StorageService,
              private cookieService: CookieService){
  }
  ngOnInit(): void {
    const usuarioSesion = this._storageService.obtenerSesion();
    if(usuarioSesion!=null)
    {
      this.username = usuarioSesion;//este es el userName como viene del backend
    }
  }
  cerrarSesion(){
      this._storageService.eliminarSesion();

      this.cookieService.delete('Authorization', '/');

      this.router.navigateByUrl('/');
  }
}
