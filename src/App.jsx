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
          answers: shuffleTransformAnswers([...item.incorrect_answers, item.correct_answer]),
          correctAnswer: item.correct_answer
        })
      })
      setQuizData(myQuizData)
    }
    getQuizData()
  }, [])

  function shuffleTransformAnswers(answers) {
    answers.sort((a, b) => 0.5 - Math.random())   
    const newAnswerArray = []
    answers.forEach(item => {
      newAnswerArray.push({
        answerId: nanoid(),
        options: item,
        isSelected: false
      })
    })
    return newAnswerArray
  }

  const quizElements = quizData.map(item => {

    return ( 
      <Quiz 
        key={item.id}
        {...item}
        handleClick={holdAnswer}
      />
    )
  })

  

  function holdAnswer(answerId) {
  
    quizData.map(item => {
      item.answers.map(element => {
        if (answerId === element.answerId) {
          console.log("this far")
        } else {
          console.log("noo")
        }  
      })
    })

  }

  function startQuiz() {
    setQuiz(prevQuiz => !prevQuiz)
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