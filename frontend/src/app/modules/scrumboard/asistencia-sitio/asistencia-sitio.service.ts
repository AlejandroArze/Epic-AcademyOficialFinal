import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AsistenciaSitio } from './asistencia-sitio.types';

@Injectable({
    providedIn: 'root'
})
export class AsistenciaSitioService {
    private apiUrl = 'api/asistencia-sitio'; // Ajusta esta URL según tu backend

    constructor(private http: HttpClient) { }

    // Obtener todas las asistencias en sitio
    getAsistenciasSitio(): Observable<AsistenciaSitio[]> {
        return this.http.get<AsistenciaSitio[]>(this.apiUrl);
    }

    // Obtener una asistencia en sitio por ID
    getAsistenciaSitioById(id: string): Observable<AsistenciaSitio> {
        return this.http.get<AsistenciaSitio>(`${this.apiUrl}/${id}`);
    }

    // Crear una nueva asistencia en sitio
    createAsistenciaSitio(asistenciaSitio: AsistenciaSitio): Observable<AsistenciaSitio> {
        return this.http.post<AsistenciaSitio>(this.apiUrl, asistenciaSitio);
    }

    // Actualizar una asistencia en sitio
    updateAsistenciaSitio(asistenciaSitio: AsistenciaSitio): Observable<AsistenciaSitio> {
        return this.http.put<AsistenciaSitio>(`${this.apiUrl}/${asistenciaSitio.id}`, asistenciaSitio);
    }

    // Eliminar una asistencia en sitio
    deleteAsistenciaSitio(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}