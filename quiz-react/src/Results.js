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
