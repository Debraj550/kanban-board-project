import "./App.css";
import Board from "./components/board/Board";

import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div className="App">
      <div className="bg-white">
        <Navbar />
      </div>
      <Board />
    </div>
  );
}

export default App;
