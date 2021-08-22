import './App.css';
import {Login} from './components/Login'
import {Reports} from './components/Reports'
import {Chat} from './components/Chat'
import {Signup} from './components/Signup'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'

function App() {
  return (
    <Router>
      <Route exact path='/' render={props=>(
        <div className="App">
          <Login />
        </div>
      )} />
      <Route exact path = '/signup' component = {Signup} />
      <Route exact path = '/chat' component = {Chat} />
      <Route exact path = '/reports' component = {Reports} />
    </Router>
  );
}

export default App;
