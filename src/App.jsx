import Start from './components/Start'
import Quiz from './components/Quiz'
import './App.css'
import React from "react"
import { nanoid } from 'nanoid'

function App() {
  const [quiz, setQuiz] = React.useState(false)
  const [quizData, setQuizData] = React.useState([])

  const shuffleAnswers = (answers) => answers.sort((a, b) => 0.5 - Math.random())

  React.useEffect(() => {
    async function getQuizData() {
      const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      const data = await res.json()
      
      let myQuizData = []
      data.results.forEach(item => {
        myQuizData.push({
          id: nanoid(),
          question: item.question,
          isSelected: false,
          answers: shuffleAnswers([...item.incorrect_answers, item.correct_answer]),
          correctAnswer: item.correct_answer 
        })
      })
      setQuizData(myQuizData)
    }
    getQuizData()
  }, [])

  const quizElements = quizData.map(item => {

    return ( 
      <Quiz 
        key={item.id}
        id={item.id}
        question={item.question}
        answers={item.answers}
        correctAnswer={item.correct_answer}
        isSelected={item.isSelected}
        selectAnswer={() => selectAnswer(event, item.answers, item.id)}
      />
    )
  })

  function selectAnswer(event, answers, id) {
    console.log(id)
    console.log(event.target.value)
    for (let i = 0; i < answers.length; i++) {
      console.log(answers[i])
    }
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