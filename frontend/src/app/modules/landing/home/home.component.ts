import { Component, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
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
export class LandingHomeComponent implements AfterViewInit, OnDestroy
{
    @ViewChild('schoolsCarousel') schoolsCarousel: ElementRef;
    currentPosition = 0;
    private autoScrollInterval: any;

    // Carrusel de próximos lanzamientos
    currentSlide = 0;
    private launchCarouselInterval: any;

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

    proximosLanzamientos = [
        {
            titulo: 'Escuela de Emprendedores 2025',
            subtitulo: 'Próximo',
            color: 'from-red-500 to-red-700',
            instructor: {
                nombre: 'Alvaro Felipe',
                pais: 'Perú',
                imagen: 'assets/images/avatars/alvaro-felipe.jpg'
            }
        },
        {
            titulo: 'Inteligencia Artificial para todos',
            subtitulo: 'Nuevo',
            color: 'from-purple-500 to-purple-700',
            instructor: {
                nombre: 'Alvaro Felipe',
                pais: 'Perú',
                imagen: 'assets/images/avatars/alvaro-felipe.jpg'
            }
        },
        {
            titulo: 'Creación de interfaces con SwiftUI',
            subtitulo: 'Próximo',
            color: 'from-blue-500 to-blue-700',
            instructor: {
                nombre: 'Kevin Morales',
                pais: 'México',
                imagen: 'assets/images/avatars/kevin-morales.jpg'
            }
        }
    ];

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

    ngAfterViewInit() {
        const carousel = this.schoolsCarousel.nativeElement.querySelector('.animate-carousel');
        
        // Observar las transiciones del carrusel
        carousel.addEventListener('transitionend', () => {
            this.updateCarouselPosition();
        });

        // Iniciar desplazamiento automático
        this.startAutoScroll();

        // Iniciar carrusel de próximos lanzamientos
        this.startLaunchCarousel();
    }

    updateCarouselPosition() {
        const carousel = this.schoolsCarousel.nativeElement.querySelector('.animate-carousel');
        const cards = carousel.children;
        
        // Mover la primera tarjeta al final
        const firstCard = cards[0];
        carousel.appendChild(firstCard.cloneNode(true));
        carousel.removeChild(firstCard);
        
        // Resetear la posición del carrusel sin animación
        carousel.style.transition = 'none';
        carousel.style.transform = 'translateX(0)';
        
        // Forzar reflow
        carousel.offsetHeight;
        
        // Restaurar la transición con easing
        carousel.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    startAutoScroll() {
        this.autoScrollInterval = setInterval(() => {
            this.moveCarousel();
        }, 3000); // Mover cada 3 segundos
    }

    moveCarousel() {
        const carousel = this.schoolsCarousel.nativeElement.querySelector('.animate-carousel');
        carousel.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Obtener el ancho de la ventana
        const width = window.innerWidth;
        let moveAmount;

        // Ajustar la cantidad de movimiento según el tamaño de la pantalla
        if (width > 1536) {
            moveAmount = 'calc(-400px - 2rem)';
        } else if (width > 1280) {
            moveAmount = 'calc(-350px - 2rem)';
        } else if (width > 1024) {
            moveAmount = 'calc(-300px - 1.5rem)';
        } else if (width > 768) {
            moveAmount = 'calc(-280px - 1.5rem)';
        } else if (width > 640) {
            moveAmount = 'calc(-250px - 1rem)';
        } else {
            moveAmount = 'calc(-85vw - 0.5rem)';
        }

        carousel.style.transform = `translateX(${moveAmount})`;
    }

    startLaunchCarousel() {
        this.launchCarouselInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Cambiar cada 5 segundos
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.proximosLanzamientos.length;
    }

    goToSlide(slideIndex: number) {
        this.currentSlide = slideIndex;
    }

    ngOnDestroy() {
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
        }

        // Detener el carrusel de próximos lanzamientos
        if (this.launchCarouselInterval) {
            clearInterval(this.launchCarouselInterval);
        }
    }
}
