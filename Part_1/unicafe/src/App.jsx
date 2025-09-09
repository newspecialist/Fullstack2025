import { useState } from 'react'
const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({text, value}) => (
  <tbody>
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
  </tbody>
)

const Statistics = ({good, neutral, bad}) => {
  
  const total = good+neutral+bad
  const average = (good-bad)/(good+neutral+bad)
  const positive = ((good)/(good+neutral+bad))*100

  if(total != 0){
    return (
      
      
      <div>  
      
        <h1>statistics</h1>
        <table>
        <StatisticLine text ='good' value={good}/>
        <StatisticLine text ='neutral' value={neutral}/>
        <StatisticLine text ='bad' value={bad}/>
        <StatisticLine text ='all' value={total}/>
        <StatisticLine text ='average' value={average}/>
        <StatisticLine text ='positive' value={positive + " %"}/>
        </table>
      </div>  
    )
  }
  else{
    return (
    <div>
    <h1>statistics</h1>
    <p>No feedback given</p>  
    </div>
    )
  }  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good+1)    
  }

  const handleNeutralClick = () => {
    setNeutral(neutral+1)
  }

  const handleBadClick = () => {
    setBad(bad+1)
  }


  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App