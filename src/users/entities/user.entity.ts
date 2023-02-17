import { Role } from "src/roles/entities/role.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { UserConstant } from "../users.constant";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: UserConstant.MaxNameLength})
    name: string;

    @Column({
        length: UserConstant.MaxEmailLength, 
        unique: true})
    email: string;

    @Column({
        length: UserConstant.MaxEmailLength, 
        unique: true})
    username: string;

    @Column({length: UserConstant.MaxPassLength})
    password: string;

    @ManyToOne(() => Role, (role) => role.users)
    role: Role
}
