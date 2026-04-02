import { AppDataSource } from "../config/data-source";
import { UserLoginDTO, UserRegisterDTO } from "../DTO/User.DTO";
import { Credential } from "../entities/Credential.entity";
import { User } from "../entities/User.entity";
import { UserModel } from "../repositories/User.repositorie";
import { checkCredentials, createCredentialService } from "./Credential.service";

export const getUserService = async (): Promise<User[]> => {
    return await UserModel.find()
}

export const getUserByIdService = async (id: number): Promise<User> => {
    const userFound: User | null = await UserModel.findOne({
        where: {
            id: id
        },
        relations: ["appointments"]
    })
    if (!userFound) {
        throw Error(`El usuario con id ${id} no fue encontrado`)
    }
    return userFound
}

const checkDni = async (nDni: number) => {
    const found = await UserModel.findOne({ where:  { nDni } })
    if (found) throw Error(`El DNI ${nDni} ya existe.`)
}

const checkEmail = async (email: string) => {
    const found = await UserModel.findOne({ where: { email } })
    if (found) throw Error(`El email ${email} ya existe.`)
}

export const registerUserService = async (user: UserRegisterDTO): Promise<string> => {
    const transactionResult = await AppDataSource.transaction( async (entityManager) => {
        await checkDni(user.nDni)
        await checkEmail(user.email)
        const credentialCreated: Credential = await createCredentialService(entityManager, user.username, user.password)
        const newUser: User = entityManager.create(User, {
            birthdate: new Date(user.birthdate),
            email: user.email,
            name: user.name,
            nDni: user.nDni,
            credentials: credentialCreated
        })
        await entityManager.save(newUser)
        return 'Usuario creado con exito'
    })
    return transactionResult
}

export const loginUserService = async (user: UserLoginDTO) => {
    const credentialId: number = await checkCredentials(user.username, user.password)
    const userFound: User | null = await UserModel.findOne({
        where: {
            credentials: {
                id: credentialId
            }
        }
    })
    return {
        id: userFound?.id,
        name: userFound?.name,
        email: userFound?.email,
        birthdate: userFound?.birthdate,
        nDni: userFound?.nDni
    }
}