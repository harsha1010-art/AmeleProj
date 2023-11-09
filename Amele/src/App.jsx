
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import './App.css'
import { Courselist } from './assets/Courselist';
import { Coursedtls } from './assets/Coursedetails';
import { Dashboard } from './assets/Dashboard';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Courselist/>}/>
          <Route path=':id' element={<Coursedtls/>}/>
          <Route path='/dash' element={<Dashboard/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
