import { createRouter, createWebHistory } from 'vue-router';
import TableView from '../pages/TableView.vue';
import SettingsView from '../pages/SettingView.vue';
import HomeView from '../pages/HomeView.vue';
import ComponentsView from '../pages/ComponentsView.vue';
import OrganizationStructure from '../components/OrganizationStructure.vue';
import ColumnChart from '../components/ColumnChart.vue';
import DoughnutChart from '../components/DoughnutChart.vue';
import LineChart from '../components/LineChart.vue';
import ScrollAnimation from '../components/ScrollAnimation.vue';
import ImageCompare from '../components/ImageCompare.vue';
import ChartsView from '../pages/ChartsView.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView,
    },
    {
        path: '/settings',
        name: 'Settings',
        component: SettingsView,
    },
    {
        path: '/components',
        name: 'Components',
        component: ComponentsView,
    },
    {
        path: '/components/table',
        name: 'Table',
        component: TableView,
    },
    {
        path: '/components/organization-structure',
        name: 'OrganizationStructure',
        component: OrganizationStructure,
    },
    {
        path: '/components/charts',
        name: 'Charts',
        component: ChartsView,
    },
    {
        path: '/components/charts/column-chart',
        name: 'ColumnChart',
        component: ColumnChart,
    },
    {
        path: '/components/charts/doughnut-chart',
        name: 'DoughnutChart',
        component: DoughnutChart,
    },
    {
        path: '/components/charts/line-chart',
        name: 'LineChart',
        component: LineChart,
    },
    {
        path: '/components/scroll-animation',
        name: 'ScrollAnimation',
        component: ScrollAnimation,
    },
    {
        path: '/components/image-compare',
        name: 'ImageCompare',
        component: ImageCompare,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;