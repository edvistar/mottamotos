import { Component, ViewChild } from '@angular/core';
import { MarcaService } from '../../data-access/marca.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Marca } from '../interfaces/marca';
import { StorageService } from '../../../shared/data-access/storage.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import Swal from 'sweetalert2';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-list-marca',
  standalone: true,
  imports: [
      MatCardModule, 
      MatIconModule,
      MatDividerModule, 
      MatPaginatorModule,
      MatTableModule,
      MatInputModule,
      MatIconModule, 
      MatListModule, 
      RouterModule,

    ],
  templateUrl: './list-marca.component.html',
  styleUrl: './list-marca.component.scss'
})
export class ListMarcaComponent {
   displayedColumns: string [] = [
      'name',
      'description',
      'status',
      'acciones'
    ];
    dataInicial: MarcaService []= [];
    dataSource = new MatTableDataSource(this.dataInicial);
    @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

    constructor(private _marcaService: MarcaService,
                private _storageService: StorageService,
                private router: Router){

    }

    ngOnInit(): void {
      this.obtenerMarcas();
    }
    nuevoMarca(){
      this.router.navigate(['/layout/marca/create-marca']);
    }

    obtenerMarcas(){
      this._marcaService.lista().subscribe({
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
          console.error("Error en Obtener Productos:", e);
        }
     });
    }
 editarMarca(marca: Marca) {
    const marcaId = marca.id;
    console.log("Marca ID:", marcaId);

    this.router.navigate(['/layout/marca/create-marca', marcaId]).then(success => {
      if (success) {
        console.log("Navegación exitosa a la edición de la marca.");
      } else {
        console.error("Error en la navegación.");
      }
    });
  }
    removerMarca(marca: Marca){

        Swal.fire({
         title: 'Desea eliminar laMarca',
         text: marca.name,
         icon: 'warning',
         confirmButtonColor: '#3085d6',
         confirmButtonText: 'Si, Eliminar',
         showCancelButton: true,
         cancelButtonColor: '#d33',
         cancelButtonText: 'No'
        }).then((resultado)=> {
          if(resultado.isConfirmed){
            this._marcaService.eliminar(marca.id).subscribe({
                next: (data) =>{
                  if(data.isExitoso){
                    this._storageService.mostrarAlerta('La Marca fue eliminada', 'Completo');
                    this.obtenerMarcas();
                  }
                  else{
                    this._storageService.mostrarAlerta('No se pudo eliminar la Marca', 'Error!');
                  }
                },
              error: (e) => {}
            });
          }
        });
      }
}
