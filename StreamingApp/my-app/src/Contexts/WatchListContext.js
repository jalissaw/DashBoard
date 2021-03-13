import React, { useState, useContext } from 'react'


export const WatchListContext = React.createContext()

export function WatchListProvider({ children }) {
    const [watchList, setwatchList] = useState([])

    const handleClick = (title) => {

        const inArr = watchList.find(t => t === title)
        function addMinusSign() {
            if (inArr) return
            else {

                setwatchList([...watchList, title])
            }
        }

        function addPlusSign() {
            if (watchList) {
                const newArr = watchList.filter(t => t !== title)
                setwatchList(newArr)
            }

        }
        addPlusSign()
        addMinusSign()
    }

    const value = {
        watchList,
        setwatchList,
        handleClick,
    }


    return (
        <div>
            <WatchListContext.Provider value={value}>
                {children}
            </WatchListContext.Provider>

        </div>
    )
}
