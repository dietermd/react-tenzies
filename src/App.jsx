import { useState } from 'react'
import Die from './components/Die'


export default function App() {

  const [dice, setDice] = useState(allNewDice())

  function generateNewDie() {
    return { value: Math.ceil(Math.random() * 6), isHeld: false }
  }

  function allNewDice() {
    const newDice = []
      for (let i = 0; i < 10; i++) {
        newDice.push(generateNewDie())
      }
      return newDice
  }

  function rollDice() {
    setDice(prevDice => prevDice.map(die => 
        die.isHeld ? die : generateNewDie()
      )
    )
  }

  function holdDie(index) {
    setDice(prevDice => {
      prevDice[index].isHeld = true
      return [...prevDice]
    })
  }

  const dieElements = dice.map((die, i) => 
    <Die value={die.value} isHeld={die.isHeld} holdDie={() => holdDie(i)} key={i} />
  )

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {dieElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>Roll</button>
    </main>
  )
}
