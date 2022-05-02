import { Person } from "./Person";

export class Doctor implements Person {
    id! : number;
    healthNumber!: string;
    name!: string;
    email!: string;
    address!: string;
    telephone!: string;
    birthday!: Date;
    gender!: string;
    medicalNumber!: string;
}