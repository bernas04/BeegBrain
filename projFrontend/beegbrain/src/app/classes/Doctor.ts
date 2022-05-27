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
    instituitions!:[Institution] 


    constructor(health_number:string, email:string, pass:string, address:string, telephone:string, birthday:Date, gender:string, medicalNumber:string, instituitons:[Institution]){
        this.health_number = health_number
        this.email = email
        this.address = address
        this.telephone = telephone
        this.birthday = birthday
        this.medicalNumber = medicalNumber
        this.gender = gender
        this.pass = pass
        this.instituitions=instituitons
    }
}