import React, { useState, useContext } from 'react';
import { SearchContext } from '../Contexts/SearchContext'

import { useLocation } from 'react-router-dom';


export const SearchInput = () => {
    let location = useLocation();


    const { searchInput, setSearchInput } = useContext(SearchContext)
    const [showBar, setShowBar] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <i className="fas fa-search" style={{ display: location.pathname === '/' ? 'none' : 'block' }} onClick={() => setShowBar(prevState => !prevState)}></i>
                <input type='text'
                    className='search-input'
                    name='search-movies'
                    value={searchInput}
                    placeholder='Search...'
                    style={{ width: showBar ? '175px' : '0px' }}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </form>
        </div>
    )
}
