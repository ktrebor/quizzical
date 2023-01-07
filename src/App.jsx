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
      setQuizData(formatData(data.results))
    }
    getQuizData()
  }, [])
  
  function formatData(questions) {
    let formatedData = questions.map(item => {
      return {
        id: nanoid(),
        question: item.question,
        correctAnswer: item.correct_answer,
        answers: shuffleAnswers([...item.incorrect_answers, item.correct_answer])
      }
    })
    return formatedData
  }

  function shuffleAnswers(answers) {
    let randomAnswers = [...answers].sort((a, b) => Math.random() - 0.5)
    let randomAnswerList = randomAnswers.map(item => {
      return {
        id: nanoid(5),
        isSelected: false,
        option: item
      }
    })
    return randomAnswerList
  }

  function holdAnswer(answerId, questionId) {
    setQuizData(prevQuizData => prevQuizData.map(item => {
        if (item.id === questionId) {
          let newAnswersArray = item.answers.map(element => {
            if (element.id === answerId) {
              return {
                ...element,
                isSelected: true,
              }
            } else {
              return {
                ...element,
                isSelected: false,
              }
            }
          })
          return {
            ...item,
            answers: newAnswersArray,
          }
        } else {
          return item
        }
      })
    )
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
            <Quiz 
              quizData={quizData}
              handleClick={holdAnswer}
            />
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