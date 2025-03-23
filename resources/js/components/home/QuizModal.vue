<template>
      <Transition name="modal">
            <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                  <!-- Backdrop -->
                  <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm dark:bg-gray-950/80" @click="quizStore.hideQuizSection"></div>

                  <!-- Modal Content -->
                  <div class="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden transform transition-all">
                        <!-- Header with Glass Effect -->
                        <div class="relative overflow-hidden">
                              <!-- Background Pattern -->
                              <div class="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 dark:from-primary-500/10 dark:to-secondary-500/10"></div>
                              
                              <!-- Header Content -->
                              <div class="relative px-6 py-4 flex items-center justify-between border-b border-gray-200/30 dark:border-gray-800/30 backdrop-blur-md">
                                    <h5 class="text-xl font-semibold text-gray-900 dark:text-white">
                                          Quiz
                                    </h5>
                                    <button @click="quizStore.hideQuizSection" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                                          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                          </svg>
                                    </button>
                              </div>

                              <!-- Progress Steps -->
                              <div class="px-6 py-4 bg-gray-50/50 dark:bg-gray-800/20 backdrop-blur-md">
                                    <ol class="flex flex-wrap gap-3 sm:gap-4 items-center justify-center">
                                          <li v-for="(_, i) in quizStore.currentLevelTotalQuestions" :key="i"
                                                class="flex items-center">
                                                <button @click="quizStore.setCurrentIndex(i)"
                                                      class="group relative flex items-center justify-center transition-all duration-200 ease-out"
                                                      :class="[
                                                            'w-10 h-10 rounded-xl border-2',
                                                            i === quizStore.currentIndex 
                                                                  ? 'border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/20 scale-110' 
                                                                  : quizStore.selectedAnswers[quizStore.level[quizStore.currentLevelValue]?.questions[i]?.id] !== undefined
                                                                        ? 'border-green-500 bg-green-50 dark:border-green-400 dark:bg-green-900/20'
                                                                        : 'border-gray-300 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-700'
                                                      ]">
                                                      <!-- Number -->
                                                      <span :class="[
                                                            'relative z-10 font-medium transition-all duration-200',
                                                            i === quizStore.currentIndex 
                                                                  ? 'text-primary-600 dark:text-primary-400 text-lg' 
                                                                  : quizStore.selectedAnswers[quizStore.level[quizStore.currentLevelValue]?.questions[i]?.id] !== undefined
                                                                        ? 'text-green-600 dark:text-green-400'
                                                                        : 'text-gray-600 dark:text-gray-400 group-hover:text-primary-500 dark:group-hover:text-primary-400'
                                                      ]">
                                                            {{ i + 1 }}
                                                      </span>
                                                      
                                                      <!-- Check mark for answered questions -->
                                                      <div v-if="quizStore.selectedAnswers[quizStore.level[quizStore.currentLevelValue]?.questions[i]?.id] !== undefined && i !== quizStore.currentIndex"
                                                           class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 dark:bg-green-400 rounded-full flex items-center justify-center">
                                                           <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                                           </svg>
                                                      </div>
                                                      
                                                      <!-- Highlight Effect -->
                                                      <span class="absolute inset-0 rounded-xl bg-primary-100 dark:bg-primary-900/40 transform scale-0 transition-transform duration-200 ease-out group-hover:scale-100 -z-10"></span>
                                                </button>
                                                
                                                <!-- Divider -->
                                                <span v-if="i + 1 < quizStore.currentLevelTotalQuestions" 
                                                      class="mx-1 sm:mx-2 h-px w-3 sm:w-4 bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-700"></span>
                                          </li>
                                    </ol>
                              </div>
                        </div>

                        <!-- Content Area -->
                        <div class="p-6 space-y-6">
                              <!-- Question -->
                              <div class="relative">
                                    <span class="absolute -top-2 -left-2 text-5xl font-bold text-gray-100 dark:text-gray-800 select-none">Q</span>
                                    <h3 class="relative text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
                                          {{ quizStore.currentIndex + 1 }}. {{ quizStore.currentQuestion.question }}?
                                    </h3>
                              </div>

                              <div class="flex flex-col md:flex-row gap-6">
                                    <!-- Image Section -->
                                    <div v-if="quizStore.currentQuestion.image" class="w-full md:w-1/3">
                                          <div class="relative group rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-gray-50 dark:bg-gray-800/50">
                                                <img :src="quizStore.currentQuestion.image" 
                                                     :alt="'Question ' + (quizStore.currentIndex + 1) + ' image'"
                                                     class="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105" />
                                                <!-- Overlay -->
                                                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                          </div>
                                    </div>

                                    <!-- Answers Section -->
                                    <div class="w-full md:flex-1">
                                          <div class="space-y-4">
                                                <div v-for="(answer, i) in quizStore.currentQuestion.answers" :key="i"
                                                      @click="selectedAnswer(i)"
                                                      class="group relative overflow-hidden rounded-xl border-2 transition-all duration-200 cursor-pointer"
                                                      :class="[
                                                            quizStore.isAnswerSelected(quizStore.currentQuestion.id, i)
                                                                  ? 'border-primary-500 bg-primary-50/50 dark:border-primary-400 dark:bg-primary-900/20'
                                                                  : 'border-gray-200 hover:border-primary-300 dark:border-gray-700 dark:hover:border-primary-600'
                                                      ]">
                                                      <!-- Answer Content -->
                                                      <div class="relative z-10 flex items-start gap-4 p-4">
                                                            <div class="flex-shrink-0 pt-1">
                                                                  <div class="w-5 h-5 rounded-full border-2 transition-colors"
                                                                       :class="[
                                                                             quizStore.isAnswerSelected(quizStore.currentQuestion.id, i)
                                                                                   ? 'border-primary-500 bg-primary-500 dark:border-primary-400 dark:bg-primary-400'
                                                                                   : 'border-gray-300 dark:border-gray-600 group-hover:border-primary-300 dark:group-hover:border-primary-600'
                                                                       ]">
                                                                        <span v-if="quizStore.isAnswerSelected(quizStore.currentQuestion.id, i)"
                                                                              class="flex items-center justify-center h-full">
                                                                              <svg class="w-3 h-3 text-white dark:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                                                              </svg>
                                                                        </span>
                                                                  </div>
                                                            </div>
                                                            
                                                            <div class="flex-1">
                                                                  <p class="text-base sm:text-lg text-gray-900 dark:text-white">
                                                                        {{ answer.answer }}
                                                                  </p>
                                                            </div>
                                                      </div>

                                                      <!-- Background Highlight Effect -->
                                                      <div class="absolute inset-0 bg-gradient-to-r from-primary-50 to-transparent dark:from-primary-900/20 dark:to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"></div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>

                        <!-- Footer -->
                        <div class="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">
                              <div class="flex items-center justify-between gap-4">
                                    <!-- Previous Button -->
                                    <button @click="quizStore.previousQuestion()"
                                          :disabled="quizStore.currentIndex === 0"
                                          class="px-6 py-2.5 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                          :class="[
                                                quizStore.currentIndex === 0
                                                      ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600'
                                                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                                          ]">
                                          <span class="flex items-center gap-2">
                                                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                                                </svg>
                                                Previous
                                          </span>
                                    </button>

                                    <!-- Next/Submit Button -->
                                    <button v-if="quizStore.currentIndex + 1 < quizStore.currentLevelTotalQuestions"
                                          @click="quizStore.nextQuestion()"
                                          class="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white rounded-xl font-medium transition-all duration-200">
                                          <span class="flex items-center gap-2">
                                                Next
                                                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                                </svg>
                                          </span>
                                    </button>
                                    
                                    <button v-else
                                          type="submit"
                                          :disabled="form.processing"
                                          class="px-6 py-2.5 rounded-xl font-medium transition-all duration-200"
                                          :class="[
                                                form.processing
                                                      ? 'bg-green-500 text-white cursor-not-allowed'
                                                      : 'bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700'
                                          ]">
                                          {{ form.processing ? 'Submitting...' : 'Submit Quiz' }}
                                    </button>
                              </div>
                        </div>
                  </div>
            </div>
      </Transition>
</template>

<script setup>
import PriButton from '@/components/PriButton.vue';
import { useForm } from '@inertiajs/vue3';
import { useQuizStore } from '@/stores/quiz';

const quizStore = useQuizStore();

defineProps({
    show: Boolean
});

const form = useForm({
    answer: null
});

const submit = () => {
    form.post(route('submit.answer'), {
    });
}

const selectedAnswer = (index) => {
    quizStore.selectedAnswer(index);
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
      transition: all 0.3s ease-out;
}

.modal-enter-from {
      opacity: 0;
      transform: scale(0.95);
}

.modal-leave-to {
      opacity: 0;
      transform: scale(0.95);
}

@keyframes shimmer {
      0% {
            background-position: -1000px 0;
      }
      100% {
            background-position: 1000px 0;
      }
}
</style>