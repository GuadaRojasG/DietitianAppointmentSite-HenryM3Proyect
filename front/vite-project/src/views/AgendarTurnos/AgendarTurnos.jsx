import { useFormik } from "formik";
import { dateTimeValidates } from "../../utils/validations/";
import Swal from "sweetalert2";
import { useContext } from "react";
import { UsersContext } from "../../context/UsersContext";
import Styles from "./AgendarTurnos.module.css";

function AgendarTurnos() {
    const { scheduleAppointment } = useContext(UsersContext);
    const formik = useFormik({
        initialValues: {
            date: "",
            time: "",
        },
        initialErrors: {
            date: "La fecha es requerida",
            time: "La hora es requerida",
        },
        validate: dateTimeValidates,
        onSubmit: async (values) => {
            try {
                await scheduleAppointment(values);
                Swal.fire({
                    icon: "success",
                    title: "Cita agendada",
                    text: "Tu cita ha sido agendada exitosamente.",
                });
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: `Error al agendar turno ${error.response.data.msg}`,
                    text: "No se pudo agendar.",
                });
            }
        },
    });

    return (
        <div className={Styles.page}>
            <form onSubmit={formik.handleSubmit}>
                <h1 className={Styles.title}>Agendar Turnos</h1>
                <div className={Styles.inputGroup}>
                    <label htmlFor="date">Fecha:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        min={new Date().toISOString().split("T")[0]}
                        onChange={formik.handleChange}
                        value={formik.values.date}
                        className={
                            formik.touched.date && formik.errors.date
                            ? Styles.errorInput
                            : Styles.input
                        }
                    />
                    {formik.errors.date ? (
                        <>
                            <div className={Styles.error}>{formik.errors.date}</div>
                        </>
                    ) : null}
                </div>

                <div className={Styles.inputGroup}>
                    <label htmlFor="time">Hora:</label>

                    <select
                        id="time"
                        name="time"
                        onChange={formik.handleChange}
                        value={formik.values.time}
                        className={
                            formik.touched.time && formik.errors.time
                                ? Styles.errorInput
                                : Styles.input
                        }
                    >
                        <option value="">Seleccionar horario</option>
                    
                        {Array.from({ length: 21 }).map((_, index) => {
                            const hour = 8 + Math.floor(index / 2);
                            const minutes = index % 2 === 0 ? "00" : "30";
                            const time = `${hour.toString().padStart(2, "0")}:${minutes}`;
                        
                            return (
                                <option key={time} value={time}>
                                    {time}
                                </option>
                            );
                        })}
                    </select>
                    
                    {formik.touched.time && formik.errors.time && (
                        <div className={Styles.error}>{formik.errors.time}</div>
                    )}
                </div>
                <button
                    type="submit"
                    className={Styles.submitButton}
                >
                    AGENDAR
                </button>
            </form>
        </div>
    )
}

export default AgendarTurnos;