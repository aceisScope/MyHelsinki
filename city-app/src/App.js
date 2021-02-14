import logo from './logo.svg';
import { BrowserRouter as Router } from "react-router-dom";
import Navibar from './component/Navibar';
import Places from './component/Places';
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
