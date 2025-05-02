import { Component, ViewEncapsulation, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
    selector: 'home-academy',
    templateUrl: './home-academy.component.html',
    styleUrls: ['./home-academy.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        RouterLink
    ],
    animations: [
        trigger('slideInOut', [
            transition(':enter', [
                style({ transform: 'translateX(100%)', opacity: 0 }),
                animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
            ]),
            transition(':leave', [
                animate('300ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 }))
            ])
        ])
    ]
})
export class HomeAcademyComponent implements OnInit, OnDestroy {
    currentSlide = 0;
    private carouselInterval: any;

    // Datos para la sección "Continuar viendo"
    continuarViendo = [
        {
            titulo: 'Fundamentos de Programación',
            imagen: 'assets/images/home-academy/courses/programming_fundamentals.jpg',
            temporada: 'Curso Básico',
            tiempoRestantes: '2h 15min restantes'
        },
        {
            titulo: 'Desarrollo Web Fullstack',
            imagen: 'assets/images/home-academy/courses/web_development.jpg',
            temporada: 'Nivel Intermedio',
            tiempoRestantes: '4h 30min restantes'
        },
        {
            titulo: 'Introducción a Machine Learning',
            imagen: 'assets/images/home-academy/courses/machine_learning.jpg',
            temporada: 'Curso Avanzado',
            tiempoRestantes: '1h 45min restantes'
        },
        {
            titulo: 'Diseño UX/UI Profesional',
            imagen: 'assets/images/home-academy/courses/ux_design.jpg',
            temporada: 'Curso Especializado',
            tiempoRestantes: '3h 10min restantes'
        },
        {
            titulo: 'Desarrollo de Apps Móviles',
            imagen: 'assets/images/home-academy/courses/mobile_development.jpg',
            temporada: 'Nivel Intermedio',
            tiempoRestantes: '2h 50min restantes'
        }
    ];

    cursosDestacados = [
        {
            titulo: 'Desarrollo Web Fullstack',
            descripcion: 'De cero a profesional en desarrollo web moderno',
            imagen: 'assets/images/home-academy/courses/web_development.jpg',
            instructor: 'Carlos Mendoza',
            duracion: '48 horas',
            nivel: 'Intermedio'
        },
        {
            titulo: 'Inteligencia Artificial con Python',
            descripcion: 'Aprende IA desde cero con proyectos reales',
            imagen: 'assets/images/home-academy/courses/machine_learning.jpg',
            instructor: 'María Fernández',
            duracion: '60 horas',
            nivel: 'Avanzado'
        },
        {
            titulo: 'Diseño UX/UI Profesional',
            descripcion: 'Crea interfaces increíbles y centradas en el usuario',
            imagen: 'assets/images/home-academy/courses/ux_design.jpg',
            instructor: 'Laura Sánchez',
            duracion: '36 horas',
            nivel: 'Intermedio'
        }
    ];

    categoriasAprendizaje = [
        {
            nombre: 'Programación',
            icono: 'assets/images/home-academy/categories/programming_icon.svg',
            cursos: 15
        },
        {
            nombre: 'Diseño',
            icono: 'assets/images/home-academy/categories/design_icon.svg',
            cursos: 8
        },
        {
            nombre: 'IA',
            icono: 'assets/images/home-academy/categories/ai_icon.svg',
            cursos: 6
        },
        {
            nombre: 'Marketing',
            icono: 'assets/images/home-academy/categories/marketing_icon.svg',
            cursos: 5
        },
        {
            nombre: 'Negocios',
            icono: 'assets/images/home-academy/categories/business_icon.svg',
            cursos: 7
        },
        {
            nombre: 'Datos',
            icono: 'assets/images/home-academy/categories/data_science_icon.svg',
            cursos: 4
        },
        {
            nombre: 'Seguridad',
            icono: 'assets/images/home-academy/categories/cybersecurity_icon.svg',
            cursos: 3
        },
        {
            nombre: 'Cloud',
            icono: 'assets/images/home-academy/categories/cloud_icon.svg',
            cursos: 5
        }
    ];

    // Estado para mostrar tarjetas adicionales
    mostrarTarjetasAdicionales = false;

    @ViewChild('continuarViendoContainer') continuarViendoContainer: ElementRef;

    ngOnInit() {
        // Iniciar el carrusel automático
        this.startCarousel();
    }

    startCarousel() {
        this.carouselInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Cambiar cada 5 segundos
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % 3; // 3 es el número total de slides
    }

    goToSlide(slideIndex: number) {
        this.currentSlide = slideIndex;
        // Reiniciar el intervalo cuando se selecciona manualmente un slide
        clearInterval(this.carouselInterval);
        this.startCarousel();
    }

    // Método para desplazar el carrusel de "Continuar viendo"
    scrollContinuarViendo(direction: 'left' | 'right') {
        if (direction === 'right') {
            // Mostrar tarjetas adicionales
            this.mostrarTarjetasAdicionales = true;
        } else {
            // Ocultar tarjetas adicionales
            this.mostrarTarjetasAdicionales = false;
        }
    }

    ngOnDestroy() {
        // Limpiar el intervalo cuando el componente se destruye
        if (this.carouselInterval) {
            clearInterval(this.carouselInterval);
        }
    }

    constructor() {}
} 