import Containers from './Containers'
import './Home.css'
import Axios from 'axios'
import { useEffect, useState } from 'react'

function HomePage(props) {

    const[list, setList] = useState([])

    useEffect( ()=>{
        Axios.get('https://gp-barber.herokuapp.com/home').then((res)=>{
            const listaTeste = [] 
            res.data.forEach(element => {
                listaTeste.push(element)
            });
            setList(listaTeste)
        })   
    }, [])


    return (
        <div className="container-hp">
            <div className="side-menu">
                <ul>
                    <a href="/home" className='agendamentos'>
                        <li>Agendamentos</li>
                    </a>
                    <a href="/" className='perfil'>
                        <li>Perfil</li>
                    </a>
                    <a href="/store" className='Config'>
                        <li>Nossa Loja</li>
                    </a>
                </ul>
            </div>
            <Containers itens={list} name={props.name}></Containers>
        </div>
    )
}

export default HomePage