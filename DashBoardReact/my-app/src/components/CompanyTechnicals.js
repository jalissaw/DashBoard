const CompanyTechnicals = ({ companyTechnicals }) => {

    const changeInPer = (companyTechnicals.data[0].close - companyTechnicals.data[1].close)
    const changeInVol = (companyTechnicals.data[0].volume - companyTechnicals.data[1].volume)

    return (

        <div className='company-tech'>
            <h3 className='bg-light'> <span>Open</span> {companyTechnicals.data[0].open}</h3>
            <h3 className='bg-light'
                style={{ color: 'green' }}><span>High</span> {companyTechnicals.data[0].high}
            </h3>
            <h3 className='bg-light'
                style={{ color: companyTechnicals.data[0].close < companyTechnicals.data[0].open ? 'red' : 'green' }} >
                <span>Close</span>
                {companyTechnicals.data[0].close}
                <span className='change' style={{ color: changeInPer >= 0 ? 'green' : 'red' }}>
                    {changeInPer.toFixed(2)}%
                </span>
            </h3>
            <h3 className='bg-light'
                style={{ color: 'red' }}>
                <span>Low</span> {companyTechnicals.data[0].low}
            </h3>
            <h3 className='bg-light'>
                <span>Volume</span> {companyTechnicals.data[0].volume.toLocaleString()}
                <span className='change' style={{ color: changeInVol > 0 ? 'green' : 'red' }}>
                    {changeInVol.toLocaleString()}
                </span>
            </h3 >
        </div >
    );
}

export default CompanyTechnicals;