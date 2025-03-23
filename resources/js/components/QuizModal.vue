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
<template>
      <Transition name="bounce">
            <div v-if="show"
                  class="fixed inset-0 z-40 overflow-y-auto bg-white dark:bg-gray-800 md:inset-x-[10%] md:top-[5%] md:bottom-[5%] md:rounded-lg md:border md:border-gray-200 dark:md:border-gray-700">
                  <!-- Header -->
                  <div class="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                        <div class="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                              @click="quizStore.hideQuizSection()">
                              <span
                                    class="block w-8 h-1 mx-auto bg-gray-300 rounded-lg dark:bg-gray-600"></span>
                              <h5 id="drawer-swipe-label"
                                    class="inline-flex items-center text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
                                    <svg class="w-4 h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                          fill="none" viewBox="0 0 20 20">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    Quiz
                              </h5>
                        </div>

                        <!-- Progress Steps -->
                        <div class="p-4">
                              <ol class="flex flex-wrap gap-2 sm:gap-4 items-center justify-center">
                                    <li v-for="(question, i) in quizStore.currentLevelTotalQuestions" :key="i"
                                          class="flex items-center">
                                          <button @click="quizStore.setCurrentIndex(i)"
                                                class="flex items-center justify-center rounded-t-lg cursor-pointer transition-all hover:scale-105"
                                                :class="{ 'border-primary-500 bg-primary-50 w-10 h-10 border-4 dark:border-gray-100 dark:bg-gray-900/20': i === quizStore.currentIndex,
                                                      'border-gray-500 dark:border-gray-400 w-8 h-8 border-2': i !== quizStore.currentIndex }">
                                                <span :class="{ 'text-primary-600 text-xl dark:text-primary-400': i === quizStore.currentIndex,
                                                            'text-gray-500 dark:text-gray-400': i !== quizStore.currentIndex }">
                                                      {{ i + 1 }}
                                                </span>
                                          </button>
                                          <span v-if="i + 1 < quizStore.currentLevelTotalQuestions" class="mx-2 text-gray-400">-</span>
                                    </li>
                              </ol>
                        </div>
                  </div>

                  <!-- Content -->
                  <div class="p-4 md:p-6">
                        <!-- Question -->
                        <div class="mb-6">
                              <h3 class="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white text-center">
                                    {{ quizStore.currentIndex + 1 }}. {{ quizStore.currentQuestion.question }}?
                              </h3>
                        </div>

                        <div class="flex flex-col md:flex-row gap-4">
                              <!-- Image Question Section -->
                              <div v-if="quizStore.currentQuestion.image" class="w-full md:w-1/3">
                                    <div class="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                                          <img :src="quizStore.currentQuestion.image" 
                                               :alt="'Question ' + (quizStore.currentIndex + 1) + ' image'"
                                               class="w-full h-auto object-cover" />
                                    </div>
                              </div>

                              <!-- Answers Section -->
                              <div class="w-full md:flex-1">
                                    <div class="space-y-3">
                                          <div v-for="(answer, i) in quizStore.currentQuestion.answers" :key="i"
                                                @click="selectedAnswer(i)"
                                                class="flex items-start gap-3 p-4 cursor-pointer rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                                :class="{ 'bg-gray-50 dark:bg-gray-500/50 border-primary-500 dark:border-primary-400': quizStore.isAnswerSelected(quizStore.currentQuestion.id, i) }">
                                                <div class="flex-shrink-0">
                                                      <input :id="'answer-' + i" type="radio"
                                                            :value="i"
                                                            hidden
                                                            :checked="quizStore.isAnswerSelected(quizStore.currentQuestion.id, i)"
                                                            :name="'question-' + quizStore.currentQuestion.id"
                                                            class="w-5 h-5 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                                                </div>
                                                <label :for="'answer-' + i" class="flex-1 cursor-pointer">
                                                      <span class="block text-sm sm:text-base text-gray-900 dark:text-white">
                                                           {{ i+1 }}. {{ answer.answer }}
                                                      </span>
                                                </label>
                                          </div>
                                    </div>
                              </div>
                        </div>

                        <!-- Navigation Buttons -->
                        <div class="flex items-center justify-between mt-6 gap-4">
                              <PriButton :disabled="quizStore.currentIndex === 0"
                                    :class="{ 'opacity-50 cursor-not-allowed': quizStore.currentIndex === 0 }"
                                    @click="quizStore.previousQuestion()" :label="'Previous'" />
                              
                              <PriButton v-if="quizStore.currentIndex + 1 < quizStore.currentLevelTotalQuestions"
                                    @click="quizStore.nextQuestion()" :label="'Next'" />
                              
                              <PriButton v-else
                                    type="submit"
                                    :disabled="form.processing"
                                    :class="{ 'bg-green-600 hover:bg-green-700': !form.processing }"
                                    :label="form.processing ? 'Submitting...' : 'Submit'" />
                        </div>
                  </div>
            </div>
      </Transition>
</template>

<style scoped>
.bounce-enter-active {
      animation: bounce-in 0.5s;
}

.bounce-leave-active {
      animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
      0% {
            transform: translateY(100%);
      }

      100% {
            transform: translateY(0);
      }
}

.step-divider::after {
      content: "-";
      margin: 0 1rem;
}

@media (min-width: 768px) {
      @keyframes bounce-in {
            0% {
                  transform: scale(0.95);
                  opacity: 0;
            }

            100% {
                  transform: scale(1);
                  opacity: 1;
            }
      }
}
</style>