import Axios from 'axios'
import { useState } from "react";
import HomePage from "./pages/private/home/HomePage";
import WarningPage from './pages/warning/WarningPage'
import BarberHome from './pages/private/BarberHome/BarberHome'
import Profile from './pages/private/profiles/Profile';
import Store from './pages/private/store/Store';

async function UserAuth() {
    let isAuth = ''
    let userName = ''

    await Axios.get('http://localhost:3001/').then((res) => {
        isAuth = res.data.is
        userName = res.data.username
    })
    const user = { loggedIn: isAuth, username: userName }
    return user

}

function ProtectedRoutes() {

    


    const [auth, setAuth] = useState('')
    const [user, setUser] = useState('')

    UserAuth().then((res) => {
        setUser(res.username)
        setAuth(res.loggedIn)
    })



    if (auth === 'barber') {
        return (<BarberHome />)
    } else if (auth === 'user') {
        let url = window.location.href
        if(url === 'https://musical-sawine-3744d0.netlify.app/home'){
            console.log('home')
            return (<HomePage name={user} />)
        }else if (url.includes('https://musical-sawine-3744d0.netlify.app/home/profiles/')){
            console.log('profile')
            return(<Profile></Profile>)
        }
        else if( url === 'https://musical-sawine-3744d0.netlify.app/store'){
            return(<Store></Store>)
        }
        else{
            return (<WarningPage />)
        }
    } else {
        return (<WarningPage />)
    }
}

export default ProtectedRoutes
