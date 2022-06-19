import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {
    return(
        <nav className="navbar navbar-expand-lg">    
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/users">Login</Link>
            </li>
            </ul>
        </nav>
    )
}