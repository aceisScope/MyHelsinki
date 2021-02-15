import { BrowserRouter as Router } from "react-router-dom";
import Navibar from './components/Navibar';
import Places from './components/Places';
import './App.css';

function App() {
  return (
    <Router>
      <Navibar/>
      <Places/>
    </Router>
  );
}

export default App;
