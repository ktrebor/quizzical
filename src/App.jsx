import Start from './components/Start'
import Quiz from './components/Quiz'
import './App.css'
import React from "react"
import { nanoid } from 'nanoid'

function App() {
  const [quiz, setQuiz] = React.useState(false)
  const [quizData, setQuizData] = React.useState([])

  function shuffleTransformAnswers(answers) {
    answers.sort((a, b) => 0.5 - Math.random())   
    const newAnswerArray = []
    answers.forEach(item => {
      newAnswerArray.push({
        id: nanoid(),
        options: item,
        isSelected: false
      })
    })
    return newAnswerArray
  }

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

  const quizElements = quizData.map(item => {
    const questionId = item.answers.map(item => item.id)
    
    return ( 
      <Quiz 
        key={item.id}
        id={item.id}
        question={item.question}
        answers={item.answers}
        isSelected={item.answers.map(element => {element.isSelected})}
        correctAnswer={item.correctAnswer}
        holdAnswer={() => holdAnswer(item.id, questionId)}
      />
    )
  })

  function holdAnswer(id, questionId) {
    const found = questionId.find(element => element === element.id)
    
    setQuizData(prevQuizData => prevQuizData.map(item => {
      
      return item.id === id ?
        {...item,
          answers: item.answers.map((element) => 
            element.id === found ?
            {...element, isSelected: !element.isSelected} :
            element
          )
        } :
        {...item}
    }))
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