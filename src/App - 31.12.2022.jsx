import Start from './components/Start'
import Quiz from './components/Quiz'
import './App.css'
import React from "react"
import { nanoid } from 'nanoid'

function App() {
  const [quiz, setQuiz] = React.useState(false)
  const [quizData, setQuizData] = React.useState([])

  React.useEffect(() => {
    async function getQuizData() {
      const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      const data = await res.json()
      
      let myQuizData = []
      data.results.forEach(item => {
        myQuizData.push({
          id: nanoid(),
          question: item.question,
          isSelected: false
        })
      })
      setQuizData(data.results)
    }
    getQuizData()
  }, [])

  const quizElements = quizData.map(item => {
    
    return ( 
      <Quiz 
        key={nanoid()}
        question={item.question}
        incorrectAnswers={item.incorrect_answers}
        correctAnswer={item.correct_answer}
        handleClick={holdButton}
         
      />
    )
  })
  
  function startQuiz() {
    setQuiz(prevQuiz => !prevQuiz)
  }

  function holdButton() {
    
    console.log(quizData)
  }

  return (
    <main>
        { 
          quiz 
        ? 
        <div className='quiz-container'>
          {quizElements}
        </div> 
        :
          <Start 
            handleClick={startQuiz} 
          /> 
        }
    </main>
  )
}

export default App
