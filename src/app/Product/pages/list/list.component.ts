import { Component, OnInit, ViewChild } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { ProductService } from '../../services/product.service';
import { StorageService } from '../../../shared/services/storage.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import { Product } from '../../interfaces/product';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatPaginatorModule,
    MatTableModule,
    RouterModule,
    MatButtonModule

  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
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
    this.obtenerProductos();// Llamar a la función para obtener los datos del producto

  }
  nuevoProducto(){
    this.router.navigate(['/layout/product/create']);
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

  editarProduct(producto: Product) {
    const productId = producto.id;
    console.log("Producto ID:", productId);

    this.router.navigate(['/layout/product/create', productId]).then(success => {
      if (success) {
        console.log("Navegación exitosa a la edición del producto.");
      } else {
        console.error("Error en la navegación.");
      }
    });
  }

  removerProduct(product: Product){

    Swal.fire({
     title: 'Desea eliminar el Product',
     text: product.name,
     icon: 'warning',
     confirmButtonColor: '#3085d6',
     confirmButtonText: 'Si, Eliminar',
     showCancelButton: true,
     cancelButtonColor: '#d33',
     cancelButtonText: 'No'
    }).then((resultado)=> {
      if(resultado.isConfirmed){
        this._productService.eliminar(product.id).subscribe({
            next: (data) =>{
              if(data.isExitoso){
                this._storageService.mostrarAlerta('El Producto fue eliminado', 'Completo');
                this.obtenerProductos();
              }
              else{
                this._storageService.mostrarAlerta('No se pudo eliminar el producto', 'Error!');
              }
            },
          error: (e) => {}
        });
      }
    });
  }

}
