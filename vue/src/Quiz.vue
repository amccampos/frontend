<template>
  <div>
      <Question
        :statement="questions[currentQuestion].statement"
        :options="questions[currentQuestion].options"
        @selection="onSelection($event)"
        ></Question>
      <button @click="next">Próximo</button>
      <Results v-if="showResults" :answers="answers"></Results>
  </div>
</template>

<script>
import Vue from 'vue'
import Question from './Question.vue'
import Results from './Results.vue'

export default {
    name: 'Quiz',
    components: {
        Question,
        Results
    },
    data: () => {
        return {
            questions: [
                {
                    statement: 'Esta é a 1ª questão',
                    options: ['aaa', 'bbb', 'ccc']
                },
                {
                    statement: 'Esta é a 2ª questão',
                    options: ['aaa', 'bbb', 'ccc', 'ddd']
                },
            ],
            currentQuestion: 0,
            showResults: true,
            answers: []
        }
    },
    methods: {
        next: function() {
            if (this.currentQuestion < this.questions.length - 1) {
                this.currentQuestion++
            }
            else {
                this.showResults = true
            }
        },
        onSelection: function(option) {
            // this.answers[this.currentQuestion] = option
            Vue.set(this.answers, this.currentQuestion, option)
        }
    }
}
</script>

<style>

</style>