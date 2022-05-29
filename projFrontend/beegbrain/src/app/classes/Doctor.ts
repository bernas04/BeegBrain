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
    medicalNumber!: string;
    pass!:string;
    listChosenRevisions: RevisionCenter[] = [];



    constructor(health_number:string, email:string, pass:string, address:string, telephone:string, birthday:Date, gender:string, medicalNumber:string, listChosenRevisions:RevisionCenter[]){
        this.health_number = health_number
        this.email = email
        this.address = address
        this.telephone = telephone
        this.birthday = birthday
        this.medicalNumber = medicalNumber
        this.gender = gender
        this.pass = pass
        this.listChosenRevisions=listChosenRevisions
    }
}