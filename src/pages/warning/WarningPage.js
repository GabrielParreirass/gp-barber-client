import { Link } from 'react-router-dom'
import './WarningPage.css'
function WarningPage(props) {



    return (
        <div className='error-body'>
            <div className='div-error'>
                <h1>Ocorreu um erro!</h1>
                <Link to={'/'}>Faça seu login novamente!</Link>
            </div>
        </div>
    )
}

export default WarningPage