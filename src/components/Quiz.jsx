import React from "react"
import { nanoid } from 'nanoid'

function Quiz (props) {
    const styles = {
        backgroundColor: props.isSelected ? "#D6DBF5" : "white"
    }

    const allAnswers = props.answers.map(item => {
        

        return (
            <button 
                key={nanoid()}
                style={styles}
                onClick={event => props.selectAnswer(event)}
                value={item}
            >
                {item}
            </button>
        )
    })

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