<template>
    <nav class="fixed top-0 left-0 right-0 z-40 bg-warm-50/80 dark:bg-warm-950/80 backdrop-blur-lg border-b border-warm-200 dark:border-warm-800">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <!-- Logo -->
                <div class="flex-shrink-0 flex items-center">
                    <a href="/" class="flex items-center gap-2">
                        <img class="h-8 w-auto" src="/logo.svg" alt="QuizMastery Logo">
                        <span class="text-xl font-semibold text-warm-900 dark:text-warm-50">QuizMastery</span>
                    </a>
                </div>

                <!-- Navigation -->
                <div class="hidden sm:flex sm:items-center sm:gap-6">
                    <a href="#" class="text-warm-600 hover:text-primary-600 dark:text-warm-400 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors">
                        Home
                    </a>
                    <a href="#" class="text-warm-600 hover:text-primary-600 dark:text-warm-400 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors">
                        About
                    </a>
                    <a href="#" class="text-warm-600 hover:text-primary-600 dark:text-warm-400 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors">
                        Contact
                    </a>
                </div>

                <!-- Right Side -->
                <div class="flex items-center gap-4">
                    <!-- Theme Toggle -->
                    <button @click="toggleTheme" 
                            class="p-2 text-warm-600 hover:text-primary-600 dark:text-warm-400 dark:hover:text-primary-400 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400">
                        <svg v-if="isDark" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    </button>

                    <!-- Profile Dropdown -->
                    <div class="relative">
                        <button class="flex items-center gap-2 p-2 text-warm-600 hover:text-primary-600 dark:text-warm-400 dark:hover:text-primary-400 rounded-lg transition-colors">
                            <span class="text-sm font-medium">John Doe</span>
                            <img class="h-8 w-8 rounded-full object-cover" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User avatar">
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

function toggleTheme() {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark')
}

onMounted(() => {
    isDark.value = document.documentElement.classList.contains('dark')
})
</script>
