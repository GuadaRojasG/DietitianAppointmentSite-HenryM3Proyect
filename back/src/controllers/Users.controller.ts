import { Request, Response } from "express"
import { UserLoginDTO, UserRegisterDTO } from "../DTO/User.DTO"
import { createCredentialService } from "../services/Credential.service"
import { getUserByIdService, getUserService, loginUserService, registerUserService } from "../services/User.service"
import { User } from "../entities/User.entity"
import { PostgresError } from "../interface/Error.interface"

export const getUsersController = async (req: Request, res: Response) => {
    try {
        const users: User[] = await getUserService()
        res.status(200).json({
            data: users,
            msg: "Obtener el listado de todos los usuarios"
        })
    } catch (error) {
        res.status(400).json({
            msg: error instanceof Error ? error.message: 'Error al obtener los usuarios'
        })
    }
}

export const getUserByIdController = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const user: User = await getUserByIdService(+req.params.id)
        res.status(200).json({
            user: user,
            msg: "Obtener el detalle de un usuario especifico"
        })
    } catch (error) {
        res.status(400).json({
            msg: error instanceof Error ? error.message: 'Error al obtener el usuario especificado'
        })
    }
}

export const userRegisterController = async (req: Request< unknown, unknown, UserRegisterDTO >, res: Response): Promise<void> => {
    try {
        const userRegister = await registerUserService(req.body)
        res.status(201).json({
            data: userRegister,
            msg: "Registro de un nuevo usuario"
        })
    } catch (error) {
        const err = error as PostgresError

        res.status(400).json({
            msg: err.detail ? err.detail : err instanceof Error ? err.message : 'Error desconocido'
        })
    }
}

export const userLoginController = async (req: Request< unknown, unknown, UserLoginDTO >, res: Response) => {
    try {
        res.status(200).json({
            login: true,
            user: await loginUserService(req.body),
            msg: "Login del usuario a la aplicacion"
        })
    } catch (error) {
        res.status(400).json({
            msg: error instanceof Error ? error.message: 'Error al iniciar sesion'
        })
    }
}