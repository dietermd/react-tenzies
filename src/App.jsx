import { useEffect, useState } from 'react'
import Die from './components/Die'
import Confetti from 'react-confetti'


export default function App() {

  const [dice, setDice] = useState(allNewDice())

  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    
    const firstDieValue = dice[0].value
    const playerWon = dice.every(die => die.isHeld && die.value === firstDieValue)
    if (playerWon) {
      setTenzies(true)
    }
  }, [dice])

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
    if (tenzies) {
      setTenzies(false)
      setDice(allNewDice())
      return
    }

    setDice(prevDice => prevDice.map(die => 
        die.isHeld ? die : generateNewDie()
    ))
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
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {dieElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
    </main>
  )
}
