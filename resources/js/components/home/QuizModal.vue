<script setup>
import { onUnmounted, computed, ref } from 'vue';
import PriButton from '@/components/PriButton.vue';
import { useForm } from '@inertiajs/vue3';
import { useQuizStore } from '@/stores/quiz';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  onCloseQuizModal: {
    type: Function,
    required: true
  },
  currentQuestion: {
    type: Object,
    required: true
  }
});

const quizStore = useQuizStore();
const quizStarted = ref(false);

onUnmounted(() => {
    quizStore.stopTimer();
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

const startQuiz = () => {
  quizStarted.value = true;
  quizStore.startTimer();
}
</script>

<template>
      <Transition name="modal">
            <div v-if="show" class="fixed inset-0 z-[100] overflow-hidden flex items-center justify-center p-4 sm:p-6">
                  <!-- Backdrop -->
                  <div class="fixed inset-0 bg-black/50 backdrop-blur-lg transition-all" @click="onCloseQuizModal"></div>

                  <!-- Modal Content -->
                  <div class="relative w-full h-full sm:h-[90vh] sm:w-[90vw] md:w-[85vw] lg:max-w-7xl bg-gray-50 dark:bg-[#111] backdrop-blur-md sm:rounded-[10px] lg:rounded-[20px] shadow-[0_0_40px_rgba(74,222,128,0.1)] sm:shadow-[0_0_60px_rgba(74,222,128,0.15)] lg:shadow-[0_0_80px_rgba(74,222,128,0.15)] overflow-hidden transform border-2 border-[#2a2a2a]/30 hover:shadow-[0_0_60px_rgba(74,222,128,0.2)] sm:hover:shadow-[0_0_80px_rgba(74,222,128,0.25)] lg:hover:shadow-[0_0_100px_rgba(74,222,128,0.25)] flex flex-col sm:mx-auto sm:my-auto">
                        <!-- Header -->
                        <div class="flex-none">
                              <div class="relative overflow-hidden">
                                    <!-- Background Pattern -->
                                    <div class="absolute inset-0 bg-transparent"></div>

                                    <!-- Header Content -->
                                    <div class="relative px-6 py-4 flex items-center justify-between border-b border-gray-200/30 dark:border-gray-800/30 backdrop-blur-md">
                                          <h5 class="text-xl font-semibold text-gray-900 dark:text-white">
                                                Quiz Time
                                          </h5>
                                          <!-- Timer -->
                                          <div class="relative w-16 h-16 flex items-center justify-center">
                                                <div class="absolute inset-0">
                                                      <svg class="w-full h-full" viewBox="0 0 36 36">
                                                            <path class="text-gray-200 dark:text-gray-700" stroke-width="2" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                                            <path class="text-green-500 transition-all duration-1000 ease-linear" stroke-width="2" stroke-dasharray="100, 100" :stroke-dashoffset="100 - (quizStore.timer / 300) * 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                                      </svg>
                                                </div>
                                                <div class="relative text-lg font-bold text-gray-900 dark:text-white">
                                                      {{ quizStore.formatTime(quizStore.timer) }}
                                                </div>
                                          </div>
                                          <button @click="onCloseQuizModal" 
                                                class="group relative p-2 rounded-xl overflow-hidden transition-colors">
                                                <!-- Button Background -->
                                                <div class="absolute inset-0 bg-gray-100 dark:bg-gray-800/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                <!-- Icon -->
                                                <svg class="relative w-5 h-5 text-gray-500 dark:text-gray-400 transition-colors group-hover:text-gray-700 dark:group-hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                                </svg>
                                          </button>
                                    </div>

                                    <!-- Progress Steps -->
                                    <div class="px-6 py-4 bg-gray-50/80 dark:bg-zinc-900/50">
                                          <ol class="flex flex-wrap gap-3 sm:gap-4 items-center justify-center">
                                                <li v-for="(_, i) in quizStore.currentLevelTotalQuestions" :key="i"
                                                      class="flex items-center">
                                                      <button @click="quizStore.setCurrentIndex(i)"
                                                            class="group relative flex items-center justify-center transition-all duration-200 ease-out"
                                                            :class="[
                                                                  'w-10 h-10 rounded-xl border-2',
                                                                  i === quizStore.currentIndex
                                                                        ? 'border-zinc-900 bg-zinc-900 dark:border-white dark:bg-white scale-110'
                                                                        : quizStore.selectedAnswers[quizStore.level[quizStore.currentLevelValue]?.questions[i]?.id] !== undefined
                                                                              ? 'border-zinc-700 bg-zinc-700 dark:border-zinc-300 dark:bg-zinc-300'
                                                                              : 'border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600'
                                                            ]">
                                                            <!-- Number -->
                                                            <span :class="[
                                                                  'relative z-10 font-medium transition-all duration-200',
                                                                  i === quizStore.currentIndex
                                                                        ? 'text-white dark:text-zinc-900 text-lg'
                                                                        : quizStore.selectedAnswers[quizStore.level[quizStore.currentLevelValue]?.questions[i]?.id] !== undefined
                                                                              ? 'text-white dark:text-zinc-900'
                                                                              : 'text-zinc-600 dark:text-zinc-400'
                                                            ]">
                                                                  {{ i + 1 }}
                                                            </span>

                                                            <!-- Check mark for answered questions -->
                                                            <div v-if="quizStore.selectedAnswers[quizStore.level[quizStore.currentLevelValue]?.questions[i]?.id] !== undefined && i !== quizStore.currentIndex"
                                                                  class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 dark:bg-green-400 rounded-full flex items-center justify-center">
                                                                  <svg class="w-3 h-3 text-white" fill="none"
                                                                        viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path stroke-linecap="round"
                                                                              stroke-linejoin="round" stroke-width="2"
                                                                              d="M5 13l4 4L19 7"></path>
                                                                  </svg>
                                                            </div>

                                                            <!-- Highlight Effect -->
                                                            <span
                                                                  class="absolute inset-0 rounded-xl bg-gray-100 dark:bg-gray-800/40 transform scale-0 transition-transform duration-200 ease-out group-hover:scale-100 -z-10"></span>
                                                      </button>

                                                      <!-- Divider -->
                                                      <span v-if="i + 1 < quizStore.currentLevelTotalQuestions"
                                                            class="mx-1 sm:mx-2 h-px w-3 sm:w-4 bg-gray-300 dark:bg-gray-700"></span>
                                                </li>
                                          </ol>
                                    </div>
                              </div>
                        </div>

                        <!-- Content Area -->
                        <div class="flex-1 overflow-y-auto">
                              <div class="p-6 space-y-6 bg-white dark:bg-[#111]">
                                    <!-- Glass Overlay -->
                                    <div v-if="!quizStarted" class="absolute inset-0 z-10 bg-white/50 dark:bg-[#111]/50 backdrop-blur-sm flex items-center justify-center">
                                      <div class="text-center">
                                        <h3 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Ready to start the quiz?</h3>
                                        <button @click="startQuiz" class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                          Lets'goo
                                        </button>
                                      </div>
                                    </div>

                                    <!-- Quiz Content -->
                                    <div>
                                      <!-- Question -->
                                      <div class="z-10">
                                        <h3 class=" text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
                                          {{ quizStore.currentIndex + 1 }}. {{ quizStore.currentQuestion.question }}?
                                        </h3>
                                      </div>

                                      <div class="flex flex-col md:flex-row gap-6 mt-6">
                                        <!-- Image Section -->
                                        <div v-if="quizStore.currentQuestion.image" class="w-full md:w-1/3">
                                          <div class="relative group rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-gray-50 dark:bg-[#111]">
                                            <img :src="quizStore.currentQuestion.image" :alt="'Question ' + (quizStore.currentIndex + 1) + ' image'" class="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105" />
                                            <!-- Overlay -->
                                            <div class="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                          </div>
                                        </div>

                                        <!-- Answers Section -->
                                        <div class="w-full md:flex-1">
                                          <div class="space-y-4">
                                            <div v-for="(answer, i) in quizStore.currentQuestion.answers" :key="i" @click="selectedAnswer(i)" class="group relative overflow-hidden rounded-xl border-2 transition-all duration-200 cursor-pointer" :class="[
                                              quizStore.isAnswerSelected(quizStore.currentQuestion.id, i) ? 'border-gray-900 bg-gray-50/50 dark:border-white dark:bg-[#111]/50' : 'border-gray-200 hover:border-gray-300 dark:border-zinc-800 dark:hover:border-zinc-700'
                                            ]">
                                              <!-- Answer Content -->
                                              <div class="z-10 flex items-start gap-4 p-4">
                                                <div class="flex-shrink-0 pt-1">
                                                  <div class="w-5 h-5 rounded-full border-2 transition-colors" :class="[
                                                    quizStore.isAnswerSelected(quizStore.currentQuestion.id, i) ? 'border-gray-900 bg-gray-900 dark:border-white dark:bg-white' : 'border-gray-400 dark:border-gray-600 group-hover:border-gray-500 dark:group-hover:border-gray-500'
                                                  ]">
                                                    <span v-if="quizStore.isAnswerSelected(quizStore.currentQuestion.id, i)" class="flex items-center justify-center h-full">
                                                      <svg class="w-3 h-3 text-white dark:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                                      </svg>
                                                    </span>
                                                  </div>
                                                </div>

                                                <div class="flex-1">
                                                  <p class="text-base sm:text-lg text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                                    {{ answer.answer }}
                                                  </p>
                                                </div>
                                              </div>

                                              <!-- Background Highlight Effect -->
                                              <div class="absolute inset-0 bg-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"></div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                              </div>
                        </div>

                        <!-- Footer -->
                        <div  class="flex-none bg-gray-50 dark:bg-[#111] border-t border-gray-200 dark:border-gray-800/50">
                              <div class="px-6 py-4">
                                    <div class="flex items-center justify-between gap-4">
                                          <!-- Previous Button -->
                                          <button @click="quizStore.previousQuestion()"
                                                :disabled="quizStore.currentIndex === 0"
                                                class="group relative px-6 py-2.5 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden">
                                                <!-- Button Background -->
                                                <div
                                                      class="absolute inset-0 bg-gray-100 dark:bg-[#111]/50 opacity-100 group-hover:opacity-0 transition-opacity">
                                                </div>
                                                <div
                                                      class="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                                </div>

                                                <!-- Button Content -->
                                                <span
                                                      class="relative flex items-center gap-2 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                                      <svg class="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1"
                                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                  stroke-width="2" d="M15 19l-7-7 7-7"></path>
                                                      </svg>
                                                      Previous
                                                </span>
                                          </button>

                                          <!-- Next/Submit Button -->
                                          <button v-if="quizStore.currentIndex + 1 < quizStore.currentLevelTotalQuestions && !quizStore.allQuestionsAnswered" @click="quizStore.nextQuestion"
                                                class="group relative px-6 py-2.5 rounded-xl font-medium transition-all duration-200 overflow-hidden">
                                                <!-- Button Background -->
                                                <div
                                                      class="absolute inset-0 bg-transparent opacity-100 group-hover:opacity-90 transition-opacity">
                                                </div>

                                                <!-- Button Content -->
                                                <span
                                                      class="relative flex items-center gap-2 text-gray-900 dark:text-white">
                                                      Next
                                                      <svg class="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                  stroke-width="2" d="M9 5l7 7-7 7"></path>
                                                      </svg>
                                                </span>

                                                <!-- Button Glow Effect -->
                                                <div
                                                      class="absolute inset-0 w-full h-full transition-all duration-300 opacity-0 group-hover:opacity-20 bg-transparent">
                                                </div>
                                          </button>

                                          <button v-else type="submit" :disabled="form.processing"
                                                class="group relative px-6 py-2.5 rounded-xl font-medium transition-all duration-200 overflow-hidden">
                                                <!-- Button Background -->
                                                <div
                                                      class="absolute inset-0 bg-transparent opacity-100 group-hover:opacity-90 transition-opacity">
                                                </div>

                                                <!-- Button Content -->
                                                <span class="relative flex items-center gap-2 text-white">
                                                      {{ form.processing ? 'Submitting...' : 'Submit Quiz' }}
                                                      <svg v-if="!form.processing" class="w-5 h-5" fill="none"
                                                            viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                  stroke-width="2" d="M5 13l4 4L19 7"></path>
                                                      </svg>
                                                      <svg v-else class="w-5 h-5 animate-spin" fill="none"
                                                            viewBox="0 0 24 24">
                                                            <circle class="opacity-25" cx="12" cy="12" r="10"
                                                                  stroke="currentColor" stroke-width="4"></circle>
                                                            <path class="opacity-75" fill="currentColor"
                                                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                                            </path>
                                                      </svg>
                                                </span>

                                                <!-- Button Glow Effect -->
                                                <div
                                                      class="absolute inset-0 w-full h-full transition-all duration-300 opacity-0 group-hover:opacity-20 bg-transparent">
                                                </div>
                                          </button>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      </Transition>

      <Transition name="modal">
            <div v-if="quizStore.timeUp" class="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-4">
                  <div class="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full text-center">
                        <h3 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Time's Up!</h3>
                        <p class="text-gray-600 dark:text-gray-300 mb-6">Unfortunately, you didn't complete the quiz in time. Better luck next time!</p>
                        <button @click="quizStore.hideQuizSection" class="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                              Close
                        </button>
                  </div>
            </div>
      </Transition>
</template>

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