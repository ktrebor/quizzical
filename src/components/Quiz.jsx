import React from "react"
import { decode } from "html-entities"

function Quiz (props) {  
    let allAnswers = props.quizData.map(item => {

        return (
            <div className="question-container">
                <h3 key={item.id} id={item.id} className="question-title">{decode(item.question)}</h3>
                <div className="question-answers">
                    {item.answers.map(element => {

                        let styles = {}
                        if (element.isUserWrong) {
                            styles = {
                                backgroundColor: "#F8BCBC",
                                border: "none",
                                opacity: 0.5,
                            }
                        } else if (element.isUserCorrect){
                            styles = {
                                backgroundColor: "#94D7A2",
                                border: "none",
                            }
                        } else if (element.isFaded) {
                            styles = {
                                opacity: 0.5
                            }
                        } else {
                            styles = {
                                backgroundColor: element.isSelected ? "#D6DBF5" : "#f5f7fb"
                            }
                        }

                        return (
                            <button 
                                id={element.id}
                                key={element.id}
                                style={styles}
                                onClick={() => props.handleClick(element.id, item.id)}
                            >
                                {decode(element.option)}
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