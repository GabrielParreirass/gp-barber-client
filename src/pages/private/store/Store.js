import logo from './beard.svg'
import './sotre.css'
import { useEffect, useState } from 'react'
import Axios from 'axios'
import { formatCurrency } from '../utilities/formatCurrency'
import { CartState } from '../context/Context'
import cartIcon from './images/cart.svg'


function Store() {

    const [listProducts, setListProducts] = useState([])

    useEffect(() => {
        Axios.get('https://gp-barber.herokuapp.com/store').then((res) => {
            const listaTeste = []
            res.data.forEach(element => {
                listaTeste.push(element)
            });
            setListProducts(listaTeste)
        })
    }, [])

    const { state: { cart }, dispatch } = CartState()


    return (
        <div className="container-store">
            <div className='header-store'>
                <div className="logo-store">
                    <h1>Nossa loja</h1>
                    <a href="http://localhost:3000/home"><img src={logo} alt="" className='lg-st' /></a>
                </div>
                <div className='cart-container'>
                    <div className='wrap-cart'>
                        <img src={cartIcon} alt='cart' className='cart-svg'></img>
                        <h2 className='contagem'>{Object.keys(cart).length}</h2>
                    </div>
                    <div className='menu-drop'>
                        {Object.keys(cart).length === 0 ? (<div>Carrinho vazio!</div>) : (
                            cart.map((itemCart) => {
                                return (
                                    <div className='onCart-div'>
                                        <img src={require(`${itemCart.img_url}`)} alt='ola' className='onCart-img' />
                                        <div className='onCart-infos'>
                                            <h4>{itemCart.name} ({itemCart.qty})</h4>
                                            <h4>{formatCurrency(itemCart.value * itemCart.qty)}</h4>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                        {Object.keys(cart).length === 0 ? (<div></div>) : (
                            <div>
                                <h3>Total: {formatCurrency(cart.map(item => item.value * item.qty).reduce((prev, curr) => prev + curr, 0))}</h3>
                                <button className='onCart-btn' onClick={() => {
                                    Axios.post('http://localhost:3001/store/checkout', {
                                        items: cart
                                    }).then((res) => {

                                        window.location = res.data
                                    }).catch(e => {
                                        console.log(e)
                                    })
                                }}>Ir para o Pagamento</button>
                            </div>)}
                    </div>

                </div>
            </div>
            <div className='items-container'>
                {listProducts.map((item) => {
                    return (
                        <div key={item._id} className='ItemCard'>
                            <div className="product-photo">
                                <img src={require(`${item.img_url}`)} alt='ola' />
                            </div>
                            <div className="itemInfos">
                                <h2>{item.name}</h2>
                                <h3>{formatCurrency(item.value)}</h3>
                            </div>
                            <h3>Estoque: {item.storage}</h3>
                            {cart.some(p => p.name === item.name) ? (
                                <div className='bottom-card-add'>

                                    <div className='select-container'>
                                        <select className='select-qty' onChange={(e) => { dispatch({ type: "CHANGE_CART_QTY", payload: { id: item._id, qty: parseInt(e.target.value) } }) }}>
                                            <option defaultValue={1} value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                        </select>
                                        <h3 className='qtd-alert'> unidade(s)</h3>
                                    </div>

                                    <button className='remove-btn' onClick={() => { dispatch({ type: 'REMOVE_FROM_CART', payload: item.name }) }}>Remover do carrinho</button>
                                </div>

                            ) : (
                                <div className="btn-container"><button onClick={() => {
                                    dispatch({ type: "ADD_TO_CART", payload: item })
                                }}>Adicionar ao carrinho</button></div>

                            )}

                        </div>

                    )
                })}
            </div>
        </div>
    )
}

export default Store