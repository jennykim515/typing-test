import './style/App.css';
import Test from './components/Test';
import Ranks from './components/Ranks';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/ranks" element={<Ranks />} />
        <Route path="/" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
