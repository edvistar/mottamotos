import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { Router } from '@angular/router';
import { StorageService } from '../../data-access/storage.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatToolbarModule,
    MatIconModule, MatSidenavModule
    ,MatListModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
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
