import logo from './beard.svg'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import {Link} from 'react-router-dom'
import * as yup from 'yup'
import Axios from 'axios'


function RegisterPage() {

    const handleClickRegister = (values) => {
        Axios.post('https://gp-barber.herokuapp.com/register', {
            email: values.email,
            password: values.password,
            username: values.username
        }).then((res)=>{
            console.log(res)
        })
    }

    const validationRegister = yup.object().shape({
        email: yup.string().email("Não é um email valido").required("Este campo é obrigatorio"),
        username: yup.string().max(15, "Max 15 caracteres").required('Este campo é obrigatorio'),
        password: yup.string().min(8, "Min 8 caracteres").required("Este campo é obrigatorio"),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'As senhas não são iguais').required("Este campo é obrigatorio")
    })



    return (
        <section className="container">
            <div className="form-area">
                <div className="intro">
                    <h1>GEPETO'S BARBER</h1>
                    <h1>Cadastro</h1>
                    <p>Fala meu nobre! É um prazer ter você aqui pela primeira vez, e caso não seja <span><Link to='/'>FAÇA SEU LOGIN AQUI</Link></span>. Preencha os campos abaixo para concluir seu cadastro e agende um corte com a gente!</p>
                </div>

                <Formik
                    initialValues={{}}
                    onSubmit={handleClickRegister}
                    validationSchema={validationRegister}
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
                                name='username'
                                className='form-error'
                            />
                            <Field name='username' className='form-field' placeholder='Nome de usuario' />

                        </div>

                        <div className='login-form-group'>
                            <ErrorMessage
                                component={'span'}
                                name='password'
                                className='form-error'
                            />
                            <Field name='password' className='form-field' placeholder='Senha' />

                        </div>

                        <div className='login-form-group'>
                            <ErrorMessage
                                component={'span'}
                                name='confirmPassword'
                                className='form-error'
                            />
                            <Field name='confirmPassword' className='form-field' placeholder='Confirme sua senha' />

                        </div>

                        <button className='button' type='submit'>Cadastrar-se</button>

                    </Form>
                </Formik>
            </div>
            <div className="logo">
                <img src={logo} alt="" />
            </div>
        </section>
    )
}

export default RegisterPage