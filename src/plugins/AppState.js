import { reactive } from 'vue';

export default {
    install: (app) => {
        const _appState = reactive({});

        app.config.globalProperties.$appState = _appState;
    }
};
        