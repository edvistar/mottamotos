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

@Component({
  selector: 'app-list-marca',
  standalone: true,
  imports: [MatCardModule, MatIconModule,
      MatDividerModule, MatPaginatorModule,
      MatTableModule],
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
      this.obtenerProductos();
    }
    nuevoMarca(){
      this.router.navigate(['/layout/marca/create-marca']);
    }

    obtenerProductos(){
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
}
