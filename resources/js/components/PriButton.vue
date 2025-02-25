<script setup>
const props = defineProps({
      label:String,
      type: {
            type: String,
            default: 'button'
      }
});
</script>
<template>
      <button :type="type"
            class="mt-4 flex items-center justify-center rounded-lg border border-primary-700 bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:border-primary-800 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:border-primary-700 dark:bg-primary-600 dark:hover:border-primary-700 dark:hover:bg-primary-700 dark:focus:ring-primary-800  sm:mt-0 sm:w-auto">
           {{ label }}
      </button>
</template>