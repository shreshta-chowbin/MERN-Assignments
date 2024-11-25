import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import CreateEmployee from './components/CreateEmployee';
import EmployeeEdit from './components/EmployeeEdit';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/employeeList' element={<EmployeeList/>}></Route>
      <Route path='/createEmployee' element={<CreateEmployee/>}></Route>
      <Route path='/employeeEdit/:i' element={<EmployeeEdit/>}></Route>
      <Route path='*' element={<PageNotFound/>}></Route>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
