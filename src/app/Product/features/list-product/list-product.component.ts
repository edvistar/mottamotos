import { Component, OnInit, ViewChild } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { ProductService } from '../../data-access/product.service';
import { StorageService } from '../../../shared/data-access/storage.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [MatCardModule, MatIconModule,
    MatDividerModule, MatPaginatorModule,
    MatTableModule
  ],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss'
})
export class ListProductComponent implements OnInit {
  displayedColumns: string [] = [
    'name',
    'serialNumber',
    'description',
    'status',
    'acciones'
  ];
  dataInicial: ProductService []= [];
  dataSource = new MatTableDataSource(this.dataInicial);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(private _productService: ProductService,
              private _storageService: StorageService,
              private router: Router){

  }

  ngOnInit(): void {
    this.obtenerProductos();
  }
  nuevoProducto(){
    this.router.navigate(['/layout/product/create-product']);
  }

  obtenerProductos(){
    this._productService.lista().subscribe({
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
