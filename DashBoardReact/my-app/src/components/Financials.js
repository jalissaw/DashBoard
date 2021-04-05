


const Financials = ({ financials }) => {

    if (financials.data.length === 0) {

        return <div className='bg-light' style={{ marginTop: '10px', color: '#67748f' }}>There are no financials reported as of yet. Please, check back later</div>
    }
    else {
        return (
            <div className='financials'>
                <div className='financial-data'>
                    <div className='finance bg-light'>
                        <h2>{financials.data[0].report.bs[0].label}</h2>
                        <h3 style={{ color: financials.data[0].report.bs[0].value > 0 ? 'green' : 'red' }}>
                            ${financials.data[0].report.bs[0].value.toLocaleString()}
                        </h3>
                    </div>
                    <div className='finance bg-light'>
                        <h2>{financials.data[0].report.bs[11].label}</h2>
                        <h3 style={{ color: financials.data[0].report.bs[11].value > 0 ? 'green' : 'red' }}>
                            ${financials.data[0].report.bs[11].value.toLocaleString()}
                        </h3>
                    </div>
                    <div className='finance bg-light'>
                        <h2>{financials.data[0].report.bs[17].label}</h2>
                        <h3 style={{ color: financials.data[0].report.bs[17].value > 0 ? 'green' : 'red' }}>
                            ${financials.data[0].report.bs[17].value.toLocaleString()}
                        </h3>
                    </div>
                    <div className='finance bg-light'>
                        <h2>{financials.data[0].report.cf[0].label}</h2>
                        <h3 style={{ color: financials.data[0].report.cf[0].value > 0 ? 'green' : 'red' }}>
                            ${financials.data[0].report.cf[0].value.toLocaleString()}
                        </h3>
                    </div>
                    <div className='finance bg-light'>
                        <h2 >{financials.data[0].report.ic[0].label}</h2>
                        <h3 style={{ color: financials.data[0].report.ic[0].value > 0 ? 'green' : 'red' }}>
                            ${financials.data[0].report.ic[0].value.toLocaleString()}
                        </h3>
                    </div>
                    <div className='finance bg-light'>
                        <h2>{financials.data[0].report.ic[2].label}</h2>
                        <h3 style={{ color: financials.data[0].report.ic[2].value > 0 ? 'green' : 'red' }}>
                            ${financials.data[0].report.ic[2].value.toLocaleString()}
                        </h3>
                    </div>
                </div>
            </div>
        )
    }
}

export default Financials;