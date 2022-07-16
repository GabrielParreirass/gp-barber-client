function Containers({ itens, name }) {

    
    return (
        <div className='info-container'>
            <h1>Bem vindo, {name}</h1>
            <h3>Escolha seu barbeiro favorito:</h3>
            {itens.map((item) => {
                return (<div className='cards-container' key={item._id} id={item._id}>
                    <div id="container">
                        <div className='container-photo'>
                            <div className='barber-photo'>O</div>
                        </div>
                        <div className='barber-infos'>
                            <h3>{item.username}</h3>
                            <a href={'/home/profiles/?id='+item._id}>ver perfil</a>
                            <h4>Nota: {item.rate}</h4>
                        </div>
                    </div>
                </div>)
            })}
        </div>

    )
}


export default Containers