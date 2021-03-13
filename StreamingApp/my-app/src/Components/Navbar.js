import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {


    return (
        <nav className="nav-bar">
            <ul className="links">
                <li className="link"><Link to="/"><i className="fas fa-home"></i></Link></li>
                <li className="link"><Link to="/movies">Movies</Link></li>
                <li className="link"><Link to="/tv">TV</Link></li>
            </ul>
        </nav>
    )
}
