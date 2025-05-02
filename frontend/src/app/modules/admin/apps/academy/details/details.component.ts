// Definir VideoQuality localmente
export interface VideoQuality {
    src: string;
    type: string;
    label: string;
}

import { CdkScrollable } from '@angular/cdk/scrolling';
import { DOCUMENT, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { FuseFindByKeyPipe } from '@fuse/pipes/find-by-key/find-by-key.pipe';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { AcademyService } from 'app/modules/admin/apps/academy/academy.service';
import { Category } from 'app/modules/admin/apps/academy/academy.types';
import { Subject, takeUntil } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ProfessionalVideoPlayerComponent } from './video-player.component';

// Definir tipos locales
export interface VideoInfo {
    url: string;
    poster?: string;
    subtitlesUrl?: string;
}

export interface CourseStep {
    order?: number;
    title?: string;
    subtitle?: string;
    content?: string;
    video?: VideoInfo;
}

export interface Course {
    id: string;
    title: string;
    description: string;
    duration: number;
    progress: { currentStep: number };
    totalSteps: number;
    category: string;
    steps: CourseStep[];
}

@Component({
    selector       : 'academy-details',
    templateUrl    : './details.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        MatSidenavModule, 
        RouterLink, 
        MatIconModule, 
        NgIf, 
        NgClass, 
        NgFor, 
        MatButtonModule, 
        MatProgressBarModule, 
        CdkScrollable, 
        MatTabsModule, 
        FuseFindByKeyPipe,
        ProfessionalVideoPlayerComponent
    ],
})
export class AcademyDetailsComponent implements OnInit, OnDestroy
{
    @ViewChild('courseSteps', {static: true}) courseSteps: MatTabGroup;
    categories: Category[];
    course: Course;
    currentStep: number = 0;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        @Inject(DOCUMENT) private _document: Document,
        private _academyService: AcademyService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _elementRef: ElementRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _sanitizer: DomSanitizer,
        private _httpClient: HttpClient,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Primero, intentar cargar desde el servicio
        this._academyService.categories$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((categories: Category[]) => {
                this.categories = categories;
                this._changeDetectorRef.markForCheck();
            });

        this._academyService.course$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((course: Course) => {
                // Asegurar que el curso tenga pasos y video
                if (!course) {
                    course = {
                        id: 'test-course',
                        title: 'Curso de Prueba',
                        description: 'Curso de ejemplo',
                        duration: 60,
                        progress: { currentStep: 0 },
                        totalSteps: 1,
                        category: 'web',
                        steps: []
                    };
                }

                // Asegurar que haya al menos un paso con video
                if (!course.steps || course.steps.length === 0) {
                    course.steps = [{
                        order: 0,
                        title: 'Video de Prueba',
                        subtitle: 'Ejemplo de reproducción',
                        content: '<p>Contenido de ejemplo</p>',
                        video: {
                            url: 'assets/test-videos/sample-video.mp4',
                            poster: '',
                            subtitlesUrl: ''
                        }
                    }];
                }

                // Asegurar que cada paso tenga un video
                course.steps = course.steps.map((step, index) => ({
                    ...step,
                    order: index,
                    video: step.video || {
                        url: 'assets/test-videos/sample-video.mp4',
                        poster: '',
                        subtitlesUrl: ''
                    }
                }));

                this.course = course;
                this.goToStep(course.progress.currentStep);
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) =>
            {
                // Set the drawerMode and drawerOpened
                if ( matchingAliases.includes('lg') )
                {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                }
                else
                {
                    this.drawerMode = 'over';
                    this.drawerOpened = false;
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Go to given step
     *
     * @param step
     */
    goToStep(step: number): void
    {
        // Set the current step
        this.currentStep = step;

        // Go to the step
        this.courseSteps.selectedIndex = this.currentStep;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Go to previous step
     */
    goToPreviousStep(): void
    {
        // Return if we already on the first step
        if ( this.currentStep === 0 )
        {
            return;
        }

        // Go to step
        this.goToStep(this.currentStep - 1);

        // Scroll the current step selector from sidenav into view
        this._scrollCurrentStepElementIntoView();
    }

    /**
     * Go to next step
     */
    goToNextStep(): void
    {
        // Return if we already on the last step
        if ( this.currentStep === this.course.totalSteps - 1 )
        {
            return;
        }

        // Go to step
        this.goToStep(this.currentStep + 1);

        // Scroll the current step selector from sidenav into view
        this._scrollCurrentStepElementIntoView();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    /**
     * Método para obtener la URL del video con múltiples rutas de respaldo
     * @param videoInfo Información del video
     * @returns URL del video
     */
    private getVideoUrl(videoInfo: VideoInfo): string {
        const possibleUrls = [
            videoInfo.url, // URL original
            'assets/test-videos/sample-video.mp4', // Ruta de prueba
            './assets/test-videos/sample-video.mp4', // Ruta relativa alternativa
            '/assets/test-videos/sample-video.mp4' // Ruta absoluta
        ];

        // Buscar la primera URL que funcione
        for (const url of possibleUrls) {
            try {
                // Verificar si el archivo existe (en tiempo de desarrollo)
                const xhr = new XMLHttpRequest();
                xhr.open('HEAD', url, false);
                xhr.send();
                
                if (xhr.status === 200) {
                    console.log('Video encontrado en:', url);
                    return url;
                }
            } catch (error) {
                console.warn('Error al verificar URL:', url, error);
            }
        }

        // Si no se encuentra ningún video, usar una URL de respaldo
        console.error('No se encontró ningún video de prueba');
        return 'https://example.com/fallback-video.mp4'; // URL de respaldo
    }

    /**
     * Inicializa un reproductor de video profesional
     * @param videoElement Elemento de video
     * @param videoInfo Información del video
     */
    initializeProfessionalVideoPlayer(videoElement: HTMLVideoElement, videoInfo: VideoInfo): void {
        // Limpiar cualquier estado previo
        videoElement.innerHTML = '';
        
        // Crear un nuevo elemento de video desde cero
        const newVideoElement = document.createElement('video');
        newVideoElement.classList.add('w-full');
        newVideoElement.controls = true;
        
        // Configuraciones de video
        newVideoElement.preload = 'metadata';
        
        // Establecer atributos
        newVideoElement.setAttribute('playsinline', '');
        newVideoElement.setAttribute('webkit-playsinline', '');

        // Manejar diferentes fuentes de video
        const sources = [
            videoInfo.url,
            'assets/test-videos/sample-video.mp4',
            './assets/test-videos/sample-video.mp4'
        ];

        // Crear múltiples source elements
        sources.forEach(src => {
            const sourceElement = document.createElement('source');
            sourceElement.src = src;
            sourceElement.type = 'video/mp4';
            newVideoElement.appendChild(sourceElement);
        });

        // Añadir poster si está disponible
        if (videoInfo.poster) {
            newVideoElement.poster = videoInfo.poster;
        }

        // Manejadores de eventos
        newVideoElement.addEventListener('error', (event) => {
            console.error('Error de reproducción de video:', event);
            this.showVideoErrorMessage(newVideoElement, 'No se pudo cargar el video');
        });

        newVideoElement.addEventListener('loadedmetadata', () => {
            console.log('Video cargado correctamente');
            
            // Intentar reproducción silenciosa
            newVideoElement.muted = true;
            newVideoElement.play().catch(error => {
                console.warn('Reproducción automática fallida:', error);
            });
        });

        // Reemplazar el video original
        if (videoElement.parentNode) {
            videoElement.parentNode.replaceChild(newVideoElement, videoElement);
        }
    }

    // Método auxiliar para mostrar mensajes de error
    private showVideoErrorMessage(videoElement: HTMLVideoElement, message: string): void {
        // Crear contenedor de error
        const errorContainer = document.createElement('div');
        errorContainer.classList.add('video-error-message');
        errorContainer.style.cssText = `
            color: red;
            background-color: rgba(255, 0, 0, 0.1);
            padding: 10px;
            text-align: center;
            border: 1px solid red;
            border-radius: 5px;
            margin-top: 10px;
            width: 100%;
        `;
        errorContainer.textContent = message;

        // Buscar el contenedor del video
        const container = videoElement.closest('.video-container');
        if (container) {
            // Eliminar mensajes de error previos
            const existingErrors = container.querySelectorAll('.video-error-message');
            existingErrors.forEach(el => el.remove());

            // Añadir nuevo mensaje de error
            container.appendChild(errorContainer);
        }
    }

    /**
     * Realiza un seguimiento de las métricas de reproducción de video
     * @param videoInfo Información del video
     */
    private trackVideoAnalytics(videoInfo: VideoInfo): void {
        // Implementar lógica de seguimiento de reproducción
        // Podría incluir envío de eventos a un servicio de análisis
        console.log('Iniciando seguimiento de análisis de video:', videoInfo);
    }

    /**
     * Maneja errores de reproducción de video de manera profesional
     * @param event Evento de error
     */
    private handleVideoError(event: Event): void {
        const videoElement = event.target as HTMLVideoElement;
        
        // Diferentes tipos de manejo de errores
        switch (videoElement.error?.code) {
            case MediaError.MEDIA_ERR_ABORTED:
                console.warn('Reproducción de video abortada');
                break;
            case MediaError.MEDIA_ERR_NETWORK:
                console.error('Error de red al cargar el video');
                // Implementar lógica de reintento
                break;
            case MediaError.MEDIA_ERR_DECODE:
                console.error('Error de decodificación del video');
                break;
            case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                console.error('Formato de video no soportado');
                break;
            default:
                console.error('Error desconocido en la reproducción de video');
        }
    }

    /**
     * Verifica si la URL es un video de YouTube
     * @param url URL del video
     * @returns Booleano indicando si es un video de YouTube
     */
    isYouTubeVideo(url: string): boolean {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/;
        return youtubeRegex.test(url);
    }

    /**
     * Sanitiza la URL de YouTube para prevenir ataques XSS
     * @param url URL del video de YouTube
     * @returns URL segura para iframe
     */
    sanitizeYouTubeUrl(url: string): SafeResourceUrl {
        // Extraer el ID del video
        const videoId = this.extractYouTubeVideoId(url);
        
        // Construir URL de inserción segura
        const safeUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&modestbranding=1&rel=0`;
        
        return this._sanitizer.bypassSecurityTrustResourceUrl(safeUrl);
    }

    /**
     * Extrae el ID de un video de YouTube
     * @param url URL del video
     * @returns ID del video
     */
    private extractYouTubeVideoId(url: string): string {
        const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        return match ? match[1] : '';
    }

    /**
     * Inicializa el reproductor de YouTube
     * @param playerElement Elemento iframe del reproductor
     */
    initializeYouTubePlayer(playerElement: HTMLIFrameElement): void {
        if (!playerElement) return;

        // Eventos personalizados para el reproductor de YouTube
        const onPlayerReady = (event: any) => {
            console.log('Reproductor de YouTube listo');
            // Puedes agregar configuraciones adicionales aquí
        };

        const onPlayerStateChange = (event: any) => {
            switch (event.data) {
                case 0:  // Video terminado
                    console.log('Video de YouTube terminado');
                    break;
                case 1:  // Reproduciendo
                    console.log('Reproduciendo video de YouTube');
                    break;
                case 2:  // Pausado
                    console.log('Video de YouTube pausado');
                    break;
            }
        };

        // Puedes expandir esta lógica con la API de YouTube si es necesario
        console.log('Inicializando reproductor de YouTube:', playerElement);
    }

    /**
     * Maneja errores de carga de video con estrategia de respaldo
     * @param videoElement Elemento de video
     * @param videoInfo Información del video
     */
    private handleVideoLoadError(videoElement: HTMLVideoElement, videoInfo: VideoInfo): void {
        // Estrategias de respaldo para cargar video
        const backupUrls = [
            'assets/test-videos/fallback-video.mp4',  // Video de respaldo local
            videoInfo.url,  // URL original
        ];

        const tryNextBackupUrl = (index: number) => {
            if (index >= backupUrls.length) {
                console.error('No se pudo cargar ningún video');
                return;
            }

            const backupUrl = backupUrls[index];
            videoElement.src = backupUrl;
            
            videoElement.onerror = () => {
                console.warn(`Falló la carga del video desde ${backupUrl}`);
                tryNextBackupUrl(index + 1);
            };

            videoElement.onloadedmetadata = () => {
                console.log(`Video cargado desde ${backupUrl}`);
            };
        };

        tryNextBackupUrl(0);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Scrolls the current step element from
     * sidenav into the view. This only happens when
     * previous/next buttons pressed as we don't want
     * to change the scroll position of the sidebar
     * when the user actually clicks around the sidebar.
     *
     * @private
     */
    private _scrollCurrentStepElementIntoView(): void
    {
        // Wrap everything into setTimeout so we can make sure that the 'current-step' class points to correct element
        setTimeout(() =>
        {
            // Get the current step element and scroll it into view
            const currentStepElement = this._document.getElementsByClassName('current-step')[0];
            if ( currentStepElement )
            {
                currentStepElement.scrollIntoView({
                    behavior: 'smooth',
                    block   : 'start',
                });
            }
        });
    }

    getVideoSources(videoInfo: VideoInfo): VideoQuality[] {
        return [
            {
                src: videoInfo.url,
                type: 'video/mp4',
                label: 'Auto'
            },
            {
                src: 'assets/test-videos/sample-video-480p.mp4',
                type: 'video/mp4',
                label: '480p'
            },
            {
                src: 'assets/test-videos/sample-video-720p.mp4',
                type: 'video/mp4',
                label: '720p'
            },
            {
                src: 'assets/test-videos/sample-video-1080p.mp4',
                type: 'video/mp4',
                label: '1080p'
            }
        ];
    }
}
