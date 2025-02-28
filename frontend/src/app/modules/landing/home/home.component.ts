import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { animate, style, transition, trigger } from '@angular/animations';

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
    animations: [
        trigger('slideAnimation', [
            transition(':increment', [
                style({ transform: 'translateX(100%)', opacity: 0 }),
                animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
            ]),
            transition(':decrement', [
                style({ transform: 'translateX(-100%)', opacity: 0 }),
                animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
            ])
        ])
    ]
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

    testimonios = [
        {
            nombre: 'Catalina Navarrete',
            pais: '🇲🇽',
            imagen: 'assets/images/avatars/catalina.jpg',
            texto: 'Voy a la mitad de la carrera de "Ingeniería en Informática" en México. En todos esos años jamás aprendí todo lo que se aprendió en este curso. Si fue muy teórico pero realmente es algo que se necesita saber, es la base para cualquier programador.',
        },
        {
            nombre: 'Juan Pérez',
            pais: '🇨🇴',
            imagen: 'assets/images/avatars/juan.jpg',
            texto: 'Gracias a los cursos de EPIC pude conseguir mi primer trabajo como desarrollador. La metodología y la calidad del contenido son excepcionales. Ahora trabajo en una startup y sigo aprendiendo cada día.',
        },
        {
            nombre: 'María González',
            pais: '🇵🇪',
            imagen: 'assets/images/avatars/maria.jpg',
            texto: 'Cambié mi carrera completamente gracias a EPIC. Venía del área de marketing y ahora soy desarrolladora frontend. Los profesores son excelentes y la comunidad es muy activa y colaborativa.',
        }
    ];

    testimonioActual = 0;

    siguienteTestimonio() {
        this.testimonioActual = (this.testimonioActual + 1) % this.testimonios.length;
    }

    testimonioAnterior() {
        this.testimonioActual = (this.testimonioActual - 1 + this.testimonios.length) % this.testimonios.length;
    }

    /**
     * Constructor
     */
    constructor()
    {
    }
}
