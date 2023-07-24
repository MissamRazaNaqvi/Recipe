import { BrowserRouter as Router } from "react-router-dom";

import RecipieRoutes from "./recipie/RecipieRoutes";

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <RecipieRoutes />
      </Router>
    </div>
  );
}

export default App;
