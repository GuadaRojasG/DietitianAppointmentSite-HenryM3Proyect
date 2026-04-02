import { useContext } from 'react'
import Styles from './Turno.module.css'
import { UsersContext } from "../../context/UsersContext";
import Swal from 'sweetalert2';

function Turno({ id, date, time, status }) {
    const { cancelAppointment } = useContext(UsersContext)
    const handleCancel = () => {
        try {
            cancelAppointment(id)
            Swal.fire({
                icon: 'success',
                title: 'Turno cancelado',
                text: 'El turno ha sido cancelado exitosamente.'
            })
        } catch (error) {
            Swal.fire({
                title: `Error al cancelar el turno ${error.response.data.msg}`,
                text: 'El turno no pudo ser cancelado.',
                icon: 'error'
            })
        }
    }

    return (
        <div className={Styles.appointmentContainer}>
            <div className={Styles.appointmentHeader}>
                <h3 className={Styles.appointmentId}>Turno #{id}</h3>
                <span className={status === 'Activo' ? Styles.statusActive : Styles.statusCancelled}><span className={Styles.statusLabel}>Estado:</span> {status}</span>
            </div>
            <div className={Styles.appointmentActions}>
                <div className={Styles.appointmentDetails}>
                    <p><strong>Fecha:</strong> <span>{date}</span></p>
                    <p><strong>Hora:</strong> <span>{time}</span></p>
                </div>
                <div className={Styles.appointmentButtons}>
                    <button className={`${Styles.cancelButton} ${ status === "Cancelado" ? Styles.disabled : ""
                    }`}
                    onClick={handleCancel}
                    disabled={status === "Cancelado"}
                    >CANCELAR</button>
                </div>
            </div>
        </div>
    )
}

export default Turno