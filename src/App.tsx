import {Board} from "./layout/sections/main/Board.tsx";
import {Header} from "./layout/header/Header.tsx";

function App() {

    return (
        <>
            <Header />
            <Board title={"Первая доска задач"} />
        </>
    )
}

export default App
