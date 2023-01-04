import React from "react"

function Quiz (props) {    
    const allAnswers = props.answers.map(item => {

        const styles = {
            backgroundColor: item.isSelected ? "#D6DBF5" : "white"
        }

        return (
            <button 
                key={item.answerId}
                id={item.answerId}
                style={styles}
                onClick={() => props.handleClick(item.answerId)}
            >
                {item.options}
            </button>
        )
    })
    
    return (
        <div className="question-container">
            <h3 id={props.id} className="question-title">{props.question}</h3>
            <div className="question-answers">
                {allAnswers}
            </div>
        </div>
    )
}

export default Quiz