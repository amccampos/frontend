import React from 'react';
import Results from './Results';
import Question from './Question';

class Quiz extends React.Component {
    questions = [
        {
            statement: 'Qual a cor do cavalo branco de Napoleão?',
            options: ['preto', 'branco', 'azul', 'verde']
        },
        {
            statement: 'Qual a cor do cavalo azul de Napoleão?',
            options: ['preto', 'branco', 'azul', 'verde']
        },
    ]

    constructor(props) {
        super(props)
        this.state = {
            showResults: false,
            currentQuestion: 0,
            answers: []
        }
    }

    next() {
        if (this.state.currentQuestion < this.questions.length - 1) {
            this.setState({
                currentQuestion: this.state.currentQuestion + 1
            })
        }
        else {
            this.setState({
                showResults: true
            })
        }
    }

    selected(answer) {
        this.state.answers.push(answer)
        this.setState({
            answers: this.state.answers
        })
    }

    render() {
        const results = this.state.showResults? <Results answers={ this.state.answers }></Results> : null;

        return (
            <div>
                <Question
                    statement={ this.questions[this.state.currentQuestion].statement }
                    options={ this.questions[this.state.currentQuestion].options }
                    onSelect={ opt => this.selected(opt) }
                ></Question>
                <button onClick={ () => this.next() }>Próximo</button>
                { results }
            </div>
        );
    }
}

export default Quiz;