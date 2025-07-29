import "primeicons/primeicons.css";
import "./style.css";
import "./flags.css";

import { createApp } from "vue";
import PrimeVue from "primevue/config";
import ConfirmationService from 'primevue/confirmationservice';
import DialogService from 'primevue/dialogservice';
import ToastService from 'primevue/toastservice';

import AppState from "./plugins/appState.js";

import App from "./App.vue";
import Noir from './presets/Noir.js';
import router from "./routing/index.js";

// Создаём приложение
const app = createApp(App);

// Подключаем плагины
app.use(PrimeVue, {
    theme: {
        preset: Noir,
        options: {
            prefix: 'p',
            darkModeSelector: '.p-dark',
            cssLayer: false,
        }
    }
});
app.use(AppState);
app.use(ConfirmationService);
app.use(ToastService);  
app.use(DialogService);
app.use(router);

// Монтируем приложение
app.mount("#app");