export function loadThemeSettings(appState, primevueConfig) {
    console.log(appState.primaryColors);
    const data = localStorage.getItem('themeSwitcher');
    if (data) {
        const settings = JSON.parse(data);

        // 1. Установка темы
        if (settings.theme) {
            appState.theme = settings.theme;
        }

        // 2. Ripple эффект
        if (typeof settings.ripple === 'boolean') {
            primevueConfig.ripple = settings.ripple;
        }

        // 3. Темный режим
        if (settings.dark) {
            document.documentElement.classList.add('p-dark');
            appState.iconClass = 'pi-sun';
        } else {
            document.documentElement.classList.remove('p-dark');
            appState.iconClass = 'pi-moon';
        }

        // 4. Применение цветовой схемы (если доступны)
        if (settings.selectedPrimaryColor && appState.primaryColors) {
            const color = appState.primaryColors.find(c => c.name === settings.selectedPrimaryColor);
            if (color) applyTheme('primary', color);
        }

        if (settings.selectedSurfaceColor && appState.surfaces) {
            const surface = appState.surfaces.find(s => s.name === settings.selectedSurfaceColor);
            if (surface) applyTheme('surface', surface);
        }
    }
}

function applyTheme(type, colorConfig) {
    if (!colorConfig) return;

    const root = document.documentElement;

    if (type === 'primary') {
        root.style.setProperty('--primary-color', colorConfig.primary);
        root.style.setProperty('--primary-color-text', colorConfig.text);
    } else if (type === 'surface') {
        root.style.setProperty('--surface-0', colorConfig.surface0);
        root.style.setProperty('--surface-50', colorConfig.surface50);
        root.style.setProperty('--surface-100', colorConfig.surface100);
        root.style.setProperty('--surface-200', colorConfig.surface200);
        root.style.setProperty('--surface-300', colorConfig.surface300);
        root.style.setProperty('--surface-400', colorConfig.surface400);
        root.style.setProperty('--surface-500', colorConfig.surface500);
        root.style.setProperty('--surface-600', colorConfig.surface600);
        root.style.setProperty('--surface-700', colorConfig.surface700);
        root.style.setProperty('--surface-800', colorConfig.surface800);
        root.style.setProperty('--surface-900', colorConfig.surface900);
        root.style.setProperty('--surface-950', colorConfig.surface950);
    }
}