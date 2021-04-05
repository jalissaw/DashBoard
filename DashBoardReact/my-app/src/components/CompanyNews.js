


const CompanyNews = ({ companyNews }) => {

    const newData = companyNews.slice(0, 5)

    if (companyNews.length === 0) {
        return <div className='bg-light company-news'><h2>No New News To Report</h2></div>
    } else {
        return (
            <div className='news-container'>
                {newData.map(news => {
                    return (
                        <div key={news.id} className='company-news bg-light' >
                            <img src={news.image} width={'200px'} height={'200px'} alt='News Imagery' />
                            <h2>{news.headline}</h2>
                            <p>Summary - {news.summary}</p>
                            <h3>Source - {news.source}</h3>
                        </div>
                    )
                })
                }
            </div>
        );
    }

}

export default CompanyNews;