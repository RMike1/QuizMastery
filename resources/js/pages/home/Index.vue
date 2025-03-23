<script setup>
import QuizModal from '@/components/QuizModal.vue';
import Layout from '@/layouts/MainLayout.vue';
import { onMounted, onBeforeUnmount } from 'vue';
import { useQuizStore } from '@/stores/quiz';

defineOptions({ layout: Layout })
const props = defineProps({
   'level': Object
});

const quizStore = useQuizStore();
quizStore.setLevel(props.level);

const handleKeyUp = (event) => {
   if (event.key === 'Escape' && quizStore.showModal) {
      quizStore.hideQuizSection();
   }
};

onMounted(() => {
   window.addEventListener('keyup', handleKeyUp);
});

onBeforeUnmount(() => {
   window.removeEventListener('keyup', handleKeyUp);
});
</script>

<template>

   <!------------------Hero Section------------------>
   <section class="bg-white dark:bg-gray-900">
      <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
         <div class="mr-auto place-self-center lg:col-span-7">
            <h1
               class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
               Lorem Ipsum</h1>
            <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
               Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
               rem aperiam, eaque.</p>

            <button @click="quizStore.showQuizSection"
               class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
               Start Exam
               <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                     d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                     clip-rule="evenodd"></path>
               </svg>
            </button>
         </div>
         <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="assets/images/car5.png" alt="car">
         </div>
      </div>
   </section>
   <!------------------widget component--------------->
   <section class="bg-white dark:bg-gray-900">
      <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
         <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Li Europan lingues es
               membres del sam familie. Lor separat</h2>
            <p class="mb-4">Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por lingua
               franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica,
               pronunciation e plu sommun paroles.</p>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
               rem aperiam. </p>
         </div>
         <div class="grid grid-cols-2 gap-4 mt-8">
            <img class="w-full rounded-lg"
               src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
               alt="office content 1">
            <img class="mt-4 w-full lg:mt-10 rounded-lg"
               src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
               alt="office content 2">
         </div>
      </div>
   </section>
   <!-- quiz section -->
   <Teleport to="body">
      <QuizModal :show="quizStore.showModal" @closeQuizModal="quizStore.hideQuizSection" :currentQuestion="quizStore.currentQuestion" :currentLevelTotalQuestions="quizStore.currentLevelTotalQuestions" :currentIndex="quizStore.currentIndex" @nextQuestion="quizStore.nextQuestion" @previousQuestion="quizStore.previousQuestion" @selectedAnswer="quizStore.selectedAnswer">
      </QuizModal>
   </Teleport>
</template>