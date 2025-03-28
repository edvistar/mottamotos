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

  guardarSesion(sesion: { userName: string; rol: string }){
    localStorage.setItem("usuarioSesion", JSON.stringify (sesion));
  }

  obtenerSesion() {
    const sesionString = localStorage.getItem("usuarioSesion");
    if (!sesionString) return null; // Evita errores si no hay datos

    try {
      const usuarioSesion = JSON.parse(sesionString);
      console.log("🟢 Sesión obtenida desde localStorage:", usuarioSesion);
      return usuarioSesion;
    } catch (error) {
      console.error("⚠️ Error al parsear la sesión:", error);
      return null;
    }
  }


  eliminarSesion(){
    localStorage.removeItem("usuarioSesion");
  }
}
