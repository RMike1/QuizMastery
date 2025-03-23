import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useQuizStore = defineStore('quiz', () => {
  const currentLevelValue = ref(0)
  const currentQuestionValue = ref(0)
  const answersValue = ref(0)
  const result = ref(0)
  const showModal = ref(false)
  const level = ref(null)
  const selectedAnswers = ref({}) // Store answers for each question

  const currentQuestion = computed(() => {
    return level.value[currentLevelValue.value].questions[currentQuestionValue.value]
  })

  const currentLevelTotalQuestions = computed(() => {
    return level.value[currentLevelValue.value].questions_count
  })

  const currentIndex = computed(() => {
    return currentQuestionValue.value
  })

  const isAnswerSelected = computed(() => {
    return (questionId, answerIndex) => {
      return selectedAnswers.value[questionId] === answerIndex
    }
  })

  function nextQuestion() {
    currentQuestionValue.value++
  }

  function previousQuestion() {
    currentQuestionValue.value--
  }

  function selectedAnswer(index) {
    const questionId = currentQuestion.value.id
    selectedAnswers.value[questionId] = index
    
    if (currentQuestion.value.answers[index].is_correct === 1) {
      result.value = result.value + Number(currentQuestion.value.marks)
    }
  }

  function showQuizSection() {
    showModal.value = true
  }

  function hideQuizSection() {
    showModal.value = false
  }

  function setCurrentIndex(index) {
    currentQuestionValue.value = index
  }

  function setLevel(newLevel) {
    level.value = newLevel
    // Reset selected answers when setting a new level
    selectedAnswers.value = {}
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
    setLevel
  }
})
