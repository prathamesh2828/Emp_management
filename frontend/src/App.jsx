import {BrowserRouter,Navigate,Route,Routes} from 'react-router-dom' 
import './App.css'
import EmpMngApp from './components/EmpMngApp'
import EmpDetails from './components/EmpDetails'

function App() {


  return (
    <>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<Navigate to ="employee"/>} />
              <Route path='/employee' element={<EmpMngApp/>} />
              <Route path='/employee/:id' element={<EmpDetails/>} />


            </Routes>
        </BrowserRouter>

    </>
  )
}

export default App
