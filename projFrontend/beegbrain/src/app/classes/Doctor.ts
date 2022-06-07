import { RevisionCenter } from './RevisionCenter';
import { Institution } from './Institution';
import { Person } from "./Person";

export class Doctor implements Person {
    id! : number;
    health_number!: string;
    name!: string;
    email!: string;
    address!: string;
    telephone!: string;
    birthday!: Date;
    gender!: string;
    medical_number!: string;
    pass!:string;
    listChosenRevisions: RevisionCenter[] = [];



    constructor(health_number:string, email:string, pass:string, address:string, telephone:string, birthday:Date, gender:string, medical_number:string, listChosenRevisions:RevisionCenter[]){
        this.health_number = health_number
        this.email = email
        this.address = address
        this.telephone = telephone
        this.birthday = birthday
        this.medical_number = medical_number
        this.gender = gender
        this.pass = pass
        this.listChosenRevisions=listChosenRevisions
    }
}