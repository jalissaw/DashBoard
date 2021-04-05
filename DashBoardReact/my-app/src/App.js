import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Navbar from './components/Navbar';
import Headline from './components/Headline';
import CompanyNews from './components/CompanyNews';
import CompanyTechnicals from './components/CompanyTechnicals';
import Welcome from './components/Welcome';
import Peers from './components/Peers';
import Financials from './components/Financials';
import SidebarNav from './components/SidebarNav';
import ChartBar from './components/ChartBar';
import Loader from 'react-loader-spinner'
import { useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';




function App() {

  const [symbol, setSymbol] = useState('');
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isErr, setIsErr] = useState(null)
  let today = new Date().toISOString().slice(0, 10);
  let weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);


  let urls = [
    `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=2021-03-01&to=${today}&token=${process.env.REACT_APP_API_FINN_KEY}`,
    `https://finnhub.io/api/v1/stock/peers?symbol=${symbol}&token=${process.env.REACT_APP_API_FINN_KEY}`,
    `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${process.env.REACT_APP_API_FINN_KEY}`,
    `https://finnhub.io/api/v1/stock/financials-reported?symbol=${symbol}&token=${process.env.REACT_APP_API_FINN_KEY}`,
    `http://api.marketstack.com/v1/eod?access_key=${process.env.REACT_APP_API_MARKET_KEY}&symbols=${symbol}`,
    `http://api.marketstack.com/v1/eod?access_key=${process.env.REACT_APP_API_MARKET_KEY}&symbols=${symbol}&date_from=${weekAgo}&date_to=${today}`
  ]

  const handleChange = (e) => {
    setSymbol(e.target.value);

  }

  const handleSubmit = (e, urls) => {
    setLoading(true)
    e.preventDefault();

    let requests = urls.map(url => fetch(url, {
      type: "GET",
      dataType: 'json',
    }))
    Promise.all(requests)
      .then(res => {
        const responseOK = res.map(r => r.ok);
        const responseStatusText = res.map(text => text.statusText)

        if (responseStatusText.includes("Unprocessable Entity")) {
          throw Error('The symbol entered can not be found, please try again');
        }
        if (!responseOK) {
          throw Error('The resource can not be displayed at this time');
        }
        return Promise.all(res.map(res => res.json()));
      }).then(data => {
        setIsErr(null)
        setData(data)
        setLoading(false)
      }).catch(err => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted')
        } else {
          setLoading(false)
          setIsErr(err.message)
        }
        setIsErr(err.message)
      })
  }

  return (
    <Router>
      <div className="App">
        {
          <Navbar
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            urls={urls}
          />}
        <div className='information'>

          {data && <SidebarNav />}
          <div className='grid-container'>

            {data && <Welcome symbol={symbol} companyProfile={data[2]} />}
            {loading && <Loader
              type="Puff"
              color="#3e41cc"
              height={100}
              width={100}
              timeout={2000}
            />}
            {isErr && <div style={{ color: '#a3a3f0' }}>{isErr}</div>}
            <Switch>
              <Route exact path='/'>
                {data && <CompanyTechnicals companyTechnicals={data[4]} />}
                <div className='data'>
                  {data &&
                    <ChartBar
                      data={data[5]}
                      symbol={symbol}
                      peerData={data[1]}
                      weekAgo={weekAgo}
                      today={today} />}
                  {data &&
                    <Peers
                      handleSubmit={handleSubmit}
                      setSymbol={setSymbol}
                      peerData={data[1]}
                      weekAgo={weekAgo}
                      symbol={symbol} />}
                </div>
              </Route>
              <Route exact path='/profile'>
                {data && <Headline companyProfile={data[2]} />}
              </Route>
              <Route exact path='/financials'>
                {data && <Financials financials={data[3]} />}
              </Route>
              <Route exact path='/news'>
                {data && <CompanyNews companyNews={data[0]} />}
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
