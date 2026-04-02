import { AppDataSource } from "../config/data-source";
import { Appointments } from "../entities/Appointment.entity";
import { Status } from "../interface/Appointment.Interface";

export const AppointmentModel = AppDataSource.getRepository(Appointments).extend({
    validateAllowedAppointment: function(date: Date, time: string): void {
        const [hours, minutes] = time.split(':').map(Number)
        const appointmentDate = new Date(date)
        appointmentDate.setHours(hours, minutes, 0)

        const appointmentDateArg = new Date(appointmentDate.getTime() - 3 * 60 * 60 * 1000)
        const nowArg = new Date(new Date().getTime() - 3 * 60 * 60 * 1000)

        const dayOfWeek = appointmentDateArg.getUTCDay()

        if (appointmentDateArg < nowArg) {
            throw Error('No se pueden agendar citas para fechas pasadas')
        }
        if (dayOfWeek === 5 || dayOfWeek === 6) {
            throw Error('No se pueden agendar citas los fines de semana')
        }
        if(hours < 8 || hours > 17) {
            throw Error('Solo se pueden agendar citas entre las 8am y las 6pm')
        }
    },

    validateExistentApp: async function(userId: number, date: Date, time: string): Promise<void> {
        const appFound = await AppointmentModel.findOne({
            where: {
                user: {
                    id: userId
                },
                date: new Date(date),
                time: time,
                status: Status.active
            }
        })
        if (appFound) {
            throw Error(`Ya tienes una cita existente para el dia ${date} a las ${time}`)
        }
    }
})