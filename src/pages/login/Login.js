import logo from './beard.svg'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'

function LoginPage() {

    let navigate = useNavigate();

    function handleClickLogin(values) {
        Axios.post('https://gp-barber.herokuapp.com/', {
            email: values.email,
            password: values.password
        }).then((res) => {
            navigate('/home')
        })
        
    }


    const validationLogin = yup.object().shape({
        email: yup.string().email("Não é um email valido").required("Este campo é obrigatorio"),
        password: yup.string().min(8, "minimo 8 caracteres").required("Este campo é obrigatorio")
    })


    // -------------------------------------------------------------------------

    return (
        <section className="container">
            <div className="form-area">
                <div className="intro">
                    <h1>GEPETO'S BARBER</h1>
                    <h1>Login</h1>
                    <p>Oi sumido, se você nunca me viu antes <Link to='/register'><span>FAÇA SEU CADASTRO AQUI</span></Link>, mas se você é veio de casa, faça seu login no campo abaixo e marque seu corte concosco!</p>
                </div>
                <Formik
                    initialValues={{}}
                    onSubmit={handleClickLogin}
                    validationSchema={validationLogin}
                >
                    <Form className='login-form'>

                        <div className='login-form-group'>
                            <ErrorMessage
                                component={'span'}
                                name='email'
                                className='form-error'
                            />
                            <Field name='email' className='form-field' placeholder='Email' />

                        </div>

                        <div className='login-form-group'>
                            <ErrorMessage
                                component={'span'}
                                name='password'
                                className='form-error'
                            />
                            <Field name='password' className='form-field' placeholder='Senha' />

                        </div>

                        <button className='button' type='submit'>Login</button>

                    </Form>
                </Formik>
            </div>
            <div className="logo">
                <img src={logo} alt="" />
            </div>
        </section>
    )
}


export { LoginPage }