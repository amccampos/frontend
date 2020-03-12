import React from 'react';

function Results(props) {
    const answers = props.answers.map(a => <li key={a}>{ a }</li>)
    return <div>
         <h2>Results</h2>
         <ul>
             { answers }
         </ul>
    </div>
}

export default Results;