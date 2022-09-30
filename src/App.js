import { BrowserRouter as Router } from "react-router-dom";
import RouterURL from "./routerURL";
import './App.css';

function App() {
  return (
    <Router>
      <div className="pokedex-app">
        <RouterURL />
      </div>
    </Router>
  );
}

export default App;