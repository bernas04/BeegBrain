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
    operator_number! : string;
    providence! : string;

    constructor(id: number, health_number:string,name:string, email:string, address:string, telephone:string, birthday:Date, gender:string, operator_number:string, providence:string){
        this.id=id
        this.health_number = health_number
        this.name = name
        this.email = email
        this.address = address
        this.telephone = telephone
        this.birthday = birthday
        this.gender = gender
        this.operator_number = operator_number
        this.providence = providence
    }
}