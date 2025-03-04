
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  constructor(private http: HttpClient) { }

  // Métodos para obtener datos
  obtenerDatos(): Observable<any> {
    // Implementar lógica de obtención de datos
    return this.http.get('assets/data/datos.json');
  }
}
