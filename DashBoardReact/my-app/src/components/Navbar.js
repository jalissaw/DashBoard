import React, { useState, useEffect } from 'react';

const Navbar = ({ handleSubmit, handleChange, urls }) => {

    const [displayNot, setDisplayNot] = useState(false);
    const [greeting, setGreeting] = useState([])




    const displayNotifications = () => {
        setDisplayNot(prevState => !prevState);
        setGreeting([])
    }


    useEffect(() => {
        const timer = setTimeout(() => {
            setGreeting(['Welcome to Delta']);
        }, 15000);

        return () => clearTimeout(timer);
    }, []);

    return (

        <nav className="nav">
            <div className='nav-info'>
                <span className='logo'>Delta</span>
            </div>
            <div className='search-container'>
                <form onSubmit={(e) => handleSubmit(e, urls)} className='form'>
                    <input type='text'
                        aria-label='Search Input'
                        placeholder='Please Enter Symbol. Ex, Twtr'
                        name='search'
                        onChange={handleChange}
                        className='search-field' />
                    <button className='button'><i className="fas fa-search"></i></button>
                </form>
            </div>
            <div className='notification'>
                <div className="alert">
                    <i onClick={displayNotifications} className="far fa-bell"></i>
                    <div className="circle">{greeting.length}</div>
                </div>
                {greeting.length >= 1 ?
                    <div style={{ display: displayNot ? 'none' : 'block' }} className="notifications">{greeting}</div> :
                    <div style={{ display: !displayNot ? 'none' : 'block' }} className="notifications">No New Notifications</div>
                }
            </div>
        </nav>
    );
}

export default Navbar;