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
            titulo: 'Atrapada en el medio',
            imagen: 'assets/images/shows/atrapada-medio.jpg',
            temporada: 'T1:E15',
            tiempoRestante: '22 min restantes'
        },
        {
            titulo: 'Miraculous: Londres, al filo del tiempo',
            imagen: 'assets/images/shows/miraculous.jpg',
            temporada: '2024',
            tiempoRestante: 'Acción y aventura'
        },
        {
            titulo: 'Lab Rats',
            imagen: 'assets/images/shows/lab-rats.jpg',
            temporada: 'T1:E4',
            tiempoRestante: '7 min restantes'
        },
        {
            titulo: 'Coop y Cami',
            imagen: 'assets/images/shows/coop-cami.jpg',
            temporada: 'T2:E14',
            tiempoRestante: '24 min restantes'
        },
        {
            titulo: 'Futurama',
            imagen: 'assets/images/shows/futurama.jpg',
            temporada: 'T2:E2',
            tiempoRestante: '16 min restantes'
        },
        // Tarjetas adicionales
        {
            titulo: 'Los Hechiceros de Waverly Place',
            imagen: 'assets/images/shows/hechiceros.jpg',
            temporada: 'T3:E10',
            tiempoRestante: '30 min restantes'
        },
        {
            titulo: 'Gravity Falls',
            imagen: 'assets/images/shows/gravity-falls.jpg',
            temporada: 'T2:E5',
            tiempoRestante: '25 min restantes'
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