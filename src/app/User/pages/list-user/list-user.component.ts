import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { StorageService } from '../../../shared/services/storage.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import Swal from 'sweetalert2';
import { ApiResponse } from '../../../interfaces/api-response';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatPaginatorModule,
    MatTableModule,
  ],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.scss',
})
export class ListUserComponent {
  displayedColumns: string[] = [
    'userName',
    'apellidos',
    'nombres',
    'documento',
    'email',
    'address',
    'phoneNumber',
    'rol',
    'acciones',
  ];
  dataInicial: UserService[] = [];
  dataSource = new MatTableDataSource(this.dataInicial);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private _userService: UserService,
    private _storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }
  newUser() {
    this.router.navigate(['/layout/user/create-user']);
  }
  getUser() {
    this._userService.lista().subscribe({
      next: (data) => {
        if (data.isExitoso) {
          this.dataSource = new MatTableDataSource(data.resultado);
          this.dataSource.paginator = this.paginacionTabla;
        } else {
          this._storageService.mostrarAlerta(
            'No se encontraron datos',
            'Advertencia!'
          );
        }
      },
      error: (e) => {
        console.error('Error en Obtener los usuarios:', e);
      },
    });
  }
  editUser(user: User) {
    const userId = user.id;
    console.log('User ID:', userId);

    this.router
      .navigate(['/layout/user/update-user', userId])
      .then((success) => {
        if (success) {
          console.log('Navegación exitosa a la edición del usuario.');
        } else {
          console.error('Error en la navegación.');
        }
      });
  }
  deleteUser(user: User) {
    Swal.fire({
      title: 'Desea eliminar laMarca',
      text: user.userName,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, Eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this._userService.eliminar(user.id).subscribe({
          next: (data) => {
            if (data.isExitoso) {
              this._storageService.mostrarAlerta(
                'El Usuario fue eliminado',
                'Completo'
              );
              this.getUser();
            } else {
              this._storageService.mostrarAlerta(
                'No se pudo eliminar el usuario',
                'Error!'
              );
            }
          },
          error: (e) => {},
        });
      }
    });
  }
}
