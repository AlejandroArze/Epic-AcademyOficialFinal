import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from 'app/layout/layout.component';

// Importar dinámicamente otros componentes
const componentContext = require.context('./', true, /\.component\.ts$/);

const dynamicRoutes = componentContext.keys().map(key => {
  const componentModule = componentContext(key);
  const componentName = Object.keys(componentModule)[0];
  const Component = componentModule[componentName];
  
  // Convertir nombre de archivo a ruta
  const routePath = key
    .replace(/^\.\//, '')
    .replace(/\/[^/]+\.component\.ts$/, '')
    .replace(/\//g, '-');
  
  return {
    path: routePath,
    component: Component
  };
});

export const LANDING_ROUTES: Routes = [
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                component: HomeComponent
            },
            ...dynamicRoutes
        ]
    }
]; 