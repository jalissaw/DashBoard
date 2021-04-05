

const Welcome = ({ symbol, companyProfile }) => {
    return (
        <div className="welcome">
            <div className='overview'>
                <span>Stock Overview</span>
                <h2>Stock Symbol - {symbol}</h2>
            </div>
            <div className='stock-name'>
                <h3 className='name'>{companyProfile.name}</h3>
            </div>
        </div>

    );
}

export default Welcome;