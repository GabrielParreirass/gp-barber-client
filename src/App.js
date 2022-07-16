import './App.css';
import { LoginPage } from './pages/login/Login'
import RegisterPage from './pages/register/Register'
import HomePage from './pages/private/home/HomePage';
import Store from './pages/private/store/Store';
import ProtectedRoutes from './ProtectedRoutes';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
import Profile from './pages/private/profiles/Profile';
import {Context} from '../src/pages/private/context/Context'





function App() {
  return (

      <Router>
        <div className="App">
          <Routes>
            <Route exact path='/' element={<LoginPage></LoginPage>} />
            <Route path='/register' element={<RegisterPage></RegisterPage>} />
            <Route element={<ProtectedRoutes />}>
              <Route path='/home' element={<HomePage></HomePage>}></Route>
              <Route path='/store' element={<Store></Store>} />
              <Route path='/home/profiles/*' element={<Profile></Profile>} />
            </Route>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
