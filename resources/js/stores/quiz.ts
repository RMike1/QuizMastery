import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useQuizStore = defineStore('quiz', () => {
  const currentLevelValue = ref<number>(0);
  const currentQuestionValue = ref<number>(0);
  const answersValue = ref<number>(0);
  const result = ref<number>(0);
  const showModal = ref<boolean>(false);
  const level = ref<any>(null);
  const selectedAnswers = ref<Record<string, number>>({});
  const timer = ref<number>(0);
  const intervalId = ref<number | null>(null);
  const timeUp = ref(false);

  const currentQuestion = computed(() => {
    return level.value[currentLevelValue.value].questions[currentQuestionValue.value];
  });

  const currentLevelTotalQuestions = computed<number>(() => {
    return level.value[currentLevelValue.value].questions_count;
  });

  const currentIndex = computed<number>(() => {
    return currentQuestionValue.value;
  });

  const isAnswerSelected = computed(() => (questionId: string, answerIndex: number) => {
    return selectedAnswers.value[questionId] === answerIndex;
  });

  const allQuestionsAnswered = computed(() => {
    return currentLevelTotalQuestions.value === Object.keys(selectedAnswers.value).length;
  });

  function nextQuestion(): void {
    currentQuestionValue.value++;
  }

  function previousQuestion(): void {
    currentQuestionValue.value--;
  }

  function selectedAnswer(index: number): void {
    const questionId = currentQuestion.value.id;
    selectedAnswers.value[questionId] = index;

    if (currentQuestion.value.answers[index].is_correct === 1) {
      result.value = result.value + Number(currentQuestion.value.marks);
    }
  }

  function showQuizSection(): void {
    showModal.value = true;
  }

  function hideQuizSection(): void {
    showModal.value = false;
  }

  function setCurrentIndex(index: number): void {
    currentQuestionValue.value = index;
  }

  function setLevel(newLevel: any): void {
    level.value = newLevel;
    selectedAnswers.value = {};
  }

  function startTimer(): void {
    timeUp.value = false;
    timer.value = 30;
    intervalId.value = setInterval(() => {
      if (timer.value > 0) {
        timer.value--;
      } else {
        clearInterval(intervalId.value!);
        timeUp.value = true;
      }
    }, 1000);
  }

  function stopTimer(): void {
    if (intervalId.value) {
      clearInterval(intervalId.value);
    }
  }

  function formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return {
    currentLevelValue,
    currentQuestionValue,
    answersValue,
    result,
    showModal,
    level,
    currentQuestion,
    currentLevelTotalQuestions,
    currentIndex,
    selectedAnswers,
    isAnswerSelected,
    nextQuestion,
    previousQuestion,
    selectedAnswer,
    showQuizSection,
    hideQuizSection,
    setCurrentIndex,
    setLevel,
    timer,
    startTimer,
    stopTimer,
    formatTime,
    allQuestionsAnswered,
    timeUp
  };
});
