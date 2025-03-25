import { defineStore } from 'pinia';
import { ref, watchEffect } from 'vue';

export type Theme = 'light' | 'dark' | 'system';

export const useThemeStore = defineStore('theme', () => {
    const theme = ref<Theme>('system');

    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
        theme.value = savedTheme;
    }

    // Watch for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateTheme = (newTheme: Theme) => {
        if (newTheme === 'system') {
            const systemTheme = mediaQuery.matches ? 'dark' : 'light';
            document.documentElement.classList.toggle('dark', systemTheme === 'dark');
        } else {
            document.documentElement.classList.toggle('dark', newTheme === 'dark');
        }
    };

    // Initialize theme immediately
    updateTheme(theme.value);

    // Watch theme changes
    watchEffect(() => {
        updateTheme(theme.value);
        localStorage.setItem('theme', theme.value);
    });

    // Handle system theme changes
    const handleSystemChange = () => {
        if (theme.value === 'system') {
            updateTheme('system');
        }
    };

    mediaQuery.addEventListener('change', handleSystemChange);

    return {
        theme,
        updateTheme: (newTheme: Theme) => {
            theme.value = newTheme;
        },
        setTheme: (newTheme: Theme) => {
            theme.value = newTheme;
        },
    };
});
