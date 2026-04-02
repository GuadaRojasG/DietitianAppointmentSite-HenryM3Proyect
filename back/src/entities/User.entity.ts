import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Credential } from "./Credential.entity"
import { Appointments } from "./Appointment.entity"

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string

    @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
    email: string

    @Column({ type: 'date', nullable: false })
    birthdate: Date

    @Column({ type: 'integer', nullable: false, unique: true })
    nDni: number

    @OneToOne( () => Credential )
    @JoinColumn()
    credentials: Credential

    @OneToMany( () => Appointments, appointment => appointment.user )
    appointments: Appointments[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}