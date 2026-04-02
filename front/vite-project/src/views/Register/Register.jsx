import { useFormik } from "formik"
import { registerValidations } from "../../utils/validations";
import Swal from "sweetalert2";
import Styles from './Register.module.css'
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "../../context/UsersContext";

function Register() {
    const { registerUser } = useContext(UsersContext)
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            birthdate: '',
            nDni: '',
            username: '',
            password: ''
        },
        initialErrors: {
            name: 'El nombre es requerido',
            email: 'El correo electrónico es requerido',
            birthdate: 'La fecha de nacimiento es requerida',
            nDni: 'El número de DNI es requerido',
            username: 'El nombre de usuario es requerido',
            password: 'La contraseña es requerida'
        },
        validate: registerValidations,
        onSubmit: (values) => {
            registerUser(values)
                .then( (response) => {
                    if(response.status === 201) {
                        Swal.fire({
                            title: 'Usuario registrado con exito',
                            text: 'Bienvenido!',
                            icon: 'success'
                        });
                    }
                    navigate('/login')
                })
                .catch(err => {
                    if(err.response.data.msg.includes('usuario')) {
                        Swal.fire({
                            title: `Error al registrar usuario. ${err.response.data.msg}`,
                            text: 'El nombre de usuario ya le pertenece a un usuario existente',
                            icon: 'error'
                        });
                    }
                    if(err.response.data.msg.includes('email')) {
                        Swal.fire({
                            title: `Error al registrar usuario. ${err.response.data.msg}`,
                            text: 'El correo electrónico ya le pertenece a un usuario existente',
                            icon: 'error'
                        });
                    }
                    if(err.response.data.msg.includes('DNI')) {
                        Swal.fire({
                            title: `Error al registrar usuario. ${err.response.data.msg}`,
                            text: 'El número de DNI ya le pertenece a un usuario existente',
                            icon: 'error'
                        });
                    }
                })
        }
    })

    return (
        <div className={Styles.page}>
            <form onSubmit={formik.handleSubmit}>
                <h2 className={Styles.title}>Registro de Usuario</h2>

                <div className={Styles.inputGroup}>
                    <label className={Styles.label}>Nombre:</label>
                    <input 
                    type="text"
                    name="name"
                    placeholder="Ingresa tu nombre"
                    onChange={formik.handleChange}
                    />
                    {formik.errors.name && formik.errors.name ? (
                        <label className={Styles.error}>{formik.errors.name}</label>
                    ) :  null}
                </div>

                <div className={Styles.inputGroup}>
                    <label className={Styles.label}>Email:</label>
                    <input 
                    type="text"
                    name="email"
                    placeholder="Ingresa tu correo electronico"
                    onChange={formik.handleChange}
                    />
                    {formik.errors.email && formik.errors.email ? (
                        <label className={Styles.error}>{formik.errors.email}</label>
                    ) :  null}
                </div>

                <div className={Styles.inputGroup}>
                    <label className={Styles.label}>Fecha de Nacimiento:</label>
                    <input className={Styles.date}
                    type="date"
                    name="birthdate"
                    placeholder="Ingresa tu fecha de nacimiento"
                    onChange={formik.handleChange}
                    />
                    {formik.errors.birthdate && formik.errors.birthdate ? (
                        <label className={Styles.error}>{formik.errors.birthdate}</label>
                    ) :  null}
                </div>

                <div className={Styles.inputGroup}>
                    <label className={Styles.label}>DNI:</label>
                    <input 
                    type="text"
                    name="nDni"
                    placeholder="Ingresa tu numero de DNI"
                    onChange={formik.handleChange}
                    />
                    {formik.errors.nDni && formik.errors.nDni ? (
                        <label className={Styles.error}>{formik.errors.nDni}</label>
                    ) :  null}
                </div>

                <div className={Styles.inputGroup}>
                    <label className={Styles.label}>Nombre de Usuario:</label>
                    <input 
                    type="text"
                    name="username"
                    placeholder="Ingresa tu nombre de usuario"
                    onChange={formik.handleChange}
                    />
                    {formik.errors.username && formik.errors.username ? (
                        <label className={Styles.error}>{formik.errors.username}</label>
                    ) :  null}
                </div>

                <div className={Styles.inputGroup}>
                    <label className={Styles.label}>Contraseña:</label>
                    <input 
                    type="password"
                    name="password"
                    placeholder="Ingresa tu contraseña"
                    onChange={formik.handleChange}
                    />
                    {formik.errors.password && formik.errors.password ? (
                        <label className={Styles.error}>{formik.errors.password}</label>
                    ) :  null}
                </div>

                <button
                type="submit"
                className={Styles.registerButton}
                >
                    CREAR CUENTA
                </button>
                <label className={Styles.loginLabel}>
                    ¿Ya estas registrado? <Link to="/login" className={Styles.loginLink}>Inicia Sesion</Link>
                </label>
            </form>
        </div>

    )
}

export default Register