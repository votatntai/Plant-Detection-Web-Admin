/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/dashboards'
    },
    {
        id: 'configurations',
        title: 'Configurations',
        type: 'basic',
        icon: 'heroicons_outline:wrench',
        link: '/configurations'
    },
    {
        id: 'classes',
        title: 'Classes',
        type: 'basic',
        icon: 'heroicons_outline:chart-bar-square',
        link: '/classes'
    },
    {
        id: 'resources',
        title: 'Resources',
        type: 'group',
        icon: 'heroicons_outline:users',
        link: '/resources',
        children: [
            {
                id: 'plants',
                title: 'Plants Management',
                type: 'basic',
                icon: 'heroicons_outline:users',
                link: '/resources/plants'
            }
        ]
    },
    {
        id: 'reports',
        title: 'Reports',
        type: 'basic',
        icon: 'heroicons_outline:document-chart-bar',
        link: '/reports'
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/dashboards'
    },
    {
        id: 'configurations',
        title: 'Configurations',
        type: 'basic',
        icon: 'heroicons_outline:wrench',
        link: '/configurations'
    },
    {
        id: 'classes',
        title: 'Classes',
        type: 'basic',
        icon: 'heroicons_outline:chart-bar-square',
        link: '/classes'
    },
    {
        id: 'resources',
        title: 'Resources',
        type: 'group',
        icon: 'heroicons_outline:users',
        link: '/resources',
        children: [
            {
                id: 'plants',
                title: 'Plants Management',
                type: 'basic',
                icon: '',
                link: '/plants'
            }
        ]
    },
    {
        id: 'reports',
        title: 'Reports',
        type: 'basic',
        icon: 'heroicons_outline:document-chart-bar',
        link: '/reports'
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/dashboards'
    },
    {
        id: 'configurations',
        title: 'Configurations',
        type: 'basic',
        icon: 'heroicons_outline:wrench',
        link: '/configurations'
    },
    {
        id: 'classes',
        title: 'Classes',
        type: 'basic',
        icon: 'heroicons_outline:chart-bar-square',
        link: '/classes'
    },
    {
        id: 'resources',
        title: 'Resources',
        type: 'group',
        icon: 'heroicons_outline:users',
        link: '/resources',
        children: [
            {
                id: 'plants',
                title: 'Plants Management',
                type: 'basic',
                icon: '',
                link: '/plants'
            }
        ]
    },
    {
        id: 'reports',
        title: 'Reports',
        type: 'basic',
        icon: 'heroicons_outline:document-chart-bar',
        link: '/reports'
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/dashboards'
    },
    {
        id: 'configurations',
        title: 'Configurations',
        type: 'basic',
        icon: 'heroicons_outline:wrench',
        link: '/configurations'
    },
    {
        id: 'classes',
        title: 'Classes',
        type: 'basic',
        icon: 'heroicons_outline:chart-bar-square',
        link: '/classes'
    },
    {
        id: 'resources',
        title: 'Resources',
        type: 'group',
        icon: 'heroicons_outline:users',
        link: '/resources',
        children: [
            {
                id: 'plants',
                title: 'Plants Management',
                type: 'basic',
                icon: '',
                link: '/plants'
            }
        ]
    },
    {
        id: 'reports',
        title: 'Reports',
        type: 'basic',
        icon: 'heroicons_outline:document-chart-bar',
        link: '/reports'
    },
];
