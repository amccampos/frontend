

let currentQuestion = 0
const questions = [
  {
    statement: '1ª questão',
    options: [
      'opção 1',
      'opção 1',
      'opção 1',
      'opção 1',
      'opção 1',
      'opção 2',
      'opção 3',
      'opção 4',
    ]
  },
  {
    statement: '2ª questão',
    options: [
      'AAAA',
      'BBB',
      'CC',
    ]
  }
]
const answers = []

function create(parent, tag, text) {
    const elm = document.createElement(tag)
    if (text) {
        elm.innerText = text
    }
    parent.appendChild(elm)
    return elm
}

function showQuestion(index) {
    currentQuestion = index
    const question = questions[currentQuestion]
    questionElm.innerHTML = ''
    create(questionElm, 'h2', question.statement)
    const buttons = question.options.map(option => create(questionElm, 'button', option))
    buttons.forEach(button => button.addEventListener('click', () => {
        buttons.forEach(b => b.className = b === button ? 'selected' : '')
        answers[currentQuestion] = button.innerText
    }))
}

function showAnswers() {
    resultElm.innerHTML = ''
    answers.forEach(a =>  create(resultElm, 'div', a))
}

function next() {
    if (answers[currentQuestion]) {
        if (currentQuestion === questions.length - 1) {
            showAnswers()
        }
        else {
            showQuestion(currentQuestion + 1)
        }
    }
}

const app = document.getElementById('quiz')
const questionElm = create(app, 'div')
const submitBtn = create(app, 'button', 'Submete')
const resultElm = create(app, 'div')

submitBtn.addEventListener('click', next)
showQuestion(0)