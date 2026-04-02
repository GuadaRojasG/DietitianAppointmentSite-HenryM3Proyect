import { Link, useNavigate } from 'react-router-dom'
import Styles from './Navbar.module.css'
import Swal from 'sweetalert2'
import { useContext } from 'react'
import { UsersContext } from '../../context/UsersContext'

function Navbar() {
    const { logoutUser } = useContext(UsersContext)
    const navigate = useNavigate()
    
    const handleLogout = () => {
        localStorage.removeItem("user")
        navigate("/login")
        logoutUser()
        Swal.fire({
            title: 'Sesión cerrada',
            text: 'Has cerrado sesión exitosamente',
            icon: 'success'
        })
    }
    return (
        <div className={Styles.navbarContainer}>
            <nav className={Styles.navbar}>
                <img src="./src/assets/logo.png" alt="Logo" className={Styles.logo} onClick={() => navigate("/")} />
                <li className={Styles.navItem}>
                    <Link
                        to="/"
                        className={`${Styles.navLink} ${location.pathname === "/" ? Styles.active : ""}`}
                    > Inicio
                    </Link>
                </li>
                <li className={Styles.navItem}>
                    <Link
                        to="/agendar-turnos"
                        className={`${Styles.navLink} ${location.pathname === "/agendar-turnos" ? Styles.active : ""}`}
                    > Agendar Turnos
                    </Link>
                </li>
                <li>
                    <Link
                        to="/mis-turnos"
                        className={`${Styles.navLink} ${location.pathname === "/mis-turnos" ? Styles.active : ""}`}
                    > Turnos
                    </Link>
                </li>
                <li className={Styles.navLink} onClick={handleLogout}>
                    Cerrar Sesion
                </li>
            </nav>
        </div>
    )
}

export default Navbar