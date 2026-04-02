import { EntityManager } from "typeorm";
import { Credential } from "../entities/Credential.entity";
import { CredentialModel } from "../repositories/Credential.repositorie";

const crypPass = async (text: string): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hash = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hash))
    const hashHex = hashArray.map(b=>b.toString(16).padStart(2, '0')).join("")
    return hashHex
}

const checkUsername = async (username: string) => {
    const found = await CredentialModel.findOne({ where: { username } })
    if (found) throw Error(`El nombre de usuario ${username} ya existe.`)
}

export const createCredentialService = async (entityManager: EntityManager, username: string, password: string): Promise<Credential> => {
    await checkUsername(username)

    const newCredential: Credential = entityManager.create(Credential, {
        username,
        password: await crypPass(password)
    })
    await entityManager.save(newCredential)
    return newCredential
}

export const checkCredentials = async (username: string, password: string): Promise<number> => {
    const credentialFound: Credential | null = await CredentialModel.findOne({
        where: {
            username
        }
    })
    if(credentialFound?.password !== await crypPass(password)) {
        throw Error('Credenciales incorrectas')
    }
    return credentialFound.id
}