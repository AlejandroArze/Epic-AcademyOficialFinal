import { Routes } from '@angular/router';
import { LandingHomeComponent } from './home/home.component';
import { LayoutComponent } from 'app/layout/layout.component';

export default [
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: '',
                component: LandingHomeComponent
            }
        ]
    }
] as Routes; 