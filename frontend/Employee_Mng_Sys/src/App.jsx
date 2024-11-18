import {BrowserRouter, Navigate, Route,Routes} from 'react-router-dom';
import './App.css'
import EmployeeMngApp from './Components/EmployeeMngApp';
import EmpDetails from './Components/EmpDetails';



function App() {

  return (
    <>
      <div>

        <BrowserRouter>
        <Routes>
          <Route path ="/" element = {<Navigate to ="employee"/>} />
          <Route path ="/employee" element = {<EmployeeMngApp/> } />
          {/* <Route path ="/employee/:id" element = {<EmpDetails/> } /> */}

        </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
