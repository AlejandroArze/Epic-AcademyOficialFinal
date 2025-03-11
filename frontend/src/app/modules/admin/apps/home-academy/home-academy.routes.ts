import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeAcademyComponent } from './home-academy.component';

export default [
    {
        path     : '',
        component: HomeAcademyComponent,
        children : [
            {
                path     : '',
                pathMatch: 'full',
                component: HomeAcademyComponent
            },
            // Puedes agregar más rutas anidadas aquí en el futuro
            {
                path: '**',
                redirectTo: ''
            }
        ]
    }
] as Routes; 