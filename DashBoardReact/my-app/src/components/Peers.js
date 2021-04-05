import React from 'react'

const Peers = ({ peerData, symbol, handleSubmit, weekAgo, setSymbol }) => {

    let today = new Date().toISOString().slice(0, 10)

    const getUrls = (peerSymbol, today) => ([
        `https://finnhub.io/api/v1/company-news?symbol=${peerSymbol}&from=2021-03-01&to=${today}&token=budo2rv48v6spq9og4p0`,
        `https://finnhub.io/api/v1/stock/peers?symbol=${peerSymbol}&token=budo2rv48v6spq9og4p0`,
        `https://finnhub.io/api/v1/stock/profile2?symbol=${peerSymbol}&token=budo2rv48v6spq9og4p0`,
        `https://finnhub.io/api/v1/stock/financials-reported?symbol=${peerSymbol}&token=budo2rv48v6spq9og4p0`,
        `http://api.marketstack.com/v1/eod?access_key=72d118ca9db1873033447561590e2794&symbols=${peerSymbol}`,
        `http://api.marketstack.com/v1/eod?access_key=72d118ca9db1873033447561590e2794&symbols=${peerSymbol}&date_from=${weekAgo}&date_to=${today}`
    ]);


    return (
        <div className="peers bg-light">
            <h2>Peers</h2>
            <div className='peer'>
                {peerData.filter(peer => {
                    return peer !== symbol.toUpperCase();
                }).map(element => {
                    return <li
                        key={element}
                        onClick={(e) => {
                            setSymbol(element)
                            handleSubmit(e, getUrls(element, today))
                        }}>{element}</li>
                })}
            </div>
        </div>
    );
}

export default Peers;