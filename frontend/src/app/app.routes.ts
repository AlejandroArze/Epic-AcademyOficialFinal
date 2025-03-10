import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { AuthSignInComponent } from './modules/auth/sign-in/sign-in.component';


// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    //{path: '', pathMatch : 'full', redirectTo: 'apps/help-center'},
    /*{path: '', pathMatch : 'full', redirectTo: 'apps/sign-in'},
    //{path: '', pathMatch : 'full', redirectTo: 'apps/AuthSignOutComponent',component: AuthSignInComponent},
    // Redirect signed-in user to the '/example'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'apps/help-center'},
    */
    
        // Redirect empty path to '/landing'
        {path: '', pathMatch : 'full', redirectTo: 'landing'},

        // Redirect signed-in user to the '/example'
        //
        // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
        // path. Below is another redirection for that path to redirect the user to the desired
        // location. This is a small convenience to keep all main routes together here on this file.
        {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'example'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.routes')},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes')},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes')},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes')},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes')}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        //canActivate: [AuthGuard],
        //canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes')},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.routes')}
        ]
    },

    // Landing routes
    {
        path: 'landing',
        loadChildren: () => import('app/modules/landing/landing.routes')
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        children: [
            {path: 'example', loadChildren: () => import('app/modules/admin/example/example.routes')},
            {path: 'dashboards', children: [
                
            {path: 'finance', loadChildren: () => import('app/modules/admin/dashboards/finance/finance.routes')},
                
            ]},
            // Apps
            {path: 'apps', children: [
                {path: 'ecommerce', loadChildren: () => import('app/modules/admin/apps/ecommerce/ecommerce.routes')},
                {path: 'help-center', loadChildren: () => import('app/modules/admin/apps/help-center/help-center.routes')},
                {path: 'scrumboard', loadChildren: () => import('app/modules/admin/apps/scrumboard/scrumboard.routes')},
                {path: 'tasks', loadChildren: () => import('app/modules/admin/apps/tasks/tasks.routes')},
               
            ]},
            
            // Pages
            {path: 'pages', children: [               
                // Settings
                {path: 'settings', loadChildren: () => import('app/modules/admin/pages/settings/settings.routes')},
                          
            ]},
        ]
    }
    
];
