/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation1: FuseNavigationItem[] = [

    {
        id      : 'apps.help-center',
        title   : 'Epic Academy',
        subtitle: '',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'pages.settings',
                title: 'Inicio',
                type : 'basic',
                icon : 'heroicons_outline:cog-8-tooth',
                link : '/apps/home-academy',
                roles     : [1, 2],
            },
            {
                id   : 'pages.settings',
                title: 'Academia',
                type : 'basic',
                icon : 'heroicons_outline:cog-8-tooth',
                link : '/apps/academy',
                roles     : [1, 2],
            },
            {
                id   : 'pages.administrar-cursos',
                title: 'Administrar Cursos',
                type : 'basic',
                icon : 'heroicons_outline:academic-cap',
                link : '/apps/administrar-cursos',
                roles     : [1, 2],
            },
            {
                id   : 'pages.problemas-programacion',
                title: 'Problemas de Programación',
                type : 'basic',
                icon : 'heroicons_outline:code-bracket',
                link : '/apps/problemas-programacion',
                roles     : [1, 2],
            },
            {
                id   : 'pages.administrar-problemas-programacion',
                title: 'Administrar Problemas de Programación',
                type : 'basic',
                icon : 'heroicons_outline:wrench-screwdriver',
                link : '/apps/administrar-problemas-programacion',
                roles     : [1, 2],
            },
            {
                id   : 'pages.competencias',
                title: 'Competencias',
                type : 'basic',
                icon : 'heroicons_outline:trophy',
                link : '/apps/competencias',
                roles     : [1, 2],
            },
            {
                id   : 'pages.administrar-competencias',
                title: 'Administrar Competencias',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-document-list',
                link : '/apps/administrar-competencias',
                roles     : [1, 2],
            },
            {
                id   : 'pages.settings',
                title: 'Configuración',
                type : 'basic',
                icon : 'heroicons_outline:cog-8-tooth',
                link : '/pages/settings',
                roles     : [1, 2],
            },
            
             
           
        ]
    }
];
export const compactNavigation1: FuseNavigationItem[] = [
    {
        id      : 'apps.help-center',
        title   : 'Centro de Ayuda',
        subtitle: 'Guía para el Funcionario',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id        : 'apps.help-center.home',
                title     : 'Inicio',
                type      : 'basic',
                link      : '/apps/help-center',
                roles     : [1, 2],
                exactMatch: true,
            },
            {
                id   : 'pages.administrar-cursos',
                title: 'Administrar Cursos',
                type : 'basic',
                icon : 'heroicons_outline:academic-cap',
                link : '/apps/administrar-cursos',
                roles     : [1, 2],
            },
            {
                id   : 'pages.problemas-programacion',
                title: 'Problemas de Programación',
                type : 'basic',
                icon : 'heroicons_outline:code-bracket',
                link : '/apps/problemas-programacion',
                roles     : [1, 2],
            },
            {
                id   : 'pages.administrar-problemas-programacion',
                title: 'Administrar Problemas de Programación',
                type : 'basic',
                icon : 'heroicons_outline:wrench-screwdriver',
                link : '/apps/administrar-problemas-programacion',
                roles     : [1, 2],
            },
            {
                id   : 'pages.competencias',
                title: 'Competencias',
                type : 'basic',
                icon : 'heroicons_outline:trophy',
                link : '/apps/competencias',
                roles     : [1, 2],
            },
            {
                id   : 'pages.administrar-competencias',
                title: 'Administrar Competencias',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-document-list',
                link : '/apps/administrar-competencias',
                roles     : [1, 2],
            },
            {
                id   : 'apps.help-center.faqs',
                title: 'Preguntas Frecuentes',
                type : 'basic',
                link : '/apps/help-center/faqs',
                roles     : [1, 2],
            },
            {
                id   : 'apps.help-center.guides',
                title: 'Guias',
                type : 'basic',
                link : '/apps/help-center/guides',
                roles     : [1, 2],
            },
            {
                id   : 'apps.help-center.support',
                title: 'Soporte',
                type : 'basic',
                link : '/apps/help-center/support',
                roles     : [1, 2],
            }
        ],
    },
    {
        id      : 'apps.help-center',
        title   : 'Departamento de Soporte Técnico',
        subtitle: 'Registro ',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id      : 'apps.ecommerce',
                title   : 'Equipos',
                type    : 'collapsable',
                icon    : 'heroicons_outline:shopping-cart',
                children: [
                    {
                        id   : 'apps.ecommerce.inventory',
                        title: 'Inventario',
                        type : 'basic',
                        link : '/apps/ecommerce/inventory',
                        roles: [1,2],
                    },
                ],
            },
            {
                id   : 'apps.scrumboard',
                title: 'Recepción de Tareas',
                type : 'basic',
                icon : 'heroicons_outline:check-circle',
                link : '/example',
                roles: [1,2],
            },
            {
                id   : 'apps.scrumboard',
                title: 'Mis Asignaciones',
                type : 'basic',
                icon : 'heroicons_outline:view-columns',
                link : '/apps/scrumboard/asistencia-sitio',
                roles     : [1,2],
            },
            
             {
                id   : 'pages.settings',
                title: 'Configuración',
                type : 'basic',
                icon : 'heroicons_outline:cog-8-tooth',
                link : '/pages/settings',
                roles     : [1,2],
            },
        ]
    }
];
export const futuristicNavigation1: FuseNavigationItem[] = [
    {
        id      : 'apps.help-center',
        title   : 'Centro de Ayuda',
        subtitle: 'Guía para el Funcionario',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id        : 'apps.help-center.home',
                title     : 'Inicio',
                type      : 'basic',
                link      : '/apps/help-center',
                roles     : [1,2],
                exactMatch: true,
            },
            {
                id   : 'apps.help-center.faqs',
                title: 'Preguntas Frecuentes',
                type : 'basic',
                link : '/apps/help-center/faqs',
                roles     : [1,2],
            },
            {
                id   : 'apps.help-center.guides',
                title: 'Guias',
                type : 'basic',
                link : '/apps/help-center/guides',
                roles     : [1,2],
            },
            {
                id   : 'reportes',
                title: 'Reportes',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-document-check',
                link : '/dashboards/project',
                roles     : [1,2],
            },
            {
                id   : 'apps.help-center.support',
                title: 'Soporte',
                type : 'basic',
                link : '/apps/help-center/support',
                roles     : [1,2],
            },
            {
                id   : 'pages.administrar-cursos',
                title: 'Administrar Cursos',
                type : 'basic',
                icon : 'heroicons_outline:academic-cap',
                link : '/apps/administrar-cursos',
                roles     : [1, 2],
            },
            {
                id   : 'pages.problemas-programacion',
                title: 'Problemas de Programación',
                type : 'basic',
                icon : 'heroicons_outline:code-bracket',
                link : '/apps/problemas-programacion',
                roles     : [1, 2],
            },
            {
                id   : 'pages.administrar-problemas-programacion',
                title: 'Administrar Problemas de Programación',
                type : 'basic',
                icon : 'heroicons_outline:wrench-screwdriver',
                link : '/apps/administrar-problemas-programacion',
                roles     : [1, 2],
            },
            {
                id   : 'pages.competencias',
                title: 'Competencias',
                type : 'basic',
                icon : 'heroicons_outline:trophy',
                link : '/apps/competencias',
                roles     : [1, 2],
            },
            {
                id   : 'pages.administrar-competencias',
                title: 'Administrar Competencias',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-document-list',
                link : '/apps/administrar-competencias',
                roles     : [1, 2],
            },
        ],
    },
    {
        id      : 'apps.help-center',
        title   : 'Departamento de Soporte Técnico',
        subtitle: 'Registro ',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id      : 'apps.ecommerce',
                title   : 'Equipos',
                type    : 'collapsable',
                icon    : 'heroicons_outline:shopping-cart',
                children: [
                    {
                        id   : 'apps.ecommerce.inventory',
                        title: 'Inventario',
                        type : 'basic',
                        link : '/apps/ecommerce/inventory',
                        roles     : [1,2],
                    },
                ],
            },
            {
                id   : 'apps.scrumboard',
                title: 'Recepción de Tareas',
                type : 'basic',
                icon : 'heroicons_outline:check-circle',
                link : '/example',
                roles     : [1,2],
            },
            {
                id   : 'apps.scrumboard',
                title: 'Mis Asignaciones',
                type : 'basic',
                icon : 'heroicons_outline:view-columns',
                link : '/apps/scrumboard/asistencia-sitio',
                roles     : [1,2],
            },
            {
                id   : 'reportes',
                title: 'Reportes',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-document-check',
                link : '/dashboards/project',
                roles     : [1,2],
            },
            
             {
                id   : 'pages.settings',
                title: 'Configuración',
                type : 'basic',
                icon : 'heroicons_outline:cog-8-tooth',
                link : '/pages/settings',
                roles     : [1,2],
            },
        ]
    }

];
export const horizontalNavigation1: FuseNavigationItem[] = [
    {
        id      : 'apps.help-center',
        title   : 'Centro de Ayuda',
        subtitle: 'Guía para el Funcionario',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id        : 'apps.help-center.home',
                title     : 'Inicio',
                type      : 'basic',
                link      : '/apps/help-center',
                roles     : [1,2],
                exactMatch: true,
            },
            {
                id   : 'apps.help-center.faqs',
                title: 'Preguntas Frecuentes',
                type : 'basic',
                link : '/apps/help-center/faqs',
                roles     : [1,2],
            },
            {
                id   : 'apps.help-center.guides',
                title: 'Guias',
                type : 'basic',
                link : '/apps/help-center/guides',
                roles     : [1,2],
            },
            {
                id   : 'apps.help-center.support',
                title: 'Soporte',
                type : 'basic',
                link : '/apps/help-center/support',
                roles     : [1,2],
            },
        ],
    },
    {
        id      : 'apps.help-center',
        title   : 'Departamento de Soporte Técnico',
        subtitle: 'Registro ',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id      : 'apps.ecommerce',
                title   : 'Equipos',
                type    : 'collapsable',
                icon    : 'heroicons_outline:shopping-cart',
                children: [
                    {
                        id   : 'apps.ecommerce.inventory',
                        title: 'Inventario',
                        type : 'basic',
                        link : '/apps/ecommerce/inventory',
                        roles     : [1,2],
                    },
                ],
            },
            {
                id   : 'apps.scrumboard',
                title: 'Recepción de Tareas',
                type : 'basic',
                icon : 'heroicons_outline:check-circle',
                link : '/example',
                roles     : [1,2],
            },
            {
                id   : 'apps.scrumboard',
                title: 'Mis Asignaciones',
                type : 'basic',
                icon : 'heroicons_outline:view-columns',
                link : '/apps/scrumboard/asistencia-sitio',
                roles     : [1,2],
            },
            {
                id   : 'reportes',
                title: 'Reportes',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-document-check',
                link : '/dashboards/project',
                roles     : [1,2],
            },
            {
                id   : 'pages.settings',
                title: 'Settings',
                type : 'basic',
                icon : 'heroicons_outline:cog-8-tooth',
                link : '/pages/settings',
                roles     : [1,2],
            },
        ]
    }
];