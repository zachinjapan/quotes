import logo from "./logo.svg";
import "./App.css";
import ButtonPanel from "./Components/ButtonPanel";
import TextPanel from "./Components/TextPanel";

function App() {
  return (
    <div>
      <div className="title" />
      <h1> Test</h1>
      <div className="app">
        <ButtonPanel />
        <TextPanel />
      </div>
    </div>
  );
}

export default App;
