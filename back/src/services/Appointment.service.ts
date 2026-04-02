import { ScheduleAppDTO } from "../DTO/Appointment.DTO";
import { Appointments } from "../entities/Appointment.entity";
import { User } from "../entities/User.entity";
import { Status } from "../interface/Appointment.Interface";
import { AppointmentModel } from "../repositories/Appointment.repository";
import { getUserByIdService } from "./User.service";

export const getAppointmentService = async () => {
    const appointmentsFound = await AppointmentModel.find()
    if (appointmentsFound.length === 0) {
        throw Error('No hay citas disponibles')
    }
    return appointmentsFound
}

export const getAppointmentByIdService= async (id: number): Promise<Appointments> => {
    const appFound: Appointments | null = await AppointmentModel.findOne({
        where: {
            id: id
        }
    })
    if (!appFound) {
        throw Error(`La cita con id ${id} no fue encontrada`)
    }
    return appFound
}

export const registerAppointmentService = async (app: ScheduleAppDTO): Promise<string> => {
    AppointmentModel.validateAllowedAppointment(app.date, app.time)
    await AppointmentModel.validateExistentApp(app.userId, app.date, app.time)

    const userFound: User = await getUserByIdService(app.userId)
    const newAppointment: Appointments = AppointmentModel.create({
        date: new Date(app.date),
        time: app.time,
        user: userFound
    })
    AppointmentModel.save(newAppointment)
    return `Cita creada para el dia ${app.date} a las ${app.time} horas`
}

export const cancelAppointmentService = async (id: number): Promise<Appointments> => {
    const appFound: Appointments = await getAppointmentByIdService(id)
    appFound.status = Status.cancelled
    AppointmentModel.save(appFound)
    return appFound
}