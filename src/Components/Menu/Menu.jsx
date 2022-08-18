import "./Menu.css";

export default function Menu({reset}) {
    return (
        <header className="header-menu">
            <button onClick={reset} className="new-game-btn">New Game</button>
        </header>
    )
};