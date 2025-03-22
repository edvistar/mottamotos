import { Component, ViewChild } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
//import { Marca } from '../interfaces/marca';
import { StorageService } from '../../../shared/services/storage.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import Swal from 'sweetalert2';
import { Category } from '../../interfaces/category';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-list-category',
  standalone: true,
  imports: [MatCardModule, MatIconModule,
    MatDividerModule, MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,

  ],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.scss'
})
export class ListCategoryComponent {
  displayedColumns: string [] = [
    'name',
    'description',
    'status',
    'acciones'
  ];
  dataInicial: CategoryService []= [];
   dataSource = new MatTableDataSource(this.dataInicial);
      @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

      constructor(private _categoryService: CategoryService,
                  private _storageService: StorageService,
                  private router: Router){

      }
      ngOnInit(): void {
        this.obtenerCategorias();
      }
      nuevoCategory(){
        this.router.navigate(['/layout/category/create-category']);
      }
      obtenerCategorias(){
        this._categoryService.lista().subscribe({
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
            console.error("Error en Obtener La categoria:", e);
          }
       });
      }
      editarCategoria(category: Category) {
          const categoryId = category.id;
          console.log("Category ID:", categoryId);

          this.router.navigate(['/layout/category/create-category', categoryId]).then(success => {
            if (success) {
              console.log("Navegación exitosa a la edición de la categoria.");
            } else {
              console.error("Error en la navegación.");
            }
          });
        }
        removerCategoria(category: Category){

                Swal.fire({
                 title: 'Desea eliminar laMarca',
                 text: category.name,
                 icon: 'warning',
                 confirmButtonColor: '#3085d6',
                 confirmButtonText: 'Si, Eliminar',
                 showCancelButton: true,
                 cancelButtonColor: '#d33',
                 cancelButtonText: 'No'
                }).then((resultado)=> {
                  if(resultado.isConfirmed){
                    this._categoryService.eliminar(category.id).subscribe({
                        next: (data) =>{
                          if(data.isExitoso){
                            this._storageService.mostrarAlerta('La Marca fue eliminada', 'Completo');
                            this.obtenerCategorias();
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
