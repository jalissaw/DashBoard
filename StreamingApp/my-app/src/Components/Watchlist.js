import React, { useContext } from 'react';
import { WatchListContext } from '../Contexts/WatchListContext';

function Watchlist() {

    const { watchList } = useContext(WatchListContext)

    return (
        <div className="watchlist-container">
            <div className="watchlist">
                {watchList.length >= 1 ? <strong style={{ fontSize: '1.4rem' }}> WATCHLIST:</strong> : ''}
                {
                    watchList.map(list => {
                        return <span className="watchlist-item" key={list}> {list}</span>
                    })
                }
            </div>
        </div>
    )
}

export default Watchlist
