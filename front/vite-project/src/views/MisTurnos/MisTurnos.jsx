import { useContext, useEffect} from "react"
import Turno from "../../components/Turno/Turno"
import Styles from './MisTurnos.module.css'
import { UsersContext } from "../../context/UsersContext"
import Swal from "sweetalert2"

function MisTurnos() {

    const { myApp, getUserAppointments } = useContext(UsersContext)

    useEffect( () => {
        try {
            getUserAppointments()
        } catch (error) {
            Swal.fire({
                title: `Error al solicitar turnos ${error.response.data.msg}`,
                text: 'No posee turnos agendados',
                icon: 'error'
            })
        }
    }, [])

    return (
        <>
        <div className={Styles.appointmentsPage}>
        {
            myApp.length > 0 && (
                <div className={Styles.appointmentsTitle}>
                    <h1>Mis Turnos</h1>
                </div>
            )
        }
            <div className={Styles.appointmentsList}>
                {
                    myApp.length > 0 ? myApp.map( app => {
                        return <Turno
                        key={app.id}
                        id={app.id}
                        date={app.date}
                        time={app.time}
                        status={app.status}
                        />
                    }) : (
                        <h1 className={Styles.appointmentsLoading}>No hay turnos agendados</h1>
                    )
                }
            </div>
        </div>    
        </>
    )
}

export default MisTurnos