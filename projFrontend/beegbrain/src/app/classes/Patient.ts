import { Person } from "./Person";

export class Patient implements Person {
    id! : number;
    health_number!: string;
    name!: string;
    email!: string;
    address!: string;
    telephone!: string;
    birthday!: Date;
    gender!: string;
    medical_info!: string;
}