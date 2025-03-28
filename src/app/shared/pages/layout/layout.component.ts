import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { CookieService } from 'ngx-cookie-service';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    RouterModule,
    MatCardModule,
    MatCardModule,
MatIconModule,
MatDividerModule,
MatPaginatorModule,
MatTableModule,
MatInputModule,
MatIconModule,
MatListModule,
RouterModule, CommonModule, MatChipsModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleSidenav() {
    if (this.sidenav) {
      this.sidenav.toggle();
    } else {
      console.error('El sidenav no está definido');
    }
  }
  username: string = '';
  rolUsuario: string = '';

  constructor(private router: Router, private _storageService: StorageService,
              private cookieService: CookieService){
  }
  ngOnInit(): void {
    const usuarioSesion = this._storageService.obtenerSesion();
    if (usuarioSesion && usuarioSesion.userName) {
      this.username = usuarioSesion.userName; // ✅ Ahora asigna solo el nombre de usuario
       this.rolUsuario = usuarioSesion.rol?.toLowerCase() || ''; // Manejar si es null
    }

  }
  cerrarSesion(){
      this._storageService.eliminarSesion();

      this.cookieService.delete('Authorization', '/');

      this.router.navigateByUrl('/');
  }
}
