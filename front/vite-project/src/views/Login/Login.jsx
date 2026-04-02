import { useFormik } from "formik"
import { loginValidations } from "../../utils/validations";
import Swal from "sweetalert2";
import Styles from './Login.module.css'
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "../../context/UsersContext";

function Login() {
    const { loginUser } = useContext(UsersContext)
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        initialErrors: {
            username: 'El nombre de usuario es requerido',
            password: 'La contraseña es requerida'
        },
        validate: loginValidations,
        onSubmit: (values) => {
            loginUser(values)
                .then( (response) => {
                    if(response.status === 200) {
                        Swal.fire({
                            title: 'Usuario logueado con exito',
                            text: 'Bienvenido de nuevo!',
                            icon: 'success'
                        });
                    }
                    navigate('/') 
                })
                .catch((errors) => {
                    Swal.fire({
                        title: `Error al iniciar sesión ${errors.response.data.msg}`,
                        text: 'Por favor verifica tus credenciales',
                        icon: 'error'
                    });
                })
        }
    })


    return (
        <div className={Styles.page}>
            <form onSubmit={formik.handleSubmit}>
                <h2 className={Styles.title}>Iniciar Sesión</h2>
                <div className={Styles.inputGroup}>
                    <label className={Styles.label} htmlFor="username">Usuario</label>
                    <input
                        name="username"
                        type="text"
                        placeholder="Ingresa tu nombre de usuario"
                        onChange={formik.handleChange}
                    />
                    {formik.errors.username && formik.errors.username ? (
                        <label className={Styles.error}>{formik.errors.username}</label>
                    ) : null}
                </div>
                
                <div className={Styles.inputGroup}>
                    <label className={Styles.label}>Contraseña</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        onChange={formik.handleChange}
                    />
                    {formik.errors.password && formik.errors.password ? (
                        <label className={Styles.error}>{formik.errors.password}</label>
                    ) : null}
                </div>
                
                <button className={Styles.loginButton}
                type="submit"
                >
                    INGRESAR
                </button>
                <label className={Styles.registerLabel}>
                    ¿No tienes una cuenta? <Link to="/register" className={Styles.registerLink}>Regístrate</Link>
                </label>
            </form>
        </div>
    )
}

export default Login;