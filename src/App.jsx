import Start from './components/Start'
import Quiz from './components/Quiz'
import './App.css'
import React from "react"
import { nanoid } from 'nanoid'

function App() {
  const [quiz, setQuiz] = React.useState(false)
  const [quizData, setQuizData] = React.useState([])
  const [allChecked, setAllChecked] = React.useState(false)
  const [score, setScore] = React.useState(0)
  
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
              return {...element, isSelected: true}
            } else {
              return {...element, isSelected: false}
            }
          })
          return {...item, answers: newAnswersArray}
        } else {
          return item
        }
      }) 
    )
  }

  function checkAnswers() {
    setScore(0)
    setQuizData(prevQuizData => prevQuizData.map(item => {
        let checkedAnswers = item.answers.map(element => {
          if (element.isSelected && item.correctAnswer === element.option) {
            setScore(prevScore => prevScore + 1)
            return {
              ...element,
              isUserCorrect: true
            }
          } else if (element.isSelected && item.correctAnswer !== element.option) {
            return {
              ...element,
              isUserWrong: true
            }
          } else if (!element.isSelected && item.correctAnswer === element.option) {
            return {
              ...element,
              isUserCorrect: true
            }
          } else {
            return {
              ...element,
              isFaded: true
            }
          }
        })
        return {
          ...item,
          answers: checkedAnswers
        }
      })
    )
    setAllChecked(true)
  }

  function startQuiz() {
    setQuiz(prevQuiz => !prevQuiz)
  }

  function playAnotherGame() {
    //am ramas aici
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
            { 
            !allChecked ?
            <div className='quiz-results'>
              <button 
                className="check-button" 
                onClick={checkAnswers}>Check answers
              </button>
            </div> 
            :
            <div>
              <p className="start-description">You scored {score}/5 correct answers</p>
              <button onClick={playAnotherGame}>Play Again</button>
            </div>
            }

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