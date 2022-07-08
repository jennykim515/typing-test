import { Link } from "react-router-dom";
import '../style/Navbar.css'
const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Typing Test</Link></li>
                <li><Link to="/ranks">Leaderboard</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;