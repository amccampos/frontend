/**
 * Script para exemplificar como pode funcionar uma aplicação (bem simples) sem ferramentas reativas,
 * como React, Vue, Angular ou Svelte. É necessário recriar "na mão" elementos em função dos dados alterados.
 */

/** Guarda as questões a serem apresentadas ao usuário */
const questions = [
  {
    statement: 'Qual das ferramentas a seguir foi criada pelo Facebook?',
    options: [
      'React',
      'Vue',
      'Angular',
      'Svelte',
    ]
  },
  {
    statement: 'Qual das ferramentas a seguir não é nem framework nem biblioteca, mas um compilador?',
    options: [
      'React',
      'Vue',
      'Angular',
      'Svelte',
    ]
  },
  {
    statement: 'Qual das ferramentas a seguir é apoiada pelo Google?',
    options: [
      'React',
      'Vue',
      'Angular',
      'Svelte',
    ]
  },
  {
    statement: 'Qual das ferramentas a seguir é usada no framework Nuxt.js?',
    options: [
      'React',
      'Vue',
      'Angular',
      'Svelte',
    ]
  }
]

/* --- Funções --------------------------------------------------- */

/**
 * Cria um elemento html.
 * @param {HTMLElement} parent Pai do elemento a ser criado.
 * @param {string} tag         Tipo de elemento html a ser criado.
 * @param {string} className   Classe a ser introduzida no elemento (opcional)
 * @param {string} innerText   Texto interno do elemento (opcional)
 */
function create(parent, tag, className, innerText) {
  const elm = document.createElement(tag)
  parent.appendChild(elm)
  elm.className = className || ''
  elm.innerText = innerText || ''
  return elm
}

/**
 * Apresenta uma questão no painel de questões.
 * @param {number} index Índice da questão a ser apresentada.
 */
function showQuestion(index) {
  currentQuestion = index
  const question = questions[currentQuestion]
  questionElm.innerHTML = ''
  create(questionElm, 'p', 'm5', `Questão ${index+1} de ${questions.length}`)
  create(questionElm, 'h2', 'm5', question.statement)
  const buttons = question.options.map(option => create(questionElm, 'button', 'm5', option))
  buttons.forEach(button => button.addEventListener('click', () => {
    buttons.forEach(b => b.className = b === button ? 'selected' : '')
    answers[currentQuestion] = button.innerText
  }))
}

/**
 * Apresenta a próxima questão ou apresenta os resultados, caso a questão atual seja a última.
 */
function next() {
  if (answers[currentQuestion]) {
    if (currentQuestion === questions.length - 1) {
      showResults()
    }
    else {
      showQuestion(currentQuestion + 1)
    }
  }
}

/**
 * Apresenta o painel de questões, iniciando da primeira.
 */
function startQuestions() {
  questionElm.style.display = 'block'
  resultElm.style.display = 'none'
  submitBtn.innerText = 'Confirma resposta'
  submitBtn.onclick = next
  showQuestion(0)
}

/** Apresenta os resultados, depois que o usuário  respondeu todas as questões. */
function showResults() {
  questionElm.style.display = 'none'
  resultElm.style.display = 'block'
  resultElm.innerHTML = ''
  create(resultElm, 'h2', 'm5', 'Escolhas')
  answers.forEach((a, i) => {
    const p = create(resultElm, 'p')
    create(p, 'strong', '', `Questão ${i+1}:`)
    create(p, 'br')
    create(p, 'span', '', `${questions[i].statement} `)
    create(p, 'strong', '', a)
  })
  submitBtn.innerText = 'Reinicia'
  submitBtn.onclick = startQuestions
}

/* --- Globais ------------------------------------ */

/** Índice da questão sendo apresentada */
let currentQuestion = 0

/** Respostas dadas pelo usuário */
const answers = []

/** Elemento html raiz da aplicação */
const app = document.getElementById('quiz')

/** Painel com a questão que está sendo apresentada ao usuário */
const questionElm = create(app, 'div', 'questionPanel')

/** Painel com as respostas do usuário */
const resultElm = create(app, 'div', 'resultPanel')

/** Botão para confirmar resposta de uma questão ou para reiniciar o quiz */
const submitBtn = create(app, 'button', 'submitBtn')

startQuestions()
