import React from "react"
import { nanoid } from 'nanoid'

function Quiz (props) {
    const incorrectAnswers = props.incorrectAnswers.map(item => {
        return (
            <button 
                key={nanoid()}
            >
                {item}
            </button>
        )  
    })

    const correctAnswer = <button key={nanoid()}>{props.correctAnswer}</button>
        
    incorrectAnswers.push(correctAnswer)
    const allAnswers = incorrectAnswers.sort((a, b) => 0.5 - Math.random());

    return (
        <div className="question-container">
            <h3 className="question-title">{props.question}</h3>
            <div className="question-answers">
                {allAnswers}
            </div>
        </div>
    )
}

export default Quiz