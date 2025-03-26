import '../css/app.css';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { DefineComponent } from 'vue';
import { createApp, h } from 'vue';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import { Head, Link } from '@inertiajs/vue3';
import { createPinia } from 'pinia';
import { useThemeStore } from './stores/theme';
import { useQuizStore } from './stores/quiz';

// Extend ImportMeta interface for Vite...
declare module 'vite/client' {
    interface ImportMetaEnv {
        readonly VITE_APP_NAME: string;
        [key: string]: string | boolean | undefined;
    }

    interface ImportMeta {
        readonly env: ImportMetaEnv;
        readonly glob: <T>(pattern: string) => Record<string, () => Promise<T>>;
    }
}

const appName = import.meta.env.VITE_APP_NAME || 'QuizMastery';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.vue`, import.meta.glob<DefineComponent>('./pages/**/*.vue')),

    // resolve: (name) => {
    //     const pages = import.meta.glob<DefineComponent>("./Pages/**/*.vue", { eager: true });
    //     let page = pages[`./Pages/${name}.vue`];
    //     page.default.layout = page.default.layout || MainLayout;
    //     return page;
    // },

    setup({ el, App, props, plugin }) {
        const pinia = createPinia();
        const app = createApp({ render: () => h(App, props) });

        // Initialize theme
        const themeStore = useThemeStore(pinia);

        app.use(plugin)
            .use(ZiggyVue)
            .use(pinia)
            .component("Head", Head)
            .component("Link", Link)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
        showSpinner: true
    },
});
