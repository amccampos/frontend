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
