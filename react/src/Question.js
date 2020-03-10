import React from 'react';

function Question(props) {
    const options = props.options.map(opt => {
        return <button key={opt} onClick= { () => props.onSelect(opt) }>{ opt }</button>
    })
    return <div>
        <h2>{ props.statement }</h2>
        { options }
    </div>
}

export default Question;