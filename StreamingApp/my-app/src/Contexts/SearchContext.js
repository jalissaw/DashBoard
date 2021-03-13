import React, { useState, useEffect } from 'react'


export const SearchContext = React.createContext()

export function SearchProvider({ children }) {
    const [searchInput, setSearchInput] = useState('');


    const value = {
        searchInput,
        setSearchInput
    }

    return (
        <div>

            <SearchContext.Provider value={value}>
                {children}
            </SearchContext.Provider>
        </div>
    )
}
