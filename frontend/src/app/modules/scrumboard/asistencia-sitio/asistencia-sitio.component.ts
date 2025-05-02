import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-asistencia-sitio',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './asistencia-sitio.component.html',
    styleUrls: ['./asistencia-sitio.component.scss']
})
export class AsistenciaSitioComponent implements OnInit {
    constructor() { }

    ngOnInit(): void {
    }
}