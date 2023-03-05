import { useState, useEffect } from "react";
import "./App.css";

/* Function to shuffle the array */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/* Main App */
function App() {
  const [grid, setGrid] = useState([
    [0, 3, 5, 1],
    [1, 2, 2, 4],
    [4, 3, 5, 0],
  ]);

  /* useEffect to shuffle the array */
  useEffect(() => {
    setGrid(shuffleArray(grid));
  }, []);

  /* useState to flip the cards */
  const [isFlipped, setIsFlipped] = useState(
    new Array(grid.length)
      .fill("")
      .map(() => new Array(grid[0].length).fill(false))
  );

  const [previousCard, setPreviousCard] = useState();

  /* Function to handle the card clicked */
  function handleCardClicked(rowIndex, colIndex) {
    if (isFlipped[rowIndex][colIndex]) {
      return;
    }

    const clickedNumber = grid[rowIndex][colIndex];
    const newIsFlipped = [...isFlipped];
    newIsFlipped[rowIndex][colIndex] = true;
    setIsFlipped(newIsFlipped);

    /* If the previous card is not undefined */
    if (previousCard) {
      const previousCardNumber = grid[previousCard.row][previousCard.col];

      /* If the previous card is not equal to the clicked card */
      if (previousCardNumber !== clickedNumber) {
        setTimeout(() => {
          newIsFlipped[rowIndex][colIndex] = false;
          newIsFlipped[previousCard.row][previousCard.col] = false;
          setIsFlipped([...newIsFlipped]);
        }, 1000 / 2);
      }
      setPreviousCard(undefined);
    } else {
      setPreviousCard({
        row: rowIndex,
        col: colIndex,
      });
    }
  }

  /* Function to handle the reset button */
  const handleReset = () => {
    shuffleArray(grid);
    setIsFlipped(
      new Array(grid.length)
        .fill("")
        .map(() => new Array(grid[0].length).fill(false))
    );
  };

  /* Return the JSX */
  return (
    <div className="App">
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((number, colIndex) => (
              <div
                onClick={() => handleCardClicked(rowIndex, colIndex)}
                key={colIndex}
                className={
                  "card " + (isFlipped[rowIndex][colIndex] ? "revealed" : "")
                }
              >
                {isFlipped[rowIndex][colIndex] ? number : " "}
              </div>
            ))}
          </div>
        ))}
      </div>
      {isFlipped.flat().every((card) => card === true) && (
        <div>
          <h1 className="win">You win!</h1>{" "}
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
    </div>
  );
}

/* Export the App */
export default App;
