import { useState } from 'react'
import './App.css'

function App() {
  const [grid, setGrid] = useState([
    [0, 3, 5, 1],
    [1, 2, 2, 4],
    [4, 3, 5, 0],
  ]);

  const [isFlipped, setIsFlipped] = useState(
    new Array(grid.length)
    .fill('')
    .map(() => new Array(grid[0].length).fill(false))
  );

  const [previousCard, setPreviousCard] = useState();

  function handleCardClicked(rowIndex, colIndex) {
    if (isFlipped[rowIndex][colIndex]) {
      return;
    }

    const clickedNumber = grid[rowIndex][colIndex];
    const newIsFlipped = [...isFlipped];
    newIsFlipped[rowIndex][colIndex] = true;
    setIsFlipped(newIsFlipped);

    if (previousCard) {
      const previousCardNumber = grid[previousCard.row][previousCard.col];

      if (previousCardNumber !== clickedNumber) {
        setTimeout(() => {
          newIsFlipped[rowIndex][colIndex] = false;
          newIsFlipped[previousCard.row][previousCard.col] = false;
          setIsFlipped([...newIsFlipped]);
        }, 1000/2)
      } else {
        const win = isFlipped.flat().every((card) => card === true);
        if (win) {
          setTimeout(() => {
          alert('You win!');
          }, 1000/5)
        }        
      }
      setPreviousCard(undefined);
    } else {
      setPreviousCard({
        row: rowIndex,
        col: colIndex,
      });
    }
  }

  return (
    <div className="App">
      <div className="grid">
      {grid.map((row, rowIndex) => (
         <div key={rowIndex} className="row">
          {row.map((number, colIndex) => (
            <div 
            onClick={() => handleCardClicked(rowIndex, colIndex)}
            key={colIndex} className={"card " + (isFlipped[rowIndex][colIndex] ? "revealed" : "")}>
              {isFlipped[rowIndex][colIndex] ? number : ' '}
              </div>
          ))}
        </div>
      ))}
      </div>
    </div>
  )
}

export default App
