import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Movies from './Components/Movies';
import TV from './Components/TV'
import { WatchListProvider } from './Contexts/WatchListContext';
import { SearchProvider } from './Contexts/SearchContext';
import Watchlist from './Components/Watchlist';
import { SearchInput } from './Components/SearchInput';
import { HashRouter as Router, Route, Switch } from "react-router-dom";



function App() {

  return (
    <Router>
      <div className="App">
        <WatchListProvider>
          <Navbar />
          <SearchProvider>
            <SearchInput />
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route exact path='/movies'>
                <Movies />
              </Route>
              <Route exact path='/tv'>
                <TV />
              </Route>
            </Switch>
          </SearchProvider>
          <Watchlist />
        </WatchListProvider>
      </div>
    </Router>
  );
}

export default App;
