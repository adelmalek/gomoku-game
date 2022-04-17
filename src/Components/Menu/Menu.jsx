export default function Menu(props) {
    function handleNewGame() {
        props.resetGame();
    };

    return (
        <header className="header-menu">
            <button onClick={handleNewGame}>New Game</button>
        </header>
    )
};