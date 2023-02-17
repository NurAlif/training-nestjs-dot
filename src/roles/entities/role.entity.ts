import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    name:string

    @Column()
    level:number

    @OneToMany(() => User, (user) => user.role)
    users: User[]
}
