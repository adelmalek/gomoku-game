import './App.css';
import Menu from "./Components/Menu/Menu";
import GameBoard from "./Components/GameBoard/GameBoard";

function App() {
  const resetGame = () => {
    alert("reset game")
  };

  return (
    <div className="App">
      <Menu resetGame={resetGame}/>
      <GameBoard/>
    </div>
  );
}

export default App;
