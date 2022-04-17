import "./Menu.css";

export default function Menu(props) {
    function handleNewGame() {
        props.resetGame();
    };

    return (
        <header className="header-menu">
            <button onClick={handleNewGame} className="new-game-btn">New Game</button>
        </header>
    )
};