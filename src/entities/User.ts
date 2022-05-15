import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryColumn()
    id: number

    @Column()
    username: string

    @Column({ select: false })
    password: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
