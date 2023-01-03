import React from "react"

function Start (props) {

    return (
        <div className="start-container">
            <h1 className="start-title">Quizzical</h1>
            <p className="start-description" >Bla bla bla</p>
            <button onClick={props.handleClick} className="start-button">Start quiz</button>
        </div>
    )
}

export default Start