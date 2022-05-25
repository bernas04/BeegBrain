import { Person } from "./Person";
import { Providence } from "./Providence";

export class Operator implements Person {
    id! : number;
    health_number!: string;
    name!: string;
    email!: string;
    address!: string;
    telephone!: string;
    birthday!: Date;
    gender!: string;
    operatorNumber! : string;
    providence! : Providence;
    pass!: string;

    constructor(health_number:string, email:string, pass:string, address:string, telephone:string, birthday:Date, gender:string, operatorNumber:string, providence:Providence){
        this.health_number = health_number
        this.email = email
        this.address = address
        this.telephone = telephone
        this.birthday = birthday
        this.operatorNumber = operatorNumber
        this.gender = gender
        this.pass = pass
        this.providence = providence
    }
}