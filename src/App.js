import './App.css';
import {Route} from 'wouter'
import Menu from './components/menu';
import CrearUsuario from './components/createuser';
function App() {
  return(
    <div className='App'>
      <Route path='/' component={CrearUsuario}/>
      <Route path='/menu' component={Menu}/>
    </div>
  )
}

export default App;
