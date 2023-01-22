import { Route, Switch} from 'react-router-dom';
import Detail from './views/Detail';
import Home from './views/Home';
import LandingPage from './views/LandingPage'
import CreateDog from './views/CreateDog';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/dogs' component={Home}/>
        <Route exact path='/dogs/:idRaza' component={Detail}/>
        <Route exact path='/createdogs' component={CreateDog}/>
        <Route path='*'>
          <div>404 not found</div>
        </Route>
      </Switch>
    </>
  );
}

export default App;
