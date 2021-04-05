

const Headline = ({ companyProfile }) => {
    return (

        <div className="profile bg-light">
            <h3>IPO - {companyProfile.ipo}</h3>
            <h4 style={{ margin: '10px 0px' }}>Industry - {companyProfile.finnhubIndustry}</h4>
            <h5>Exchange - {companyProfile.exchange}</h5>
            <img src={companyProfile.logo} alt='Company Logo' />
        </div>


    );
}

export default Headline;