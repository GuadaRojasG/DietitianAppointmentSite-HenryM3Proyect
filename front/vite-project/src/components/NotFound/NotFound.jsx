import { Link } from "react-router-dom";
import Styles from './NotFound.module.css'

function NotFound() {
    return (
        <div className={Styles.page}>
            <h1 className={Styles.error}>404 - Not Found</h1>
            <p className={Styles.message}>Lo sentimos, la página que estás buscando no existe.</p>
            <Link to="/" className={Styles.link}>Volver al inicio</Link>
        </div>
    )
}

export default NotFound;