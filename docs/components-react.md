<!-- omit in toc -->
# Componentes em React

- [Retornando elementos visuais](#retornando-elementos-visuais)
- [Componentes de função e de classe](#componentes-de-função-e-de-classe)
- [Aninhando componentes](#aninhando-componentes)
- [Passando dados para um componente](#passando-dados-para-um-componente)
- [Condicionais e listas](#condicionais-e-listas)
- [Dados do componente (estado)](#dados-do-componente-estado)
- [Tratando eventos](#tratando-eventos)
- [Adicionando estilo](#adicionando-estilo)
- [Resultado final](#resultado-final)

React é uma biblioteca voltada a criação de elementos visuais em aplicações web. Ela não pretende atender todas as necessidades para se criar uma aplicação web completa. Porém, é boa "naquilo que promete": criar componentes 🧩.

Há duas formas de se criar componentes em React: através de uma função ou de uma classe. Em uma aplicação React, qualquer função que retorne elementos visuais é um componente (ou melhor, é usada para criar instâncias de componentes). Essa é a forma mais simples de se criar componentes em React. Há também como definir componentes através de uma classe. Nesse caso, ela precisa estender uma classe específica do React e possuir um método que retorne os elementos visuais 👀.

### Retornando elementos visuais

React é uma biblioteca Javascript. Isso quer dizer que podemos criar todos os elementos visuais a partir de um código Javascript. É possível criar elementos para serem renderizados na página através de funções da biblioteca.

Se quisermos criar um componente que renderize os elementos a seguir...
```html
<div id="question">
  <h1>Enunciado da questão</h1>
</div>
```

...podemos criar uma função que retorne os elementos usando a API da biblioteca React, como apresentado abaixo. Esse exemplo ilustra a criação de um componente através de uma função.

```js
import React from 'react'

function Question() {
  return React.createElement( 'div', { id: 'question' },
    React.createElement('h1', null, 'Enunciado da questão'),
  )
}
```

Como essa função retorna elementos visuais, ela será utilizada para criar o componente `Question` sempre que a tag `<Question>` for encontrada.

Usar a API para criar elementos com toda a estrutura em árvore que eles requerem pode se tornar complexo, deixar o código difícil de ler e de dar manutenção 🙈. Usar uma sintaxe declarativa, como a linguagem de marcação HTML é bem mais simples.

Por isso, o React introduziu dentro do Javascript um mecanismo especial para simplificar a definição dos elementos. Ele usa uma sintaxe similar ao HTML  (na verdade, é [XML](https://pt.wikipedia.org/wiki/XML)) chamada de JSX (acrônimo de Javascript XML), que permite reescrever o código anterior de forma bem mais simples 💡. Vale ressaltar que, mesmo que `React` não seja explicitamente referenciada, para que o JSX funcione, é necessário importar a biblioteca React.

```jsx
import React from 'react'

function Question() {
  return (
    <div id="question">
      <h1>Enunciado da questão</h1>
    </div>
  )
}
```

Você pode ver que há uma mistura de HTML/XML dentro do Javascript. O React possui portanto um pré-processador que transforma o código declarativo em chamadas da sua biblioteca. Assim, para nós desenvolvedores, é transparente se usamos JSX ou não. Porém, pela simplicidade, a maioria dos desenvolvedores optam por usar JSX... e será assim que utilizaremos o React no curso.

Veja que colocamos o código XML entre `( )`. Quando o valor de retorno possui mais de uma linha, usamos um parêntese englobando para identarmos corretamente as tags sem problemas de ter um `return` sem nada em seguida (a função retornaria *nada*). 

### Componentes de função e de classe

Componentes de função, como apresentados na seção anterior, são bem enxutos e concisos. Usando, por exemplo a construção de função seta (*arrow function*), poderíamos escrever componentes simples como este:
```jsx
const Question = () => <h1>Enunciado da questão</h1>
```
Essa forma é adequada para a criação de componentes simples, que não necessariamente precisam (apesar de poderem) armazenar estados (dados) internamente. Quando um componente requer que um estado seja armazenado, é mais simples usar uma classe para defini-lo, pois algumas funcionalidades são fornecidas por uma superclasse. No caso, é necessário que a classe do nosso componente estenda de `React.Component` e defina o método `render()`.

```jsx
class Question extends React.Component {
  render() {
    return <h1>Enunciado da questão</h1>
  }
}
```

Vale salientar que podemos criar qualquer componente das duas formas (classe ou função). Em parte, é uma preferência do desenvolvedor trabalhar com orientação objeto ou não. Porém, se por um lado trabalhar com classe pode parecer mais verboso que com função, as propriedades que o componente de classe herda de `React.Component` facilitam algumas operações, como guardar dados (estado) do componente.

Apesar das duas formas de criação existirem, apresentaremos em geral a sintaxe de componentes de classe. Eventualmente, se necessário, abordaremos os componente de função.

### Aninhando componentes

Componentes podem ser compostos de elementos HTML e... de outros componentes. Uma aplicação é normalmente definida por um componente que engloba outros componentes menores, que por sua vez são compostos por outros e assim por diante.

No React, para criarmos esta estrutura hierárquica de componentes-pai e componentes-filhos 👨‍👧‍👦, basta utilizarmos um componente (filho) na definição dos elementos visuais de outro (pai). Por exemplo, um quiz possui várias questões, o que significa que podemos ter um componente *Quiz* composto pelo componente *Question*.

```jsx
import React from 'react'

class Question extends React.Component {
  render() {
    return <h1>Enunciado da questão</h1>
  }
}

class Quiz extends React.Component {
  render() {
    return (
      <div>
        <Question id="q1" />
        <Question id="q2" />
      </div>
    )
  }
}
```

Nesse exemplo, vemos que há duas tags `<Question>` no component *Quiz*, mostrando o reuso do mesmo componente. É importante perceber aqui que são duas instâncias diferentes do mesmo tipo de componente: `q1` e `q2`.

Nesse exemplo, *Quiz* e *Question* encontram-se no mesmo arquivo. Em geral, iremos separar os componentes, cada um em seu arquivo, para facilitar a organização do código da nossa aplicação. Então, sempre que formos utilizar um componente por outro, é necessário exportá-lo de um arquivo e importá-lo no outro.

**Question.js**
```jsx
import React from 'react'

class Question extends React.Component {
  render() {
    return <h1>Enunciado da questão</h1>
  }
}

export default Question
```

**Quiz.js**
```jsx
import React from 'react'
import Question from './Question'

class Quiz extends React.Component {
  render() {
    return (
      <div>
        <Question id="q1" />
        <Question id="q2" />
      </div>
    )
  }
}

export default Quiz
```

Mas um quiz não deveria apresentar duas questões ao mesmo tempo. O código acima serve apenas para mostrar o reuso de um componente. No nosso caso, faz mais sentido que apenas uma questão seja apresentada... portanto, que exista apenas uma instância da questão. O que vai mudar são os dados que serão passados para o componente *Question*.


### Passando dados para um componente

Nos códigos anteriores, o enunciado que o componente `Question` apresenta é estático. Na prática, é como se definíssemos uma função que retorna um valor constante (ex: *f => 5*). Funções mais ricas requerem parâmetros de entrada e retornam valores em função deles (ex: *f(x) => 2x + 4*). O mesmo ocorre com componentes. Componentes mais ricos retornam (ou renderizam) elementos visuais em função de seus parâmetros de entrada. Por exemplo, o enunciado da questão do quiz pode ser um parâmetro do componente.

Em React, chamamos esses parâmetros de **propriedades do componente**. Quem for usar o componente deve definir esses parâmetros como atributo da tag do componente. Os valores dos atributos são então passados para o componente através de uma propriedade chamada `props`. Por exemplo, se definirmos um enunciado usando: `<Question statement="Que ferramenta é essa?" />`, no componente *Question*, `this.props.statement` terá o valor "Que ferramenta é essa?".

Mas e agora? O que fazer com a informação passada? 🤔 Um dos usos mais comuns é alterar a renderização com esse dado. É nesse momento que as características do JSX brilham mais ✨. Podemos mesclar (interpolar) dados de objetos Javascript na linguagem de marcação JSX, como se fosse uma linguagem de template. **Qualquer expressão** entre `{ }` será considerada como expressão Javascript. Assim, podemos inserir o enunciado passado, como no código a seguir. No momento da renderização, `{ this.props.statement }` será substituído pelo valor de `this.props.statement` ("Que ferramenta é essa?").

**Question.js**
```jsx
import React from 'react'

export default class Question extends React.Component {
  render() {
    return <h1>{ this.props.statement }</h1>
  }
}
```

**Quiz.js**
```jsx
import React from 'react'

export default class Quiz extends React.Component {
  render() {
    return (
      <div>
        <Question statement="Que ferramenta é essa?" />
      </div>
    )
  }
}
```

É importante ressaltar que se quisermos substituir um valor de um atributo de um elemento HTML ou de outro componente, não devemos colocar os delimitadores de string (as aspas) 💣. Se deixarmos as aspas, o que estiver entre aspas será tratado como string e o valor não será substituído. Por exemplo, se o quiz for apresentar uma imagem cuja fonte é passada (ex: `<Quiz image="./imgs/qst.png" />`), podemos usar esse valor em um elemento `<img>` da seguinte forma: `<img src={ this.props.image }>`. Note que o atributo `src` não tem aspas para definir seu valor.

### Condicionais e listas

Em muitos casos iremos renderizar elementos em função dos dados passados para o componente. Por exemplo, a questão pode ser de múltipla escolha ou para o usuário digitar um texto. Se for de múltipla escolha, precisamos renderizar a quantidade de elementos correspondente ao número de opções passadas e assim vai.

A integração da sintaxe JSX com o Javascript cria uma grande flexibilidade para mesclarmos os elementos de uma linguagem declarativa (XML) com funcionalidades de uma linguagem de programação (JS). Isso facilita renderizar elementos em função de uma condição ou vários elementos em função de uma lista de dados.

Citei anteriormente que **qualquer expressão** entre `{ }` será considerada como expressão Javascript. Porém `if (...) ...` não é uma expressão! Não é possível atribuir, por exemplo, o "valor de retorno do `if`" a uma variável. Então como podemos fazer uma condicional?

Há algumas opções. A primeira é utilizar a ordem de avaliação de expressões com operadores lógicos. Javascript, como a maioria das linguagens de programação, implementa a estratégia de [avaliação de curto-circuito](https://pt.wikipedia.org/wiki/Avalia%C3%A7%C3%A3o_de_curto-circuito). Em resumo, se ao avaliar a expressão `a && b`, for verificado que `a` é falso, `b` não é nem testado, pois a expressão resultante será obrigatoriamente falsa. Ou seja, `b` só é processado se `a` for verdadeiro.

Podemos, então, tirar proveito disso para renderizar um elemento apenas quando uma expressão for verdadeira. Colocamos a expressão antes do elemento a ser renderizado. Por exemplo:
```jsx
  return <p>Tipo de questão: { this.props.type === 'choice' && <span>Múltipla escolha</span> } </p>
```

Outra forma é utilizar o operador ternário:
```jsx
  return <p>Tipo de questão: { this.props.type === 'choice' ? <span>Múltipla escolha</span> : <span>Texto</span> } </p>
```

Uma terceira opção é usarmos uma característica do JSX que você provavelmente já reparou: se, em uma função, podemos retornar elementos JSX, significa então que podemos tratar os elementos JSX como valores quaisquer e, portanto, armazená-los em uma variável! 🤯. Podemos, então, fazer todo o controle em Javascript.
```jsx
  let qst = <span>Texto</span>
  if (this.props.type === 'choice') {
    qst = <span>Múltipla escolha</span>
  }
  return <p>Tipo de questão: { qst } </p>
```

Podemos tratar as listas de forma similar, inserindo os elementos em um array e depois renderizando o array. Apesar de podermos fazer isso num *estilo imperativo*, normalmente seguimos mais um *estilo funcional*, pois trata-se de uma transformação de dados: de objetos Js a elementos JSX.

Para ficar mais claro, digamos que o componente *Question* recebe do Quiz um array de textos para apresentar como opções ao usuário. O que precisamos fazer é transformar o array de textos em array de `<button>` com o texto correspondente. Transformamos, então, usando o método `map()` dos arrays.
```jsx
const options = this.props.options.map(option => <button>{option}</button>)
```

Agora `options` é uma sequência de `<button>` que pode ser inserida onde for necessário.
```jsx
return <div>{options}</div>
```

Se você estiver testando esse código, vai perceber que vai aparecer um aviso no console informando que é preciso definir uma chave para os itens de uma lista. React precisa dessa informação, um identificador único, para garantir que a lista seja manipulada corretamente quando houve alteração nos seus elementos (com operações de inserção e remoção). A chave deve ser uma string única dentro dos elementos da lista, definida no atributo `key` de cada elemento. No caso abaixo, estamos supondo que os textos das opções a serem apresentadas ao usuário são diferentes.

```jsx
const options = this.props.options.map(option => (
  <button key={option}>{option}</button>
))
```

### Dados do componente (estado)

Quando definimos uma subclasse de `React.Component`, estamos herdando automaticamente um conjunto de funcionalidades úteis para os nossas classes-componentes. Entre elas, encontra-se um conjunto de comportamentos sobre a propriedade `state`. Esta propriedade é reservada para guardar o estado (dados internos) do componente.

Que "dados internos" são esses? 🤔 São todas as informações necessárias para renderizar o componente corretamente. Por exemplo, um quiz deve apresentar várias questões, mas apenas uma por vez. Então, ele pode ter como dado interno uma lista de questões e um índice indicando qual está sendo apresentada no momento. Futuramente, veremos como recuperar essa lista a partir de um dado externo (API). Por enquanto, vamos considerá-la como um dado local, armazenado no próprio componente.

O código abaixo ilustra como o estado do componente *Quiz* funciona. Ele é inicializado no construtor com duas informações: as questões e o índice da questão atual (a ser apresentada). Esse estado pode, então, ser acessado de outros pontos da classe. No código, o método `render()` acessa `state` para passar ao componente *Question* o enunciado e as opções da questão atual.

**Quiz.js**
```jsx
import React from 'react'
import Question from './question'

export default class Quiz extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      questions: [
        {
          statement: 'Questão 1',
          options: ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4']
        },
        {
          statement: 'Questão 2',
          options: ['Opção A', 'Opção B', 'Opção C', 'Opção D']
        },
      ],
      current: 0
    }
  }

  render() {
    return (
      <div>
        <Question
          statement={ this.state.questions[this.state.current].statement }
          options={ this.state.questions[this.state.current].options }
        />
      </div>
    )
  }
}
```

**Obs**: Neste código, o construtor substituiu o herdado de `React.Component`, que recebe como parâmetro o objeto `props`. Assim, é necessário repassar `props` para o construtor da superclasse (`super(props)`).

Uma das grandes vantagens de ferramentas como React, Vue, Angular, Svelte e tantas outras que surgiram nos últimos anos é a "mágica" 🔮 que elas fazem para a interface *reagir* às alterações de dados internos. Sempre que um dado é alterado, todos as partes da interface que dependem desse dado são atualizadas. Por isso, dizemos que são *frameworks ou bibliotecas reativas* (daí vem o nome React 😉).

Há, porém, uma particularidade a ser levada em conta para garantir que a interface renderizada corresponda exatamente aos dados do componente. Se alterarmos a propriedade `current` da forma convencional, por exemplo `this.state.current = 1`, **a questão apresentada ao usuário não será atualizada automaticamente**.

Por razões de eficiência, o React não mapeia todas as possíveis alterações do estado do componente, uma vez que a hierarquia de propriedades pode ser grande (objetos dentro de objetos, dentro de listas que possuem objetos com mais outras listas... 😱). Ao invés disso, o React considera que `state` deve ser um [objeto imutável](https://pt.wikipedia.org/wiki/Objeto_imut%C3%A1vel).

O que isso quer dizer? Quer dizer que não devemos alterar seus dados (Duuhhh!🤓)

Há vantagens em lidar com dados imutáveis, muitas delas relacionadas à [programação funcional](https://pt.wikipedia.org/wiki/Programa%C3%A7%C3%A3o_funcional). No caso do React, a principal vantagem é a possibilidade de facilmente detectar alterações nos dados, já que à princípio não podemos alterar suas propriedades. Mas se não podemos alterar como detectamos alterações??? 🤔

O que o detectamos são as mudanças nas referências para objetos. Por exemplo, ao invés do React mapear todas as possíveis mudanças na árvore de objetos de `state`, ele irá detectar alterações apenas na referência da propriedade `state` do componente. Ou seja, quando `this.state` apontar para outro objeto, é porque houve alteração em `state` 😎. Por trás disso tudo, há algoritmos otimizados para identificar os elementos do novo objeto `state` que diferem do antigo objeto `state` e apenas o que foi alterado nele será re-renderizado na interface (bem... na verdade, essa atualização não é imediata. As atualizações ocorrerão quando o React "achar adequado").

Para facilitar as alterações no `state`, React fornece o método `setState()`, herdado de `React.Component`. Se quisermos que o quiz apresente a próxima questão quando o usuário clicar em um botão, teremos que incrementar `this.state.current`, o que é feito com o código abaixo. Nele, consultamos o valor atual, adicionamos de 1 e atribuimos o resultado de volta ao estado.

```js
this.setState({
  current: this.state.current + 1
})
```

Perceba que passamos para `setState()` um objeto com apenas uma das propriedades da `state` original. Com esse objeto, será realizado um merge com o `state` original, gerando um novo `state` com as propriedades antigas e as alteradas. Ou seja, você deve passar para `setState()` um objeto contendo apenas as propriedades que você quer alterar. Considerando que o `current` do `state` original era 0, o novo `state` será:

```js
this.state = {
  questions: [
    { statement: 'Questão 1', options: ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4'] },
    { statement: 'Questão 2', options: ['Opção A', 'Opção B', 'Opção C', 'Opção D'] },
  ],
  current: 1
}
```

Você deve estar se perguntando: "e se eu quiser alterar, por exemplo, `state.questions[1].options[3]`?" 🤨. Bom, é fortemente desaconselhado utilizar hierarquias profundas de objetos. Mas se for inevitável, você terá que abrir sua caixa de ferramentas de programação funcional 🛠️ para fazer cópias de objetos e listas. Não iremos entrar em detalhe sobre isso no momento. Falaremos na 2ª unidade, quando abordaremos gerenciamento de estados de uma aplicação.

Por enquanto, para o nosso exemplo do quiz, as questões e suas respectivas opções são constantes. Não iremos alterá-las. O único elemento de mudança é a questão que está sendo apresentada, ou seja precisamos verificar alterações apenas no índice para a questão atual. Isso significa que podemos remover a propriedade `questions` de `state` e deixá-la como um atributo normal da class `Quiz`. O código ficaria então assim:

```js
import React from 'react'
import Question from './Question'

export default class Quiz extends React.Component {
  // atributos do componente cujas alterações não refletem automaticamente na interface
  questions = [
    {
      statement: 'Questão 1',
      options: ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4']
    },
    {
      statement: 'Questão 2',
      options: ['Opção A', 'Opção B', 'Opção C', 'Opção D']
    }
  ]

  constructor(props) {
    super(props)
    // estado do componente mapeado para as detecções e re-renderização da interface
    this.state = {
      current: 0
    }
  }

  render() {
    return (
      <div>
        <Question
          statement={ this.questions[this.state.current].statement }
          options={ this.questions[this.state.current].options }
        />
      </div>
    )
  }
}
```

No código acima, não mostramos o uso de `setState()` porque é necessário falar de outro aspecto dele. Da forma como o utilizamos, passamos um objeto cujo valor depende do valor atual de `state`. Para ficar mais claro, passamos o objeto `{ current: this.state.current + 1 }`. Porém, como mencionei anteriormente, a atualização não é imediata. Considere o `setState()` como uma **requisição**. O React, por razões de otimização, pode enfileirar chamadas de `setState()` e executá-las apenas quandos os elementos precisam ser renderizados.

Isso significa que eventos assíncronos que gerem chamadas para `setState()` podem consultar o `state` original ainda antes das mudanças. Por exemplo, imagine que o usuário da sua aplicação seja [Barry Allen](https://pt.wikipedia.org/wiki/Barry_Allen)⚡. Ele irá clicar no botão para ir para a próxima questão 10 vezes pensando que a 10ª questão será apresentada, mas quando a página renderiza... ele vê a 2ª questão 😞.

Por que isso acontece? Porque em todas as 10 chamadas `this.state.current` valia 0. Então, serão enfileiras 10 alterações com o objeto `{ current: 1 }` e, no final, `current` continuará apontando para a 2ª questão (índice 1).

Para evitar esses problemas de assincronicidade, React fornece uma segunda forma de utilizar `setState()`, passando uma função ao invés de um objeto. A função só será chamada no momento da atualização. Então, mesmo com a valocidade de Barry Allen, as atualizações seguem a velocidade do próprio React. Assim, as 10 chamadas de `setState()` serão enfileiradas e `this.state.current` vai sendo alterado à medida que as chamadas forem desenfileirando. No final, a 10ª questão será apresentada, conforme esperado 👍.

A regra de ouro é ✍️: **se a alteração do estado depender do próprio estado, então use uma função em `setState()`**. A função a ser passada deve receber dois parâmetros de entrada, `state` e `props` atualizados, e deve retornar uma nova versão de `state`. No nosso caso, a alteração não depende de `props` e, portanto, não é necessário inclui-lo na função. Ela ficaria assim:
```js
this.setState(state => ({
  current: state.current + 1
}))
```

A sintaxe apresentada usa função seta (*arrow function*), mas pode ser uma função anônima ou mesmo uma função normal.

Sumarizando todas as modificações até o momento, a nova versão do nosso componente *Quiz* ficaria da forma a seguir. Colocamos um método `next()` que será utilizado futuramente para atualizar `current`. Inserimos também uma condição para atualizar a questão atual apenas se ela for anterior à última. Quando a função passada para `setState()` retorna `null` ou `unndefined`, então nenhuma alteração no `state` é feita.

```js
import React from 'react'
import Question from './Question'

export default class Quiz extends React.Component {
  questions = [
    {
      statement: 'Questão 1',
      options: ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4']
    },
    {
      statement: 'Questão 2',
      options: ['Opção A', 'Opção B', 'Opção C', 'Opção D']
    }
  ]

  constructor(props) {
    super(props)
    this.state = {
      current: 0
    }
  }

  render() {
    return (
      <div>
        <Question
          statement={ this.questions[this.state.current].statement }
          options={ this.questions[this.state.current].options }
        />
      </div>
    )
  }

  next() {
    this.setState(state => {
      if (state.current < this.questions.length - 1) {
        return {
          current: state.current + 1
        }
      }
    })
  }
}
```

### Tratando eventos

Até o momento, nossos componentes *Quiz* e *Question* só fazem apresentar dados, mas uma caraterística das aplicações Web é a interatividade 🕹️. É necessário introduzir tratamento de eventos nos nossos componentes.

Em uma página HTML, os eventos são tratados através de atributos especiais, tais como `onclick`, `onmouseover` etc. React insere novos manipuladores de eventos bem semelhantes aos existentes, com as seguintes diferenças:
1. Os nomes dos eventos passam a ser camelCase. Por exemplo, ao invés de usarmos `onclick` utilizaremos `onClick`;
2. Os valores nos eventos passam a ser a referência a uma função (sem delimitadores de strings). Por exemplo, ao invés de termos `onclick="doSomething()"`, teremos `onClick={doSomeThing}` (sem os `( )` também, pois estamos passando a função e não o resultado da chamada da função!).

Com essas diferenças em mente, podemos definir manipuladores de eventos em React correspondentes a todos os eventos que um HTML simples pode tratar. Assim, podemos inserir um botão para o usuário ir para a próxima questão usando o método `next()` do componente.

```js
  render() {
    return (
      <div>
        <Question
          statement={ this.questions[this.state.current].statement }
          options={ this.questions[this.state.current].options }
        />
        <button onClick={e => this.next(e)}>Próxima questão</button>
      </div>
    )
  }
```

Perceba que a referência da função que passamos para `onClick` é uma função seta cuja a única coisa que faz é repassar o objeto gerado no evento (`e`) para `this.next()`... Se a única coisa que a função faz é repassar a chamada para `next()`, por que não passar diretamente a referência de `next()`, assim `<button onClick={this.next}>`? 🤔

Para responder essa questão, precisamos entrar um pouco mais nos detalhes e diferenças entre funções simples e métodos em Javascript.

Toda função Javascript possui implicitamente uma referência `this` que aponta para a própria função. Já nos métodos de uma classe, o `this` não referencia o próprio método, mas a instância da classe que está executando o método. Assim, se chamarmos o método como se fosse uma função, o `this` não vai apontar pra nada 😲.

Para esclarecer melhor, vou dar um exemplo. Considere o código abaixo.
```js
class Hello {
  name
  greet() {
    console.log(`Olá ${this.name}`)
  }
}

const eu = new Hello
eu.name = 'André'

const func = eu.greet

eu.greet()
func()
```

`func` guarda uma referência para o método `greet()` da instância `eu`. Aparentemente, `func()` e `eu.greet()` deveriam se comportar de forma similar... só que não 🤷🏻‍♂️. Ao executar o código, a chamada `eu.greet()` imprime `Hello André`, mas chamada `func()` dá erro porque o `this` é `undefined` e não há atributo `name` em `undefined`. Então, quando o usuário clicar no botão da tag `<button onClick={this.next}>`, a **função** (e não o método) `next()` será chamada sem a instância `this`.

Para consertarmos esse problema, precisamos alterar para `<button onClick={e => this.next(e)}>`. Nesse caso, o `next()` é chamado a partir da instância `this` que chamou o método `render()`... por isso funciona 💪.

Bom... essa abordagem é suficiente para a maioria dos casos, mas há um pequeno detalhe que pode ser problemático se o componente for instanciado ou renderizado muitas vezes (mas muitas vezes mesmo!!!!! 🥵) ou, de modo geral, se o desempenho da sua aplicação for uma preocupação real. O fato é que cada vez que seu componente for renderizado, uma nova função é criada (`() => this.next()`), o que pode ser desnecessário.

Um forma de contornar esse problema é redefinir os métodos chamados pelos eventos, associando o `this` à instância do componente. Essa alteração deve ser feita ainda no construtor do componente, através do método `bind()`, como ilustrado a seguir. Depois disso, podemos passar `this.next` no atributo do evento, que não haverá problema.

```js
  constructor(props) {
    // ...
    this.next = this.next.bind(this)
  }
```
Porém.... (sempre há um porém 😟), se for necessário passar outro parâmetro além do objeto gerado no evento, pode ser mais adequado usar função seta mesmo. Um exemplo em que isso ocorre é em laços que criam vários componentes que tratam eventos. Normalmente, um único mesmo método deve tratar os eventos dos vários componentes e, para distingui-los, precisamos passar seus identificador. Os botões com as opções do quiz, por exemplo, são criados a partir de uma lista. Se quisermos chamar um método passando por parâmetro o índice do botão clicado pelo usuário, teríamos que fazer algo como no código abaixo.

```js
import React from 'react'

export default class Question extends React.Component {

  select(id) {
    console.log(id)
  }

  render() {
    const options = this.props.options.map((option, index) => (
      <button key={option} onClick={() => this.select(index)}>
        {option}
      </button>
    ))

    return (
      <div>
        <h1>{this.props.statement}</h1>
        {options}
      </div>
    )
  }
}
```

Vimos como tratar um evento já existente, como o `onClick`. Mas seria interessante que o componente *Question* definisse seu próprio evento para que *Quiz* pudesse capturá-lo. Por exemplo, se tivermos o evento `onSelect` em *Question*, poderemos usar algo como `<Question statement={...} options={...} onSelect={setAnswer} />` no *Quiz*. Então... como definir eventos nos nossos componentes?

React não possui um mecanismo específico para definição de novos eventos. A passagem de dados para o componente-filho através de `props` já é flexível o suficiente para essa criação. Veja... O atributo `onSelect={setAnswer}` do exemplo dado está passando para *Question* a referência de uma função em *Quiz*, não é mesmo? Isso significa que essa função pode ser chamada em *Question* (filho) para atualizar os dados do *Quiz* (pai) 🤯.

Talvez fique mais fácil de entender através de um caso concreto. No exemplo abaixo, *Quiz* passa para *Question* a função `select()`, que deve ser chamada quando o evento `onSelection` ocorrer. Por sua vez, *Question* chama a função quando o usuário clica em um botão, passando como parâmetro o índice da opção selecionada. Esta é a forma do *Quiz* "capturar" o evento `onSelection` de *Question*.

**Question.js**
```js
import React from 'react'

export default class Question extends React.Component {
  render() {
    const options = this.props.options.map((option, index) => (
      <button key={option} onClick={() => this.props.onSelect(index)}>
        {option}
      </button>
    ))

    return (
      <div>
        <h1>{this.props.statement}</h1>
        {options}
      </div>
    )
  }
}
```

**Quiz.js**
```jsx
import React from 'react'
import Question from './Question'

export default class Quiz extends React.Component {
  questions = [ ... ]

  constructor(props) {
    super(props)
    this.state = {
      current: 0
    }
    this.select = this.select.bind(this)
    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)
  }

  render() {
    return (
      <div>
        <Question
          type="choice"
          statement={this.questions[this.state.current].statement}
          options={this.questions[this.state.current].options}
          onSelect={this.select}
        />
        <button onClick={this.prev}>Anterior</button>
        <button onClick={this.next}>Seguinte</button>
      </div>
    )
  }

  select(optionIndex) {
    console.log(optionIndex)
  }

  prev() {
    this.setState((state) => {
      if (state.current > 0) {
        return {
          current: state.current - 1
        }
      }
    })
  }

  next() {
    this.setState((state) => {
      if (state.current < this.questions.length - 1) {
        return {
          current: state.current + 1
        }
      }
    })
  }
}
```

### Adicionando estilo

Por fim, falta introduzirmos algumas folhas de estilo para melhorar o aspecto. React não fornece nenhum suporte explícito sobre estilização de componentes. Porém, se você criou seu projeto usando o template `create-react-app`, ele usa o [webpack](https://webpack.js.org/) para organizar todos as dependências da aplicações, entre elas as folhas de estilo. A configuração do projeto criado com `create-react-app` permite você pode importar folhas de estilo diretamente no arquivo `.js` do seu componente como se fosse um arquivo js (`import './styles.css'
`). O webpack irá incorporá-lo no arquivo final (*bundle*).

Vale salientar, entretanto, que quando você for utilizar as classes CSS nos elementos e componentes descritos em JSX, você deve substituir o atributo `class` por `className`. A razão disto é porque JSX é uma extensão do Javascript e `class` é uma palavra-chave em JS. O código abaixo ilustra esse caso.

```jsx
import React from 'react'
import './styles.css'

export default class Question extends React.Component {
  render() {
    // ...
    return (
      <div className="questionPanel">
        <h1>{this.props.statement}</h1>
        {options}
      </div>
    )
  }
}
```

### Resultado final

Com os conceitos apresentados aqui, o quiz em React foi construído usando os seguintes códigos:

**App.js**
```jsx
import React from 'react'
import Quiz from './Quiz'
import './index.css'

export default function App() {
  return (
    <div>
      <h1>React</h1>
      <Quiz />
    </div>
  )
}
```

**index.css**
```css
body {
  font-family: sans-serif;
}

.selected {
  font-weight: bold;
}

.questionPanel {
  background-color: azure;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.m5 {
  margin: 5px;
}

.resultPanel {
  background-color: beige;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.submitBtn {
  margin: 15px;
}
```

**Quiz.js**
```jsx
import React from 'react'
import Question from './Question'
import Results from './Results'

export default class Quiz extends React.Component {
  questions = [
    {
      statement: 'Qual das ferramentas a seguir foi criada pelo Facebook?',
      options: ['React', 'Vue', 'Angular', 'Svelte']
    },
    {
      statement:
        'Qual das ferramentas a seguir não é nem framework nem biblioteca, mas um compilador?',
      options: ['React', 'Vue', 'Angular', 'Svelte']
    },
    {
      statement: 'Qual das ferramentas a seguir é apoiada pelo Google?',
      options: ['React', 'Vue', 'Angular', 'Svelte']
    },
    {
      statement: 'Qual das ferramentas a seguir é usada no framework Nuxt.js?',
      options: ['React', 'Vue', 'Angular', 'Svelte']
    }
  ]

  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      answers: [],
      mode: 'questions'
    }
    this.select = this.select.bind(this)
    this.next = this.next.bind(this)
    this.reset = this.reset.bind(this)
  }

  render() {
    let panel, button
    if (this.state.mode === 'questions') {
      panel = (
        <div className="questionPanel">
          <p className="m5">
            Questão {this.state.current + 1} de {this.questions.length}
          </p>
          <Question
            statement={this.questions[this.state.current].statement}
            options={this.questions[this.state.current].options}
            selection={this.state.answers[this.state.current]}
            onSelect={this.select}
          />
        </div>
      )
      button = (
        <button className="submitBtn" onClick={this.next}>
          Confirma resposta
        </button>
      )
    } else {
      panel = (
        <div className="resultPanel">
          <Results questions={this.questions} answers={this.state.answers} />
        </div>
      )
      button = (
        <button className="submitBtn" onClick={this.reset}>
          Reinicia
        </button>
      )
    }

    return (
      <div>
        {panel}
        {button}
      </div>
    )
  }

  select(optionIndex) {
    this.setState((state) => {
      const answers = [...state.answers]
      answers[state.current] = optionIndex
      return { answers }
    })
  }

  next() {
    this.setState((state) => {
      return state.current < this.questions.length - 1
        ? { current: state.current + 1 }
        : { mode: 'results' }
    })
  }

  reset() {
    this.setState({
      current: 0,
      answers: [],
      mode: 'questions'
    })
  }
}
```

**Question.js**
```jsx
import React from 'react'

export default class Question extends React.Component {
  render() {
    const options = this.props.options.map((option, index) => (
      <button
        key={option}
        className={index === this.props.selection ? 'm5 selected' : 'm5'}
        onClick={() => this.props.onSelect(index)}
      >
        {option}
      </button>
    ))

    return (
      <div>
        <h1>{this.props.statement}</h1>
        {options}
      </div>
    )
  }
}
```

**Results.js**
```jsx
import React from 'react'

export default class Results extends React.Component {
  render() {
    const answers = this.props.questions.map((question, index) => (
      <p key={index.toString()}>
        <strong>Questão {index + 1}:</strong>
        <br />
        {this.props.questions[index].statement}
        <strong> {question.options[this.props.answers[index]]}</strong>
      </p>
    ))
    return (
      <div>
        <h2 className="m5">Escolhas</h2>
        {answers}
      </div>
    )
  }
}
```
