<script setup>
import PriButton from '@/Components/PriButton.vue';
import { defineEmits } from 'vue';
import { useForm } from '@inertiajs/vue3';
const props = defineProps({
      show: Boolean,
      currentQuestion: Object,
      currentLevelTotalQuestions: Number,
      currentIndex: Number
});
const emit = defineEmits(['selectedAnswer', 'nextQuestion', 'previousQuestion', 'closeQuizModal']);
const selectedAnswer = (index) => {
      emit('selectedAnswer', index);
}
const form = useForm({
      answer: null
});
const submit = () => {
      form.post(route('submit.answer'), {
      })
}

</script>
<template>
      <Transition name="bounce">
            <div v-if="show"
                  class="fixed z-40 w-full modal-mask h-full overflow-y-auto bg-white border-t border-gray-200 rounded-t-lg dark:border-gray-700 dark:bg-gray-800 transition-transform bottom-0 left-0 right-0">
                  <!-- Header -->
                  <div class="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                        @click="$emit('closeQuizModal')">
                        <span
                              class="absolute w-8 h-1 -translate-x-1/2 bg-gray-300 rounded-lg top-3 left-1/2 dark:bg-gray-600"></span>
                        <h5 id="drawer-swipe-label"
                              class="inline-flex items-center text-base text-gray-500 dark:text-gray-400 font-medium">
                              <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor" viewBox="0 0 18 18">
                                    <path
                                          d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10ZM17 13h-2v-2a1 1 0 0 0-2 0v2h-2a1 1 0 0 0 0 2h2v2a1 1 0 0 0 2 0v-2h2a1 1 0 0 0 0-2Z" />
                              </svg>Back
                        </h5>
                  </div>
                  <!-- Main -->
                  
                        <section class="bg-white py-4 antialiased dark:bg-gray-900 md:py-8">
                              <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
                                    <h2
                                          class="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl md:mb-6">
                                          Quiz Section</h2>
                                    <div class="gap-8 lg:flex">
                                          <!-- Right content -->
                                          <form @submit.prevent="submit" class="w-full space-y-4 lg:space-y-4">
                                                <div class="">
                                                      <ol
                                                            class="flex flex-col gap-4  rounded-t-lg border-b  border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 sm:justify-center md:flex-row md:items-center lg:gap-6">

                                                            <li v-for="(question, i) in currentLevelTotalQuestions"
                                                                  :key="i"
                                                                  class="flex md:w-full gap-2 items-center text-gray-200 dark:text-gray-500 sm:after:content-[''] after:hidden"
                                                                  :class="{ 'after:w-full after:h-1 sm:after:inline-block after:mx-6 xl:after:mx-auto after:border-b after:border-gray-200 after:border-1  dark:after:border-gray-700': i + 1 < currentLevelTotalQuestions }">
                                                                  <span
                                                                        class="flex items-center after:content-['/'] sm:after:hidden after:mx-auto">

                                                                        <!-- <svg class="h-5 w-5 text-gray-500 dark:text-gray-400"
                                                                        aria-hidden="true"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="currentColor" viewBox="0 0 20 20">
                                                                        <path 
                                                                              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                                                  </svg> -->
                                                                        <svg class="h-6 w-6  sm:w-6 sm:h-6 me-2.5"
                                                                              :class="{ 'h-8 w-8 sm:w-8 sm:h-8 text-gray-400 dark:text-gray-100': i === currentIndex }"
                                                                              aria-hidden="true"
                                                                              xmlns="http://www.w3.org/2000/svg"
                                                                              width="24" height="24" fill="none"
                                                                              viewBox="0 0 24 24">
                                                                              <path stroke="currentColor"
                                                                                    stroke-linecap="round"
                                                                                    stroke-linejoin="round"
                                                                                    stroke-width="2"
                                                                                    d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                        </svg>
                                                                        <span
                                                                              :class="{ 'text-2xl text-white dark:text-gray-100': i === currentIndex }">
                                                                              {{ i + 1 }}
                                                                        </span>
                                                                  </span>
                                                            </li>
                                                      </ol>

                                                      <!-- <ol
                                                      class="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
                                                      <li
                                                            class="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                                                            <span
                                                                  class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                                                                  <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                                                                        aria-hidden="true"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="currentColor" viewBox="0 0 20 20">
                                                                        <path
                                                                              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                                                  </svg>
                                                                  Personal <span
                                                                        class="hidden sm:inline-flex sm:ms-2">Info</span>
                                                            </span>
                                                      </li>
                                                      <li
                                                            class="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                                                            <span
                                                                  class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                                                                  <span class="me-2">2</span>
                                                                  Account
                                                            </span>
                                                      </li>
                                                      <li class="flex items-center">
                                                            <span class="me-2">3</span>
                                                            Confirmation
                                                      </li>
                                                </ol> -->

                                                      <div class="mb-4 bg-primary-50 p-4 text-sm text-primary-800 dark:bg-gray-800 dark:text-primary-400 sm:text-base"
                                                            role="alert">
                                                            <h3
                                                                  class="text-3xl text-center font-semibold text-gray-900 dark:text-white">
                                                                  {{ currentIndex + 1 }}. {{ currentQuestion.question
                                                                  }}?</h3>

                                                      </div>
                                                </div>

                                                <div class="space-y-4">
                                                      <div class="flex justify-between gap-4">
                                                            <!---------Image Question-------->
                                                            <div
                                                                  class="divide-y w-1/3 divide-gray-200  rounded-lg border border-gray-200 bg-white shadow-sm dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800">

                                                            </div>
                                                            <!--------------Answers--------->
                                                            <div
                                                                  class="w-full divide-y divide-gray-200 shadow-sm dark:divide-gray-700 ">
                                                                  <div v-for="(answer, i) in currentQuestion.answers"
                                                                        :key="i" @click="selectedAnswer(i)"
                                                                        class="flex gap-2 cursor-pointer items-center border border-gray-200 dark:border-gray-700 mb-2 p-4 sm:items-start rounded-lg lg:items-center hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-800">
                                                                        <div>
                                                                              <input id="product1" type="radio" :value="answer.id" name="answer"
                                                                                    class="h-6 w-6 rounded border-gray-300  bg-gray-100 text-primary-700 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                                                        </div>
                                                                        <div
                                                                              class="min-w-0 flex-1 gap-14 xl:flex xl:items-center justify-between">
                                                                              <div
                                                                                    class="min-w-0 max-w-xl flex-1 gap-6 sm:flex sm:items-center">
                                                                                    <button type="button"
                                                                                          class="mt-4 font-medium text-gray-900  dark:text-white sm:mt-0">
                                                                                          {{ answer.answer }}
                                                                                    </button>
                                                                              </div>
                                                                              <!-- Tick -->
                                                                              <!-- <div class="text-green-700">
                                                                              <svg class="w-4 h-4" aria-hidden="true"
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    fill="none" viewBox="0 0 16 12">
                                                                                    <path stroke="currentColor"
                                                                                          stroke-linecap="round"
                                                                                          stroke-linejoin="round"
                                                                                          stroke-width="2"
                                                                                          d="M1 5.917 5.724 10.5 15 1.5" />
                                                                              </svg>
                                                                        </div> -->
                                                                        </div>
                                                                  </div>

                                                            </div>
                                                      </div>
                                                      <div class="gap-4 sm:flex sm:items-center sm:justify-between">
                                                            <PriButton :disabled="currentIndex === 0"
                                                                  :class="{ 'bg-transparent border border-zinc-700 dark:border-zinc-700 text-zinc-700' : currentIndex === 0 }"
                                                                  @click="$emit('previousQuestion')"
                                                                  :label="'Previous'" />
                                                            <PriButton
                                                                  v-if="currentIndex + 1 < currentLevelTotalQuestions"
                                                                  @click="$emit('nextQuestion')" :label="'Next'" />
                                                            <PriButton type="submit"
                                                                  v-if="currentIndex + 1 === currentLevelTotalQuestions"
                                                                  :disabled="form.processing"
                                                                  :class="{ 'bg-green-600/25': currentIndex + 1 === currentLevelTotalQuestions }"
                                                                  :label="form.processing ? '...' : 'Submit'" />
                                                      </div>
                                                </div>
                                          </form>
                                    </div>
                              </div>
                        </section>
                  
            </div>
      </Transition>
</template>

<style scoped>
.bounce-enter-active {
      animation: bounce-in 0.4s;
}

.bounce-leave-active {
      animation: bounce-in 0.4s reverse;
}

@keyframes bounce-in {
      0% {
            transform: scale(0);
      }

      50% {
            transform: scale(1.1);
      }

      100% {
            transform: scale(1);
      }
}

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>