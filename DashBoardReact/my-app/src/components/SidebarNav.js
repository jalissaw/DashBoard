import { Link } from 'react-router-dom'

const SidebarNav = () => {


    return (
        <nav className="sidebar">
            <ul>
                <li><Link to='/'>dashboard</Link></li>
                <li><Link to='/profile'>profile</Link></li>
                <li><Link to='/financials'>financials</Link></li>
                <li><Link to='/news'>news</Link></li>
            </ul>
        </nav>
    );
}

export default SidebarNav;