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
    showResults = false

    constructor(props) {
        super(props)
    }

    render() {
        const results = this.showResults? <Results></Results> : null;

        return (
            <div>
                <Question
                    statement={ this.questions[0].statement }
                    options={ this.questions[0].options }
                    onSelect={ opt => alert(opt) }
                ></Question>
                { results }
            </div>
        );
    }
}

export default Quiz;