import { Router } from "express";
import usersRouter from "./User.routes";
import appointmentsRouter from "./Appointments.routes";

const router: Router = Router()

router.use("/users", usersRouter)
router.use("/appointments", appointmentsRouter)

export default router