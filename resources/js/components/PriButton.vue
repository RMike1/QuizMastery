<script setup>
const props = defineProps({
      type: {
            type: String,
            default: 'button'
      },
      variant: {
            type: String,
            default: 'primary',
            validator: (value) => ['primary', 'secondary', 'outline', 'ghost'].includes(value)
      },
      label: {
            type: String,
            default: ''
      },
      disabled: {
            type: Boolean,
            default: false
      }
});
</script>
<template>
      <button :type="type" :disabled="disabled"
            class="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            :class="[
                variant === 'primary'
                    ? 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 dark:bg-primary-600 dark:hover:bg-primary-700'
                    : variant === 'secondary'
                        ? 'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500 dark:bg-secondary-600 dark:hover:bg-secondary-700'
                        : variant === 'outline'
                            ? 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/20'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            ]">
            <slot>
                {{ label }}
            </slot>

            <!-- Gradient Glow Effect -->
            <div v-if="variant === 'primary' || variant === 'secondary'"
                class="absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 transition-opacity group-hover:opacity-20"
                :class="[
                    variant === 'primary'
                        ? 'from-blue-400 via-primary-400 to-blue-400'
                        : 'from-purple-400 via-secondary-400 to-purple-400'
                ]">
            </div>
      </button>
</template>