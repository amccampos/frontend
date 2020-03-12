import React, { useState } from 'react'
import './question.css'

function Question(props) {
    const [selection, setSeletion] = useState('')
    
    function click(opt) {
        props.onSelect(opt)
        setSeletion(opt)
    }

    const options = props.options.map(opt => {
        return <button
            key={opt}
            className = { selection === opt ? 'selected' : null }
            onClick= { () => click(opt) }
        >{ opt }</button>
    })
    return <div>
        <h2>{ props.statement }</h2>
        { options }
    </div>
}

export default Question;