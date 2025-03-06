import { Injectable } from '@angular/core';
import { Sesion } from '../../auth/interfaces/sesion';
import { MatSnackBar } from '@angular/material/snack-bar';



@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private _snackBar: MatSnackBar) { }

  mostrarAlerta(mensaje: string, tipo:string){
    this._snackBar.open(mensaje, tipo, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration:3000
    })
  }

  guardarSesion(sesion: Sesion){
    localStorage.setItem("usuarioSesion", JSON.stringify (sesion.userName));
  }

  obtenerSesion(){
    const sesionString = localStorage.getItem("usuarioSesion");
    console.log("Aqui estamos verificando",sesionString);
    const usuarioSesion = JSON.parse(sesionString!);
    console.log("Aqui estamos verificando",usuarioSesion);
    return usuarioSesion;
  }

  eliminarSesion(){
    localStorage.removeItem("usuarioSesion");
  }
}
