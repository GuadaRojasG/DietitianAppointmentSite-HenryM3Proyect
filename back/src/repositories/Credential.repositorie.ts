import { AppDataSource } from "../config/data-source";
import { Credential } from "../entities/Credential.entity";

export const CredentialModel = AppDataSource.getRepository(Credential)