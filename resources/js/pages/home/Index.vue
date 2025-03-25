<script setup>
import QuizModal from '@/components/home/QuizModal.vue';
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
   <section class="relative bg-[#0a0a0a]">
      <!-- Background Pattern -->
      <div class="absolute inset-0 overflow-hidden">
         <div class="absolute w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_50%)]"></div>
      </div>
      
      <div class="relative grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
         <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white">
               Master Your Knowledge</h1>
            <p class="max-w-2xl mb-6 text-gray-600 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
               Challenge yourself with our comprehensive quiz system. Test your knowledge, track your progress, and learn at your own pace.</p>

            <button @click="quizStore.showQuizSection"
               class="group relative inline-flex items-center justify-center px-8 py-3 text-base font-medium overflow-hidden rounded-xl transition-all duration-200">
               <!-- Button Background -->
               <div class="absolute inset-0 w-full h-full transition-all duration-300 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 group-hover:opacity-90"></div>
               
               <!-- Button Content -->
               <span class="relative flex items-center gap-2 text-white">
                  Start Quiz
                  <svg class="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
               </span>
               
               <!-- Button Glow Effect -->
               <div class="absolute inset-0 w-full h-full transition-all duration-300 opacity-0 group-hover:opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4),transparent_70%)]"></div>
            </button>
         </div>
         <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <div class="relative">
               <img src="/assets/images/car5.png" alt="car" class="relative z-10 transition-transform duration-300 hover:scale-105">
               <!-- Image Glow Effect -->
               <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]"></div>
            </div>
         </div>
      </div>
   </section>
   <!------------------widget component--------------->
   <section class="relative bg-white dark:bg-[#111]">
      <!-- Background Pattern -->
      <div class="absolute inset-0 overflow-hidden">
         <div class="absolute w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_50%)]"></div>
      </div>

      <div class="relative gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
         <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white">
               Elevate Your Learning Journey
            </h2>
            <p class="mb-4 text-gray-600 dark:text-gray-400">
               Our comprehensive quiz system adapts to your learning style, helping you master new concepts effectively. Track your progress, identify areas for improvement, and achieve your learning goals.
            </p>
            <p class="text-gray-600 dark:text-gray-400">
               Join thousands of learners who have transformed their knowledge through our interactive platform.
            </p>
         </div>
         <div class="grid grid-cols-2 gap-4 mt-8">
            <div class="relative group">
               <img class="w-full rounded-lg transition-transform duration-300 group-hover:scale-105" 
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" 
                    alt="office content 1">
               <!-- Image Glow Effect -->
               <div class="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]"></div>
            </div>
            <div class="relative group mt-4 lg:mt-10">
               <img class="w-full rounded-lg transition-transform duration-300 group-hover:scale-105" 
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" 
                    alt="office content 2">
               <!-- Image Glow Effect -->
               <div class="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]"></div>
            </div>
         </div>
      </div>
   </section>

   <!------------------Features Section------------------>
   <section class="relative bg-gray-50 dark:bg-[#111]">
      <!-- Background Pattern -->
      <div class="absolute inset-0 overflow-hidden">
         <div class="absolute w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_50%)]"></div>
      </div>

      <div class="relative py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
         <div class="max-w-screen-md mb-8 lg:mb-16">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white">
               Features designed for your success
            </h2>
            <p class="text-gray-600 sm:text-xl dark:text-gray-400">
               Experience a comprehensive learning platform that adapts to your needs and helps you achieve your goals.
            </p>
         </div>
         <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:space-y-0">
            <div class="relative group p-6 bg-white dark:bg-[#111] rounded-xl shadow-xl transition-transform duration-300 hover:-translate-y-1">
               <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                  <svg class="w-6 h-6 text-gray-800 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
               </div>
               <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                  Smart Learning
               </h3>
               <p class="text-gray-600 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-500 transition-colors">
                  Adaptive quizzes that adjust to your skill level and learning pace.
               </p>
            </div>
            <div class="relative group p-6 bg-white dark:bg-[#111] rounded-xl shadow-xl transition-transform duration-300 hover:-translate-y-1">
               <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                  <svg class="w-6 h-6 text-gray-800 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
               </div>
               <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                  Progress Tracking
               </h3>
               <p class="text-gray-600 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-500 transition-colors">
                  Monitor your performance with detailed analytics and insights.
               </p>
            </div>
            <div class="relative group p-6 bg-white dark:bg-[#111] rounded-xl shadow-xl transition-transform duration-300 hover:-translate-y-1">
               <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                  <svg class="w-6 h-6 text-gray-800 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
               </div>
               <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                  Rich Content
               </h3>
               <p class="text-gray-600 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-500 transition-colors">
                  Access a diverse range of quizzes with multimedia content.
               </p>
            </div>
         </div>
      </div>
   </section>
   <!-- quiz section -->
   <Teleport to="body">
      <QuizModal :show="quizStore.showModal" @closeQuizModal="quizStore.hideQuizSection" :currentQuestion="quizStore.currentQuestion" :currentLevelTotalQuestions="quizStore.currentLevelTotalQuestions" :currentIndex="quizStore.currentIndex" @nextQuestion="quizStore.nextQuestion" @previousQuestion="quizStore.previousQuestion" @selectedAnswer="quizStore.selectedAnswer">
      </QuizModal>
   </Teleport>
</template>