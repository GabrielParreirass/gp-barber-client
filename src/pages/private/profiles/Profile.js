import Axios from 'axios'
import { useEffect, useState } from "react"
import './Profile.css'

function Profile() {
    const[id, setId] = useState('')

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('id');
        Axios.post('https://gp-barber.herokuapp.com/profiles', {
            id: myParam
        }).then((res)=>{
            if(res.data === 'error'){
                window.location.href = "https://gp-barber.herokuapp.com/home"
            }else{
                console.log(res.data)
                setId(res.data)
            }
        }).catch((erro)=>{
            console.log('Nenhum usuario encontrado!')
        })
    }, [])



    console.log('teste loaded')

    return (
        <div className="b-container">
        <div className="container-profile">
          <h1>{id.username}</h1>
          <h2>Nota: {id.rate}</h2>
          <h2>Sobre mim:</h2>
          <p>{id.desc}</p>
          <div className="photo">
            foto
          </div>
        </div>
      </div>
        

    )
}

export default Profile