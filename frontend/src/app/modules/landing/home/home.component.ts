import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector     : 'landing-home',
    templateUrl  : './home.component.html',
    styleUrls    : ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [
        MatButtonModule, 
        RouterLink, 
        MatIconModule, 
        CommonModule,
        MatToolbarModule,
        MatMenuModule
    ],
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

    menuItems = [
        {
            title: 'Escuelas EPIC',
            hasSubmenu: true,
            icon: 'academic_cap'
        },
        {
            title: 'Cursos',
            hasSubmenu: true,
            icon: 'book_open'
        },
        {
            title: 'Trabaja en EPIC',
            hasSubmenu: false,
            icon: 'briefcase'
        },
        {
            title: '¡Sube a premium!',
            hasSubmenu: false,
            icon: 'star',
            highlight: true
        },
        {
            title: 'EPIClabs',
            hasSubmenu: false,
            icon: 'beaker',
            badge: 'Nuevo'
        }
    ];

    /**
     * Constructor
     */
    constructor()
    {
    }
}
