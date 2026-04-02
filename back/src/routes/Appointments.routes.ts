import { Request, Response, Router } from "express";
import { ScheduleAppDTO } from "../DTO/Appointment.DTO";
import { cancelAppointmentController, getAppointmentByIdController, getAppointmentsController, scheduleAppointmentController } from "../controllers/Appointments.controller";

const appointmentsRouter: Router = Router()

appointmentsRouter.get("/", (req: Request, res: Response) => getAppointmentsController(req, res))

appointmentsRouter.get("/:id", (req: Request<{ id: string }>, res: Response) => getAppointmentByIdController(req, res))

appointmentsRouter.post("/schedule", (req: Request< unknown, unknown, ScheduleAppDTO >, res: Response) => scheduleAppointmentController(req, res))

appointmentsRouter.put("/cancel/:id", (req: Request<{ id: string }>, res: Response) => cancelAppointmentController(req, res))

export default appointmentsRouter