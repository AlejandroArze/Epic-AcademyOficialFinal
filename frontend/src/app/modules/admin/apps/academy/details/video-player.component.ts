import { 
    Component, 
    Input, 
    ViewChild, 
    ElementRef, 
    OnInit, 
    OnDestroy, 
    ChangeDetectionStrategy, 
    ChangeDetectorRef,
    CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

export interface VideoQuality {
    src: string;
    type: string;
    label: string;
}

@Component({
    selector: 'app-professional-video-player',
    template: `
    <div class="video-player-container relative w-full bg-black"
        (click)="handleVideoTap($event)"
        (dblclick)="toggleFullScreenOnDoubleClick($event)">
        <!-- Video Element -->
        <video 
            #videoPlayer
            class="w-full h-auto"
            [poster]="poster"
            (timeupdate)="onTimeUpdate($event)"
            (loadedmetadata)="onLoadedMetadata($event)"
            (play)="onPlay()"
            (pause)="onPause()"
            (error)="onVideoError($event)">
            <ng-container *ngFor="let source of sources">
                <source 
                    [src]="source.src" 
                    [type]="source.type"
                    [attr.label]="source.label">
            </ng-container>
            Tu navegador no soporta el elemento de video.
        </video>

        <!-- Animación de Seek -->
        <div 
            *ngIf="showSeekAnimation"
            class="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
            [ngClass]="{
                'animate-seek-forward': seekAnimationType === 'forward',
                'animate-seek-backward': seekAnimationType === 'backward'
            }">
            <div class="bg-black/50 p-4 rounded-full">
                <svg 
                    *ngIf="seekAnimationType === 'forward'"
                    xmlns="http://www.w3.org/2000/svg" 
                    class="h-16 w-16 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor">
                    <path 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        stroke-width="2" 
                        d="M13 10V3L4 14h7v7l9-11h-7z" 
                    />
                </svg>
                <svg 
                    *ngIf="seekAnimationType === 'backward'"
                    xmlns="http://www.w3.org/2000/svg" 
                    class="h-16 w-16 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor">
                    <path 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        stroke-width="2" 
                        d="M12 14l-4-4 4-4m6 8l-4-4 4-4" 
                    />
                </svg>
            </div>
        </div>

        <!-- Controles Personalizados -->
        <div class="video-controls absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 flex flex-col">
            <!-- Barra de Progreso -->
            <div class="vjs-progress-control vjs-control w-full mb-2">
                <div 
                    tabindex="0" 
                    class="vjs-progress-holder vjs-slider vjs-slider-horizontal relative w-full h-1 bg-gray-700 cursor-pointer group"
                    role="slider"
                    [attr.aria-valuenow]="progress"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-label="Barra de Progreso"
                    [attr.aria-valuetext]="formatTime(currentTime) + ' de ' + formatTime(duration)"
                    (mouseenter)="onProgressBarEnter($event)"
                    (mousemove)="onProgressBarMove($event)"
                    (mouseleave)="onProgressBarLeave()"
                    (mousedown)="startSeek($event)"
                    (mouseup)="endSeek($event)">
                    
                    <!-- Progreso de carga -->
                    <div 
                        class="vjs-load-progress absolute top-0 left-0 h-full bg-gray-600/50" 
                        [style.width.%]="loadProgress">
                        <span class="vjs-control-text sr-only">
                            {{ loadProgress.toFixed(2) }}%
                        </span>
                    </div>

                    <!-- Línea de previsualización de tiempo -->
                    <div 
                        *ngIf="isHoveringProgressBar"
                        class="vjs-hover-progress absolute top-0 left-0 h-full bg-white/30"
                        [style.width.%]="hoverProgressPosition">
                    </div>

                    <!-- Tooltip de tiempo al pasar el mouse -->
                    <div 
                        *ngIf="isHoveringProgressBar"
                        class="vjs-time-tooltip absolute bottom-full text-xs bg-black/70 text-white px-2 py-1 rounded"
                        [style.left.px]="mouseDisplayPosition - 20">
                        {{ formatTime(mouseHoverTime) }}
                    </div>

                    <!-- Progreso de reproducción -->
                    <div 
                        class="vjs-play-progress vjs-slider-bar absolute top-0 left-0 h-full bg-blue-500" 
                        [style.width.%]="progress">
                        <!-- Bolita de progreso -->
                        <div 
                            class="vjs-progress-knob absolute top-1/2 right-0 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                            [style.right.%]="-1.5">
                            <!-- Tooltip de tiempo actual -->
                            <div 
                                class="vjs-time-tooltip absolute bottom-full right-1/2 translate-x-1/2 text-xs bg-black/70 text-white px-2 py-1 rounded whitespace-nowrap">
                                {{ formatTime(currentTime) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Controles de Reproducción -->
            <div class="controls-container flex items-center justify-between">
                <div class="left-controls flex items-center space-x-2">
                    <!-- Botón Retroceder 15 segundos -->
                    <button 
                        mat-icon-button 
                        (click)="seekBackward()"
                        matTooltip="Retroceder 15 segundos"
                        class="seek-button seek-backward p-1 rounded-full hover:bg-gray-700/50 transition-all duration-300">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.9709 14.9633H11.0925L10.9459 17.1083H11.01C11.0773 16.9739 11.1506 16.8486 11.23 16.7325C11.3095 16.6164 11.4011 16.5186 11.505 16.4392C11.6089 16.3597 11.7281 16.2986 11.8625 16.2558C12.0031 16.207 12.1711 16.1825 12.3667 16.1825C12.6417 16.1825 12.8984 16.2283 13.1367 16.32C13.375 16.4117 13.5798 16.5461 13.7509 16.7233C13.9281 16.8945 14.0656 17.1053 14.1634 17.3558C14.2673 17.6064 14.3192 17.8906 14.3192 18.2083C14.3192 18.5322 14.2673 18.8286 14.1634 19.0975C14.0595 19.3664 13.9067 19.6017 13.705 19.8033C13.5034 19.9989 13.2559 20.1517 12.9625 20.2617C12.6692 20.3717 12.3331 20.4267 11.9542 20.4267C11.6609 20.4267 11.3981 20.3931 11.1659 20.3258C10.9336 20.2647 10.7289 20.1792 10.5517 20.0692C10.3745 19.9592 10.2217 19.8339 10.0934 19.6933C9.96503 19.5467 9.85198 19.3939 9.7542 19.235L10.6342 18.5567C10.7075 18.6789 10.7839 18.795 10.8634 18.905C10.9428 19.0089 11.0345 19.1006 11.1384 19.18C11.2484 19.2595 11.3675 19.3236 11.4959 19.3725C11.6303 19.4153 11.7861 19.4367 11.9634 19.4367C12.3239 19.4367 12.5959 19.3358 12.7792 19.1342C12.9686 18.9325 13.0634 18.6575 13.0634 18.3092V18.2358C13.0634 17.9058 12.9686 17.6461 12.7792 17.4567C12.5898 17.2672 12.327 17.1725 11.9909 17.1725C11.7281 17.1725 11.5142 17.2245 11.3492 17.3283C11.1842 17.4261 11.0528 17.5331 10.955 17.6492L9.96503 17.5117L10.2034 13.9183H13.9709V14.9633Z" fill="white"/>
                            <path d="M3.67111 20.3167V19.3358H5.43111V14.7892H5.34861L3.95528 16.4392L3.20361 15.8067L4.78945 13.9183H6.61361V19.3358H8.08028V20.3167H3.67111Z" fill="white"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.455 4.3038C11.7418 3.94034 13.0939 3.90238 14.398 4.19331C15.7019 4.48421 16.9176 5.09495 17.9445 5.97204C18.9712 6.849 19.7791 7.96658 20.3034 9.23005C20.8277 10.4934 21.0539 11.8677 20.9642 13.2387C20.8745 14.6097 20.4713 15.9402 19.7866 17.1192C19.1017 18.2983 18.1544 19.2928 17.0213 20.0177C16.6802 20.236 16.2267 20.1364 16.0084 19.7952C15.7901 19.454 15.8898 19.0005 16.2309 18.7823C17.1635 18.1856 17.9485 17.3636 18.5183 16.3826C19.0882 15.4014 19.4256 14.2906 19.5007 13.1429C19.5758 11.9953 19.3862 10.8462 18.9488 9.7922C18.5114 8.73824 17.8396 7.81136 16.9919 7.08725C16.1443 6.36328 15.1452 5.86273 14.0786 5.62478C13.0122 5.38686 11.9067 5.4178 10.8537 5.71524C9.80055 6.01272 8.82818 6.56879 8.01864 7.33977C7.50375 7.83013 7.24019 8.20043 6.90459 8.74671L9.17985 8.69353C9.58475 8.68407 9.92065 9.00463 9.93012 9.40953C9.93958 9.81443 9.61902 10.1503 9.21412 10.1598L4.85004 10.2618V5.32C4.85004 4.91499 5.17836 4.58667 5.58337 4.58667C5.98838 4.58667 6.3167 4.91499 6.3167 5.32V7.02279C6.51116 6.78154 6.73352 6.5383 7.00715 6.27769C7.9866 5.3449 9.1684 4.66722 10.455 4.3038Z" fill="white"/>
                        </svg>
                    </button>

                    <!-- Botón Play/Pause -->
                    <button 
                        mat-icon-button 
                        (click)="togglePlayPause(); $event.stopPropagation()"
                        matTooltip="{{ isPlaying ? 'Pausar' : 'Reproducir' }}"
                        class="text-white">
                        <mat-icon class="text-white">{{ isPlaying ? 'pause' : 'play_arrow' }}</mat-icon>
                    </button>

                    <!-- Botón Adelantar 15 segundos -->
                    <button 
                        mat-icon-button 
                        (click)="seekForward()"
                        matTooltip="Adelantar 15 segundos"
                        class="seek-button seek-forward p-1 rounded-full hover:bg-gray-700/50 transition-all duration-300">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.3874 14.9633H17.5091L17.3624 17.1083H17.4266C17.4938 16.9739 17.5671 16.8486 17.6466 16.7325C17.726 16.6164 17.8177 16.5186 17.9216 16.4392C18.0255 16.3597 18.1446 16.2986 18.2791 16.2558C18.4196 16.207 18.5877 16.1825 18.7833 16.1825C19.0583 16.1825 19.3149 16.2283 19.5533 16.32C19.7916 16.4117 19.9963 16.5461 20.1674 16.7233C20.3447 16.8945 20.4821 17.1053 20.5799 17.3558C20.6838 17.6064 20.7358 17.8906 20.7358 18.2083C20.7358 18.5322 20.6838 18.8286 20.5799 19.0975C20.476 19.3664 20.3233 19.6017 20.1216 19.8033C19.9199 19.9989 19.6724 20.1517 19.3791 20.2617C19.0858 20.3717 18.7496 20.4267 18.3708 20.4267C18.0774 20.4267 17.8146 20.3931 17.5824 20.3258C17.3502 20.2647 17.1455 20.1792 16.9683 20.0692C16.791 19.9592 16.6383 19.8339 16.5099 19.6933C16.3816 19.5467 16.2685 19.3939 16.1708 19.235L17.0508 18.5567C17.1241 18.6789 17.2005 18.795 17.2799 18.905C17.3594 19.0089 17.451 19.1006 17.5549 19.18C17.6649 19.2595 17.7841 19.3236 17.9124 19.3725C18.0469 19.4153 18.2027 19.4367 18.3799 19.4367C18.7405 19.4367 19.0124 19.3358 19.1958 19.1342C19.3852 18.9325 19.4799 18.6575 19.4799 18.3092V18.2358C19.4799 17.9058 19.3852 17.6461 19.1958 17.4567C19.0063 17.2672 18.7435 17.1725 18.4074 17.1725C18.1446 17.1725 17.9308 17.2245 17.7658 17.3283C17.6008 17.4261 17.4694 17.5331 17.3716 17.6492L16.3816 17.5117L16.6199 13.9183H20.3874V14.9633Z" fill="white"/>
                            <path d="M10.0877 20.3167V19.3358H11.8477V14.7892H11.7652L10.3718 16.4392L9.62017 15.8067L11.206 13.9183H13.0302V19.3358H14.4968V20.3167H10.0877Z" fill="white"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M13.5449 4.3038C12.2582 3.94034 10.906 3.90238 9.60197 4.19331C8.29803 4.48421 7.08232 5.09495 6.05549 5.97204C5.02881 6.849 4.22085 7.96658 3.69653 9.23005C3.17226 10.4934 2.94605 11.8677 3.03576 13.2387C3.12546 14.6097 3.52864 15.9402 4.2134 17.1192C4.89822 18.2983 5.84556 19.2928 6.97863 20.0177C7.3198 20.236 7.7733 20.1364 7.99157 19.7952C8.20983 19.454 8.11021 19.0005 7.76904 18.7823C6.83649 18.1856 6.05148 17.3636 5.48167 16.3826C4.91179 15.4014 4.57438 14.2906 4.49929 13.1429C4.4242 11.9953 4.61378 10.8462 5.05119 9.7922C5.48856 8.73824 6.16033 7.81136 7.00807 7.08725C7.85565 6.36328 8.85473 5.86273 9.92133 5.62478C10.9878 5.38686 12.0932 5.4178 13.1463 5.71524C14.1994 6.01272 15.1718 6.56879 15.9813 7.33977C16.4962 7.83013 16.7598 8.20043 17.0954 8.74671L14.8201 8.69353C14.4152 8.68407 14.0793 9.00463 14.0699 9.40953C14.0604 9.81443 14.381 10.1503 14.7858 10.1598L19.1499 10.2618V5.32C19.1499 4.91499 18.8216 4.58667 18.4166 4.58667C18.0116 4.58667 17.6833 4.91499 17.6833 5.32V7.02279C17.4888 6.78154 17.2665 6.5383 16.9928 6.27769C16.0134 5.3449 14.8316 4.66722 13.5449 4.3038Z" fill="white"/>
                        </svg>
                    </button>

                    <!-- Tiempo Actual y Total -->
                    <div class="time-display text-white text-sm">
                        {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
                    </div>
                    <!-- Control de Volumen -->
                    <div class="volume-container flex items-center space-x-2">
                        <!-- Panel de Volumen -->
                        <div 
                            class="vjs-volume-panel vjs-control vjs-volume-panel-horizontal group"
                            (mouseenter)="showVolumeControl = true"
                            (mouseleave)="hideVolumeControl()">
                            <button 
                                class="vjs-mute-control vjs-control vjs-button vjs-vol-3"
                                type="button" 
                                [attr.aria-label]="isMuted ? 'Activar sonido' : 'Silenciar'"
                                (click)="toggleMute()"
                                [attr.aria-disabled]="false">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    class="w-6 h-6" 
                                    viewBox="0 0 24 24" 
                                    fill="white">
                                    <!-- Ícono base de altavoz -->
                                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                                    
                                    <!-- Línea de silencio cuando está muteado -->
                                    <path *ngIf="isMuted" d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                                </svg>
                            </button>

                            <!-- Control de Volumen -->
                            <div 
                                *ngIf="showVolumeControl"
                                class="vjs-volume-control vjs-control vjs-volume-horizontal absolute left-full top-1/2 -translate-y-1/2 z-10 bg-black/70 rounded p-1"
                                (mouseenter)="showVolumeControl = true"
                                (mouseleave)="hideVolumeControl()">
                                <div 
                                    tabindex="0" 
                                    class="vjs-volume-bar vjs-slider-bar vjs-slider vjs-slider-horizontal" 
                                    role="slider" 
                                    [attr.aria-valuenow]="(volume * 100).toFixed(0)"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                    aria-label="Nivel de Volumen"
                                    aria-live="polite"
                                    [attr.aria-valuetext]="(volume * 100).toFixed(0) + '%'"
                                    (mousedown)="startVolumeChange($event)"
                                    (mousemove)="updateVolumeChange($event)"
                                    (mouseup)="endVolumeChange($event)"
                                    (mouseleave)="endVolumeChange($event)">
                                    <div 
                                        class="vjs-mouse-display" 
                                        [style.left.px]="(volume * 100).toFixed(0)">
                                        <div 
                                            class="vjs-volume-tooltip" 
                                            aria-hidden="true"
                                            [style.right.px]="'-20.7917'">
                                            {{ (volume * 100).toFixed(0) }}%
                                        </div>
                                    </div>
                                    <div 
                                        class="vjs-volume-level" 
                                        [style.width.%]="(volume * 100).toFixed(0)">
                                        <span class="vjs-control-text"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                </div>

                <div class="right-controls flex items-center space-x-2">
                    
                        <!-- Picture-in-Picture -->
                        <button 
                            mat-icon-button 
                            (click)="togglePictureInPicture(); $event.stopPropagation()"
                            matTooltip="Picture-in-Picture"
                            class="text-white">
                            <mat-icon class="text-white">picture_in_picture</mat-icon>
                        </button>
                        <!-- Velocidad de Reproducción -->
                        <button 
                            mat-icon-button 
                            [matMenuTriggerFor]="speedMenu"
                            matTooltip="Velocidad de Reproducción"
                            class="text-white">
                            <mat-icon class="text-white">speed</mat-icon>
                        </button>

                        <!-- Calidad de Video -->
                        <button 
                            mat-icon-button 
                            [matMenuTriggerFor]="qualityMenu"
                            matTooltip="Calidad de Video"
                            class="text-white">
                            <mat-icon class="text-white">high_quality</mat-icon>
                        </button>

                        <!-- Subtítulos -->
                        <button 
                            mat-icon-button 
                            (click)="toggleSubtitles()"
                            matTooltip="Subtítulos"
                            class="text-white">
                            <mat-icon class="text-white">subtitles</mat-icon>
                        </button>

                        <!-- Pantalla Completa -->
                        <button 
                            mat-icon-button 
                            (click)="toggleFullScreen()"
                            matTooltip="Pantalla Completa"
                            class="text-white">
                            <mat-icon class="text-white">{{ isFullScreen ? 'fullscreen_exit' : 'fullscreen' }}</mat-icon>
                        </button>

                        
                   
                </div>
            </div>
        </div>

        <!-- Menú de Velocidad -->
        <mat-menu #speedMenu="matMenu">
            <button 
                mat-menu-item 
                *ngFor="let speed of playbackSpeeds" 
                (click)="setPlaybackSpeed(speed)">
                {{ speed }}x
            </button>
        </mat-menu>

        <!-- Menú de Calidad -->
        <mat-menu #qualityMenu="matMenu">
            <button 
                mat-menu-item 
                *ngFor="let source of sources" 
                (click)="setVideoQuality(source)">
                {{ source.label }}
            </button>
        </mat-menu>
    </div>
    `,
    styles: [`
        .video-player-container {
            @apply relative w-full;
        }
        .video-controls {
            transition: opacity 0.3s ease;
        }
        .video-controls:hover {
            opacity: 1;
        }
        .video-js {
            width: 100%;
            height: auto;
        }
        .seek-button {
            @apply rounded-full transition-all duration-300 ease-in-out;
        }
        .seek-button:hover {
            @apply bg-gray-700 scale-110 shadow-lg;
        }
        .seek-backward {
            @apply text-blue-400;
        }
        .seek-forward {
            @apply text-green-400;
        }
        
        /* Video.js Volume Styles */
        .vjs-volume-panel {
            @apply flex items-center relative;
        }
        .vjs-mute-control {
            @apply relative w-6 h-6 flex items-center justify-center text-white bg-transparent border-none cursor-pointer;
        }
        .vjs-mute-control .vjs-icon-placeholder {
            @apply w-full h-full bg-contain bg-center bg-no-repeat;
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M3 10V14C3 14.55 3.45 15 4 15H7L10.29 18.29C10.92 18.92 12 18.47 12 17.58V6.41C12 5.52 10.92 5.07 10.29 5.7L7 9H4C3.45 9 3 9.45 3 10Z"/></svg>');
        }
        .vjs-volume-control {
            @apply relative;
        }
        .vjs-volume-bar {
            @apply w-24 h-1 bg-gray-600 rounded-full cursor-pointer relative;
        }
        .vjs-volume-level {
            @apply absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-200;
        }
        .vjs-mouse-display {
            @apply absolute top-[-5px] w-3 h-3 bg-white rounded-full pointer-events-none;
        }
        .vjs-volume-tooltip {
            @apply absolute bottom-full text-xs text-white bg-black/70 px-1 py-0.5 rounded;
            transform: translateX(50%);
        }

        /* Estilos de animación de seek */
        @keyframes seekForward {
            0% { transform: scale(0.5); opacity: 0; }
            50% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1.5); opacity: 0; }
        }

        @keyframes seekBackward {
            0% { transform: scale(0.5); opacity: 0; }
            50% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1.5); opacity: 0; }
        }

        .animate-seek-forward {
            animation: seekForward 1s ease-out;
        }

        .animate-seek-backward {
            animation: seekBackward 1s ease-out;
        }
    `],
    standalone: true,
    imports: [
        CommonModule, 
        MatIconModule, 
        MatButtonModule, 
        MatSliderModule,
        MatTooltipModule,
        MatMenuModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfessionalVideoPlayerComponent implements OnInit, OnDestroy {
    @Input() sources: VideoQuality[] = [];
    @Input() poster: string = '';

    @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

    isPlaying: boolean = false;
    isFullScreen: boolean = false;
    progress: number = 0;
    loadProgress: number = 0;
    currentTime: number = 0;
    duration: number = 0;
    volume: number = 1;
    isMuted: boolean = false;

    // Nuevas propiedades para la previsualización de tiempo
    isHoveringProgressBar: boolean = false;
    hoverProgressPosition: number = 0;
    mouseDisplayPosition: number = 0;
    mouseHoverTime: number = 0;

    playbackSpeeds: number[] = [0.5, 1, 1.5, 2];

    // Propiedades para control de volumen
    private isChangingVolume = false;
    private lastVolume = 1;
    showVolumeControl = false;
    
    hideVolumeControl = () => {
        this.showVolumeControl = false;
    };

    // Propiedades para manejo de clics
    private lastTapTime = 0;
    private tapTimeout = 300; // Tiempo máximo entre clics
    private clickCount = 0;
    private clickTimer: any = null;

    // Propiedades para animación de seek
    seekAnimationType: 'forward' | 'backward' | null = null;
    showSeekAnimation = false;

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        console.log('Inicializando componente de video');
        
        // Verificar fuentes de video
        if (!this.sources || this.sources.length === 0) {
            console.error('No se han proporcionado fuentes de video');
            return;
        }

        // Asegurar que el elemento de video esté correctamente configurado
        if (this.videoPlayer && this.videoPlayer.nativeElement) {
            const videoElement = this.videoPlayer.nativeElement;
            
            // Configurar fuentes de video
            videoElement.innerHTML = ''; // Limpiar fuentes anteriores
            this.sources.forEach(source => {
                const sourceElement = document.createElement('source');
                sourceElement.src = source.src;
                sourceElement.type = source.type;
                videoElement.appendChild(sourceElement);
            });

            // Configuraciones adicionales
            videoElement.preload = 'metadata';
            
            // Añadir listeners adicionales para depuración
            videoElement.addEventListener('loadedmetadata', () => {
                console.log('Metadatos cargados', {
                    duration: videoElement.duration,
                    sources: this.sources
                });
            });

            videoElement.addEventListener('error', (event) => {
                console.error('Error de video:', event);
            });
        } else {
            console.error('Referencia al elemento de video no disponible');
        }
    }

    ngOnDestroy(): void {
        // Limpiar cualquier listener o recurso
    }

    togglePlayPause(): void {
        console.log('Método togglePlayPause llamado desde el BOTÓN');
        
        // Verificación exhaustiva del elemento de video
        if (!this.videoPlayer) {
            console.error('Referencia al reproductor de video no existe (BOTÓN)');
            return;
        }

        const videoElement = this.videoPlayer.nativeElement;

        if (!videoElement) {
            console.error('Elemento de video nativo no disponible (BOTÓN)');
            return;
        }

        // Verificar si hay fuentes de video
        if (!this.sources || this.sources.length === 0) {
            console.error('No hay fuentes de video disponibles (BOTÓN)');
            return;
        }

        // Log de estado detallado
        console.log('Estado del video antes de la acción (BOTÓN):', {
            paused: videoElement.paused,
            currentTime: videoElement.currentTime,
            duration: videoElement.duration,
            readyState: videoElement.readyState,
            networkState: videoElement.networkState
        });

        try {
            if (videoElement.paused) {
                console.log('Intentando reproducir desde BOTÓN');
                const playPromise = videoElement.play();
                
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            console.log('Reproducción iniciada exitosamente (BOTÓN)');
                            this.isPlaying = true;
                            this.cdr.markForCheck();
                        })
                        .catch((error) => {
                            console.error('Error al intentar reproducir desde BOTÓN:', error);
                            
                            // Información adicional de depuración
                            console.log('Detalles del error (BOTÓN):', {
                                errorName: error.name,
                                errorMessage: error.message,
                                videoSrc: videoElement.currentSrc,
                                videoReady: videoElement.readyState
                            });

                            this.isPlaying = false;
                            this.cdr.markForCheck();
                        });
                }
            } else {
                console.log('Intentando pausar desde BOTÓN');
                videoElement.pause();
                this.isPlaying = false;
                this.cdr.markForCheck();
            }
        } catch (error) {
            console.error('Error inesperado al cambiar estado (BOTÓN):', error);
            this.isPlaying = false;
            this.cdr.markForCheck();
        }

        // Log de estado final
        console.log('Estado del video después de la acción (BOTÓN):', {
            isPlaying: this.isPlaying,
            videoPaused: videoElement.paused
        });
    }

    onTimeUpdate(event: Event): void {
        const video = event.target as HTMLVideoElement;
        this.currentTime = video.currentTime;
        this.duration = video.duration;
        
        // Calcular progreso de reproducción
        this.progress = this.duration > 0 
            ? (video.currentTime / this.duration) * 100 
            : 0;
        
        // Calcular progreso de carga
        if (video.buffered.length > 0) {
            const bufferedEnd = video.buffered.end(video.buffered.length - 1);
            this.loadProgress = this.duration > 0 
                ? (bufferedEnd / this.duration) * 100 
                : 0;
        }
        
        this.cdr.markForCheck();
    }

    onLoadedMetadata(event: Event): void {
        const video = event.target as HTMLVideoElement;
        this.duration = video.duration;
        this.progress = 0;
        this.currentTime = 0;
        this.cdr.markForCheck();
    }

    onSeek(seekValue: number): void {
        const video = this.videoPlayer.nativeElement;
        if (video) {
            const seekTime = (seekValue / 100) * video.duration;
            video.currentTime = seekTime;
        }
    }

    setPlaybackSpeed(speed: number): void {
        const video = this.videoPlayer.nativeElement;
        video.playbackRate = speed;
    }

    setVideoQuality(source: VideoQuality): void {
        const video = this.videoPlayer.nativeElement;
        const currentTime = video.currentTime;
        video.src = source.src;
        video.currentTime = currentTime;
    }

    toggleFullScreen(): void {
        const video = this.videoPlayer.nativeElement;
        const container = video.closest('.video-player-container') as HTMLElement;

        if (!this.isFullScreen) {
            if (container.requestFullscreen) {
                container.requestFullscreen();
            } else if ((container as any).mozRequestFullScreen) { // Firefox
                (container as any).mozRequestFullScreen();
            } else if ((container as any).webkitRequestFullscreen) { // Chrome, Safari and Opera
                (container as any).webkitRequestFullscreen();
            } else if ((container as any).msRequestFullscreen) { // IE/Edge
                (container as any).msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if ((document as any).mozCancelFullScreen) { // Firefox
                (document as any).mozCancelFullScreen();
            } else if ((document as any).webkitExitFullscreen) { // Chrome, Safari and Opera
                (document as any).webkitExitFullscreen();
            } else if ((document as any).msExitFullscreen) { // IE/Edge
                (document as any).msExitFullscreen();
            }
        }

        // Alternar estado de pantalla completa
        this.isFullScreen = !this.isFullScreen;
        this.cdr.markForCheck();
    }

    onVideoError(event: Event): void {
        console.error('Error en la reproducción del video:', event);
        // Implementar lógica de manejo de errores
    }

    formatTime(time: number): string {
        if (isNaN(time)) return '00:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Método para actualizar el progreso del video
    private updateVideoProgress(): void {
        const video = this.videoPlayer.nativeElement;
        this.currentTime = video.currentTime;
        this.progress = (video.currentTime / video.duration) * 100;
        this.cdr.markForCheck();
    }

    // Método para adelantar/retroceder con duración personalizada
    private customSeek(direction: 'forward' | 'backward', seconds: number = 10): void {
        const video = this.videoPlayer.nativeElement;
        
        if (direction === 'backward') {
            video.currentTime = Math.max(0, video.currentTime - seconds);
        } else {
            video.currentTime = Math.min(video.duration, video.currentTime + seconds);
        }
        
        this.updateVideoProgress();
    }

    // Métodos públicos que usan el método personalizado
    seekBackward(): void {
        this.customSeek('backward', 10);
    }

    seekForward(): void {
        this.customSeek('forward', 10);
    }

    onPlay(): void {
        console.log('Método onPlay llamado');
        this.isPlaying = true;
        console.log('Estado de reproducción actualizado:', {
            isPlaying: this.isPlaying,
            videoPaused: this.videoPlayer.nativeElement.paused
        });
        this.cdr.markForCheck();
    }

    onPause(): void {
        console.log('Método onPause llamado');
        this.isPlaying = false;
        console.log('Estado de reproducción actualizado:', {
            isPlaying: this.isPlaying,
            videoPaused: this.videoPlayer.nativeElement.paused
        });
        this.cdr.markForCheck();
    }

    // Método para manejar subtítulos (placeholder)
    toggleSubtitles(): void {
        // Implementación de subtítulos
        console.log('Subtítulos no implementados aún');
    }

    // Nuevos métodos para control de volumen
    toggleMute(): void {
        const video = this.videoPlayer.nativeElement;
        
        if (!this.isMuted) {
            // Guardar el volumen actual antes de mutear
            this.lastVolume = this.volume;
            this.volume = 0;
        } else {
            // Restaurar el volumen previo
            this.volume = this.lastVolume;
        }
        
        this.isMuted = !this.isMuted;
        video.volume = this.volume;
        this.cdr.markForCheck();
    }

    startVolumeChange(event: MouseEvent): void {
        event.preventDefault();
        this.isChangingVolume = true;
        this.updateVolumeFromEvent(event);
    }

    updateVolumeChange(event: MouseEvent): void {
        if (this.isChangingVolume) {
            event.preventDefault();
            this.updateVolumeFromEvent(event);
        }
    }

    endVolumeChange(event: MouseEvent): void {
        if (this.isChangingVolume) {
            event.preventDefault();
            this.isChangingVolume = false;
            this.updateVolumeFromEvent(event);
        }
    }

    private updateVolumeFromEvent(event: MouseEvent): void {
        const volumeBar = event.currentTarget as HTMLElement;
        const rect = volumeBar.getBoundingClientRect();
        const clickPosition = event.clientX - rect.left;
        const volumeValue = Math.max(0, Math.min(100, (clickPosition / rect.width) * 100)) / 100;

        const video = this.videoPlayer.nativeElement;
        this.volume = volumeValue;
        video.volume = this.volume;
        this.isMuted = this.volume === 0;
        
        // Actualizar el último volumen no muted
        if (this.volume > 0) {
            this.lastVolume = this.volume;
        }
        
        this.cdr.markForCheck();
    }

    // Métodos para la barra de progreso
    onProgressBarEnter(event: MouseEvent): void {
        this.isHoveringProgressBar = true;
        this.updateProgressBarHover(event);
    }

    onProgressBarMove(event: MouseEvent): void {
        this.updateProgressBarHover(event);
    }

    onProgressBarLeave(): void {
        this.isHoveringProgressBar = false;
        this.hoverProgressPosition = 0;
        this.mouseDisplayPosition = 0;
        this.mouseHoverTime = 0;
        this.cdr.markForCheck();
    }

    private updateProgressBarHover(event: MouseEvent): void {
        const progressBar = event.currentTarget as HTMLElement;
        const rect = progressBar.getBoundingClientRect();
        
        // Calcular posición del mouse
        this.mouseDisplayPosition = event.clientX - rect.left;
        
        // Calcular porcentaje de posición
        this.hoverProgressPosition = (this.mouseDisplayPosition / rect.width) * 100;
        
        // Calcular tiempo correspondiente
        this.mouseHoverTime = this.duration * (this.hoverProgressPosition / 100);
        
        this.cdr.markForCheck();
    }

    startSeek(event: MouseEvent): void {
        const progressBar = event.currentTarget as HTMLElement;
        const rect = progressBar.getBoundingClientRect();
        const seekPosition = (event.clientX - rect.left) / rect.width;
        
        this.seekToPosition(seekPosition);
        this.isHoveringProgressBar = true;
        this.updateProgressBarHover(event);
    }

    endSeek(event: MouseEvent): void {
        const progressBar = event.currentTarget as HTMLElement;
        const rect = progressBar.getBoundingClientRect();
        const seekPosition = (event.clientX - rect.left) / rect.width;
        
        this.seekToPosition(seekPosition);
        this.isHoveringProgressBar = false;
        this.cdr.markForCheck();
    }

    private seekToPosition(position: number): void {
        const video = this.videoPlayer.nativeElement;
        const seekTime = this.duration * position;
        
        video.currentTime = seekTime;
        this.currentTime = seekTime;
        this.progress = position * 100;
        
        this.cdr.markForCheck();
    }

    // Método para manejar clics en el video
    handleVideoTap(event: MouseEvent): void {
        // Verificar si el clic provino de un botón o elemento interactivo
        const target = event.target as HTMLElement;
        const isInteractiveElement = target.closest('button, mat-icon');
        
        // Solo reproducir/pausar si el clic NO provino de un elemento interactivo
        if (!isInteractiveElement) {
            console.log('Clic en área de video (no en botón)');
            this.togglePlayPause();

            // Logs de depuración
            console.log('Video tap debug', {
                action: 'Play/Pause',
                isPlaying: this.isPlaying,
                target: event.target
            });
        } else {
            console.log('Clic en elemento interactivo, ignorando reproducción');
        }
    }

    // Método para alternar pantalla completa con doble clic
    toggleFullScreenOnDoubleClick(event: MouseEvent): void {
        // Prevenir que el doble clic afecte otros elementos
        event.preventDefault();
        event.stopPropagation();

        // Verificar si el clic provino de un elemento interactivo
        const target = event.target as HTMLElement;
        const isInteractiveElement = target.closest('button, mat-icon, .video-controls');
        
        // Solo activar pantalla completa si no es un elemento interactivo
        if (!isInteractiveElement) {
            console.log('Doble clic para pantalla completa');
            
            // Obtener el contenedor del video
            const container = this.videoPlayer.nativeElement.closest('.video-player-container') as HTMLElement;
            
            if (!this.isFullScreen) {
                // Intentar entrar en pantalla completa
                if (container.requestFullscreen) {
                    container.requestFullscreen();
                } else if ((container as any).mozRequestFullScreen) { // Firefox
                    (container as any).mozRequestFullScreen();
                } else if ((container as any).webkitRequestFullscreen) { // Chrome, Safari y Opera
                    (container as any).webkitRequestFullscreen();
                } else if ((container as any).msRequestFullscreen) { // IE/Edge
                    (container as any).msRequestFullscreen();
                }
            } else {
                // Salir de pantalla completa
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if ((document as any).mozCancelFullScreen) { // Firefox
                    (document as any).mozCancelFullScreen();
                } else if ((document as any).webkitExitFullscreen) { // Chrome, Safari y Opera
                    (document as any).webkitExitFullscreen();
                } else if ((document as any).msExitFullscreen) { // IE/Edge
                    (document as any).msExitFullscreen();
                }
            }

            // Alternar estado de pantalla completa
            this.isFullScreen = !this.isFullScreen;
            this.cdr.markForCheck();

            // Logs de depuración
            console.log('Estado de pantalla completa:', {
                isFullScreen: this.isFullScreen,
                target: event.target
            });
        } else {
            console.log('Doble clic en elemento interactivo, ignorando pantalla completa');
        }
    }

    // Método para alternar Picture-in-Picture
    togglePictureInPicture(): void {
        console.log('Intentando alternar Picture-in-Picture');
        
        if (!this.videoPlayer || !this.videoPlayer.nativeElement) {
            console.error('Elemento de video no disponible para Picture-in-Picture');
            return;
        }

        const videoElement = this.videoPlayer.nativeElement;

        // Verificar soporte de Picture-in-Picture
        if ('pictureInPictureElement' in document) {
            try {
                if (document.pictureInPictureElement) {
                    // Si ya está en PiP, salir
                    document.exitPictureInPicture()
                        .then(() => {
                            console.log('Saliendo de Picture-in-Picture');
                            this.cdr.markForCheck();
                        })
                        .catch(error => {
                            console.error('Error al salir de Picture-in-Picture:', error);
                        });
                } else {
                    // Entrar en Picture-in-Picture
                    if (videoElement !== document.pictureInPictureElement) {
                        videoElement.requestPictureInPicture()
                            .then(() => {
                                console.log('Entrando en Picture-in-Picture');
                                this.cdr.markForCheck();
                            })
                            .catch(error => {
                                console.error('Error al entrar en Picture-in-Picture:', error);
                            });
                    }
                }
            } catch (error) {
                console.error('Error al manejar Picture-in-Picture:', error);
            }
        } else {
            console.warn('Picture-in-Picture no está soportado en este navegador');
        }
    }
} 