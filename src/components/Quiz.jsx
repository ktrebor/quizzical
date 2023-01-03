import React from "react"

function Quiz (props) {
    const allAnswers = props.answers.map(item => {
        const styles = {
            backgroundColor: item.isSelected ? "#D6DBF5" : "white"
        }

        return (
            <button 
                key={item.id}
                id={item.id}
                style={styles}
                onClick={() => props.holdAnswer(props.questionId)}
                value={item.options}
            >
                {item.options}
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