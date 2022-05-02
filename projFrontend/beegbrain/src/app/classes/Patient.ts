import { Person } from "./Person";

export class Patient implements Person {
    id! : number;
    healthNumber!: string;
    name!: string;
    email!: string;
    address!: string;
    telephone!: string;
    birthday!: Date;
    gender!: string;
    medicalInfo!: string;
}