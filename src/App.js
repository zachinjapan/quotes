import logo from "./logo.svg";
import "./App.css";
import ButtonPanel from "./Components/ButtonPanel";
import TextPanel from "./Components/TextPanel";

function App() {
  return (
    <div className="app">
      <h1 className="title"> Test</h1>
      <ButtonPanel />
      <TextPanel />
    </div>
  );
}

export default App;
