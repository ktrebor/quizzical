import React from "react"

function Quiz (props) {    
    let allAnswers = props.quizData.map(item => {

        return (
            <div className="question-container">
                <h3 key={item.id} id={item.id} className="question-title">{item.question}</h3>
                <div className="question-answers">
                    {item.answers.map(element => {

                        const styles = {
                            backgroundColor: element.isSelected ? "#D6DBF5" : "white"
                        }

                        return (
                            <button 
                                id={element.id}
                                key={element.id}
                                style={styles}
                                onClick={() => props.handleClick(element.id, item.id)}
                            >
                                {element.option}
                            </button>
                        )
                    })}
                </div>
            </div>
        )
    })

    return allAnswers
}

export default Quiz