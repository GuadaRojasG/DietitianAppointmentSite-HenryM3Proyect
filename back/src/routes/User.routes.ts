import { Request, Response, Router } from "express";
import { getUserByIdController, getUsersController, userLoginController, userRegisterController } from "../controllers/Users.controller";
import { UserLoginDTO, UserRegisterDTO } from "../DTO/User.DTO";

const usersRouter: Router = Router()

usersRouter.get("/", (req: Request, res: Response) => getUsersController(req, res))

usersRouter.get("/:id",(req: Request<{ id: string }>, res: Response) => getUserByIdController(req, res))

usersRouter.post("/register", (req: Request< unknown, unknown, UserRegisterDTO >, res: Response) => userRegisterController(req, res))

usersRouter.post("/login", (req: Request< unknown, unknown, UserLoginDTO >, res: Response) => userLoginController(req, res))

export default usersRouter