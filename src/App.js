import './style/App.css';
import Test from './components/Test';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element= {<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
