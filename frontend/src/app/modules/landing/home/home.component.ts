import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector     : 'landing-home',
    templateUrl  : './home.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [MatButtonModule, RouterLink, MatIconModule, CommonModule],
})
export class LandingHomeComponent
{
    escuelas = [
        {
            titulo: 'PROGRAMACIÓN Y DESARROLLO WEB',
            descripcion: 'Aprende programación y desarrollo web desde cero con las tecnologías más demandadas',
            icono: 'code'
        },
        {
            titulo: 'DESARROLLO FRONTEND',
            descripcion: 'Domina el desarrollo frontend y crea interfaces web atractivas y funcionales',
            icono: 'desktop_windows'
        },
        {
            titulo: 'DESARROLLO BACKEND',
            descripcion: 'Domina el desarrollo backend en esta escuela especializada',
            icono: 'storage'
        },
        {
            titulo: 'INTELIGENCIA ARTIFICIAL',
            descripcion: 'Conviértete en experto en inteligencia artificial en nuestra escuela',
            icono: 'psychology'
        }
    ];

    /**
     * Constructor
     */
    constructor()
    {
    }
}
